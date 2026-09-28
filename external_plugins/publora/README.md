# Publora plugin for Grok Build

Connect Grok Build to [Publora](https://publora.com) to draft, schedule and publish social media posts to LinkedIn, X, Instagram, Threads, TikTok, YouTube, Facebook, Bluesky, Mastodon and Telegram.

## Installation

In Grok Build, open `/plugin`, search for **Publora**, and install.

On first connection, Grok opens Publora sign-in in the browser. Sign in with your Publora account and approve access. There is no API key to paste.

You need a Publora account with at least one social account connected in the Publora dashboard. The free Starter plan (no card) includes MCP access, 3 social accounts and 15 posts a month on every network except X.

## What it can do

- List the social accounts connected to Publora
- Create drafts, schedule posts for a chosen time, or publish now
- Upload images and video to a post
- List, update and delete scheduled posts
- Read post and profile stats (Bluesky, Mastodon)
- Comment, react and reshare on LinkedIn

A post created without a time stays a draft and is never published. Read and write actions are separate tools with MCP annotations, so anything that publishes or deletes can be confirmed first.

To test the full publishing path without reaching a real audience, post to `publora-playground`: the request is validated and acknowledged like a real one, then discarded.

## Authentication

The plugin connects only to `https://mcp.publora.com/mcp`. Authentication is OAuth 2.1 with PKCE against that host.

Network endpoints:

- `https://mcp.publora.com/mcp` — hosted MCP (streamable HTTP)
- `https://mcp.publora.com/authorize`, `/token`, `/register` — OAuth 2.1 + PKCE + dynamic client registration
- `https://app.publora.com` — human sign-in

Credentials: a Publora account. The access token is sent as `Authorization: Bearer` on `/mcp`. No API key is stored in the plugin. Tools act only on the social accounts the signed-in user connected in Publora.

## Links

- Documentation: https://docs.publora.com/mcp/client-setup
- Support: support@publora.com
- Privacy: https://publora.com/privacy

## License

MIT. Use of the hosted MCP server is governed by Publora's terms: https://publora.com/terms
