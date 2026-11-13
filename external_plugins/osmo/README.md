# OsmO Phone Calls plugin for Grok Build

[OsmO](https://getosmo.app)'s AI makes real phone calls for you. Tell Grok who to call and why — a
shop, a clinic, a restaurant, a helpline or someone you know — and OsmO calls, talks, and brings back
the answer with a summary. OsmO also answers and screens calls to your own number, so Grok can tell
you who called and what they wanted.

New users get 50 free credits at [getosmo.app/login](https://getosmo.app/login). Free to start in the
US, Canada, UK and Australia.

## Installation

In Grok Build, open `/plugin`, search for **OsmO**, and install. On first connection Grok opens the
OsmO sign-in page; enter your phone number and the one-time code there. No API key is needed and
nothing should be pasted into chat.

## What you get

- **MCP server** `osmo` at `https://api.getosmo.app/mcp` (Streamable HTTP, OAuth 2.1).
- **Skill** `osmo`: confirm the callee and the message before every call, report only what the call
  result says, show setting changes before applying them, never ask for card numbers, PINs,
  passwords or one-time codes.

Tools (the server's `tools/list` is the source of truth): place a call, check a call's status, list
recent and past calls, open one call, find a contact or business, find a company's customer-care
number, schedule and cancel calls, read and change call settings and screening rules, account status,
and `osmo_help`. Every tool carries MCP annotations (`readOnlyHint`, `destructiveHint`,
`openWorldHint`); placing a call is marked destructive and open-world.

## Example prompts

- "Call the pharmacy on Main Street and ask if they're open until 9."
- "What did I miss on my phone today?"
- "Call my dentist and move my appointment to next Tuesday afternoon."
- "Find the customer-care number for my airline and ask about my refund."

## Authentication and network

The plugin connects only to `https://api.getosmo.app`.

- `https://api.getosmo.app/mcp` — hosted MCP (Streamable HTTP)
- `https://api.getosmo.app/.well-known/oauth-protected-resource/mcp`,
  `/.well-known/oauth-authorization-server` — discovery
- `https://api.getosmo.app/mcp/oauth/authorize`, `/token`, `/register`, `/revoke` — OAuth 2.1 with
  PKCE and dynamic client registration
- `https://api.getosmo.app/mcp/oauth/connect` — the sign-in page (phone number + one-time code)

Scopes: `osmo.help`, `calls.read`, `calls.write`, `offline_access`. The plugin bundles no API key and
has no hooks, scripts or local executable code.

## License

MIT for the files in this plugin. Use of OsmO is governed by the
[OsmO terms](https://getosmo.app/terms) and [privacy policy](https://getosmo.app/privacy).
