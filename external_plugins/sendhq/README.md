# SendHQ plugin for Grok Build

Connect Grok Build to [SendHQ](https://sendhq.cc).

## Installation

In Grok Build, open `/plugin`, search for **SendHQ**, and install.

On first connection, Grok opens SendHQ sign-in in the browser. Sign in with your
SendHQ account and approve the connection. Do not paste an API key into chat.

## Authentication

The plugin connects only to `https://mcp.sendhq.cc/mcp`. Authentication is OAuth 2.1
(PKCE, dynamic client registration) against that host.

Network endpoints:

- `https://mcp.sendhq.cc/mcp` — hosted MCP (streamable HTTP)
- `https://mcp.sendhq.cc/authorize`, `/token`, `/register` — OAuth 2.1 + DCR
- `https://app.sendhq.cc/connect-ai` — human sign-in and consent

Credentials: A SendHQ account. Tools act on that account's workspace. Tools that send real email are marked destructive so Grok asks before calling them. No API key or secret is stored in the plugin. The
connection can be revoked by the user at any time.

## License

Proprietary. Use of the hosted MCP is governed by SendHQ's terms.
