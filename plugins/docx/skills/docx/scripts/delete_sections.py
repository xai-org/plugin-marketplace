"""Delete sections from an unpacked DOCX document by index.

Use list_sections.py first to see section indices, then delete the ones
you don't need. Preserves all other content, styles, and media.

Usage:
    # Delete sections 3 through 11 (keep 0, 1, 2, 12, 13)
    python scripts/delete_sections.py unpacked/ --delete 3-11

    # Delete specific sections
    python scripts/delete_sections.py unpacked/ --delete 2,5,7

    # Keep only specific sections (delete everything else)
    python scripts/delete_sections.py unpacked/ --keep 0,1,2,13

    # Preview without modifying
    python scripts/delete_sections.py unpacked/ --delete 3-11 --dry-run
"""

import re
import sys
from pathlib import Path


def _parse_indices(spec: str) -> set[int]:
    """Parse '3-11' or '2,5,7' or '0,1,3-5' into a set of ints."""
    result = set()
    for part in spec.split(","):
        part = part.strip()
        if "-" in part:
            start, end = part.split("-", 1)
            result.update(range(int(start), int(end) + 1))
        else:
            result.add(int(part))
    return result


def find_section_ranges(raw: str) -> list[tuple[int, int, int, int]]:
    """Find section boundaries in raw document.xml.

    Returns list of (section_idx, para_start_offset, content_end_offset, sectPr_end_offset).
    The last section's <w:sectPr> is a direct child of <w:body>, not inside a paragraph.
    """
    sections = []

    # Mid-document section breaks: <w:sectPr> inside <w:pPr> inside <w:p>
    # We need to find paragraphs that contain sectPr and track ranges between them.
    # Strategy: find all <w:sectPr> positions, then determine content ranges.

    # Find all sectPr-containing paragraphs
    # Pattern: <w:p ...>...<w:pPr>...<w:sectPr...>...</w:sectPr>...</w:pPr>...</w:p>
    sect_para_pattern = re.compile(
        r"<w:p\b[^>]*>(?:(?!</w:p>).)*<w:sectPr\b.*?</w:sectPr>.*?</w:p>",
        re.DOTALL,
    )

    breaks = []  # (break_end_pos,) — positions where sections end
    for m in sect_para_pattern.finditer(raw):
        breaks.append((m.start(), m.end()))

    # Also find the final <w:sectPr> (direct child of <w:body>)
    # This is the last section and doesn't have surrounding <w:p>
    body_sectpr = re.search(r"(<w:sectPr\b[^>]*>.*?</w:sectPr>)\s*</w:body>", raw, re.DOTALL)

    # Build section ranges
    # Find the start of body content (after <w:body>)
    body_start = re.search(r"<w:body[^>]*>", raw)
    if not body_start:
        return []
    content_start = body_start.end()

    prev_end = content_start
    for i, (brk_start, brk_end) in enumerate(breaks):
        sections.append((i, prev_end, brk_start, brk_end))
        prev_end = brk_end

    # Last section (from last break to body sectPr)
    if body_sectpr:
        sections.append((len(breaks), prev_end, body_sectpr.start(), body_sectpr.end()))

    return sections


def delete_sections(unpacked_dir: Path, to_delete: set[int], dry_run: bool = False) -> int:
    """Delete specified sections from document.xml.

    Returns number of sections deleted.
    """
    doc_path = unpacked_dir / "word" / "document.xml"
    raw = doc_path.read_text(encoding="utf-8")

    sections = find_section_ranges(raw)
    if not sections:
        print("Error: Could not find section boundaries", file=sys.stderr)
        return 0

    total = len(sections)
    valid_delete = to_delete & set(range(total))

    if not valid_delete:
        print(f"No valid sections to delete (document has {total} sections)", file=sys.stderr)
        return 0

    # Must keep at least one section (the last one, which has the body-level sectPr)
    if valid_delete == set(range(total)):
        print("Error: Cannot delete ALL sections — must keep at least one", file=sys.stderr)
        return 0

    print(f"Document has {total} sections")
    for idx in sorted(valid_delete):
        s = sections[idx]
        content_len = s[3] - s[1]
        print(f"  Deleting section [{idx}] ({content_len} chars)")

    if dry_run:
        print(f"\n[DRY RUN] Would delete {len(valid_delete)} section(s)")
        return len(valid_delete)

    # Delete in reverse order to preserve offsets
    for idx in sorted(valid_delete, reverse=True):
        s = sections[idx]
        start, end = s[1], s[3]

        # If this is the last section (body-level sectPr), we need to
        # keep the <w:sectPr> and just delete the content before it
        if idx == total - 1:
            # Keep the sectPr, delete content between prev section end and sectPr start
            raw = raw[:start] + raw[s[2] :]
        else:
            # Delete the whole range including the sectPr-containing paragraph
            raw = raw[:start] + raw[end:]

    doc_path.write_text(raw, encoding="utf-8")
    print(f"\nDeleted {len(valid_delete)} section(s) from document.xml")
    return len(valid_delete)


if __name__ == "__main__":
    import argparse
    import signal

    signal.signal(signal.SIGPIPE, signal.SIG_DFL)

    parser = argparse.ArgumentParser(
        description="Delete sections from unpacked DOCX. Use list_sections.py first.",
    )
    parser.add_argument("unpacked_dir", help="Path to unpacked DOCX directory")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--delete", metavar="SPEC", help="Sections to delete: '3-11' or '2,5,7'")
    group.add_argument(
        "--keep", metavar="SPEC", help="Sections to keep (delete all others): '0,1,13'"
    )
    parser.add_argument("--dry-run", action="store_true", help="Preview without modifying")

    args = parser.parse_args()
    unpacked = Path(args.unpacked_dir)
    doc_path = unpacked / "word" / "document.xml"

    if not doc_path.is_file():
        print(f"Error: {doc_path} not found", file=sys.stderr)
        sys.exit(1)

    # Determine sections to delete
    raw = doc_path.read_text(encoding="utf-8")
    sections = find_section_ranges(raw)
    total = len(sections)

    if args.keep:
        keep = _parse_indices(args.keep)
        to_delete = set(range(total)) - keep
    else:
        to_delete = _parse_indices(args.delete)

    count = delete_sections(unpacked, to_delete, dry_run=args.dry_run)
    sys.exit(0 if count > 0 else 1)
