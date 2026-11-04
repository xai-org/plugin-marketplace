# Internet Outage Checker by FindBroadband plugin for Grok Build

Check whether a UK broadband provider is down and where, plus its outages over the last 30 days, from FindBroadband's outage tracker. Hosted MCP server, no account or API key needed.

## Installation

In Grok Build, open `/plugin`, search for **Internet Outage Checker by FindBroadband**, and install. No sign-in or API key is needed.

## What you get

- **MCP server** `findbroadband-outages` at `https://www.findbroadbanddeals.com/api/mcp/outages` (Streamable HTTP, no authentication, read only).

| Tool | What it does |
|---|---|
| `get_outage_overview` | Every UK provider FindBroadband tracks, with its status (Down, Issues earlier or Working fine) and the places affected. |
| `get_provider_outage_status` | One provider's status, its current and recent incidents in the provider's own words, and a day by day picture of the last 30 days. |
| `get_outage_history` | The outages a provider has had in the last 30 days, or which providers had problems on a given day. |

## Try asking

- "Is BT down right now?"
- "Is there a broadband outage in the UK at the moment?"
- "Has Virgin Media had any problems this week?"

## Links

- Documentation: https://www.findbroadbanddeals.com/ai-assistants
- Source of the manifests: https://github.com/FindBroadband/mcp
- Privacy policy: https://www.findbroadbanddeals.com/privacy
- Support: hello@findbroadbanddeals.com
