"""Resize or reposition shapes in a PPTX slide XML file.

When replacement text is longer than the original, text boxes may overflow.
Use this script to adjust shape dimensions (width, height) and position (x, y)
without touching any text or formatting.

Usage:
    # List all shapes with current dimensions and positions
    python scripts/resize_shape.py slide.xml --list

    # Set absolute dimensions (inches) — only specified dimensions change
    python scripts/resize_shape.py slide.xml --ph body --height 3.5
    python scripts/resize_shape.py slide.xml --ph ctrTitle --width 9.0 --height 2.0
    python scripts/resize_shape.py slide.xml --name "Title 1" --width 8.0
    python scripts/resize_shape.py slide.xml --match "Lorem" --height 4.0

    # Adjust relative to current size (inches, +/-)
    python scripts/resize_shape.py slide.xml --ph body --dh 0.5     # grow 0.5" taller
    python scripts/resize_shape.py slide.xml --ph body --dw -0.5    # shrink 0.5" narrower

    # Set absolute position (inches from top-left)
    python scripts/resize_shape.py slide.xml --ph body --x 1.0 --y 3.0

    # Adjust position relative to current
    python scripts/resize_shape.py slide.xml --ph body --dy -0.5    # move up 0.5"

    # Dry run (preview without modifying)
    python scripts/resize_shape.py slide.xml --ph body --height 3.5 --dry-run

Units: all values are in inches. Internally converted to EMU (914400 EMU = 1").

Run inspect_slide.py first to see placeholder types, current sizes, and autofit mode.
"""

import re
import sys
from pathlib import Path

import defusedxml.minidom

_EMU_PER_INCH = 914400


def _emu_to_inches(emu: int) -> float:
    return emu / _EMU_PER_INCH


def _inches_to_emu(inches: float) -> int:
    return round(inches * _EMU_PER_INCH)


def _get_text(node) -> str:
    """Get all text from a node and children."""
    if node.nodeType == node.TEXT_NODE:
        return node.data
    return "".join(_get_text(c) for c in node.childNodes)


def _find_shapes(dom) -> list[dict]:
    """Find all <p:sp> elements and extract metadata."""
    shapes = []
    for sp in dom.getElementsByTagName("p:sp"):
        name = ""
        ph_type = ""
        ph_idx = ""

        for nvSpPr in sp.getElementsByTagName("p:nvSpPr"):
            for cNvPr in nvSpPr.getElementsByTagName("p:cNvPr"):
                name = cNvPr.getAttribute("name")
            for nvPr in nvSpPr.getElementsByTagName("p:nvPr"):
                for ph in nvPr.getElementsByTagName("p:ph"):
                    ph_type = ph.getAttribute("type") or "body"
                    ph_idx = ph.getAttribute("idx")
            break

        # Get position and size from spPr/xfrm
        x = y = cx = cy = 0
        for spPr in sp.getElementsByTagName("p:spPr"):
            for xfrm in spPr.getElementsByTagName("a:xfrm"):
                for off in xfrm.getElementsByTagName("a:off"):
                    x = int(off.getAttribute("x") or 0)
                    y = int(off.getAttribute("y") or 0)
                for ext in xfrm.getElementsByTagName("a:ext"):
                    cx = int(ext.getAttribute("cx") or 0)
                    cy = int(ext.getAttribute("cy") or 0)
            break

        # Get text content
        full_text = ""
        for txBody in sp.getElementsByTagName("p:txBody"):
            for t in txBody.getElementsByTagName("a:t"):
                full_text += _get_text(t)
            break

        shapes.append(
            {
                "element": sp,
                "name": name,
                "ph_type": ph_type,
                "ph_idx": ph_idx,
                "x": x,
                "y": y,
                "cx": cx,
                "cy": cy,
                "text": full_text.strip(),
            }
        )

    return shapes


def _match_shapes(
    shapes: list[dict],
    ph_type: str | None = None,
    name: str | None = None,
    match_text: str | None = None,
) -> list[dict]:
    """Filter shapes by criteria."""
    results = []
    for s in shapes:
        if ph_type and s["ph_type"] == ph_type:
            results.append(s)
        elif name and s["name"] == name:
            results.append(s)
        elif match_text and match_text.lower() in s["text"].lower():
            results.append(s)
    return results


def list_shapes(slide_path: Path) -> None:
    """List all shapes with positions and dimensions."""
    dom = defusedxml.minidom.parse(str(slide_path))
    shapes = _find_shapes(dom)

    if not shapes:
        print("No shapes found")
        return

    print(f"{'#':>3}  {'Name':24s}  {'Type':10s}  {'Position':16s}  {'Size':16s}  Text")
    print(f"{'---':>3}  {'----':24s}  {'----':10s}  {'--------':16s}  {'----':16s}  ----")

    for i, s in enumerate(shapes):
        text_preview = s["text"][:40]
        if len(s["text"]) > 40:
            text_preview += "..."
        ph = s["ph_type"] or "-"
        pos = f'({_emu_to_inches(s["x"]):.1f}", {_emu_to_inches(s["y"]):.1f}")'
        size = f'{_emu_to_inches(s["cx"]):.1f}" × {_emu_to_inches(s["cy"]):.1f}"'
        print(f"{i:3d}  {s['name']:24s}  {ph:10s}  {pos:16s}  {size:16s}  {text_preview}")


def resize_shape(
    slide_path: Path,
    *,
    ph_type: str | None = None,
    name: str | None = None,
    match_text: str | None = None,
    width: float | None = None,
    height: float | None = None,
    dw: float | None = None,
    dh: float | None = None,
    x: float | None = None,
    y: float | None = None,
    dx: float | None = None,
    dy: float | None = None,
    dry_run: bool = False,
) -> bool:
    """Resize and/or reposition matching shapes.

    Args:
        slide_path: path to slide XML file
        ph_type: match by placeholder type (ctrTitle, subTitle, body, ...)
        name: match by shape name
        match_text: match by text content (case-insensitive)
        width: absolute width in inches
        height: absolute height in inches
        dw: adjust width by ± inches (relative)
        dh: adjust height by ± inches (relative)
        x: absolute x position in inches
        y: absolute y position in inches
        dx: adjust x position by ± inches (relative)
        dy: adjust y position by ± inches (relative)
        dry_run: preview without modifying

    Returns True if at least one shape was modified.
    """
    raw = slide_path.read_text(encoding="utf-8")
    dom = defusedxml.minidom.parseString(raw)
    shapes = _find_shapes(dom)
    targets = _match_shapes(shapes, ph_type=ph_type, name=name, match_text=match_text)

    if not targets:
        desc = f"ph={ph_type}" if ph_type else f"name={name}" if name else f'match="{match_text}"'
        print(f"Error: no shape found matching {desc}", file=sys.stderr)
        return False

    if len(targets) > 1:
        print(f"Found {len(targets)} matching shapes — resizing all")

    modified = False

    for s in targets:
        old_cx, old_cy = s["cx"], s["cy"]
        old_x, old_y = s["x"], s["y"]

        # Compute new dimensions
        new_cx = _inches_to_emu(width) if width is not None else old_cx
        new_cy = _inches_to_emu(height) if height is not None else old_cy
        new_x = _inches_to_emu(x) if x is not None else old_x
        new_y = _inches_to_emu(y) if y is not None else old_y

        # Apply deltas (override absolute if both given)
        if dw is not None:
            new_cx = old_cx + _inches_to_emu(dw)
        if dh is not None:
            new_cy = old_cy + _inches_to_emu(dh)
        if dx is not None:
            new_x = old_x + _inches_to_emu(dx)
        if dy is not None:
            new_y = old_y + _inches_to_emu(dy)

        # Clamp to sane minimums
        new_cx = max(new_cx, _inches_to_emu(0.1))
        new_cy = max(new_cy, _inches_to_emu(0.1))
        new_x = max(new_x, 0)
        new_y = max(new_y, 0)

        # Nothing changed?
        if new_cx == old_cx and new_cy == old_cy and new_x == old_x and new_y == old_y:
            continue

        ph_label = f" ({s['ph_type']})" if s["ph_type"] else ""
        print(f"Shape: [{s['name']}]{ph_label}")

        if new_cx != old_cx or new_cy != old_cy:
            print(
                f'  size: {_emu_to_inches(old_cx):.2f}" × {_emu_to_inches(old_cy):.2f}"'
                f'  →  {_emu_to_inches(new_cx):.2f}" × {_emu_to_inches(new_cy):.2f}"'
            )
        if new_x != old_x or new_y != old_y:
            print(
                f'  pos:  ({_emu_to_inches(old_x):.2f}", {_emu_to_inches(old_y):.2f}")'
                f'  →  ({_emu_to_inches(new_x):.2f}", {_emu_to_inches(new_y):.2f}")'
            )

        if dry_run:
            print("  [DRY RUN] would modify")
            continue

        # Apply changes in raw XML — find the shape by name and modify its xfrm
        name_escaped = re.escape(s["name"])
        shape_pattern = re.compile(
            r'(<p:sp\b[^>]*>.*?name="' + name_escaped + r'".*?</p:sp>)',
            re.DOTALL,
        )
        shape_match = shape_pattern.search(raw)
        if not shape_match:
            print(
                f"  WARNING: could not locate shape [{s['name']}] in raw XML",
                file=sys.stderr,
            )
            continue

        shape_xml = shape_match.group(1)
        new_shape_xml = shape_xml

        # Replace <a:ext cx="..." cy="..."/> (first occurrence = the one in <a:xfrm>)
        if new_cx != old_cx or new_cy != old_cy:
            new_shape_xml = re.sub(
                r'(<a:ext\s+)cx="[^"]*"\s+cy="[^"]*"',
                f'\\1cx="{new_cx}" cy="{new_cy}"',
                new_shape_xml,
                count=1,
            )

        # Replace <a:off x="..." y="..."/>
        if new_x != old_x or new_y != old_y:
            new_shape_xml = re.sub(
                r'(<a:off\s+)x="[^"]*"\s+y="[^"]*"',
                f'\\1x="{new_x}" y="{new_y}"',
                new_shape_xml,
                count=1,
            )

        if new_shape_xml != shape_xml:
            raw = raw[: shape_match.start()] + new_shape_xml + raw[shape_match.end() :]
            modified = True
            print("  ✓ updated")

    if modified and not dry_run:
        slide_path.write_text(raw, encoding="utf-8")
        print(f"Updated: {slide_path.name}")

    return modified


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Resize or reposition shapes in a PPTX slide XML file.",
        epilog="All dimensions in inches. Run with --list to see shapes.",
    )
    parser.add_argument("slide", help="Path to slide XML file")
    parser.add_argument(
        "--list",
        action="store_true",
        dest="list_mode",
        help="List all shapes with dimensions and positions",
    )
    parser.add_argument(
        "--ph",
        metavar="TYPE",
        help="Match by placeholder type (ctrTitle, subTitle, body, ...)",
    )
    parser.add_argument("--name", metavar="NAME", help="Match by shape name")
    parser.add_argument(
        "--match",
        metavar="TEXT",
        help="Match by text content (case-insensitive)",
    )
    parser.add_argument("--width", type=float, metavar="INCHES", help="Set absolute width")
    parser.add_argument("--height", type=float, metavar="INCHES", help="Set absolute height")
    parser.add_argument("--dw", type=float, metavar="INCHES", help="Adjust width by ± inches")
    parser.add_argument("--dh", type=float, metavar="INCHES", help="Adjust height by ± inches")
    parser.add_argument("--x", type=float, metavar="INCHES", help="Set x position (from left)")
    parser.add_argument("--y", type=float, metavar="INCHES", help="Set y position (from top)")
    parser.add_argument("--dx", type=float, metavar="INCHES", help="Adjust x by ± inches")
    parser.add_argument("--dy", type=float, metavar="INCHES", help="Adjust y by ± inches")
    parser.add_argument("--dry-run", action="store_true", help="Preview without modifying")

    args = parser.parse_args()
    slide_path = Path(args.slide)

    if not slide_path.is_file():
        print(f"Error: {slide_path} not found", file=sys.stderr)
        sys.exit(1)

    if args.list_mode:
        list_shapes(slide_path)
        sys.exit(0)

    if not args.ph and not args.name and not args.match:
        parser.error("Specify --ph, --name, or --match to identify the target shape")

    has_change = any(
        v is not None
        for v in [args.width, args.height, args.dw, args.dh, args.x, args.y, args.dx, args.dy]
    )
    if not has_change:
        parser.error(
            "Specify at least one dimension to change "
            "(--width, --height, --dw, --dh, --x, --y, --dx, --dy)"
        )

    ok = resize_shape(
        slide_path,
        ph_type=args.ph,
        name=args.name,
        match_text=args.match,
        width=args.width,
        height=args.height,
        dw=args.dw,
        dh=args.dh,
        x=args.x,
        y=args.y,
        dx=args.dx,
        dy=args.dy,
        dry_run=args.dry_run,
    )
    sys.exit(0 if ok else 1)
