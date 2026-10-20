# YachtWorld plugin for Grok Build

Connect Grok Build to [YachtWorld](https://www.yachtworld.com), the global marketplace
for boats and yachts, with a focus on broker-represented and larger vessels. Search
current listings, research market asking prices and availability, and get full details
for a specific boat through the hosted YachtWorld MCP server, operated by
[Boats Group](https://www.boatsgroup.com).

## Installation

In Grok Build, open `/plugin`, search for **YachtWorld**, and install. No sign-in or
API key is needed.

## What you get

- **MCP server** `yachtworld` at `https://yachtworld-mcp.live.boatsgroup.com/mcp`
  (Streamable HTTP, no authentication).
- **Skill** `yachtworld`: when to use each tool and how to fill search parameters.

### Tools

All tools are read-only (`readOnlyHint: true`, `destructiveHint: false`).

| Tool | Purpose |
|---|---|
| `search-boats` | Browse and filter current boats and yachts for sale by type, make/model, price, size, engines, location and more |
| `aggregate-search` | Research the market across all matching listings: counts, availability and asking-price ranges |
| `get-boat-details` | Full specifications, photos and seller/broker contact information for one listing from the search results |

## Example prompts

- "Find motor yachts over 60 feet in the Mediterranean under 1.5 million euros."
- "How many used Sunseeker Manhattan 66s are listed, and what's the asking-price range?"
- "Show me catamarans for sale in the Caribbean that can handle long-range cruising."
- "Give me the full details on the second listing."

## Authentication and network

The plugin connects only to `https://yachtworld-mcp.live.boatsgroup.com`.

- `https://yachtworld-mcp.live.boatsgroup.com/mcp`: hosted MCP (Streamable HTTP)

Credentials: none. The server is unauthenticated and exposes only public marketplace
listing data. The plugin stores no credentials and requests no filesystem or shell
access.

## License

MIT for the files in this plugin. Use of the YachtWorld service and its data is
governed by the [YachtWorld terms of use](https://www.yachtworld.com/terms-of-use) and
[privacy policy](https://www.yachtworld.com/privacy-policy).
