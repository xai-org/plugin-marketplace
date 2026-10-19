# Schedulin plugin for Grok Build

Connect Grok Build to [Schedulin](https://www.schedulin.app) — social media
scheduling and publishing across TikTok, Instagram, YouTube, X (Twitter),
LinkedIn, Facebook, Pinterest, Threads, Bluesky, Reddit and Telegram.

## What you can do

- Draft, schedule, queue, update, publish and delete posts
- List connected social accounts and per-platform requirements (caption
  limits, media rules, TikTok creator info, Pinterest boards)
- Attach media by public URL, or generate a signed upload link for files on
  your device
- Generate AI images
- Manage tags and ideas, and inspect queue schedules
- Read analytics: overview, per-platform, top posts and per-post series

## Installation

In Grok Build, open `/plugin`, search for **Schedulin**, and install.

On first connection, Grok opens the Schedulin consent screen in your browser.
Sign in with your Schedulin account and approve access. Do not paste an API
key or token into chat.

## Authentication

The plugin is a single hosted MCP server; it ships no code, hooks or scripts.
Authentication is OAuth 2.1 (authorization code + PKCE) with RFC 7591 dynamic
client registration.

Network endpoints:

- `https://mcp.schedulin.app/mcp` — hosted MCP (streamable HTTP)
- `https://api.schedulin.app/oauth/register`, `/oauth/authorize`,
  `/oauth/token`, `/oauth/revoke` — OAuth 2.1 + DCR
- `https://api.schedulin.app/.well-known/oauth-authorization-server` and
  `https://mcp.schedulin.app/.well-known/oauth-protected-resource` — discovery

Credentials: a Schedulin account. No API key is stored in the plugin. Access is
scoped to the organization you approve on the consent screen, with these OAuth
scopes: `posts:read`, `posts:write`, `tags:read`, `tags:write`,
`social-accounts:read`, `media:read`, `media:write`, `analytics:read`,
`ai:read`, `ai:write`. You can revoke access at any time from Schedulin
settings.

Docs: https://developers.schedulin.app

## License

Proprietary. Use of the hosted MCP is governed by Schedulin's terms of service.
