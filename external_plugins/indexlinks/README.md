# IndexLinks plugin for Grok Build

Connect Grok Build to [IndexLinks](https://indexlinks.app).

## Installation

In Grok Build, open `/plugin`, search for **IndexLinks**, and install.

On first connection, Grok opens IndexLinks sign-in in the browser. Sign in with your
IndexLinks account and approve the connection. Do not paste an API key into chat.

## Authentication

The plugin connects only to `https://mcp.indexlinks.app/mcp`. Authentication is OAuth 2.1
(PKCE, dynamic client registration) against that host.

Network endpoints:

- `https://mcp.indexlinks.app/mcp` — hosted MCP (streamable HTTP)
- `https://mcp.indexlinks.app/authorize`, `/token`, `/register` — OAuth 2.1 + DCR
- `https://app.indexlinks.app/connect-ai` — human sign-in and consent

Credentials: An IndexLinks account. Tools act on that account's websites. submit_pages sends URLs to outside search engines and uses the plan's allowance, so it is annotated destructive and Grok asks first. No API key or secret is stored in the plugin. The
connection can be revoked by the user at any time.

## License

Proprietary. Use of the hosted MCP is governed by IndexLinks's terms.
