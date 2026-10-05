# AuraVMS plugin for Grok Build

Connect Grok Build to [AuraVMS](https://www.auravms.com).

## Installation

In Grok Build, open `/plugin`, search for **AuraVMS**, and install.

On first connection, Grok opens AuraVMS sign-in in the browser. Sign in with your
AuraVMS account and approve the connection. Do not paste an API key into chat.

## Authentication

The plugin connects only to `https://mcp.auravms.com/mcp`. Authentication is OAuth 2.1
(PKCE, dynamic client registration) against that host.

Network endpoints:

- `https://mcp.auravms.com/mcp` — hosted MCP (streamable HTTP)
- `https://mcp.auravms.com/authorize`, `/token`, `/register` — OAuth 2.1 + DCR
- `https://app.auravms.com/connect-ai` — human sign-in and consent

Credentials: An AuraVMS account. Tools act on that account's procurement workspace. Sending RFQs, reminders and purchase orders emails real suppliers, so those tools are annotated destructive and Grok asks first. No API key or secret is stored in the plugin. The
connection can be revoked by the user at any time.

## License

Proprietary. Use of the hosted MCP is governed by AuraVMS's terms.
