# MosoFin MCP tool spec — for the mosofin-plugin code agent

> **Audience:** The plugin agent in `mosofin-mcp-plugin` — Claude Code, Grok
> Build, or any MCP host (skills
> `/mosofin:query-workspace` and `/mosofin:save-skill`).
> **Source of truth:** Live `@mcp.tool()` handlers in this MCP server repo
> (`app/mcp/tools.py`, `app/mcp/skills/tools.py`). Locked by
> `tests/mcp/test_demo_tools.py`.
> **Last verified:** 2026-08-13 against the 7-tool registered surface.
> **Product name:** **MosoFin**. FastMCP server name is still `Mosofin`.

This document tells the plugin agent **exactly which MCP tools exist, when to
call them, what to pass, what comes back, and what never to do**. Plugin skills
hardcode host-namespaced ids; the MCP server registers **bare function
names**.

Companion (short): [`plugin-contract.md`](./plugin-contract.md).
Canonical copy also lives in the MCP server repo as
`docs/mosofin-plugin-agent-mcp-tool-spec.md`. Keep both in sync when tools change.

---

## 0. How to use this spec

| You want… | Do this |
|-----------|---------|
| Answer a books / P&L / invoice question | Follow **Workflow A** then call `invoke_datasource_api_tool` |
| List or replay a saved skill | Follow **Workflow B** |
| Save a proven workflow | Follow **Workflow C** (consent after results) |
| Discover inner data-source operations | `get_datasource_tools` — never invent `tool_name` |
| Recover from an error | Jump to [§8 Error catalog](#8-error-catalog) |

**Hard rule:** Call only the 7 live tools. Do not call parked tools
(`get_agents`, `update_skill`, `start_goal`, `clarify_goal`,
`generate_goal_brief`, `confirm_completion`, `choose_session_direction`,
`upload_skill`, `get_my_skill_resource`, `show_*`).

---

## 1. Transport, auth, naming

### 1.1 Endpoint

| Env | MCP URL (Streamable HTTP) |
|-----|---------------------------|
| Production | `https://mcp.mosofin.com/mcp` |
| Staging / tunnel | Add as a separate MCP server in your host; the plugin ships production only |

OAuth 2.0 DCR + PKCE. The plugin ships **no** client id, secret, or JWT keys.
The MCP host registers itself. First use opens a browser.

Every `tools/call` carries `Authorization: Bearer <access_token>`. Identity
(`user_id`) and optional workspace claims come from the JWT. Never pass
credentials as tool arguments.

Production MCP is **stateless + JSON**. Native elicit pickers often do not
appear. Ask in chat, then pass handles / `confirmed="yes"` / `approved=true`
explicitly.

### 1.2 Registered names vs host-namespaced ids

FastMCP registers **bare names** (no `mosofin_` prefix). Plugin hosts such as
Claude Code and Grok Build namespace
them because plugin `name` = `mosofin` and MCP server key = `mosofin`.

| MCP `tools/list` name | Host callable id |
|-----------------------|-------------------------|
| `list_workspaces` | `mcp__plugin_mosofin_mosofin__list_workspaces` |
| `get_agent_datasources` | `mcp__plugin_mosofin_mosofin__get_agent_datasources` |
| `get_datasource_tools` | `mcp__plugin_mosofin_mosofin__get_datasource_tools` |
| `invoke_datasource_api_tool` | `mcp__plugin_mosofin_mosofin__invoke_datasource_api_tool` |
| `get_skills` | `mcp__plugin_mosofin_mosofin__get_skills` |
| `get_my_skill` | `mcp__plugin_mosofin_mosofin__get_my_skill` |
| `create_skill` | `mcp__plugin_mosofin_mosofin__create_skill` |

In examples below, `name` is the **MCP registered name**. In a plugin host, use
the namespaced id.

### 1.3 Identity and handles (never leak internals)

| Kind | Format | Show to user? | Pass between tools? |
|------|--------|---------------|---------------------|
| Workspace | opaque `ws_…` handle | **Name only** (`Acme Consulting`) | Yes — `workspace_id` |
| Company file / entity | opaque `data_source_id` hashid | **display_name only** (`Acme Beauty LLC`) | Yes — `data_source_id` |
| Skill | opaque `skill_id` hashid | **Skill name** | Yes — `skill_id` |
| Tenant / datasource integer PK | `48`, `5`, … | **Never** | Never |

This server is **stateless**. Pass `workspace_id` (and `data_source_id` when
multi-entity) on **every** follow-up call, including retries.

### 1.4 Read-only product boundary

MosoFin cannot create, update, send, or delete records in any connected
accounting platform or other SaaS. Write-capable catalog operations are filtered out before policy.
`create_skill` is the only additive write: it saves a **private skill bundle**,
not accounting data.

Annotations (host review):

| Tool | readOnly | openWorld | destructive |
|------|----------|-----------|-------------|
| `list_workspaces` | true | false | false |
| `get_agent_datasources` | true | false | false |
| `get_datasource_tools` | true | false | false |
| `invoke_datasource_api_tool` | true | false | false |
| `get_skills` | true | false | false |
| `get_my_skill` | true | false | false |
| `create_skill` | **false** | false | false |

`invoke_datasource_api_tool` **reads** live SaaS; it does not change third-party
state. `openWorldHint` is therefore false.

### 1.5 Grounding

Answer numbers **only** from `invoke_datasource_api_tool` results in **this**
conversation. Check `mock`: `false` = live; `true` = fixture. End data-backed
answers with one **Data sources** line (datasource + tool + `fetched_at` from
`provenance`). If the fetch does not cover part of the question, say so.

---

## 2. Required call order

```
list_workspaces()                    # discovery — always first
  └─ if 2+ workspaces: ask name(s), then
     list_workspaces(workspace_ids=[…], mode="single"|"multi")
  └─ if exactly 1: auto-confirmed

get_agent_datasources(workspace_id)  # which companies are live
  └─ if 2+ connected rows for one platform: ask by display_name

get_datasource_tools(...)            # optional — valid tool_name + policy
invoke_datasource_api_tool(...)      # data. May run several in parallel

optional: get_skills → user yes → get_my_skill(confirmed="yes")
optional: after results + fresh yes → create_skill(confirmed="yes")
```

**The only workflow gate before data tools is workspace confirmation.**
`get_skills` is optional discovery; invoke does **not** require it.

---

## 3. Live tools — full spec

### 3.1 `list_workspaces`

**Role:** Root tool. Discover and confirm workspace(s). Always safe first.
**Prerequisites:** Authenticated user. No prior tool call.
**Source:** `app/mcp/tools.py`

#### Arguments

| Field | Req | Default | Meaning |
|-------|-----|---------|---------|
| `workspace_id` | O | `""` | Legacy singular `ws_…` handle. Prefer `workspace_ids`. |
| `workspace_ids` | O | `null` | Opaque handles to confirm after the user picks. One for `mode=single`; two or more for `mode=multi`. |
| `mode` | O | `""` | `"single"` or `"multi"`. Required when confirming. Empty on the discovery call. |

#### Behavior

1. First call with no confirm args:
   - **0 workspaces** → empty list + message.
   - **1 workspace** → auto-confirm, `status: "confirmed"`.
   - **2+ workspaces** → `status: "selection_required"`. Ask in chat:
     single- vs multi-workspace, then which name(s). Then call again with
     `workspace_ids` + `mode`.
2. Confirm call validates membership, then records confirmation for this chat.

#### Success shapes

**Discovery, multiple workspaces:**

```json
{
  "name": "list_workspaces",
  "arguments": {}
}
```

```json
{
  "status": "selection_required",
  "mode": null,
  "workspaces": [
    { "workspace_id": "ws_RVKLMvq", "name": "Acme Consulting", "role": "admin" },
    { "workspace_id": "ws_8kP2nQx", "name": "Beta Retail", "role": "member" }
  ],
  "confirmed_workspaces": [],
  "confirmed_workspace": null,
  "message": "Ask whether this task is single- or multi-workspace, then which workspace(s) by name."
}
```

**Confirm single:**

```json
{
  "name": "list_workspaces",
  "arguments": {
    "workspace_ids": ["ws_RVKLMvq"],
    "mode": "single"
  }
}
```

```json
{
  "status": "confirmed",
  "mode": "single",
  "workspaces": [ { "workspace_id": "ws_RVKLMvq", "name": "Acme Consulting", "role": "admin" } ],
  "confirmed_workspaces": [ { "workspace_id": "ws_RVKLMvq", "name": "Acme Consulting", "role": "admin" } ],
  "confirmed_workspace": { "workspace_id": "ws_RVKLMvq", "name": "Acme Consulting", "role": "admin" },
  "message": "Workspace confirmed (single): Acme Consulting.",
  "next_action": "Use get_skills to check for saved skills, get_datasource_tools / get_agent_datasources, then invoke_datasource_api_tool."
}
```

**Auto-confirm (user has exactly one workspace):** same `status: "confirmed"`
shape without a second call. Still **read the name back** and wait for an
explicit yes before invoking data tools.

#### Agent rules

- Speak workspaces by **name** only.
- Never auto-pick the first row when several exist.
- After confirm, pass that `ws_…` handle as `workspace_id` on every later tool.
- Multi mode: each later call still takes **one** `workspace_id` — pick the
  relevant confirmed handle per call.

---

### 3.2 `get_agent_datasources`

**Role:** Live “what is actually connected” list of company files.
**Prerequisites:** Workspace confirmed.
**Source:** `app/mcp/tools.py`

This is the counterpart to `get_datasource_tools` (static “what is possible”).

#### Arguments

| Field | Req | Default | Meaning |
|-------|-----|---------|---------|
| `workspace_id` | O* | `""` | Confirmed `ws_…`. Empty → JWT claim → elicit. Pass it anyway (stateless). |
| `agent_id` | O | `""` | Best-effort filter (`bea`, …). Omit for the full tenant list. Unlinked/retired rows always stay visible. |

#### Result fields (`datasources[]`)

| Field | Type | User-visible? |
|-------|------|----------------|
| `data_source_id` | opaque hashid | **No** — pass to invoke |
| `connector_key` | e.g. `quickbooks` | Internal / for `datasource=` |
| `display_name` | string | **Yes** |
| `status` | e.g. `ACTIVE` | Optional |
| `connected` | bool | **Yes** (`true` iff ACTIVE) |
| `external_datasource_id` | string \| null | No |
| `agent_slug` | string \| null | No; null = unlinked/retired |

#### Example

```json
{
  "name": "get_agent_datasources",
  "arguments": { "workspace_id": "ws_RVKLMvq" }
}
```

```json
{
  "workspace_id": "ws_RVKLMvq",
  "workspace_name": "Acme Consulting",
  "agent_id": null,
  "datasources": [
    {
      "data_source_id": "ds_9fK2ab",
      "connector_key": "quickbooks",
      "display_name": "Acme Beauty LLC",
      "status": "ACTIVE",
      "connected": true,
      "external_datasource_id": "934145123456",
      "agent_slug": "bea"
    },
    {
      "data_source_id": "ds_3mLp0q",
      "connector_key": "quickbooks",
      "display_name": "Acme UK Ltd",
      "status": "ACTIVE",
      "connected": true,
      "external_datasource_id": "934145654321",
      "agent_slug": "bea"
    }
  ]
}
```

#### Agent rules

- Two connected rows for one platform → **ask which company by display_name**. Do not
  invoke until they choose. Pass that row’s `data_source_id` on every later
  `get_datasource_tools` and `invoke_datasource_api_tool`.
- Exactly one connected row for the platform → use it; naming it in the answer
  is enough.
- `connected: false` → stop for that platform. Do not invent numbers. A later
  invoke error may include `reconnect_url`.
- To compare companies, invoke **once per company** and label each result.

---

### 3.3 `get_datasource_tools`

**Role:** Catalog of allowed **read** API operations + effective policy for one
datasource (and company file when multi-entity).
**Prerequisites:** Workspace confirmed. Agent must be permitted for the
datasource. Listing is **empty** if there is no ACTIVE connection.
**Source:** `app/mcp/tools.py`

Inner API tools (e.g. `search_invoices`) are **never** top-level MCP tools.
This is the only discovery path.

#### Arguments

| Field | Req | Default | Meaning |
|-------|-----|---------|---------|
| `workspace_id` | O* | `""` | Confirmed `ws_…`. |
| `agent_id` | O | `""` | e.g. `bea`. Defaults from datasource (`quickbooks` → `bea`) or `bea`. |
| `datasource` | O | `""` | Platform id, e.g. `quickbooks`. Empty elicits a picker. |
| `data_source_id` | O* | `""` | Required when the workspace has **more than one** live connection for this platform. |

#### Result

| Field | Meaning |
|-------|---------|
| `api_tools[].name` | Pass as `tool_name` to invoke (`get_profit_and_loss`) |
| `api_tools[].qualified_name` | `quickbooks.get_profit_and_loss` |
| `api_tools[].description` | When to use |
| `api_tools[].effective_policy` | `enabled` \| `permission` \| `disabled` |

Policy:

- `enabled` — call invoke.
- `permission` — still callable; first invoke returns `approval_required`;
  re-invoke with `approved=true` after the user says yes.
- `disabled` — do not invoke.

Writes are already hidden. Only read-only operations appear.

#### Example

```json
{
  "name": "get_datasource_tools",
  "arguments": {
    "workspace_id": "ws_RVKLMvq",
    "datasource": "quickbooks",
    "data_source_id": "ds_9fK2ab"
  }
}
```

```json
{
  "workspace_id": "ws_RVKLMvq",
  "agent_id": "bea",
  "datasource_id": "quickbooks",
  "datasource_name": "QuickBooks Online",
  "api_tools": [
    {
      "name": "get_profit_and_loss",
      "qualified_name": "quickbooks.get_profit_and_loss",
      "description": "Generate a Profit and Loss report. Requires start_date and end_date.",
      "effective_policy": "enabled"
    },
    {
      "name": "search_invoices",
      "qualified_name": "quickbooks.search_invoices",
      "description": "Search invoices. Requires start_date and end_date.",
      "effective_policy": "enabled"
    }
  ]
}
```

---

### 3.4 `invoke_datasource_api_tool`

**Role:** The **only data-egress tool**. Runs one approved read against a
connected company file.
**Prerequisites:** Workspace confirmed. Live ACTIVE connection. Agent permit.
Policy not `disabled`.
**Source:** `app/mcp/tools.py`

Independent reads **may run in parallel** (P&L + balance sheet + aging in one
turn).

#### Arguments

| Field | Req | Default | Meaning |
|-------|-----|---------|---------|
| `datasource` | **R** | — | Platform id: `quickbooks`, … |
| `tool_name` | **R** | — | Plain catalog name from `get_datasource_tools`, e.g. `get_profit_and_loss` |
| `params` | O | `null` | JSON object of filters. Null = no filters. |
| `workspace_id` | O* | `""` | Confirmed `ws_…` — pass every time. |
| `agent_id` | O | `""` | Defaults from datasource / `bea`. |
| `data_source_id` | O* | `""` | Required when multiple live companies. Pass on **every** retry. |
| `approved` | O | `false` | `true` only after explicit user yes on a `permission` policy tool. |

#### Date rules (accounting data sources)

Resolve relative phrases **before** invoking (`last month` → concrete ISO dates).

| Kind | Tools (examples) | Required params |
|------|------------------|-----------------|
| Period reports | `get_profit_and_loss`, `get_cash_flow`, `get_trial_balance`, `get_general_ledger`, `get_customer_sales`, `get_vendor_expenses` | `start_date` **and** `end_date` (`YYYY-MM-DD`) |
| Transaction search | `search_bills`, `search_invoices`, `search_payments`, … | `start_date` **and** `end_date` |
| As-of reports | `get_balance_sheet`, `get_aged_receivables`, `get_aged_payables`, `get_customer_balance`, `get_vendor_balance` | Optional `report_date`; defaults to today |
| Get-by-id | `get_customer`, `read_invoice`, … | `id` (aliases like `customer_id` often accepted) |

Missing dates → `invalid_params` naming the field.

#### Pagination (search tools)

Result shape:

```json
{
  "rows": [ ],
  "pagination": {
    "offset": 0,
    "max_results": 100,
    "start_position": 1,
    "total_count": 240,
    "has_more": true,
    "next_offset": 100
  }
}
```

If `has_more` is true, re-invoke with `params.offset` = `pagination.next_offset`.
Omit `max_results` unless you need a smaller page (server caps / shrinks).

#### Budgets (two-step)

1. `search_budgets` — list names (optionally `include_details: false`).
2. `get_budget_details` with `budget_id` or `budget_name` — numbers for one budget.

#### Success example

```json
{
  "name": "invoke_datasource_api_tool",
  "arguments": {
    "datasource": "quickbooks",
    "tool_name": "get_profit_and_loss",
    "workspace_id": "ws_RVKLMvq",
    "data_source_id": "ds_9fK2ab",
    "params": {
      "start_date": "2026-07-01",
      "end_date": "2026-07-31",
      "accounting_method": "Accrual"
    }
  }
}
```

```json
{
  "status": "ok",
  "mock": false,
  "datasource": "quickbooks",
  "tool": "get_profit_and_loss",
  "result": { "rows": [ ], "columns": [ ] },
  "provenance": {
    "datasource": "quickbooks",
    "tool": "get_profit_and_loss",
    "params": { "start_date": "2026-07-01", "end_date": "2026-07-31" },
    "fetched_at": "2026-08-13T18:04:11Z",
    "mock": false
  }
}
```

Tell the user numbers are **live** when `mock` is false. If `mock` is true, say
the numbers are demo/fixture.

#### Gates (all must pass)

1. Agent permitted for datasource.
2. Connection `ACTIVE` (else `datasource_not_active` + `reconnect_url`).
3. Policy `enabled` or `permission` (else `tool_policy_disabled`).
4. Multi-entity: `data_source_id` required when several live companies
   (else `entity_required` + `entities[]`).

#### Agent rules

- Never set `approved=true` without a fresh explicit yes.
- Never guess a company when `entity_required` fires.
- Never fabricate P&L / invoice figures if invoke failed.
- Copy `provenance` into skill `run-recipe.json` steps if you later save.

---

### 3.5 `get_skills`

**Role:** List the **caller’s own** saved skills in the confirmed workspace.
**Prerequisites:** Workspace confirmed.
**Source:** `app/mcp/tools.py` → Django `GET /api/mcp/skills/`

Identity is `(tenant, owner, name, data_source)`. A skill saved in workspace A
is **not** listed in workspace B.

#### Arguments

| Field | Req | Default |
|-------|-----|---------|
| `workspace_id` | O* | `""` |

#### Result row

| Field | Notes |
|-------|--------|
| `skill_id` | Opaque hashid → `get_my_skill` |
| `name`, `description` | Match the user’s ask against these |
| `datasources[]`, `agents[]` | Metadata |
| `enabled`, `visibility`, `review_status`, `version` | |
| `dashboard_slug` | **Ignored legacy.** Never route to `show_*`. Replay via `get_my_skill` + `invoke_datasource_api_tool`. |

#### Example

```json
{
  "name": "get_skills",
  "arguments": { "workspace_id": "ws_RVKLMvq" }
}
```

```json
{
  "workspace_id": "ws_RVKLMvq",
  "workspace_name": "Acme Consulting",
  "skills": [
    {
      "skill_id": "sk_7hQp2",
      "name": "monthly-expense-review",
      "description": "Use when the user asks for last month's expenses by vendor.",
      "creator": "alice@acme.com",
      "agents": ["bea"],
      "datasources": ["quickbooks"],
      "enabled": true,
      "visibility": "private",
      "review_status": "none",
      "version": 1,
      "dashboard_slug": null,
      "is_incomplete": false,
      "missing_fields": []
    }
  ]
}
```

#### Agent rules

- On a confident name/description match: present the skill **by name**, wait
  for explicit yes, then `get_my_skill(skill_id, confirmed="yes")`.
- Never auto-replay.
- No match / empty list → answer via `invoke_datasource_api_tool`.

---

### 3.6 `get_my_skill`

**Role:** Fetch one owned skill bundle (SKILL.md + manifest) after consent.
**Prerequisites:** Workspace confirmed + `skill_id` + user confirmation.
**Source:** `app/mcp/skills/tools.py`

Consent is **server-enforced**. Owner-only: someone else’s / archived / unknown
id all return the **same** error (do not infer existence).

#### Arguments

| Field | Req | Default | Meaning |
|-------|-----|---------|---------|
| `skill_id` | **R** | — | Hashid from `get_skills` / `create_skill` |
| `confirmed` | O | `""` | `""` tries native elicit; `"yes"` only after explicit chat yes. Other values → `ValueError`. |
| `workspace_id` | O* | `""` | Gate **and** scope — skill must live in this workspace |
| `paths` | O | `null` | Re-fetch omitted files, e.g. `["references/run-recipe.json"]`. Pass `confirmed="yes"` on the re-call. |

Default response: metadata + always-inline `skill_md` + manifest. Small text
files may be inlined; others have `content_omitted: true` — re-call with
`paths`.

#### Example (after user said yes)

```json
{
  "name": "get_my_skill",
  "arguments": {
    "skill_id": "sk_7hQp2",
    "confirmed": "yes",
    "workspace_id": "ws_RVKLMvq"
  }
}
```

Then:

1. If `references/run-recipe.json` exists, **ask each `inputs[].ask` verbatim**
   (never silently default dates).
2. `type: "data_source"` input → `get_agent_datasources`, pick by
   `display_name`, pass as `data_source_id` on every invoke whose step has
   `"data_source_id": "{data_source_id}"`. A **literal** id in the recipe is
   pinned — use as written.
3. Execute steps in order; same `parallel_group` may batch.
4. Substitute `{workspace_id}` and collected inputs into params.
5. Replay data **only** via `invoke_datasource_api_tool`.

---

### 3.7 `create_skill`

**Role:** Persist a **proven** workflow as a reusable skill (additive write).
**Prerequisites:** Workspace confirmed + results already shown + **fresh**
post-results yes + `destination` + `files`.
**Source:** `app/mcp/skills/tools.py`

A blanket “yes, run it and save it” **before** results does **not** count.

#### Arguments

| Field | Req | Meaning |
|-------|-----|---------|
| `name` | **R** | ≥3 chars. One verb + one financial object, kebab-case: `reconcile-vendor-expenses`. Never a persona (`finance assistant`). |
| `description` | **R** | ~100 words, ≥10 chars. “Use when the user asks for …” |
| `destination` | **R** | `mosofin` \| `claude` \| `both`. Ask in chat; do not default. |
| `files` | **R** | JSON **string** mapping `{relative_path: text_content}`. Must include root `SKILL.md` with YAML frontmatter (`name`, `description`). Datasource workflows **must** include `references/run-recipe.json`. No `.html`/`.css`/`.svg`. Limits: ≤50 files, ≤1MB/file, ≤5MB total. Path traversal rejected. |
| `datasources` | O* | Comma-separated ids actually invoked, e.g. `quickbooks`. Required if the workflow called invoke. Must match recipe steps. |
| `workspace_id` | O* | Confirmed `ws_…` |
| `confirmed` | O | `"yes"` only after post-results yes |

`destination` including `mosofin` → blocking `POST /api/mcp/skills/upload/`
(45s). Failure → nothing saved + structured error.

This tool **creates a new retained version**. It does not overwrite an existing
version. (`update_skill` is parked.)

#### `files` example (the argument is a **string**)

```json
{
  "name": "create_skill",
  "arguments": {
    "name": "monthly-margin-review",
    "description": "Use when the user asks for last month's gross margin, P&L, and top expenses for a confirmed company.",
    "destination": "mosofin",
    "confirmed": "yes",
    "workspace_id": "ws_RVKLMvq",
    "datasources": "quickbooks",
    "files": "{\"SKILL.md\":\"---\\nname: monthly-margin-review\\ndescription: Use when the user asks for last month's gross margin.\\n---\\n\\n# Monthly margin review\\n\",\"references/run-recipe.json\":\"{\\\"inputs\\\":[{\\\"name\\\":\\\"start_date\\\",\\\"ask\\\":\\\"What start date (YYYY-MM-DD)?\\\"},{\\\"name\\\":\\\"end_date\\\",\\\"ask\\\":\\\"What end date (YYYY-MM-DD)?\\\"},{\\\"name\\\":\\\"data_source_id\\\",\\\"type\\\":\\\"data_source\\\",\\\"connector_key\\\":\\\"quickbooks\\\",\\\"ask\\\":\\\"Which company should this run use?\\\"}],\\\"steps\\\":[{\\\"tool\\\":\\\"invoke_datasource_api_tool\\\",\\\"datasource\\\":\\\"quickbooks\\\",\\\"tool_name\\\":\\\"get_profit_and_loss\\\",\\\"params\\\":{\\\"start_date\\\":\\\"{start_date}\\\",\\\"end_date\\\":\\\"{end_date}\\\"},\\\"data_source_id\\\":\\\"{data_source_id}\\\"}]}\"}"
  }
}
```

Success includes `skill_id`, `files_committed[]`, `version`, `destinations`.
If `claude` is in destinations, `claude_bundle` is present for local install.

---

## 4. Inner data-source operations (via invoke only)

These are **not** MCP tools. Pass them as `tool_name` after
`get_datasource_tools`. Prefer the live menu over this list; the menu is the
product owner’s source of truth and is ACTIVE-gated.

Common live accounting readers (`quickbooks` catalog snapshot; 69 read tools):

**Reports:** `get_profit_and_loss`, `get_balance_sheet`, `get_cash_flow`,
`get_trial_balance`, `get_general_ledger`, `get_aged_receivables`,
`get_aged_payables`, `get_customer_sales`, `get_customer_balance`,
`get_vendor_expenses`, `get_vendor_balance`

**Search:** `search_invoices`, `search_bills`, `search_payments`,
`search_customers`, `search_vendors`, `search_accounts`, `search_items`,
`search_journal_entries`, `search_purchases`, `search_deposits`,
`search_estimates`, `search_credit_memos`, `search_budgets`, …

**Get-by-id:** `get_company_info`, `get_customer`, `get_vendor`, `get_account`,
`read_invoice`, `read_item`, `get-bill`, `get-vendor`, …

**Budgets:** `search_budgets` then `get_budget_details`

Other catalog platforms (Stripe, Xero, Shopify, …) may still be
`mock: true` until wired live. Always check `mock` before telling the user
numbers are real. Live coverage depends on what is connected in the workspace.

---

## 5. Worked examples

### Example A — “What’s last month’s P&L for Acme?”

1. `list_workspaces()` → two workspaces. Ask single vs multi; user says Acme.
2. `list_workspaces(workspace_ids=["ws_RVKLMvq"], mode="single")`.
3. Confirm name in chat; wait for yes.
4. `get_agent_datasources(workspace_id="ws_RVKLMvq")` → two connected companies.
   Ask; user picks **Acme Beauty LLC**.
5. Optional: `get_datasource_tools(datasource="quickbooks", data_source_id="ds_9fK2ab", workspace_id="ws_RVKLMvq")`.
6. Resolve “last month” (if today is 2026-08-13) → `2026-07-01` … `2026-07-31`.
7. `invoke_datasource_api_tool` as in §3.4.
8. Answer from `result` + one Data sources line. Do not show `ws_…` or
   `ds_…` ids.

### Example B — Replay “monthly expense review”

1. Confirm workspace (§3.1).
2. `get_skills(workspace_id="ws_RVKLMvq")` → match `monthly-expense-review`.
3. “I found **monthly-expense-review**. Replay it?” → user yes.
4. `get_my_skill(skill_id="sk_7hQp2", confirmed="yes", workspace_id="ws_RVKLMvq")`.
5. Ask recipe inputs; then invoke steps.

### Example C — Save after a completed analysis

1. Workflow A already produced live results.
2. User: “Save this to my MosoFin library.”
3. Ask destination (`mosofin` / `claude` / `both`).
4. `create_skill(..., destination="mosofin", confirmed="yes", files=...)`.
5. Report the saved **name** and that a new version was created.

### Example D — User asks to create an invoice

**Do not call invoke.** MosoFin is read-only. Explain that the app cannot
create or send invoices. Offer to **search** existing invoices instead.

---

## 6. MCP Apps UI (optional, does not add tools)

When `MCP_APPS_ENABLED=true`, `list_workspaces` and `get_skills` bind

- `ui://mosofin/views/workspace-list-<hash8>`
- `ui://mosofin/views/skills-list-<hash8>`

Hosts that render MCP Apps show iframes; plugin hosts still use JSON.
**Do not** register extra tools for UI. Widget domain metadata is ChatGPT
submission-only and must not change tool logic.

---

## 7. Parallelism and routing

- After workspace confirm, batch independent invokes in one turn.
- Each invoke is still one `(datasource, tool_name, params, data_source_id)`.
- `next_allowed_tools` on some payloads is a hint, not a lock. Workspace
  confirmation is the hard gate.

---

## 8. Error catalog

| Signal | Typical fields | What the agent does |
|--------|----------------|---------------------|
| MCP `Unknown tool` / MosoFin tools missing | e.g. `mosofin.list_workspaces` | Never say refresh/reconnect. Give ChatGPT/Codex setup: Apps & Connectors → `https://mcp.mosofin.com/mcp` + OAuth → new chat with MosoFin on. |
| Workspace not confirmed | message naming `list_workspaces` | Confirm with `workspace_ids` + `mode`, retry |
| `selection_required` | `workspaces[]` | Ask names; confirm |
| `entity_required` | `entities[]` with `display_name` | Ask which company; retry with `data_source_id` |
| `datasource_not_active` / `connection_unavailable` | `reconnect_url` | Give the user that URL. Do not invent data |
| `invalid_params` | missing `start_date` / `end_date` | Compute ISO dates; retry |
| `approval_required` | pending tool | Ask; retry **same** invoke with `approved=true` |
| `tool_policy_disabled` | policy | Explain blocked; do not retry that operation |
| `UNKNOWN_TOOL` | valid names list | Pick a listed `tool_name` |
| `mock_not_implemented` | `implemented[]` | Switch to a listed tool |
| Valid-access / unknown workspace | generic | Treat as no access. Do not leak other tenants |
| `confirmed` invalid | must be `""` or `"yes"` | Ask again; then `"yes"` |
| Skill not found | same error for missing/other-owner | Do not probe existence |

---

## 9. Forbidden

- Calling parked tools listed in §0.
- Passing integer tenant or datasource primary keys.
- Showing `ws_…`, `ds_…`, or `skill_id` to the user unless they ask for a
  machine handle.
- Setting `confirmed="yes"` or `approved=true` without a **fresh** explicit yes.
- Defaulting `destination` on `create_skill`.
- Saving a skill before results exist.
- Auto-replaying a skill because the name looked close.
- Writing to any connected accounting platform, Stripe, or other SaaS.
- Answering financial figures from memory or another workspace.

---

## 10. Plugin skill mapping

| Plugin skill | MCP tools it may call |
|--------------|------------------------|
| `/mosofin:query-workspace` | `list_workspaces`, `get_agent_datasources`, `get_datasource_tools`, `invoke_datasource_api_tool` |
| `/mosofin:save-skill` | `list_workspaces`, `get_skills`, `get_my_skill`, `create_skill` |

Replay of a skill’s recipe uses **query-workspace** (`invoke_datasource_api_tool`),
not invented numbers.

---

## 11. Stability

Renaming any of the 7 tools is a breaking change for this plugin (namespaced
ids are hardcoded). If the MCP server adds/removes a tool, update:

1. `tests/mcp/test_demo_tools.py` (this repo)
2. This spec
3. `mosofin-plugin/docs/plugin-contract.md`
4. Plugin skill `allowed-tools` frontmatter
