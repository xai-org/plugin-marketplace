# Seltz plugin for Grok Build

Fast and accurate web search for AI agents. The plugin connects Grok Build to
the hosted [Seltz MCP server](https://docs.seltz.ai/integrations/mcp) and adds
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

Create an API key at [console.seltz.ai](https://console.seltz.ai), then export
it as `SELTZ_API_KEY` in the environment Grok Build starts from. The plugin
sends that value as `Authorization: Bearer ${SELTZ_API_KEY}` and does not
bundle a key. Do not paste the key into chat.

## What you get

- **MCP server** `seltz` at `https://mcp.seltz.ai/mcp` (Streamable HTTP).
- **Skill** `seltz-web-search`: when to search, which scope to use, and how to
  cite sources.
- **Skill** `seltz-fetch`: how to read up to five pages in one call.

## Authentication and network

The plugin calls only `https://mcp.seltz.ai/mcp`. Search queries and the URLs
you ask it to read are sent there.

Credentials: a Seltz API key in the `SELTZ_API_KEY` environment variable. Grok
Build expands `${SELTZ_API_KEY}` in the request header at load time. The plugin
does not read other environment variables, `~/.ssh`, `.env` files, or local
credentials, and it does not run shell commands, hooks, or install scripts.

Use of the hosted server is governed by the [Seltz terms](https://seltz.ai/terms)
and [privacy policy](https://seltz.ai/privacy-policy).

## Links

- Website: https://seltz.ai
- Docs: https://docs.seltz.ai/integrations/mcp
- Console: https://console.seltz.ai

## Contacts

- Business: matteo@seltz.ai
- Technical: chris@seltz.ai

## License

Proprietary. These files are owned by Seltz and submitted for this catalog.
The upstream Antigravity repository does not publish an open-source license.
