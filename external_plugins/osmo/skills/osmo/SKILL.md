---
name: osmo
description: Use when the user wants an AI to place a real phone call for them — call a shop, clinic, restaurant, helpline or a person they know, ask a question, book or confirm something, and bring back the answer with a summary. Also use to see who called the user's OsmO number, what they wanted, and to change OsmO call screening rules. Free to start in the US, Canada, UK and Australia. Not for SMS or email.
---

# OsmO Phone Calls

OsmO's AI makes phone calls for the user and answers calls to their own number. This skill uses
the hosted OsmO MCP server. There is no API key: the user signs in once with their phone number.

- MCP server: `https://api.getosmo.app/mcp` (Streamable HTTP, OAuth 2.1 with PKCE and dynamic
  client registration)
- New users get 50 free credits at https://getosmo.app/login (US, Canada, UK, Australia).
- Terms: https://getosmo.app/terms · Privacy: https://getosmo.app/privacy

## Connect

The plugin bundles the `osmo` MCP server. On first use Grok opens the OsmO sign-in page
(`https://api.getosmo.app/mcp/oauth/connect`). The user enters their phone number and a one-time
code there. Never ask for that code in chat, and never store or repeat it.

## How to use it

1. Read the tool list the server returns and use only those tools. Call `osmo_help` when unsure
   what OsmO can do for this account.
2. **Before any call:** state who will be called (name and number) and exactly what OsmO will say
   or ask. Place the call only after the user says yes. A call reaches a real person.
3. After placing a call, check its status with the status tool and report the outcome and summary.
   Do not claim something was done on the call unless the result says so.
4. Changes to settings or screening rules: show the change first, apply only after a yes.
5. If the account has no credits or no plan, say so and point the user to
   https://getosmo.app/login. Do not retry.

## Boundaries

- Never ask the user, or tell OsmO to ask the callee, for card numbers, bank PINs, passwords,
  one-time codes or government ID numbers.
- No harassment, spam, robocalls or calls the callee would not expect from this user.
- The skill talks only to `https://api.getosmo.app`. It runs no local code and reads no files.
