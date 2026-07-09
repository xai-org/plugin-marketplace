"""Find and replace DOCX structured placeholders: merge fields, content controls, bookmarks.

Many Word templates use these instead of plain text for placeholder values.
This script understands all three mechanisms.

Usage:
    # List all fields/placeholders
    python scripts/replace_field.py unpacked/ --list

    # Replace merge fields by name
    python scripts/replace_field.py unpacked/ --field "CompanyName" --text "Acme Corp"

    # Replace content control (SDT) by tag or alias
    python scripts/replace_field.py unpacked/ --sdt "author_name" --text "Jane Smith"

    # Replace all fields from a JSON mapping
    python scripts/replace_field.py unpacked/ --map fields.json

JSON map format (fields.json):
    {
      "CompanyName": "Acme Corp",
      "AuthorName": "Jane Smith",
      "Date": "2025-04-07"
    }
"""

import json
import re
import sys
from pathlib import Path

import defusedxml.minidom


def _xml_escape(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _get_text(node):
    if node.nodeType == node.TEXT_NODE:
        return node.data
    return "".join(_get_text(c) for c in node.childNodes)


def list_fields(unpacked_dir: Path) -> str:
    """List all merge fields, content controls, and bookmarks."""
    word_dir = unpacked_dir / "word"
    doc_path = word_dir / "document.xml"
    if not doc_path.is_file():
        return "Error: document.xml not found"

    dom = defusedxml.minidom.parse(str(doc_path))
    lines = ["\n=== Document Fields & Placeholders ==="]

    # Merge fields (MERGEFIELD in instrText)
    merge_fields = []
    for instrText in dom.getElementsByTagName("w:instrText"):
        text = _get_text(instrText).strip()
        m = re.match(r'MERGEFIELD\s+"?(\w+)"?', text, re.IGNORECASE)
        if m:
            merge_fields.append(m.group(1))
    # Also check fldSimple
    for fld in dom.getElementsByTagName("w:fldSimple"):
        instr = fld.getAttribute("w:instr") or ""
        m = re.match(r'\s*MERGEFIELD\s+"?(\w+)"?', instr, re.IGNORECASE)
        if m:
            merge_fields.append(m.group(1))

    if merge_fields:
        lines.append("\n  Merge Fields:")
        for name in sorted(set(merge_fields)):
            count = merge_fields.count(name)
            lines.append(f"    {name}" + (f" ({count}x)" if count > 1 else ""))

    # Content controls (SDT)
    sdt_items = []
    for sdt in dom.getElementsByTagName("w:sdt"):
        tag = alias = ""
        for sdtPr in sdt.getElementsByTagName("w:sdtPr"):
            for t in sdtPr.getElementsByTagName("w:tag"):
                tag = t.getAttribute("w:val") or ""
            for a in sdtPr.getElementsByTagName("w:alias"):
                alias = a.getAttribute("w:val") or ""
            break
        # Get current content
        content = ""
        for sdtContent in sdt.getElementsByTagName("w:sdtContent"):
            for t in sdtContent.getElementsByTagName("w:t"):
                content += _get_text(t)
            break
        if tag or alias:
            sdt_items.append((tag, alias, content.strip()[:50]))

    if sdt_items:
        lines.append("\n  Content Controls (SDT):")
        for tag, alias, content in sdt_items:
            label = tag or alias or "(no tag)"
            preview = f' = "{content}"' if content else ""
            alias_note = f" alias={alias}" if alias and alias != tag else ""
            lines.append(f"    {label}{alias_note}{preview}")

    # Bookmarks
    bookmarks = []
    for bm in dom.getElementsByTagName("w:bookmarkStart"):
        name = bm.getAttribute("w:name") or ""
        if name and not name.startswith("_"):  # Skip internal bookmarks
            bookmarks.append(name)

    if bookmarks:
        lines.append("\n  Bookmarks:")
        for name in sorted(set(bookmarks)):
            lines.append(f"    {name}")

    if len(lines) == 1:
        lines.append("  (no fields, content controls, or bookmarks found)")

    return "\n".join(lines)


def replace_merge_field(raw: str, field_name: str, new_text: str) -> tuple[str, int]:
    """Replace MERGEFIELD values in raw XML. Returns (new_raw, count)."""
    count = 0
    new_text = _xml_escape(new_text)

    # Handle <w:fldSimple w:instr=" MERGEFIELD FieldName "> ... </w:fldSimple>
    pattern = re.compile(
        r'(<w:fldSimple\s+w:instr="[^"]*MERGEFIELD\s+"?'
        + re.escape(field_name)
        + r'"?[^"]*"[^>]*>)(.*?)(</w:fldSimple>)',
        re.DOTALL | re.IGNORECASE,
    )
    for m in reversed(list(pattern.finditer(raw))):
        # Find existing run formatting inside the field
        rPr_match = re.search(r"(<w:rPr>.*?</w:rPr>)", m.group(2), re.DOTALL)
        rPr = rPr_match.group(1) if rPr_match else ""
        space = (
            ' xml:space="preserve"' if new_text.startswith(" ") or new_text.endswith(" ") else ""
        )
        new_content = f"<w:r>{rPr}<w:t{space}>{new_text}</w:t></w:r>"
        raw = raw[: m.start()] + m.group(1) + new_content + m.group(3) + raw[m.end() :]
        count += 1

    # Handle complex fields with instrText
    # Pattern: <w:r>...<w:instrText>MERGEFIELD Name</w:instrText>...</w:r>
    # followed by <w:r>...<w:t>display value</w:t>...</w:r> before field end
    instr_pattern = re.compile(
        r'<w:instrText[^>]*>[^<]*MERGEFIELD\s+"?'
        + re.escape(field_name)
        + r'"?[^<]*</w:instrText>',
        re.IGNORECASE,
    )
    for m in instr_pattern.finditer(raw):
        # Find the next <w:t> after the instrText (the display value)
        after = raw[m.end() :]
        t_match = re.search(r"(<w:t[^>]*>)(.*?)(</w:t>)", after, re.DOTALL)
        if t_match:
            abs_start = m.end() + t_match.start()
            abs_end = m.end() + t_match.end()
            space = (
                ' xml:space="preserve"'
                if new_text.startswith(" ") or new_text.endswith(" ")
                else ""
            )
            raw = raw[:abs_start] + f"<w:t{space}>{new_text}</w:t>" + raw[abs_end:]
            count += 1

    return raw, count


def replace_sdt(raw: str, tag_name: str, new_text: str) -> tuple[str, int]:
    """Replace content control (SDT) content by tag or alias. Returns (new_raw, count)."""
    count = 0
    new_text = _xml_escape(new_text)
    # Find SDT blocks with matching tag
    sdt_pattern = re.compile(r"(<w:sdt>)(.*?)(</w:sdt>)", re.DOTALL)

    for m in reversed(list(sdt_pattern.finditer(raw))):
        sdt_block = m.group(2)
        # Check if tag matches
        tag_match = re.search(
            r'<w:tag\s+w:val="' + re.escape(tag_name) + r'"',
            sdt_block,
            re.IGNORECASE,
        )
        alias_match = re.search(
            r'<w:alias\s+w:val="' + re.escape(tag_name) + r'"',
            sdt_block,
            re.IGNORECASE,
        )
        if not tag_match and not alias_match:
            continue

        # Replace content in <w:sdtContent>
        content_pattern = re.compile(r"(<w:sdtContent>)(.*?)(</w:sdtContent>)", re.DOTALL)
        content_match = content_pattern.search(sdt_block)
        if content_match:
            # Preserve formatting from first run
            rPr_match = re.search(r"(<w:rPr>.*?</w:rPr>)", content_match.group(2), re.DOTALL)
            rPr = rPr_match.group(1) if rPr_match else ""
            space = (
                ' xml:space="preserve"'
                if new_text.startswith(" ") or new_text.endswith(" ")
                else ""
            )
            new_content = f"<w:p><w:r>{rPr}<w:t{space}>{new_text}</w:t></w:r></w:p>"
            new_sdt = (
                sdt_block[: content_match.start()]
                + content_match.group(1)
                + new_content
                + content_match.group(3)
                + sdt_block[content_match.end() :]
            )
            raw = raw[: m.start()] + m.group(1) + new_sdt + m.group(3) + raw[m.end() :]
            count += 1

    return raw, count


if __name__ == "__main__":
    import argparse
    import signal

    signal.signal(signal.SIGPIPE, signal.SIG_DFL)

    parser = argparse.ArgumentParser(description="Find/replace DOCX fields, SDTs, bookmarks.")
    parser.add_argument("unpacked_dir", help="Path to unpacked DOCX directory")
    parser.add_argument("--list", action="store_true", help="List all fields and placeholders")
    parser.add_argument("--field", metavar="NAME", help="Merge field name to replace")
    parser.add_argument("--sdt", metavar="TAG", help="Content control tag/alias to replace")
    parser.add_argument("--text", metavar="TEXT", help="Replacement text")
    parser.add_argument("--map", metavar="FILE", help="JSON file with {field: value} mappings")
    parser.add_argument("--dry-run", action="store_true", help="Preview without modifying")

    args = parser.parse_args()
    unpacked = Path(args.unpacked_dir)
    doc_path = unpacked / "word" / "document.xml"

    if not doc_path.is_file():
        print(f"Error: {doc_path} not found", file=sys.stderr)
        sys.exit(1)

    if args.list:
        print(list_fields(unpacked))
        sys.exit(0)

    if not args.field and not args.sdt and not args.map:
        parser.error("Specify --list, --field NAME, --sdt TAG, or --map FILE")
    if (args.field or args.sdt) and not args.text:
        parser.error("--field/--sdt requires --text")

    raw = doc_path.read_text(encoding="utf-8")
    total = 0

    if args.map:
        mappings = json.loads(Path(args.map).read_text(encoding="utf-8"))
        for name, value in mappings.items():
            new_raw, count = replace_merge_field(raw, name, value)
            if count == 0:
                new_raw, count = replace_sdt(raw, name, value)
            if count > 0:
                raw = new_raw
                total += count
                print(f'  field "{name}" → "{value}" ({count}x)')
    elif args.field:
        raw, count = replace_merge_field(raw, args.field, args.text)
        total += count
        print(f'  MERGEFIELD "{args.field}" → "{args.text}" ({count}x)')
    elif args.sdt:
        raw, count = replace_sdt(raw, args.sdt, args.text)
        total += count
        print(f'  SDT "{args.sdt}" → "{args.text}" ({count}x)')

    if total > 0 and not args.dry_run:
        doc_path.write_text(raw, encoding="utf-8")
        print(f"\nUpdated: {total} field(s) replaced")
    elif total == 0:
        print("\nNo matching fields found")
        sys.exit(1)
    else:
        print(f"\n[DRY RUN] Would replace {total} field(s)")
