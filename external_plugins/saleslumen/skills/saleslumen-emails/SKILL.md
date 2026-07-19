---
name: saleslumen-emails
description: >-
  Use Saleslumen Emails MCP tools for messages, threads, labels, drafts,
  accounts, and discover. Use when the user asks about Saleslumen Emails,
  drafts, sending mail, threads, labels, or finding addresses by name/domain.
---

# Saleslumen Emails

Use Saleslumen MCP `emails_*` tools for the **Emails** product. Confirm `whoami` first if the session may be stale.

## Typical flows

### Read inbox / threads

1. `emails_list_accounts` — pick the mailbox account id when required.
2. `emails_list_messages` / `emails_get_message` — message content.
3. `emails_list_threads` / `emails_get_thread` — conversation view.
4. `emails_get_attachment` — attachment bytes/metadata when needed.

### Draft and send

1. `emails_list_drafts` / `emails_get_draft` / `emails_create_draft` / `emails_update_draft`.
2. `emails_generate_quoted_content` for reply/forward quoted bodies.
3. `emails_send_draft` or `emails_send_message` only after the user confirms recipients and body.
4. `emails_delete_draft` when discarding.

### Labels and triage

- Labels: `emails_list_labels`, `emails_get_label`, `emails_create_label`, `emails_update_label`, `emails_patch_label`, `emails_delete_label`.
- Message/thread mutations: `emails_modify_message`, `emails_modify_thread`, trash/untrash/delete variants.

### Accounts and discovery

- Account metadata: `emails_create_account`, `emails_get_account`, `emails_update_account`, `emails_delete_account` (metadata only; not provider OAuth connection routes).
- `emails_discover` — find likely addresses by domain and person name.

## Safety

- Always confirm before send, trash, or permanent delete.
- Prefer draft + user review for first sends in a session.
- Do not invent account IDs; list accounts first.
