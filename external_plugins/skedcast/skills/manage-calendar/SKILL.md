---
name: manage-calendar
description: Manage the SkedCast content calendar. Use when the user asks what is scheduled or publishing on a date, or wants to reschedule, cancel, retry, or inspect scheduled posts and their per-platform destinations.
---

# Manage the Content Calendar

Rescheduling, cancelling, and retrying are write actions — confirm with the user
before calling.

## Seeing what's scheduled

- `list_scheduled_posts` — the workspace's posts (queue, drafts, published),
  newest first, with status/client/platform filters and free-text search over captions,
  client names, and account handles.
- `list_post_targets` — individual post DESTINATIONS (one row per platform account)
  with an optional schedule-time window. This is the tool for "what publishes on
  this date". It carries `total` and `totalPosts` so you can tell a full page from a
  complete set.
- `get_post` — one post with its per-platform variants and fan-out targets.
- `get_post_target` — one destination in full: status, scheduled time, platform,
  account, published permalink, and the failure reason when it failed.

## Changing the schedule

- `reschedule_post` — move a pending post target to a new time (absolute
  `scheduledAt` or relative `shiftMinutes`).
- `cancel_post` — cancel a still-pending post target before it publishes.
- `retry_post` — re-queue a failed or rate-limited target so it publishes again.
  When a target failed, read `get_post_target` first and tell the user the platform's
  own failure reason before retrying.
- `bulk_post_target_action` — reschedule, retry, or cancel up to 5000 targets in one
  call. Returns `{ jobId, accepted, skipped, skippedReasons? }`; skipped targets are
  reported, never silently dropped.
- `shift_campaign` — move a whole campaign's pending schedule by relative minutes.

## Notes

- `get_posting_limits` shows per-account anti-ban cadence; `get_quota` shows the
  scarce-bucket budget. Read them before planning large batches.
- Campaigns are named post groupings: `list_campaigns` / `get_campaign` to inspect,
  `assign_to_campaign` / `unassign_from_campaign` to group (grouping only — never
  changes content or schedule).
