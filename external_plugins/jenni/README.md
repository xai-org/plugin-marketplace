# JENNi Instant Commerce plugin for Grok Build

Connect Grok Build to [JENNi](https://shop.jennipro.com) to search the catalog, inspect ZIP-specific buying options, and begin a buyer-controlled checkout hosted by JENNi.

## Installation

In Grok Build, open `/plugin`, search for **jenni**, and install. No API key is required.

## What you get

- **MCP server** `jenni` at `https://shop.jennipro.com/mcp` (Streamable HTTP, no API key required).
- **Skill** `jenni`: instructions for searching products, reviewing buying options for a ZIP code, and handing the shopper to JENNi-hosted checkout.

### Tools

| Tool | Purpose |
|---|---|
| `search_catalog` | Search the product catalog, optionally using a ZIP code |
| `find_stores` | Find stores for a ZIP code |
| `get_product` | Retrieve product information |
| `get_buying_options` | Inspect ZIP-specific buying options |
| `start_checkout` | Begin JENNi-hosted checkout, where the shopper reviews and confirms the purchase; checkout does not complete in MCP |

## License

MIT
