"""Frontmatter values that YAML wraps over several lines must be read whole."""

from __future__ import annotations

import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

import plugin_catalog  # noqa: E402


def _parse(text: str) -> dict[str, str]:
    with tempfile.TemporaryDirectory() as tmp:
        path = Path(tmp) / "SKILL.md"
        path.write_text(text, encoding="utf-8")
        return plugin_catalog.parse_frontmatter(path)


class FrontmatterTests(unittest.TestCase):
    def test_plain_value_over_indented_lines(self) -> None:
        fields = _parse(
            "---\n"
            "name: demo\n"
            "description: Advanced patterns - middleware, Server Actions, caching with\n"
            "  Clerk.\n"
            "license: MIT\n"
            "---\n"
        )
        self.assertEqual(
            fields["description"],
            "Advanced patterns - middleware, Server Actions, caching with Clerk.",
        )
        self.assertEqual(fields["license"], "MIT")

    def test_single_quoted_value_over_indented_lines(self) -> None:
        fields = _parse(
            "---\n"
            "description: 'Astro patterns with Clerk, island components,\n"
            "  API routes. Triggers on: astro clerk, the user''s\n"
            "  SSR.'\n"
            "allowed-tools: WebFetch\n"
            "---\n"
        )
        self.assertEqual(
            fields["description"],
            "Astro patterns with Clerk, island components, API routes. "
            "Triggers on: astro clerk, the user's SSR.",
        )
        self.assertEqual(fields["allowed-tools"], "WebFetch")

    def test_double_quoted_value_over_indented_lines(self) -> None:
        fields = _parse('---\ndescription: "first part\n  second part"\n---\n')
        self.assertEqual(fields["description"], "first part second part")

    def test_nested_mapping_is_not_folded_into_an_empty_key(self) -> None:
        fields = _parse(
            "---\nname: demo\nmetadata:\n  author: someone\ndescription: kept\n---\n"
        )
        self.assertEqual(fields["metadata"], "")
        self.assertEqual(fields["description"], "kept")

    def test_one_line_values_are_unchanged(self) -> None:
        fields = _parse(
            "---\nname: demo\ndescription: 'quoted one line'\nversion: 1.0\n---\n"
        )
        self.assertEqual(fields["description"], "quoted one line")
        self.assertEqual(fields["version"], "1.0")

    def test_block_scalar_is_unchanged(self) -> None:
        fields = _parse("---\ndescription: >-\n  folded\n  text\nname: demo\n---\n")
        self.assertEqual(fields["description"], "folded text")
        self.assertEqual(fields["name"], "demo")


if __name__ == "__main__":
    unittest.main()
