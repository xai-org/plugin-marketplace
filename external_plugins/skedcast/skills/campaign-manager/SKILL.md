---
name: campaign-manager
description: Manage SkedCast campaigns (named post groupings). Use when the user wants to create, update, delete, or inspect campaigns, group posts into a campaign, or shift a whole campaign's schedule.
---

# Campaign Manager

Campaigns group posts under a name with an optional client, colour, and date range.
Grouping never changes a post's content or schedule. Create/update/delete are write
actions — confirm with the user first.

## The workflow

1. **List** with `list_campaigns` (optional client/status filters). **Read** one in full
   with `get_campaign`: name, description, status, colour, date range, owning client,
   and post counts.
2. **Create** with `create_campaign`, then add existing posts with `assign_to_campaign`
   (up to 500 posts per call). Remove with `unassign_from_campaign` — the posts and
   their schedules are untouched.
3. **Update** with `update_campaign` to change name, description, status, colour, or
   date range.
4. **Shift** the whole campaign's pending schedule with `shift_campaign` by a relative
   number of minutes — the fast way to move a launch week.
5. **Delete** with `delete_campaign`. The posts are NOT deleted — they lose the
   grouping and keep their own schedules.

## Notes

- Campaigns are an organizational layer, not a publishing mechanism. Scheduling still
  happens per post via the schedule-post skill.
- When reporting campaign contents, use `list_scheduled_posts` filtered by campaign
  to show what's actually in it.
