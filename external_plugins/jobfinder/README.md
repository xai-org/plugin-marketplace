# JobFinder plugin for Grok Build

Connect Grok Build to [JobFinder](https://www.jobfinder-ai.com).

## Installation

In Grok Build, open `/plugin`, search for **JobFinder**, and install.

On first connection, Grok opens JobFinder sign-in in the browser. Sign in with your
JobFinder account and approve the connection. Do not paste an API key into chat.

## Authentication

The plugin connects only to `https://mcp.jobfinder-ai.com/mcp`. Authentication is OAuth 2.1
(PKCE, dynamic client registration) against that host.

Network endpoints:

- `https://mcp.jobfinder-ai.com/mcp` — hosted MCP (streamable HTTP)
- `https://mcp.jobfinder-ai.com/authorize`, `/token`, `/register` — OAuth 2.1 + DCR
- `https://app.jobfinder-ai.com/connect-ai` — human sign-in and consent

Credentials: A JobFinder account. Tools act on that user's matches and profile. Approving outreach is annotated destructive so Grok asks first; outreach only goes to approved matches. No API key or secret is stored in the plugin. The
connection can be revoked by the user at any time.

## License

Proprietary. Use of the hosted MCP is governed by JobFinder's terms.
