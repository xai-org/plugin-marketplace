---
name: calcom
description: >-
  Work with Cal.com scheduling through the Cal.com MCP server: check availability,
  create, reschedule, cancel and confirm bookings, manage event types, schedules,
  attendees, teams and organization memberships, and reach any Cal.com API v2
  operation through the catalog tools. Use whenever "Cal.com", "cal.com", "calcom",
  a cal.com booking link, or the user's Cal.com calendar, bookings, event types or
  availability come up.
---

# Cal.com

Cal.com is open scheduling infrastructure. The `calcom` MCP server bundled with this
plugin wraps the [Cal.com API v2](https://cal.com/docs/api-reference/v2/introduction)
and acts as the signed-in Cal.com user. Use it for anything about that user's
calendar: what is booked, when they are free, booking on their behalf, and configuring
how other people can book them.

## Before you act

1. **Resolve identity first.** Call `get_me` once per session to learn the user's
   username, time zone and default schedule. Never guess IDs, emails, slugs, app slugs
   or time zones. Discover them with `get_event_types`, `get_bookings`,
   `get_schedules`, `get_my_teams`, `get_org_memberships` and friends, or ask.
2. **Check availability before booking or rescheduling.** Always call
   `get_availability` (or `calculate_routing_form_slots` for routing forms) and pick a
   returned slot. Never invent a start time.
3. **Confirm destructive actions.** `cancel_booking`, `delete_event_type`,
   `delete_schedule`, `delete_org_membership`, `delete_team_membership` and
   `unassign_attribute_from_user` need an explicit yes from the user first. Tool
   annotations (`destructiveHint`) mark these.
4. **Timestamps are UTC ISO 8601.** Convert from the user's time zone (from `get_me`)
   before sending, and present results back in their time zone.

## Choosing a tool

| You want to | Use |
|---|---|
| See what is booked | `get_bookings` (filters: status, date range, event type, attendee), `get_booking` |
| Find free time | `get_availability` for an event type or user, `get_busy_times` for raw calendar busy blocks |
| Book someone in | `get_availability` then `create_booking` with the attendee's name, email and time zone |
| Move or cancel a meeting | `reschedule_booking`, `cancel_booking` (pass a reason when the user gives one) |
| Approve a pending booking | `confirm_booking`; mark a no-show with `mark_booking_absent` |
| Manage attendees | `get_booking_attendees`, `add_booking_attendee` (removing attendees is not supported) |
| Set up how people book you | `get_event_types`, `get_event_type_settings`, `create_event_type`, `update_event_type` |
| Working hours | `get_default_schedule`, `get_schedules`, `create_schedule`, `update_schedule` |
| Team scheduling | `get_scheduling_config` (round-robin hosts, weights, priorities), `get_org_team_bookings`, `get_org_user_bookings` |
| Teams and org members | `get_my_teams`, `get_org_teams`, `*_org_membership`, `*_team_membership`, `create_team_invite` |
| Routing forms | `get_org_routing_forms`, `get_org_routing_form_responses`, `calculate_routing_form_slots`, `get_booking_routing_trace` |
| Anything else in API v2 | `find_api_operation` to search, `describe_api_operation` for the input schema, then `call_api_operation` |

Prefer a dedicated tool over `call_api_operation` when one exists. If
`find_api_operation` returns nothing suitable, tell the user plainly that the Cal.com
integration does not support that action yet instead of trying a different tool.

## Not supported through this server

Removing attendees from a booking, creating or deleting teams, webhooks and
integrations, connected-calendar settings, organization-level event types, emailing
attendees, billing, and workflows. The API answers 403 when the user's OAuth scopes do
not cover an operation; report that as a permissions issue, not a bug.

## Building against Cal.com in code

When the user is writing an integration rather than managing their own calendar, the
MCP tools are still the fastest way to inspect real data, but the code should call the
API directly:

- REST API v2: `https://api.cal.com/v2`, docs at
  https://cal.com/docs/api-reference/v2/introduction. API keys live in
  Settings > Developer > API Keys in the Cal.com dashboard.
- Embeds and the booking page: https://cal.com/docs/developing/guides/embeds
- Docs index for anything else: https://cal.com/docs
- Local stdio server with an API key: `npx @calcom/cal-mcp@latest`, docs at https://cal.com/docs/mcp-server
