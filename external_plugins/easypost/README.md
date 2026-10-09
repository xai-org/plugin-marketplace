# EasyPost plugin for Grok Build

Connect Grok Build to [EasyPost](https://www.easypost.com) - shipments, trackers, addresses, carrier accounts, pickups, refunds, insurances, and claims - via EasyPost's hosted MCP server.

## Installation

1. Grab a production API key from the EasyPost dashboard: [Account → API Keys](https://app.easypost.com/account/api-keys).
2. Export it before launching Grok Build:
   ```bash
   export EASYPOST_API_KEY=EZAK...
   ```
   Grok expands `${EASYPOST_API_KEY}` in the plugin's `headers` at load time and sends it as `Authorization: Bearer` on every request to the MCP.
3. In Grok Build, open `/plugin`, search for **EasyPost**, and install.

Keep the key in your environment (`~/.zshrc`, `.envrc`, a secret manager), not in a committed file.

## Authentication

The plugin connects only to `https://app-api.easypost.com/mcp`. Each request carries `Authorization: Bearer <your production API key>`. The API key stays on your machine; no OAuth sign-in, no token caching in Grok's credential store.

If `EASYPOST_API_KEY` is unset, every tool call returns 401. If the key is a test-mode key, every tool call returns an auth error (production mode only).

## Tools

All tools are read-only (list and get only; no mutating actions) and run in production mode:

- `whoami` - authenticated user
- `list_shipments`, `get_shipment`
- `list_trackers`, `get_tracker`
- `get_address`
- `list_carrier_accounts`, `carrier_metadata`
- `pickups`
- `refunds`
- `insurances`
- `claims`

## License

Proprietary. Use of the hosted MCP is governed by EasyPost's terms.
