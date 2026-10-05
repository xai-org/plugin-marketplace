# AI for Database plugin for Grok Build

Connect Grok Build to [AI for Database](https://www.aifordatabase.com).

## Installation

In Grok Build, open `/plugin`, search for **AI for Database**, and install.

On first connection, Grok opens AI for Database sign-in in the browser. Sign in with your
AI for Database account and approve the connection. Do not paste an API key into chat.

## Authentication

The plugin connects only to `https://mcp.aifordatabase.com/mcp`. Authentication is OAuth 2.1
(PKCE, dynamic client registration) against that host.

Network endpoints:

- `https://mcp.aifordatabase.com/mcp` — hosted MCP (streamable HTTP)
- `https://mcp.aifordatabase.com/authorize`, `/token`, `/register` — OAuth 2.1 + DCR
- `https://app.aifordatabase.com/connect-ai` — human sign-in and consent

Credentials: An AI for Database account. Tools only see the database connections that account has
added; run_query is read-only SQL. No API key or secret is stored in the plugin. The
connection can be revoked by the user at any time.

## License

Proprietary. Use of the hosted MCP is governed by AI for Database's terms.
