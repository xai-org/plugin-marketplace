# FolioandKit plugin for Grok Build

Manage your creator business from your AI assistant: brand deals, rate checks,
contracts, invoices and your media kit, in your
[FolioandKit](https://www.folioandkit.com) account.

FolioandKit is a business tool for UK content creators. Connect it to work with
your FolioandKit account from a conversation, instead of switching apps.

Documentation: https://folioandkit.com/docs/mcp

## Installation

In Grok Build, open `/plugin`, search for **FolioandKit**, and install.

On first connection, Grok opens FolioandKit sign-in in the browser. Sign in
with your FolioandKit account. Do not paste passwords or tokens into chat.

## Authentication

The plugin connects only to `https://www.folioandkit.com/mcp`. Authentication
is OAuth 2.0 against that host, with the client identified by a Client ID
Metadata Document (no client secret and no API key is stored in the plugin).
Tools only act on the data in the signed-in user's FolioandKit account.

Network endpoints:

- `https://www.folioandkit.com/mcp` — hosted MCP server (streamable HTTP)
- `https://www.folioandkit.com` — OAuth 2.0 authorization server and sign-in
  page (powered by Clerk; discovered from the server's OAuth metadata)

Credentials: a FolioandKit account.

## License

Proprietary. Use of the hosted MCP server is governed by FolioandKit's terms.
