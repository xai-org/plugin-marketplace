"""Check for overlapping shapes and off-slide overflow in unpacked PPTX slides.

Parses the bounding box of every shape in each slide and reports:
  1. Shape pairs that overlap significantly (text-on-text collisions)
  2. Shapes that extend beyond the slide boundaries (off-slide overflow)

Use --fix to auto-apply <a:normAutofit/> to all text shapes involved in
overlaps or overflows. This makes PowerPoint auto-shrink text to fit the
box without changing positions or sizes.

Usage:
    # Check all slides
    python scripts/check_overlaps.py unpacked/

    # Auto-fix: enable normAutofit on all overlapping/overflowing text shapes
    python scripts/check_overlaps.py unpacked/ --fix

    # Check a single slide
    python scripts/check_overlaps.py unpacked/ppt/slides/slide4.xml

    # Stricter threshold (default 10% of smaller shape)
    python scripts/check_overlaps.py unpacked/ --threshold 5

    # Show all shapes (even non-overlapping) for debugging
    python scripts/check_overlaps.py unpacked/ppt/slides/slide1.xml --verbose

Exit code 0 = no issues, 1 = overlaps or overflows found (after fix attempt).
"""

import re
import sys
from pathlib import Path

import defusedxml.minidom

EMU_PER_INCH = 914400


def _emu_to_inches(emu: int) -> float:
    return emu / EMU_PER_INCH


def _get_xfrm(element):
    """Extract (x, y, cx, cy) from the first <a:xfrm> inside <p:spPr> or <p:grpSpPr>.

    Returns tuple of ints (EMU) or None if not found.
    """
    for tag in ("p:spPr", "p:grpSpPr"):
        for spPr in element.getElementsByTagName(tag):
            for xfrm in spPr.getElementsByTagName("a:xfrm"):
                off = xfrm.getElementsByTagName("a:off")
                ext = xfrm.getElementsByTagName("a:ext")
                if not off or not ext:
                    continue
                x = off[0].getAttribute("x")
                y = off[0].getAttribute("y")
                cx = ext[0].getAttribute("cx")
                cy = ext[0].getAttribute("cy")
                if x and y and cx and cy:
                    return int(x), int(y), int(cx), int(cy)
            break
        break
    return None


def _get_shape_name(element) -> str:
    """Extract shape name from <p:cNvPr name="...">."""
    for tag in ("p:nvSpPr", "p:nvPicPr", "p:nvGrpSpPr"):
        for nv in element.getElementsByTagName(tag):
            for cNvPr in nv.getElementsByTagName("p:cNvPr"):
                return cNvPr.getAttribute("name") or "(unnamed)"
            break
    return "(unnamed)"


def _get_shape_text_preview(element, max_len: int = 40) -> str:
    """Get a short text preview from shape's <a:t> elements."""
    texts = []
    for t in element.getElementsByTagName("a:t"):
        if t.firstChild and t.firstChild.nodeValue:
            texts.append(t.firstChild.nodeValue)
    full = " ".join(texts).strip()
    if len(full) > max_len:
        return full[:max_len] + "…"
    return full or ""


def _has_text(element) -> bool:
    """Check if shape contains any visible text."""
    for t in element.getElementsByTagName("a:t"):
        if t.firstChild and t.firstChild.nodeValue and t.firstChild.nodeValue.strip():
            return True
    return False


def _overlap_area(box_a, box_b) -> int:
    """Compute overlap area between two boxes (x, y, cx, cy) in EMU².

    Returns 0 if no overlap.
    """
    ax1, ay1, acx, acy = box_a
    bx1, by1, bcx, bcy = box_b
    ax2, ay2 = ax1 + acx, ay1 + acy
    bx2, by2 = bx1 + bcx, by1 + bcy

    ix1 = max(ax1, bx1)
    iy1 = max(ay1, by1)
    ix2 = min(ax2, bx2)
    iy2 = min(ay2, by2)

    if ix1 >= ix2 or iy1 >= iy2:
        return 0
    return (ix2 - ix1) * (iy2 - iy1)


def _enable_autofit_for_shapes(slide_path: Path, shape_names: set[str]) -> int:
    """Enable <a:normAutofit/> on named shapes in a slide XML file.

    For each named shape, finds its <a:bodyPr> and:
    - Removes any existing autofit element (<a:spAutoFit/>, <a:noAutofit/>)
    - Adds <a:normAutofit/> so PowerPoint auto-shrinks text to fit

    Returns number of shapes modified.
    """
    raw = slide_path.read_text(encoding="utf-8")
    modified = 0

    for name in shape_names:
        name_escaped = re.escape(name)
        # Find the <p:sp> block containing this shape name
        shape_pat = re.compile(
            r'(<p:sp\b[^>]*>.*?name="' + name_escaped + r'".*?</p:sp>)',
            re.DOTALL,
        )
        shape_match = shape_pat.search(raw)
        if not shape_match:
            continue

        shape_xml = shape_match.group(1)
        shape_start = shape_match.start()

        # Check if shape has a <a:bodyPr>
        bodypr_match = re.search(r"<a:bodyPr\b([^>]*)(/?)>", shape_xml)
        if not bodypr_match:
            continue

        # Remove existing autofit elements within this shape's bodyPr area
        new_shape = shape_xml
        for pat in (r"<a:normAutofit[^/]*/>", r"<a:spAutoFit[^/]*/>", r"<a:noAutofit[^/]*/>"):
            new_shape = re.sub(pat, "", new_shape, count=1)

        # Insert <a:normAutofit/> inside <a:bodyPr>
        bodypr_self = re.search(r"(<a:bodyPr\b[^>]*)(/?)>", new_shape)
        if bodypr_self:
            if bodypr_self.group(2) == "/":
                # Self-closing: <a:bodyPr .../> → <a:bodyPr ...><a:normAutofit/></a:bodyPr>
                new_shape = (
                    new_shape[: bodypr_self.start()]
                    + bodypr_self.group(1)
                    + "><a:normAutofit/></a:bodyPr>"
                    + new_shape[bodypr_self.end() :]
                )
            else:
                # Open tag: <a:bodyPr ...> → <a:bodyPr ...><a:normAutofit/>
                pos = bodypr_self.end()
                new_shape = new_shape[:pos] + "<a:normAutofit/>" + new_shape[pos:]

        if new_shape != shape_xml:
            raw = raw[:shape_start] + new_shape + raw[shape_start + len(shape_xml) :]
            modified += 1

    if modified > 0:
        slide_path.write_text(raw, encoding="utf-8")

    return modified


def _get_slide_size(unpacked_dir: Path) -> tuple[int, int] | None:
    """Read slide dimensions from presentation.xml → <p:sldSz cx="..." cy="..."/>.

    Returns (width, height) in EMU, or None if not found.
    """
    pres_path = unpacked_dir / "ppt" / "presentation.xml"
    if not pres_path.is_file():
        return None
    try:
        dom = defusedxml.minidom.parse(str(pres_path))
        for sldSz in dom.getElementsByTagName("p:sldSz"):
            cx = sldSz.getAttribute("cx")
            cy = sldSz.getAttribute("cy")
            if cx and cy:
                return int(cx), int(cy)
    except Exception:
        pass
    return None


def _find_unpacked_root(slide_path: Path) -> Path | None:
    """Walk up from a slide XML to find the unpacked root (parent of ppt/)."""
    p = slide_path.parent
    while p != p.parent:
        if (p / "presentation.xml").is_file():
            return p.parent  # ppt/ → unpacked root
        p = p.parent
    return None


def check_slide(
    slide_path: Path,
    threshold_pct: float = 10.0,
    verbose: bool = False,
    slide_size: tuple[int, int] | None = None,
) -> dict:
    """Check a single slide for overlapping shapes and off-slide overflow.

    Args:
        slide_path: path to slide XML file
        threshold_pct: minimum overlap as % of smaller shape area to report
        verbose: print all shapes, not just overlaps
        slide_size: (width, height) in EMU; if None, overflow checks are skipped

    Returns dict with 'overlaps' and 'overflows' lists.
    """
    dom = defusedxml.minidom.parse(str(slide_path))

    # Collect top-level shapes from <p:spTree>
    shapes = []
    for spTree in dom.getElementsByTagName("p:spTree"):
        for child in spTree.childNodes:
            if child.nodeType != child.ELEMENT_NODE:
                continue
            if child.tagName not in ("p:sp", "p:pic", "p:grpSp"):
                continue

            xfrm = _get_xfrm(child)
            if not xfrm:
                continue
            x, y, cx, cy = xfrm

            # Skip zero-size shapes (hidden/decorative)
            if cx <= 0 or cy <= 0:
                continue

            name = _get_shape_name(child)
            text = _get_shape_text_preview(child)
            has_txt = _has_text(child)
            area = cx * cy

            shapes.append(
                {
                    "name": name,
                    "text": text,
                    "has_text": has_txt,
                    "tag": child.tagName,
                    "x": x,
                    "y": y,
                    "cx": cx,
                    "cy": cy,
                    "area": area,
                }
            )

    if verbose:
        if slide_size:
            sw, sh = slide_size
            print(f'  Slide size: {_emu_to_inches(sw):.1f}"×{_emu_to_inches(sh):.1f}"')
        for i, s in enumerate(shapes):
            x_in = _emu_to_inches(s["x"])
            y_in = _emu_to_inches(s["y"])
            w_in = _emu_to_inches(s["cx"])
            h_in = _emu_to_inches(s["cy"])
            txt = f'  "{s["text"]}"' if s["text"] else ""
            print(
                f'  [{i}] {s["name"]}  pos=({x_in:.1f}",{y_in:.1f}") '
                f'size={w_in:.1f}"×{h_in:.1f}"{txt}'
            )

    # --- Check 1: shape-on-shape overlaps ---
    overlaps = []
    for i in range(len(shapes)):
        for j in range(i + 1, len(shapes)):
            a, b = shapes[i], shapes[j]

            # Only flag overlaps involving at least one text shape
            if not a["has_text"] and not b["has_text"]:
                continue

            box_a = (a["x"], a["y"], a["cx"], a["cy"])
            box_b = (b["x"], b["y"], b["cx"], b["cy"])
            ov = _overlap_area(box_a, box_b)
            if ov <= 0:
                continue

            smaller_area = min(a["area"], b["area"])
            pct = (ov / smaller_area) * 100 if smaller_area > 0 else 0

            if pct >= threshold_pct:
                overlaps.append(
                    {
                        "shape_a": a["name"],
                        "shape_b": b["name"],
                        "text_a": a["text"],
                        "text_b": b["text"],
                        "overlap_pct": pct,
                    }
                )

    # --- Check 2: off-slide overflow ---
    overflows = []
    if slide_size:
        slide_w, slide_h = slide_size
        for s in shapes:
            if not s["has_text"]:
                continue

            right = s["x"] + s["cx"]
            bottom = s["y"] + s["cy"]

            clipped = []
            if s["x"] < 0:
                clipped.append(f'left by {_emu_to_inches(-s["x"]):.2f}"')
            if s["y"] < 0:
                clipped.append(f'top by {_emu_to_inches(-s["y"]):.2f}"')
            if right > slide_w:
                clipped.append(f'right by {_emu_to_inches(right - slide_w):.2f}"')
            if bottom > slide_h:
                clipped.append(f'bottom by {_emu_to_inches(bottom - slide_h):.2f}"')

            if clipped:
                overflows.append(
                    {
                        "shape": s["name"],
                        "text": s["text"],
                        "edges": clipped,
                    }
                )

    return {"overlaps": overlaps, "overflows": overflows}


def _print_issues(slide_name: str, result: dict) -> int:
    """Print overlaps and overflows for one slide. Returns total issue count."""
    overlaps = result["overlaps"]
    overflows = result["overflows"]
    count = len(overlaps) + len(overflows)

    if count == 0:
        return 0

    parts = []
    if overlaps:
        parts.append(f"{len(overlaps)} overlap(s)")
    if overflows:
        parts.append(f"{len(overflows)} off-slide overflow(s)")
    print(f"\n⚠ {slide_name}: {', '.join(parts)}")

    for ov in overlaps:
        a_label = f"{ov['shape_a']}"
        b_label = f"{ov['shape_b']}"
        if ov["text_a"]:
            a_label += f' ("{ov["text_a"]}")'
        if ov["text_b"]:
            b_label += f' ("{ov["text_b"]}")'
        print(f"  • {a_label}  ↔  {b_label}  ({ov['overlap_pct']:.0f}% overlap)")

    for of in overflows:
        label = f"{of['shape']}"
        if of["text"]:
            label += f' ("{of["text"]}")'
        edges = ", ".join(of["edges"])
        print(f"  ▸ {label} extends past {edges}")

    return count


def check_all(
    unpacked_dir: Path,
    threshold_pct: float = 10.0,
    verbose: bool = False,
    fix: bool = False,
) -> int:
    """Check all slides in unpacked directory, optionally auto-fixing.

    When fix=True, enables <a:normAutofit/> on all text shapes involved
    in overlaps or overflows, then re-checks to report remaining issues.

    Returns total number of issues found (after fix if applied).
    """
    slides_dir = unpacked_dir / "ppt" / "slides"
    if not slides_dir.is_dir():
        print(f"Error: {slides_dir} not found", file=sys.stderr)
        return -1

    slide_files = sorted(slides_dir.glob("slide*.xml"))
    if not slide_files:
        print("No slide XML files found", file=sys.stderr)
        return -1

    slide_size = _get_slide_size(unpacked_dir)
    if verbose and slide_size:
        sw, sh = slide_size
        print(f'Slide size: {_emu_to_inches(sw):.1f}"×{_emu_to_inches(sh):.1f}"')

    total = 0
    total_fixed = 0
    for slide_path in slide_files:
        result = check_slide(slide_path, threshold_pct, verbose, slide_size=slide_size)
        count = _print_issues(slide_path.name, result)

        if count and fix:
            # Collect all text shape names involved in issues
            shapes_to_fix: set[str] = set()
            for ov in result["overlaps"]:
                if ov["text_a"]:
                    shapes_to_fix.add(ov["shape_a"])
                if ov["text_b"]:
                    shapes_to_fix.add(ov["shape_b"])
            for of in result["overflows"]:
                shapes_to_fix.add(of["shape"])

            if shapes_to_fix:
                fixed = _enable_autofit_for_shapes(slide_path, shapes_to_fix)
                if fixed:
                    print(f"  ✔ Applied normAutofit to {fixed} shape(s) in {slide_path.name}")
                    total_fixed += fixed

        if count:
            total += count
        elif verbose:
            print(f"\n✓ {slide_path.name}: no issues")

    if fix and total_fixed > 0:
        print(f"\n✔ Fixed: applied normAutofit to {total_fixed} shape(s) across all slides")
        # Re-check after fix
        recheck_total = 0
        for slide_path in slide_files:
            result = check_slide(slide_path, threshold_pct, False, slide_size=slide_size)
            recheck_count = len(result["overlaps"]) + len(result["overflows"])
            recheck_total += recheck_count
        if recheck_total == 0:
            print("✓ All issues resolved after autofit")
        else:
            print(f"⚠ {recheck_total} issue(s) remain — may need manual resize or text shortening")
        return recheck_total

    if total == 0:
        print("✓ No overlapping or overflowing shapes found")
    else:
        print(f"\n⚠ Total: {total} issue(s) found — run with --fix to auto-apply normAutofit")

    return total


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Check for overlapping shapes and off-slide overflow in PPTX slides.",
        epilog="Run after editing text to catch layout problems before rendering.",
    )
    parser.add_argument("path", help="Unpacked PPTX directory or single slide XML file")
    parser.add_argument(
        "--threshold",
        type=float,
        default=10.0,
        metavar="PCT",
        help="Minimum overlap %% of smaller shape to report (default: 10)",
    )
    parser.add_argument(
        "--fix",
        action="store_true",
        help="Auto-apply normAutofit to overlapping/overflowing text shapes",
    )
    parser.add_argument(
        "--verbose", "-v", action="store_true", help="Show all shapes, not just issues"
    )
    args = parser.parse_args()

    path = Path(args.path)
    if not path.exists():
        print(f"Error: {path} not found", file=sys.stderr)
        sys.exit(1)

    if path.is_file() and path.suffix == ".xml":
        # Single slide mode — try to find slide size from parent unpacked dir
        unpacked_root = _find_unpacked_root(path)
        slide_size = _get_slide_size(unpacked_root) if unpacked_root else None
        result = check_slide(path, args.threshold, args.verbose, slide_size=slide_size)
        count = _print_issues(path.name, result)

        if count and args.fix:
            shapes_to_fix: set[str] = set()
            for ov in result["overlaps"]:
                if ov["text_a"]:
                    shapes_to_fix.add(ov["shape_a"])
                if ov["text_b"]:
                    shapes_to_fix.add(ov["shape_b"])
            for of in result["overflows"]:
                shapes_to_fix.add(of["shape"])
            if shapes_to_fix:
                fixed = _enable_autofit_for_shapes(path, shapes_to_fix)
                print(f"  ✔ Applied normAutofit to {fixed} shape(s)")

        if count == 0:
            print(f"✓ {path.name}: no issues")
        sys.exit(1 if count > 0 else 0)
    elif path.is_dir():
        count = check_all(path, args.threshold, args.verbose, fix=args.fix)
        sys.exit(1 if count > 0 else 0)
    else:
        print(f"Error: {path} must be a directory or .xml file", file=sys.stderr)
        sys.exit(1)
