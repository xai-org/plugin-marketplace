---
name: webhooks-setup
description: Set up SkedCast outbound webhooks. Use when the user wants event notifications (publishing, approvals, failures) delivered to their own endpoint, or asks about webhook deliveries and failures.
---

# Webhooks Setup

Outbound webhooks deliver HMAC-signed event notifications to the user's own endpoint.
All management calls are write actions — confirm with the user first.

## The workflow

1. **List** existing endpoints with `list_webhooks` (URL, subscribed events, active
   flag; the secret is masked).
2. **Create** with `create_webhook`: give the endpoint URL and the subset of events to
   subscribe to (full 40-event catalog — see https://skedcast.com/developers/webhooks
   for the complete list with payload fields). The signing secret is returned ONCE —
   tell the user to store it immediately; it is never readable again.
3. **Test** with `test_webhook`: sends a `webhook.test` delivery and reports the
   outcome, proving the endpoint is reachable and verifying signatures without
   waiting for a real event. This performs a real outbound request.
4. **Inspect** with `get_webhook` (URL, events, active state, consecutive failures,
   when/why auto-disabled) and `list_webhook_deliveries` (per-attempt log with event
   type, response status, error, and timing) — this is how you find out WHY an
   endpoint stopped receiving.
5. **Update** with `update_webhook` to change URL, event list, or active state —
   including re-enabling an endpoint auto-disabled after repeated failures. Note: the
   event list REPLACES the previous one, so pass the full desired set.
6. **Rotate** the signing secret with `rotate_webhook_secret` when it may be
   compromised. The new secret is returned once; the previous secret keeps verifying
   for a short overlap so the user can redeploy without dropping deliveries.
7. **Delete** with `delete_webhook` by id. Deliveries to it stop (cascade).

## Notes

- Webhooks are a developer feature. Keep explanations concrete: what events fire,
  where they go, and how to verify the HMAC signature.
- Never invent event names — refer to the catalog at
  https://skedcast.com/developers/webhooks or the `webhooks` block in openapi.json.
- Event naming is `object.verb`: past tense for outcomes (`post.published`),
  present participle for in-flight states (`target.preparing`), predictive for
  warnings (`account.token_expiring`). `post.published` / `post.failed` fire per
  destination — prefer their `target.published` / `target.failed` twins.
- Deliveries POST a JSON envelope `{ id, type, created, data }`, signed with Standard
  Webhooks headers plus `X-SkedCast-Signature`. Delivery is at-least-once with
  exponential backoff — dedupe on the payload id.
- Key events to know: `target.published` / `target.failed` (per-destination outcomes),
  `media.ready` / `media.failed` (asset pipeline), `account.reauth_required` (channel
  needs reconnecting — publishing to it is paused), `approval.requested` /
  `approval.decided`, `report.completed`, and `post.recycled` (evergreen copy created).
