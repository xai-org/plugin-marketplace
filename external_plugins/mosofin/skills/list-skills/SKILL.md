---
name: list-skills
description: List the user's saved MosoFin skills in the confirmed workspace (maps to the get_skills MCP tool). Use when the user asks what skills they have saved, whether a workflow exists, or before choosing a skill to replay.
allowed-tools:
  - mcp__plugin_mosofin_mosofin__list_workspaces
  - mcp__plugin_mosofin_mosofin__get_skills
---

# List saved skills

Wraps the server's `get_skills` tool. Skills are private to the caller and
scoped per workspace — a skill saved in workspace A is not listed in B.
Full spec: `docs/mcp-tool-spec.md` §3.5.

## If MosoFin tools are missing

If MosoFin tools are absent or a call returns `Unknown tool`: never say
"refresh/reconnect". Give ChatGPT/Codex setup: Settings → Apps & Connectors
→ create MosoFin at `https://mcp.mosofin.com/mcp` with OAuth → sign in → new
chat with MosoFin on. Claude Code / Grok Build: install `mosofin@financehub`. Do not invent
saved skills.

## Steps

1. Confirm workspace via `list_workspaces` if this chat has not already.
2. Call `get_skills` with the confirmed `workspace_id`.
3. Present each skill by **name** with its description, datasources, and
   whether it is enabled. Show `skill_id` only if the user asks for a machine
   handle. Ignore `dashboard_slug` — legacy; never route to `show_*` tools.
4. Next steps:
   - To replay one: `/mosofin:replay-skill` (requires an explicit yes first).
   - Empty list or no match: answer the underlying question directly via
     `/mosofin:query-workspace`, and offer `/mosofin:save-skill` afterwards.

Never auto-replay a skill because its name looked close to the request.
