"""Unified document format converter.

Handles .doc→.docx, .dotx→.docx, .docx→pdf, .docx→images in one command.

Usage:
    python scripts/convert_doc.py document.docx --to images    # per-page JPEGs
    python scripts/convert_doc.py document.docx --to pdf       # PDF
    python scripts/convert_doc.py legacy.doc --to docx         # .doc → .docx
    python scripts/convert_doc.py template.dotx --to docx      # .dotx → .docx
"""

import subprocess
import sys
from pathlib import Path

from office.soffice import get_soffice_env


def convert_to_pdf(input_path: Path, output_dir: Path) -> Path:
    """Convert document to PDF using LibreOffice."""
    result = subprocess.run(
        [
            "soffice",
            "--headless",
            "--convert-to",
            "pdf",
            "--outdir",
            str(output_dir),
            str(input_path),
        ],
        capture_output=True,
        text=True,
        env=get_soffice_env(),
    )
    if result.returncode != 0:
        print(f"Error: PDF conversion failed: {result.stderr}", file=sys.stderr)
        sys.exit(1)
    pdf_path = output_dir / f"{input_path.stem}.pdf"
    if not pdf_path.exists():
        print(f"Error: Expected {pdf_path} not created", file=sys.stderr)
        sys.exit(1)
    return pdf_path


def convert_to_images(input_path: Path, output_dir: Path) -> list[Path]:
    """Convert document to per-page JPEG images."""
    pdf_path = convert_to_pdf(input_path, output_dir)
    prefix = output_dir / "page"
    result = subprocess.run(
        ["pdftoppm", "-jpeg", "-r", "150", str(pdf_path), str(prefix)],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"Error: Image conversion failed: {result.stderr}", file=sys.stderr)
        sys.exit(1)
    images = sorted(output_dir.glob("page-*.jpg"))
    return images


def convert_to_docx(input_path: Path, output_dir: Path) -> Path:
    """Convert .doc or .dotx to .docx using LibreOffice."""
    result = subprocess.run(
        [
            "soffice",
            "--headless",
            "--convert-to",
            "docx",
            "--outdir",
            str(output_dir),
            str(input_path),
        ],
        capture_output=True,
        text=True,
        env=get_soffice_env(),
    )
    if result.returncode != 0:
        print(f"Error: DOCX conversion failed: {result.stderr}", file=sys.stderr)
        sys.exit(1)
    docx_path = output_dir / f"{input_path.stem}.docx"
    if not docx_path.exists():
        print(f"Error: Expected {docx_path} not created", file=sys.stderr)
        sys.exit(1)
    return docx_path


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Convert documents between formats.")
    parser.add_argument("input", help="Input document file")
    parser.add_argument(
        "output_path", nargs="?", default=None, help="Optional output file or directory path"
    )
    parser.add_argument(
        "--to", required=True, choices=["pdf", "images", "docx"], help="Target format"
    )
    parser.add_argument(
        "--outdir", "--output", default=None, help="Output directory (default: current)"
    )

    args = parser.parse_args()
    input_path = Path(args.input)

    # Determine output directory from positional arg, --outdir, or default
    rename_to = None
    if args.output_path:
        out = Path(args.output_path)
        if out.suffix:  # looks like a file path
            output_dir = out.parent if str(out.parent) != "." else Path(".")
            rename_to = out
        else:
            output_dir = out
    elif args.outdir:
        output_dir = Path(args.outdir)
    else:
        output_dir = Path(".")

    output_dir.mkdir(parents=True, exist_ok=True)

    if not input_path.is_file():
        print(f"Error: {input_path} not found", file=sys.stderr)
        sys.exit(1)

    import shutil

    if args.to == "pdf":
        result = convert_to_pdf(input_path, output_dir)
        if rename_to:
            shutil.move(str(result), str(rename_to))
            result = rename_to
        print(f"Created: {result}")
    elif args.to == "images":
        images = convert_to_images(input_path, output_dir)
        print(f"Created {len(images)} image(s):")
        for img in images:
            print(f"  {img}")
    elif args.to == "docx":
        result = convert_to_docx(input_path, output_dir)
        if rename_to:
            shutil.move(str(result), str(rename_to))
            result = rename_to
        print(f"Created: {result}")
