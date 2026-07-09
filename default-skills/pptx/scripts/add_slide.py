"""Add a new slide to an unpacked PPTX directory.

Duplicates an existing slide or creates one from a layout, then automatically
inserts it into the slide order in presentation.xml.

Usage:
    python scripts/add_slide.py unpacked/ slide2.xml
    # Duplicates slide2, appends to end of presentation

    python scripts/add_slide.py unpacked/ slide2.xml --after slide1.xml
    # Duplicates slide2, inserts after slide1

    python scripts/add_slide.py unpacked/ slide2.xml --after 1
    # Same — inserts after slide 1

    python scripts/add_slide.py unpacked/ slideLayout2.xml
    # Creates empty slide from slideLayout2, appends to end

To see available layouts: ls unpacked/ppt/slideLayouts/
"""

import re
import shutil
import sys
from pathlib import Path


def get_next_slide_number(slides_dir: Path) -> int:
    existing = [
        int(m.group(1))
        for f in slides_dir.glob("slide*.xml")
        if (m := re.match(r"slide(\d+)\.xml", f.name))
    ]
    return max(existing) + 1 if existing else 1


def create_slide_from_layout(
    unpacked_dir: Path, layout_file: str, after_slide: str | None = None
) -> str:
    slides_dir = unpacked_dir / "ppt" / "slides"
    rels_dir = slides_dir / "_rels"
    layouts_dir = unpacked_dir / "ppt" / "slideLayouts"

    layout_path = layouts_dir / layout_file
    if not layout_path.exists():
        print(f"Error: {layout_path} not found", file=sys.stderr)
        sys.exit(1)

    next_num = get_next_slide_number(slides_dir)
    dest = f"slide{next_num}.xml"
    dest_slide = slides_dir / dest
    dest_rels = rels_dir / f"{dest}.rels"

    slide_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr>
        <p:cNvPr id="1" name=""/>
        <p:cNvGrpSpPr/>
        <p:nvPr/>
      </p:nvGrpSpPr>
      <p:grpSpPr>
        <a:xfrm>
          <a:off x="0" y="0"/>
          <a:ext cx="0" cy="0"/>
          <a:chOff x="0" y="0"/>
          <a:chExt cx="0" cy="0"/>
        </a:xfrm>
      </p:grpSpPr>
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr>
    <a:masterClrMapping/>
  </p:clrMapOvr>
</p:sld>"""
    dest_slide.write_text(slide_xml, encoding="utf-8")

    rels_dir.mkdir(exist_ok=True)
    rels_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/{layout_file}"/>
</Relationships>"""
    dest_rels.write_text(rels_xml, encoding="utf-8")

    _add_to_content_types(unpacked_dir, dest)
    rid = _add_to_presentation_rels(unpacked_dir, dest)
    next_slide_id = _get_next_slide_id(unpacked_dir)
    _add_to_sldIdLst(unpacked_dir, rid, next_slide_id, after_slide=after_slide)

    pos = f" after {after_slide}" if after_slide else " at end"
    print(f"Created {dest} from {layout_file} — inserted{pos}")
    return dest


def duplicate_slide(unpacked_dir: Path, source: str, after_slide: str | None = None) -> str:
    slides_dir = unpacked_dir / "ppt" / "slides"
    rels_dir = slides_dir / "_rels"

    source_slide = slides_dir / source

    if not source_slide.exists():
        print(f"Error: {source_slide} not found", file=sys.stderr)
        sys.exit(1)

    next_num = get_next_slide_number(slides_dir)
    dest = f"slide{next_num}.xml"
    dest_slide = slides_dir / dest

    source_rels = rels_dir / f"{source}.rels"
    dest_rels = rels_dir / f"{dest}.rels"

    shutil.copy2(source_slide, dest_slide)

    if source_rels.exists():
        shutil.copy2(source_rels, dest_rels)

        rels_content = dest_rels.read_text(encoding="utf-8")
        rels_content = re.sub(
            r'\s*<Relationship[^>]*Type="[^"]*notesSlide"[^>]*/>\s*',
            "\n",
            rels_content,
        )
        dest_rels.write_text(rels_content, encoding="utf-8")

    _add_to_content_types(unpacked_dir, dest)
    rid = _add_to_presentation_rels(unpacked_dir, dest)
    next_slide_id = _get_next_slide_id(unpacked_dir)
    _add_to_sldIdLst(unpacked_dir, rid, next_slide_id, after_slide=after_slide)

    pos = f" after {after_slide}" if after_slide else " at end"
    print(f"Created {dest} from {source} — inserted{pos}")
    return dest


def _add_to_content_types(unpacked_dir: Path, dest: str) -> None:
    content_types_path = unpacked_dir / "[Content_Types].xml"
    content_types = content_types_path.read_text(encoding="utf-8")

    new_override = f'<Override PartName="/ppt/slides/{dest}" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>'

    if f"/ppt/slides/{dest}" not in content_types:
        content_types = content_types.replace("</Types>", f"  {new_override}\n</Types>")
        content_types_path.write_text(content_types, encoding="utf-8")


def _add_to_presentation_rels(unpacked_dir: Path, dest: str) -> str:
    pres_rels_path = unpacked_dir / "ppt" / "_rels" / "presentation.xml.rels"
    pres_rels = pres_rels_path.read_text(encoding="utf-8")

    rids = [int(m) for m in re.findall(r'Id="rId(\d+)"', pres_rels)]
    next_rid = max(rids) + 1 if rids else 1
    rid = f"rId{next_rid}"

    new_rel = f'<Relationship Id="{rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/{dest}"/>'

    if f"slides/{dest}" not in pres_rels:
        pres_rels = pres_rels.replace("</Relationships>", f"  {new_rel}\n</Relationships>")
        pres_rels_path.write_text(pres_rels, encoding="utf-8")

    return rid


def _get_next_slide_id(unpacked_dir: Path) -> int:
    pres_path = unpacked_dir / "ppt" / "presentation.xml"
    pres_content = pres_path.read_text(encoding="utf-8")
    slide_ids = [int(m) for m in re.findall(r'<p:sldId[^>]*id="(\d+)"', pres_content)]
    return max(slide_ids) + 1 if slide_ids else 256


def _add_to_sldIdLst(
    unpacked_dir: Path,
    rid: str,
    slide_id: int,
    after_slide: str | None = None,
) -> None:
    """Insert a <p:sldId> element into <p:sldIdLst> in presentation.xml.

    Args:
        unpacked_dir: path to unpacked PPTX directory
        rid: relationship ID (e.g. "rId5")
        slide_id: unique slide ID number
        after_slide: insert after this slide (filename or number). None = append.
    """
    pres_path = unpacked_dir / "ppt" / "presentation.xml"
    raw = pres_path.read_text(encoding="utf-8")

    new_entry = f'<p:sldId id="{slide_id}" r:id="{rid}"/>'

    # Normalize after_slide
    after_name = None
    if after_slide is not None:
        if after_slide.isdigit():
            after_name = f"slide{after_slide}.xml"
        elif not after_slide.endswith(".xml"):
            after_name = f"{after_slide}.xml"
        else:
            after_name = after_slide

    if after_name is not None:
        # Find the rId for the after_slide
        pres_rels_path = unpacked_dir / "ppt" / "_rels" / "presentation.xml.rels"
        if pres_rels_path.exists():
            import defusedxml.minidom

            rels_dom = defusedxml.minidom.parse(str(pres_rels_path))
            after_rid = None
            for rel in rels_dom.getElementsByTagName("Relationship"):
                target = rel.getAttribute("Target")
                if target == f"slides/{after_name}":
                    after_rid = rel.getAttribute("Id")
                    break

            if after_rid:
                # Insert after the matching <p:sldId>
                after_pattern = re.compile(
                    r'(<p:sldId\b[^>]*r:id="' + re.escape(after_rid) + r'"[^>]*/>)',
                    re.DOTALL,
                )
                match = after_pattern.search(raw)
                if match:
                    insert_pos = match.end()
                    raw = raw[:insert_pos] + "\n    " + new_entry + raw[insert_pos:]
                    pres_path.write_text(raw, encoding="utf-8")
                    return

    # Default: append before </p:sldIdLst>
    raw = raw.replace("</p:sldIdLst>", f"    {new_entry}\n  </p:sldIdLst>")
    pres_path.write_text(raw, encoding="utf-8")


def parse_source(source: str) -> tuple[str, str | None]:
    if source.startswith("slideLayout") and source.endswith(".xml"):
        return ("layout", source)

    return ("slide", None)


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description="Add a new slide to an unpacked PPTX directory.",
        epilog="To see available layouts: ls <unpacked_dir>/ppt/slideLayouts/",
    )
    parser.add_argument("unpacked_dir", help="Path to unpacked PPTX directory")
    parser.add_argument(
        "source",
        help="Source: slide2.xml (duplicate) or slideLayout2.xml (from layout)",
    )
    parser.add_argument(
        "--after",
        metavar="SLIDE",
        help="Insert after this slide (e.g. slide1.xml or 1). Default: append at end.",
    )

    args = parser.parse_args()
    unpacked_dir = Path(args.unpacked_dir)

    if not unpacked_dir.exists():
        print(f"Error: {unpacked_dir} not found", file=sys.stderr)
        sys.exit(1)

    source_type, layout_file = parse_source(args.source)

    if source_type == "layout" and layout_file is not None:
        create_slide_from_layout(unpacked_dir, layout_file, after_slide=args.after)
    else:
        duplicate_slide(unpacked_dir, args.source, after_slide=args.after)
