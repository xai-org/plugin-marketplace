---
name: replay-skill
description: Fetch and replay one of the user's saved MosoFin skills after they name it and consent (maps to the get_my_skill MCP tool). Use when the user asks to run, replay, or re-use a saved skill or workflow by name.
allowed-tools:
  - mcp__plugin_mosofin_mosofin__list_workspaces
  - mcp__plugin_mosofin_mosofin__get_skills
  - mcp__plugin_mosofin_mosofin__get_my_skill
  - mcp__plugin_mosofin_mosofin__get_agent_datasources
  - mcp__plugin_mosofin_mosofin__invoke_datasource_api_tool
---

# Replay a saved skill

Wraps the server's `get_my_skill` tool (consent is server-enforced) plus
recipe execution via `invoke_datasource_api_tool`. Full spec:
`docs/mcp-tool-spec.md` §3.6.

## If MosoFin tools are missing

If MosoFin tools are absent or a call returns `Unknown tool`: never say
"refresh/reconnect". Give ChatGPT/Codex setup: Settings → Apps & Connectors
→ create MosoFin at `https://mcp.mosofin.com/mcp` with OAuth → sign in → new
chat with MosoFin on. Claude Code / Grok Build: install `mosofin@financehub`. Do not invent
skill contents or figures.

## Steps

1. Confirm workspace via `list_workspaces` if this chat has not already.
2. Find the skill with `get_skills`; match the ask against `name` /
   `description`. Present the candidate **by name** and wait for an explicit
   yes. Never auto-replay.
3. Only then call
   `get_my_skill(skill_id, confirmed="yes", workspace_id=…)`. `confirmed`
   must be `""` or `"yes"` — `"yes"` only after the explicit chat yes.
   Files marked `content_omitted: true` need a re-call with `paths=[…]` and
   `confirmed="yes"` again.
4. If `references/run-recipe.json` exists:
   - Ask each `inputs[].ask` question **verbatim** — never silently default
     dates.
   - For a `type: "data_source"` input, list companies by `display_name`
     (`get_agent_datasources`) and pass the chosen `data_source_id` into every
     step carrying the `"{data_source_id}"` placeholder. A literal id in the
     recipe is pinned — use it as written.
5. Execute steps in order (same `parallel_group` may batch), substituting
   `{workspace_id}` and collected inputs, replaying data **only** via
   `invoke_datasource_api_tool` — never invented numbers.
6. Check `mock` (live vs fixture) and end with a **Data sources** line per
   fetch.

Unknown, archived, or someone else's `skill_id` all return the same error —
report it plainly and do not probe existence.
