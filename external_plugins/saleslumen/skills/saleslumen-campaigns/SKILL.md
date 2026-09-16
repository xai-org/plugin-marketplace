---
name: saleslumen-campaigns
description: >-
  Manage Saleslumen Campaigns: people, sequences, deliveries, suppressions,
  schedules, variables, and sender membership via MCP tools. Use when the
  user asks about Saleslumen Campaigns, sequences, enrollments, or campaign
  people.
---

# Saleslumen Campaigns

Use Saleslumen MCP `campaigns_*` tools for the **Campaigns** product. Confirm `whoami` first if the session may be stale.

Sequence edits go through `campaigns_update_sequence` (the whole trigger, step, and variant tree). Variables are replaced with `campaigns_set_variables`.

## Typical flows

### Inspect

1. `campaigns_list` — find campaign IDs.
2. `campaigns_get` — campaign details.
3. `campaigns_get_metrics` — metrics for an explicit reporting window.
4. `campaigns_list_people` / `campaigns_get_person` / `campaigns_list_person_activity`.
5. `campaigns_list_sequences` / `campaigns_get_sequence` / `campaigns_preview_sequence`.
6. `campaigns_list_deliveries` / `campaigns_get_delivery`.
7. `campaigns_list_suppressions`, `campaigns_list_schedules`, `campaigns_get_schedule`, `campaigns_get_operation`, `campaigns_get_task`.

### Create / update

1. `campaigns_create` makes a draft and its automatic main sequence. It does not set variables.
2. `campaigns_update` patches campaign fields (`update_mask` + etag).
3. `campaigns_set_variables` replaces the ordered variable definition list.
4. `campaigns_set_sender_accounts` attaches Emails accounts that already exist.
5. `campaigns_create_sequence` / `campaigns_update_sequence` / `campaigns_delete_sequence`. `campaigns_update_sequence` replaces the trigger, step, and variant tree as a whole.
6. People: `campaigns_create_person`, `campaigns_update_person`, `campaigns_import_people` (rows or CSV; no verification), `campaigns_run_people_script`.
7. Person state: `campaigns_pause_person`, `campaigns_resume_person`, `campaigns_unsubscribe_person`.
8. Lifecycle: `campaigns_activate`, `campaigns_pause`, `campaigns_resume`, `campaigns_complete`, `campaigns_archive`, `campaigns_unarchive`.
9. Suppressions and schedules: `campaigns_create_suppression`, `campaigns_delete_suppression`, `campaigns_create_schedule`, `campaigns_update_schedule`, `campaigns_delete_schedule`.
10. `campaigns_resolve_unknown_delivery` marks an UNKNOWN delivery SENT or RETRY.

Activate still requires a ready campaign. MCP cannot connect a sending mailbox or verify addresses on import.

### Delete

- `campaigns_delete` hard-deletes a draft with no deliveries.
- `campaigns_delete_person` requires no execution history.
- `campaigns_batch_delete_people` is all-or-nothing.
- `campaigns_delete_sequence` deletes an unused triggered sequence.
- Confirm before any delete.

## Conventions

- Always use IDs returned by list/get tools; do not guess UUIDs.
- For mailbox send/draft work, use the **Emails** skill (`saleslumen-emails`).
