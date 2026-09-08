---
name: list-tools
description: Show which MosoFin API operations are available for a connected datasource and their policy (maps to the get_datasource_tools MCP tool). Use when the user asks what data can be pulled, which financial data operations exist, or whether an operation is allowed.
allowed-tools:
  - mcp__plugin_mosofin_mosofin__list_workspaces
  - mcp__plugin_mosofin_mosofin__get_agent_datasources
  - mcp__plugin_mosofin_mosofin__get_datasource_tools
---

# List datasource tools

Wraps the server's `get_datasource_tools` tool: the catalog of allowed
**read** operations plus effective policy. This is the only discovery path —
inner operations like `search_invoices` are never top-level MCP tools, and a
`tool_name` must never be invented. Full spec: `docs/mcp-tool-spec.md` §3.3.

## If MosoFin tools are missing

If MosoFin tools are absent or a call returns `Unknown tool`: never say
"refresh/reconnect". Give ChatGPT/Codex setup: Settings → Apps & Connectors
→ create MosoFin at `https://mcp.mosofin.com/mcp` with OAuth → sign in → new
chat with MosoFin on. Claude Code / Grok Build: install `mosofin@financehub`. Do not invent
catalog entries.

## Steps

1. Confirm workspace via `list_workspaces` if this chat has not already.
2. If the platform has more than one connected company file
   (`get_agent_datasources`), ask which by `display_name` and pass its
   `data_source_id` — required, or the listing may not match.
3. Call `get_datasource_tools` with `workspace_id`, `datasource`
   (e.g. `quickbooks`), and `data_source_id` when multi-entity.
4. Present `api_tools[]` grouped by purpose (reports / search / get-by-id),
   with each tool's description and policy:
   - `enabled` — invocable now
   - `permission` — invocable; first call returns `approval_required` and
     needs a user yes before re-invoking with `approved=true`
   - `disabled` — blocked; do not invoke
5. The listing is empty when there is no ACTIVE connection — route to
   `/mosofin:connections` for reconnect guidance.

Write operations never appear: MosoFin is read-only by product boundary.
To actually run an operation, continue with `/mosofin:run-tool` or
`/mosofin:query-workspace`.
