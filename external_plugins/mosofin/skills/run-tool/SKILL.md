---
name: run-tool
description: Run one specific MosoFin catalog operation against a connected company file (maps to the invoke_datasource_api_tool MCP tool). Use when the user names an exact operation to execute (e.g. run get_profit_and_loss, call search_invoices) rather than asking an open data question.
allowed-tools:
  - mcp__plugin_mosofin_mosofin__list_workspaces
  - mcp__plugin_mosofin_mosofin__get_agent_datasources
  - mcp__plugin_mosofin_mosofin__get_datasource_tools
  - mcp__plugin_mosofin_mosofin__invoke_datasource_api_tool
---

# Run a catalog operation

Wraps the server's `invoke_datasource_api_tool` — the **only data-egress
tool**. Full spec: `docs/mcp-tool-spec.md` §3.4. For open-ended questions
("how did July look?"), prefer `/mosofin:query-workspace`.

## Steps

1. Confirm workspace (`list_workspaces`) and, when several company files are
   connected, the company by `display_name` (`get_agent_datasources`) if not
   already confirmed in this chat.
2. Verify the requested `tool_name` exists in the live catalog
   (`get_datasource_tools`) when unsure — on `UNKNOWN_TOOL`, pick from the
   valid-names list; never guess.
3. Build `params`:
   - Period reports and searches: concrete `start_date` + `end_date`
     (`YYYY-MM-DD`) — resolve relative phrases first; ask if ambiguous.
   - As-of reports: optional `report_date` (default today).
   - Get-by-id: `id`.
4. Invoke with `datasource`, `tool_name`, `params`, `workspace_id`, and
   `data_source_id` (both on **every** call and retry — the server is
   stateless). Independent invokes may batch in parallel.
5. Handle results and errors:
   - `Unknown tool` / MosoFin tools missing → never say "refresh/reconnect".
     Give ChatGPT/Codex setup: Settings → Apps & Connectors → create MosoFin
     at `https://mcp.mosofin.com/mcp` with OAuth → sign in → new chat with
     MosoFin on. No data.
   - `pagination.has_more` → re-invoke with
     `params.offset = pagination.next_offset`.
   - `approval_required` → ask the user, retry the **same** invoke with
     `approved=true`. Never pre-set it.
   - `entity_required` → ask which company from `entities[]`; retry.
   - `datasource_not_active` → give the user `reconnect_url`; no data.
   - `invalid_params` → fix the named field; retry.
   - `tool_policy_disabled` → explain; do not retry.
6. Check `mock` (live vs fixture) and end with a **Data sources** line
   (datasource + tool + `fetched_at` from `provenance`). Never fabricate
   figures on failure.
