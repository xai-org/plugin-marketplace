# ClipUGC plugin for Grok Build

Connect Grok Build to [ClipUGC](https://clipugc.com): short vertical UGC videos
for mobile apps, made with AI influencers who keep the same face in every video.

- Paste an App Store or Google Play link and `first_videos` makes three finished
  videos for that app, free.
- Pick a public AI influencer or create your own, make silent reaction clips,
  put hook lines and your app footage on them, and plan 30 days of posts.
- Everything spends credits from your own ClipUGC account. Anything that costs
  credits is quoted first and runs only after you confirm.

## Installation

In Grok Build, open `/plugin`, search for **ClipUGC**, and install.

On first connection, Grok opens the ClipUGC sign-in page in the browser. Sign in
with your ClipUGC account and approve the connection. Do not paste an API key or
token into the chat.

## What is included

The hosted ClipUGC MCP server at `https://clipugc.com/mcp` (Streamable HTTP).
Nothing runs locally: no scripts, hooks or commands. The server describes its
own tools and ships usage guidance in its instructions.

## Authentication and network endpoints

The plugin connects only to `clipugc.com`. Authentication is OAuth 2.1 with PKCE
and dynamic client registration against that host.

- `https://clipugc.com/mcp`: hosted MCP server.
- `https://clipugc.com/oauth/register`, `/oauth/authorize`, `/oauth/token`: OAuth 2.1.
- `https://clipugc.com/.well-known/oauth-protected-resource` and
  `/.well-known/oauth-authorization-server`: discovery.

Credentials: a ClipUGC account. The access token carries the `mcp:use` scope
only. A connected client can use the ClipUGC tools as you, with your credits. It
cannot change your password, email, plan or payment details. You can end the
connection from your ClipUGC account at any time.

Setup for other clients and the full tool list: https://clipugc.com/mcp

## License

Use of the hosted service is governed by the ClipUGC terms at
https://clipugc.com/terms-of-service.
