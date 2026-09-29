# CompSniper plugin for Grok Build

Connect Grok Build to [CompSniper](https://compsniper.com): real eBay sold prices and
resale intelligence. Search completed eBay sales, get a cleaned median and realistic
range across 8 marketplaces, compare products or marketplaces, check remaining quota,
and export results.

## Installation

In Grok Build, open `/plugin`, search for **CompSniper**, and install.

On first connection, Grok opens CompSniper sign-in in the browser. Use a CompSniper
account (email/password or Google). Do not paste an API key into chat.

## Authentication

The plugin connects only to `https://mcp.compsniper.com/mcp`. Authentication is
OAuth 2.1 with PKCE (S256) and Dynamic Client Registration, discovered from the host.

Network endpoints:

- `https://mcp.compsniper.com/mcp` — hosted MCP (streamable HTTP)
- `https://compsniper.com/.well-known/oauth-authorization-server` — auth server metadata
- `https://compsniper.com/oauth/authorize`, `/oauth/token`, `/oauth/register`, `/oauth/revoke` — OAuth 2.1 + PKCE + DCR

Credentials: a CompSniper account. The access token is used as `Authorization: Bearer`
on `/mcp`; scopes are `comps:read`, `account:read`, `jobs:write`, and `offline_access`.
No API key is stored in the plugin. A free tier (100 requests per month) is available
at [compsniper.com](https://compsniper.com).

## License

Proprietary. Use of the hosted MCP is governed by CompSniper's
[terms](https://compsniper.com/terms).
