---
name: connections
description: Show which company files and data sources are connected to a MosoFin workspace and their status (maps to the get_agent_datasources MCP tool). Use when the user asks what's connected, which companies are linked, whether a data source is working, or needs to reconnect a data source.
allowed-tools:
  - mcp__plugin_mosofin_mosofin__list_workspaces
  - mcp__plugin_mosofin_mosofin__get_agent_datasources
---

# Connection status

Status-only path; fetches no accounting data. Same contract as
`/mosofin:query-workspace`. Full spec: `docs/mcp-tool-spec.md`.

## If MosoFin tools are missing

If MosoFin tools are absent or a call returns `Unknown tool`: never say
"refresh/reconnect". Give ChatGPT/Codex setup: Settings → Apps & Connectors
→ create MosoFin at `https://mcp.mosofin.com/mcp` with OAuth → sign in → new
chat with MosoFin on. Claude Code / Grok Build: install `mosofin@financehub`. Do not invent
status. A disconnected company file is a different problem (`reconnect_url`).

## Steps

1. Confirm workspace via `list_workspaces` if this chat has not already.
2. `get_agent_datasources` for the confirmed `workspace_id`.
3. Report each company file by `display_name` with its platform and whether it
   is connected (`connected: true` iff status ACTIVE). Never show raw
   `data_source_id` values or integer ids.
4. For a disconnected source: reconnecting happens in the MosoFin workspace
   data-sources page, or via the `reconnect_url` a data fetch error returns.
   Do not attempt data calls against a disconnected source, and never invent
   numbers for it.

If the user then wants data from a connected company, continue with
`/mosofin:list-tools`, `/mosofin:run-tool`, or `/mosofin:query-workspace`.
