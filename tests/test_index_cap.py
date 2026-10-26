"""The component index must keep every item under the cap and fail above it."""

from __future__ import annotations

import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

import plugin_catalog  # noqa: E402


def _plugin_with_skills(parent: Path, count: int) -> Path:
    root = parent / "plugin"
    for i in range(count):
        skill = root / "skills" / f"skill-{i:03d}"
        skill.mkdir(parents=True)
        (skill / "SKILL.md").write_text(
            f"---\nname: skill-{i:03d}\ndescription: n\n---\n",
            encoding="utf-8",
        )
    return root


class IndexCapTests(unittest.TestCase):
    def test_extract_keeps_skills_past_the_old_limit(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            root = _plugin_with_skills(Path(tmp), 51)
            extracted = plugin_catalog.extract_plugin(root)
        names = [item["name"] for item in extracted["components"]["skills"]]
        self.assertEqual(len(names), 51)
        self.assertIn("skill-050", names)

    def test_extract_fails_when_a_category_exceeds_the_cap(self) -> None:
        count = plugin_catalog.MAX_ITEMS_PER_CATEGORY + 1
        with tempfile.TemporaryDirectory() as tmp:
            root = _plugin_with_skills(Path(tmp), count)
            with self.assertRaises(RuntimeError) as caught:
                plugin_catalog.extract_plugin(root)
        message = str(caught.exception)
        self.assertIn("skills", message)
        self.assertIn(str(count), message)


if __name__ == "__main__":
    unittest.main()
