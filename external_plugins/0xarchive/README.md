# 0xArchive plugin for Grok Build

Connect Grok Build to [0xArchive](https://0xarchive.io), the market-data platform for Hyperliquid and Lighter, two onchain crypto exchanges. Read order books, trades, candles, funding, open interest, positions and data coverage through the hosted 0xArchive MCP server.

## Installation

In Grok Build, open `/plugin`, search for **0xArchive**, and install.

On first connection, Grok opens the 0xArchive sign-in in your browser. Approve `mcp:market.read`, the scope for market data. No API key is needed and nothing should be pasted into chat.

## What you get

- **MCP server** `0xarchive` at `https://mcp.0xarchive.io/mcp` (Streamable HTTP, OAuth 2.1, authorization server `https://auth.0xarchive.io`).
- Typed tools organized by venue family: Hyperliquid core, Hyperliquid Spot, HIP-3, HIP-4, Lighter (mainnet and Robinhood Chain) and data quality. The market-data tools are read-only and never submit orders or change account state.

### Example prompts

| Prompt | Tool |
|---|---|
| "Get a BTC market summary on Hyperliquid." | `get_summary` |
| "Fetch ETH one-hour Hyperliquid candles for the last 24 hours." | `get_candles` |
| "Fetch current BTC funding separately for Hyperliquid and Lighter." | `get_funding_current`, `get_lighter_funding_current` |
| "Summarize `xyz:XYZ100` on HIP-3." | `get_hip3_summary` |
| "List active HIP-4 outcome markets." | `get_hip4_outcomes` |
| "Show recent data incidents or coverage gaps." | `get_data_incidents`, `get_symbol_coverage` |

Full tool reference: [docs.0xarchive.io/mcp-server](https://docs.0xarchive.io/mcp-server).

## Network endpoints and credentials

- `https://mcp.0xarchive.io/mcp`: the MCP server. Every call goes here.
- `https://auth.0xarchive.io`: the OAuth authorization server, used only during sign-in.

Grok keeps the OAuth access token in its own credential handling. The plugin ships no scripts, hooks, skills or binaries, reads no local files and sends no telemetry.

### Optional scopes

The server's [protected-resource metadata](https://mcp.0xarchive.io/.well-known/oauth-protected-resource) lists every scope it offers. Only `mcp:market.read` is needed for market data. The others are opt-in and shown on the consent screen: `mcp:feedback.write` (send product feedback), `mcp:webhooks.read`/`mcp:webhooks.write` (manage your webhook configuration), and `mcp:terminal.read`/`mcp:terminal.write`/`mcp:terminal.backtest` (set up your open 0xArchive Terminal; never places orders or touches trading keys).

## Plans

Your 0xArchive plan sets credits and the history window, as it does for the REST API. A free plan is available.

## License

MIT. Source and manifests: [github.com/0xArchiveIO/0xarchive-mcp](https://github.com/0xArchiveIO/0xarchive-mcp).
