# FindBroadband plugin for Grok Build

Compare the UK broadband deals available at an exact address, priced on their true whole-contract cost, and check whether a bill or renewal quote is too high. Hosted MCP server, no account or API key needed.

## Installation

In Grok Build, open `/plugin`, search for **FindBroadband**, and install. No sign-in or API key is needed.

## What you get

- **MCP server** `findbroadband` at `https://www.findbroadbanddeals.com/api/mcp/standard` (Streamable HTTP, no authentication, read only).

| Tool | What it does |
|---|---|
| `search_addresses` | Lists the addresses at a UK postcode, so results can be for one exact property. |
| `find_broadband_deals` | The deals available at an address with a best value, cheapest and fastest pick, each with its true whole-contract cost. |
| `check_if_overpaying` | Compares a current bill or renewal quote with comparable deals at the address and gives the saving over 24 months. |
| `get_deal_details` | The full terms of one deal: setup costs, price rises and availability at the address. |

## Try asking

- "Find broadband deals at 1 Fyfields, SS13 1HJ."
- "I'm with Sky paying £44 a month for 100Mb at SS13 1HJ. Am I overpaying?"
- "Find me full fibre under £30 a month with no mid-contract price rises."

## Links

- Documentation: https://www.findbroadbanddeals.com/ai-assistants
- Source of the manifests: https://github.com/FindBroadband/mcp
- Privacy policy: https://www.findbroadbanddeals.com/privacy
- Support: hello@findbroadbanddeals.com
