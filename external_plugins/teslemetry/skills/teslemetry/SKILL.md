---
name: teslemetry
description: >-
  Read and control Tesla vehicles and energy products through Teslemetry, and
  write code against the Teslemetry API. Use whenever "Teslemetry" is mentioned,
  and for Tesla requests generally: vehicle state, battery/charge level, climate,
  locks, sentry mode or other vehicle commands; Powerwall, solar or energy site
  status, backup reserve, storm mode or tariffs; Tesla Fleet API, Fleet
  Telemetry, streamed vehicle fields, or a live telemetry stream.
---

# Teslemetry

Teslemetry is an improved Tesla Fleet API and real-time Fleet Telemetry stream
covering a customer's own Tesla vehicles and energy products (Powerwall, solar).

## Prefer the MCP tools for live account data

When the request is about the user's actual vehicles or energy sites — "is my
car charging?", "what's the Powerwall at?", "lock the car", "set the charge
limit to 80" — use this plugin's MCP tools, not hand-written HTTP calls. They
are already authenticated as the signed-in Teslemetry account.

- Call `products` first to discover VINs, energy site IDs, and capabilities.
- `get_vehicle_telemetry` returns cached telemetry: free, and it never wakes the
  vehicle. Prefer it for reads.
- A field only appears in telemetry once it has been added to the vehicle's
  streaming configuration and the vehicle has reported it since. Inspect with
  `get_vehicle_field_config`, change with `add_telemetry_fields` /
  `remove_telemetry_fields`. An unconfigured field is silently absent, not an
  error — check the configuration before concluding data is missing.
- `wait_for_telemetry_change` long-polls for a field to change.
- Commands (`command_*`, `energy_*`, `send_command`, `wake_up`) drive the real
  vehicle pipeline: they may wake the vehicle and consume credits. Confirm intent
  before actuating anything, and prefer the first-class `command_*` tools over
  raw `send_command`.

Use the REST API below only when the task is writing or debugging integration
code, or when no MCP tool covers the endpoint.

## REST API reference

The authoritative, always-current reference is
<https://api.teslemetry.com/llms.txt>; fetch it when you need endpoint detail.
The full machine-readable specification is at
<https://api.teslemetry.com/openapi.json> (interactive docs at
<https://api.teslemetry.com/docs>). The summary below is a copy of that
document's getting-started section and per-area index, current as of this
plugin's release.

### Getting started

- **Base URL:** `https://api.teslemetry.com` — a global load balancer that routes
  each request to your account's region. You do not need to choose a region.
- **Auth:** send your token as a Bearer token in the `Authorization` header, or
  as a `token` query parameter.
- **Success responses** are wrapped: `{ "response": <data> }`.
- **Response shapes:** each endpoint in the per-area documents lists a truncated,
  generated example under `Returns`; full per-field response schemas are omitted
  there to keep those documents small — see `/openapi.json` for exact shapes.
- **Credits:** vehicle commands and fresh data reads consume credits.
  `GET .../telemetry` is always free (cache/stream-only, never calls Tesla).
  `GET .../vehicle_data` with `use_cache=true` (the default) is free only when a
  classic cache entry exists and is under 20 minutes old, or the vehicle is not
  online; once that entry is missing or stale and the vehicle is online, the same
  call performs a charged on-demand refresh.
- **First call:** `GET /api/metadata` — it returns your VIN(s), granted scopes,
  and each vehicle's Fleet Telemetry sync state and firmware in one request, so
  it's the fastest way to see what you have access to before calling anything
  else.

### Consuming vehicle data

`GET /sse/:id?` is the one consumption path for vehicle data: a long-lived, free
`text/event-stream` connection that opens with a cache snapshot then tails live
updates; omit `:id` to stream every vehicle. Never poll
`GET /api/1/vehicles/:vin/vehicle_data` as a way of getting vehicle data — it is
a credit-costing Fleet API call once its cache entry is stale. Use the one-shot
`GET /:vin/telemetry` (and its long-poll sibling `GET /:vin/telemetry/wait`) for
a spot check.

Streamed `data` events use Fleet Telemetry's flat field vocabulary
(`DetailedChargeState`, `Gear`, `Locked`); `vehicle_data` and `/:vin/telemetry`
use the classic nested vocabulary (`charge_state.charging_state`,
`drive_state.shift_state`, `vehicle_state.locked`). Enum-typed streaming values
carry a state-name prefix to strip (`ShiftStateP` → `P`). Field definitions are
at <https://api.teslemetry.com/fields.json>.

### Endpoint areas

Each page documents the endpoints for one area, including their parameters:

- [Streaming](https://api.teslemetry.com/llms/streaming.md) — Teslemetry streaming endpoint
- [General](https://api.teslemetry.com/llms/general.md) — products endpoint
- [Vehicle](https://api.teslemetry.com/llms/vehicle.md) — vehicle data endpoints
- [Vehicle Command](https://api.teslemetry.com/llms/vehicle-command.md) — vehicle command endpoints
- [Vehicle Custom Commands](https://api.teslemetry.com/llms/vehicle-custom-commands.md) — commands specific to Teslemetry
- [Energy](https://api.teslemetry.com/llms/energy.md) — energy product endpoints
- [Energy Command](https://api.teslemetry.com/llms/energy-command.md) — energy command endpoints
- [User](https://api.teslemetry.com/llms/user.md) — Tesla user account information
- [Meta](https://api.teslemetry.com/llms/meta.md) — Teslemetry specific endpoints
- [Charging](https://api.teslemetry.com/llms/charging.md)

### Errors

Failed responses use
`{ "response": null, "error": "<code>", "error_description": "<optional detail>" }`.

- `401` — missing or invalid token.
- `402` — out of credits.
- `403` — token is missing a required Tesla OAuth scope. Reads need
  `vehicle_device_data` / `energy_device_data`; commands need `vehicle_cmds`,
  `vehicle_charging_cmds` or `energy_cmds`.
- `404` — unknown vehicle/resource.
- `408` — vehicle is asleep or unreachable; retry, or wake it first.
- `429` — rate limited; honor `Retry-After` when present, then retry.
- `5xx` — upstream Tesla or Teslemetry error; retry with backoff.

Vehicle commands use Tesla's signed-command protocol and require the Teslemetry
virtual key to be paired to the vehicle; check with
`POST /api/1/vehicles/fleet_status`.

### Client libraries

For generating integration code rather than calling HTTP directly — the
streaming libraries consume the same `GET /sse/:id?` surface:

- Python, Tesla Fleet API (cloud + BLE vehicle/energy commands):
  <https://github.com/Teslemetry/python-tesla-fleet-api>
- Python, typed telemetry stream listeners:
  <https://github.com/Teslemetry/python-teslemetry-stream>
- TypeScript, `@teslemetry/api` (incl. SSE):
  <https://github.com/Teslemetry/typescript-teslemetry>
