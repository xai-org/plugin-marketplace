---
name: postqued
description: >-
  Operate Postqued through its hosted MCP server. Use when the user mentions
  Postqued or asks to work with their Postqued workspaces, connected social
  accounts, content, publishing calendar, analytics, engagement, approvals,
  client reviews, or collaborators.
---

# Postqued

Use the Postqued MCP tools for Postqued work. Let the server's current tool schemas define accepted inputs and platform options.

## Resolve scope first

1. Call `list_workspaces` before any workspace operation.
2. Select the organization and workspace that match the request.
3. Ask the user when the intended workspace is ambiguous; never guess between client workspaces.
4. Pass the explicit `workspaceId` to every workspace-scoped tool.
5. Resolve current connected account IDs with `list_accounts` before provider work.

## Read and prepare

Read-only status, analytics, capability, billing, content, approval, and collaboration tools may be used to answer the user's request. Provider helper tools return current destination and publishing constraints; use the relevant helper immediately before preparing a platform-specific target.

For media, call `start_content_upload`, upload bytes only to the returned presigned storage URL without a Postqued credential, and then call `complete_content_upload`. Do not expose presigned URLs or credentials in user-facing output.

## Publish safely

1. Resolve the workspace, target accounts, and live provider constraints.
2. Prepare the exact captions, destinations, media, platform options, and dispatch times.
3. Call `publish_content` with `dryRun: true` first.
4. Show the validated plan and obtain confirmation before a real publish or schedule unless the user already approved those exact details.
5. Call `publish_content` with `dryRun: false` and a fresh UUID `idempotencyKey`.
6. Keep the returned publish ID and use `get_publish_status` for durable request and target results.

After a timeout, inspect the original request before retrying. Never create a second live request with a new idempotency key until the first request's status is known.

## Approvals and external changes

Read the current approval post before each mutation and preserve its latest revision ID and version. On a concurrency conflict, reread and reconsider instead of overwriting newer work.

Obtain confirmation for actions that publish, schedule, reschedule, cancel, hide, delete, disconnect, revoke, remove, approve, request changes, send comments or replies, or invite another person. Invitation tools send real email. Treat every provider-facing write as externally visible.

## Report outcomes

Poll Postqued's durable state instead of treating an accepted request as provider success. Report partial target failures separately. Summarize errors by safe status, code, and message without exposing tokens, credentials, presigned URLs, or private response fields.
