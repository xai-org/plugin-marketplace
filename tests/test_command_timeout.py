"""Catalog git and gh commands must fail instead of waiting forever."""

from __future__ import annotations

import importlib.util
import subprocess
import sys
import unittest
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

import plugin_catalog  # noqa: E402

SHA = "a" * 40


def _load_bump():
    path = ROOT / "scripts" / "bump-plugin-shas.py"
    spec = importlib.util.spec_from_file_location("bump_plugin_shas", path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"could not load {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class CommandTimeoutTests(unittest.TestCase):
    def test_run_git_bounds_the_fetch_and_disables_prompts(self) -> None:
        with mock.patch("plugin_catalog.subprocess.run") as run:
            run.return_value = subprocess.CompletedProcess(args=[], returncode=0)
            plugin_catalog.run_git(
                ["git", "fetch", "--end-of-options", "https://example.com/r.git", SHA],
                "https://example.com/r.git",
                SHA,
            )
        kwargs = run.call_args.kwargs
        self.assertEqual(kwargs.get("timeout"), 120)
        self.assertEqual((kwargs.get("env") or {}).get("GIT_TERMINAL_PROMPT"), "0")

    def test_run_git_timeout_is_a_runtime_error(self) -> None:
        with mock.patch("plugin_catalog.subprocess.run") as run:
            run.side_effect = subprocess.TimeoutExpired(cmd=["git"], timeout=120)
            with self.assertRaises(RuntimeError):
                plugin_catalog.run_git(
                    ["git", "fetch"],
                    "https://example.com/r.git",
                    SHA,
                )

    def test_bump_run_bounds_git_and_disables_prompts(self) -> None:
        bump = _load_bump()
        with mock.patch.object(bump.subprocess, "run") as run:
            run.return_value = subprocess.CompletedProcess(
                args=[], returncode=0, stdout="", stderr=""
            )
            bump.run(["git", "status"])
        kwargs = run.call_args.kwargs
        self.assertEqual(kwargs.get("timeout"), 120)
        self.assertEqual((kwargs.get("env") or {}).get("GIT_TERMINAL_PROMPT"), "0")

    def test_index_regeneration_outlives_one_fetch(self) -> None:
        bump = _load_bump()
        with mock.patch.object(bump.subprocess, "run") as run:
            run.return_value = subprocess.CompletedProcess(
                args=[], returncode=0, stdout="", stderr=""
            )
            bump.regenerate_index()
        timeout = run.call_args.kwargs.get("timeout") or 0
        self.assertGreater(timeout, 120)

    def test_validate_job_has_a_timeout(self) -> None:
        text = (
            ROOT / ".github" / "workflows" / "validate-catalog.yml"
        ).read_text(encoding="utf-8")
        self.assertIn("timeout-minutes:", text)


if __name__ == "__main__":
    unittest.main()
