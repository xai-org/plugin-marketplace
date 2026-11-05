# Mugpipe Signals

Hosted MCP server that brings your Google Search Console and Google Analytics 4 data into Grok Build: weekly performance summaries, CTR opportunities, top queries and pages, and traffic trends.

## Installation

In Grok Build, open `/plugin`, search for **Mugpipe Signals**, and install.

On first connect you sign in to Mugpipe with Google and grant **read-only** Search Console and GA4 scopes. No API keys are stored in the plugin, and nothing should be pasted into chat.

## What you get

- **MCP server** `mugpipe-signals` at `https://mcp.mugpipe.com/signals` (streamable HTTP, OAuth).
- **Skill** `mugpipe-signals`: connect Google, pick a Search Console site (and GA4 property), then quote real numbers from the weekly report, CTR opportunities, and related lookups.

Pricing: 7-day free trial, then $9/month on [mugpipe.com](https://mugpipe.com) (billed by Mugpipe).

## Authentication and network

The plugin file declares a single HTTP MCP server. There are no lifecycle hooks, scripts, or local executables, and the plugin does not read local secrets, tokens, or environment variables.

Network endpoints:

- `https://mcp.mugpipe.com/signals` — hosted MCP (streamable HTTP). This is the only endpoint in `.mcp.json`.
- `https://auth.mugpipe.com` — OAuth 2.1 authorization server advertised by that MCP host (`/authorize`, `/oauth/token`, `/oauth/register`). Scope is `signals:read`.

Credentials: Google OAuth, read-only Google Search Console and GA4, for the property the user selects. The access token stays with the MCP host. No API key is stored in the plugin.

Privacy: https://mugpipe.com/legal/privacy · Terms: https://mugpipe.com/legal/terms

Support: hello@mugpipe.com

## License

Proprietary (service). Plugin config files in this directory may be redistributed with the marketplace.
