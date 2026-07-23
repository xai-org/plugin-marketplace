# Saleslumen plugin for Grok Build

Official Saleslumen connector for the xAI plugin marketplace. Bundles the hosted Saleslumen MCP server plus agent skills for **Workflows**, **Emails**, **Campaigns**, and **Apps Script**.

## What this plugin provides

| Component | Purpose |
| --- | --- |
| MCP server (`saleslumen`) | Streamable HTTP MCP at `https://mcp.saleslumenapis.com/` |
| Skills | Guidance for auth, Campaigns, and Emails tools |

## Authentication

Saleslumen MCP uses OAuth 2.1 (authorization code + PKCE) with dynamic client registration against `https://oauth.saleslumenapis.com`.

1. Complete the OAuth link when Grok prompts you.
2. Sign in with your Saleslumen browser session (`app.saleslumen.com`).
3. Pick the organization if you belong to more than one.
4. Call `whoami` to confirm `sub`, `sl_organization_id`, and scopes.

No API keys are stored in this plugin. Tokens are issued by Saleslumen OAuth and attached by the MCP client.

## Network endpoints

| Endpoint | Why |
| --- | --- |
| `https://mcp.saleslumenapis.com/` | MCP Streamable HTTP transport and protected-resource metadata |
| `https://oauth.saleslumenapis.com` | OAuth authorization server (discovery, authorize, token, DCR) |
| `https://app.saleslumen.com` | User sign-in / session for the OAuth login bridge |
| `https://www.saleslumen.com` | Product homepage and docs links in skills |

Backend product APIs (`*.saleslumenapis.com`) are called by the MCP server after token exchange — not directly by this plugin.

## Credentials / permissions

- Requires a Saleslumen user account with organization membership.
- OAuth scopes typically include `openid`, `offline_access`, and `api:read`.
- Tools act as the linked user in the selected organization.

## License

Apache-2.0 for this plugin package (manifest, MCP config, skills, assets). Use of Saleslumen APIs and the product is governed by [Saleslumen Terms](https://www.saleslumen.com/policies/terms) and [Privacy Policy](https://www.saleslumen.com/policies/privacy).
