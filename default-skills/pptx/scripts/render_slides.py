"""Convert a PPTX to individual slide images + a contact sheet in one command.

Replaces the two-step soffice+pdftoppm workflow with a single call.
Creates individual slide images for detailed inspection and a combined
contact sheet for quick visual QA (read 1 image instead of N).

Usage:
    python scripts/render_slides.py output.pptx
    python scripts/render_slides.py output.pptx --outdir /tmp/slides
    python scripts/render_slides.py output.pptx --dpi 100

Output:
    slide-01.jpg, slide-02.jpg, ...   (individual slides)
    contact-sheet.jpg                  (grid of all slides — read this first)

For QA, read just contact-sheet.jpg to spot issues across all slides at once.
Only read individual slide-NN.jpg files for slides where you see a problem.
"""

import argparse
import subprocess
import sys
import tempfile
from pathlib import Path

try:
    from office.soffice import get_soffice_env
except ImportError:
    get_soffice_env = None

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    Image = None


def convert_pptx_to_images(
    pptx_path: Path,
    outdir: Path,
    dpi: int = 150,
) -> list[Path]:
    """Convert PPTX → PDF → individual JPEG images."""
    outdir.mkdir(parents=True, exist_ok=True)

    # Step 1: PPTX → PDF
    with tempfile.TemporaryDirectory() as tmpdir:
        env = get_soffice_env() if get_soffice_env else None
        result = subprocess.run(
            ["soffice", "--headless", "--convert-to", "pdf", "--outdir", tmpdir, str(pptx_path)],
            capture_output=True,
            text=True,
            env=env,
            timeout=120,
        )
        if result.returncode != 0:
            print(f"Error: soffice conversion failed: {result.stderr}", file=sys.stderr)
            sys.exit(1)

        pdf_path = Path(tmpdir) / f"{pptx_path.stem}.pdf"
        if not pdf_path.exists():
            # Sometimes soffice outputs with slightly different name
            pdfs = list(Path(tmpdir).glob("*.pdf"))
            if pdfs:
                pdf_path = pdfs[0]
            else:
                print("Error: PDF not produced by soffice", file=sys.stderr)
                sys.exit(1)

        # Step 2: PDF → individual JPEGs
        result = subprocess.run(
            ["pdftoppm", "-jpeg", "-r", str(dpi), str(pdf_path), str(outdir / "slide")],
            capture_output=True,
            text=True,
            timeout=120,
        )
        if result.returncode != 0:
            print(f"Error: pdftoppm failed: {result.stderr}", file=sys.stderr)
            sys.exit(1)

    images = sorted(outdir.glob("slide-*.jpg"))
    return images


def create_contact_sheet(
    images: list[Path],
    output_path: Path,
    cols: int = 3,
    thumb_width: int = 400,
) -> Path:
    """Create a grid contact sheet from individual slide images."""
    if Image is None:
        print("Warning: Pillow not available, skipping contact sheet", file=sys.stderr)
        return output_path

    if not images:
        return output_path

    # Load first image to get aspect ratio
    with Image.open(images[0]) as img:
        aspect = img.height / img.width
    thumb_height = int(thumb_width * aspect)

    rows = (len(images) + cols - 1) // cols
    padding = 10
    label_height = 20

    grid_w = cols * thumb_width + (cols + 1) * padding
    grid_h = rows * (thumb_height + label_height) + (rows + 1) * padding

    grid = Image.new("RGB", (grid_w, grid_h), "white")
    draw = ImageDraw.Draw(grid)

    try:
        font = ImageFont.load_default(size=14)
    except Exception:
        font = ImageFont.load_default()

    for i, img_path in enumerate(images):
        row, col = i // cols, i % cols
        x = col * thumb_width + (col + 1) * padding
        y = row * (thumb_height + label_height) + (row + 1) * padding

        # Label
        label = img_path.stem
        draw.text((x + 2, y), label, fill="black", font=font)

        # Thumbnail
        with Image.open(img_path) as img:
            img.thumbnail((thumb_width, thumb_height), Image.Resampling.LANCZOS)
            grid.paste(img, (x, y + label_height))

    grid.save(str(output_path), "JPEG", quality=90)
    return output_path


def main():
    parser = argparse.ArgumentParser(description="Convert PPTX to slide images + contact sheet")
    parser.add_argument("pptx", help="Input PPTX file")
    parser.add_argument("--outdir", default=None, help="Output directory (default: same as pptx)")
    parser.add_argument("--dpi", type=int, default=150, help="Resolution (default: 150)")
    parser.add_argument("--cols", type=int, default=3, help="Contact sheet columns (default: 3)")
    args = parser.parse_args()

    pptx_path = Path(args.pptx)
    if not pptx_path.is_file():
        print(f"Error: {pptx_path} not found", file=sys.stderr)
        sys.exit(1)

    outdir = Path(args.outdir) if args.outdir else pptx_path.parent
    outdir.mkdir(parents=True, exist_ok=True)

    print(f"Converting {pptx_path.name} → images ({args.dpi} DPI)...")
    images = convert_pptx_to_images(pptx_path, outdir, dpi=args.dpi)

    if not images:
        print("Error: No slide images produced", file=sys.stderr)
        sys.exit(1)

    print(f"Created {len(images)} slide image(s):")
    for img in images:
        print(f"  {img}")

    # Contact sheet
    sheet_path = outdir / "contact-sheet.jpg"
    create_contact_sheet(images, sheet_path, cols=args.cols)
    if sheet_path.exists():
        print(f"\nContact sheet (read this for QA):\n  {sheet_path}")


if __name__ == "__main__":
    main()
