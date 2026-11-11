---
name: client-management
description: Manage SkedCast client groups (brands/influencers). Use when the user wants to list, create, update, or delete clients, or asks about a client's approval policy, posting rules, brand voice, or timezone.
---

# Client Management

Client groups organize an agency workspace by brand or influencer. Creating, updating,
and deleting clients are write actions — confirm with the user first.

## The workflow

1. **List clients** with `list_clients` to see the workspace's client groups.
2. **Read one client** with `get_client` for the full picture: name, type, approval
   policy, posting rules, brand voice, and default timezone.
3. **Create** with `create_client` when onboarding a new brand. Set the approval policy
   up front — it decides whether that client's posts publish directly or go to the
   approval queue (see the approval-workflow skill).
4. **Update** with `update_client` to change name, type, approval policy, posting
   rules, brand voice, or timezone.
5. **Delete** with `delete_client` when a client leaves. OWNER ONLY — a Manager holding
   the clients.manage scope cannot do this. Confirm explicitly: the client is removed from
   every list and cannot be restored.

## Using client context when composing

- Always check `get_client` before drafting for a client: the **brand voice** guides
  tone, **posting rules** constrain content, and the **default timezone** anchors
  scheduling.
- Filter post and analytics tools by client to keep each brand's data separate:
  `list_scheduled_posts`, `get_best_times`, and `list_campaigns` all accept client
  filters.
- A client's approval policy determines the publishing path: posts for approval-gated
  clients are submitted for review automatically.
