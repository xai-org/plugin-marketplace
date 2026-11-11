---
name: approval-workflow
description: Work the SkedCast approval queue. Use when the user asks what is waiting for approval, or wants to approve, reject, request changes, or revise a post under review.
---

# Approval Workflow

For teams and agencies where publishing is gated by review. Deciding an approval is a
write action — always confirm with the user before calling `decide_approval`.

## The workflow

1. **List the queue.** Call `list_approvals` (newest first, optional status/post
   filters). For one request in full — the gated post's preview and roll-up, so the
   reviewer sees what they are deciding on — call `get_approval`. Summarize each
   pending request: the post content, target accounts, scheduled time, and who it is
   waiting on.

2. **Present for decision.** Show the user the pending items and ask what to do with
   each: approve, reject, or request changes. Never decide on their behalf.

3. **Decide.** Call `decide_approval` per request. Approving releases the gated post
   for publishing.

4. **Revise if needed.** If the user wants changes to a post under review, use
   `revise_post` to change content, media, or per-platform overrides without
   disturbing its destinations. Note: editing an APPROVED post returns it to review,
   and `revise_post` refuses (naming them) when a destination has already published
   or is about to.

## Key facts

- `list_clients` / `get_client` show each client group's approval policy, so you can
  explain why a post is gated.
- Posts created via `create_post` for a client that requires approval are submitted
  for review automatically instead of publishing.
- Approval decisions are final in the sense that they release or block publishing —
  treat them with the same care as publishing itself.
