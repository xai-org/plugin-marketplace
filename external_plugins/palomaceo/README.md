# PalomaCEO.ai for Grok Build

Run your restaurant or shop on [PalomaCEO.ai](https://palomaceo.ai) from Grok Build: social posts, your menu in Paloma, your website and ordering page, online ordering and delivery settings, promo codes and sales reports.

Grok reads and prepares; nothing your guests or the public see changes until you tap. Every change waits in your Inbox in the PalomaCEO.ai app until you tap Approve there.

## What it ships

| Component | What |
|---|---|
| MCP server | `palomaceo` — the hosted PalomaCEO.ai MCP server, `https://mcp.palomaceo.ai/mcp` (Streamable HTTP) |
| Skill | `palomaceo` — how to use the server: changes wait for Approve, no passwords, no dashboards |

No hooks, commands, agents, scripts or local binaries.

## Setup

1. Sign in to the PalomaCEO.ai app at [app.palomaceo.ai](https://app.palomaceo.ai) as the business's owner or manager (or create an account).
2. Open **Connectors → Other AI apps** and create a key. It starts with `pk_live_` and is shown once.
3. Put it in your environment before starting Grok:

   ```bash
   export PALOMACEO_API_KEY=pk_live_...
   ```

4. Install the plugin: `grok plugin install palomaceo`, or `/marketplace` in Grok Build.

Revoke the key any time in the same place in the app; the plugin then gets 401.

## Network and credentials

- Network: only `https://mcp.palomaceo.ai/mcp`.
- Credential: `PALOMACEO_API_KEY`, sent as `Authorization: Bearer` to that address only. The plugin stores nothing.
- The server acts for the one business the key belongs to. A change becomes a card in that business's Inbox; reads return only that business's data.
- What the tools return — sales, the menu, posts and, for questions about guests, orders or reviews, your guests' names, orders and messages and reviewers' names — goes into your Grok session. Grok Build sends it to xAI under your own agreement with xAI, not under the PalomaCEO.ai Privacy Policy; PalomaCEO.ai sends nothing to xAI itself.

## Links

- Website: https://palomaceo.ai
- Help: https://palomaceo.ai/help
- Privacy: https://palomaceo.ai/privacy
- Terms: https://palomaceo.ai/eula
- Support: support@palomaceo.ai

## License

Proprietary. © PalomaFinTech LLC. You may install and use this plugin with a PalomaCEO.ai account under the [PalomaCEO.ai terms](https://palomaceo.ai/eula).
