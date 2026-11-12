---
name: schedule-post
description: Draft, validate, and schedule social posts across 11 networks via SkedCast. Use when the user wants to create, schedule, or bulk-schedule posts. Covers the platform rulebook, dry-run validation, and safe publishing.
---

# Schedule a Post with SkedCast

This skill guides composing and scheduling posts through the SkedCast MCP tools.
All write tools require the user's explicit confirmation before calling.

## The workflow

1. **Read the rulebook first.** Call `get_capabilities` before composing. It returns
   per-platform caption/hashtag limits, media rules (counts, formats, size, duration,
   aspect ratios), supported post types, and native-scheduling windows. Never discover
   a limit by failing a publish.

2. **Dry-run with `validate_post`.** It takes the same arguments as `create_post` but
   writes nothing. Returns `{ valid, platforms[], estimatedCostUsd }`. Fix any platform
   verdicts before proceeding.

3. **Confirm with the user.** Show the final caption, target accounts, and scheduled
   time. Only call `create_post` (or `create_posts_bulk`) after they approve.

4. **Create.** `create_post` composes one post fanned out across the selected accounts,
   or saved as a draft. `create_posts_bulk` creates up to 50 posts in one call; each
   item takes the same arguments as `create_post`, items are created independently
   (one failure never rolls back the others), and `validateOnly: true` dry-runs the
   whole batch.

## Key facts

- `create_post` is retry-safe: retrying with identical arguments replays the original
  result instead of creating a duplicate.
- Two publish-now calls with byte-identical content and targets are treated as the
  same post. To publish the same content twice intentionally, vary the content or use
  distinct scheduled times.
- Platform-specific settings (YouTube privacy, TikTok privacy level, Pinterest board,
  Telegram chat) go in `variants[].overrides`. That object also carries `firstComment`:
  a reply posted automatically once the destination goes live. Supported on X, LinkedIn,
  YouTube, Instagram, Facebook, Threads, Telegram, and Bluesky (not TikTok or Pinterest).
  Spell it exactly `firstComment`.
- A client that requires approval gets the post submitted for review instead of
  publishing — see the approval-workflow skill.
- To publish an existing draft, use `publish_draft` (same checks as `create_post`).
- To change a draft's content/targets/schedule in place, use `update_post` (drafts only,
  never publishes).
- Import external images/video into the content library first with `import_media` (public
  URL) or `upload_media` (local file, ≤18 MiB inline), then reference the media id.
- For large calendar moves, prefer `bulk_post_target_action` (up to 5000 targets) over
  many single calls. Check `get_quota` before planning a big batch.
