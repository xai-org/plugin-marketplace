# Save This One for Grok Build

Connect to your [Save This One](https://savethisone.com) bookmark library through its hosted MCP server. Save, search, read, tag, and organize bookmarks, and keep comments on saved links.

This plugin contains an MCP connection configuration only. It has no local executable code, hooks, or dependencies.

## Connection and authentication

The endpoint is `https://mcp.savethisone.com/mcp`, using Streamable HTTP. Follow the client's OAuth sign-in flow to connect your Save This One account. A free account is required. Never put passwords, access tokens, or API keys in this configuration or in chat.

Setup guide: https://savethisone.com/integrations/mcp

Network endpoints:

- `https://mcp.savethisone.com/mcp` — bookmark tools.
- `https://mcp.savethisone.com/.well-known/oauth-protected-resource` — public OAuth discovery.
- The Clerk authorization server advertised in discovery — account sign-in and OAuth authorization.

OAuth grants access to the signed-in user's library. The server provides read tools and tools that save, tag, comment on, archive, or delete bookmarks. Review write arguments before approval. Deletion is permanent. Use `whoami` and a read tool to check the connected account before changes.

The hosted MCP endpoint is published in the [Official MCP Registry](https://registry.modelcontextprotocol.io/v0.1/servers/io.github.yemyat%2Fsave-this-one/versions/1.0.0). This submission has been checked as configuration; an interactive Grok Build OAuth session has not been tested.

## License and ownership

Proprietary. The hosted service remains subject to [Save This One's terms](https://savethisone.com/terms) and [privacy policy](https://savethisone.com/privacy). This submission contains public connection metadata and does not distribute the application source.

Submitted by the product's owner, Ye Myat Min ([yemyat](https://github.com/yemyat)).
