# MosoFin plugin contract

This plugin talks to the **existing remote MosoFin MCP server**. It does not
bundle or spawn that server. Keep tool names, handles, and call order stable —
plugin skills hardcode the host-namespaced tool ids below.

**Full per-tool spec (arguments, response shapes, errors, worked examples):**
[`mcp-tool-spec.md`](./mcp-tool-spec.md). Read that document before calling
tools. This contract is the short stability/auth summary.

## Endpoints

| Environment | MCP URL (Streamable HTTP) | Auth |
|-------------|---------------------------|------|
| Production | `https://mcp.mosofin.com/mcp` | OAuth 2.0 DCR + PKCE at `https://auth.mosofin.com` |
| Staging / local tunnel | Not via the plugin — add the tunnel URL as a separate MCP server in your host (or `MOSOFIN_MCP_URL` on the server side) | Same OAuth; metadata must advertise the URL currently served |

The MCP host (Claude Code, Grok Build, ChatGPT, …) registers itself as an
OAuth client through dynamic client registration. The plugin ships **no** client
id, client secret, or JWT keys.

## Live `tools/list` names

FastMCP registers **bare function names** (no `mosofin_` prefix). Branding is
the server name `MosoFin`.

| Tool | Kind | Role |
|------|------|------|
| `list_workspaces` | Read | Discover and confirm workspace(s). Always safe first. |
| `get_agent_datasources` | Read | Live connections in the confirmed workspace (`connected`, `data_source_id`). |
| `get_datasource_tools` | Read | Catalog of allowed API operations for a datasource. |
| `invoke_datasource_api_tool` | Read | Execute one approved read operation. |
| `get_skills` | Read | List saved skills in the confirmed workspace. |
| `get_my_skill` | Read | Fetch a skill bundle after the user names it and says yes. |
| `create_skill` | Additive write | Persist a proven workflow. Requires post-results consent. |

Parked / do not call: `get_agents`, `update_skill`, goal-session tools
(`start_goal`, `clarify_goal`, …).

### Host-namespaced ids

Plugin `name` is `mosofin`; MCP server key is `mosofin`. Callable tool ids as
namespaced by the plugin host (Claude Code form shown):

```
mcp__plugin_mosofin_mosofin__list_workspaces
mcp__plugin_mosofin_mosofin__get_agent_datasources
mcp__plugin_mosofin_mosofin__get_datasource_tools
mcp__plugin_mosofin_mosofin__invoke_datasource_api_tool
mcp__plugin_mosofin_mosofin__get_skills
mcp__plugin_mosofin_mosofin__get_my_skill
mcp__plugin_mosofin_mosofin__create_skill
```

In Claude Code the server itself shows as `plugin:mosofin:mosofin` in `/mcp`.

## Required call order

1. `list_workspaces` with no args (discovery).
2. User picks workspace(s) **by name**. Confirm with
   `list_workspaces(workspace_ids=[…], mode="single"|"multi")`.
3. Auto-confirm happens only when the user has exactly one accessible workspace.
4. Then `get_agent_datasources` and/or `get_datasource_tools`.
5. Then `invoke_datasource_api_tool` (multiple calls may run in parallel).
6. Optional: `get_skills` → user yes → `get_my_skill(confirmed="yes")` to replay.
7. Optional: after results exist and the user consents, `create_skill(confirmed="yes")`.

Pass opaque `ws_…` handles and `data_source_id` hashids. Never integer tenant
or datasource primary keys. This server is stateless: pass `workspace_id` and
`data_source_id` on every follow-up invoke.

When several companies are live for one platform, ask which `display_name` to
use and pass that row's `data_source_id`. Invoking without a choice returns
`entity_required`.

## Error envelopes

| Signal | What to do |
|--------|------------|
| `Unknown tool` / MosoFin tools missing from the session | Connector not enabled for this chat. Never say refresh/reconnect. Give ChatGPT/Codex setup: Apps & Connectors → MosoFin at `https://mcp.mosofin.com/mcp` + OAuth → new chat with app on. |
| `Workspace not confirmed for this chat` | Confirm via `list_workspaces(workspace_ids=…, mode=…)` then retry. |
| `datasource_not_active` / `connection_unavailable` plus `reconnect_url` | Tell the user to open that URL and reconnect. Do not invent data. |
| `entity_required` with `entities[]` | Ask which company; retry with that `data_source_id`. |
| `invalid_params` (missing `start_date` / `end_date`) | Resolve relative dates to `YYYY-MM-DD` and retry. |
| `approval_required` | Re-invoke with `approved=true` only after the user consents. |
| `tool_policy_disabled` | Do not retry that operation; explain it is blocked. |
| valid-access refusal | Treat as unknown/invalid workspace. Do not leak data. |

## Grounding

Answer only from `invoke_datasource_api_tool` results in this conversation.
End data-backed answers with a single **Data sources** line (datasource +
`fetched_at`). If the fetch does not cover part of the question, say so.

## Elicitation caveat (all hosts)

Production MCP runs **stateless + JSON**. Native workspace / datasource /
consent pickers degrade to conversational envelopes. That is expected. Ask in
chat, then pass the chosen handles and `confirmed="yes"` / `approved=true`
explicitly.

## Stability

Do not rename these tools without bumping this plugin. Skills hardcode the
namespaced ids above.
