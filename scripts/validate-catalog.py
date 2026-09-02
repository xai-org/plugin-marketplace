#!/usr/bin/env python3
"""Validate the marketplace catalog index.

Enforces, for every plugin with `"source": {"source": "url", ...}`:

  - `sha` field is present and non-empty
  - `sha` is a 40-character lowercase hex string (full commit SHA, not a
    tag, branch, or abbreviation)

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

# Lookup order matches the marketplace index loader in the Grok CLI.
CATALOG_PATHS = [
    Path(".grok-plugin/marketplace.json"),
    Path(".claude-plugin/marketplace.json"),
]


def validate_entry(entry: dict, idx: int) -> list[str]:
    """Return a list of human-readable error strings for a single plugin entry."""
    errors: list[str] = []
    name = entry.get("name") or f"<unnamed at index {idx}>"
    source = entry.get("source")

    # String-form sources like "./plugins/foo" are local paths; no sha needed.
    if not isinstance(source, dict):
        return errors

    if source.get("source") != "url":
        return errors

    sha = source.get("sha")
    if not sha:
        errors.append(
            f"plugin '{name}': missing `sha` field on url source "
            f"(url={source.get('url')!r}). All url-sourced plugins must "
            f"be pinned to a specific commit so a vendor force-push can't "
            f"silently ship new code to installed users."
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
        if not isinstance(path, str) or not path.strip():
            errors.append(
                f"plugin '{name}': url source `path` must be a non-empty string when present."
            )
        elif (
            path.startswith("/")
            or "\\" in path
            or any(part in ("..", "") for part in path.split("/"))
        ):
            errors.append(
                f"plugin '{name}': url source `path` {path!r} must be a relative "
                f"subdirectory inside the repo (no leading '/', no '..', no backslashes)."
            )

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
