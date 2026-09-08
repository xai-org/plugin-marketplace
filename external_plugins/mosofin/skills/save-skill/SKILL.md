---
name: save-skill
description: Save or replay a MosoFin analysis skill after results exist. Use when the user wants to keep a workflow, list saved skills, replay a named skill, or says save this to MosoFin or locally.
allowed-tools:
  - mcp__plugin_mosofin_mosofin__list_workspaces
  - mcp__plugin_mosofin_mosofin__get_skills
  - mcp__plugin_mosofin_mosofin__get_my_skill
  - mcp__plugin_mosofin_mosofin__create_skill
---

# Save or replay a MosoFin skill

Additive-write path. Never persist a skill until the user has seen the results
and explicitly says yes **again** (a blanket "run it and save it" earlier in
the chat does not count). Full per-tool spec: `docs/mcp-tool-spec.md`.
Short contract: `docs/plugin-contract.md`.

Host-namespaced tool ids (Claude Code / Grok Build; plugin `mosofin`, server `mosofin`):

- `mcp__plugin_mosofin_mosofin__list_workspaces`
- `mcp__plugin_mosofin_mosofin__get_skills`
- `mcp__plugin_mosofin_mosofin__get_my_skill`
- `mcp__plugin_mosofin_mosofin__create_skill`

Do **not** call parked tools: `update_skill`, `get_agents`, or any goal-session
tool (`start_goal`, `clarify_goal`, `generate_goal_brief`, `confirm_completion`).

Native consent pickers may not appear. Ask in chat, then pass
`confirmed="yes"` only after an explicit yes.

## If MosoFin tools are missing

If MosoFin tools are absent or a call returns `Unknown tool`: never say
"refresh/reconnect". Give ChatGPT/Codex setup: Settings → Apps & Connectors
→ create MosoFin at `https://mcp.mosofin.com/mcp` with OAuth → sign in → new
chat with MosoFin on. Claude Code / Grok Build: install `mosofin@financehub`.
Do not claim
a skill was saved.

## Workspace first

If this chat has not confirmed a workspace, call `list_workspaces` and confirm
by name (`workspace_ids` + `mode`) before any skill tool. Use opaque `ws_…`
handles only.

## Replay an existing skill

1. Call `get_skills` for the confirmed workspace.
2. Match by `name` / `description`. If nothing matches, say so and stop (or
   send the user to `/mosofin:query-workspace` to answer directly).
3. Present the candidate **by name**. Wait for an explicit yes. Never auto-replay.
4. Only then call `get_my_skill(skill_id, confirmed="yes", workspace_id=…)`.
   The response inlines `skill_md` and the manifest; files marked
   `content_omitted: true` need a re-call with `paths=[…]` and
   `confirmed="yes"` again.
5. If `references/run-recipe.json` exists, ask each `inputs[].ask` question
   **verbatim** — never silently default dates. For a `type: "data_source"`
   input, list companies by `display_name` (via query-workspace) and pass the
   chosen `data_source_id` into every step that has the
   `"{data_source_id}"` placeholder; a literal id in the recipe is pinned.
6. Execute steps in order (same `parallel_group` may batch), substituting
   `{workspace_id}` and collected inputs. Replay data only via the
   query-workspace skill (`invoke_datasource_api_tool`), never by inventing
   numbers.
7. Ignore `dashboard_slug` — it is legacy. Never route to `show_*` tools.

## Save a new skill

Prerequisites: a proven workflow already ran in this conversation (invoke
results exist) **and** the user explicitly asked to save after seeing those
results.

1. Ask where to save: `mosofin` (library), `claude` (bundle to install in this client),
   or `both`. Do not default.
2. Call `create_skill` with:
   - `name` — one verb + one financial object, kebab-case
     (`reconcile-vendor-expenses`), never a persona (`finance assistant`)
   - `description` — ~100 words, "use when the user asks for …"
   - `destination` — the choice from step 1
   - `confirmed` — `"yes"` only after the post-results yes
   - `workspace_id` — confirmed opaque handle
   - `datasources` — comma-separated ids actually invoked (required if the
     workflow called `invoke_datasource_api_tool`)
   - `files` — JSON object string of the bundle. Must include `SKILL.md` at
     the root with YAML frontmatter. If the workflow read a datasource, also
     include `references/run-recipe.json` (one step per invoke, exact params,
     `{workspace_id}` placeholder, run-time date inputs declared). No
     `.html` / `.css` / `.svg`. Limits: ≤50 files, ≤1MB/file, ≤5MB total.
3. If the tool refuses confirmation, ask again in chat and retry with
   `confirmed="yes"`. Do not set `confirmed="yes"` without a fresh yes.

Notes:

- `name` must be ≥3 chars; `description` ≥10 chars.
- A `destination` including `mosofin` runs a blocking upload (up to ~45s). On
  failure nothing is saved — report the structured error; do not claim success.
- If `claude` is among the destinations, the response includes a
  `claude_bundle` for local install — surface it to the user.
- Report the saved skill **by name** and that a new version was created.

`create_skill` is additive: it creates a new retained version. It does not
overwrite an existing skill version.
