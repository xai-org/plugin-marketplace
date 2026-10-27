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
NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")

# Lookup order matches the marketplace index loader in the Grok CLI.
CATALOG_PATHS = [
    Path(".grok-plugin/marketplace.json"),
    Path(".claude-plugin/marketplace.json"),
]


def validate_entry(
    entry: dict,
    idx: int,
    seen_names: set[str],
    repo_root: Path,
) -> list[str]:
    """Return a list of human-readable error strings for a single plugin entry."""
    errors: list[str] = []
    name = entry.get("name")
    if not name or not isinstance(name, str):
        errors.append(f"plugin at index {idx}: missing or invalid required `name` field")
        name = f"<unnamed at index {idx}>"
    else:
        if not NAME_RE.match(name):
            errors.append(
                f"plugin '{name}': name must be in lowercase kebab-case (e.g. 'my-plugin')"
            )
        if name in seen_names:
            errors.append(
                f"plugin '{name}': duplicate plugin name at index {idx}. "
                f"All plugin names must be unique across the catalog."
            )
        seen_names.add(name)

    source = entry.get("source")
    if source is None:
        errors.append(f"plugin '{name}': missing required `source` field.")
        return errors

    # String-form sources like "./plugins/foo" are local paths
    if isinstance(source, str):
        try:
            resolved = (repo_root / source).resolve()
            if not resolved.is_relative_to(repo_root.resolve()):
                errors.append(
                    f"plugin '{name}': local source path escapes repo root: {source!r}"
                )
            elif not resolved.is_dir():
                errors.append(
                    f"plugin '{name}': local source directory not found: {source!r}"
                )
        except (OSError, ValueError) as e:
            errors.append(
                f"plugin '{name}': invalid local source path {source!r}: {e}"
            )
        return errors

    if not isinstance(source, dict):
        errors.append(
            f"plugin '{name}': source must be an object or path string, got {type(source).__name__}"
        )
        return errors

    is_url = source.get("source") == "url" or source.get("type") == "url"
    is_local = (
        source.get("source") == "local"
        or source.get("type") == "local"
        or ("path" in source and not is_url)
    )

    if is_url:
        url = source.get("url")
        if not url or not isinstance(url, str):
            errors.append(
                f"plugin '{name}': missing or invalid `url` field on url source."
            )
        elif not url.startswith("https://"):
            errors.append(
                f"plugin '{name}': url source must start with 'https://', got {url!r}"
            )

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
    elif is_local:
        path = source.get("path")
        if not path or not isinstance(path, str):
            errors.append(
                f"plugin '{name}': local source must declare a non-empty `path` string."
            )
        else:
            try:
                resolved = (repo_root / path).resolve()
                if not resolved.is_relative_to(repo_root.resolve()):
                    errors.append(
                        f"plugin '{name}': local source `path` escapes repo root: {path!r}"
                    )
                elif not resolved.is_dir():
                    errors.append(
                        f"plugin '{name}': local source directory not found: {path!r}"
                    )
            except (OSError, ValueError) as e:
                errors.append(
                    f"plugin '{name}': invalid local source path {path!r}: {e}"
                )
    else:
        errors.append(
            f"plugin '{name}': unsupported source configuration: {source!r}"
        )

    return errors


def validate_file(path: Path, repo_root: Path | None = None) -> list[str]:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as e:
        return [f"{path}: failed to parse: {e}"]

    plugins = data.get("plugins", [])
    if not isinstance(plugins, list):
        return [f"{path}: `plugins` must be an array, got {type(plugins).__name__}"]

    if repo_root is None:
        repo_root = path.resolve().parent.parent

    errors: list[str] = []
    seen_names: set[str] = set()
    for idx, entry in enumerate(plugins):
        if not isinstance(entry, dict):
            errors.append(f"{path}: plugin index {idx} must be an object")
            continue
        errors.extend(
            f"{path}: {e}"
            for e in validate_entry(entry, idx, seen_names, repo_root)
        )
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
