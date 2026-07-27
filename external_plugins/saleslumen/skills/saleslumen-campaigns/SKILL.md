---
name: saleslumen-campaigns
description: >-
  Manage Saleslumen Campaigns: people, sequences, steps, variables, metrics,
  and tasks via MCP tools. Use when the user asks about Saleslumen Campaigns,
  sequences, enrollments, campaign people, or campaign variables.
---

# Saleslumen Campaigns

Use Saleslumen MCP `campaigns_*` tools for the **Campaigns** product. Confirm `whoami` first if the session may be stale.

## Typical flows

### Inspect

1. `campaigns_list` — find campaign IDs.
2. `campaigns_get` — campaign details.
3. `campaigns_get_metrics` — performance snapshot.
4. `campaigns_list_people` / `campaigns_get_person` — enrollment and person state.
5. `campaigns_list_sequences` → `campaigns_list_steps` — sequence structure.

### Create / update

1. `campaigns_create` or `campaigns_update` for campaign fields.
2. `campaigns_create_sequence` / `campaigns_update_sequence` for sequences.
3. `campaigns_create_step` / `campaigns_update_step` / `campaigns_move_sequence_step` for steps.
4. `campaigns_create_person` / `campaigns_update_person` for people.
5. Variables: `campaigns_get_variables`, `campaigns_add_variables`, `campaigns_replace_variables`, `campaigns_remove_variable_from_people`.

### Script across people

- `campaigns_run_script_on_people` runs an Apps Script function across campaign people. Confirm the function name and person scope first.
- Track async work with `campaigns_get_task` / `campaigns_get_person_task`.

### Delete

Confirm with the user before `campaigns_delete`, `campaigns_delete_person`, `campaigns_delete_sequence`, or `campaigns_delete_step`.

## Conventions

- Always use IDs returned by list/get tools; do not guess UUIDs.
- Prefer updating a draft/step over deleting when the user is iterating.
- For mailbox send/draft work, use the **Emails** skill (`saleslumen-emails`) rather than Campaigns structure tools.
