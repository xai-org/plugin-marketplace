# EasyPost plugin for Grok Build

Connect Grok Build to [EasyPost](https://www.easypost.com) - shipments, trackers, addresses, carrier accounts, pickups, refunds, insurances, and claims - via EasyPost's hosted MCP server.

## Installation

In Grok Build, open `/plugin`, search for **EasyPost**, and install.

On first connection, Grok opens the EasyPost sign-in in the browser. Use an EasyPost account. Agents and platforms that already hold a merchant's production EasyPost API key can skip the sign-in and send it as `Authorization: Bearer <api key>`.

## Authentication

The plugin connects only to `https://app-api.easypost.com/mcp`. Authentication is OAuth 2.1 against that host, discovered via the MCP OAuth protected resource metadata at `https://app-api.easypost.com/.well-known/oauth-protected-resource/mcp`. The access token is an opaque `epat_...` value minted by EasyPost's authorization server; no API key is stored in the plugin.

Production EasyPost API keys are also accepted on the same endpoint as `Authorization: Bearer <api key>`.

## Tools

All tools are read-only and run in production mode:

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
