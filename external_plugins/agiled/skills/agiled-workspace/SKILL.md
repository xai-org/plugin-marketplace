---
name: agiled-workspace
description: Find and manage clients, projects, tasks, invoices, and time in Agiled when the user asks to work with their Agiled workspace.
---

Use the connected Agiled MCP tools for the authenticated workspace. Available operations depend on the account's current role and granted scopes.

- Use `workspace_context` when the workspace or signed-in identity matters to the request.
- Use `search_global` for names or vague lookups across modules. Use `workspace_search_records` for structured filters, recent lists, comparisons, and counts.
- Use `search_tools` to discover the supported operation and its input schema before choosing a specialized tool. Fetch record details with `workspace_get_record` when needed.
- Resolve project, client, task, and assignee references from returned records. Ask for the intended record when matches are ambiguous; keep UUIDs for tool chaining.
- Make changes only within the user's requested scope. Account for tool annotations: writes can trigger workspace workflows, webhooks, or notifications. Obtain confirmation for deletion, sending, or financial posting unless the user already authorized that action.
- Read back changed records before reporting success. If a write result is uncertain, check current records before retrying a create operation.

Summarize the relevant names, statuses, dates, and returned app links. If the host supports task cards, use `show_tasks` with the final task IDs. Do not describe a proposed action as completed or assume the host rendered a card.

For an authentication error, ask the user to reconnect Agiled. For a permission denial, explain which operation needs access and ask them to check their Agiled role or granted scope. An empty authorized search does not prove the record is absent from the entire organization.
