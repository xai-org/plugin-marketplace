"""Replace text in a DOCX document while preserving formatting.

Handles text split across multiple <w:r> runs — the #1 pain point in
DOCX XML editing. Searches across run boundaries and preserves the
formatting from the first matching run.

Usage:
    # Replace a single text match (case-insensitive)
    python scripts/replace_text.py unpacked/ --match "Work Phone" --text "+1 (555) 123-4567"

    # Batch replace from a JSON mapping file
    python scripts/replace_text.py unpacked/ --map replacements.json

    # Dry run (preview without modifying)
    python scripts/replace_text.py unpacked/ --match "Name Surname" --text "Jane Smith" --dry-run

    # Also search headers and footers (not just document.xml)
    python scripts/replace_text.py unpacked/ --match "Company" --text "Acme" --all-files

JSON map format (replacements.json):
    {
      "Name Surname": "Jane Smith",
      "Job Title": "Wedding Photographer",
      "Work Phone": "+1 (555) 123-4567",
      "Work Email": "jane@example.com"
    }

Notes:
    - Searches across <w:r> run boundaries (handles split text)
    - Preserves <w:rPr> formatting from the first matching run
    - Replaces ALL occurrences in the file, not just the first
    - By default only edits word/document.xml; use --all-files for headers/footers
"""

import json
import re
import sys
from pathlib import Path


def _get_text(node):
    if node.nodeType == node.TEXT_NODE:
        return node.data
    return "".join(_get_text(c) for c in node.childNodes)


def _collect_runs_text(paragraph):
    """Collect (run_element, text) pairs from a <w:p> paragraph.

    Returns list of tuples. Each tuple is either:
    - (run_element, text_string) for <w:r> elements containing <w:t>
    - (None, "") for non-run elements (spacing, breaks, etc.)
    """
    runs = []
    for child in paragraph.childNodes:
        if child.nodeType != child.ELEMENT_NODE:
            continue
        if child.tagName == "w:r":
            text = ""
            for t in child.getElementsByTagName("w:t"):
                text += _get_text(t)
            runs.append((child, text))
    return runs


def _get_rPr_xml(run_element):
    """Extract the <w:rPr>...</w:rPr> XML string from a run, or empty."""
    for rPr in run_element.getElementsByTagName("w:rPr"):
        return rPr.toxml()
    return ""


def _xml_escape(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def _replace_in_paragraph_raw(raw_paragraph: str, old_text: str, new_text: str) -> tuple[str, int]:
    """Replace text within a raw paragraph XML string.

    Concatenates the <w:t> content to locate matches that span multiple
    <w:r> runs, then rewrites the spanning runs. The paragraph is re-parsed
    after every replacement so positions stay valid even when the same text
    (or a single <w:t>) is matched more than once. Replacement text is
    XML-escaped before insertion.

    Returns (modified_raw, replacement_count).
    """
    if not old_text:
        return raw_paragraph, 0

    new_text_escaped = _xml_escape(new_text)
    t_pattern = re.compile(r"(<w:t[^>]*>)(.*?)(</w:t>)", re.DOTALL)
    result = raw_paragraph
    count = 0
    search_from = 0  # concat offset to resume from, so inserted text is not re-matched

    while True:
        t_elements = list(t_pattern.finditer(result))
        if not t_elements:
            break

        concat_text = ""
        char_map = []  # (char_start_in_concat, char_end_in_concat, match_object)
        for m in t_elements:
            start = len(concat_text)
            concat_text += m.group(2)
            char_map.append((start, len(concat_text), m))

        found = re.search(re.escape(old_text), concat_text[search_from:], re.IGNORECASE)
        if not found:
            break
        match_start = search_from + found.start()
        match_end = search_from + found.end()

        first_t_idx = None
        last_t_idx = None
        for idx, (cstart, cend, _) in enumerate(char_map):
            if cstart < match_end and cend > match_start:
                if first_t_idx is None:
                    first_t_idx = idx
                last_t_idx = idx
        if first_t_idx is None:
            break

        if first_t_idx == last_t_idx:
            old_content = char_map[first_t_idx][2].group(2)
            offset = match_start - char_map[first_t_idx][0]
            new_content = (
                old_content[:offset] + new_text_escaped + old_content[offset + len(old_text) :]
            )
        else:
            first_text = char_map[first_t_idx][2].group(2)
            offset_first = match_start - char_map[first_t_idx][0]
            last_text = char_map[last_t_idx][2].group(2)
            offset_last = match_end - char_map[last_t_idx][0]
            new_content = first_text[:offset_first] + new_text_escaped + last_text[offset_last:]

        space_attr = (
            ' xml:space="preserve"'
            if new_content.startswith(" ") or new_content.endswith(" ")
            else ""
        )

        # Rewrite spanning <w:t> right-to-left: the first holds the combined
        # text, any others are emptied.
        for idx in range(last_t_idx, first_t_idx - 1, -1):
            m_obj = char_map[idx][2]
            if idx == first_t_idx:
                replacement = f"<w:t{space_attr}>{new_content}</w:t>"
            else:
                replacement = "<w:t></w:t>"
            result = result[: m_obj.start()] + replacement + result[m_obj.end() :]

        count += 1
        search_from = match_start + len(new_text_escaped)

    return result, count


def _expand_paragraph(para_raw: str, new_lines: list[str]) -> str:
    """Expand one paragraph into multiple paragraphs.

    Clones the paragraph structure for each line, replacing the text content.
    The first line reuses the original paragraph, subsequent lines are clones.
    """
    if len(new_lines) <= 1:
        return para_raw

    # Extract the run properties from the first run
    rPr_match = re.search(r"(<w:rPr>.*?</w:rPr>)", para_raw, re.DOTALL)
    rPr = rPr_match.group(1) if rPr_match else ""

    # Extract paragraph properties
    pPr_match = re.search(r"(<w:pPr>.*?</w:pPr>)", para_raw, re.DOTALL)
    pPr = pPr_match.group(1) if pPr_match else ""

    paragraphs = []
    for line in new_lines:
        line = _xml_escape(line)
        space = ' xml:space="preserve"' if line.startswith(" ") or line.endswith(" ") else ""
        p = f"<w:p>{pPr}<w:r>{rPr}<w:t{space}>{line}</w:t></w:r></w:p>"
        paragraphs.append(p)

    return "\n".join(paragraphs)


def _process_segment(
    segment: str,
    old_text: str,
    new_text: str,
    expand: bool = False,
    new_lines: list[str] | None = None,
) -> tuple[str, int]:
    """Process paragraphs within a single XML segment (safe from txbxContent crossing).

    Returns (modified_segment, replacement_count).
    """
    total = 0
    p_pattern = re.compile(r"(<w:p\b[^>]*>.*?</w:p>)", re.DOTALL)
    parts = []
    last_end = 0

    for m in p_pattern.finditer(segment):
        parts.append(segment[last_end : m.start()])
        para_raw = m.group(1)

        if expand and new_lines and len(new_lines) > 1:
            # Use cross-run concatenation to check for match (Fix 7)
            t_texts = re.findall(r"<w:t[^>]*>(.*?)</w:t>", para_raw, re.DOTALL)
            concat = "".join(t_texts)
            if old_text.lower() in concat.lower():
                expanded = _expand_paragraph(para_raw, new_lines)
                parts.append(expanded)
                total += 1
            else:
                parts.append(para_raw)
        else:
            new_para, count = _replace_in_paragraph_raw(para_raw, old_text, new_text)
            parts.append(new_para)
            total += count

        last_end = m.end()
    parts.append(segment[last_end:])

    return "".join(parts), total


def _find_txbx_ranges(raw: str) -> list[tuple[int, int]]:
    """Find balanced <w:txbxContent>...</w:txbxContent> byte ranges.

    Uses a stack-based approach to handle nesting correctly — the regex
    .*? approach fails on nested text boxes.
    """
    ranges = []
    tag_open = "<w:txbxContent>"
    tag_close = "</w:txbxContent>"
    len_open = len(tag_open)
    len_close = len(tag_close)
    pos = 0

    while True:
        start = raw.find(tag_open, pos)
        if start == -1:
            break
        depth = 1
        search_pos = start + len_open
        while depth > 0:
            next_open = raw.find(tag_open, search_pos)
            next_close = raw.find(tag_close, search_pos)
            if next_close == -1:
                break  # malformed XML — no matching close
            if next_open != -1 and next_open < next_close:
                depth += 1
                search_pos = next_open + len_open
            else:
                depth -= 1
                if depth == 0:
                    ranges.append((start, next_close + len_close))
                search_pos = next_close + len_close
        pos = search_pos

    return ranges


def _split_at_txbx(raw: str) -> list[str]:
    """Split raw XML into segments, alternating between outer content and txbxContent blocks.

    Each txbxContent block is kept as a separate segment so the <w:p> regex
    in _process_segment never crosses text box boundaries.
    """
    ranges = _find_txbx_ranges(raw)
    if not ranges:
        return [raw]

    segments = []
    prev_end = 0
    for start, end in ranges:
        if start > prev_end:
            segments.append(raw[prev_end:start])
        segments.append(raw[start:end])
        prev_end = end
    if prev_end < len(raw):
        segments.append(raw[prev_end:])

    return segments


def replace_text_in_file(
    xml_path: Path,
    replacements: dict[str, str],
    dry_run: bool = False,
) -> dict[str, int]:
    """Replace all occurrences of each key in replacements with its value.

    If replacement text contains \\n, the paragraph is expanded into
    multiple paragraphs (one per line), each inheriting the original's
    paragraph and run formatting.

    Uses a nesting-aware parser to split at <w:txbxContent> boundaries,
    preventing the paragraph regex from crossing text box elements.

    Returns dict of {old_text: count_replaced}.
    """
    raw = xml_path.read_text(encoding="utf-8")
    results: dict[str, int] = {}

    for old_text, new_text in replacements.items():
        new_lines = (
            new_text.split("\\n")
            if "\\n" in new_text
            else (new_text.split("\n") if "\n" in new_text else None)
        )
        expand = new_lines is not None and len(new_lines) > 1

        # Split at txbxContent boundaries using nesting-aware parser.
        # This prevents the <w:p> regex from matching across text box boundaries.
        segments = _split_at_txbx(raw)

        total = 0
        new_segments = []
        for seg in segments:
            processed, count = _process_segment(
                seg, old_text, new_text, expand=expand, new_lines=new_lines
            )
            new_segments.append(processed)
            total += count

        if total > 0:
            raw = "".join(new_segments)

        results[old_text] = total

    if not dry_run and any(v > 0 for v in results.values()):
        xml_path.write_text(raw, encoding="utf-8")

    return results


def search_text_in_file(xml_path: Path, match_text: str) -> list[str]:
    """Search for text occurrences without replacing. Returns list of found strings."""
    raw = xml_path.read_text(encoding="utf-8")
    found = []
    segments = _split_at_txbx(raw)
    p_pattern = re.compile(r"(<w:p\b[^>]*>.*?</w:p>)", re.DOTALL)

    for seg in segments:
        for m in p_pattern.finditer(seg):
            t_texts = re.findall(r"<w:t[^>]*>(.*?)</w:t>", m.group(1), re.DOTALL)
            concat = "".join(t_texts)
            if match_text.lower() in concat.lower():
                preview = concat.strip()
                if len(preview) > 80:
                    preview = preview[:77] + "..."
                found.append(preview)
    return found


def find_xml_files(unpacked_dir: Path, all_files: bool = False) -> list[Path]:
    """Find XML files to process."""
    word_dir = unpacked_dir / "word"
    files = [word_dir / "document.xml"]

    if all_files:
        for f in sorted(word_dir.glob("header*.xml")):
            files.append(f)
        for f in sorted(word_dir.glob("footer*.xml")):
            files.append(f)

    return [f for f in files if f.is_file()]


if __name__ == "__main__":
    import argparse
    import signal

    signal.signal(signal.SIGPIPE, signal.SIG_DFL)

    parser = argparse.ArgumentParser(
        description="Replace text in DOCX XML while preserving formatting.",
        epilog="Handles text split across <w:r> runs. Use --map for batch replacements.",
    )
    parser.add_argument("unpacked_dir", help="Path to unpacked DOCX directory")
    parser.add_argument("--match", metavar="TEXT", help="Text to find (case-insensitive)")
    parser.add_argument(
        "--text", metavar="TEXT", default=None, help='Replacement text (use "" to blank out)'
    )
    parser.add_argument("--map", metavar="FILE", help="JSON file with {old: new} mappings")
    parser.add_argument(
        "--all-files", action="store_true", help="Also replace in headers and footers"
    )
    parser.add_argument("--dry-run", action="store_true", help="Preview without modifying")

    args = parser.parse_args()

    if not args.match and not args.map:
        parser.error("Specify --match TEXT or --map FILE")
    if args.match and args.text is None and not args.dry_run:
        parser.error("--match requires --text (use --dry-run for search-only)")

    unpacked = Path(args.unpacked_dir)
    if not (unpacked / "word" / "document.xml").is_file():
        print(f"Error: {unpacked}/word/document.xml not found", file=sys.stderr)
        sys.exit(1)

    xml_files = find_xml_files(unpacked, all_files=args.all_files)

    # Search-only mode: --match without --text in --dry-run
    if args.match and args.text is None:
        print(f'Searching for: "{args.match}"')
        total_found = 0
        for xml_file in xml_files:
            rel_path = xml_file.relative_to(unpacked)
            found = search_text_in_file(xml_file, args.match)
            for text in found:
                print(f'  {rel_path}: "{text}"')
                total_found += 1
        print(f"\nFound {total_found} occurrence(s)")
        sys.exit(0 if total_found > 0 else 1)

    # Build replacements dict
    if args.map:
        map_path = Path(args.map)
        if not map_path.is_file():
            print(f"Error: {map_path} not found", file=sys.stderr)
            sys.exit(1)
        replacements = json.loads(map_path.read_text(encoding="utf-8"))
    else:
        replacements = {args.match: args.text}

    if args.dry_run:
        print("[DRY RUN] Would replace:")
        for old, new in replacements.items():
            print(f'  "{old}" → "{new}"')

    total_replaced = 0

    for xml_file in xml_files:
        rel_path = xml_file.relative_to(unpacked)
        results = replace_text_in_file(xml_file, replacements, dry_run=args.dry_run)

        for old_text, count in results.items():
            if count > 0:
                print(f'  {rel_path}: "{old_text}" → "{replacements[old_text]}" ({count}x)')
                total_replaced += count

    if total_replaced > 0:
        verb = "Would replace" if args.dry_run else "Replaced"
        print(f"\n{verb} {total_replaced} occurrence(s) across {len(xml_files)} file(s)")
    else:
        print("\nNo matches found")
        sys.exit(1)
