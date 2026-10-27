import importlib.util
from pathlib import Path

SCRIPT_PATH = Path(__file__).resolve().parents[1] / "scripts" / "plugin_catalog.py"
SPEC = importlib.util.spec_from_file_location("plugin_catalog", SCRIPT_PATH)
assert SPEC is not None and SPEC.loader is not None
plugin_catalog = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(plugin_catalog)


def test_parse_frontmatter_utf8_bom(tmp_path):
    skill_file = tmp_path / "SKILL.md"
    content = "---\nname: bom-skill\ndescription: A skill with UTF-8 BOM\n---\nBody text\n"
    skill_file.write_bytes(content.encode("utf-8-sig"))

    fields = plugin_catalog.parse_frontmatter(skill_file)
    assert fields.get("name") == "bom-skill"
    assert fields.get("description") == "A skill with UTF-8 BOM"


def test_scan_skills_root_skill(tmp_path):
    root_skill = tmp_path / "SKILL.md"
    root_skill.write_text(
        "---\nname: root-skill\ndescription: Skill at repo root\n---\n",
        encoding="utf-8",
    )

    items = plugin_catalog.scan_skills(tmp_path, {})
    assert len(items) == 1
    assert items[0]["name"] == "root-skill"
    assert items[0]["description"] == "Skill at repo root"


def test_scan_skills_direct_skill_file_in_manifest(tmp_path):
    custom_dir = tmp_path / "custom"
    custom_dir.mkdir(parents=True)
    custom_skill = custom_dir / "SKILL.md"
    custom_skill.write_text(
        "---\nname: custom-skill\ndescription: Custom skill file\n---\n",
        encoding="utf-8",
    )

    manifest = {"skills": ["custom/SKILL.md"]}
    items = plugin_catalog.scan_skills(tmp_path, manifest)
    assert len(items) == 1
    assert items[0]["name"] == "custom-skill"
    assert items[0]["description"] == "Custom skill file"


def test_scan_skills_standard_directory(tmp_path):
    skill_dir = tmp_path / "skills" / "my-skill"
    skill_dir.mkdir(parents=True)
    (skill_dir / "SKILL.md").write_text(
        "---\nname: standard-skill\ndescription: Standard directory skill\n---\n",
        encoding="utf-8",
    )

    items = plugin_catalog.scan_skills(tmp_path, {})
    assert len(items) == 1
    assert items[0]["name"] == "standard-skill"
    assert items[0]["description"] == "Standard directory skill"
