#!/usr/bin/env python3
"""Generate the plugin component catalog (.grok-plugin/plugin-index.json).

For every entry in `.grok-plugin/marketplace.json`, this script resolves the
plugin's source (local directories are scanned in place; url sources are
shallow-fetched at their pinned commit sha) and records version (when set)
plus components: skills, commands, agents, MCP servers, hooks, and LSP
servers. Clients use this to show what a plugin contains before installing it.

Extraction is shared with bump-plugin-shas via plugin_catalog.extract_plugin.

The output is deterministic — sorted keys, items sorted by name, no
timestamps — so CI can regenerate it and fail on any diff.

Generate:       python3 scripts/generate-plugin-index.py
Verify (CI):    python3 scripts/generate-plugin-index.py --check
"""

from __future__ import annotations

import json
import sys
import tempfile
from pathlib import Path

import plugin_catalog

INDEX_PATH = Path(".grok-plugin/plugin-index.json")
CATALOG_PATH = Path(".grok-plugin/marketplace.json")


def resolve_local(repo_root: Path, path: str, name: str) -> Path:
    resolved = plugin_catalog.resolve_inside(repo_root, path)
    if resolved is None:
        raise RuntimeError(
            f"plugin '{name}': local source path escapes the repo: {path!r}"
        )
    return resolved


def resolve_source(
    entry: dict, repo_root: Path, tmp_root: Path, idx: int
) -> tuple[Path, str | None]:
    """Return (plugin root dir, pinned sha or None for local sources)."""
    name = entry.get("name", "<unnamed>")
    source = entry.get("source")
    if isinstance(source, str):
        return resolve_local(repo_root, source, name), None
    if isinstance(source, dict):
        if source.get("source") == "url" or source.get("type") == "url":
            url = source.get("url")
            sha = source.get("sha")
            if not isinstance(url, str) or not url.startswith("https://"):
                raise RuntimeError(
                    f"plugin '{name}': url source must be an https:// url, got {url!r}"
                )
            if not sha:
                raise RuntimeError(
                    f"plugin '{name}': url source has no pinned sha. All url "
                    f"sources must pin a full commit sha (see README)."
                )
            if not isinstance(sha, str) or not plugin_catalog.SHA_RE.match(sha):
                raise RuntimeError(
                    f"plugin '{name}': sha {sha!r} is not a 40-character "
                    f"lowercase hex commit sha"
                )
            dest = tmp_root / f"plugin-{idx}"
            subdir = source.get("path")
            subdir_s = subdir if isinstance(subdir, str) and subdir else None
            plugin_catalog.fetch_at_sha(url, sha, dest)
            root = plugin_catalog.plugin_root_for_fetch(dest, subdir_s, name)
            return root, sha
        path = source.get("path")
        if isinstance(path, str):
            return resolve_local(repo_root, path, name), None
    raise RuntimeError(f"plugin '{name}': unsupported source {source!r}")


def generate(repo_root: Path) -> dict:
    catalog = json.loads((repo_root / CATALOG_PATH).read_text(encoding="utf-8"))
    plugins_out: dict[str, dict] = {}
    with tempfile.TemporaryDirectory(prefix="plugin-index-") as tmp:
        tmp_root = Path(tmp)
        for idx, entry in enumerate(catalog.get("plugins", [])):
            name = entry.get("name")
            if not name:
                raise RuntimeError("catalog entry without a name")
            root, sha = resolve_source(entry, repo_root, tmp_root, idx)
            extracted = plugin_catalog.extract_plugin(root)
            record: dict = {}
            if sha:
                record["sha"] = sha
            if "version" in extracted:
                record["version"] = extracted["version"]
            record["components"] = extracted["components"]
            plugins_out[name] = record
    return {
        "version": 1,
        "plugins": {name: plugins_out[name] for name in sorted(plugins_out)},
    }


def render(index: dict) -> str:
    return json.dumps(index, indent=2, ensure_ascii=False, sort_keys=False) + "\n"


def main() -> int:
    check = "--check" in sys.argv[1:]
    repo_root = Path(__file__).resolve().parent.parent
    try:
        output = render(generate(repo_root))
    except RuntimeError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        return 1

    index_file = repo_root / INDEX_PATH
    if check:
        committed = index_file.read_bytes() if index_file.exists() else b""
        if committed != output.encode("utf-8"):
            print(
                f"ERROR: {INDEX_PATH} is out of date. "
                f"Run `python3 scripts/generate-plugin-index.py` and commit the result.",
                file=sys.stderr,
            )
            return 1
        print(f"Plugin index OK ({INDEX_PATH})")
        return 0

    index_file.write_bytes(output.encode("utf-8"))
    print(f"Wrote {INDEX_PATH}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
