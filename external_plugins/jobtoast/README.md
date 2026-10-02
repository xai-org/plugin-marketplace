# Job Toast plugin for Grok Build

Connect Grok Build to [Job Toast](https://jobtoast.io). Job Toast keeps the jobs
you are tracking, your work profile, application and interview answers, and
cover-letter drafts.

Job Toast does not search the open job market and does not submit applications
on employer sites. You still send the application yourself.

## Installation

In Grok Build, open `/marketplace`, search for **Job Toast**, and install it.
Trust the plugin when asked. The package contains no local program and no
credentials.

On first connection, open `/mcps`, select Job Toast, and press `i`. Grok opens
Job Toast sign-in in the browser. Use the Job Toast account you already use.
Do not paste an API key or token into chat.

## Authentication

The plugin connects only to `https://jobtoast.io/mcp`. Authentication is
OAuth 2.1 with PKCE. Grok registers a public client and you approve the
connection in the browser.

Network endpoints:

- `https://jobtoast.io/mcp` — hosted MCP (streamable HTTP)
- `https://jobtoast.io/.well-known/oauth-authorization-server` — OAuth discovery
- `https://jobtoast.io/oauth/register` — dynamic client registration
- `https://jobtoast.io/oauth/chatgpt/authorize` — browser approval
- `https://jobtoast.io/oauth/chatgpt/token` — token exchange

Credentials: a Job Toast account. No API key is stored in this plugin. The
access token is a Job Toast bearer token. You can disconnect it from
Job Toast under Settings → Connected apps.

## What the connection can do

With your approval, Grok can read and update saved jobs, read and update your
work profile, save application and interview answers, and draft a cover letter
or an interview answer. Drafting uses Job Toast's AI quota.

## License

Proprietary. Use of the hosted MCP is governed by Job Toast's terms.
