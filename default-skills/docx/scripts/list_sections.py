"""List document sections with page setup, margins, columns, and headers.

Usage:
    python scripts/list_sections.py unpacked/

Output:
    === Sections ===
      [0] ¶1-42    8.5"×11.0" portrait   margins: 1.0" all    cols: 1
      [1] ¶43-60   11.0"×8.5" landscape  margins: 0.5" all    cols: 2
"""

import sys
from pathlib import Path

import defusedxml.minidom


def _get_text(node):
    if node.nodeType == node.TEXT_NODE:
        return node.data
    return "".join(_get_text(c) for c in node.childNodes)


def list_sections(unpacked_dir: Path) -> str:
    doc_path = unpacked_dir / "word" / "document.xml"
    if not doc_path.is_file():
        return "Error: document.xml not found"

    dom = defusedxml.minidom.parse(str(doc_path))
    lines = ["\n=== Sections ==="]

    # Count paragraphs to track section ranges
    all_paras = dom.getElementsByTagName("w:p")
    para_count = len(all_paras)

    # Find all sectPr — in paragraphs (section breaks) and in body (final section)
    sections = []
    current_para = 0

    # Mid-document section breaks: <w:pPr><w:sectPr>...</w:sectPr></w:pPr>
    for i, para in enumerate(all_paras):
        for pPr in para.getElementsByTagName("w:pPr"):
            for sectPr in pPr.getElementsByTagName("w:sectPr"):
                sections.append((current_para, i, sectPr))
                current_para = i + 1
            break

    # Final section: <w:body><w:sectPr>
    body = dom.getElementsByTagName("w:body")
    if body:
        for child in body[0].childNodes:
            if child.nodeType == child.ELEMENT_NODE and child.tagName == "w:sectPr":
                sections.append((current_para, para_count - 1, child))

    if not sections:
        lines.append("  (no section properties found)")
        return "\n".join(lines)

    for idx, (start_para, end_para, sectPr) in enumerate(sections):
        # Page size
        w_in = h_in = 0.0
        orient = "portrait"
        for pgSz in sectPr.getElementsByTagName("w:pgSz"):
            w = pgSz.getAttribute("w:w")
            h = pgSz.getAttribute("w:h")
            orient = pgSz.getAttribute("w:orient") or "portrait"
            if w and h:
                w_in = int(w) / 1440
                h_in = int(h) / 1440

        # Margins
        margin_str = ""
        for pgMar in sectPr.getElementsByTagName("w:pgMar"):
            margins = {}
            for side in ("top", "bottom", "left", "right"):
                val = pgMar.getAttribute(f"w:{side}")
                if val:
                    margins[side] = int(val) / 1440
            if margins:
                vals = list(margins.values())
                if len(set(f"{v:.1f}" for v in vals)) == 1:
                    margin_str = f'{vals[0]:.1f}" all'
                else:
                    margin_str = " ".join(f'{s[0]}={v:.1f}"' for s, v in margins.items())

        # Columns
        cols = 1
        for colEl in sectPr.getElementsByTagName("w:cols"):
            n = colEl.getAttribute("w:num")
            if n:
                cols = int(n)

        # Headers
        h_types = [
            el.getAttribute("w:type") for el in sectPr.getElementsByTagName("w:headerReference")
        ]

        parts = [f"  [{idx}] ¶{start_para + 1}-{end_para + 1}"]
        if w_in:
            parts.append(f'  {w_in:.1f}"×{h_in:.1f}" {orient}')
        if margin_str:
            parts.append(f"  margins: {margin_str}")
        parts.append(f"  cols: {cols}")
        if h_types:
            parts.append(f"  headers: {', '.join(h_types)}")

        lines.append("".join(parts))

    return "\n".join(lines)


if __name__ == "__main__":
    import signal

    signal.signal(signal.SIGPIPE, signal.SIG_DFL)

    if len(sys.argv) < 2:
        print("Usage: python list_sections.py <unpacked_dir/>", file=sys.stderr)
        sys.exit(1)

    path = Path(sys.argv[1])
    if not (path / "word").is_dir():
        print(f"Error: {path}/word/ not found", file=sys.stderr)
        sys.exit(1)

    print(list_sections(path))
