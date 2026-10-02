# Taskaid plugin for Grok Build

Connect Grok Build to [Taskaid](https://taskaid.ai), a personal workspace for
tasks and a daily plan that every assistant you connect shares. Grok can
capture, find, schedule and update your tasks, organise them into lists, and
read or write the plan for a day.

## Installation

In Grok Build, open `/plugin`, search for **Taskaid**, and install.

On first connection, Grok opens Taskaid sign-in in the browser. Sign in with
your Taskaid account and approve the access requested. There is no API key to
paste.

## Tools

| Tool | Access | What it does |
| --- | --- | --- |
| `search_tasks` | read | Find tasks by state, list, text or day |
| `view_task` | read | Read one task in full, including its note |
| `save_task` | write | Create a task, or update its fields or note |
| `view_lists` | read | Read your lists |
| `save_list` | write | Create or rename a list |
| `view_daily_plan` | read | Read the plan for a day |
| `set_daily_plan` | write | Write or edit the plan for a day |

No tool deletes a task or a list.

## Authentication

The plugin connects only to `https://taskaid.ai`. Authentication is OAuth 2.1
with dynamic client registration and PKCE.

Network endpoints:

- `https://taskaid.ai/mcp`: hosted MCP server (streamable HTTP)
- `https://taskaid.ai/oauth/authorize`, `/oauth/token`, `/oauth/register`,
  `/oauth/revoke`: OAuth 2.1 and dynamic client registration
- `https://taskaid.ai/.well-known/oauth-protected-resource/mcp` and
  `/.well-known/oauth-authorization-server`: OAuth discovery

Credentials: a Taskaid account. Scopes requested: `tasks:read`,
`tasks:write`, `plans:read`, `plans:write`, and `offline_access` when the
client asks to stay signed in. Every call runs as the signed-in user. No
credential is stored in the plugin.

To revoke access, open Taskaid [Settings](https://taskaid.ai/settings) and
disconnect Grok under **Connected apps**.

## Documentation and support

- MCP server reference: https://taskaid.ai/docs/mcp
- Privacy policy: https://taskaid.ai/privacy
- Terms of service: https://taskaid.ai/terms
- Support: support@satria.ai

## License

MIT for the files in this plugin; see [LICENSE](LICENSE). Use of the hosted
Taskaid service is governed by the Taskaid terms of service.
