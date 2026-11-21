---
name: osmo-ai-receptionist
description: Use when the user wants to run their AI phone receptionist or answering service from Grok — see missed calls and who called and why, open a call's summary, transcript and recording, screen a caller, call back someone who called them in the last 30 days, or change who is put through, VIP and block lists, caller rules, the assistant's language and bookings. Works on the user's own calls only (OsmO app plan with call forwarding). Not for calling businesses or new numbers (use the osmo plugin), SMS or email.
---

# OsmO AI Receptionist

OsmO answers calls to the user's own phone number: its AI receptionist talks to each caller,
screens spam, takes the message or booking request and follows the user's rules. This skill runs
that receptionist from Grok through the hosted OsmO MCP server.

- MCP server: `https://api.getosmo.app/mcp/receptionist` (Streamable HTTP, OAuth 2.1; no API key)
- Setup: the OsmO app (https://getosmo.app/app) with a plan and call forwarding on.
- To call businesses or new numbers, use the `osmo` plugin (OsmO Phone Calls).

## Connect

On first use Grok opens `https://api.getosmo.app/mcp/oauth/connect`. The user enters their phone
number and a one-time code there. Never ask for that code in chat, and never store or repeat it.

## How to use it

1. Use only the tools the server returns; call `osmo_help` when unsure.
2. **"What did I miss?"**: `missed_calls`, then `list_calls` / `get_call` for the summary,
   transcript and recording link. Lead with what each caller wanted and anything urgent.
3. **Call back** a caller from the last 30 days: `call_back` shows a preview first; place it only
   after the user says yes, then follow it with `get_call_status`.
4. **Screen a caller**: `screen_caller` blocks or always allows a caller straight from one of
   their calls (preview first, apply on a yes).
5. **Settings** (`get_settings` / `update_settings`): who is put through, pausing the AI, VIP and
   block lists. `vipList` and `blockList` replace the whole list, so read first and send the full
   new list.
6. **Rules** (`list_rules`, `add_rule`, `update_rule`, `delete_rule`) and **assistant**
   (`get_assistant`, `update_assistant`): show the change, apply on a yes. Look people up with
   `find_contact`.
7. Read-only: `list_bookings`, `get_facts`, `get_connections`, `get_account_status`. Carrier
   forwarding codes come from `osmo_support` (topic `forwarding`); never guess them.

## Boundaries

- Never ask for card numbers, PINs, passwords, one-time codes or government ID numbers.
- Show call details only to the signed-in owner. The skill talks only to `https://api.getosmo.app`.
