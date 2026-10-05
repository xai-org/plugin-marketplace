# Silicon Valley Atlas for Grok Build

Connect to [Silicon Valley Atlas](https://svatlas.io) to search sourced startup and
founder profiles and manage your own outreach lists.

Add the server with `grok mcp add --transport http svatlas https://svatlas.io/mcp`.
Complete OAuth in the browser, then ask for a company search. If this catalog
submission is approved, install SV Atlas through Grok Build's /plugin menu.
The package includes find-customers and research-startups workflows.

Requires an Atlas Google account. New-account access is currently restricted
while Google sign-in remains in Testing. Search and product matching use the
account's monthly quota; list tools act only within the user's access rights.

Network endpoints: https://svatlas.io/mcp (Streamable HTTP); https://svatlas.io/oauth/authorize,
/oauth/token, /oauth/register and /.well-known/ (OAuth 2.1, PKCE and discovery).
Browser sign-in uses Google via Atlas's hosted authentication provider.
No API key, password, or token belongs in this package or chat. Tokens are
stored by the MCP client. Revoke access in Atlas Settings.

Generated from Atlas plugin metadata and skills, version 1.1.0.
Canonical download: https://svatlas.io/plugins/svatlas-1.1.0.zip

License: Proprietary. Service use follows [Atlas terms](https://svatlas.io/terms).
Support: https://svatlas.io/support. Privacy: https://svatlas.io/privacy.
