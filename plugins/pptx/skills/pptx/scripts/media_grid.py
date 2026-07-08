"""Create a visual thumbnail grid of all media assets in an unpacked PPTX.

Shows each image with its filename, size, and which slides reference it.
Non-image files (EMF, WMF, SVG) are shown as labeled placeholders.

Usage:
    python scripts/media_grid.py unpacked/ [output.jpg] [--cols N]

Examples:
    python scripts/media_grid.py unpacked/
    # Creates: media_grid.jpg

    python scripts/media_grid.py unpacked/ assets --cols 6
    # Creates: assets.jpg
"""

import argparse
import sys
from pathlib import Path

import defusedxml.minidom
from PIL import Image, ImageDraw, ImageFont

THUMB_SIZE = 200
MAX_COLS = 8
DEFAULT_COLS = 4
JPEG_QUALITY = 95
GRID_PADDING = 12
BORDER_WIDTH = 1
LABEL_FONT_SIZE = 12
SUBLABEL_FONT_SIZE = 10
LABEL_GAP = 4

# Extensions PIL can open directly
_PIL_FORMATS = {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff", ".tif", ".webp"}


def _load_rels_for_media(unpacked_dir: Path) -> dict[str, list[str]]:
    """Build reverse map: media relative path → list of referencing sources."""
    media_to_refs: dict[str, list[str]] = {}

    for subdir_name in ("slides", "slideLayouts", "slideMasters"):
        subdir = unpacked_dir / "ppt" / subdir_name
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
                    if "media/" in rel_path:
                        media_to_refs.setdefault(rel_path, []).append(source_name)
            except Exception:
                continue

    return media_to_refs


def _human_size(size_bytes: int) -> str:
    if size_bytes >= 1_048_576:
        return f"{size_bytes / 1_048_576:.1f}MB"
    elif size_bytes >= 1024:
        return f"{size_bytes / 1024:.0f}KB"
    return f"{size_bytes}B"


def _make_placeholder(width: int, height: int, ext: str) -> Image.Image:
    """Create a colored placeholder for non-renderable formats."""
    colors = {
        ".emf": "#E8D5B7",
        ".wmf": "#D5C4A1",
        ".svg": "#C5E1A5",
    }
    bg = colors.get(ext, "#E0E0E0")
    img = Image.new("RGB", (width, height), bg)
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.load_default(size=max(16, width // 8))
    except Exception:
        font = ImageFont.load_default()
    label = ext.lstrip(".").upper()
    bbox = draw.textbbox((0, 0), label, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((width - tw) // 2, (height - th) // 2), label, fill="#666666", font=font)
    return img


def create_media_grid(
    unpacked_dir: Path,
    output_path: Path,
    cols: int = DEFAULT_COLS,
) -> str | None:
    """Create a thumbnail grid of all media files.

    Returns the output file path, or None if no media found.
    """
    media_dir = unpacked_dir / "ppt" / "media"
    if not media_dir.is_dir():
        print("No ppt/media/ directory found", file=sys.stderr)
        return None

    media_files = sorted(f for f in media_dir.iterdir() if f.is_file())
    if not media_files:
        print("No media files found", file=sys.stderr)
        return None

    # Load refs
    media_refs = _load_rels_for_media(unpacked_dir)

    # Load fonts
    try:
        label_font = ImageFont.load_default(size=LABEL_FONT_SIZE)
    except Exception:
        label_font = ImageFont.load_default()
    try:
        sub_font = ImageFont.load_default(size=SUBLABEL_FONT_SIZE)
    except Exception:
        sub_font = ImageFont.load_default()

    # Calculate cell dimensions
    cell_w = THUMB_SIZE
    cell_h = THUMB_SIZE  # square thumbnail area
    # Label area: filename + size + refs (up to 3 lines)
    label_h = LABEL_FONT_SIZE + LABEL_GAP + SUBLABEL_FONT_SIZE + LABEL_GAP + SUBLABEL_FONT_SIZE
    total_cell_h = cell_h + LABEL_GAP + label_h

    rows = (len(media_files) + cols - 1) // cols
    grid_w = cols * cell_w + (cols + 1) * GRID_PADDING
    grid_h = rows * total_cell_h + (rows + 1) * GRID_PADDING

    grid = Image.new("RGB", (grid_w, grid_h), "white")
    draw = ImageDraw.Draw(grid)

    for idx, media_file in enumerate(media_files):
        row, col = idx // cols, idx % cols
        x = col * cell_w + (col + 1) * GRID_PADDING
        y = row * total_cell_h + (row + 1) * GRID_PADDING

        # Load or create thumbnail
        ext = media_file.suffix.lower()
        try:
            if ext in _PIL_FORMATS:
                with Image.open(media_file) as img:
                    img = img.convert("RGB")
                    img.thumbnail((cell_w, cell_h), Image.Resampling.LANCZOS)
                    thumb = img.copy()
            else:
                thumb = _make_placeholder(cell_w, cell_h, ext)
        except Exception:
            thumb = _make_placeholder(cell_w, cell_h, ext)

        # Center thumbnail in cell
        tw, th = thumb.size
        tx = x + (cell_w - tw) // 2
        ty = y + (cell_h - th) // 2
        grid.paste(thumb, (tx, ty))

        # Border
        if BORDER_WIDTH > 0:
            draw.rectangle(
                [
                    (tx - BORDER_WIDTH, ty - BORDER_WIDTH),
                    (tx + tw + BORDER_WIDTH - 1, ty + th + BORDER_WIDTH - 1),
                ],
                outline="#CCCCCC",
                width=BORDER_WIDTH,
            )

        # Labels below thumbnail
        label_y = y + cell_h + LABEL_GAP

        # Line 1: filename + size
        size_str = _human_size(media_file.stat().st_size)
        name_label = f"{media_file.name}  ({size_str})"
        if len(name_label) > 30:
            name_label = media_file.name[:20] + f"… ({size_str})"
        draw.text((x, label_y), name_label, fill="black", font=label_font)

        # Line 2: referencing slides
        rel_path = str(media_file.relative_to(unpacked_dir))
        refs = media_refs.get(rel_path, [])
        if refs:
            # Show only slide refs, abbreviate if too many
            slide_refs = [
                r.replace(".xml", "")
                for r in refs
                if r.startswith("slide")
                and not r.startswith("slideL")
                and not r.startswith("slideM")
            ]
            layout_refs = [r for r in refs if r.startswith("slideL") or r.startswith("slideM")]
            ref_parts = []
            if slide_refs:
                if len(slide_refs) <= 4:
                    ref_parts.append(", ".join(slide_refs))
                else:
                    ref_parts.append(f"{slide_refs[0]}, {slide_refs[1]}… +{len(slide_refs) - 2}")
            if layout_refs:
                ref_parts.append(f"+{len(layout_refs)} layout")
            ref_str = "← " + " ".join(ref_parts)
        else:
            ref_str = "← (unused)"

        draw.text(
            (x, label_y + LABEL_FONT_SIZE + LABEL_GAP),
            ref_str,
            fill="#666666",
            font=sub_font,
        )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    grid.save(str(output_path), format="JPEG", quality=JPEG_QUALITY)
    return str(output_path)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Create visual grid of PPTX media assets.")
    parser.add_argument("unpacked_dir", help="Path to unpacked PPTX directory")
    parser.add_argument(
        "output_prefix",
        nargs="?",
        default="media_grid",
        help="Output filename prefix (default: media_grid)",
    )
    parser.add_argument(
        "--cols",
        type=int,
        default=DEFAULT_COLS,
        help=f"Columns in grid (default: {DEFAULT_COLS}, max: {MAX_COLS})",
    )
    args = parser.parse_args()

    unpacked = Path(args.unpacked_dir)
    if not unpacked.is_dir():
        print(f"Error: {unpacked} not found", file=sys.stderr)
        sys.exit(1)

    cols = min(args.cols, MAX_COLS)
    prefix = args.output_prefix.strip() or "media_grid"
    output = Path(f"{prefix}.jpg")

    result = create_media_grid(unpacked, output, cols=cols)
    if result:
        print(f"Created: {result}")
    else:
        sys.exit(1)
