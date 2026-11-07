# Gumlet plugin for Grok Build

Connect Grok Build to Gumlet's video workspaces, assets, live streams, and
insights through Gumlet's hosted MCP server.

## Installation

In Grok Build, open `/plugin`, search for **Gumlet**, and install.

## API key

The plugin connects to `https://mcp.gumlet.com/mcp/v1` and sends the
`GUMLET_API_KEY` request header. Set the `GUMLET_API_KEY` environment variable
in the MCP host before connecting. Create a key in
[Gumlet API keys](https://dash.gumlet.com/developer/api-keys). Do not commit
the key to the plugin files or paste it into chat.

Listing the available MCP tools does not require a key; live calls to your
Gumlet account do.

For setup details, see [Gumlet's MCP documentation](https://docs.gumlet.com/reference/mcp).
