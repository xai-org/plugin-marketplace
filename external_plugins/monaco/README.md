# Monaco

[Monaco](https://monaco.com) is an AI-driven sales platform. This plugin connects Grok to your
Monaco workspace through the [Monaco MCP server](https://docs.monaco.com/mcp/overview), so you can
search, update, and act on your CRM data in natural language — no custom integration required.

## What you can do

- **Start outbound to a new segment.** Find contacts matching firmographic criteria, tag them as an
  audience, and enroll them in a sequence — all in one conversation.
- **Get up to speed on an account before a meeting.** Open opportunities, engaged contacts, recent
  meetings with AI summaries, and outstanding tasks in one prompt.
- **Keep your pipeline clean.** Find slipped close dates or stalled deals and update or close them
  in bulk.
- **Build a custom revenue dashboard.** Cohort win rates, net new ARR, weighted pipeline forecasts,
  and loss-reason breakdowns computed directly from your live opportunities.

## Tools

The server exposes tools for contacts, accounts, opportunities, tasks, meetings (including AI
summaries and transcripts), sequences, sequence templates, audiences, campaigns, tags, bulk
actions, entity field schemas, and a natural-language analytics copilot. The full tool list is in
the [MCP documentation](https://docs.monaco.com/mcp/overview).

Every tool call enforces the authenticated user's existing Monaco permissions. Reads are
auto-approved by the client; writes and deletes prompt for confirmation by default.

## Network and authentication

- **Endpoint:** `https://mcp.monaco.com/mcp` (Streamable HTTP). This is the only network endpoint
  the plugin calls.
- **Authentication:** OAuth 2.0. Your MCP client opens the Monaco login in a browser on first
  connection; no API keys or credentials are stored in this plugin.
- **Rate limits:** shared with the Monaco public REST API — 100 requests per minute per
  organization, sliding window. The server returns HTTP 429 when exceeded.

## Requirements

A Monaco account. The MCP server is in beta; tool schemas may change.
