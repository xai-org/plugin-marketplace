# Zyfai plugin for Grok Build

Connect Grok Build to [Zyfai](https://zyf.ai) to discover DeFi yield opportunities,
inspect your Zyfai portfolio, and use authorised account tools.

## Install and test

Install **Zyfai** from `/marketplace` in Grok Build and trust the plugin.
To test a checkout before the listing is live, run
`grok plugin install ./external_plugins/zyfai --trust` from the repository root.

1. Complete Zyfai sign-in in the browser when prompted.
2. Ask “Using Zyfai, show conservative USDC yield opportunities on Base.”
   The connector should return opportunity information without moving funds.
3. Ask “Using Zyfai, show my current positions.” This should return positions
   for the signed-in account or report that it has none. A funded wallet is
   unnecessary for these checks.

See the [Zyfai MCP guide](https://docs.zyf.ai/docs/sdk/mcp-server),
[upstream source](https://github.com/ondefy/zyfai-mcp-server), and
[demo](https://screen.studio/share/wDf9LiA2).

## Network access and permissions

- `https://mcp.zyf.ai/mcp` is the hosted Streamable HTTP MCP endpoint.
  `https://mcp.zyf.ai/.well-known/oauth-protected-resource` identifies its
  OAuth issuer.
- `https://api.zyf.ai/api/v1/oauth` is Zyfai’s OAuth issuer. Grok Build uses
  its advertised endpoints for client registration, browser authorisation
  and token exchange.
- `https://zyf.ai` hosts the Zyfai app, including wallet signing links
  returned when preparing a deposit.

The plugin contains a manifest and remote MCP configuration. It ships without
hooks, scripts or bundled credentials. The hosted endpoint requires an OAuth
bearer token. Authorised read tools can access the signed-in account’s portfolio
and history. Write tools, when enabled and authorised by the account’s OAuth
scopes, can update strategy settings, prepare and register deposits, or request
withdrawals to the smart wallet owner’s address through Zyfai’s backend.
Funding a prepared deposit requires the user to sign in their wallet.

## Licence

ISC, as declared by the upstream Zyfai MCP server package.
