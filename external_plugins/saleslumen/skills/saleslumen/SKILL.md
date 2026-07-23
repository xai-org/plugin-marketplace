---
name: saleslumen
description: >-
  Overview of Saleslumen MCP for Grok: OAuth linking, whoami, organizations,
  and which tools cover Campaigns, Emails, Workflows, and Apps Script.
  Use when the user mentions Saleslumen, saleslumen MCP, or asks to connect
  Grok to Saleslumen.
---

# Saleslumen

Saleslumen products exposed through MCP: **Workflows**, **Emails**, **Campaigns**, and **Apps Script**. This plugin connects Grok to the hosted MCP server at `https://mcp.saleslumenapis.com/`.

## Before any tool call

1. Ensure the Saleslumen MCP server is linked (OAuth). If tools return unauthorized, re-link.
2. Call `whoami` to confirm the authenticated user (`sub`), organization (`sl_organization_id`), audience, and scopes.
3. Call `list_my_organizations` when the user needs to verify or switch org context (org is selected during OAuth consent).

Prefer confirming identity with `whoami` before destructive actions (delete, send, publish, cancel).

## Products and tools

| Product | Tool prefix | Use for |
| --- | --- | --- |
| Identity | `whoami`, `list_my_organizations` | Auth check, org membership |
| Campaigns | `campaigns_*` | Campaigns, people, sequences, steps, variables, metrics, tasks |
| Emails | `emails_*` | Messages, threads, labels, drafts, accounts, discover |
| Workflows | `workflows_*` | Definitions, versions, publish, executions |
| Apps Script | `apps_script_*` | Projects, content, versions, deployments, run |

Use the specialized skills when the task is product-specific:

- Campaigns / sequences / people → `saleslumen-campaigns`
- Emails (inbox, drafts, send, discover) → `saleslumen-emails`

## Auth model (what Grok should know)

- MCP tokens are minted for audience `https://mcp.saleslumenapis.com`.
- The MCP server exchanges them for API-audience tokens before calling Saleslumen APIs.
- Do not ask the user for API keys for this connector; OAuth is the supported path.
- Sign-in uses the user's Saleslumen browser session. Wrong user → sign out of `app.saleslumen.com`, sign in as the right user, then re-link.

## Safety

- Confirm before send, delete, trash, publish, or cancel operations.
- Prefer list/get tools to gather IDs before mutating.
- Stay inside the authenticated organization; do not invent org or resource IDs.

## Links

- Product: https://www.saleslumen.com
- App: https://app.saleslumen.com
- MCP: https://mcp.saleslumenapis.com/
- OAuth issuer: https://oauth.saleslumenapis.com
