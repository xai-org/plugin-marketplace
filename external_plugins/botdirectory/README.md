# botdirectory plugin for Grok Build

Connect Grok Build to [botdirectory.org](https://botdirectory.org) — the open,
ad-free catalog of copy-paste **Grok bot templates** (system-prompt teammate
recipes). It complements Grok's curated in-app Bots shelf: browse proven templates
before building a new Grok bot, and publish your own so others can find and copy it.

## Installation

In Grok Build, open `/plugin`, search for **botdirectory**, and install.

## Tools

| Tool | What it does | Auth |
|---|---|---|
| `search_grok_bot_templates` | Free-text / category search over the grok catalog | none |
| `get_grok_bot_template` | Fetch one template's full prompt by slug | none |
| `connect_linkedin` | Get the one-time link to sign in and copy a token | none |
| `publish_grok_bot_template` | Publish a template to the directory | LinkedIn |
| `whoami` | Check whether a token is connected | none |

## Authentication

The plugin connects only to `https://botdirectory.org/api/mcp`.

**Browsing is keyless** — `search_grok_bot_templates` and `get_grok_bot_template`
work with no sign-in.

**Publishing requires a one-time LinkedIn sign-in**, so every submission is tied to
a real identity (the same gate the website uses):

1. Call `connect_linkedin` (or hit the `needs_auth` response from a publish attempt)
   to get the connect URL, `https://botdirectory.org/connect`.
2. The user opens it, signs in with LinkedIn once in the browser, and copies the
   token shown.
3. The user pastes the token back; pass it as the `token` argument to
   `publish_grok_bot_template` (or send it as an `Authorization: Bearer` header).

The token is a botdirectory session credential — treat it like a password, keep it
to the current user, and don't log or share it. It expires; re-run the connect flow
when a call reports `needs_auth`.

## Security and network

- The only endpoint this connector calls is `https://botdirectory.org`.
- It reads no local files, no `.env`, and no environment variables.
- It runs no scripts, hooks, or postinstall steps — it is a hosted HTTP MCP only.
- The only sign-in is LinkedIn OAuth, completed in the browser.

## License

Proprietary. Use of the hosted MCP is governed by botdirectory.org's terms.
