#!/usr/bin/env python3
"""Generate the plugin component catalog (.grok-plugin/plugin-index.json).

For every entry in `.grok-plugin/marketplace.json`, this script resolves the
plugin's source (local directories are scanned in place; url sources are
shallow-fetched at their pinned commit sha) and records which components the
plugin provides: skills, commands, agents, MCP servers, hooks, and LSP
servers. Clients use this to show what a plugin contains before installing it.

The output is deterministic — sorted keys, items sorted by name, no
timestamps — so CI can regenerate it and fail on any diff.

Generate:       python3 scripts/generate-plugin-index.py
Verify (CI):    python3 scripts/generate-plugin-index.py --check
"""

from __future__ import annotations

import json
import re
import subprocess
import sys
import tempfile
from pathlib import Path

INDEX_PATH = Path(".grok-plugin/plugin-index.json")
CATALOG_PATH = Path(".grok-plugin/marketplace.json")

MAX_ITEMS_PER_CATEGORY = 50
MAX_STRING_LEN = 120

MANIFEST_PATHS = [
    Path(".grok-plugin/plugin.json"),
    Path(".claude-plugin/plugin.json"),
]

CONTROL_CHARS_RE = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")


def clean(text: str) -> str:
    text = CONTROL_CHARS_RE.sub("", text).strip()
    if len(text) > MAX_STRING_LEN:
        text = text[: MAX_STRING_LEN - 1].rstrip() + "\u2026"
    return text


def parse_frontmatter(path: Path) -> dict[str, str]:
    """Tolerant YAML-ish frontmatter parser: top-level `key: value` lines only."""
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return {}
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return {}
    fields: dict[str, str] = {}
    i = 1
    while i < len(lines):
        line = lines[i]
        if line.strip() in ("---", "..."):
            break
        m = re.match(r"^([A-Za-z0-9_-]+):\s*(.*)$", line)
        if not m:
            i += 1
            continue
        key, value = m.group(1), m.group(2).strip()
        if re.match(r"^[|>][+-]?$", value):
            block: list[str] = []
            j = i + 1
            while j < len(lines) and (lines[j].startswith((" ", "\t")) or not lines[j].strip()):
                if lines[j].strip():
                    block.append(lines[j].strip())
                j += 1
            value = " ".join(block)
            i = j
        else:
            if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
                value = value[1:-1]
            i += 1
        fields[key] = value
    return fields


def first_body_line(path: Path) -> str:
    """First non-empty, non-heading line after any frontmatter block."""
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return ""
    lines = text.splitlines()
    i = 0
    if lines and lines[0].strip() == "---":
        for j in range(1, len(lines)):
            if lines[j].strip() in ("---", "..."):
                i = j + 1
                break
    for line in lines[i:]:
        stripped = line.strip()
        if stripped and not stripped.startswith("#"):
            return stripped
    return ""


def make_item(name: str, description: str = "") -> dict:
    item = {"name": clean(name)}
    description = clean(description)
    if description:
        item["description"] = description
    return item


def load_manifest(root: Path) -> dict:
    for rel in MANIFEST_PATHS:
        path = root / rel
        if path.is_file():
            try:
                data = json.loads(path.read_text(encoding="utf-8"))
            except (OSError, json.JSONDecodeError):
                continue
            if isinstance(data, dict):
                return data
    return {}


def as_list(value) -> list:
    if isinstance(value, list):
        return value
    if value is None:
        return []
    return [value]


def scan_skills(root: Path, manifest: dict) -> list[dict]:
    skill_dirs: dict[Path, None] = {}
    for base in [root / "skills"]:
        if base.is_dir():
            for child in sorted(base.iterdir()):
                if (child / "SKILL.md").is_file():
                    skill_dirs[child.resolve()] = None
    for entry in as_list(manifest.get("skills")):
        if isinstance(entry, str):
            candidate = (root / entry.lstrip("./")).resolve()
            if (candidate / "SKILL.md").is_file():
                skill_dirs[candidate] = None
    items = []
    for skill_dir in skill_dirs:
        fm = parse_frontmatter(skill_dir / "SKILL.md")
        items.append(make_item(fm.get("name") or skill_dir.name, fm.get("description", "")))
    return items


def scan_markdown_dir(root: Path, dirname: str, manifest_key: str, manifest: dict) -> list[dict]:
    files: dict[Path, None] = {}
    base = root / dirname
    if base.is_dir():
        for path in sorted(base.rglob("*.md")):
            files[path.resolve()] = None
    for entry in as_list(manifest.get(manifest_key)):
        if isinstance(entry, str):
            candidate = (root / entry.lstrip("./")).resolve()
            if candidate.is_file() and candidate.suffix == ".md":
                files[candidate] = None
    items = []
    for path in files:
        fm = parse_frontmatter(path)
        description = fm.get("description") or first_body_line(path)
        items.append(make_item(fm.get("name") or path.stem, description))
    return items


def transport_hint(config: dict) -> str:
    if not isinstance(config, dict):
        return ""
    transport = config.get("type") or config.get("transport")
    if not transport:
        if config.get("command"):
            transport = "stdio"
        elif config.get("url"):
            transport = "http"
    return str(transport) if transport else ""


def scan_mcp_servers(root: Path, manifest: dict) -> list[dict]:
    servers: dict[str, dict] = {}
    mcp_path = root / ".mcp.json"
    if mcp_path.is_file():
        try:
            data = json.loads(mcp_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            data = {}
        if isinstance(data, dict) and isinstance(data.get("mcpServers"), dict):
            servers.update(data["mcpServers"])
    declared = manifest.get("mcpServers")
    if isinstance(declared, dict):
        for name, config in declared.items():
            servers.setdefault(name, config)
    return [make_item(name, transport_hint(config)) for name, config in servers.items()]


def scan_hooks(root: Path, manifest: dict) -> list[dict]:
    data = None
    hooks_path = root / "hooks" / "hooks.json"
    if hooks_path.is_file():
        try:
            data = json.loads(hooks_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            data = None
    if data is None:
        declared = manifest.get("hooks")
        if isinstance(declared, dict):
            data = declared
    if not isinstance(data, dict):
        return []
    hooks_obj = data.get("hooks") if isinstance(data.get("hooks"), dict) else data
    items = []
    for event, entries in hooks_obj.items():
        if not isinstance(entries, list):
            continue
        matchers = [
            e["matcher"]
            for e in entries
            if isinstance(e, dict) and isinstance(e.get("matcher"), str) and e["matcher"]
        ]
        items.append(make_item(event, ", ".join(matchers)))
    return items


def scan_lsp_servers(root: Path, manifest: dict) -> list[dict]:
    servers: dict[str, dict] = {}
    lsp_path = root / ".lsp.json"
    if lsp_path.is_file():
        try:
            data = json.loads(lsp_path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError):
            data = {}
        if isinstance(data, dict):
            servers.update(data.get("lspServers") if isinstance(data.get("lspServers"), dict) else data)
    declared = manifest.get("lspServers")
    if isinstance(declared, dict):
        for name, config in declared.items():
            servers.setdefault(name, config)
    return [make_item(name) for name, config in servers.items() if isinstance(config, dict)]


def scan_plugin(root: Path) -> dict:
    manifest = load_manifest(root)
    categories = {
        "skills": scan_skills(root, manifest),
        "commands": scan_markdown_dir(root, "commands", "commands", manifest),
        "agents": scan_markdown_dir(root, "agents", "agents", manifest),
        "mcpServers": scan_mcp_servers(root, manifest),
        "hooks": scan_hooks(root, manifest),
        "lspServers": scan_lsp_servers(root, manifest),
    }
    components = {}
    for key in sorted(categories):
        items = sorted(categories[key], key=lambda i: i["name"])[:MAX_ITEMS_PER_CATEGORY]
        if items:
            components[key] = items
    return components


def fetch_pinned(url: str, sha: str, dest: Path) -> None:
    cmds = [
        ["git", "init", "--quiet", str(dest)],
        ["git", "-C", str(dest), "fetch", "--quiet", "--depth", "1", url, sha],
        ["git", "-C", str(dest), "checkout", "--quiet", sha],
    ]
    for cmd in cmds:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            raise RuntimeError(
                f"failed to fetch {url} at {sha}: `{' '.join(cmd)}` exited "
                f"{result.returncode}: {result.stderr.strip()}"
            )


def resolve_source(entry: dict, repo_root: Path, tmp_root: Path) -> tuple[Path, str | None]:
    """Return (plugin root dir, pinned sha or None for local sources)."""
    name = entry.get("name", "<unnamed>")
    source = entry.get("source")
    if isinstance(source, str):
        return (repo_root / source.lstrip("./")).resolve(), None
    if isinstance(source, dict):
        if source.get("source") == "url" or source.get("type") == "url":
            url = source.get("url")
            sha = source.get("sha")
            if not url:
                raise RuntimeError(f"plugin '{name}': url source has no url")
            if not sha:
                raise RuntimeError(
                    f"plugin '{name}': url source has no pinned sha. All url "
                    f"sources must pin a full commit sha (see README)."
                )
            dest = tmp_root / name
            fetch_pinned(url, sha, dest)
            return dest, sha
        path = source.get("path")
        if isinstance(path, str):
            return (repo_root / path.lstrip("./")).resolve(), None
    raise RuntimeError(f"plugin '{name}': unsupported source {source!r}")


def generate(repo_root: Path) -> dict:
    catalog = json.loads((repo_root / CATALOG_PATH).read_text(encoding="utf-8"))
    plugins_out: dict[str, dict] = {}
    with tempfile.TemporaryDirectory(prefix="plugin-index-") as tmp:
        tmp_root = Path(tmp)
        for entry in catalog.get("plugins", []):
            name = entry.get("name")
            if not name:
                raise RuntimeError("catalog entry without a name")
            root, sha = resolve_source(entry, repo_root, tmp_root)
            if not root.is_dir():
                raise RuntimeError(f"plugin '{name}': source dir not found: {root}")
            record: dict = {}
            if sha:
                record["sha"] = sha
            record["components"] = scan_plugin(root)
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
        committed = index_file.read_text(encoding="utf-8") if index_file.exists() else ""
        if committed != output:
            print(
                f"ERROR: {INDEX_PATH} is out of date. "
                f"Run `python3 scripts/generate-plugin-index.py` and commit the result.",
                file=sys.stderr,
            )
            return 1
        print(f"Plugin index OK ({INDEX_PATH})")
        return 0

    index_file.write_text(output, encoding="utf-8")
    print(f"Wrote {INDEX_PATH}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
