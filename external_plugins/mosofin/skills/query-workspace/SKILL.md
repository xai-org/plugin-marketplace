---
name: query-workspace
description: Query MosoFin workspace business data (accounting platforms and other connected SaaS). Use when the user asks for P&L, invoices, cash, customers, or any live books data, or mentions MosoFin, a client workspace, or reconnecting a data source.
allowed-tools:
  - mcp__plugin_mosofin_mosofin__list_workspaces
  - mcp__plugin_mosofin_mosofin__get_agent_datasources
  - mcp__plugin_mosofin_mosofin__get_datasource_tools
  - mcp__plugin_mosofin_mosofin__invoke_datasource_api_tool
---

# Query a MosoFin workspace

Read-only path for any MosoFin data question. Call only the MCP tools listed
in frontmatter. Full per-tool spec (inputs, outputs, examples, errors):
`docs/mcp-tool-spec.md`. Short contract: `docs/plugin-contract.md`.

Host-namespaced tool ids (Claude Code / Grok Build; plugin `mosofin`, server `mosofin`):

- `mcp__plugin_mosofin_mosofin__list_workspaces`
- `mcp__plugin_mosofin_mosofin__get_agent_datasources`
- `mcp__plugin_mosofin_mosofin__get_datasource_tools`
- `mcp__plugin_mosofin_mosofin__invoke_datasource_api_tool`

Native pickers may not appear (production MCP is stateless JSON). Ask in chat,
then pass handles explicitly.

## Steps

1. Call `list_workspaces` with no arguments.
2. Show workspaces by **name** (and role). Never show integer tenant ids.
   If several exist, ask single- vs multi-workspace, then which name(s), and
   confirm with `list_workspaces(workspace_ids=[…], mode="single")` or
   `mode="multi"`. One accessible workspace auto-confirms server-side — still
   read the name back and wait for an explicit yes before invoking data tools.
3. Call `get_agent_datasources` for the confirmed `workspace_id`.
   - Refer to companies by `display_name`. Never show raw `data_source_id`.
   - If more than one row for a platform is `connected: true`, ask which
     company, then pass that `data_source_id` on every later call.
   - If the needed source is `connected: false`, stop. Tell the user to open
     the `reconnect_url` from a later error, or the MosoFin workspace
     data-sources page. Do not invent numbers.
4. Call `get_datasource_tools` for the chosen datasource (and `data_source_id`
   when required) to pick a valid `tool_name`.
5. Call `invoke_datasource_api_tool` with:
   - `datasource` (e.g. `quickbooks`)
   - `tool_name` from the catalog (e.g. `get_profit_and_loss`)
   - `workspace_id` (opaque `ws_…` handle) on **every** call
   - `data_source_id` on **every** call when the workspace has multiple companies
   - `params` with concrete `YYYY-MM-DD` dates — resolve "last month" / "this
     quarter" before invoking. Transaction searches and period reports need
     both `start_date` and `end_date`. As-of reports (`get_balance_sheet`,
     `get_aged_receivables`, …) take an optional `report_date` (default today).
     Get-by-id tools need `id`.
   Multiple independent invokes may run in parallel in one turn.

## Result handling

- **Pagination** (search tools): if `pagination.has_more` is true, re-invoke
  with `params.offset = pagination.next_offset` until complete or the user has
  enough. Omit `max_results` unless a smaller page is needed.
- **Budgets** are two-step: `search_budgets` to list names, then
  `get_budget_details` with `budget_id` or `budget_name`.
- **`mock` flag**: `false` means live numbers — say so. `true` means
  demo/fixture data — tell the user the numbers are not real.

## Read-only boundary

MosoFin cannot create, update, send, or delete records in any connected
accounting platform or other SaaS. If asked to (e.g. "create an invoice"), do not invoke — explain
the boundary and offer the read equivalent (e.g. `search_invoices`).

## Errors

- **Unknown tool / MosoFin tools missing** — connector not enabled for this
  chat. Never say "refresh/reconnect". Give ChatGPT/Codex setup: Settings →
  Apps & Connectors → create MosoFin at `https://mcp.mosofin.com/mcp` with
  OAuth → sign in → new chat with MosoFin turned on. Claude Code / Grok Build:
  install `mosofin@financehub`. Then retry. Do not invent data.
- **Workspace not confirmed** — confirm via `list_workspaces` then retry.
- **`entity_required`** — ask which company from `entities[]`; retry with that
  `data_source_id`.
- **`datasource_not_active` / `connection_unavailable`** — give the user
  `reconnect_url`. Do not guess data.
- **`invalid_params`** — fix dates/fields and retry.
- **`approval_required`** — ask the user, then retry with `approved=true`.
- **`tool_policy_disabled` / valid-access refusal** — explain; do not leak or
  invent data.

## Grounding

Answer only from invoke results in this conversation. Do not use general
knowledge or another company's memory. End data-backed answers with one
**Data sources** line (datasource + tool + `fetched_at` from `provenance`).
If the fetch does not cover part of the question, say so and name the tool
that could fetch it.
