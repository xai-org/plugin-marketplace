#!/usr/bin/env python3
"""Regression tests for the catalog tooling.

Stdlib `unittest` only: no dependencies, no network, no git subprocesses.

These cover the two places where a bug has real consequences for users:

  - `validate-catalog.py` is the supply-chain gate. Its own docstring
    explains the stakes: without a pin, a vendor force-push or repo
    compromise immediately ships new code to everyone who installs or
    updates that plugin. Every test in `TestShaPinning` and
    `TestSourcePathContainment` corresponds to a way that gate could be
    silently weakened.

  - `plugin_catalog.py` runs against *arbitrary third-party repos* fetched
    at index-generation time. Its path-containment helpers and size caps
    are the only thing standing between a malicious plugin repo and the
    machine generating the index.

Run:    python3 -m unittest discover -s scripts -p "test_*.py"
"""

from __future__ import annotations

import importlib.util
import json
import sys
import tempfile
import unittest
import unittest.mock
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parent

if str(SCRIPTS) not in sys.path:
    sys.path.insert(0, str(SCRIPTS))

import plugin_catalog  # noqa: E402


def _load_hyphenated(module_name: str, filename: str):
    """Import a `foo-bar.py` script, which a plain `import` cannot reach.

    Both scripts guard their entry point with `if __name__ == "__main__"`,
    so loading them here does not execute `main()`.
    """
    spec = importlib.util.spec_from_file_location(module_name, SCRIPTS / filename)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


validate_catalog = _load_hyphenated("validate_catalog", "validate-catalog.py")
bump_plugin_shas = _load_hyphenated("bump_plugin_shas", "bump-plugin-shas.py")

VALID_SHA = "a" * 40


def url_entry(name="demo", **source_fields) -> dict:
    """A minimal remote-source catalog entry, before per-test overrides."""
    source = {"source": "url", "url": "https://github.com/acme/demo.git"}
    source.update(source_fields)
    return {"name": name, "source": source}


class TestShaPinning(unittest.TestCase):
    """A remote source without a full, exact commit pin must be rejected.

    Anything that lets a moving ref (branch, tag, abbreviation) through
    re-opens the force-push attack the validator exists to prevent.
    """

    def assertAccepted(self, entry):
        self.assertEqual(validate_catalog.validate_entry(entry, 0), [])

    def assertRejected(self, entry):
        self.assertNotEqual(validate_catalog.validate_entry(entry, 0), [])

    def test_full_lowercase_sha_is_accepted(self):
        self.assertAccepted(url_entry(sha=VALID_SHA))

    def test_missing_sha_is_rejected(self):
        # The single most important case: this is the exact condition that
        # would let an unpinned source ship to users.
        self.assertRejected(url_entry())

    def test_empty_sha_is_rejected(self):
        self.assertRejected(url_entry(sha=""))

    def test_tag_is_rejected(self):
        self.assertRejected(url_entry(sha="v1.2.3"))

    def test_branch_name_is_rejected(self):
        self.assertRejected(url_entry(sha="main"))

    def test_abbreviated_sha_is_rejected(self):
        for length in (7, 12):
            with self.subTest(length=length):
                self.assertRejected(url_entry(sha="a" * length))

    def test_uppercase_sha_is_rejected(self):
        # Guards against someone "helpfully" adding re.IGNORECASE. Git
        # reports lowercase; an uppercase pin signals hand-editing.
        self.assertRejected(url_entry(sha="A" * 40))

    def test_sha_length_is_anchored(self):
        # Guards the ^...$ anchors in SHA_RE.
        for length in (39, 41):
            with self.subTest(length=length):
                self.assertRejected(url_entry(sha="a" * length))

    def test_sha_with_appended_payload_is_rejected(self):
        # Guards a future MULTILINE regression, which would accept a valid
        # sha with arbitrary extra lines around it.
        self.assertRejected(url_entry(sha=VALID_SHA + "\nevil"))
        self.assertRejected(url_entry(sha="evil\n" + VALID_SHA))

    @unittest.expectedFailure
    def test_sha_with_trailing_newline_is_rejected(self):
        # KNOWN GAP, asserted as expectedFailure so it is recorded rather
        # than silently tolerated. Python's `$` also matches just before a
        # trailing newline, so SHA_RE accepts "<40 hex>\n". Such a pin
        # passes validation here but cannot match `git rev-parse HEAD` at
        # install time, so it fails late instead of in CI.
        #
        # The same gap exists in plugin_catalog.SHA_RE, which the daily
        # bump bot uses. Fixing it means `\Z` instead of `$` (or .fullmatch)
        # in both places, deliberately left out of this tests-only PR.
        self.assertRejected(url_entry(sha=VALID_SHA + "\n"))

    def test_non_string_sha_is_rejected_without_raising(self):
        # Must return an error, not blow up on a hostile/typo'd catalog.
        for value in (123, 4.2, True, ["a" * 40], {"sha": "a" * 40}):
            with self.subTest(value=value):
                self.assertRejected(url_entry(sha=value))


class TestSourcePathContainment(unittest.TestCase):
    """A monorepo `path` must stay inside the fetched repo.

    `path` is copied from the catalog into a filesystem join at fetch
    time, so an escaping value reaches outside the checkout directory.
    """

    def assertAccepted(self, entry):
        self.assertEqual(validate_catalog.validate_entry(entry, 0), [])

    def assertRejected(self, entry):
        self.assertNotEqual(validate_catalog.validate_entry(entry, 0), [])

    def test_valid_nested_path_is_accepted(self):
        # Real shape used by catalog entries; guards against over-tightening.
        self.assertAccepted(url_entry(sha=VALID_SHA, path="providers/grok/plugin"))

    def test_parent_traversal_is_rejected(self):
        self.assertRejected(url_entry(sha=VALID_SHA, path="../escape"))
        self.assertRejected(url_entry(sha=VALID_SHA, path="a/../../escape"))

    def test_absolute_path_is_rejected(self):
        self.assertRejected(url_entry(sha=VALID_SHA, path="/etc/passwd"))

    def test_backslash_path_is_rejected(self):
        # Windows-style traversal, which POSIX split() would not catch.
        self.assertRejected(url_entry(sha=VALID_SHA, path="a\\..\\..\\etc"))

    def test_empty_or_whitespace_path_is_rejected(self):
        for value in ("", "   ", "\t"):
            with self.subTest(value=value):
                self.assertRejected(url_entry(sha=VALID_SHA, path=value))

    def test_empty_segment_is_rejected(self):
        self.assertRejected(url_entry(sha=VALID_SHA, path="a//b"))

    def test_non_string_path_is_rejected(self):
        self.assertRejected(url_entry(sha=VALID_SHA, path=42))


class TestLocalSources(unittest.TestCase):
    """Vendored plugins live in this repo, so they need no commit pin."""

    def test_local_dict_source_is_accepted(self):
        entry = {
            "name": "neon",
            "source": {"type": "local", "path": "./external_plugins/neon"},
        }
        self.assertEqual(validate_catalog.validate_entry(entry, 0), [])

    def test_local_string_source_is_accepted(self):
        entry = {"name": "demo", "source": "./plugins/demo"}
        self.assertEqual(validate_catalog.validate_entry(entry, 0), [])


# NOTE: source shapes other than {"source": "url"} and the local forms above
# are deliberately NOT asserted here. Shapes such as
# {"source": "github", "repo": ...}, bare-string URLs, null, numbers and
# arrays currently return no errors, and open PR #173 ("Fail closed on SHA
# pinning for all non-local source shapes") changes them to be rejected.
# Pinning today's behavior would turn this suite into a blocker for that
# fix. Add cases for them once #173 lands.


class TestLiveCatalog(unittest.TestCase):
    """The catalog committed in this repo must satisfy its own validator."""

    def test_committed_catalog_validates(self):
        catalog = SCRIPTS.parent / ".grok-plugin" / "marketplace.json"
        self.assertTrue(catalog.is_file(), f"missing catalog: {catalog}")
        self.assertEqual(validate_catalog.validate_file(catalog), [])


class TestPathHelpers(unittest.TestCase):
    """`resolve_inside`/`contained` guard every read of a fetched repo.

    The generator calls these with catalog-controlled input against
    untrusted third-party checkouts.
    """

    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory()
        self.root = Path(self._tmp.name).resolve() / "root"
        self.outside = Path(self._tmp.name).resolve() / "outside"
        (self.root / "sub").mkdir(parents=True)
        self.outside.mkdir()
        self.addCleanup(self._tmp.cleanup)

    def test_nested_path_resolves_inside(self):
        resolved = plugin_catalog.resolve_inside(self.root, "sub/dir")
        self.assertIsNotNone(resolved)
        self.assertTrue(resolved.is_relative_to(self.root))

    def test_parent_traversal_returns_none(self):
        self.assertIsNone(plugin_catalog.resolve_inside(self.root, "../outside"))

    def test_absolute_component_returns_none(self):
        # Path("/root") / "/etc/passwd" == Path("/etc/passwd"): an absolute
        # component *replaces* the root rather than extending it, so this
        # would silently escape without the containment check.
        self.assertIsNone(plugin_catalog.resolve_inside(self.root, "/etc/passwd"))
        self.assertIsNone(
            plugin_catalog.resolve_inside(self.root, Path(self.outside))
        )

    def test_symlink_escape_returns_none(self):
        # A fetched third-party repo can legitimately contain symlinks;
        # containment is checked after .resolve(), so this must not escape.
        link = self.root / "link"
        try:
            link.symlink_to(self.outside, target_is_directory=True)
        except (OSError, NotImplementedError) as exc:  # pragma: no cover
            self.skipTest(f"symlinks unavailable: {exc}")
        self.assertIsNone(plugin_catalog.resolve_inside(self.root, "link/file"))

    def test_contained(self):
        self.assertTrue(plugin_catalog.contained(self.root / "sub", self.root))
        self.assertFalse(plugin_catalog.contained(self.outside, self.root))

    def test_plugin_root_for_fetch_without_subdir_returns_dest(self):
        self.assertEqual(
            plugin_catalog.plugin_root_for_fetch(self.root, None, "demo"), self.root
        )

    def test_plugin_root_for_fetch_rejects_escape(self):
        with self.assertRaises(RuntimeError) as ctx:
            plugin_catalog.plugin_root_for_fetch(self.root, "../outside", "demo")
        self.assertIn("escapes", str(ctx.exception))

    def test_plugin_root_for_fetch_rejects_missing_subdir(self):
        with self.assertRaises(RuntimeError) as ctx:
            plugin_catalog.plugin_root_for_fetch(self.root, "nope", "demo")
        self.assertIn("not found", str(ctx.exception))


class TestClean(unittest.TestCase):
    """`clean` is the last stop before untrusted text enters plugin-index.json."""

    def test_strips_control_characters(self):
        self.assertEqual(plugin_catalog.clean("a\x00b\x07c"), "abc")

    def test_collapses_whitespace(self):
        self.assertEqual(plugin_catalog.clean("  a \n\t b  "), "a b")

    def test_truncates_to_max_length(self):
        limit = plugin_catalog.MAX_STRING_LEN
        result = plugin_catalog.clean("x" * (limit + 50))
        self.assertLessEqual(len(result), limit)
        self.assertTrue(result.endswith("…"))

    def test_exact_max_length_is_not_truncated(self):
        limit = plugin_catalog.MAX_STRING_LEN
        text = "x" * limit
        self.assertEqual(plugin_catalog.clean(text), text)


class TestFrontmatter(unittest.TestCase):
    """Skill metadata comes from a hand-rolled frontmatter parser."""

    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory()
        self.dir = Path(self._tmp.name)
        self.addCleanup(self._tmp.cleanup)

    def write(self, text: str) -> Path:
        path = self.dir / "SKILL.md"
        path.write_text(text, encoding="utf-8")
        return path

    def test_parses_simple_fields(self):
        fields = plugin_catalog.parse_frontmatter(
            self.write("---\nname: demo\ndescription: Does a thing\n---\nBody\n")
        )
        self.assertEqual(fields["name"], "demo")
        self.assertEqual(fields["description"], "Does a thing")

    def test_missing_frontmatter_returns_empty(self):
        self.assertEqual(plugin_catalog.parse_frontmatter(self.write("# Title\n")), {})

    def test_missing_file_returns_empty(self):
        self.assertEqual(
            plugin_catalog.parse_frontmatter(self.dir / "absent.md"), {}
        )

    def test_strips_matching_quotes_only(self):
        fields = plugin_catalog.parse_frontmatter(
            self.write("---\na: \"quoted\"\nb: 'single'\nc: \"mismatched'\n---\n")
        )
        self.assertEqual(fields["a"], "quoted")
        self.assertEqual(fields["b"], "single")
        self.assertEqual(fields["c"], "\"mismatched'")

    def test_block_scalar_is_folded(self):
        fields = plugin_catalog.parse_frontmatter(
            self.write("---\ndescription: >-\n  first line\n  second line\nname: demo\n---\n")
        )
        self.assertEqual(fields["description"], "first line second line")
        self.assertEqual(fields["name"], "demo")

    def test_terminates_on_ellipsis(self):
        fields = plugin_catalog.parse_frontmatter(
            self.write("---\nname: demo\n...\nname: overwritten\n")
        )
        self.assertEqual(fields["name"], "demo")


class TestLoadJsonFile(unittest.TestCase):
    """Manifests come from untrusted repos: malformed or huge must not crash."""

    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory()
        self.dir = Path(self._tmp.name)
        self.addCleanup(self._tmp.cleanup)

    def test_valid_json(self):
        path = self.dir / "plugin.json"
        path.write_text('{"name": "demo"}', encoding="utf-8")
        self.assertEqual(plugin_catalog.load_json_file(path), {"name": "demo"})

    def test_malformed_json_returns_none(self):
        path = self.dir / "bad.json"
        path.write_text("{not json", encoding="utf-8")
        self.assertIsNone(plugin_catalog.load_json_file(path))

    def test_missing_file_returns_none(self):
        self.assertIsNone(plugin_catalog.load_json_file(self.dir / "absent.json"))

    def test_oversized_file_returns_none(self):
        # Size cap is a DoS guard against a hostile fetched repo.
        path = self.dir / "huge.json"
        payload = "x" * (plugin_catalog.MAX_JSON_BYTES + 1)
        path.write_text(json.dumps({"k": payload}), encoding="utf-8")
        self.assertIsNone(plugin_catalog.load_json_file(path))


class TestManifestVersion(unittest.TestCase):
    """The daily bump bot gates on this: a wrong answer skips a version check."""

    def test_accepts_string(self):
        self.assertEqual(plugin_catalog.manifest_version({"version": "1.2.3"}), "1.2.3")

    def test_strips_and_rejects_blank(self):
        self.assertEqual(plugin_catalog.manifest_version({"version": "  1.0 "}), "1.0")
        self.assertIsNone(plugin_catalog.manifest_version({"version": "   "}))

    def test_accepts_numbers(self):
        self.assertEqual(plugin_catalog.manifest_version({"version": 2}), "2")
        self.assertEqual(plugin_catalog.manifest_version({"version": 1.5}), "1.5")

    def test_rejects_bool(self):
        # isinstance(True, int) is True in Python, so without the bool
        # guard, `"version": true` would become the string "True".
        self.assertIsNone(plugin_catalog.manifest_version({"version": True}))

    def test_missing_or_null(self):
        self.assertIsNone(plugin_catalog.manifest_version({}))
        self.assertIsNone(plugin_catalog.manifest_version({"version": None}))


class TestReplaceShaInCatalog(unittest.TestCase):
    """The daily bot rewrites pins by regex over raw JSON, unattended.

    It matches on text rather than parsing so it can preserve formatting.
    Targeting the wrong entry would silently repoint one plugin at another
    plugin's commit. `REPO_ROOT` is a module constant with no injection
    point, so these patch it at the module level.
    """

    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory()
        self.root = Path(self._tmp.name)
        (self.root / bump_plugin_shas.CATALOG_PATH).parent.mkdir(parents=True)
        self._patch = unittest.mock.patch.object(bump_plugin_shas, "REPO_ROOT", self.root)
        self._patch.start()
        self.addCleanup(self._patch.stop)
        self.addCleanup(self._tmp.cleanup)

    def write_catalog(self, plugins: list[dict]) -> Path:
        path = self.root / bump_plugin_shas.CATALOG_PATH
        path.write_text(json.dumps({"plugins": plugins}, indent=2), encoding="utf-8")
        return path

    def read_catalog(self) -> dict:
        return json.loads(
            (self.root / bump_plugin_shas.CATALOG_PATH).read_text(encoding="utf-8")
        )

    def test_only_the_named_plugin_changes_when_shas_collide(self):
        old, new = "a" * 40, "b" * 40
        self.write_catalog(
            [
                {"name": "alpha", "source": {"source": "url", "sha": old}},
                {"name": "beta", "source": {"source": "url", "sha": old}},
            ]
        )
        bump_plugin_shas.replace_sha_in_catalog("alpha", old, new)
        plugins = {p["name"]: p["source"]["sha"] for p in self.read_catalog()["plugins"]}
        self.assertEqual(plugins["alpha"], new)
        self.assertEqual(plugins["beta"], old)

    def test_name_that_is_a_prefix_of_another_matches_correctly(self):
        old_a, old_b, new = "a" * 40, "b" * 40, "c" * 40
        self.write_catalog(
            [
                {"name": "exa-labs", "source": {"source": "url", "sha": old_b}},
                {"name": "exa", "source": {"source": "url", "sha": old_a}},
            ]
        )
        bump_plugin_shas.replace_sha_in_catalog("exa", old_a, new)
        plugins = {p["name"]: p["source"]["sha"] for p in self.read_catalog()["plugins"]}
        self.assertEqual(plugins["exa"], new)
        self.assertEqual(plugins["exa-labs"], old_b)

    def test_unknown_old_sha_raises(self):
        self.write_catalog(
            [{"name": "alpha", "source": {"source": "url", "sha": "a" * 40}}]
        )
        with self.assertRaises(RuntimeError):
            bump_plugin_shas.replace_sha_in_catalog("alpha", "d" * 40, "e" * 40)

    def test_output_remains_valid_json(self):
        old, new = "a" * 40, "b" * 40
        self.write_catalog(
            [{"name": "alpha", "source": {"source": "url", "sha": old}}]
        )
        bump_plugin_shas.replace_sha_in_catalog("alpha", old, new)
        self.assertEqual(self.read_catalog()["plugins"][0]["source"]["sha"], new)


if __name__ == "__main__":
    unittest.main()
