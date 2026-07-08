"""Replace text in individual <a:t> elements of a PPTX slide XML file.

When replace_text.py can't help — duplicate text, substring fields, non-
placeholder shapes — this script operates directly on <a:t> elements:

  1. Finds ALL <a:t> elements containing the search string.
  2. Lists them with indices so you can pick the right one.
  3. Replaces the matched substring (not the whole element) by default.

Usage:
    # List all text elements (see indices)
    python scripts/replace_nth_text.py slide.xml --list

    # List only elements matching a string
    python scripts/replace_nth_text.py slide.xml --list --find "Chapter Title"

    # Substring replacement (default) — only the matched part changes:
    #   <a:t>Debut Year: YYYY</a:t>  →  <a:t>Debut Year: 2015</a:t>
    python scripts/replace_nth_text.py slide.xml --find "YYYY" --nth 1 --text "2015"

    # Replace multiple fields in the same slide:
    python scripts/replace_nth_text.py slide.xml --find "YYYY" --all --text "2015"
    python scripts/replace_nth_text.py slide.xml --find "[Fan Club Name]" --all --text "ONCE"
    python scripts/replace_nth_text.py slide.xml --find "[Company Name]" --all --text "JYP Entertainment"

    # Full-element replacement — replace entire <a:t> content:
    python scripts/replace_nth_text.py slide.xml --find "Chapter Title" --nth 1 --text "2025 CREATIVE VISION" --full

    # Replace by global index (from --list output) — always replaces full element
    python scripts/replace_nth_text.py slide.xml --index 5 --text "New Text Here"

    # Dry run (preview without modifying)
    python scripts/replace_nth_text.py slide.xml --find "YYYY" --nth 1 --text "2015" --dry-run

Shell quoting warning:
    If the replacement text contains $, use SINGLE quotes to prevent shell
    expansion. "$4,500" becomes ",500" (bash eats $4). Use '$4,500' instead.

This complements replace_text.py:
  - replace_text.py     → targets shapes by placeholder type, replaces whole text body
  - replace_nth_text.py → targets individual <a:t> elements, substring or full replacement
"""

import re
import sys
from pathlib import Path


def _find_text_elements(raw: str) -> list[dict]:
    """Find all <a:t>...</a:t> elements with their positions and content.

    Returns list of dicts: {text, start, end, line}
    """
    results = []
    for m in re.finditer(r"<a:t(?:\s[^>]*)?>([^<]*)</a:t>", raw):
        text = m.group(1)
        # Unescape XML entities for display
        display = (
            text.replace("&amp;", "&")
            .replace("&lt;", "<")
            .replace("&gt;", ">")
            .replace("&quot;", '"')
        )
        line = raw[: m.start()].count("\n") + 1
        results.append(
            {
                "text": text,
                "display": display,
                "start": m.start(),
                "end": m.end(),
                "full_match": m.group(0),
                "line": line,
            }
        )
    return results


def list_text(slide_path: Path, find: str | None = None) -> list[dict]:
    """List all <a:t> elements, optionally filtered by substring match."""
    raw = slide_path.read_text(encoding="utf-8")
    elements = _find_text_elements(raw)

    filtered = []
    for i, el in enumerate(elements):
        el["index"] = i
        if find is None or find.lower() in el["display"].lower():
            filtered.append(el)

    return filtered


def replace_nth(
    slide_path: Path,
    *,
    find: str | None = None,
    nth: int | None = None,
    global_index: int | None = None,
    replace_all: bool = False,
    new_text: str,
    full: bool = False,
    dry_run: bool = False,
) -> int:
    """Replace text in specific <a:t> element(s).

    By default, when ``find`` is used, only the matched substring within each
    ``<a:t>`` is replaced (e.g., ``"YYYY"`` → ``"2015"`` inside
    ``<a:t>Debut Year: YYYY</a:t>``).  Use ``full=True`` to replace the
    entire ``<a:t>`` content instead.

    When ``global_index`` is used (no ``find`` string), the entire element
    content is always replaced.

    Args:
        find: text substring to match (case-sensitive)
        nth: which occurrence of ``find`` to replace (1-based)
        global_index: absolute index from ``--list`` output (0-based)
        replace_all: replace ALL occurrences of ``find``
        new_text: replacement text
        full: if True, replace entire ``<a:t>`` content (not just substring)
        dry_run: preview without modifying

    Returns number of replacements made.
    """
    raw = slide_path.read_text(encoding="utf-8")
    elements = _find_text_elements(raw)

    # Determine which elements to replace
    targets: list[dict] = []
    # full-element mode: --index always, --find only with --full
    full_element = full or (global_index is not None)

    if global_index is not None:
        if 0 <= global_index < len(elements):
            targets = [elements[global_index]]
        else:
            print(
                f"Error: index {global_index} out of range (0..{len(elements) - 1})",
                file=sys.stderr,
            )
            return 0
    elif find is not None:
        matches = [el for el in elements if find in el["display"]]
        if not matches:
            print(f'Error: no <a:t> elements contain "{find}"', file=sys.stderr)
            return 0
        if replace_all:
            targets = matches
        elif nth is not None:
            if 1 <= nth <= len(matches):
                targets = [matches[nth - 1]]
            else:
                print(
                    f'Error: --nth {nth} but only {len(matches)} occurrence(s) of "{find}"',
                    file=sys.stderr,
                )
                return 0
        else:
            if len(matches) == 1:
                targets = matches
            else:
                print(
                    f'Found {len(matches)} occurrence(s) of "{find}". '
                    f"Use --nth N (1..{len(matches)}) or --all.",
                    file=sys.stderr,
                )
                for i, m in enumerate(matches, 1):
                    print(f'  [{i}] line {m["line"]}: "{m["display"]}"', file=sys.stderr)
                return 0
    else:
        print("Error: specify --find TEXT or --index N", file=sys.stderr)
        return 0

    # Escape new text for XML
    escaped_new = (
        new_text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )

    # Preview
    for t in targets:
        status = "[DRY RUN] " if dry_run else ""
        if full_element:
            print(f'  {status}line {t["line"]}: "{t["display"]}" → "{new_text}"')
        else:
            after = t["display"].replace(find, new_text, 1)
            print(f'  {status}line {t["line"]}: "{t["display"]}" → "{after}"')

    if dry_run:
        return len(targets)

    # Escape the find string for matching in raw XML text
    escaped_find = (
        (
            find.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace('"', "&quot;")
        )
        if find
        else ""
    )

    # Apply replacements in reverse order (so positions don't shift)
    result = raw
    for t in sorted(targets, key=lambda x: x["start"], reverse=True):
        old_tag = t["full_match"]

        if full_element:
            # Replace entire <a:t> content
            attr_match = re.match(r"<a:t(\s[^>]*)?>.*</a:t>", old_tag, re.DOTALL)
            attrs = attr_match.group(1) if attr_match and attr_match.group(1) else ""

            final_text = escaped_new
        else:
            # Substring replacement: only swap the matched portion
            attr_match = re.match(r"<a:t(\s[^>]*)?>([^<]*)</a:t>", old_tag, re.DOTALL)
            attrs = attr_match.group(1) if attr_match and attr_match.group(1) else ""
            old_content = attr_match.group(2) if attr_match else t["text"]

            final_text = old_content.replace(escaped_find, escaped_new, 1)

        # Add xml:space="preserve" if result has leading/trailing spaces
        unescaped_result = final_text.replace("&amp;", "&")
        if (
            unescaped_result.startswith(" ") or unescaped_result.endswith(" ")
        ) and "xml:space" not in (attrs or ""):
            attrs = f' xml:space="preserve"{attrs}'

        new_tag = f"<a:t{attrs}>{final_text}</a:t>"
        result = result[: t["start"]] + new_tag + result[t["end"] :]

    slide_path.write_text(result, encoding="utf-8")
    print(f"Updated: {slide_path.name} ({len(targets)} replacement(s))")
    return len(targets)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Replace the Nth occurrence of text in a slide XML file.",
        epilog="Use --list first to see all text with indices.",
    )
    parser.add_argument("slide", help="Path to slide XML file")
    parser.add_argument(
        "--list", action="store_true", dest="list_mode", help="List all <a:t> elements with indices"
    )
    parser.add_argument("--find", metavar="TEXT", help="Text substring to match")
    parser.add_argument("--nth", type=int, metavar="N", help="Replace the Nth occurrence (1-based)")
    parser.add_argument(
        "--index", type=int, metavar="N", help="Replace by global index (0-based, from --list)"
    )
    parser.add_argument(
        "--all", action="store_true", dest="replace_all", help="Replace ALL occurrences"
    )
    parser.add_argument("--text", metavar="TEXT", help="Replacement text")
    parser.add_argument(
        "--full", action="store_true", help="Replace entire <a:t> content (default: substring only)"
    )
    parser.add_argument("--dry-run", action="store_true", help="Preview without modifying")

    args = parser.parse_args()
    slide_path = Path(args.slide)

    if not slide_path.is_file():
        print(f"Error: {slide_path} not found", file=sys.stderr)
        sys.exit(1)

    # List mode
    if args.list_mode:
        elements = list_text(slide_path, find=args.find)
        if not elements:
            label = f' matching "{args.find}"' if args.find else ""
            print(f"No <a:t> elements found{label}")
            sys.exit(0)

        print(f"{'Idx':>4}  {'Line':>5}  Text")
        print(f"{'---':>4}  {'----':>5}  ----")
        for el in elements:
            text_preview = el["display"][:80]
            if len(el["display"]) > 80:
                text_preview += "..."
            print(f"{el['index']:4d}  {el['line']:5d}  {text_preview}")
        sys.exit(0)

    # Replace mode — args.text is None when omitted, "" when --text "" (valid: blanks text)
    if args.text is None:
        parser.error("--text is required for replacement")
    if not args.find and args.index is None:
        parser.error("specify --find TEXT or --index N")

    count = replace_nth(
        slide_path,
        find=args.find,
        nth=args.nth,
        global_index=args.index,
        replace_all=args.replace_all,
        new_text=args.text,
        full=args.full,
        dry_run=args.dry_run,
    )
    sys.exit(0 if count > 0 else 1)
