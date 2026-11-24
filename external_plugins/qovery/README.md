# Qovery plugin for Grok Build

Connect Grok Build to [Qovery](https://www.qovery.com), the agentic DevOps platform that
runs your applications on Kubernetes in your own cloud account (AWS, GCP, Azure, Scaleway).
Ask about your clusters, environments and services, check deployments and read logs
through the hosted Qovery MCP server.

## Installation

In Grok Build, open `/plugin`, search for **Qovery**, and install.

On first connection, Grok opens the Qovery sign-in in your browser. Authorize with the
Qovery account you want Grok to work with. No API token is needed and nothing should be
pasted into chat. Don't have an account? The Free plan at
[console.qovery.com](https://console.qovery.com) needs no credit card.

## What you get

- **MCP server** `qovery` at `https://mcp.qovery.com/mcp` (Streamable HTTP, OAuth 2.1).

### Tools

| Area | Tools |
|---|---|
| Organization | `list_organizations`, `get_organization_account_summary`, `list_projects` |
| Clusters | `list_clusters`, `get_cluster_status`, `get_cluster_events` |
| Environments | `list_environments`, `get_environment_details`, `get_deployment_status` |
| Services | `list_services`, `get_service_configuration`, `get_service_advanced_settings`, `get_service_environment_variables`, `get_service_logs` |
| API catalog | `qovery_api_search`, `qovery_api_execute` for any other [Qovery API](https://api-doc.qovery.com) operation |

## Read-only by default

The plugin connects in read-only mode: Grok can inspect, but not change, your
infrastructure. To let Grok also trigger deployments, restart services and update
configuration, change the URL in `.mcp.json` to
`https://mcp.qovery.com/mcp?read_write=true`. Write access must also be enabled for your
organization in the Qovery Console under **Settings > MCP Server**.

## Example prompts

- "List my Qovery organizations and their clusters."
- "Which of my environments have a failed deployment?"
- "Show the last 100 log lines of the api service in production."
- "Compare the environment variables of staging and production."
- "Why did my last deployment fail?"

## Authentication and network

The plugin connects only to Qovery. Authentication is OAuth 2.1 authorization code with
PKCE and dynamic client registration; Grok handles the flow.

Network endpoints:

- `https://mcp.qovery.com/mcp`: hosted MCP (Streamable HTTP)
- `https://mcp.qovery.com/oauth/authorize`, `/oauth/token`, `/oauth/register`: OAuth 2.1 + DCR
- `https://mcp.qovery.com/.well-known/oauth-authorization-server`, `/.well-known/oauth-protected-resource`: discovery metadata
- `https://auth.qovery.com`: human sign-in and consent screen, token revocation

Credentials: a Qovery account. Tokens are scoped to that account and sent as
`Authorization: Bearer` on `/mcp`. The plugin stores no API key and requests no filesystem
or shell access. Tools act only on resources the signed-in user can already see in the
Qovery Console, with the same role-based permissions.

Prefer a scoped API token instead of OAuth? See the
[MCP server docs](https://www.qovery.com/docs/copilot/mcp-server).

## License

MIT for the files in this plugin. Use of Qovery is governed by the
[Qovery terms](https://www.qovery.com/terms) and [privacy policy](https://www.qovery.com/privacy).
