# Teslemetry plugin for Grok Build

Connect Grok Build to [Teslemetry](https://teslemetry.com) — an improved Tesla
Fleet API and real-time Fleet Telemetry stream for the vehicles and energy
products on your own Tesla account.

## What it does

The plugin ships a hosted MCP server plus a skill:

- **MCP server** — list your products, read cached vehicle telemetry (free,
  never wakes the car), read energy site status, tariffs and backup settings,
  wait for a telemetry field to change, manage which telemetry fields a vehicle
  streams, and send vehicle and energy commands (lock/unlock, climate, charge
  limit and amps, sentry mode, windows, storm mode, operation mode, and the
  rest of the signed-command set).
- **Skill** — tells Grok to prefer the MCP tools for live account data, and
  carries the REST essentials (base URL, auth, credits, streaming model) plus a
  pointer to <https://api.teslemetry.com/llms.txt> for the full API reference
  when you are writing integration code rather than reading your own account.

## Installation

In Grok Build, open `/plugin`, search for **Teslemetry**, and install.

## Authentication

There is no API key to paste. On first connection Grok opens Teslemetry sign-in
in the browser; the plugin uses OAuth 2.1 with dynamic client registration and
PKCE (S256) against `api.teslemetry.com`, and the resulting bearer token is sent
as `Authorization: Bearer` on `/mcp`. Never paste a Teslemetry token into chat.

Network endpoints:

- `https://api.teslemetry.com/mcp` — hosted MCP (streamable HTTP)
- `https://teslemetry.com/connect` — human sign-in / authorization
- `https://api.teslemetry.com/oauth/token`, `/oauth/register` — OAuth 2.1 + DCR
- `https://api.teslemetry.com/.well-known/oauth-authorization-server`,
  `/.well-known/oauth-protected-resource` — OAuth metadata discovery

Credentials: a Teslemetry account, which in turn holds the Tesla OAuth scopes
the account owner granted. Data reads need Tesla's data-access scopes
(`vehicle_device_data`, `energy_device_data`) and commands need the command
scopes (`vehicle_cmds`, `vehicle_charging_cmds`, `energy_cmds`); a missing scope
returns `403`. The plugin reaches only the signed-in customer's own Tesla
vehicles and energy sites — no other account's data is accessible.

Vehicle commands actuate a real car and, along with fresh data reads, consume
Teslemetry credits; cached telemetry reads are free.

## License

Proprietary. Use of the hosted MCP and API is governed by
[Teslemetry's terms](https://teslemetry.com).
