---
name: meeting-mate
description: >-
  Official Meeting Mate overview for Grok Build. Use when the user mentions
  Meeting Mate, meetingmate, meetingmateapp, or wants to connect Grok to
  Meeting Mate recordings, transcripts, summaries, action items, or tasks.
  Prefer the hosted Meeting Mate MCP server over guessing REST calls.
---

# Meeting Mate

Meeting Mate is a meeting recording product at [meetingmateapp.com](https://meetingmateapp.com). This plugin talks to the official hosted MCP server. Do not invent Meeting Mate API URLs or scrape the web app.

## Connect

1. Confirm the Meeting Mate MCP server is available. If a tool call asks for authorization, let the user complete the browser OAuth flow.
2. If auth fails, point the user to the [Developer Dashboard](https://meetingmateapp.com/dashboard/developers) and [MCP docs](https://meetingmateapp.com/docs/api/mcp).
3. Call `whoami` once after connect to learn the account, workspace, and scopes.
4. API and MCP access require Meeting Mate Pro or Teams.

The only network endpoint this plugin uses is `https://meetingmateapp.com` (MCP at `/api/mcp`, OAuth at `/oauth/*`). Never send Meeting Mate tokens to another host.

## Choose the right skill

- Find, read, or analyze recordings, transcripts, summaries, or action items → `meeting-mate-recordings`
- Create, list, or complete follow-up tasks → `meeting-mate-tasks`

## Tool rules

- Use MCP tools. Do not reconstruct REST requests unless the user explicitly asks for curl/API examples.
- Identify recordings by UUID returned from `list_recordings` or `search_recordings`. Do not guess UUIDs.
- Prefer `search_recordings` when the user names a meeting, person, or topic.
- Prefer `ask_recording` when the user has a question about one recording. It returns compact summary + transcript context.
- Use write tools (`rename_recording`, `delete_recording`, `regenerate_summary`, `upload_and_process_recording`, `create_task`, `complete_task`) only when the user asked for that change.
- If a tool returns a scope error, explain which scope is missing and send the user to the Developer Dashboard.

## Docs

- MCP: https://meetingmateapp.com/docs/api/mcp
- OAuth: https://meetingmateapp.com/docs/api/oauth
- Endpoints: https://meetingmateapp.com/docs/api/recordings
