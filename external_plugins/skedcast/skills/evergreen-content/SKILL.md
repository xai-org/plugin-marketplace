---
name: evergreen-content
description: Set up evergreen (recycled) posts. Use when the user wants a post to repeat automatically on a schedule, or asks about recycling content.
---

# Evergreen Content (Recycle)

Evergreen posts republish automatically on an interval — useful for timeless tips,
offers, and announcements. Changing recycle settings is a write action — confirm
with the user first.

## The workflow

1. Find the post with `list_scheduled_posts` (search by caption or client).
2. Check the current setup with `get_post_recycle` — returns the evergreen
   configuration and the worker's bookkeeping, or null when the post is not enrolled.
3. Call `set_post_recycle` with the interval, number of times, end date, and maximum
   recycles. Be explicit with the user about all four: how often it repeats, how many
   times total, and when it stops.
4. To stop recycling, call `clear_post_recycle`. Idempotent. Note: already-scheduled
   recycled copies are NOT retracted — cancel those separately with `cancel_post`.

## Notes

- Recycle applies per post; each cycle publishes to the post's existing targets.
- Evergreen content still passes through the client's approval policy and platform
  rules on every cycle.
- Suggest evergreen for content that doesn't date: tips, FAQs, testimonials, and
  recurring offers. Don't suggest it for time-sensitive announcements.
