"""Apply a batch of operations to an unpacked DOCX via a JSON patch.

One script handles all common document modifications. The model generates
a JSON array of operations; this script applies them in order.

Usage:
    python scripts/docx_patch.py unpacked/ --patch '[
      {"op": "replace_text", "match": "old text", "text": "new text"},
      {"op": "insert_after", "match": "Title", "paragraphs": ["Line 1", "Line 2"]},
      {"op": "delete_paragraph", "match": "Lorem ipsum"},
      {"op": "set_table_cell", "table": 0, "row": 1, "col": 0, "text": "Jane Smith"},
      {"op": "set_style", "match": "Title", "bold": true, "size": 36}
    ]'

    # From a file
    python scripts/docx_patch.py unpacked/ --patch-file changes.json

    # Dry run
    python scripts/docx_patch.py unpacked/ --patch '[...]' --dry-run

    # Also patch headers/footers
    python scripts/docx_patch.py unpacked/ --patch '[...]' --all-files

Supported operations:

    replace_text    Replace text (handles split runs). Use \\n in "text" to
                    expand one paragraph into multiple.
                    {"op": "replace_text", "match": "old", "text": "new"}

    insert_after    Insert new paragraphs after the paragraph containing "match".
                    {"op": "insert_after", "match": "Title",
                     "paragraphs": ["Line 1", "Line 2"]}

    insert_before   Insert new paragraphs before the paragraph containing "match".
                    {"op": "insert_before", "match": "Title",
                     "paragraphs": ["Line 1", "Line 2"]}

    delete_paragraph  Delete all paragraphs containing "match".
                    {"op": "delete_paragraph", "match": "Lorem ipsum"}

    delete_section  Delete or keep sections by index.
                    {"op": "delete_section", "keep": [0, 1, 13]}
                    {"op": "delete_section", "delete": [3, 4, 5]}

    set_table_cell  Set text in a specific table cell.
                    {"op": "set_table_cell", "table": 0, "row": 1, "col": 0,
                     "text": "Jane Smith"}

    set_style       Change formatting on paragraphs matching text.
                    {"op": "set_style", "match": "Title",
                     "bold": true, "size": 28, "font": "Georgia", "color": "2E75B6"}

    add_paragraph   Append paragraphs at end of document body.
                    {"op": "add_paragraph",
                     "paragraphs": ["New content", "More content"]}
"""

import json
import re
import sys
from pathlib import Path

import defusedxml.minidom


def _xml_escape(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _get_all_text_in_para(para_raw: str) -> str:
    """Concatenate all <w:t> content in a raw paragraph string."""
    return "".join(re.findall(r"<w:t[^>]*>(.*?)</w:t>", para_raw, re.DOTALL))


def _extract_rPr(para_raw: str) -> str:
    """Extract first <w:rPr>...</w:rPr> from paragraph."""
    m = re.search(r"(<w:rPr>.*?</w:rPr>)", para_raw, re.DOTALL)
    return m.group(1) if m else ""


def _extract_pPr(para_raw: str) -> str:
    """Extract <w:pPr>...</w:pPr> from paragraph."""
    m = re.search(r"(<w:pPr>.*?</w:pPr>)", para_raw, re.DOTALL)
    return m.group(1) if m else ""


def _make_paragraph(text: str, pPr: str = "", rPr: str = "") -> str:
    """Build a <w:p> element with optional formatting."""
    escaped = _xml_escape(text)
    space = ' xml:space="preserve"' if escaped.startswith(" ") or escaped.endswith(" ") else ""
    return f"<w:p>{pPr}<w:r>{rPr}<w:t{space}>{escaped}</w:t></w:r></w:p>"


def _build_rPr(style_op: dict) -> str:
    """Build <w:rPr> from style operation dict."""
    parts = []
    if style_op.get("font"):
        parts.append(f'<w:rFonts w:ascii="{style_op["font"]}" w:hAnsi="{style_op["font"]}"/>')
    if style_op.get("bold"):
        parts.append("<w:b/>")
    if style_op.get("italic"):
        parts.append("<w:i/>")
    if style_op.get("size"):
        # size in half-points (28pt = 56)
        parts.append(f'<w:sz w:val="{style_op["size"] * 2}"/>')
    if style_op.get("color"):
        parts.append(f'<w:color w:val="{style_op["color"]}"/>')
    if style_op.get("underline"):
        parts.append('<w:u w:val="single"/>')
    if not parts:
        return ""
    return "<w:rPr>" + "".join(parts) + "</w:rPr>"


# ---------------------------------------------------------------------------
# Operation implementations
# ---------------------------------------------------------------------------


def op_replace_text(raw: str, op: dict) -> tuple[str, str]:
    """Replace text, optionally expanding into multiple paragraphs."""
    match_text = op["match"]
    new_text = op["text"]
    new_lines = new_text.replace("\\n", "\n").split("\n")
    expand = len(new_lines) > 1

    p_pattern = re.compile(r"(<w:p\b[^>]*>.*?</w:p>)", re.DOTALL)
    parts = []
    last_end = 0
    count = 0

    for m in p_pattern.finditer(raw):
        parts.append(raw[last_end : m.start()])
        para = m.group(1)
        para_text = _get_all_text_in_para(para)

        if match_text.lower() in para_text.lower():
            if expand:
                pPr = _extract_pPr(para)
                rPr = _extract_rPr(para)
                new_paras = [_make_paragraph(line, pPr, rPr) for line in new_lines]
                parts.append("\n".join(new_paras))
            else:
                # In-place replacement in <w:t> elements
                t_pattern = re.compile(r"(<w:t[^>]*>)(.*?)(</w:t>)", re.DOTALL)
                t_elements = list(t_pattern.finditer(para))
                concat = "".join(m2.group(2) for m2 in t_elements)

                # XML-escape the replacement and double backslashes so re.sub
                # treats it literally (no group-ref/backslash interpretation).
                escaped_new = _xml_escape(new_text).replace("\\", "\\\\")
                new_concat = re.sub(re.escape(match_text), escaped_new, concat, flags=re.IGNORECASE)
                if t_elements:
                    first = t_elements[0]
                    space = (
                        ' xml:space="preserve"'
                        if new_concat.startswith(" ") or new_concat.endswith(" ")
                        else ""
                    )
                    result = para[: first.start()] + f"<w:t{space}>{new_concat}</w:t>"
                    # Clear remaining <w:t> elements
                    if len(t_elements) > 1:
                        last_t = t_elements[-1]
                        # Keep everything after the last </w:t> (like </w:r></w:p>)
                        between = para[first.end() : last_t.start()]
                        # Remove text content from middle <w:t> elements
                        between = re.sub(
                            r"(<w:t[^>]*>).*?(</w:t>)", r"\1\2", between, flags=re.DOTALL
                        )
                        result += between + para[last_t.end() :]
                    else:
                        result += para[first.end() :]
                    parts.append(result)
                else:
                    parts.append(para)
            count += 1
        else:
            parts.append(para)
        last_end = m.end()

    parts.append(raw[last_end:])
    return "".join(parts), f'replace_text: "{match_text}" → "{new_text}" ({count}x)'


def op_insert_after(raw: str, op: dict) -> tuple[str, str]:
    """Insert paragraphs after the first paragraph matching text."""
    match_text = op["match"]
    new_paragraphs = op.get("paragraphs", [])

    p_pattern = re.compile(r"(<w:p\b[^>]*>.*?</w:p>)", re.DOTALL)
    parts = []
    last_end = 0
    done = False

    for m in p_pattern.finditer(raw):
        parts.append(raw[last_end : m.start()])
        para = m.group(1)
        parts.append(para)

        if not done and match_text.lower() in _get_all_text_in_para(para).lower():
            pPr = _extract_pPr(para)
            rPr = _extract_rPr(para)
            for text in new_paragraphs:
                # Support dict format for styled paragraphs
                if isinstance(text, dict):
                    t = text.get("text", "")
                    custom_rPr = _build_rPr(text) or rPr
                    parts.append("\n" + _make_paragraph(t, pPr, custom_rPr))
                else:
                    parts.append("\n" + _make_paragraph(text, pPr, rPr))
            done = True

        last_end = m.end()

    parts.append(raw[last_end:])
    status = (
        f'insert_after: "{match_text}" ({len(new_paragraphs)} paragraphs)'
        if done
        else f'insert_after: "{match_text}" (NOT FOUND)'
    )
    return "".join(parts), status


def op_insert_before(raw: str, op: dict) -> tuple[str, str]:
    """Insert paragraphs before the first paragraph matching text."""
    match_text = op["match"]
    new_paragraphs = op.get("paragraphs", [])

    p_pattern = re.compile(r"(<w:p\b[^>]*>.*?</w:p>)", re.DOTALL)
    parts = []
    last_end = 0
    done = False

    for m in p_pattern.finditer(raw):
        parts.append(raw[last_end : m.start()])
        para = m.group(1)

        if not done and match_text.lower() in _get_all_text_in_para(para).lower():
            pPr = _extract_pPr(para)
            rPr = _extract_rPr(para)
            for text in new_paragraphs:
                if isinstance(text, dict):
                    t = text.get("text", "")
                    custom_rPr = _build_rPr(text) or rPr
                    parts.append(_make_paragraph(t, pPr, custom_rPr) + "\n")
                else:
                    parts.append(_make_paragraph(text, pPr, rPr) + "\n")
            done = True

        parts.append(para)
        last_end = m.end()

    parts.append(raw[last_end:])
    status = (
        f'insert_before: "{match_text}" ({len(new_paragraphs)} paragraphs)'
        if done
        else f'insert_before: "{match_text}" (NOT FOUND)'
    )
    return "".join(parts), status


def op_delete_paragraph(raw: str, op: dict) -> tuple[str, str]:
    """Delete all paragraphs containing match text."""
    match_text = op["match"]

    p_pattern = re.compile(r"(<w:p\b[^>]*>.*?</w:p>)", re.DOTALL)
    parts = []
    last_end = 0
    count = 0

    for m in p_pattern.finditer(raw):
        parts.append(raw[last_end : m.start()])
        para = m.group(1)
        if match_text.lower() in _get_all_text_in_para(para).lower():
            count += 1  # skip paragraph
        else:
            parts.append(para)
        last_end = m.end()

    parts.append(raw[last_end:])
    return "".join(parts), f'delete_paragraph: "{match_text}" ({count} removed)'


def op_delete_section(raw: str, op: dict) -> tuple[str, str]:
    """Delete sections by index (keep or delete mode)."""
    # Find section break paragraphs
    sect_para = re.compile(
        r"<w:p\b[^>]*>(?:(?!</w:p>).)*<w:sectPr\b.*?</w:sectPr>.*?</w:p>",
        re.DOTALL,
    )
    body_sectpr = re.search(r"(<w:sectPr\b[^>]*>.*?</w:sectPr>)\s*</w:body>", raw, re.DOTALL)
    body_start_m = re.search(r"<w:body[^>]*>", raw)
    if not body_start_m:
        return raw, "delete_section: no <w:body> found"

    breaks = list(sect_para.finditer(raw))
    content_start = body_start_m.end()

    sections = []
    prev = content_start
    for brk in breaks:
        sections.append((prev, brk.end()))
        prev = brk.end()
    if body_sectpr:
        sections.append((prev, body_sectpr.end()))

    total = len(sections)
    if "keep" in op:
        keep = set(op["keep"])
        to_delete = set(range(total)) - keep
    else:
        to_delete = set(op.get("delete", []))

    if not to_delete:
        return raw, f"delete_section: nothing to delete ({total} sections)"

    # Delete in reverse
    for idx in sorted(to_delete, reverse=True):
        if idx >= total:
            continue
        start, end = sections[idx]
        if idx == total - 1 and body_sectpr:
            # Keep body sectPr, delete content before it
            raw = raw[:start] + raw[body_sectpr.start() :]
        else:
            raw = raw[:start] + raw[end:]

    return raw, f"delete_section: removed {len(to_delete)} of {total} sections"


def op_set_table_cell(raw: str, op: dict) -> tuple[str, str]:
    """Set text in a specific table cell."""
    tbl_idx = op.get("table", 0)
    row_idx = op["row"]
    col_idx = op["col"]
    new_text = op["text"]

    dom = defusedxml.minidom.parseString(raw)
    tables = dom.getElementsByTagName("w:tbl")
    if tbl_idx >= len(tables):
        return raw, f"set_table_cell: table {tbl_idx} not found ({len(tables)} tables)"

    table = tables[tbl_idx]
    rows = table.getElementsByTagName("w:tr")
    if row_idx >= len(rows):
        return raw, f"set_table_cell: row {row_idx} not found ({len(rows)} rows)"

    cells = rows[row_idx].getElementsByTagName("w:tc")
    if col_idx >= len(cells):
        return raw, f"set_table_cell: col {col_idx} not found ({len(cells)} cols)"

    cell = cells[col_idx]
    # Find all <w:t> in the cell and get the text
    old_text = ""
    for t in cell.getElementsByTagName("w:t"):
        old_text += t.firstChild.data if t.firstChild else ""

    # Replace via raw string: find the cell's text and swap it
    # Use the old text as the match within the table context
    if old_text.strip():
        # Simple approach: replace old cell text with new in the raw XML
        # Scoped to avoid replacing elsewhere
        escaped_old = re.escape(old_text)
        # Find Nth table in raw
        tbl_pattern = re.compile(r"(<w:tbl\b.*?</w:tbl>)", re.DOTALL)
        tbl_matches = list(tbl_pattern.finditer(raw))
        if tbl_idx < len(tbl_matches):
            tbl_m = tbl_matches[tbl_idx]
            tbl_raw = tbl_m.group(1)
            # Replace within the table only
            new_tbl = re.sub(
                r"(<w:t[^>]*>)" + escaped_old + r"(</w:t>)",
                lambda m: m.group(1) + new_text + m.group(2),
                tbl_raw,
                count=1,
            )
            raw = raw[: tbl_m.start()] + new_tbl + raw[tbl_m.end() :]
            return (
                raw,
                f'set_table_cell: [{tbl_idx},{row_idx},{col_idx}] "{old_text[:20]}" → "{new_text[:20]}"',
            )

    return raw, f"set_table_cell: [{tbl_idx},{row_idx},{col_idx}] cell empty, skipped"


def op_set_style(raw: str, op: dict) -> tuple[str, str]:
    """Set formatting on runs within paragraphs matching text."""
    match_text = op["match"]
    new_rPr = _build_rPr(op)
    if not new_rPr:
        return raw, "set_style: no style properties specified"

    p_pattern = re.compile(r"(<w:p\b[^>]*>.*?</w:p>)", re.DOTALL)
    parts = []
    last_end = 0
    count = 0

    for m in p_pattern.finditer(raw):
        parts.append(raw[last_end : m.start()])
        para = m.group(1)

        if match_text.lower() in _get_all_text_in_para(para).lower():
            # Replace or insert <w:rPr> in all runs
            def _replace_rPr(run_match):
                run = run_match.group(0)
                # Remove existing rPr
                run = re.sub(r"<w:rPr>.*?</w:rPr>", "", run, flags=re.DOTALL)
                # Insert new rPr after <w:r...>
                run = re.sub(r"(<w:r\b[^>]*>)", r"\1" + new_rPr, run, count=1)
                return run

            para = re.sub(r"<w:r\b[^>]*>.*?</w:r>", _replace_rPr, para, flags=re.DOTALL)
            count += 1

        parts.append(para)
        last_end = m.end()

    parts.append(raw[last_end:])
    return "".join(parts), f'set_style: "{match_text}" ({count} paragraphs)'


def op_add_paragraph(raw: str, op: dict) -> tuple[str, str]:
    """Append paragraphs at end of document body (before final </w:body>)."""
    new_paragraphs = op.get("paragraphs", [])
    new_paras_xml = []
    for text in new_paragraphs:
        if isinstance(text, dict):
            t = text.get("text", "")
            rPr = _build_rPr(text)
            new_paras_xml.append(_make_paragraph(t, "", rPr))
        else:
            new_paras_xml.append(_make_paragraph(text))

    insert = "\n".join(new_paras_xml) + "\n"

    # Find the body-level <w:sectPr> and insert before it
    body_sectpr = re.search(r"(\s*<w:sectPr\b[^>]*>.*?</w:sectPr>\s*</w:body>)", raw, re.DOTALL)
    if body_sectpr:
        raw = raw[: body_sectpr.start()] + "\n" + insert + raw[body_sectpr.start() :]
    else:
        # Fallback: insert before </w:body>
        raw = raw.replace("</w:body>", insert + "</w:body>")

    return raw, f"add_paragraph: {len(new_paragraphs)} paragraph(s) appended"


# ---------------------------------------------------------------------------
# Dispatcher
# ---------------------------------------------------------------------------

OP_HANDLERS = {
    "replace_text": op_replace_text,
    "insert_after": op_insert_after,
    "insert_before": op_insert_before,
    "delete_paragraph": op_delete_paragraph,
    "delete_section": op_delete_section,
    "set_table_cell": op_set_table_cell,
    "set_style": op_set_style,
    "add_paragraph": op_add_paragraph,
}


def apply_patch(xml_path: Path, operations: list[dict], dry_run: bool = False) -> list[str]:
    """Apply a list of operations to an XML file. Returns status messages."""
    raw = xml_path.read_text(encoding="utf-8")
    messages = []

    for i, op in enumerate(operations):
        op_name = op.get("op", "")
        handler = OP_HANDLERS.get(op_name)
        if not handler:
            messages.append(f'[{i}] ERROR: unknown op "{op_name}"')
            continue

        try:
            raw, msg = handler(raw, op)
            messages.append(f"[{i}] {msg}")
        except Exception as e:
            messages.append(f"[{i}] ERROR in {op_name}: {e}")

    if not dry_run:
        xml_path.write_text(raw, encoding="utf-8")

    return messages


if __name__ == "__main__":
    import argparse
    import signal

    signal.signal(signal.SIGPIPE, signal.SIG_DFL)

    parser = argparse.ArgumentParser(
        description="Apply batch operations to unpacked DOCX via JSON patch.",
        epilog="Use --patch with inline JSON or --patch-file for a file.",
    )
    parser.add_argument("unpacked_dir", help="Path to unpacked DOCX directory")
    parser.add_argument("--patch", metavar="JSON", help="Inline JSON array of operations")
    parser.add_argument("--patch-file", metavar="FILE", help="JSON file with operations array")
    parser.add_argument("--all-files", action="store_true", help="Also patch headers and footers")
    parser.add_argument("--dry-run", action="store_true", help="Preview without modifying")

    args = parser.parse_args()
    unpacked = Path(args.unpacked_dir)

    if not args.patch and not args.patch_file:
        parser.error("Specify --patch JSON or --patch-file FILE")

    # Load operations
    if args.patch_file:
        ops = json.loads(Path(args.patch_file).read_text(encoding="utf-8"))
    else:
        ops = json.loads(args.patch)

    if not isinstance(ops, list):
        print("Error: patch must be a JSON array of operations", file=sys.stderr)
        sys.exit(1)

    # Determine files to patch
    word_dir = unpacked / "word"
    files = [word_dir / "document.xml"]
    if args.all_files:
        for f in sorted(word_dir.glob("header*.xml")):
            files.append(f)
        for f in sorted(word_dir.glob("footer*.xml")):
            files.append(f)
    files = [f for f in files if f.is_file()]

    if args.dry_run:
        print("[DRY RUN]")

    for xml_file in files:
        rel = xml_file.relative_to(unpacked)
        # Only apply section ops to document.xml
        file_ops = [
            op for op in ops if op.get("op") != "delete_section" or xml_file.name == "document.xml"
        ]
        if not file_ops:
            continue

        messages = apply_patch(xml_file, file_ops, dry_run=args.dry_run)
        print(f"\n{rel}:")
        for msg in messages:
            print(f"  {msg}")

    if not args.dry_run:
        print(f"\nApplied {len(ops)} operation(s)")
