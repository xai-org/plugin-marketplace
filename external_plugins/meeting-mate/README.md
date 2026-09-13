# Meeting Mate plugin for Grok Build

Official [Meeting Mate](https://meetingmateapp.com) plugin for Grok Build.

This plugin connects Grok to Meeting Mate's hosted MCP server so you can search meeting recordings, pull transcripts and summaries, extract action items, and manage follow-up tasks from the conversation.

## What it does

- List and search Meeting Mate recordings across your workspaces
- Fetch transcripts, summaries, key points, decisions, and action items
- Ask questions about a specific recording
- Create, list, and complete follow-up tasks
- Upload audio for transcription when the client provides a downloadable file

## Install

In Grok Build, run `/plugin`, search for **Meeting Mate**, and install it.

On first use Grok opens a browser OAuth flow against `https://meetingmateapp.com`. Sign in and approve the requested scopes.

API and MCP access require a Meeting Mate Pro or Teams plan. Create keys or OAuth apps in the [Developer Dashboard](https://meetingmateapp.com/dashboard/developers).

## Network and credentials

This plugin does not ship executables, hooks, or install scripts.

| Endpoint | Why |
|---|---|
| `https://meetingmateapp.com/api/mcp` | Hosted MCP server (JSON-RPC over HTTP) |
| `https://meetingmateapp.com/oauth/authorize` | OAuth authorization |
| `https://meetingmateapp.com/oauth/token` | OAuth token exchange |
| `https://meetingmateapp.com/oauth/register` | Dynamic client registration for MCP clients |
| `https://meetingmateapp.com/docs/api/mcp` | Public MCP documentation |

Credentials:

- **OAuth (default):** browser sign-in on first MCP connection. Tokens stay in Grok's local MCP credential store.
- **API key fallback:** a Meeting Mate API key from the Developer Dashboard, sent only as `Authorization: Bearer` to `https://meetingmateapp.com/api/mcp`.

The plugin never reads `.env`, SSH keys, or unrelated environment variables.

## MCP tools

| Tool | Purpose |
|---|---|
| `list_recordings` | List recordings, optionally filtered by status, date, or workspace |
| `search_recordings` | Search by title, description, or transcript text |
| `get_recording` | Recording metadata |
| `get_transcript` | Speaker-labeled transcript |
| `get_summary` | Summary, key points, and decisions |
| `get_action_items` | Extracted action items |
| `get_audio` | Signed audio download URL |
| `get_recording_status` | Processing status |
| `ask_recording` | Compact recording context for a question |
| `upload_and_process_recording` | Upload audio and start processing (`recordings:write`) |
| `rename_recording` | Rename a recording (`recordings:write`) |
| `delete_recording` | Soft-delete a recording (`recordings:write`) |
| `regenerate_summary` | Regenerate the summary (`recordings:write`) |
| `create_task` | Create a follow-up task (`tasks:write`) |
| `complete_task` | Complete or update a task (`tasks:write`) |
| `list_tasks` | List tasks |
| `whoami` | Authenticated account and scopes |
| `health_check` | API health |
| `get_scopes` | Available API scopes |
| `get_endpoints` | REST API endpoint list |

## Docs

- Product: https://meetingmateapp.com
- MCP docs: https://meetingmateapp.com/docs/api/mcp
- OAuth docs: https://meetingmateapp.com/docs/api/oauth
- Developer dashboard: https://meetingmateapp.com/dashboard/developers

## License

MIT
