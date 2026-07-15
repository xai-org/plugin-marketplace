#!/usr/bin/env python3
"""Discover version-bumped url-source pins and open a stacked set of PRs.

A pin advances only when upstream HEAD moved *and* plugin.json `version`
differs from the version at the current pin (extracted via plugin_catalog,
same path as generate-plugin-index). SHA-only tip movement without a version
change is ignored so everyone on a given version shares that pin.

Stack shape (one run / Pacific day):

  main
    └── bump/daily-YYYY-MM-DD            PR → main
          ├── bump/YYYY-MM-DD/<plugin-a> PR → daily
          ├── bump/YYYY-MM-DD/<plugin-b> PR → daily
          └── ...

Default: if remote `bump/daily-YYYY-MM-DD` already exists, the run is a
no-op. Pass `--force` to rebuild that day's stack from current main.

Designed for GitHub Actions with GITHUB_TOKEN (contents + pull-requests write).
Local: `--dry-run` (no push/PR).

Usage:
  python3 scripts/bump-plugin-shas.py [--dry-run] [--force] [--only NAME]
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

import plugin_catalog

try:
    from zoneinfo import ZoneInfo
except ImportError:  # pragma: no cover
    ZoneInfo = None  # type: ignore[misc, assignment]

REPO_ROOT = Path(__file__).resolve().parent.parent
CATALOG_PATH = Path(".grok-plugin/marketplace.json")
INDEX_PATH = Path(".grok-plugin/plugin-index.json")
INDEX_SCRIPT = Path("scripts/generate-plugin-index.py")
SHA_RE = plugin_catalog.SHA_RE
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


def remote_branch_exists(branch: str) -> bool:
    """True if origin has refs/heads/<branch>. Fails hard on git errors."""
    result = run(
        ["git", "ls-remote", "--heads", "origin", f"refs/heads/{branch}"],
        check=True,
    )
    return bool((result.stdout or "").strip())


def open_pr_for_branch(branch: str) -> str | None:
    """Return open PR URL for head branch, or None if none.

    Raises on `gh` failure so we never treat API errors as "no PR".
    """
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
        check=True,
    )
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


def hard_reset_to(sha: str) -> None:
    """Detach at sha with a clean tree (isolates failures across plugins)."""
    run(["git", "checkout", "--detach", sha], check=True)
    run(["git", "reset", "--hard", sha], check=True)
    run(["git", "clean", "-fd"], check=True)


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


def push_branch(branch: str, *, force: bool) -> None:
    cmd = ["git", "push"]
    if force:
        cmd.append("--force")
    cmd.extend(["origin", f"HEAD:refs/heads/{branch}"])
    run(cmd, check=True)


def write_github_output(path: str, pr_urls: list[dict], bumped_count: int) -> None:
    payload = json.dumps(pr_urls, separators=(",", ":"))
    print(f"pr-urls={payload}")
    if path:
        with open(path, "a", encoding="utf-8") as fh:
            fh.write(f"pr-urls={payload}\n")
            fh.write(f"bumped_count={bumped_count}\n")


def open_daily_base(
    *,
    daily_branch: str,
    main_branch: str,
    day: str,
    run_url: str,
    force: bool,
    dry_run: bool,
) -> tuple[str | None, str]:
    """Create or rebuild daily branch from main; PR it into main.

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
    if force:
        body_lines.extend(["", "Rebuilt with `--force` from current main."])
    if run_url:
        body_lines.extend(["", f"Triggered by: {run_url}"])
    body = "\n".join(body_lines) + "\n"

    if dry_run:
        action = "rebuild (force)" if force else "create"
        print(f"[dry-run] would {action} daily base {daily_branch} -> {main_branch}")
        return None, "0" * 40

    head = origin_base(main_branch)
    git_identity()
    hard_reset_to(head)
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
    # First create: non-force push. Rebuild: force-push over the existing tip.
    push_branch(daily_branch, force=force)
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
    old_version: str,
    new_version: str,
    url: str,
    branch: str,
    daily_branch: str,
    daily_sha: str,
    run_url: str,
    force: bool,
    dry_run: bool,
) -> str | None:
    """Branch from daily tip, commit one plugin bump, open PR -> daily."""
    short_old = old_sha[:7]
    short_new = new_sha[:7]
    title = (
        f"chore(plugins): bump {name} {old_version} -> {new_version} "
        f"({short_old} -> {short_new})"
    )
    body_lines = [
        f"Automated pin bump for `{name}` after an upstream version change.",
        "",
        f"- **source:** {url}",
        f"- **version:** `{old_version}` -> `{new_version}`",
        f"- **old sha:** `{old_sha}`",
        f"- **new sha:** `{new_sha}` (HEAD when version change was observed)",
        f"- **base:** `{daily_branch}`",
        "",
        "Catalog SHA updated and `.grok-plugin/plugin-index.json` regenerated "
        "at the new pin. Pins only move when the plugin manifest version changes "
        "so everyone on a given version shares the same pin.",
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
            f"(from daily {daily_sha[:7]}, force={force})"
        )
        return None

    git_identity()
    # Clean cut from daily tip so a prior plugin failure cannot leak dirty files.
    hard_reset_to(daily_sha)
    run(["git", "checkout", "-B", branch], check=True)

    try:
        replace_sha_in_catalog(name, old_sha, new_sha)
        regenerate_index()

        run(["git", "add", "--", str(CATALOG_PATH), str(INDEX_PATH)], check=True)
        status = run(["git", "status", "--porcelain"], check=True)
        if not (status.stdout or "").strip():
            raise RuntimeError(f"no file changes after bumping {name}")

        run(["git", "commit", "-m", title], check=True)
        # force=True when rebuilding the day; otherwise create-only push.
        # If the plugin branch already exists without --force, push fails closed.
        push_branch(branch, force=force)
    except Exception:
        # Leave a clean tree for the next candidate even if this one failed.
        hard_reset_to(daily_sha)
        raise

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
    """Find url pins where HEAD moved and plugin.json version also changed.

    Version extraction uses plugin_catalog.extract_plugin (same path as the
    index generator). When only the SHA moved, skip so users on a version
    stay on that pin until the author bumps version.
    """
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
        path = source.get("path")
        subdir = path if isinstance(path, str) and path else None
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

        old_sha = old_sha.lower()
        if new_sha == old_sha:
            skipped.append({"name": name, "reason": "up to date"})
            continue

        try:
            with tempfile.TemporaryDirectory(prefix=f"bump-{name}-") as tmp:
                tmp_root = Path(tmp)
                pin_rec = plugin_catalog.extract_at_sha(
                    url,
                    old_sha,
                    tmp_root / "pin",
                    subdir=subdir,
                    name=name,
                )
                head_rec = plugin_catalog.extract_at_sha(
                    url,
                    new_sha,
                    tmp_root / "head",
                    subdir=subdir,
                    name=name,
                )
        except Exception as e:  # noqa: BLE001
            skipped.append({"name": name, "reason": f"extract failed: {e}"})
            continue

        old_version = pin_rec.get("version")
        new_version = head_rec.get("version")
        if not old_version:
            skipped.append(
                {"name": name, "reason": "no version at pin (set plugin.json version)"}
            )
            continue
        if not new_version:
            skipped.append(
                {
                    "name": name,
                    "reason": "no version at HEAD (set plugin.json version)",
                }
            )
            continue
        if old_version == new_version:
            skipped.append(
                {
                    "name": name,
                    "reason": (
                        f"sha moved ({old_sha[:7]}->{new_sha[:7]}) but "
                        f"version still {old_version}"
                    ),
                }
            )
            continue

        candidates.append(
            {
                "name": name,
                "url": url,
                "old_sha": old_sha,
                "new_sha": new_sha,
                "old_version": old_version,
                "new_version": new_version,
                "path": subdir,
            }
        )

    return candidates, skipped


def env_flag(name: str) -> bool:
    return os.environ.get(name, "").strip().lower() in {"1", "true", "yes", "on"}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--force",
        action="store_true",
        help=(
            "Rebuild today's stack even if bump/daily-YYYY-MM-DD already exists "
            "on origin. Force-pushes daily and plugin branches. "
            "Also set via FORCE_BUMP=true."
        ),
    )
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
    force = bool(args.force) or env_flag("FORCE_BUMP")

    if not args.dry_run:
        ensure_clean_worktree()

    start_ref_proc = run(["git", "rev-parse", "--abbrev-ref", "HEAD"], check=True)
    start_ref = (start_ref_proc.stdout or "").strip()
    if start_ref == "HEAD":
        start_ref = run(["git", "rev-parse", "HEAD"], check=True).stdout.strip()

    candidates, skipped = discover_candidates(only=only, freeze=freeze)

    print(f"day={day} daily_branch={daily_branch} force={force}")
    print(f"candidates={len(candidates)} skipped={len(skipped)}")
    for s in skipped:
        print(f"  skip {s['name']}: {s['reason']}")

    pr_urls: list[dict] = []
    errors: list[str] = []
    daily_pr: str | None = None

    if not candidates:
        print("nothing to bump")
        write_github_output(args.github_output, pr_urls, 0)
        return 0

    # Gate on remote branch existence (not open PR). Merged/closed daily still
    # leaves the ref around unless deleted, so same-day re-runs stay no-ops.
    daily_exists = remote_branch_exists(daily_branch)
    if daily_exists and not force:
        print(
            f"remote branch {daily_branch} already exists; no-op "
            "(pass --force to rebuild and force-push this day's stack)"
        )
        write_github_output(
            args.github_output,
            [
                {
                    "name": "_daily",
                    "branch": daily_branch,
                    "base": args.base_branch,
                    "pr_url": "",
                    "skipped": True,
                }
            ],
            0,
        )
        return 0

    if daily_exists and force:
        print(f"remote branch {daily_branch} exists; --force rebuild from main")

    try:
        daily_pr, daily_sha = open_daily_base(
            daily_branch=daily_branch,
            main_branch=args.base_branch,
            day=day,
            run_url=run_url,
            force=force or daily_exists,
            dry_run=args.dry_run,
        )
        # First create: force=False for push. But if daily_exists we must force.
        # open_daily_base already got force=force or daily_exists.
        pr_urls.append(
            {
                "name": "_daily",
                "branch": daily_branch,
                "base": args.base_branch,
                "pr_url": daily_pr or "",
            }
        )

        # Plugin pushes: force when rebuilding the day so existing plugin
        # branches are rewritten onto the new daily tip.
        plugin_force = force or daily_exists

        for c in candidates:
            plugin_branch = f"bump/{day}/{c['name']}"
            print(
                f"bump {c['name']}: {c['old_version']} -> {c['new_version']} "
                f"({c['old_sha'][:7]} -> {c['new_sha'][:7]}) "
                f"on {plugin_branch} -> {daily_branch}"
            )
            try:
                pr_url = apply_plugin_bump(
                    name=c["name"],
                    old_sha=c["old_sha"],
                    new_sha=c["new_sha"],
                    old_version=c["old_version"],
                    new_version=c["new_version"],
                    url=c["url"],
                    branch=plugin_branch,
                    daily_branch=daily_branch,
                    daily_sha=daily_sha,
                    run_url=run_url,
                    force=plugin_force,
                    dry_run=args.dry_run,
                )
                pr_urls.append(
                    {
                        "name": c["name"],
                        "old_sha": c["old_sha"],
                        "new_sha": c["new_sha"],
                        "old_version": c["old_version"],
                        "new_version": c["new_version"],
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

    bumped = sum(1 for e in pr_urls if e.get("name") != "_daily")
    write_github_output(args.github_output, pr_urls, bumped)

    if errors:
        print(f"{len(errors)} bump(s) failed", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        sys.exit(130)
