# MyCheck plugin for Grok

Connect Grok to [MyCheck](https://mycheck.co) — save a checklist worked out in
the conversation straight into your MyCheck account, add items to one you
already have, read your checklists back, and check where the US immigration
cases you track stand.

## Installation

In Grok Build, open `/plugin`, search for **MyCheck**, and install.

On first connection, Grok opens MyCheck sign-in in the browser. Use a MyCheck
account (email and password, or Google). Do not paste a token into chat —
MyCheck issues none, and nothing here asks for one.

## Authentication

The plugin connects only to `https://mcp.mycheck.co/mcp`. Authentication is
OAuth 2.1 with PKCE against that host, with dynamic client registration and
Client ID Metadata Documents both supported.

Network endpoints:

- `https://mcp.mycheck.co/mcp` — hosted MCP (streamable HTTP)
- `https://mcp.mycheck.co/oauth/authorize`, `/token`, `/register`, `/revoke`
- `https://mycheck.co/app/connect` — human sign-in and the consent screen

Credentials: a MyCheck account, free to create. Access tokens are short-lived
and bound to the person who approved them; refresh tokens rotate. No API key
exists and none is stored in the plugin. Every connected app is listed in
MyCheck Settings and can be disconnected at any time; changing your MyCheck
password disconnects all of them.

## Tools

| Tool | What it does |
|---|---|
| `create_checklist` | Saves a new checklist, with sections and items |
| `add_checklist_items` | Appends items to a checklist you already have |
| `list_checklists` | Lists the checklists on your account |
| `get_checklist` | Reads one checklist, with each item's done state |
| `get_case_updates` | Reads the stored status of the USCIS cases you track |

## What it will not do

These are enforced by the server, not by the model:

- Nothing it saves is published. Checklists are private to the account.
- Your conversation is never sent to MyCheck — only the checklist content you
  ask it to save.
- Checklists linked to a USCIS case are excluded from every read tool.
- Receipt numbers, A-numbers and USPS tracking numbers are masked in every
  response.
- No tool can add or change a USCIS case. Cases are entered by the person
  inside MyCheck.
- No tool deletes anything, or marks an item done.

MyCheck is an informational tool and does not provide legal advice.

## Support

https://mycheck.co/support · info@sfdify.com

Operated by SFDIFY LLC. Privacy: https://mycheck.co/privacy ·
Terms: https://mycheck.co/terms
