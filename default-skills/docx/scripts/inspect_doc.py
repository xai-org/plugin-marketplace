"""Inspect structure and content of an unpacked DOCX/DOTX document.

Shows page setup, theme fonts/colors, styles, text content summary,
and media inventory — without reading raw XML.

Usage:
    python scripts/inspect_doc.py unpacked/
    python scripts/inspect_doc.py unpacked/ --text       # also show text content
    python scripts/inspect_doc.py unpacked/ --media      # also show media files

Examples:
    $ python scripts/inspect_doc.py unpacked/

    === Document Info ===
      Page: 11.7"×8.3" landscape (A4)
      Margins: top=1.0" bottom=1.0" left=1.0" right=1.0"
      Headers: even, default, first
      Footers: even, default, first

    === Theme ===
      Title font:  Calibri
      Body font:   Cambria
      Color scheme: Office
        dk1          = system:000000
        accent1      = #4F81BD

    === Styles ===
      Normal          → Calibri 11pt
      Heading 1       → Cambria 14pt bold #365F91
      Title           → Cambria 26pt #17365D

    === Content Summary ===
      Paragraphs: 42
      Tables: 2
      Images: 3
      Text preview: "Name Surname | Job Title | Work Street..."
"""

import sys
from pathlib import Path

import defusedxml.minidom


def _get_text(node):
    if node.nodeType == node.TEXT_NODE:
        return node.data
    return "".join(_get_text(c) for c in node.childNodes)


def inspect_page_setup(unpacked_dir: Path) -> str:
    """Show page size, margins, orientation, headers/footers."""
    doc_path = unpacked_dir / "word" / "document.xml"
    if not doc_path.is_file():
        return ""

    dom = defusedxml.minidom.parse(str(doc_path))
    lines = ["\n=== Document Info ==="]

    for sectPr in dom.getElementsByTagName("w:sectPr"):
        # Page size
        for pgSz in sectPr.getElementsByTagName("w:pgSz"):
            w = pgSz.getAttribute("w:w")
            h = pgSz.getAttribute("w:h")
            orient = pgSz.getAttribute("w:orient") or "portrait"
            if w and h:
                w_in = int(w) / 1440
                h_in = int(h) / 1440
                # Detect paper size
                paper = ""
                if abs(w_in - 11.69) < 0.2 and abs(h_in - 8.27) < 0.2:
                    paper = " (A4)"
                elif abs(w_in - 8.27) < 0.2 and abs(h_in - 11.69) < 0.2:
                    paper = " (A4)"
                elif abs(w_in - 8.5) < 0.2 and abs(h_in - 11.0) < 0.2:
                    paper = " (Letter)"
                elif abs(w_in - 11.0) < 0.2 and abs(h_in - 8.5) < 0.2:
                    paper = " (Letter)"
                lines.append(f'  Page: {w_in:.1f}"×{h_in:.1f}" {orient}{paper}')

        # Margins
        for pgMar in sectPr.getElementsByTagName("w:pgMar"):
            parts = []
            for side in ("top", "bottom", "left", "right"):
                val = pgMar.getAttribute(f"w:{side}")
                if val:
                    parts.append(f'{side}={int(val) / 1440:.1f}"')
            if parts:
                lines.append(f"  Margins: {' '.join(parts)}")

        # Headers/footers
        h_types = [
            el.getAttribute("w:type") for el in sectPr.getElementsByTagName("w:headerReference")
        ]
        f_types = [
            el.getAttribute("w:type") for el in sectPr.getElementsByTagName("w:footerReference")
        ]
        if h_types:
            lines.append(f"  Headers: {', '.join(h_types)}")
        if f_types:
            lines.append(f"  Footers: {', '.join(f_types)}")

        break  # first sectPr only

    return "\n".join(lines) if len(lines) > 1 else ""


def inspect_theme(unpacked_dir: Path) -> str:
    """Show theme fonts and colors."""
    theme_dir = unpacked_dir / "word" / "theme"
    if not theme_dir.is_dir():
        return ""

    lines = ["\n=== Theme ==="]
    for theme_file in sorted(theme_dir.glob("theme*.xml")):
        try:
            dom = defusedxml.minidom.parse(str(theme_file))
        except Exception:
            continue

        for fontScheme in dom.getElementsByTagName("a:fontScheme"):
            for majorFont in fontScheme.getElementsByTagName("a:majorFont"):
                for latin in majorFont.getElementsByTagName("a:latin"):
                    lines.append(f"  Title font:  {latin.getAttribute('typeface')}")
                break
            for minorFont in fontScheme.getElementsByTagName("a:minorFont"):
                for latin in minorFont.getElementsByTagName("a:latin"):
                    lines.append(f"  Body font:   {latin.getAttribute('typeface')}")
                break
            break

        for scheme in dom.getElementsByTagName("a:clrScheme"):
            scheme_name = scheme.getAttribute("name")
            lines.append(f"  Color scheme: {scheme_name}")
            for child in scheme.childNodes:
                if child.nodeType != child.ELEMENT_NODE:
                    continue
                color_name = child.tagName.replace("a:", "")
                for sub in child.childNodes:
                    if sub.nodeType != sub.ELEMENT_NODE:
                        continue
                    if sub.tagName == "a:srgbClr":
                        lines.append(f"    {color_name:12s} = #{sub.getAttribute('val')}")
                    elif sub.tagName == "a:sysClr":
                        clr = sub.getAttribute("lastClr") or sub.getAttribute("val") or "?"
                        lines.append(f"    {color_name:12s} = system:{clr}")
            break

        break

    return "\n".join(lines) if len(lines) > 1 else ""


def inspect_styles(unpacked_dir: Path) -> str:
    """Show key document styles with font/size/color info."""
    styles_path = unpacked_dir / "word" / "styles.xml"
    if not styles_path.is_file():
        return ""

    dom = defusedxml.minidom.parse(str(styles_path))
    lines = ["\n=== Styles ==="]

    for style in dom.getElementsByTagName("w:style"):
        style_type = style.getAttribute("w:type")
        if style_type not in ("paragraph", "character"):
            continue

        style_id = style.getAttribute("w:styleId") or ""
        # Get display name
        name = style_id
        for nameEl in style.getElementsByTagName("w:name"):
            name = nameEl.getAttribute("w:val") or name
            break

        # Skip internal/hidden styles
        semi_hidden = style.getElementsByTagName("w:semiHidden")
        if semi_hidden:
            continue

        # Get formatting
        parts = []
        for rPr in style.getElementsByTagName("w:rPr"):
            for rFonts in rPr.getElementsByTagName("w:rFonts"):
                font = rFonts.getAttribute("w:ascii") or rFonts.getAttribute("w:hAnsi") or ""
                if font:
                    parts.append(font)
            for sz in rPr.getElementsByTagName("w:sz"):
                val = sz.getAttribute("w:val")
                if val:
                    parts.append(f"{int(val) // 2}pt")
            if rPr.getElementsByTagName("w:b"):
                parts.append("bold")
            if rPr.getElementsByTagName("w:i"):
                parts.append("italic")
            for color in rPr.getElementsByTagName("w:color"):
                val = color.getAttribute("w:val")
                theme = color.getAttribute("w:themeColor")
                if val and val != "auto":
                    parts.append(f"#{val}")
                elif theme:
                    parts.append(theme)
            break  # first rPr only

        fmt = " ".join(parts) if parts else "(default)"
        lines.append(f"  {name:20s} → {fmt}")

    return "\n".join(lines) if len(lines) > 1 else ""


def inspect_content(unpacked_dir: Path, show_text: bool = False) -> str:
    """Show content summary: paragraph count, tables, images, text preview."""
    doc_path = unpacked_dir / "word" / "document.xml"
    if not doc_path.is_file():
        return ""

    dom = defusedxml.minidom.parse(str(doc_path))
    lines = ["\n=== Content Summary ==="]

    # Count elements
    paragraphs = dom.getElementsByTagName("w:p")
    tables = dom.getElementsByTagName("w:tbl")
    drawings = dom.getElementsByTagName("w:drawing")
    images = dom.getElementsByTagName("pic:pic")

    # Count text boxes (txbxContent elements)
    txbx_elements = dom.getElementsByTagName("w:txbxContent")
    txbx_texts = []
    for txbx in txbx_elements:
        txbx_text = []
        for t in txbx.getElementsByTagName("w:t"):
            txt = _get_text(t).strip()
            if txt:
                txbx_text.append(txt)
        if txbx_text:
            txbx_texts.append(" ".join(txbx_text))

    lines.append(f"  Paragraphs: {len(paragraphs)}")
    if txbx_texts:
        lines.append(f"  Text boxes: {len(txbx_texts)} (with editable text — use replace_text.py)")
    if tables:
        lines.append(f"  Tables: {len(tables)}")
    if drawings or images:
        lines.append(f"  Images/drawings: {max(len(drawings), len(images))}")

    # Collect all text
    all_text = []
    for t in dom.getElementsByTagName("w:t"):
        txt = _get_text(t).strip()
        if txt:
            all_text.append(txt)

    if all_text:
        preview = " | ".join(all_text)
        if len(preview) > 200:
            preview = preview[:197] + "..."
        lines.append(f'  Text preview: "{preview}"')

        # Show text items if --text (deduplicated, capped, skip noise)
        if show_text:
            # Filter out noise: single chars, bare numbers, day abbreviations
            _NOISE = {"M", "T", "W", "F", "S"}
            meaningful = []
            seen = set()
            for txt in all_text:
                # Skip single-char items and bare numbers (calendar days)
                if len(txt) <= 2 and (txt.isdigit() or txt in _NOISE or txt in {"!", '"', "'"}):
                    continue
                # Deduplicate
                key = txt[:80].lower()
                if key in seen:
                    continue
                seen.add(key)
                meaningful.append(txt)

            n_skipped = len(all_text) - len(meaningful)
            lines.append(
                f"\n  --- Unique Text ({len(meaningful)} items, {n_skipped} noise/duplicates skipped) ---"
            )

            MAX_ITEMS = 60
            for i, txt in enumerate(meaningful[:MAX_ITEMS]):
                if len(txt) > 80:
                    txt = txt[:77] + "..."
                lines.append(f"  [{i:3d}] {txt}")
            if len(meaningful) > MAX_ITEMS:
                lines.append(f"  ... and {len(meaningful) - MAX_ITEMS} more")

        # Show text box content separately
        if txbx_texts:
            lines.append(
                f"\n  --- Text in Text Boxes ({len(txbx_texts)} boxes — editable with replace_text.py) ---"
            )
            for i, txt in enumerate(txbx_texts):
                if len(txt) > 80:
                    txt = txt[:77] + "..."
                lines.append(f'  [txbx {i}] "{txt}"')

    return "\n".join(lines)


def inspect_sections_text(unpacked_dir: Path) -> str:
    """Show text content grouped by document section."""
    doc_path = unpacked_dir / "word" / "document.xml"
    if not doc_path.is_file():
        return ""

    dom = defusedxml.minidom.parse(str(doc_path))

    # Walk paragraphs and group by section
    body = dom.getElementsByTagName("w:body")
    if not body:
        return ""

    sections: list[list[str]] = [[]]  # list of sections, each is list of text strings
    _NOISE = {"M", "T", "W", "F", "S"}

    for child in body[0].childNodes:
        if child.nodeType != child.ELEMENT_NODE:
            continue

        if child.tagName == "w:p":
            # Check if this paragraph contains a section break
            has_sect = False
            for pPr in child.getElementsByTagName("w:pPr"):
                if pPr.getElementsByTagName("w:sectPr"):
                    has_sect = True
                break

            # Collect text from this paragraph
            para_text = []
            for t in child.getElementsByTagName("w:t"):
                txt = _get_text(t).strip()
                if txt and not (
                    len(txt) <= 2 and (txt.isdigit() or txt in _NOISE or txt in {"!", '"', "'"})
                ):
                    para_text.append(txt)

            if para_text:
                combined = " ".join(para_text)
                sections[-1].append(combined)

            if has_sect:
                sections.append([])

        elif child.tagName == "w:tbl":
            # Collect text from table
            table_texts = []
            for t in child.getElementsByTagName("w:t"):
                txt = _get_text(t).strip()
                if txt and not (
                    len(txt) <= 2 and (txt.isdigit() or txt in _NOISE or txt in {"!", '"', "'"})
                ):
                    table_texts.append(txt)
            if table_texts:
                sections[-1].append(
                    f"[table: {' | '.join(table_texts[:10])}{'...' if len(table_texts) > 10 else ''}]"
                )

    lines = ["\n=== Text by Section ==="]
    for idx, sec_texts in enumerate(sections):
        # Deduplicate within section
        seen = set()
        unique = []
        for t in sec_texts:
            key = t[:80].lower()
            if key not in seen:
                seen.add(key)
                unique.append(t)

        lines.append(f"\n  --- Section {idx} ({len(unique)} items) ---")
        for _i, txt in enumerate(unique[:20]):
            if len(txt) > 100:
                txt = txt[:97] + "..."
            lines.append(f"    {txt}")
        if len(unique) > 20:
            lines.append(f"    ... and {len(unique) - 20} more")

    return "\n".join(lines)


def inspect_media(unpacked_dir: Path) -> str:
    """Show media files in word/media/."""
    media_dir = unpacked_dir / "word" / "media"
    if not media_dir.is_dir():
        return ""

    media_files = sorted(f for f in media_dir.iterdir() if f.is_file())
    if not media_files:
        return ""

    # Build refs from document.xml.rels
    media_refs: dict[str, list[str]] = {}
    rels_path = unpacked_dir / "word" / "_rels" / "document.xml.rels"
    if rels_path.is_file():
        try:
            dom = defusedxml.minidom.parse(str(rels_path))
            for rel in dom.getElementsByTagName("Relationship"):
                target = rel.getAttribute("Target")
                rid = rel.getAttribute("Id")
                if target and "media/" in target:
                    resolved = (unpacked_dir / "word" / target).resolve()
                    try:
                        rel_path = str(resolved.relative_to(unpacked_dir.resolve()))
                    except ValueError:
                        continue
                    media_refs.setdefault(rel_path, []).append(rid)
        except Exception:
            pass

    lines = ["\n=== Media Files ==="]
    for f in media_files:
        rel_path = str(f.relative_to(unpacked_dir))
        size = f.stat().st_size
        if size >= 1_048_576:
            size_str = f"{size / 1_048_576:.1f} MB"
        elif size >= 1024:
            size_str = f"{size / 1024:.0f} KB"
        else:
            size_str = f"{size} B"
        ext = f.suffix.lstrip(".").lower()
        refs = media_refs.get(rel_path, [])
        ref_str = ", ".join(refs) if refs else "(unused)"
        lines.append(f"  {rel_path:35s} {size_str:>8s}  {ext:4s}  {ref_str}")

    total = sum(f.stat().st_size for f in media_files)
    total_str = f"{total / 1024:.0f} KB" if total < 1_048_576 else f"{total / 1_048_576:.1f} MB"
    lines.append(f"\n  Total: {len(media_files)} files, {total_str}")

    return "\n".join(lines)


if __name__ == "__main__":
    import signal

    signal.signal(signal.SIGPIPE, signal.SIG_DFL)

    if len(sys.argv) < 2:
        print(
            "Usage: python inspect_doc.py <unpacked_dir/> [--text] [--sections] [--media]",
            file=sys.stderr,
        )
        print("  --text       Show unique text items (flat list)", file=sys.stderr)
        print("  --sections   Show text grouped by document section", file=sys.stderr)
        print("  --media      Show media file inventory", file=sys.stderr)
        sys.exit(1)

    show_text = "--text" in sys.argv
    show_sections = "--sections" in sys.argv
    show_media = "--media" in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    path = Path(args[0])

    import subprocess
    import tempfile

    # Auto-detect: if given a file, unpack to temp dir and inspect that
    cleanup_tmp = None
    if path.is_file() and path.suffix.lower() in (".docx", ".dotx", ".doc", ".dotm"):
        cleanup_tmp = tempfile.mkdtemp(prefix="inspect_doc_")
        script_dir = Path(__file__).resolve().parent
        unpack_script = script_dir / "office" / "unpack.py"
        result = subprocess.run(
            [sys.executable, str(unpack_script), str(path), cleanup_tmp],
            capture_output=True,
            text=True,
        )
        if result.returncode != 0:
            print(f"Error unpacking {path}: {result.stderr[:200]}", file=sys.stderr)
            sys.exit(1)
        path = Path(cleanup_tmp)
    elif path.is_file():
        print(
            f"Error: {path} is a file but not a Word document (.docx/.dotx). "
            f"Pass an unpacked directory or a .docx/.dotx file.",
            file=sys.stderr,
        )
        sys.exit(1)
    elif not path.is_dir():
        print(f"Error: {path} not found", file=sys.stderr)
        sys.exit(1)

    if not (path / "word").is_dir():
        print(f"Error: {path}/word/ not found — is this an unpacked docx?", file=sys.stderr)
        sys.exit(1)

    try:
        print(inspect_page_setup(path))
        print(inspect_theme(path))
        print(inspect_styles(path))
        print(inspect_content(path, show_text=show_text))
        if show_sections:
            print(inspect_sections_text(path))
        if show_media:
            print(inspect_media(path))
    finally:
        if cleanup_tmp:
            import shutil

            shutil.rmtree(cleanup_tmp, ignore_errors=True)
