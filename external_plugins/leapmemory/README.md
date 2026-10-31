# LeapMemory plugin for Grok Build

Connect Grok Build to [LeapMemory](https://leapmemory.com), a permanent memory
for your assistant. Say something once and it is recalled in every future
conversation, in the exact words, in any of 19 languages. One memory works
across Grok Bot, Claude, Cursor and any MCP client. Docs:
https://leapmemory.com/docs/overview

## Installation

In Grok Build, open `/plugin`, search for **LeapMemory**, and install.

On first connection, Grok opens LeapMemory sign-in in the browser. Do not paste
an API key into chat; none is needed.

## Tools

`briefing`, `recall`, `remember`, `add_rule`, `list_rules`, `update_rule`.

## Authentication

The plugin connects to `https://api.leapmemory.com/mcp`. Authentication is
OAuth with dynamic client registration; the browser sign-in page is served
from `https://app.leapmemory.com`.

Network endpoints:

- `https://api.leapmemory.com/mcp`: hosted MCP (streamable HTTP)
- `https://app.leapmemory.com`: browser OAuth sign-in

Credentials: a LeapMemory account (Free plan is enough). No API key is stored
in the plugin. Each person's memory lives in its own physically isolated store.

## License

Proprietary. Use of the hosted MCP is governed by LeapMemory's terms.
