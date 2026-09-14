# Connections plugin for Grok Build

Connect Grok Build to [Connections](https://connections.icu) - an AI-first business platform.
Through one hosted MCP server an assistant can host and ticket events, invite and message guests,
import and search contacts, post to and browse the Deal Flow marketplace, keep notes, to-dos and
agent memory, and take payments.

## Installation

In Grok Build, open `/marketplace`, search for **Connections**, and install.

On first connection Grok opens Connections sign-in in the browser. Sign in with a Connections
account. Do not paste an API key or a token into chat - the plugin never asks for one.

A free base plan covers the core tools; paid Pass tiers (Pro, Business, Business Plus) unlock the
rest. Per-assistant setup steps for humans live at <https://studio.connections.icu/connect>.

## Authentication

The plugin connects only to `https://studio.connections.icu/v1/mcp`. Authentication is OAuth 2.1 with
PKCE (S256) and dynamic client registration, against `accounts.connections.icu`.

Network endpoints:

- `https://studio.connections.icu/v1/mcp` - hosted MCP (streamable HTTP)
- `https://studio.connections.icu/.well-known/oauth-protected-resource` - protected-resource metadata
- `https://accounts.connections.icu/oauth/authorize`, `/oauth/token`, `/oauth` - OAuth 2.1 + DCR
- `https://accounts.connections.icu` - human sign-in

Credentials: a Connections account. The access token is issued by `accounts.connections.icu` and
sent as `Authorization: Bearer` on `/v1/mcp`. No API key, secret or environment variable is read or
stored by the plugin, and nothing is written to disk.

## What it ships

An MCP server only. No skills, no slash commands, no agents, no hooks, no LSP servers, and no code
that executes on the installing machine. Tools are scoped to the workspaces the signed-in account
can already access.

## License

Proprietary. Use of the hosted MCP is governed by Connections' terms at
<https://connections.icu/terms>.
