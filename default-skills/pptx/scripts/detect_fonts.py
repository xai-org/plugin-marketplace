#!/usr/bin/env python3
"""Detect missing fonts in a PPTX file.

Extracts the font families requested by each slide, then checks whether
they're installed on the system via fontconfig (fc-list). Reports which
fonts are missing so you can install them before rendering.

Usage:
    python scripts/detect_fonts.py output.pptx
    python scripts/detect_fonts.py output.pptx --json

Dependencies: LibreOffice (soffice), fontconfig (fc-list)
"""

import argparse
import json
import os
import re
import subprocess
import xml.etree.ElementTree as ET
from functools import lru_cache
from os.path import abspath, expanduser
from zipfile import ZipFile


def _normalize(name: str) -> str:
    """Normalize a font family name for comparison."""
    s = name.casefold()
    s = re.sub(r"\([^)]*\)", " ", s)
    s = re.sub(r"[\s\-\_\.,/\'\"]+", " ", s)
    return s.strip()


def _strip_style_tokens(name_norm: str) -> str:
    """Strip trailing style tokens (Bold, Italic, etc.) to get the base family."""
    tokens = name_norm.split()
    style_tokens = {
        "regular",
        "condensed",
        "compressed",
        "narrow",
        "italic",
        "oblique",
        "semibold",
        "demibold",
        "bold",
        "black",
        "extra light",
        "ultra light",
        "extralight",
        "ultralight",
        "light",
        "thin",
        "medium",
    }
    while tokens and tokens[-1] in style_tokens:
        tokens = tokens[:-1]
    # Also check two-word style tokens
    while len(tokens) >= 2 and " ".join(tokens[-2:]) in style_tokens:
        tokens = tokens[:-2]
    return " ".join(tokens).strip() or name_norm


@lru_cache(maxsize=1)
def _installed_fonts() -> set[str]:
    """Get all installed font families/names via fontconfig."""
    try:
        proc = subprocess.run(
            ["fc-list", "--format", "%{family}\t%{fullname}\t%{postscriptname}\n"],
            capture_output=True,
            text=True,
            check=True,
        )
    except (FileNotFoundError, subprocess.CalledProcessError):
        return set()

    names: set[str] = set()
    for line in (proc.stdout or "").splitlines():
        parts = line.split("\t")
        for field in parts:
            for item in field.split(","):
                norm = _normalize(item)
                if norm:
                    names.add(norm)
                    names.add(norm.replace(" ", ""))
    return names


def _detect_script(text: str) -> str:
    """Detect whether text is latin, East Asian (ea), or complex script (cs)."""
    for ch in text:
        cp = ord(ch)
        if (
            0x4E00 <= cp <= 0x9FFF
            or 0x3400 <= cp <= 0x4DBF
            or 0x3040 <= cp <= 0x309F
            or 0x30A0 <= cp <= 0x30FF
            or 0xAC00 <= cp <= 0xD7AF
            or 0x3000 <= cp <= 0x303F
        ):
            return "ea"
    for ch in text:
        cp = ord(ch)
        if (
            0x0590 <= cp <= 0x05FF
            or 0x0600 <= cp <= 0x06FF
            or 0x0900 <= cp <= 0x0D7F
            or 0x0E00 <= cp <= 0x0EFF
        ):
            return "cs"
    return "latin"


def extract_fonts(pptx_path: str) -> dict[int, set[str]]:
    """Extract requested font families from each slide in the PPTX."""
    by_slide: dict[int, set[str]] = {}
    with ZipFile(pptx_path, "r") as zf:
        for name in zf.namelist():
            if not (name.startswith("ppt/slides/slide") and name.endswith(".xml")):
                continue
            m = re.search(r"slide(\d+)\.xml$", os.path.basename(name))
            if not m:
                continue
            slide_num = int(m.group(1))
            tree = ET.parse(zf.open(name))
            root = tree.getroot()
            ns = {"a": "http://schemas.openxmlformats.org/drawingml/2006/main"}

            fonts: set[str] = set()
            for r in root.findall(".//a:r", ns):
                # Get the text to determine script
                text = "".join(t.text or "" for t in r.findall("a:t", ns))
                if not text:
                    continue
                script = _detect_script(text)
                rpr = r.find("a:rPr", ns)
                if rpr is not None:
                    child = rpr.find(f"a:{script}", ns)
                    if child is not None:
                        face = child.get("typeface")
                        if face and not face.startswith("+"):
                            fonts.add(_normalize(face))
            if fonts:
                by_slide[slide_num] = fonts
    return by_slide


def detect_missing(pptx_path: str) -> tuple[set[str], dict[int, list[str]]]:
    """Return (overall_missing, {slide_num: [missing_fonts]})."""
    installed = _installed_fonts()
    by_slide = extract_fonts(pptx_path)

    missing_overall: set[str] = set()
    missing_by_slide: dict[int, list[str]] = {}

    for slide_num, fonts in sorted(by_slide.items()):
        slide_missing = []
        for font in sorted(fonts):
            base = _strip_style_tokens(font)
            # Check if font or its base family is installed
            if not (
                font in installed
                or font.replace(" ", "") in installed
                or base in installed
                or base.replace(" ", "") in installed
            ):
                slide_missing.append(font)
                missing_overall.add(font)
        if slide_missing:
            missing_by_slide[slide_num] = slide_missing

    return missing_overall, missing_by_slide


def main() -> None:
    parser = argparse.ArgumentParser(description="Detect missing fonts in a PPTX file.")
    parser.add_argument("pptx_path", help="Path to .pptx file")
    parser.add_argument("--json", dest="output_json", action="store_true", help="Emit JSON output")
    args = parser.parse_args()

    pptx_path = abspath(expanduser(args.pptx_path))
    missing_overall, missing_by_slide = detect_missing(pptx_path)

    if args.output_json:
        print(
            json.dumps(
                {
                    "missing_overall": sorted(missing_overall),
                    "missing_by_slide": {str(k): v for k, v in missing_by_slide.items()},
                }
            )
        )
    elif missing_overall:
        print(f"Missing fonts ({len(missing_overall)}):")
        for font in sorted(missing_overall):
            print(f"  • {font}")
        print()
        for slide_num in sorted(missing_by_slide):
            print(f"  Slide {slide_num}: {', '.join(missing_by_slide[slide_num])}")
    else:
        print("All fonts available ✓")


if __name__ == "__main__":
    main()
