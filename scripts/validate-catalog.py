#!/usr/bin/env python3
"""Validate the marketplace catalog index.

Enforces, for every plugin whose source is *not* an explicit local source:

  - `sha` field is present and non-empty
  - `sha` is a 40-character lowercase hex string (full commit SHA, not a
    tag, branch, or abbreviation)

The check is fail-closed: a source is exempt from pinning only when it says
`{"type": "local", ...}` or is a relative path string beginning with "./".
Every other dict shape is treated as remote and must be pinned, and any
other type is rejected outright. Allow-listing remote spellings instead
(e.g. only `{"source": "url"}`) silently exempts every shape not on the
list — including `{"source": "github", "repo": "..."}`, the Claude Code
shape this validator also sees via `.claude-plugin/marketplace.json`.

This is the catalog-level enforcement layer for SHA pinning. Without a
pin, the installer would fall back to `git clone --branch <ref>` (or HEAD),
which means a vendor force-push or repo compromise immediately ships to
every user who installs or updates that plugin. Pinning to a specific
commit + content-verifying it at install time is the only thing that
survives that class of attack.

The runtime side (the Grok CLI plugin installer) verifies
`git rev-parse HEAD == sha` after clone — these two layers together give
us content-addressable plugin pinning.

Run locally:    python3 scripts/validate-catalog.py
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

SHA_RE = re.compile(r"^[0-9a-f]{40}$")

# The documented string-form source is a relative in-repo path, e.g.
# "./plugins/foo". Requiring the prefix keeps URLs and scp-style refs from
# being mistaken for local paths.
LOCAL_PATH_PREFIX = "./"

# Lookup order matches the marketplace index loader in the Grok CLI.
CATALOG_PATHS = [
    Path(".grok-plugin/marketplace.json"),
    Path(".claude-plugin/marketplace.json"),
]


def is_local_source(source: dict) -> bool:
    """True for sources vendored in this repo, which need no commit pin."""
    return source.get("type") == "local"


def describe_source(source: dict) -> str:
    """Best-effort identifier for error messages across source shapes."""
    for key in ("url", "repo", "path"):
        value = source.get(key)
        if isinstance(value, str) and value:
            return f"{key}={value!r}"
    return f"source={source!r}"


def local_path_errors(name: str, value, label: str) -> list[str]:
    """Shared shape check for in-repo relative plugin paths."""
    if not isinstance(value, str) or not value.strip():
        return [f"plugin '{name}': {label} must be a non-empty string."]
    if (
        value.startswith("/")
        or "\\" in value
        or any(part in ("..", "") for part in value.split("/"))
    ):
        return [
            f"plugin '{name}': {label} {value!r} must be a relative "
            f"subdirectory inside the repo (no leading '/', no '..', no backslashes)."
        ]
    return []


def validate_entry(entry: dict, idx: int) -> list[str]:
    """Return a list of human-readable error strings for a single plugin entry."""
    errors: list[str] = []
    name = entry.get("name") or f"<unnamed at index {idx}>"
    source = entry.get("source")

    # String-form sources are local paths like "./plugins/foo". Anything else
    # spelled as a string — a URL, an scp-style ref, a bare repo name — would
    # reach the installer as an unpinned remote, so require the documented
    # local shape rather than exempting every string.
    if isinstance(source, str):
        if not source.startswith(LOCAL_PATH_PREFIX):
            return [
                f"plugin '{name}': string-form `source` {source!r} must be a "
                f'relative local path starting with "{LOCAL_PATH_PREFIX}". '
                f"Remote sources must use the object form with a pinned `sha`."
            ]
        return local_path_errors(name, source, "string-form `source`")

    if not isinstance(source, dict):
        return [
            f"plugin '{name}': `source` must be an object or a local path "
            f'string starting with "{LOCAL_PATH_PREFIX}", got '
            f"{'null' if source is None else type(source).__name__}."
        ]

    # Fail closed: only an explicit local source is exempt from pinning.
    # Everything else counts as remote, including shapes we haven't seen yet.
    if is_local_source(source):
        return errors

    sha = source.get("sha")
    if not sha:
        errors.append(
            f"plugin '{name}': missing `sha` field on remote source "
            f"({describe_source(source)}). Every remote-sourced plugin must "
            f"be pinned to a specific commit so a vendor force-push can't "
            f"silently ship new code to installed users. If this is a local "
            f"plugin vendored in this repo, use "
            f'{{"type": "local", "path": "./..."}}.'
        )
        return errors

    if not isinstance(sha, str):
        errors.append(
            f"plugin '{name}': sha must be a string, got {type(sha).__name__}"
        )
        return errors

    if not SHA_RE.match(sha):
        errors.append(
            f"plugin '{name}': sha {sha!r} is not a 40-character lowercase "
            f"hex string. Use the full commit SHA — not a tag, branch, or "
            f"abbreviated SHA."
        )

    path = source.get("path")
    if path is not None:
        errors.extend(local_path_errors(name, path, "remote source `path`"))

    return errors


def validate_file(path: Path) -> list[str]:
    try:
        data = json.loads(path.read_text())
    except Exception as e:
        return [f"{path}: failed to parse: {e}"]

    plugins = data.get("plugins", [])
    if not isinstance(plugins, list):
        return [f"{path}: `plugins` must be an array, got {type(plugins).__name__}"]

    errors: list[str] = []
    for idx, entry in enumerate(plugins):
        if not isinstance(entry, dict):
            errors.append(f"{path}: plugin index {idx} must be an object")
            continue
        errors.extend(f"{path}: {e}" for e in validate_entry(entry, idx))
    return errors


def main() -> int:
    catalog_files = [p for p in CATALOG_PATHS if p.exists()]
    if not catalog_files:
        print(
            "ERROR: no catalog file found. Expected one of: "
            + ", ".join(str(p) for p in CATALOG_PATHS),
            file=sys.stderr,
        )
        return 1

    all_errors: list[str] = []
    for path in catalog_files:
        all_errors.extend(validate_file(path))

    if all_errors:
        print("Catalog validation failed:", file=sys.stderr)
        for e in all_errors:
            print(f"  - {e}", file=sys.stderr)
        return 1

    summary = " + ".join(str(p) for p in catalog_files)
    print(f"Catalog OK ({summary})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
