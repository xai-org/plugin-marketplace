# StrategyX plugin for Grok Build

Connect Grok Build to [StrategyX](https://www.strategyexe.com), the strategy execution
platform. Ask about actions, tactical projects, success factors, focus goals, KPI
trends and approvals in your company, look up people and departments, and add items
and notes, through the hosted StrategyX MCP server.

## Installation

In Grok Build, open `/plugin`, search for **StrategyX**, and install.

On first connection, Grok opens the StrategyX sign-in in your browser. Sign in with your
StrategyX account and choose the companies Grok may access. No API key is needed and
nothing should be pasted into chat. Your company administrator must switch on AI
connectors for your company first.

## What you get

**MCP server** `strategyx` at `https://mcp.strategyx.app/mcp` (Streamable HTTP, OAuth 2.1).

### Tools

| Area | Tools |
|---|---|
| Companies | `list_companies` |
| Overview & KPIs | `get_overview`, `get_kpi_report`, `list_kpi_items` |
| Strategy | `list_strategy`, `list_success_factor_reports` |
| Actions | `list_actions`, `get_action`, `complete_action` |
| Items (tactical projects, ideas, problems, discussions, risks, success factors, focus goals, strategy goals) | `list_items`, `get_item`, `add_item` |
| Notes | `list_notes`, `add_note` |
| People | `list_users`, `list_departments`, `list_positions` |
| Approvals | `list_approvals` |
| Search | `search`, `fetch` |

`complete_action`, `add_item` and `add_note` change data and act as the signed-in user.
Every other tool is read-only.

## Example prompts

- "Show my overdue StrategyX actions."
- "Which tactical projects are due this month?"
- "How is the Operations department doing against its success factors?"
- "What is waiting for my approval in StrategyX?"
- "Add a note to my first overdue action saying the supplier quote is delayed."

## Authentication and network

The plugin connects only to StrategyX hosts. Authentication is OAuth 2.1 authorization
code with PKCE and dynamic client registration; Grok handles the flow.

Network endpoints:

- `https://mcp.strategyx.app/mcp`: hosted MCP (Streamable HTTP)
- `https://mcp.strategyx.app/.well-known/oauth-protected-resource`: protected resource metadata
- `https://auth.strategyx.app/.well-known/oauth-authorization-server`: authorization server metadata
- `https://auth.strategyx.app/oauth/authorize`, `/oauth/token`, `/oauth/register`, `/oauth/revoke`: OAuth 2.1 + DCR

Scopes: `actions:read`, `actions:write`, `offline_access`.

Credentials: a StrategyX account. The access token is sent as `Authorization: Bearer`
on `/mcp`. The plugin stores no API key and requests no filesystem or shell access.
Tools act only on data the signed-in user can already see in StrategyX, in the companies
they chose when connecting.

## Support

- Website: https://www.strategyexe.com
- Support: https://www.strategyexe.com/support
- Privacy policy: https://www.strategyexe.com/privacy-policy
- Terms of use: https://www.strategyexe.com/terms-of-use

## License

Proprietary. Use of the hosted MCP server is governed by the
[StrategyX terms of use](https://www.strategyexe.com/terms-of-use) and
[privacy policy](https://www.strategyexe.com/privacy-policy).
