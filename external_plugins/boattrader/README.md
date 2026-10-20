# Boat Trader plugin for Grok Build

Connect Grok Build to [Boat Trader](https://www.boattrader.com), the U.S. marketplace for
new and used boats. Search current listings, research market asking prices and
availability, and get full details for a specific boat through the hosted Boat Trader
MCP server, operated by [Boats Group](https://www.boatsgroup.com).

## Installation

In Grok Build, open `/plugin`, search for **Boat Trader**, and install. No sign-in or
API key is needed.

## What you get

- **MCP server** `boattrader` at `https://boattrader-mcp.live.boatsgroup.com/mcp`
  (Streamable HTTP, no authentication).
- **Skill** `boattrader`: when to use each tool and how to fill search parameters.

### Tools

All tools are read-only (`readOnlyHint: true`, `destructiveHint: false`).

| Tool | Purpose |
|---|---|
| `search-boats` | Browse and filter current boats for sale by type, make/model, price, size, engines, location and more |
| `aggregate-search` | Research the market across all matching listings: counts, availability and asking-price ranges |
| `get-boat-details` | Full specifications, photos and seller/contact information for one listing from the search results |

## Example prompts

- "Find center console fishing boats under $80,000 near Tampa."
- "How many used Grady-White 270s are listed, and what's the asking-price range?"
- "Show me pontoon boats in Michigan that seat at least 10."
- "Give me the full details on the second listing."

## Authentication and network

The plugin connects only to `https://boattrader-mcp.live.boatsgroup.com`.

- `https://boattrader-mcp.live.boatsgroup.com/mcp`: hosted MCP (Streamable HTTP)

Credentials: none. The server is unauthenticated and exposes only public marketplace
listing data. The plugin stores no credentials and requests no filesystem or shell
access.

## License

MIT for the files in this plugin. Use of the Boat Trader service and its data is
governed by the [Boat Trader terms of use](https://www.boattrader.com/terms-of-use) and
[privacy policy](https://www.boattrader.com/privacy-policy).
