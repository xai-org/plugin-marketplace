#!/usr/bin/env python3
"""Discover stale url-source pins and open one bump PR per plugin.

For each entry in `.grok-plugin/marketplace.json` with
`source: {source: "url", url, sha}`:

  1. Resolve upstream HEAD via `git ls-remote`
  2. If HEAD != pinned sha, treat as a candidate bump
  3. Skip if a PR already exists for `bump/<name>`
  4. Update the pin, regenerate the plugin index, commit, push, open PR

Designed to run under GitHub Actions with GITHUB_TOKEN
(contents:write + pull-requests:write). Also runnable locally with
`--dry-run` (no push/PR) or a real `GH_TOKEN`.

Usage:
  python3 scripts/bump-plugin-shas.py [--dry-run] [--max-bumps N] [--only NAME]
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import urlparse

REPO_ROOT = Path(__file__).resolve().parent.parent
CATALOG_PATH = Path(".grok-plugin/marketplace.json")
INDEX_PATH = Path(".grok-plugin/plugin-index.json")
INDEX_SCRIPT = Path("scripts/generate-plugin-index.py")
SHA_RE = re.compile(r"^[0-9a-f]{40}$")
BRANCH_PREFIX = "bump/"
ALLOWED_HOSTS = {"github.com", "gitlab.com", "bitbucket.org"}


def run(
    cmd: list[str],
    *,
    cwd: Path | None = None,
    check: bool = True,
    capture: bool = True,
    env: dict[str, str] | None = None,
) -> subprocess.CompletedProcess[str]:
    merged = os.environ.copy()
    if env:
        merged.update(env)
    result = subprocess.run(
        cmd,
        cwd=cwd or REPO_ROOT,
        check=False,
        capture_output=capture,
        text=True,
        env=merged,
    )
    if check and result.returncode != 0:
        stderr = (result.stderr or "").strip()
        stdout = (result.stdout or "").strip()
        detail = stderr or stdout or f"exit {result.returncode}"
        raise RuntimeError(f"`{' '.join(cmd)}` failed: {detail}")
    return result


def load_catalog() -> dict:
    return json.loads((REPO_ROOT / CATALOG_PATH).read_text(encoding="utf-8"))


def url_entries(catalog: dict) -> list[dict]:
    out = []
    for entry in catalog.get("plugins", []):
        if not isinstance(entry, dict):
            continue
        source = entry.get("source")
        if not isinstance(source, dict):
            continue
        if source.get("source") != "url" and source.get("type") != "url":
            continue
        out.append(entry)
    return out


def host_allowed(url: str) -> bool:
    try:
        host = urlparse(url).hostname or ""
    except ValueError:
        return False
    host = host.lower()
    if host.startswith("www."):
        host = host[4:]
    return host in ALLOWED_HOSTS


def ls_remote_head(url: str) -> str:
    result = run(["git", "ls-remote", url, "HEAD"], check=True)
    lines = [ln for ln in (result.stdout or "").splitlines() if ln.strip()]
    if not lines:
        raise RuntimeError(f"empty ls-remote for {url}")
    sha = lines[0].split()[0].strip().lower()
    if not SHA_RE.match(sha):
        raise RuntimeError(f"unexpected ls-remote output for {url}: {lines[0]!r}")
    return sha


def open_pr_for_branch(branch: str) -> str | None:
    result = run(
        [
            "gh",
            "pr",
            "list",
            "--head",
            branch,
            "--state",
            "open",
            "--json",
            "url",
            "--jq",
            ".[0].url // empty",
        ],
        check=False,
    )
    if result.returncode != 0:
        return None
    url = (result.stdout or "").strip()
    return url or None


def replace_sha_in_catalog(name: str, old_sha: str, new_sha: str) -> None:
    path = REPO_ROOT / CATALOG_PATH
    text = path.read_text(encoding="utf-8")
    name_json = json.dumps(name)
    pattern = re.compile(
        rf'("name"\s*:\s*{re.escape(name_json)}[\s\S]*?"sha"\s*:\s*")'
        rf"{re.escape(old_sha)}"
        rf'(")',
        re.MULTILINE,
    )
    new_text, n = pattern.subn(rf"\g<1>{new_sha}\2", text, count=1)
    if n != 1:
        needle = f'"sha": "{old_sha}"'
        if text.count(needle) != 1:
            raise RuntimeError(
                f"could not uniquely locate sha for plugin {name!r} "
                f"(old={old_sha})"
            )
        new_text = text.replace(needle, f'"sha": "{new_sha}"', 1)
    path.write_text(new_text, encoding="utf-8")


def regenerate_index() -> None:
    run([sys.executable, str(REPO_ROOT / INDEX_SCRIPT)], check=True, capture=False)


def git_identity() -> None:
    run(["git", "config", "user.name", "github-actions[bot]"], check=True)
    run(
        [
            "git",
            "config",
            "user.email",
            "41898282+github-actions[bot]@users.noreply.github.com",
        ],
        check=True,
    )


def ensure_clean_worktree() -> None:
    result = run(["git", "status", "--porcelain"], check=True)
    dirty = [
        line
        for line in (result.stdout or "").splitlines()
        if line.strip() and not line.rstrip().endswith(".DS_Store")
    ]
    if dirty:
        raise RuntimeError(
            "working tree is dirty; commit or stash before bumping:\n"
            + "\n".join(dirty)
        )


def origin_base(base_branch: str) -> str:
    run(["git", "fetch", "origin", base_branch, "--depth", "1"], check=False)
    run(["git", "fetch", "origin", base_branch], check=True)
    result = run(["git", "rev-parse", f"origin/{base_branch}"], check=True)
    return (result.stdout or "").strip()


def open_bump_pr(
    *,
    name: str,
    old_sha: str,
    new_sha: str,
    url: str,
    branch: str,
    base_branch: str,
    run_url: str,
    dry_run: bool,
) -> str | None:
    short_old = old_sha[:7]
    short_new = new_sha[:7]
    title = f"chore(plugins): bump {name} {short_old} -> {short_new}"
    body_lines = [
        f"Automated pin bump for `{name}`.",
        "",
        f"- **source:** {url}",
        f"- **old:** `{old_sha}`",
        f"- **new:** `{new_sha}`",
        "",
        "Catalog SHA updated and `.grok-plugin/plugin-index.json` regenerated "
        "at the new pin.",
        "",
        "Human review still required (no auto-merge). Confirm the upstream "
        "diff is intentional before merging.",
    ]
    if run_url:
        body_lines.extend(["", f"Triggered by: {run_url}"])
    body = "\n".join(body_lines) + "\n"

    if dry_run:
        print(f"[dry-run] would open PR on {branch}: {title}")
        return None

    head = origin_base(base_branch)
    git_identity()

    # Fresh branch from origin/base every time so each PR is single-plugin.
    run(["git", "checkout", "--detach", head], check=True)
    run(["git", "checkout", "-B", branch], check=True)
    run(
        [
            "git",
            "checkout",
            head,
            "--",
            str(CATALOG_PATH),
            str(INDEX_PATH),
        ],
        check=True,
    )

    replace_sha_in_catalog(name, old_sha, new_sha)
    regenerate_index()

    run(
        ["git", "add", "--", str(CATALOG_PATH), str(INDEX_PATH)],
        check=True,
    )
    status = run(["git", "status", "--porcelain"], check=True)
    if not (status.stdout or "").strip():
        raise RuntimeError(f"no file changes after bumping {name}")

    run(["git", "commit", "-m", title], check=True)
    # Bot-owned branch; force is intentional so retries rewrite the same tip.
    run(["git", "push", "--force", "origin", f"HEAD:refs/heads/{branch}"], check=True)

    existing = open_pr_for_branch(branch)
    if existing:
        print(f"PR already open for {branch}: {existing}")
        return existing

    result = run(
        [
            "gh",
            "pr",
            "create",
            "--base",
            base_branch,
            "--head",
            branch,
            "--title",
            title,
            "--body",
            body,
        ],
        check=True,
    )
    pr_url = (result.stdout or "").strip()
    print(f"Opened {pr_url}")
    return pr_url


def discover_candidates(
    *,
    only: str,
    freeze: set[str],
    skip_open_pr_check: bool,
) -> tuple[list[dict], list[dict]]:
    catalog = load_catalog()
    candidates: list[dict] = []
    skipped: list[dict] = []

    for entry in url_entries(catalog):
        name = entry.get("name")
        if not isinstance(name, str) or not name:
            skipped.append({"name": "<unnamed>", "reason": "missing name"})
            continue
        if only and name != only:
            continue
        if name in freeze:
            skipped.append({"name": name, "reason": "frozen"})
            continue

        source = entry["source"]
        url = source.get("url")
        old_sha = source.get("sha")
        if not isinstance(url, str) or not url.startswith("https://"):
            skipped.append({"name": name, "reason": f"bad url {url!r}"})
            continue
        if not host_allowed(url):
            skipped.append({"name": name, "reason": f"host not allowed: {url}"})
            continue
        if not isinstance(old_sha, str) or not SHA_RE.match(old_sha):
            skipped.append({"name": name, "reason": f"bad pin {old_sha!r}"})
            continue

        try:
            new_sha = ls_remote_head(url)
        except Exception as e:  # noqa: BLE001
            skipped.append({"name": name, "reason": f"ls-remote failed: {e}"})
            continue

        if new_sha == old_sha.lower():
            skipped.append({"name": name, "reason": "up to date"})
            continue

        branch = f"{BRANCH_PREFIX}{name}"
        if not skip_open_pr_check:
            existing = open_pr_for_branch(branch)
            if existing:
                skipped.append(
                    {"name": name, "reason": f"open PR already: {existing}"}
                )
                continue

        candidates.append(
            {
                "name": name,
                "url": url,
                "old_sha": old_sha.lower(),
                "new_sha": new_sha,
                "branch": branch,
            }
        )

    return candidates, skipped


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--max-bumps", type=int, default=10)
    parser.add_argument("--only", default="", help="Exact plugin name to bump")
    parser.add_argument(
        "--base-branch",
        default=os.environ.get("BASE_BRANCH", "main"),
    )
    parser.add_argument(
        "--freeze",
        default=os.environ.get("FREEZE_SHAS", ""),
        help="Space-separated plugin names to never auto-bump",
    )
    parser.add_argument(
        "--github-output",
        default=os.environ.get("GITHUB_OUTPUT", ""),
        help="Write pr-urls JSON for the Actions workflow",
    )
    args = parser.parse_args()

    freeze = {n for n in args.freeze.split() if n}
    only = args.only.strip()
    run_url = os.environ.get("RUN_URL", "")

    if not args.dry_run:
        ensure_clean_worktree()

    start_ref_proc = run(["git", "rev-parse", "--abbrev-ref", "HEAD"], check=True)
    start_ref = (start_ref_proc.stdout or "").strip()
    if start_ref == "HEAD":
        start_ref = run(["git", "rev-parse", "HEAD"], check=True).stdout.strip()

    candidates, skipped = discover_candidates(
        only=only,
        freeze=freeze,
        skip_open_pr_check=args.dry_run,
    )
    if args.max_bumps >= 0:
        candidates = candidates[: args.max_bumps]

    print(f"candidates={len(candidates)} skipped={len(skipped)}")
    for s in skipped:
        print(f"  skip {s['name']}: {s['reason']}")

    pr_urls: list[dict] = []
    errors: list[str] = []

    for c in candidates:
        print(
            f"bump {c['name']}: {c['old_sha'][:7]} -> {c['new_sha'][:7]} "
            f"({c['url']})"
        )
        try:
            pr_url = open_bump_pr(
                name=c["name"],
                old_sha=c["old_sha"],
                new_sha=c["new_sha"],
                url=c["url"],
                branch=c["branch"],
                base_branch=args.base_branch,
                run_url=run_url,
                dry_run=args.dry_run,
            )
            pr_urls.append(
                {
                    "name": c["name"],
                    "old_sha": c["old_sha"],
                    "new_sha": c["new_sha"],
                    "branch": c["branch"],
                    "pr_url": pr_url or "",
                }
            )
        except Exception as e:  # noqa: BLE001
            msg = f"{c['name']}: {e}"
            errors.append(msg)
            print(f"ERROR: {msg}", file=sys.stderr)

    if not args.dry_run:
        run(["git", "checkout", "-f", start_ref], check=False)

    payload = json.dumps(pr_urls, separators=(",", ":"))
    print(f"pr-urls={payload}")
    if args.github_output:
        with open(args.github_output, "a", encoding="utf-8") as fh:
            fh.write(f"pr-urls={payload}\n")
            fh.write(f"bumped_count={len(pr_urls)}\n")

    if errors:
        print(f"{len(errors)} bump(s) failed", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        sys.exit(130)
