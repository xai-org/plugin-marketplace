# CraftCX plugin for Grok Build

Connect Grok Build to your CraftCX support data through the hosted CraftCX MCP server. The server provides read-only tools for conversations, QA findings, customer signals, and support performance.

## Install and sign in

Open `/plugin` in Grok Build, find **CraftCX**, and install it. When Grok connects, sign in with your CraftCX account and approve access to one organization. The tools available depend on the scopes you approve. You do not need an API key.

## Connection and permissions

The plugin configures one Streamable HTTP MCP endpoint: `https://mcp.craftcx.com/mcp`. CraftCX OAuth uses `https://app.craftcx.com/api/auth` for authorization. The sign-in flow may also open `https://app.craftcx.com` in your browser.

CraftCX offers these read scopes: `conversations:read`, `findings:read`, `signals:read`, and `supportPerformance:read`. The MCP server cannot modify CraftCX data. The plugin has no scripts or hooks and does not store credentials.

See the [CraftCX MCP page](https://craftcx.com/mcp) for setup details.

## License

Proprietary. Use of the hosted MCP server is governed by CraftCX's terms.
