# Seltz plugin for Grok Build

Fast and accurate web search for AI agents. The plugin connects Grok Build to
the hosted [Seltz MCP server](https://docs.seltz.ai/integrations/mcp?utm_source=grok-build&utm_medium=integration&utm_campaign=marketplace) and adds
two tools:

- `search`: web search with filters for news, companies, people, financial
  reports, Wikipedia, dates, and domains
- `fetch`: reads the full content of web pages as markdown

Adapted for Grok Build from the official Antigravity plugin at
[seltz-ai/seltz-antigravity-plugin](https://github.com/seltz-ai/seltz-antigravity-plugin)
(`515aecf06acbf426ba34dc77842c1e995518cd96` on `main`). That repo's
`plugin.json` and `mcp_config.json` are Antigravity-shaped, so this catalog
vendors the Grok layout here instead of pinning that tree as a remote source.

## Installation

In Grok Build, open `/plugin`, search for **Seltz**, and install.

On first use, Grok Build opens Seltz sign-in in the browser. Sign in with the
Seltz account you want Grok to search with. The shipped config contains no
API key. Do not paste a key into chat.

## What you get

- **MCP server** `seltz` at `https://mcp.seltz.ai/mcp` (Streamable HTTP).
- **Skill** `seltz-web-search`: when to search, which scope to use, and how to
  cite sources.
- **Skill** `seltz-fetch`: how to read up to five pages in one call.

## Authentication and network

The plugin calls only `https://mcp.seltz.ai/mcp`. Search queries and the URLs
you ask it to read are sent there.

Default auth is OAuth. `.mcp.json` sets the server URL and no `Authorization`
header, matching
[seltz-ai/seltz-codex-plugin](https://github.com/seltz-ai/seltz-codex-plugin).
A call with no credential gets `401` and
`WWW-Authenticate: Bearer resource_metadata="https://mcp.seltz.ai/.well-known/oauth-protected-resource/mcp"`.
That document names `https://console.seltz.ai` as the authorization server
(authorization code with PKCE, scope `seltz:read`). Grok Build starts the
browser flow for an HTTP MCP server that has no static auth header, and stores
the token in its own credential file. This plugin stores no key and reads no
environment variables.

Optional API key. A static `Authorization` header is sent instead of that
OAuth flow, so the shipped `.mcp.json` cannot offer both. To use a key, create
one at [console.seltz.ai](https://console.seltz.ai?utm_source=grok-build&utm_medium=integration&utm_campaign=marketplace), export `SELTZ_API_KEY`
before starting Grok Build, and add the header yourself:

```json
{
  "mcpServers": {
    "seltz": {
      "type": "http",
      "url": "https://mcp.seltz.ai/mcp",
      "headers": {
        "Authorization": "Bearer ${SELTZ_API_KEY}"
      }
    }
  }
}
```

Do not paste the key into chat.

The plugin does not read `~/.ssh` or `.env` files, and it does not run shell
commands, hooks, or install scripts.

Use of the hosted server is governed by the [Seltz terms](https://seltz.ai/terms?utm_source=grok-build&utm_medium=integration&utm_campaign=marketplace)
and [privacy policy](https://seltz.ai/privacy-policy?utm_source=grok-build&utm_medium=integration&utm_campaign=marketplace).

## Links

- Website: https://seltz.ai?utm_source=grok-build&utm_medium=integration&utm_campaign=marketplace
- Docs: https://docs.seltz.ai/integrations/mcp?utm_source=grok-build&utm_medium=integration&utm_campaign=marketplace
- Console: https://console.seltz.ai?utm_source=grok-build&utm_medium=integration&utm_campaign=marketplace

## Contacts

- Business: matteo@seltz.ai
- Technical: chris@seltz.ai

## License

Proprietary. These files are owned by Seltz and submitted for this catalog.
The upstream Antigravity repository does not publish an open-source license.
