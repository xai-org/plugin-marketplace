# OsmO Phone Calls plugin for Grok Build

[OsmO](https://getosmo.app)'s AI makes real phone calls for you. Tell Grok who to call and why — a
shop, a clinic, a restaurant, a helpline or one of your contacts — and OsmO calls, gets through the
phone menu, talks, and brings back the answer with a summary, transcript and recording link. OsmO is
also your AI phone receptionist: it answers and screens calls to your own number, so Grok can tell
you who called and what they wanted, and change how the receptionist handles your calls.

New users in the US, Canada, UK and Australia get 50 free credits at
[getosmo.app/login](https://getosmo.app/login). An answered call uses 3 credits; a call nobody answers
is free. Free credits call businesses and toll-free numbers; calling your contacts, calling back
people who called you, scheduling calls and the AI receptionist need an OsmO app plan.

## Installation

In Grok Build, open `/plugin`, search for **OsmO**, and install. On first connection Grok opens the
OsmO sign-in page; enter your phone number and the one-time code there. No API key is needed and
nothing should be pasted into chat.

## What you get

- **MCP server** `osmo` at `https://api.getosmo.app/mcp` (Streamable HTTP, OAuth 2.1).
- **Skill** `osmo`: confirm the callee and the message before every call, report only what the call
  result says, show setting changes before applying them, never ask for card numbers, PINs,
  passwords or one-time codes.

Tools (the server's `tools/list` is the source of truth; 27 today):

- **Calls:** place a call to 1–5 numbers (preview first, dialled only on your yes) and follow its
  status; find a business (Google Maps listings) or a company's customer-care number; find a contact
  in your call history or phone contacts; schedule calls for later, list and cancel them; list past
  calls and open one for its summary, transcript and ▶ Play recording link.
  In AI apps that show MCP Apps cards, a live OsmO call card follows each call (Confirm, placed,
  in call, ended, summary, recording, Call again / Schedule; up to 5 calls together in one card).
  Scheduled times are read in your own time zone, a ready result can offer to call again with the
  same words, and a confirmed call is placed only once.
- **AI receptionist:** read and change settings (pause the AI, who is put through live, alerts, VIP
  and block lists); see and switch which assistant answers and its language (English or Hindi);
  list, add, change and delete caller rules; list upcoming and past bookings; read the Facts the
  assistant answers from and whether Google Calendar, Calendly and Google Drive are connected. The
  greeting, assistant names and voice are changed in the OsmO app.
- **Account and help:** your OsmO app chats, account status (plan, or web credits left),
  `osmo_support` and `osmo_help`. Every tool carries MCP annotations (`readOnlyHint`, `destructiveHint`,
`openWorldHint`); placing a call is marked destructive and open-world.

## Example prompts

- "Call the pharmacy on Main Street and ask if they're open until 9."
- "What did I miss on my phone today?"
- "Pause my AI receptionist for the rest of the day."
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
