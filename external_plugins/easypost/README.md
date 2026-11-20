# EasyPost plugin for Grok Build

Connect Grok Build to [EasyPost](https://www.easypost.com) - rate quotes, label purchase, insurance, refunds, tracking, address verification, and claims - via EasyPost's hosted MCP server.

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

Every tool runs in production mode against your EasyPost account.

Read only:

- `whoami` - authenticated user
- `list_shipments`, `get_shipment`
- `list_trackers`, `get_tracker`
- `get_address`
- `list_carrier_accounts`, `carrier_metadata`
- `list_payment_methods` - brand, last4, and priority only; cannot add or change a method
- `pickups`
- `refunds` - refund status only; never files a refund
- `insurances`
- `claims`

Billed lookups (each call is metered, nothing is purchased):

- `create_shipment` - quote rates for one domestic US shipment; does not buy a label; the destination deliverability check is billed
- `create_and_verify_address` - verify and store one address
- `smartrate_delivery_date` - delivery date per rate for a planned ship date
- `create_tracker` - register one tracking number not bought through EasyPost; a repeat number returns the existing tracker with no charge

Purchases and refunds (these move money on your account):

- `buy_shipment` - buy one rate; debits the postage wallet; refused unless `expected_rate` matches the rate being bought
- `insure_shipment` - add insurance to a label already bought; debits the postage wallet
- `create_refund` - request a refund for one unused label by tracking code

Approve the carrier, service, and price before a buy or insurance call.

## License

Proprietary. Use of the hosted MCP is governed by EasyPost's terms.
