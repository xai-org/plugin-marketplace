"""The bump bot must not adopt a fork pull request with the same branch name."""

from __future__ import annotations

import importlib.util
import os
import subprocess
import sys
import unittest
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))


def _load_bump():
    path = ROOT / "scripts" / "bump-plugin-shas.py"
    spec = importlib.util.spec_from_file_location("bump_plugin_shas", path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"could not load {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class OpenPrForBranchTests(unittest.TestCase):
    def test_open_pr_queries_this_repository_head(self) -> None:
        bump = _load_bump()
        branch = "bump/daily-2026-10-26"
        with mock.patch.dict(
            os.environ, {"GITHUB_REPOSITORY": "xai-org/plugin-marketplace"}
        ):
            with mock.patch.object(bump, "run") as run:
                run.return_value = subprocess.CompletedProcess(
                    args=[],
                    returncode=0,
                    stdout="https://github.com/xai-org/plugin-marketplace/pull/1\n",
                )
                url = bump.open_pr_for_branch(branch)
        cmd = run.call_args.args[0]
        joined = " ".join(cmd)
        self.assertEqual(
            url, "https://github.com/xai-org/plugin-marketplace/pull/1"
        )
        self.assertIn("head=xai-org:bump/daily-2026-10-26", joined)
        self.assertNotIn("--head", cmd)

    def test_open_pr_parses_origin_when_actions_env_is_absent(self) -> None:
        bump = _load_bump()
        branch = "bump/2026-10-26/pstack"

        def fake_run(cmd, **kwargs):
            if cmd[:3] == ["git", "remote", "get-url"]:
                return subprocess.CompletedProcess(
                    args=cmd,
                    returncode=0,
                    stdout="https://github.com/xai-org/plugin-marketplace.git\n",
                )
            return subprocess.CompletedProcess(
                args=cmd, returncode=0, stdout="\n"
            )

        env = os.environ.copy()
        env.pop("GITHUB_REPOSITORY", None)
        with mock.patch.dict(os.environ, env, clear=True):
            with mock.patch.object(bump, "run", side_effect=fake_run) as run:
                self.assertIsNone(bump.open_pr_for_branch(branch))
        gh_cmd = run.call_args_list[-1].args[0]
        self.assertIn("head=xai-org:bump/2026-10-26/pstack", " ".join(gh_cmd))


if __name__ == "__main__":
    unittest.main()
