---
name: meeting-mate-recordings
description: >-
  Search and read Meeting Mate recordings. Use when the user asks for Meeting
  Mate recordings, transcripts, summaries, key points, decisions, action items,
  or audio, or wants to ask a question about a specific Meeting Mate meeting.
---

# Meeting Mate recordings

Use the hosted Meeting Mate MCP tools. Identify recordings by UUID from search or list results.

## Find a recording

1. If the user mentions a title, person, topic, or quote, call `search_recordings` with that query.
2. If they want recent meetings, call `list_recordings`. Optional filters: `status`, `date_from`, `workspace_uuid`, `limit`.
3. If several matches exist, show a short list (name, date, UUID, status) and let the user pick. Do not pick silently unless one result is an obvious match.

## Read a recording

Pick the smallest tool that answers the question:

| User wants | Tool |
|---|---|
| Metadata / status | `get_recording` or `get_recording_status` |
| Summary, key points, decisions | `get_summary` |
| Action items only | `get_action_items` |
| What was said | `get_transcript` (`format=compact` unless they ask for word-level timing) |
| A specific question about one meeting | `ask_recording` with `uuid` + `question` |
| Audio link | `get_audio` |

Do not dump a full transcript into the reply unless the user asked for the transcript. Summarize first.

## Write actions

Only when the user asked:

- `rename_recording` — new title
- `delete_recording` — confirm the UUID and name first
- `regenerate_summary` — existing recording
- `upload_and_process_recording` — only when the client provides a downloadable audio file. Requires `recordings:write`.

After upload, poll `get_recording_status` until processing finishes before fetching summary or transcript.

## Response style

- Name the meeting and date.
- Separate decisions, action items, and open questions.
- Cite the recording UUID so follow-up tool calls stay exact.
- If processing is not finished, say so and check status instead of inventing a summary.
