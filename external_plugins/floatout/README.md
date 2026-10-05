# Floatout plugin for Grok Build

Connect Grok Build to [Floatout](https://floatout.xyz), which lets you launch a branded
Hyperliquid trading platform with prediction markets and perps.

## Installation

In Grok Build, open `/plugin`, search for **Floatout**, and install.

## Tools

The plugin adds Floatout's public, read-only MCP server. All tools are read-only.

- `list_floatout_plans`: current Floatout activation plans, prices and revenue-share terms.
  It does not create an order or make a payment.
- `read_floatout_page`: a public Floatout product, pricing, security or operator guide as Markdown.
- `read_builder_fee_study`: Floatout's archive sample of gross Hyperliquid builder fees.

## Network and credentials

The plugin connects only to `https://floatout.xyz/api/mcp` (streamable HTTP).
No account, API key or other credential is needed. The plugin ships no skills,
hooks or scripts.

## License

Proprietary. Use of the hosted MCP is governed by Floatout's terms at https://floatout.xyz/terms.
