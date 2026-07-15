#!/usr/bin/env python3
"""Discover stale url-source pins and open a stacked set of bump PRs.

Stack shape (one run / Pacific day):

  main
    └── bump/daily-YYYY-MM-DD            PR → main
          ├── bump/YYYY-MM-DD/<plugin-a> PR → daily
          ├── bump/YYYY-MM-DD/<plugin-b> PR → daily
          └── ...

Every plugin branch is cut from the daily tip and targets daily (fan-out).
Only the daily PR targets main, so main history stays one landing per day.

For each url-source entry:

  1. Resolve upstream HEAD via `git ls-remote`
  2. If HEAD != pinned sha, treat as a candidate
  3. Branch from daily, update pin + regenerate plugin index, open PR → daily

Designed for GitHub Actions with GITHUB_TOKEN (contents + pull-requests write).
Local: `--dry-run` (no push/PR).

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
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

try:
    from zoneinfo import ZoneInfo
except ImportError:  # pragma: no cover
    ZoneInfo = None  # type: ignore[misc, assignment]

REPO_ROOT = Path(__file__).resolve().parent.parent
CATALOG_PATH = Path(".grok-plugin/marketplace.json")
INDEX_PATH = Path(".grok-plugin/plugin-index.json")
INDEX_SCRIPT = Path("scripts/generate-plugin-index.py")
SHA_RE = re.compile(r"^[0-9a-f]{40}$")
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


def pacific_date() -> str:
    if ZoneInfo is not None:
        return datetime.now(ZoneInfo("America/Los_Angeles")).strftime("%Y-%m-%d")
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


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
    run(["git", "fetch", "origin", base_branch], check=True)
    result = run(["git", "rev-parse", f"origin/{base_branch}"], check=True)
    return (result.stdout or "").strip()


def ensure_pr(
    *,
    head: str,
    base: str,
    title: str,
    body: str,
    dry_run: bool,
) -> str | None:
    if dry_run:
        print(f"[dry-run] would open PR {head} -> {base}: {title}")
        return None

    existing = open_pr_for_branch(head)
    if existing:
        print(f"PR already open for {head}: {existing}")
        return existing

    result = run(
        [
            "gh",
            "pr",
            "create",
            "--base",
            base,
            "--head",
            head,
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


def push_branch(branch: str) -> None:
    run(["git", "push", "--force", "origin", f"HEAD:refs/heads/{branch}"], check=True)


def open_daily_base(
    *,
    daily_branch: str,
    main_branch: str,
    day: str,
    run_url: str,
    dry_run: bool,
) -> tuple[str | None, str]:
    """Create daily branch from main (marker commit) and PR it into main.

    Returns (pr_url, daily_tip_sha). dry-run returns (None, fake sha).
    """
    title = f"chore(plugins): daily pin bumps {day}"
    body_lines = [
        f"Daily base for plugin pin bumps on **{day}** (Pacific).",
        "",
        "Per-plugin PRs all target this branch (fan-out from daily). Review",
        "and merge the ones you want into this branch, then land this PR into",
        "`main` so history stays one landing per day.",
        "",
        "No auto-merge.",
    ]
    if run_url:
        body_lines.extend(["", f"Triggered by: {run_url}"])
    body = "\n".join(body_lines) + "\n"

    if dry_run:
        print(f"[dry-run] would open daily base {daily_branch} -> {main_branch}")
        return None, "0" * 40

    head = origin_base(main_branch)
    git_identity()
    run(["git", "checkout", "--detach", head], check=True)
    run(["git", "checkout", "-B", daily_branch], check=True)
    # Marker commit so the daily -> main PR can open (GitHub rejects empty diffs).
    run(
        [
            "git",
            "commit",
            "--allow-empty",
            "-m",
            f"chore(plugins): daily pin bumps {day}",
        ],
        check=True,
    )
    tip = run(["git", "rev-parse", "HEAD"], check=True).stdout.strip()
    push_branch(daily_branch)
    pr_url = ensure_pr(
        head=daily_branch,
        base=main_branch,
        title=title,
        body=body,
        dry_run=False,
    )
    return pr_url, tip


def apply_plugin_bump(
    *,
    name: str,
    old_sha: str,
    new_sha: str,
    url: str,
    branch: str,
    daily_branch: str,
    daily_sha: str,
    run_url: str,
    dry_run: bool,
) -> str | None:
    """Branch from daily tip, commit one plugin bump, open PR -> daily."""
    short_old = old_sha[:7]
    short_new = new_sha[:7]
    title = f"chore(plugins): bump {name} {short_old} -> {short_new}"
    body_lines = [
        f"Automated pin bump for `{name}`.",
        "",
        f"- **source:** {url}",
        f"- **old:** `{old_sha}`",
        f"- **new:** `{new_sha}`",
        f"- **base:** `{daily_branch}`",
        "",
        "Catalog SHA updated and `.grok-plugin/plugin-index.json` regenerated "
        "at the new pin.",
        "",
        "Targets the daily base, not `main`. Merge into the daily branch "
        "(or close to drop this bump), then land the daily PR.",
        "",
        "Human review still required (no auto-merge).",
    ]
    if run_url:
        body_lines.extend(["", f"Triggered by: {run_url}"])
    body = "\n".join(body_lines) + "\n"

    if dry_run:
        print(
            f"[dry-run] would open PR {branch} -> {daily_branch}: {title} "
            f"(from daily {daily_sha[:7]})"
        )
        return None

    git_identity()
    # Always cut from the daily tip so siblings are independent.
    run(["git", "checkout", "--detach", daily_sha], check=True)
    run(["git", "checkout", "-B", branch], check=True)

    replace_sha_in_catalog(name, old_sha, new_sha)
    regenerate_index()

    run(["git", "add", "--", str(CATALOG_PATH), str(INDEX_PATH)], check=True)
    status = run(["git", "status", "--porcelain"], check=True)
    if not (status.stdout or "").strip():
        raise RuntimeError(f"no file changes after bumping {name}")

    run(["git", "commit", "-m", title], check=True)
    push_branch(branch)

    return ensure_pr(
        head=branch,
        base=daily_branch,
        title=title,
        body=body,
        dry_run=False,
    )


def discover_candidates(
    *,
    only: str,
    freeze: set[str],
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

        candidates.append(
            {
                "name": name,
                "url": url,
                "old_sha": old_sha.lower(),
                "new_sha": new_sha,
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
        help="Default branch. Daily PR targets this.",
    )
    parser.add_argument(
        "--day",
        default=os.environ.get("BUMP_DAY", ""),
        help="Pacific calendar day YYYY-MM-DD (default: today Pacific)",
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
    day = args.day.strip() or pacific_date()
    daily_branch = f"bump/daily-{day}"

    if not args.dry_run:
        ensure_clean_worktree()

    start_ref_proc = run(["git", "rev-parse", "--abbrev-ref", "HEAD"], check=True)
    start_ref = (start_ref_proc.stdout or "").strip()
    if start_ref == "HEAD":
        start_ref = run(["git", "rev-parse", "HEAD"], check=True).stdout.strip()

    candidates, skipped = discover_candidates(only=only, freeze=freeze)
    if args.max_bumps >= 0:
        candidates = candidates[: args.max_bumps]

    print(f"day={day} daily_branch={daily_branch}")
    print(f"candidates={len(candidates)} skipped={len(skipped)}")
    for s in skipped:
        print(f"  skip {s['name']}: {s['reason']}")

    pr_urls: list[dict] = []
    errors: list[str] = []

    if not candidates:
        print("nothing to bump")
        payload = json.dumps(pr_urls, separators=(",", ":"))
        print(f"pr-urls={payload}")
        if args.github_output:
            with open(args.github_output, "a", encoding="utf-8") as fh:
                fh.write(f"pr-urls={payload}\n")
                fh.write("bumped_count=0\n")
        return 0

    # One open daily stack per Pacific day. Re-runs wait for that PR to close.
    if not args.dry_run:
        existing_daily = open_pr_for_branch(daily_branch)
        if existing_daily:
            print(
                f"daily stack already open for {day}: {existing_daily}; "
                "skipping (close it or wait for merge before re-running)"
            )
            payload = json.dumps(
                [
                    {
                        "name": "_daily",
                        "branch": daily_branch,
                        "base": args.base_branch,
                        "pr_url": existing_daily,
                        "skipped": True,
                    }
                ],
                separators=(",", ":"),
            )
            print(f"pr-urls={payload}")
            if args.github_output:
                with open(args.github_output, "a", encoding="utf-8") as fh:
                    fh.write(f"pr-urls={payload}\n")
                    fh.write("bumped_count=0\n")
            return 0

    try:
        daily_pr, daily_sha = open_daily_base(
            daily_branch=daily_branch,
            main_branch=args.base_branch,
            day=day,
            run_url=run_url,
            dry_run=args.dry_run,
        )
        pr_urls.append(
            {
                "name": "_daily",
                "branch": daily_branch,
                "base": args.base_branch,
                "pr_url": daily_pr or "",
            }
        )

        for c in candidates:
            plugin_branch = f"bump/{day}/{c['name']}"
            print(
                f"bump {c['name']}: {c['old_sha'][:7]} -> {c['new_sha'][:7]} "
                f"({c['url']}) on {plugin_branch} -> {daily_branch}"
            )
            try:
                pr_url = apply_plugin_bump(
                    name=c["name"],
                    old_sha=c["old_sha"],
                    new_sha=c["new_sha"],
                    url=c["url"],
                    branch=plugin_branch,
                    daily_branch=daily_branch,
                    daily_sha=daily_sha,
                    run_url=run_url,
                    dry_run=args.dry_run,
                )
                pr_urls.append(
                    {
                        "name": c["name"],
                        "old_sha": c["old_sha"],
                        "new_sha": c["new_sha"],
                        "branch": plugin_branch,
                        "base": daily_branch,
                        "pr_url": pr_url or "",
                    }
                )
            except Exception as e:  # noqa: BLE001
                msg = f"{c['name']}: {e}"
                errors.append(msg)
                print(f"ERROR: {msg}", file=sys.stderr)
    finally:
        if not args.dry_run:
            run(["git", "checkout", "-f", start_ref], check=False)

    if not args.dry_run and daily_pr and len(pr_urls) > 1:
        child_lines = [
            f"- `{e['branch']}` ({e['name']}): {e['pr_url'] or 'opened'}"
            for e in pr_urls
            if e.get("name") != "_daily"
        ]
        run(
            [
                "gh",
                "pr",
                "edit",
                daily_branch,
                "--body",
                "\n".join(
                    [
                        f"Daily base for plugin pin bumps on **{day}** (Pacific).",
                        "",
                        "Plugin PRs (all target this branch; merge or close independently):",
                        *child_lines,
                        "",
                        "Land this PR into `main` after the desired plugins are merged here.",
                        "",
                        "No auto-merge.",
                        *(["", f"Triggered by: {run_url}"] if run_url else []),
                    ]
                )
                + "\n",
            ],
            check=False,
        )

    payload = json.dumps(pr_urls, separators=(",", ":"))
    print(f"pr-urls={payload}")
    if args.github_output:
        with open(args.github_output, "a", encoding="utf-8") as fh:
            fh.write(f"pr-urls={payload}\n")
            bumped = sum(1 for e in pr_urls if e.get("name") != "_daily")
            fh.write(f"bumped_count={bumped}\n")

    if errors:
        print(f"{len(errors)} bump(s) failed", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        sys.exit(130)
