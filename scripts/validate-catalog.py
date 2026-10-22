#!/usr/bin/env python3
"""Validate the marketplace catalog index.

Enforces, for every plugin with `"source": {"source": "url", ...}`:

  - `sha` field is present and non-empty
  - `sha` is a 40-character lowercase hex string (full commit SHA, not a
    tag, branch, or abbreviation)

For every plugin with `"source": {"type": "local", "path": ...}`:

  - `path` is a relative path inside the repository
  - the directory exists and holds a plugin manifest
    (`.grok-plugin/plugin.json` or `.claude-plugin/plugin.json`)

Across the catalog:

  - plugin names are unique

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

# Manifest lookup order matches the Grok CLI plugin installer.
MANIFEST_PATHS = [
    Path(".grok-plugin/plugin.json"),
    Path(".claude-plugin/plugin.json"),
]

REPO_ROOT = Path(__file__).resolve().parent.parent


def validate_entry(entry: dict, idx: int) -> list[str]:
    """Return a list of human-readable error strings for a single plugin entry."""
    errors: list[str] = []
    name = entry.get("name") or f"<unnamed at index {idx}>"
    source = entry.get("source")

    # String-form sources like "./plugins/foo" are local paths; no sha needed.
    if not isinstance(source, dict):
        return errors

    if source.get("type") == "local":
        return validate_local_source(name, source)

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


def validate_local_source(name: str, source: dict) -> list[str]:
    """Checks for `{"type": "local", "path": ...}` entries.

    The CLI resolves these against the marketplace checkout, so a path that
    does not exist or has no manifest is a plugin that silently fails to
    install for every user of the catalog.
    """
    path = source.get("path")
    if not isinstance(path, str) or not path.strip():
        return [f"plugin '{name}': local source `path` must be a non-empty string."]

    if path.startswith("/") or "\\" in path or ".." in path.split("/"):
        return [
            f"plugin '{name}': local source `path` {path!r} must be a relative "
            f"path inside the repository (no leading '/', no '..', no backslashes)."
        ]

    resolved = (REPO_ROOT / path).resolve()
    try:
        inside = resolved.is_relative_to(REPO_ROOT)
    except ValueError:
        inside = False
    if not inside:
        return [f"plugin '{name}': local source `path` {path!r} resolves outside the repository."]

    if not resolved.is_dir():
        return [f"plugin '{name}': local source `path` {path!r} does not exist in the repository."]

    if not any((resolved / manifest).is_file() for manifest in MANIFEST_PATHS):
        expected = " or ".join(str(m) for m in MANIFEST_PATHS)
        return [f"plugin '{name}': local source `path` {path!r} has no plugin manifest ({expected})."]

    return []


def validate_file(path: Path) -> list[str]:
    try:
        data = json.loads(path.read_text())
    except Exception as e:
        return [f"{path}: failed to parse: {e}"]

    plugins = data.get("plugins", [])
    if not isinstance(plugins, list):
        return [f"{path}: `plugins` must be an array, got {type(plugins).__name__}"]

    errors: list[str] = []
    seen: dict[str, int] = {}
    for idx, entry in enumerate(plugins):
        if not isinstance(entry, dict):
            errors.append(f"{path}: plugin index {idx} must be an object")
            continue
        name = entry.get("name")
        if isinstance(name, str) and name:
            if name in seen:
                errors.append(
                    f"{path}: plugin '{name}' appears twice (indexes {seen[name]} and {idx}); "
                    f"the installer resolves a name to one entry."
                )
            else:
                seen[name] = idx
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
