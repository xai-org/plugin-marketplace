"""Inspect placeholders, text, images, and media in unpacked PPTX slides.

Shows placeholder types, text formatting, image references, and media inventory
so you can understand slide structure without reading raw XML.

Usage:
    python scripts/inspect_slide.py unpacked/ppt/slides/slide1.xml
    python scripts/inspect_slide.py unpacked/              # all slides
    python scripts/inspect_slide.py unpacked/ --theme      # also show theme colors
    python scripts/inspect_slide.py unpacked/ --media      # also show media inventory

Examples:
    $ python scripts/inspect_slide.py unpacked/ --theme --media

    === Theme Colors ===
      Scheme: Christmas
        accent1      = #F33D41

    === slide1.xml ===

    [0] Title 1 (ctrTitle)  8.2"×1.4" autofit=fixed
      text: "This is your Christmas presentation"
      'T'                                  → Satisfy 44pt accent1
      'Christmas'                          → Satisfy 48pt accent1

    [1] Picture 3  4.0"×3.0"
      image: ppt/media/image1.png (rId2)

    === Media Inventory ===
      ppt/media/image1.png     234 KB  png   ← slide1.xml
      ppt/media/image2.svg      12 KB  svg   ← slide2.xml, slide3.xml
      ppt/media/logo.emf        89 KB  emf   ← (unused)
"""

import re
import sys
from pathlib import Path

import defusedxml.minidom


def _load_rels(slide_xml_path: Path) -> dict[str, str]:
    """Load rId → target path mapping from the slide's .rels file.

    Returns dict like {"rId2": "ppt/media/image1.png", ...} with paths
    relative to the unpacked root.
    """
    rels_path = slide_xml_path.parent / "_rels" / f"{slide_xml_path.name}.rels"
    if not rels_path.is_file():
        return {}

    mapping: dict[str, str] = {}
    try:
        dom = defusedxml.minidom.parse(str(rels_path))
        for rel in dom.getElementsByTagName("Relationship"):
            rid = rel.getAttribute("Id")
            target = rel.getAttribute("Target")
            if rid and target:
                # Resolve relative path: ../media/image1.png → ppt/media/image1.png
                resolved = (slide_xml_path.parent / target).resolve()
                # Find the unpacked root (walk up to find [Content_Types].xml)
                root = slide_xml_path.parent
                while root.parent != root:
                    if (root / "[Content_Types].xml").exists():
                        break
                    root = root.parent
                try:
                    rel_path = str(resolved.relative_to(root.resolve()))
                except ValueError:
                    rel_path = target
                mapping[rid] = rel_path
    except Exception:
        pass
    return mapping


def _get_text(node):
    """Get text content of a node and all its children."""
    texts = []
    if node.nodeType == node.TEXT_NODE:
        return node.data
    for child in node.childNodes:
        texts.append(_get_text(child))
    return "".join(texts)


def _run_format(rPr_node) -> str:
    """Return compact formatting string from an <a:rPr> element."""
    if rPr_node is None:
        return "(inherited)"
    parts = []

    # Font face
    for latin in rPr_node.getElementsByTagName("a:latin"):
        tf = latin.getAttribute("typeface")
        if tf:
            parts.append(tf)

    # Font size (hundredths of a point → pt)
    sz = rPr_node.getAttribute("sz")
    if sz:
        parts.append(f"{int(sz) // 100}pt")

    # Bold / italic
    if rPr_node.getAttribute("b") == "1":
        parts.append("bold")
    if rPr_node.getAttribute("i") == "1":
        parts.append("italic")

    # Color
    for solid in rPr_node.getElementsByTagName("a:solidFill"):
        for scheme in solid.getElementsByTagName("a:schemeClr"):
            parts.append(scheme.getAttribute("val"))
        for srgb in solid.getElementsByTagName("a:srgbClr"):
            parts.append(f"#{srgb.getAttribute('val')}")
        break  # only first solidFill

    return " ".join(parts) or "(default)"


def _para_props(pPr_node) -> str:
    """Return compact paragraph property string."""
    if pPr_node is None:
        return ""
    props = []
    algn = pPr_node.getAttribute("algn")
    if algn:
        props.append(f"align={algn}")
    lvl = pPr_node.getAttribute("lvl")
    if lvl and lvl != "0":
        props.append(f"lvl={lvl}")
    return ", ".join(props)


def _shape_geometry(sp) -> str:
    """Extract shape dimensions as 'W"×H"' string from <a:ext> inside <p:spPr>."""
    for spPr in sp.getElementsByTagName("p:spPr"):
        for xfrm in spPr.getElementsByTagName("a:xfrm"):
            for ext in xfrm.getElementsByTagName("a:ext"):
                cx = ext.getAttribute("cx")
                cy = ext.getAttribute("cy")
                if cx and cy:
                    # EMU to inches: 914400 EMU = 1 inch
                    w = int(cx) / 914400
                    h = int(cy) / 914400
                    return f'{w:.1f}"×{h:.1f}"'
        break
    return ""


def _autofit_mode(txBody) -> str:
    """Detect autofit mode from <a:bodyPr>."""
    for bodyPr in txBody.getElementsByTagName("a:bodyPr"):
        for child in bodyPr.childNodes:
            if child.nodeType != child.ELEMENT_NODE:
                continue
            if child.tagName == "a:normAutofit":
                scale = child.getAttribute("fontScale")
                if scale:
                    return f"norm({int(scale) // 1000}%)"
                return "norm"
            elif child.tagName == "a:spAutoFit":
                return "grow"
            elif child.tagName == "a:noAutofit":
                return "none"
        # no autofit child means default (usually clip/overflow)
        return "fixed"
    return ""


def _pic_geometry(pic) -> str:
    """Extract dimensions from a <p:pic> element."""
    for spPr in pic.getElementsByTagName("p:spPr"):
        for xfrm in spPr.getElementsByTagName("a:xfrm"):
            for ext in xfrm.getElementsByTagName("a:ext"):
                cx = ext.getAttribute("cx")
                cy = ext.getAttribute("cy")
                if cx and cy:
                    w = int(cx) / 914400
                    h = int(cy) / 914400
                    return f'{w:.1f}"×{h:.1f}"'
        break
    return ""


def _slide_background(dom) -> str:
    """Extract slide background color if set."""
    # Check <p:bg> inside <p:cSld>
    for bg in dom.getElementsByTagName("p:bg"):
        for bgPr in bg.getElementsByTagName("p:bgPr"):
            for solid in bgPr.getElementsByTagName("a:solidFill"):
                for srgb in solid.getElementsByTagName("a:srgbClr"):
                    return f"#{srgb.getAttribute('val')}"
                for scheme in solid.getElementsByTagName("a:schemeClr"):
                    return scheme.getAttribute("val")
            # Check for gradient
            for _grad in bgPr.getElementsByTagName("a:gradFill"):
                return "gradient"
            # Check for image background
            for _blip in bgPr.getElementsByTagName("a:blipFill"):
                return "image"
        for _bgRef in bg.getElementsByTagName("p:bgRef"):
            return "theme-ref"
        break
    return ""


def inspect_slide(xml_path: Path) -> str:
    """Inspect a single slide XML and return formatted analysis."""
    dom = defusedxml.minidom.parse(str(xml_path))
    rels = _load_rels(xml_path)

    bg = _slide_background(dom)
    bg_label = f"  bg={bg}" if bg else ""
    lines = [f"\n=== {xml_path.name} ==={bg_label}"]

    shape_idx = 0

    # --- Image shapes (<p:pic>) ---
    for pic in dom.getElementsByTagName("p:pic"):
        name = ""
        for nvPicPr in pic.getElementsByTagName("p:nvPicPr"):
            for cNvPr in nvPicPr.getElementsByTagName("p:cNvPr"):
                name = cNvPr.getAttribute("name")
            break

        # Resolve media file from blip embed
        media_path = ""
        rid = ""
        for blipFill in pic.getElementsByTagName("p:blipFill"):
            for blip in blipFill.getElementsByTagName("a:blip"):
                rid = blip.getAttribute("r:embed")
                if rid and rid in rels:
                    media_path = rels[rid]
            break

        geom = _pic_geometry(pic)
        geom_label = f"  {geom}" if geom else ""
        lines.append(f"\n[{shape_idx}] {name}{geom_label}")
        if media_path:
            lines.append(f"  image: {media_path} ({rid})")
        elif rid:
            lines.append(f"  image: ({rid} — unresolved)")

        shape_idx += 1

    # --- Text shapes (<p:sp>) ---
    for sp in dom.getElementsByTagName("p:sp"):
        # Shape name and placeholder type
        name = ph_type = ph_idx = ""
        for nvSpPr in sp.getElementsByTagName("p:nvSpPr"):
            for cNvPr in nvSpPr.getElementsByTagName("p:cNvPr"):
                name = cNvPr.getAttribute("name")
            for nvPr in nvSpPr.getElementsByTagName("p:nvPr"):
                for ph in nvPr.getElementsByTagName("p:ph"):
                    ph_type = ph.getAttribute("type") or "body"
                    ph_idx = ph.getAttribute("idx")
            break

        # Shape dimensions
        geom = _shape_geometry(sp)

        # Text body
        txBodies = sp.getElementsByTagName("p:txBody")
        if not txBodies:
            continue
        txBody = txBodies[0]

        # Autofit mode
        autofit = _autofit_mode(txBody)

        paragraphs = [
            c for c in txBody.childNodes if c.nodeType == c.ELEMENT_NODE and c.tagName == "a:p"
        ]
        if not paragraphs:
            continue

        # Collect full text
        full_text_parts = []
        for p in paragraphs:
            p_texts = []
            for child in p.childNodes:
                if child.nodeType != child.ELEMENT_NODE:
                    continue
                if child.tagName == "a:r":
                    for t in child.getElementsByTagName("a:t"):
                        p_texts.append(_get_text(t))
                elif child.tagName == "a:br":
                    p_texts.append("↵")
            full_text_parts.append("".join(p_texts))

        combined = " | ".join(t for t in full_text_parts if t.strip())
        if not combined.strip():
            continue

        # Header — include dimensions and autofit mode
        ph_label = f" ({ph_type})" if ph_type else ""
        idx_label = f" idx={ph_idx}" if ph_idx else ""
        geom_label = f"  {geom}" if geom else ""
        autofit_label = f" autofit={autofit}" if autofit else ""
        lines.append(f"\n[{shape_idx}] {name}{ph_label}{idx_label}{geom_label}{autofit_label}")

        # Text preview
        preview = combined.replace("\n", "\\n")
        if len(preview) > 100:
            preview = preview[:97] + "..."
        lines.append(f'  text: "{preview}"')

        # Per-paragraph run details
        for pi, p in enumerate(paragraphs):
            pPr = None
            runs_info = []

            for child in p.childNodes:
                if child.nodeType != child.ELEMENT_NODE:
                    continue
                if child.tagName == "a:pPr":
                    pPr = child
                elif child.tagName == "a:r":
                    rPr = None
                    text = ""
                    for sub in child.childNodes:
                        if sub.nodeType != sub.ELEMENT_NODE:
                            continue
                        if sub.tagName == "a:rPr":
                            rPr = sub
                        elif sub.tagName == "a:t":
                            text = _get_text(sub)
                    if text:
                        runs_info.append((text, _run_format(rPr)))
                elif child.tagName == "a:br":
                    runs_info.append(("↵", "<br>"))

            if not runs_info:
                continue

            props = _para_props(pPr)
            if len(paragraphs) > 1:
                props_str = f" [{props}]" if props else ""
                lines.append(f"  ¶{pi}{props_str}:")

            for text, fmt in runs_info:
                text_repr = repr(text) if len(text) <= 35 else repr(text[:32] + "...")
                pad = "    " if len(paragraphs) > 1 else "  "
                lines.append(f"{pad}{text_repr:38s} → {fmt}")

        shape_idx += 1

    if shape_idx == 0:
        lines.append("  (no text shapes found)")

    return "\n".join(lines)


def inspect_theme(unpacked_dir: Path) -> str:
    """Show theme color scheme and font scheme."""
    theme_dir = unpacked_dir / "ppt" / "theme"
    if not theme_dir.is_dir():
        return ""

    lines = ["\n=== Theme ==="]
    for theme_file in sorted(theme_dir.glob("theme*.xml")):
        try:
            dom = defusedxml.minidom.parse(str(theme_file))
        except Exception:
            continue

        # Font scheme
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

        # Color scheme
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
            break  # first scheme only

        break  # first theme file only

    return "\n".join(lines) if len(lines) > 1 else ""


def summarize_slide(xml_path: Path) -> str:
    """Return a compact one-line summary of a slide: name, text count, image count, first text."""
    dom = defusedxml.minidom.parse(str(xml_path))

    # Background
    bg = _slide_background(dom)

    # Count images
    pics = dom.getElementsByTagName("p:pic")
    n_images = len(pics)

    # Count text shapes and collect first meaningful text
    n_text = 0
    first_text = ""
    for sp in dom.getElementsByTagName("p:sp"):
        txBodies = sp.getElementsByTagName("p:txBody")
        if not txBodies:
            continue
        all_text = ""
        for t in txBodies[0].getElementsByTagName("a:t"):
            all_text += _get_text(t)
        if all_text.strip():
            n_text += 1
            if not first_text:
                first_text = all_text.strip().replace("\n", " ")

    # Truncate first text
    if len(first_text) > 50:
        first_text = first_text[:47] + "..."

    parts = []
    if n_text:
        parts.append(f"{n_text} text")
    if n_images:
        parts.append(f"{n_images} img")
    counts = ", ".join(parts) if parts else "empty"

    bg_str = f"  bg={bg}" if bg else ""
    return f"  {xml_path.name:16s}  {counts:16s}{bg_str:16s}  {first_text}"


def inspect_media(unpacked_dir: Path, show_unused: bool = False) -> str:
    """Show media inventory: files in ppt/media/ with sizes and referencing slides.

    By default only shows referenced files. Use show_unused=True for everything.
    """
    media_dir = unpacked_dir / "ppt" / "media"
    if not media_dir.is_dir():
        return ""

    # Collect all media files
    media_files = sorted(f for f in media_dir.iterdir() if f.is_file())
    if not media_files:
        return ""

    # Build reverse map: media file → list of slides that reference it
    slides_dir = unpacked_dir / "ppt" / "slides"
    media_to_slides: dict[str, list[str]] = {
        str(f.relative_to(unpacked_dir)): [] for f in media_files
    }

    if slides_dir.is_dir():
        rels_dir = slides_dir / "_rels"
        if rels_dir.is_dir():
            for rels_file in sorted(rels_dir.glob("slide*.xml.rels")):
                slide_name = rels_file.name.replace(".rels", "")
                try:
                    dom = defusedxml.minidom.parse(str(rels_file))
                    for rel in dom.getElementsByTagName("Relationship"):
                        target = rel.getAttribute("Target")
                        if not target:
                            continue
                        resolved = (slides_dir / target).resolve()
                        try:
                            rel_path = str(resolved.relative_to(unpacked_dir.resolve()))
                        except ValueError:
                            continue
                        if rel_path in media_to_slides:
                            media_to_slides[rel_path].append(slide_name)
                except Exception:
                    continue

    # Also check slide layout and master rels for shared assets
    for subdir_name in ("slideLayouts", "slideMasters"):
        subdir = unpacked_dir / "ppt" / subdir_name
        if not subdir.is_dir():
            continue
        rels_dir = subdir / "_rels"
        if not rels_dir.is_dir():
            continue
        for rels_file in sorted(rels_dir.glob("*.xml.rels")):
            source_name = rels_file.name.replace(".rels", "")
            try:
                dom = defusedxml.minidom.parse(str(rels_file))
                for rel in dom.getElementsByTagName("Relationship"):
                    target = rel.getAttribute("Target")
                    if not target:
                        continue
                    resolved = (subdir / target).resolve()
                    try:
                        rel_path = str(resolved.relative_to(unpacked_dir.resolve()))
                    except ValueError:
                        continue
                    if rel_path in media_to_slides:
                        media_to_slides[rel_path].append(source_name)
            except Exception:
                continue

    lines = ["\n=== Media Inventory ==="]
    n_unused = 0
    unused_size = 0
    for media_file in media_files:
        rel_path = str(media_file.relative_to(unpacked_dir))
        size_bytes = media_file.stat().st_size
        refs = media_to_slides.get(rel_path, [])

        if not refs:
            n_unused += 1
            unused_size += size_bytes
            if not show_unused:
                continue

        if size_bytes >= 1_048_576:
            size_str = f"{size_bytes / 1_048_576:.1f} MB"
        elif size_bytes >= 1024:
            size_str = f"{size_bytes / 1024:.0f} KB"
        else:
            size_str = f"{size_bytes} B"
        ext = media_file.suffix.lstrip(".").lower()

        if refs:
            ref_str = ", ".join(refs)
        else:
            ref_str = "(unused)"

        lines.append(f"  {rel_path:40s} {size_str:>8s}  {ext:4s} ← {ref_str}")

    total_size = sum(f.stat().st_size for f in media_files)
    if total_size >= 1_048_576:
        total_str = f"{total_size / 1_048_576:.1f} MB"
    else:
        total_str = f"{total_size / 1024:.0f} KB"
    n_used = len(media_files) - n_unused
    lines.append(f"\n  {n_used} referenced files, {total_str} total")
    if n_unused and not show_unused:
        if unused_size >= 1024:
            unused_str = f"{unused_size / 1024:.0f} KB"
        else:
            unused_str = f"{unused_size} B"
        lines.append(f"  ({n_unused} unused files hidden, {unused_str} — use --all-media to show)")

    return "\n".join(lines)


if __name__ == "__main__":
    # Prevent BrokenPipeError when output is piped to head/less/closed reader
    import signal

    signal.signal(signal.SIGPIPE, signal.SIG_DFL)

    if len(sys.argv) < 2:
        print(
            "Usage: python inspect_slide.py <slide.xml | unpacked_dir/> [--theme] [--media] [--summary]",
            file=sys.stderr,
        )
        print(
            "  --summary   Compact one-line-per-slide overview (use for large templates)",
            file=sys.stderr,
        )
        print("  --theme     Show theme color scheme mappings", file=sys.stderr)
        print("  --media     Show media file inventory with referencing slides", file=sys.stderr)
        sys.exit(1)

    show_theme = "--theme" in sys.argv
    show_media = "--media" in sys.argv
    show_all_media = "--all-media" in sys.argv
    if show_all_media:
        show_media = True
    show_summary = "--summary" in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    path = Path(args[0])

    if path.is_dir():
        # Show theme colors
        if show_theme:
            theme_out = inspect_theme(path)
            if theme_out:
                print(theme_out)

        # Inspect all slides
        slides_dir = path / "ppt" / "slides" if (path / "ppt").is_dir() else path
        slide_files = sorted(
            slides_dir.glob("slide*.xml"),
            key=lambda f: int(m.group(1)) if (m := re.search(r"(\d+)", f.stem)) else 0,
        )

        if show_summary:
            # Compact one-line-per-slide view
            print(f"\n=== {len(slide_files)} Slides ===")
            for sf in slide_files:
                print(summarize_slide(sf))
        else:
            for sf in slide_files:
                print(inspect_slide(sf))

        # Show media inventory
        if show_media:
            unpacked_root = path if (path / "ppt").is_dir() else path.parent
            media_out = inspect_media(unpacked_root, show_unused=show_all_media)
            if media_out:
                print(media_out)

    elif path.is_file():
        print(inspect_slide(path))
    else:
        print(f"Error: {path} not found", file=sys.stderr)
        sys.exit(1)
