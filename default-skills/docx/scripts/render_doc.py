"""Render document pages as a labeled thumbnail grid for visual inspection.

Converts the document to per-page images, then arranges them in a grid
with page number labels — like thumbnail.py for PPTX.

Usage:
    python scripts/render_doc.py document.docx
    # Creates: doc_pages.jpg

    python scripts/render_doc.py document.docx pages --cols 4
    # Creates: pages.jpg (4 columns)

Note: convert_doc.py --to images creates individual page files.
      render_doc.py creates a single grid image for quick visual overview.
"""

import argparse
import subprocess
import sys
import tempfile
from pathlib import Path

from office.soffice import get_soffice_env
from PIL import Image, ImageDraw, ImageFont

THUMB_WIDTH = 500
DEFAULT_COLS = 2
MAX_COLS = 6
JPEG_QUALITY = 95
GRID_PADDING = 20
BORDER_WIDTH = 2
FONT_SIZE_RATIO = 0.10
LABEL_PADDING_RATIO = 0.4


def _convert_to_page_images(doc_path: Path, temp_dir: Path) -> list[Path]:
    """Convert document to per-page JPEG images."""
    result = subprocess.run(
        ["soffice", "--headless", "--convert-to", "pdf", "--outdir", str(temp_dir), str(doc_path)],
        capture_output=True,
        text=True,
        env=get_soffice_env(),
    )
    pdf_path = temp_dir / f"{doc_path.stem}.pdf"
    if not pdf_path.exists():
        raise RuntimeError(f"PDF conversion failed: {result.stderr[:200]}")

    result = subprocess.run(
        ["pdftoppm", "-jpeg", "-r", "150", str(pdf_path), str(temp_dir / "page")],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        raise RuntimeError(f"Image conversion failed: {result.stderr[:200]}")

    return sorted(temp_dir.glob("page-*.jpg"))


def create_page_grid(
    page_images: list[Path],
    output_path: Path,
    cols: int = DEFAULT_COLS,
    thumb_width: int = THUMB_WIDTH,
) -> str:
    if not page_images:
        raise RuntimeError("No page images to grid")

    with Image.open(page_images[0]) as img:
        aspect = img.height / img.width
    thumb_height = int(thumb_width * aspect)

    font_size = int(thumb_width * FONT_SIZE_RATIO)
    label_padding = int(font_size * LABEL_PADDING_RATIO)

    rows = (len(page_images) + cols - 1) // cols
    grid_w = cols * thumb_width + (cols + 1) * GRID_PADDING
    grid_h = rows * (thumb_height + font_size + label_padding * 2) + (rows + 1) * GRID_PADDING

    grid = Image.new("RGB", (grid_w, grid_h), "white")
    draw = ImageDraw.Draw(grid)

    try:
        font = ImageFont.load_default(size=font_size)
    except Exception:
        font = ImageFont.load_default()

    for i, img_path in enumerate(page_images):
        row, col = i // cols, i % cols
        x = col * thumb_width + (col + 1) * GRID_PADDING
        y_base = row * (thumb_height + font_size + label_padding * 2) + (row + 1) * GRID_PADDING

        label = f"Page {i + 1}"
        bbox = draw.textbbox((0, 0), label, font=font)
        text_w = bbox[2] - bbox[0]
        draw.text(
            (x + (thumb_width - text_w) // 2, y_base + label_padding),
            label,
            fill="black",
            font=font,
        )

        y_thumb = y_base + label_padding + font_size + label_padding
        with Image.open(img_path) as img:
            img.thumbnail((thumb_width, thumb_height), Image.Resampling.LANCZOS)
            w, h = img.size
            tx = x + (thumb_width - w) // 2
            ty = y_thumb + (thumb_height - h) // 2
            grid.paste(img, (tx, ty))

            if BORDER_WIDTH > 0:
                draw.rectangle(
                    [
                        (tx - BORDER_WIDTH, ty - BORDER_WIDTH),
                        (tx + w + BORDER_WIDTH - 1, ty + h + BORDER_WIDTH - 1),
                    ],
                    outline="gray",
                    width=BORDER_WIDTH,
                )

    output_path.parent.mkdir(parents=True, exist_ok=True)
    grid.save(str(output_path), quality=JPEG_QUALITY)
    return str(output_path)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Render document pages as labeled thumbnail grid.")
    parser.add_argument("input", help="Input document (.docx, .dotx, .doc)")
    parser.add_argument(
        "output_prefix",
        nargs="?",
        default="doc_pages",
        help="Output filename prefix (default: doc_pages)",
    )
    parser.add_argument(
        "--cols",
        type=int,
        default=DEFAULT_COLS,
        help=f"Columns in grid (default: {DEFAULT_COLS}, max: {MAX_COLS})",
    )
    args = parser.parse_args()

    input_path = Path(args.input)
    if not input_path.is_file():
        print(f"Error: {input_path} not found", file=sys.stderr)
        sys.exit(1)

    cols = min(args.cols, MAX_COLS)
    output = Path(args.output_prefix)
    # Handle directory paths and missing extensions
    if output.is_dir() or str(output).endswith("/"):
        output = output / "doc_pages.jpg"
    elif not output.suffix:
        output = Path(f"{output}.jpg")

    try:
        with tempfile.TemporaryDirectory() as temp_dir:
            images = _convert_to_page_images(input_path, Path(temp_dir))
            result = create_page_grid(images, output, cols=cols)
            print(f"Created: {result} ({len(images)} pages)")
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
