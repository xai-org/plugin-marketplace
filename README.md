# xAI Plugin Marketplace

The official catalog of plugins for Grok Build. This repo is an index that points at plugin sources so Grok Build can browse, install, and update them.

> [!WARNING]
> Third-party plugins listed here or other third-party materials are solely developed or provided by their respective authors, not xAI. xAI does not author, control, endorse, or verify third-party plugins or materials, makes no guarantees about their security, functionality, fitness, content, outputs, or data practices for any purpose, and disclaims all liability for any damages, losses, claims, or harms related to your use of any third-party plugins or materials. xAI provides plugins or materials AS-IS, without any express or implied warranties, and plugins or materials may execute code and access data on your system — install and use them at your own risk. Each plugin is governed by its own license and terms. xAI has its own [Terms of Service](https://x.ai/legal/terms-of-service) and [Privacy Policy](https://x.ai/legal/privacy-policy).

## Repo layout

| Path | Purpose |
|---|---|
| `.grok-plugin/marketplace.json` | The catalog index — the source of truth |
| `.grok-plugin/plugin-index.json` | Generated component catalog — never hand-edit |
| `plugins/` | First-party plugins owned and maintained by xAI |
| `external_plugins/` | Third-party plugins |

Every plugin must have a corresponding entry in `.grok-plugin/marketplace.json`. A plugin's ownership determines where it lives:

- **First-party** (`plugins/`) — plugins authored and maintained by xAI, vendored in this repo.
- **Third-party** (`external_plugins/`) — plugins owned by an external party. Vendor a local copy here, or reference the upstream repo directly with a remote source (see below).

## What a plugin is

A plugin is a directory bundling any combination of:

| Component | Location | Purpose |
|---|---|---|
| Skills | `skills/` | `SKILL.md` capabilities |
| Commands | `commands/` | Slash commands |
| Agents | `agents/` | Subagent definitions |
| Hooks | `hooks/hooks.json` | Lifecycle hooks |
| MCP servers | `.mcp.json` | MCP server configs |
| LSP servers | `.lsp.json` | Language server configs |

An optional `plugin.json` manifest adds metadata or overrides component paths.

## Catalog format

`.grok-plugin/marketplace.json`:

```json
{
  "name": "my-marketplace",
  "description": "Short description of this marketplace",
  "owner": { "name": "My Org" },
  "plugins": []
}
```

Each entry in `plugins`:

| Field | Required | Description |
|---|---|---|
| `name` | yes | kebab-case plugin id |
| `source` | yes | Where to fetch the plugin (see below) |
| `description` | recommended | Shown when browsing |
| `category` | no | e.g. `development`, `deployment`, `monitoring` |
| `homepage` | no | Project URL |
| `keywords` | no | Terms that suggest this plugin for a request |
| `domains` | no | Hosts/URLs that suggest this plugin when pasted |
| `version`, `author`, `tags` | no | Display metadata |

### Source types

Both source types are just an entry appended to the `plugins` array in `.grok-plugin/marketplace.json` — that single file is the only catalog. The `source` field decides where the plugin's actual files come from.

**Remote** — references an upstream repo, pinned to a full commit SHA. Common for third-party plugins. Nothing is vendored in this repo: the plugin's own files (its `plugin.json`, `skills/`, etc.) live in the upstream repo and are cloned at install time. You only add the catalog entry:

```json
{
  "name": "my-plugin",
  "description": "What the plugin does.",
  "category": "development",
  "source": {
    "source": "url",
    "url": "https://github.com/my-org/my-plugin.git",
    "sha": "0000000000000000000000000000000000000000"
  },
  "homepage": "https://github.com/my-org/my-plugin",
  "keywords": ["my-plugin"],
  "domains": ["example.com"]
}
```

**Local** — the plugin's files are vendored in this repo under `plugins/<name>/` (first-party) or `external_plugins/<name>/` (third-party), and `source.path` points to that directory:

```json
{
  "name": "my-plugin",
  "source": { "type": "local", "path": "./plugins/my-plugin" }
}
```

### SHA pinning (required for remote sources)

Every `url` source must pin a full 40-character lowercase commit `sha`. Without a pin, a vendor force-push or repo compromise would silently ship new code to everyone who installs or updates the plugin. Grok Build re-verifies `git rev-parse HEAD == sha` after cloning.

Find the commit to pin:

```bash
git ls-remote https://github.com/my-org/my-plugin.git HEAD
```

## Plugin component index

`.grok-plugin/plugin-index.json` lists what each plugin provides (skills, commands, agents, MCP servers, hooks, LSP servers) so clients can show plugin contents before install. It is **generated — never hand-edit it**. After adding or updating a plugin entry, regenerate it:

```bash
python3 scripts/generate-plugin-index.py
```

CI runs `python3 scripts/generate-plugin-index.py --check` and fails if the committed file is stale. Generation fetches each pinned remote source (with retries), so CI depends on the upstream repos being reachable — by design, a missing pinned commit fails loudly rather than going silently stale. For remote sources the index records the pinned `sha` it was generated from; clients ignore index data whose `sha` no longer matches the catalog entry.

## Add or update a plugin

1. Place first-party plugins in `plugins/` and third-party plugins in `external_plugins/` (local sources), or reference an upstream repo with a remote source.
2. Add or edit the entry in `.grok-plugin/marketplace.json`.
3. For remote sources, set `sha` to the exact commit you want to ship.
4. Regenerate the component index and validate locally:
   ```bash
   python3 scripts/generate-plugin-index.py
   python3 scripts/validate-catalog.py
   ```
5. Open a PR. CI runs the validator and code-owner review is required.

To roll out a plugin update, bump its `sha` (remote) or commit the changes (local).
