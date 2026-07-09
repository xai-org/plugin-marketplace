"""Inspect tables in an unpacked DOCX document.

Shows table dimensions, column widths, cell content, and merged cells
so you can understand table structure without reading raw XML.

Usage:
    python scripts/inspect_tables.py unpacked/

Output:
    === Tables ===

    Table 0 (3 rows × 4 cols)
      widths: 2.5" | 2.5" | 2.5" | 2.5"
      [0,0] "Name"          [0,1] "Department"   [0,2] "Phone"        [0,3] "Email"
      [1,0] "John Doe"      [1,1] "Engineering"  [1,2] "x4201"        [1,3] "john@..."
      [2,0] "Jane Smith"    [2,1] "Marketing"    [2,2] "x4305"        [2,3] "jane@..."

    Table 1 (2 rows × 3 cols, has merged cells)
      [0,0] "Q1 Results" (colspan=3)
      [1,0] "Revenue"       [1,1] "$1.2M"        [1,2] "↑ 15%"
"""

import sys
from pathlib import Path

import defusedxml.minidom


def _get_text(node):
    if node.nodeType == node.TEXT_NODE:
        return node.data
    return "".join(_get_text(c) for c in node.childNodes)


def _cell_text(tc_element) -> str:
    """Extract all text from a table cell element."""
    texts = []
    for t in tc_element.getElementsByTagName("w:t"):
        txt = _get_text(t).strip()
        if txt:
            texts.append(txt)
    return " ".join(texts)


def _cell_merge_info(tc_element) -> dict:
    """Check for horizontal/vertical merge in a cell."""
    info = {}
    for tcPr in tc_element.getElementsByTagName("w:tcPr"):
        # Horizontal merge (gridSpan)
        for gs in tcPr.getElementsByTagName("w:gridSpan"):
            val = gs.getAttribute("w:val")
            if val and int(val) > 1:
                info["colspan"] = int(val)

        # Vertical merge
        for vm in tcPr.getElementsByTagName("w:vMerge"):
            val = vm.getAttribute("w:val")
            if val == "restart":
                info["vmerge"] = "start"
            else:
                info["vmerge"] = "cont"

        # Cell width
        for tcW in tcPr.getElementsByTagName("w:tcW"):
            w = tcW.getAttribute("w:w")
            wtype = tcW.getAttribute("w:type")
            if w and wtype == "dxa":
                info["width_in"] = int(w) / 1440

        break
    return info


def inspect_tables(unpacked_dir: Path) -> str:
    """Inspect all tables in document.xml."""
    doc_path = unpacked_dir / "word" / "document.xml"
    if not doc_path.is_file():
        return "Error: document.xml not found"

    dom = defusedxml.minidom.parse(str(doc_path))
    tables = dom.getElementsByTagName("w:tbl")

    if not tables:
        return "\n=== Tables ===\n  (no tables found)"

    lines = [f"\n=== Tables ({len(tables)}) ==="]

    for tbl_idx, tbl in enumerate(tables):
        rows = tbl.getElementsByTagName("w:tr")
        if not rows:
            continue

        # Count max columns
        max_cols = 0
        has_merge = False
        row_data = []

        for row in rows:
            cells = row.getElementsByTagName("w:tc")
            col_count = 0
            cell_data = []

            for cell in cells:
                text = _cell_text(cell)
                merge = _cell_merge_info(cell)

                if merge.get("colspan") or merge.get("vmerge"):
                    has_merge = True

                span = merge.get("colspan", 1)
                col_count += span

                cell_data.append(
                    {
                        "text": text,
                        "colspan": merge.get("colspan"),
                        "vmerge": merge.get("vmerge"),
                        "width": merge.get("width_in"),
                    }
                )

            max_cols = max(max_cols, col_count)
            row_data.append(cell_data)

        # Header
        merge_note = ", has merged cells" if has_merge else ""
        lines.append(f"\n  Table {tbl_idx} ({len(rows)} rows × {max_cols} cols{merge_note})")

        # Column widths from first row
        first_widths = [c.get("width") for c in row_data[0] if c.get("width")]
        if first_widths:
            width_str = " | ".join(f'{w:.1f}"' for w in first_widths)
            lines.append(f"    widths: {width_str}")

        # Cell contents (cap at 8 rows for large tables)
        max_display_rows = 8
        for ri, row_cells in enumerate(row_data[:max_display_rows]):
            parts = []
            for ci, cell in enumerate(row_cells):
                text = cell["text"]
                if len(text) > 20:
                    text = text[:17] + "..."

                # Show merge info
                extra = ""
                if cell.get("colspan"):
                    extra = f" (colspan={cell['colspan']})"
                elif cell.get("vmerge") == "cont":
                    text = "↕"  # continuation of vertical merge
                elif cell.get("vmerge") == "start":
                    extra = " (vmerge↓)"

                parts.append(f'[{ri},{ci}] "{text}"{extra}')

            # Format as aligned columns
            line = "    " + "  ".join(f"{p:22s}" for p in parts)
            lines.append(line.rstrip())

        if len(row_data) > max_display_rows:
            lines.append(f"    ... and {len(row_data) - max_display_rows} more rows")

    return "\n".join(lines)


if __name__ == "__main__":
    import signal

    signal.signal(signal.SIGPIPE, signal.SIG_DFL)

    if len(sys.argv) < 2:
        print("Usage: python inspect_tables.py <unpacked_dir/>", file=sys.stderr)
        sys.exit(1)

    path = Path(sys.argv[1])
    if not (path / "word").is_dir():
        print(f"Error: {path}/word/ not found", file=sys.stderr)
        sys.exit(1)

    print(inspect_tables(path))
