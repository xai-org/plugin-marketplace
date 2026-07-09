"""Inspect headers and footers in an unpacked DOCX document.

Shows which header/footer files exist, their type (default/first/even),
text content, and image references.

Usage:
    python scripts/inspect_headers.py unpacked/

Output:
    === Headers & Footers ===
      header1.xml (default):
        text: "Company Name | Confidential"
        images: word/media/logo.png (rId1)

      footer1.xml (default):
        text: "Page X of Y | © 2025 Acme Corp"
"""

import sys
from pathlib import Path

import defusedxml.minidom


def _get_text(node):
    if node.nodeType == node.TEXT_NODE:
        return node.data
    return "".join(_get_text(c) for c in node.childNodes)


def _load_rels(xml_path: Path) -> dict[str, str]:
    """Load rId → target path from the file's .rels."""
    rels_path = xml_path.parent / "_rels" / f"{xml_path.name}.rels"
    if not rels_path.is_file():
        return {}
    mapping = {}
    try:
        dom = defusedxml.minidom.parse(str(rels_path))
        for rel in dom.getElementsByTagName("Relationship"):
            rid = rel.getAttribute("Id")
            target = rel.getAttribute("Target")
            if rid and target:
                mapping[rid] = target
    except Exception:
        pass
    return mapping


def inspect_headers(unpacked_dir: Path) -> str:
    """Inspect all headers and footers."""
    word_dir = unpacked_dir / "word"
    doc_path = word_dir / "document.xml"

    # Build type mapping from document.xml sectPr
    hf_type_map: dict[str, str] = {}  # rId → type (default, first, even)
    hf_file_map: dict[str, str] = {}  # rId → target file
    if doc_path.is_file():
        dom = defusedxml.minidom.parse(str(doc_path))
        for sectPr in dom.getElementsByTagName("w:sectPr"):
            for tag in ("w:headerReference", "w:footerReference"):
                for ref in sectPr.getElementsByTagName(tag):
                    rid = ref.getAttribute("r:id")
                    hf_type = ref.getAttribute("w:type") or "default"
                    if rid:
                        hf_type_map[rid] = hf_type

    # Resolve rIds to file names from document.xml.rels
    doc_rels = _load_rels(doc_path)
    for rid, target in doc_rels.items():
        if "header" in target.lower() or "footer" in target.lower():
            hf_file_map[rid] = target

    lines = ["\n=== Headers & Footers ==="]

    # Find all header/footer XML files
    hf_files = sorted(
        list(word_dir.glob("header*.xml")) + list(word_dir.glob("footer*.xml")),
        key=lambda f: f.name,
    )

    if not hf_files:
        lines.append("  (none found)")
        return "\n".join(lines)

    for hf_file in hf_files:
        # Determine type
        hf_type = "unknown"
        for rid, target in hf_file_map.items():
            if hf_file.name in target:
                hf_type = hf_type_map.get(rid, "unknown")
                break

        kind = "Header" if "header" in hf_file.name else "Footer"
        lines.append(f"\n  {hf_file.name} ({hf_type}) [{kind}]:")

        try:
            dom = defusedxml.minidom.parse(str(hf_file))
        except Exception:
            lines.append("    (parse error)")
            continue

        # Collect text
        all_text = []
        for t in dom.getElementsByTagName("w:t"):
            txt = _get_text(t).strip()
            if txt:
                all_text.append(txt)

        if all_text:
            preview = " | ".join(all_text)
            if len(preview) > 100:
                preview = preview[:97] + "..."
            lines.append(f'    text: "{preview}"')
        else:
            lines.append("    text: (empty)")

        # Check for images
        rels = _load_rels(hf_file)
        image_refs = [
            (rid, target)
            for rid, target in rels.items()
            if any(
                ext in target.lower() for ext in (".png", ".jpg", ".jpeg", ".gif", ".svg", ".emf")
            )
        ]
        if image_refs:
            for rid, target in image_refs:
                lines.append(f"    image: {target} ({rid})")

        # Check for page numbers
        has_page_num = bool(dom.getElementsByTagName("w:fldSimple")) or bool(
            dom.getElementsByTagName("w:instrText")
        )
        if has_page_num:
            lines.append("    (contains field codes — page numbers or dynamic content)")

    return "\n".join(lines)


if __name__ == "__main__":
    import signal

    signal.signal(signal.SIGPIPE, signal.SIG_DFL)

    if len(sys.argv) < 2:
        print("Usage: python inspect_headers.py <unpacked_dir/>", file=sys.stderr)
        sys.exit(1)

    path = Path(sys.argv[1])
    if not (path / "word").is_dir():
        print(f"Error: {path}/word/ not found", file=sys.stderr)
        sys.exit(1)

    print(inspect_headers(path))
