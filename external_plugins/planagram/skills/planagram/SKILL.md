---
name: planagram
description: >-
  Draft, schedule, edit and review social media posts through the Planagram MCP
  server. Use whenever "Planagram" comes up, or the user asks to schedule, queue,
  draft or check posts on the social accounts they have connected to Planagram.
---

# Planagram

Planagram is a social media scheduler. The `planagram` MCP server bundled with this
plugin acts as the signed-in Planagram user and works only with the social accounts
that user has connected in Planagram.

## Before you act

1. **Find the accounts first.** Call `list_social_accounts` before creating a post.
   Use the returned account IDs; never guess them. If an account shows as
   disconnected, tell the user to reconnect it in Planagram instead of posting to it.
2. **Draft by default.** `create_post` saves a draft when `scheduled_at` is omitted.
   Only set `publish_now: true` or a `scheduled_at` time when the user has asked for
   the post to go out, and confirm the final text, accounts and time with them first.
   Publishing is public and cannot be undone from here.
3. **Times include a time zone.** Pass `scheduled_at` as ISO 8601 with an offset
   (for example `2026-10-20T09:30:00-04:00`). Ask for the user's time zone if it is
   not clear.
4. **Respect platform limits.** Keep each caption within the strictest limit of the
   selected platforms (for example 280 characters for X). Media must be public URLs.
5. **Confirm deletions.** `delete_post` needs an explicit yes from the user.

## Choosing a tool

| You want to | Use |
|---|---|
| See which accounts can be posted to | `list_social_accounts` |
| See the content calendar | `list_posts` with `status`, `from`, `to` or `account_id` filters |
| Check one post, its errors or published links | `get_post` |
| Draft, schedule or publish a post | `create_post` |
| Change text, accounts, media or time of an unpublished post | `update_post` |
| Remove an unpublished post | `delete_post` |
| Check plan, monthly usage and limits | `get_account_plan` |

Published posts cannot be edited or deleted through this server. If the user hits a
plan limit, share the upgrade link that `get_account_plan` returns.
