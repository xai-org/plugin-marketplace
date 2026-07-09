"""Replace text in a PPTX slide placeholder while preserving formatting.

Handles the common template-filling pattern: find a placeholder by type or
text content, replace its text with new content, and inherit the template's
fonts, colors, and sizes automatically.

Usage:
    # Simple replacement — inherits formatting from template's first run
    python scripts/replace_text.py slide.xml --ph ctrTitle --text "New Title"

    # Multi-line — \\n creates <a:br> line breaks within one paragraph
    python scripts/replace_text.py slide.xml --ph subTitle --text "Line 1\\nLine 2"

    # Custom formatting per run (JSON array)
    python scripts/replace_text.py slide.xml --ph ctrTitle --runs '[
      {"text": "Gift the Glow", "size": 4800, "color": "accent1"},
      {"br": true},
      {"text": "Subtitle here", "size": 2000, "color": "accent4"}
    ]'

    # Match by text content instead of placeholder type
    python scripts/replace_text.py slide.xml --match "Christmas" --text "Holiday"

    # Auto-shrink text to fit the text box (prevents overflow/overlap)
    python scripts/replace_text.py slide.xml --ph ctrTitle --text "Long Title" --autofit

    # Preview without modifying (dry run)
    python scripts/replace_text.py slide.xml --ph ctrTitle --text "New" --dry-run

Run inspect_slide.py first to see placeholder types, dimensions, and autofit mode.

JSON run format:
    {"text": "...", "size": 4800, "color": "accent1", "font": "Arial", "bold": true}
    {"br": true}   — line break

    - size: hundredths of a point (4800 = 48pt)
    - color: scheme name (accent1, dk1, lt1) or hex (#FF0000)
    - font: typeface name
    - bold/italic: boolean
    - Omitted properties inherit from template's first run
"""

import json
import re
import sys
from pathlib import Path

import defusedxml.minidom


def _get_text(node):
    """Get all text from a node and children."""
    if node.nodeType == node.TEXT_NODE:
        return node.data
    return "".join(_get_text(c) for c in node.childNodes)


def _extract_run_format(rPr):
    """Extract formatting dict from <a:rPr> element."""
    if rPr is None:
        return {}
    fmt = {}

    sz = rPr.getAttribute("sz")
    if sz:
        fmt["size"] = int(sz)

    if rPr.getAttribute("b") == "1":
        fmt["bold"] = True
    if rPr.getAttribute("i") == "1":
        fmt["italic"] = True

    lang = rPr.getAttribute("lang")
    if lang:
        fmt["lang"] = lang

    for latin in rPr.getElementsByTagName("a:latin"):
        tf = latin.getAttribute("typeface")
        if tf:
            fmt["font"] = tf
        break

    for solid in rPr.getElementsByTagName("a:solidFill"):
        for scheme in solid.getElementsByTagName("a:schemeClr"):
            fmt["color"] = scheme.getAttribute("val")
        for srgb in solid.getElementsByTagName("a:srgbClr"):
            fmt["color"] = f"#{srgb.getAttribute('val')}"
        break

    return fmt


def _format_summary(fmt):
    """One-line summary of a format dict."""
    parts = []
    if "font" in fmt:
        parts.append(fmt["font"])
    if "size" in fmt:
        parts.append(f"{fmt['size'] // 100}pt")
    if fmt.get("bold"):
        parts.append("bold")
    if "color" in fmt:
        parts.append(fmt["color"])
    return " ".join(parts) or "(default)"


def _find_target_shapes(dom, ph_type=None, match_text=None):
    """Find ALL matching <p:sp> elements by placeholder type or text match.

    Returns list of (sp_element, shape_name, placeholder_type) tuples.
    """
    results = []
    for sp in dom.getElementsByTagName("p:sp"):
        name = sp_ph_type = ""
        for nvSpPr in sp.getElementsByTagName("p:nvSpPr"):
            for cNvPr in nvSpPr.getElementsByTagName("p:cNvPr"):
                name = cNvPr.getAttribute("name")
            for nvPr in nvSpPr.getElementsByTagName("p:nvPr"):
                for ph in nvPr.getElementsByTagName("p:ph"):
                    sp_ph_type = ph.getAttribute("type") or "body"
            break

        if ph_type and sp_ph_type == ph_type:
            results.append((sp, name, sp_ph_type))

        elif match_text:
            full_text = ""
            for txBody in sp.getElementsByTagName("p:txBody"):
                for t in txBody.getElementsByTagName("a:t"):
                    full_text += _get_text(t)
            if match_text.lower() in full_text.lower():
                results.append((sp, name, sp_ph_type))

    return results


def _get_default_format(txBody):
    """Extract formatting from the first non-empty run in a txBody."""
    for p in txBody.childNodes:
        if p.nodeType != p.ELEMENT_NODE or p.tagName != "a:p":
            continue
        for child in p.childNodes:
            if child.nodeType != child.ELEMENT_NODE or child.tagName != "a:r":
                continue
            for sub in child.childNodes:
                if sub.nodeType == sub.ELEMENT_NODE and sub.tagName == "a:rPr":
                    fmt = _extract_run_format(sub)
                    if fmt:
                        return fmt
    return {}


def _get_pPr_xml(txBody):
    """Get the <a:pPr> XML string from the first paragraph, or a default."""
    for p in txBody.childNodes:
        if p.nodeType != p.ELEMENT_NODE or p.tagName != "a:p":
            continue
        for child in p.childNodes:
            if child.nodeType == child.ELEMENT_NODE and child.tagName == "a:pPr":
                return child.toxml()
    return ""


def _get_old_text(txBody):
    """Get all text from a txBody for display."""
    parts = []
    for p in txBody.childNodes:
        if p.nodeType != p.ELEMENT_NODE or p.tagName != "a:p":
            continue
        p_texts = []
        for child in p.childNodes:
            if child.nodeType != child.ELEMENT_NODE:
                continue
            if child.tagName == "a:r":
                for t in child.getElementsByTagName("a:t"):
                    p_texts.append(_get_text(t))
            elif child.tagName == "a:br":
                p_texts.append("↵")
        parts.append("".join(p_texts))
    return " | ".join(parts)


def _build_rPr_xml(fmt):
    """Build an <a:rPr> XML string from a format dict."""
    attrs = []
    if "lang" in fmt:
        attrs.append(f'lang="{fmt["lang"]}"')
    else:
        attrs.append('lang="en"')
    if "size" in fmt:
        attrs.append(f'sz="{fmt["size"]}"')
    if fmt.get("bold"):
        attrs.append('b="1"')
    if fmt.get("italic"):
        attrs.append('i="1"')

    children = []

    # Color
    color = fmt.get("color", "")
    if color.startswith("#"):
        children.append(f'<a:solidFill><a:srgbClr val="{color[1:]}"/></a:solidFill>')
    elif color:
        children.append(f'<a:solidFill><a:schemeClr val="{color}"/></a:solidFill>')

    # Font
    if "font" in fmt:
        children.append(f'<a:latin typeface="{fmt["font"]}"/>')

    attrs_str = " ".join(attrs)
    if children:
        return f"<a:rPr {attrs_str}>{''.join(children)}</a:rPr>"
    else:
        return f"<a:rPr {attrs_str}/>"


def _build_paragraph_xml(pPr_xml, runs, default_fmt):
    """Build a complete <a:p> XML string.

    Args:
        pPr_xml: the <a:pPr ...> string to preserve (or empty)
        runs: list of run dicts [{"text": "..."}, {"br": true}, ...]
        default_fmt: default formatting dict (from template)
    """
    parts = ["<a:p>"]

    if pPr_xml:
        parts.append(f"            {pPr_xml}")

    for run in runs:
        if run.get("br"):
            parts.append('            <a:br><a:rPr lang="en"/></a:br>')
            continue

        text = run.get("text", "")
        if not text:
            continue

        # Merge formatting: run overrides default
        merged = dict(default_fmt)
        for key in ("size", "color", "font", "bold", "italic", "lang"):
            if key in run:
                merged[key] = run[key]

        rPr_xml = _build_rPr_xml(merged)

        # Escape XML special chars in text
        escaped = (
            text.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace('"', "&quot;")
        )

        space_attr = ""
        if text.startswith(" ") or text.endswith(" "):
            space_attr = ' xml:space="preserve"'

        parts.append(f"            <a:r>{rPr_xml}<a:t{space_attr}>{escaped}</a:t></a:r>")

    parts.append('            <a:endParaRPr lang="en"/>')
    parts.append("          </a:p>")

    return "\n".join(parts)


def _replace_in_shape(raw: str, name: str, new_p_xml: str, autofit: bool) -> str | None:
    """Replace <a:p> blocks in the named shape within the raw XML string.

    Returns the modified raw string, or None if the replacement failed.
    """
    name_escaped = re.escape(name)

    # Find the shape block containing this name
    shape_pattern = re.compile(
        r'(<p:sp\b[^>]*>.*?name="' + name_escaped + r'".*?</p:sp>)',
        re.DOTALL,
    )
    shape_match = shape_pattern.search(raw)
    if not shape_match:
        return None

    shape_xml = shape_match.group(1)
    shape_start = shape_match.start()

    # Find <p:txBody> within the shape
    txbody_pattern = re.compile(r"(<p:txBody>)(.*?)(</p:txBody>)", re.DOTALL)
    txbody_match = txbody_pattern.search(shape_xml)
    if not txbody_match:
        return None

    txbody_content = txbody_match.group(2)

    # Find all <a:p> blocks
    p_blocks_pattern = re.compile(
        r"(<a:p\b.*?</a:p>(?:\s*<a:p\b.*?</a:p>)*)",
        re.DOTALL,
    )
    p_match = p_blocks_pattern.search(txbody_content)
    if not p_match:
        return None

    old_p_section = p_match.group(1)

    # Do the replacement
    new_raw = raw[:shape_start] + raw[shape_start:].replace(old_p_section, new_p_xml, 1)

    # Verify it actually changed
    if new_raw == raw:
        return None

    # Inject autofit if requested
    if autofit:
        shape_section = new_raw[shape_start:]
        # Remove existing autofit elements
        for pat in (r"<a:normAutofit[^/]*/>", r"<a:spAutoFit[^/]*/>", r"<a:noAutofit[^/]*/>"):
            shape_section = re.sub(pat, "", shape_section, count=1)
        # Insert <a:normAutofit/>
        bodypr_self = re.search(r"(<a:bodyPr\b[^>]*)/>", shape_section)
        if bodypr_self:
            shape_section = (
                shape_section[: bodypr_self.start()]
                + bodypr_self.group(1)
                + "><a:normAutofit/></a:bodyPr>"
                + shape_section[bodypr_self.end() :]
            )
        else:
            bodypr_open = re.search(r"(<a:bodyPr\b[^>]*>)", shape_section)
            if bodypr_open:
                pos = bodypr_open.end()
                shape_section = shape_section[:pos] + "<a:normAutofit/>" + shape_section[pos:]
        new_raw = new_raw[:shape_start] + shape_section

    return new_raw


def replace_text_in_slide(
    slide_path: Path,
    *,
    ph_type: str | None = None,
    match_text: str | None = None,
    new_text: str | None = None,
    new_runs: list[dict] | None = None,
    autofit: bool = True,
    dry_run: bool = False,
) -> bool:
    """Replace text in ALL matching slide placeholders.

    Args:
        slide_path: path to slide XML file
        ph_type: placeholder type to match (ctrTitle, subTitle, body, etc.)
        match_text: text substring to match (case-insensitive)
        new_text: simple replacement text (\\n for line breaks)
        new_runs: list of run dicts for custom formatting
        autofit: if True, enable text auto-shrink to prevent overflow
        dry_run: if True, print what would change without modifying

    Returns True if at least one replacement was made.
    """
    raw = slide_path.read_text(encoding="utf-8")
    dom = defusedxml.minidom.parseString(raw)

    # Find ALL matching shapes
    matches = _find_target_shapes(dom, ph_type=ph_type, match_text=match_text)
    if not matches:
        target_desc = f"ph={ph_type}" if ph_type else f"match='{match_text}'"
        print(f"Error: No shape found matching {target_desc}", file=sys.stderr)
        return False

    if len(matches) > 1:
        print(f"Found {len(matches)} matching shapes — replacing all")

    # Build the runs list (same for all matches)
    if new_runs is not None:
        runs = new_runs
    elif new_text is not None:
        lines = new_text.split("\\n") if "\\n" in new_text else new_text.split("\n")
        runs = []
        for i, line in enumerate(lines):
            if i > 0:
                runs.append({"br": True})
            runs.append({"text": line})
    else:
        print("Error: Specify --text or --runs", file=sys.stderr)
        return False

    new_text_preview = ""
    for r in runs:
        if r.get("br"):
            new_text_preview += "↵"
        elif r.get("text"):
            new_text_preview += r["text"]

    replaced = 0
    failed = 0
    current_raw = raw

    for sp, name, found_ph in matches:
        # Get txBody for this shape
        txBodies = sp.getElementsByTagName("p:txBody")
        if not txBodies:
            continue
        txBody = txBodies[0]

        old_text = _get_old_text(txBody)
        default_fmt = _get_default_format(txBody)
        pPr_xml = _get_pPr_xml(txBody)

        # Build paragraph XML using THIS shape's formatting
        new_p_xml = _build_paragraph_xml(pPr_xml, runs, default_fmt)

        ph_desc = f" ({found_ph})" if found_ph else ""
        print(f"Shape: [{name}]{ph_desc}")
        print(f'  old: "{old_text}"')
        print(f'  new: "{new_text_preview}"')
        print(f"  fmt: {_format_summary(default_fmt)}")

        if dry_run:
            print("  [DRY RUN] would replace")
            replaced += 1
            continue

        result = _replace_in_shape(current_raw, name, new_p_xml, autofit)
        if result is None:
            print(
                f"  WARNING: replacement failed for shape [{name}] — text may be split across runs",
                file=sys.stderr,
            )
            print(
                "  TIP: use Edit tool on the XML directly to replace <a:t> content",
                file=sys.stderr,
            )
            failed += 1
        else:
            current_raw = result
            if autofit:
                print("  autofit: enabled")
            replaced += 1

    if not dry_run and replaced > 0:
        slide_path.write_text(current_raw, encoding="utf-8")

    # Summary
    if replaced > 0:
        print(f"Updated: {slide_path.name} ({replaced} shape(s) replaced)")
    if failed > 0:
        print(f"WARNING: {failed} shape(s) failed — use Edit tool for manual XML replacement")

    return replaced > 0


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Replace text in a PPTX slide placeholder.",
        epilog="Run inspect_slide.py first to see placeholder types.",
    )
    parser.add_argument("slide", help="Path to slide XML file")
    parser.add_argument(
        "--ph", metavar="TYPE", help="Placeholder type (ctrTitle, subTitle, body, ...)"
    )
    parser.add_argument(
        "--match", metavar="TEXT", help="Match shape by text content (case-insensitive)"
    )
    parser.add_argument("--text", metavar="TEXT", help="Replacement text (use \\n for line breaks)")
    parser.add_argument("--runs", metavar="JSON", help="Custom formatted runs as JSON array")
    parser.add_argument(
        "--autofit",
        action="store_true",
        default=True,
        help="Enable text auto-shrink to prevent overflow/overlap (default: on)",
    )
    parser.add_argument(
        "--no-autofit",
        action="store_false",
        dest="autofit",
        help="Disable auto-shrink (keep original autofit mode)",
    )
    parser.add_argument("--dry-run", action="store_true", help="Preview without modifying")

    args = parser.parse_args()

    if not args.ph and not args.match:
        parser.error("Specify --ph TYPE or --match TEXT to identify the target")
    if not args.text and not args.runs:
        parser.error("Specify --text or --runs for replacement content")

    slide_path = Path(args.slide)
    if not slide_path.is_file():
        print(f"Error: {slide_path} not found", file=sys.stderr)
        sys.exit(1)

    new_runs = None
    if args.runs:
        try:
            new_runs = json.loads(args.runs)
        except json.JSONDecodeError as e:
            print(f"Error: Invalid JSON in --runs: {e}", file=sys.stderr)
            sys.exit(1)

    ok = replace_text_in_slide(
        slide_path,
        ph_type=args.ph,
        match_text=args.match,
        new_text=args.text,
        new_runs=new_runs,
        autofit=args.autofit,
        dry_run=args.dry_run,
    )
    sys.exit(0 if ok else 1)
