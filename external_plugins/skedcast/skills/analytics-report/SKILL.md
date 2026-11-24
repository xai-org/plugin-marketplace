---
name: analytics-report
description: Report on social performance via SkedCast analytics. Use when the user asks how posts performed, for reach/impressions/engagement summaries, per-post or per-account breakdowns, or best times to post.
---

# Analytics & Best-Time Reports

All of these tools are read-only; no confirmation needed.

## Answering "how did we do?"

1. **Start with `get_analytics_overview`.** Pass a date window. Returns reach,
   impressions, and engagement plus a per-platform rollup. This is the right first
   call for "how did my posts perform last week?"

2. **Drill down as needed:**
   - `get_post_analytics` — one post's lifetime per-target breakdown by postId, or a
     keyset page of per-post rows with filters.
   - `get_account_analytics` — one channel's totals and daily series, plus profile-level
     activity (profile views, link taps, video plays) and follower demographics.
   - `get_client_analytics` — one client group's totals, per-platform breakdown, and
     time series. A different projection from the overview filtered by client.
   - `list_reports` / `get_report` — the workspace's saved report definitions; `get_report`
     includes run history (status, window, export availability).
   - `download_report_export` — a time-limited download URL for a completed report run's
     export file. Fetch it when ready to use — the URL expires.

3. **Present a summary, not a data dump.** Lead with the headline numbers, then the
   per-platform rollup, then 1–2 notable posts. Mention the date window you used.

## Answering "when should I post?"

Call `get_best_times` (optionally filtered by client or platform). It returns
worker-derived best posting times, strongest first. Combine with the user's goals:
match their content calendar against the top recommendations and propose specific
slots.

## Notes

- Analytics reflect the connected workspace only — the authenticated user's own data.
- If a date window is ambiguous ("last week"), state your assumption (e.g. last 7
  calendar days) before reporting.
