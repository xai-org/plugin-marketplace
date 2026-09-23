# SourcetoMCP

Connects Grok to [SourcetoMCP](https://sourcetomcp.com), a hosted MCP server
that gives AI agents governed, real-time access to a user's connected
marketing, product and finance data sources — Google Ads, Google Analytics,
Search Console, Meta Ads, TikTok Ads, LinkedIn Ads, Reddit Ads, Pinterest,
Ahrefs, PostHog, Google Sheets, Google Docs and Google Slides.

## Installation

In Grok Build, open `/plugin`, search for "SourcetoMCP", and install. On
first use you'll be sent through a browser sign-in against your own
SourcetoMCP account.

If you don't already have a SourcetoMCP account, create one at
[sourcetomcp.com](https://sourcetomcp.com) and connect at least one data
source from your dashboard before using this plugin — the tools this
plugin exposes are exactly the sources you've connected there, nothing is
auto-granted.

## Authentication

This plugin talks to exactly one endpoint:

- `https://sourcetomcp.com/api/mcp`

Authentication is OAuth 2.1 (discovered via
`https://sourcetomcp.com/.well-known/oauth-authorization-server`), with
dynamic client registration — the same OAuth flow used by every other MCP
client SourcetoMCP supports (Claude, ChatGPT, Gemini, Cursor). On
successful sign-in, Grok holds a short-lived JWT bearer token scoped to
your SourcetoMCP account; no API key is stored locally by this plugin, and
this plugin never sees or stores your Google/Meta/TikTok/LinkedIn/Reddit/
Ahrefs/PostHog credentials directly — those are authorized separately,
inside your own SourcetoMCP account at sourcetomcp.com/dashboard, before
this plugin ever connects.

Tool availability is scoped to whichever sources and brands your signed-in
SourcetoMCP account has connected; nothing is accessible beyond what
you've explicitly linked there.

## License

SourcetoMCP is a commercial hosted service. Use of the underlying service
is governed by SourcetoMCP's own [Terms of Service](https://sourcetomcp.com/terms)
and [Privacy Policy](https://sourcetomcp.com/privacy), independent of this
plugin's own license.
