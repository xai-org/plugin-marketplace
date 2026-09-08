---
name: workspaces
description: List, confirm, or switch the MosoFin workspace for this conversation (maps to the list_workspaces MCP tool). Use when the user asks which workspaces they have, wants to work in a specific workspace, or wants to switch or add workspaces mid-chat.
allowed-tools:
  - mcp__plugin_mosofin_mosofin__list_workspaces
---

# Workspaces — discover and confirm

Wraps the server's `list_workspaces` tool: the mandatory first gate before any
MosoFin data or skill tool. Full spec: `docs/mcp-tool-spec.md` §3.1.

## If MosoFin tools are missing

If `list_workspaces` is not in this session's tool list, or a call returns
`Unknown tool` (e.g. `mosofin.list_workspaces` or
`codex_apps/mosofin.list_workspaces`): the MosoFin **connector is not
connected or not enabled for this chat**. That is not a data-source reconnect.

- Do not invent workspaces or data.
- **Never** say "refresh/reconnect the MosoFin integration".
- Paste these setup steps, then ask them to retry `/mosofin:workspaces`:

**ChatGPT / Codex**
1. ChatGPT web → Settings → Apps & Connectors (or chatgpt.com/plugins).
2. Turn on Developer mode if adding a custom connector (Settings → Security
   and login, or Apps → Advanced settings).
3. Create or connect **MosoFin**:
   - Name: `MosoFin`
   - MCP server URL: `https://mcp.mosofin.com/mcp`
   - Authentication: OAuth
4. Complete MosoFin sign-in.
5. Start a **new** chat, turn the MosoFin app/connector **on**, then retry.

**Claude Code:** `/plugin marketplace add mosofin/mosofin-mcp-plugin` then
`/plugin install mosofin@financehub`, sign in, retry.

**Grok Build:** install `mosofin` from the xAI plugin marketplace, sign in, retry.

## Steps

1. Call `list_workspaces` with no arguments (discovery).
2. Outcomes:
   - **0 workspaces** — relay the server message; stop.
   - **1 workspace** — auto-confirms server-side. Read the name back and wait
     for an explicit yes before any data tool runs.
   - **2+ workspaces** (`selection_required`) — ask whether the task is
     single- or multi-workspace, then which workspace(s) **by name**. Never
     auto-pick. Confirm with
     `list_workspaces(workspace_ids=[…], mode="single"|"multi")`.
3. To switch or add a workspace later, re-run the same confirm call with the
   new selection.

## Rules

- Refer to workspaces by **name** (and role) only. Never show integer tenant
  ids; show a `ws_…` handle only if the user asks for a machine reference.
- The server is stateless: every later tool call must carry the confirmed
  `ws_…` handle as `workspace_id`. In multi mode, each call takes **one**
  handle — pick the relevant one per call.
- After confirmation, continue with `/mosofin:connections`,
  `/mosofin:list-tools`, or `/mosofin:query-workspace`.
