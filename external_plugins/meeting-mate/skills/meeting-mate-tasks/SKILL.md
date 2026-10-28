---
name: meeting-mate-tasks
description: >-
  Manage Meeting Mate follow-up tasks. Use when the user wants to create, list,
  complete, or update tasks in Meeting Mate, including action items taken from
  a Meeting Mate recording.
---

# Meeting Mate tasks

Use Meeting Mate MCP task tools. Do not create tasks in other apps unless the user asks.

## List

Call `list_tasks`. Optional filters:

- `status` — open tasks by default when the user says "open" or "todo"
- `recording_uuid` — tasks linked to one meeting
- `limit`

Show title, status, deadline, priority, and recording link when present.

## Create

Call `create_task` only when the user asked to create or capture a follow-up.

Useful fields:

- `title` (required)
- `description`
- `recording_uuid` when the task comes from a meeting
- `deadline` as ISO 8601 date
- `priority`: `normal`, `high`, or `urgent`

If action items came from `get_action_items` or `ask_recording`, offer to create one task per item. Do not bulk-create without confirmation when there are more than three items.

Requires `tasks:write`.

## Complete or update

Call `complete_task` with `task_id` from `list_tasks`. Default new status is `done`. Confirm the task title when several tasks look similar.

## From a recording

Typical flow:

1. Find the recording with `search_recordings` or `list_recordings`.
2. Read action items with `get_action_items` (or `ask_recording`).
3. Create tasks the user accepted, passing `recording_uuid`.
