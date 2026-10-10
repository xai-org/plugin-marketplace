# Cal.com plugin for Grok Build

Connect Grok Build to [Cal.com](https://cal.com), the open scheduling infrastructure.
Check availability, create, reschedule and cancel bookings, manage event types and
schedules, and reach any Cal.com API v2 operation through the hosted Cal.com MCP server.

## Installation

In Grok Build, open `/plugin`, search for **Cal.com**, and install.

On first connection, Grok opens the Cal.com sign-in in your browser. Authorize with the
Cal.com account whose calendar you want Grok to work with. No API key is needed and
nothing should be pasted into chat.

## What you get

- **MCP server** `calcom` at `https://mcp.cal.com/mcp` (Streamable HTTP, OAuth 2.1).
- **Skill** `calcom`: how to use the Cal.com tools well (check availability before
  booking, confirm destructive actions, never guess IDs or time zones, UTC ISO 8601
  timestamps) plus pointers to the API v2 docs.

### Tools

Dedicated tools for the hot scheduling paths:

| Area | Tools |
|---|---|
| Availability | `get_availability`, `get_busy_times`, `calculate_routing_form_slots` |
| Bookings | `get_bookings`, `get_booking`, `create_booking`, `reschedule_booking`, `cancel_booking`, `confirm_booking`, `mark_booking_absent`, `get_booking_attendees`, `get_booking_attendee`, `add_booking_attendee`, `get_booking_routing_trace` |
| Event types | `get_event_types`, `get_event_type`, `get_event_type_settings`, `get_event_type_history`, `get_scheduling_config`, `create_event_type`, `update_event_type`, `delete_event_type`, `get_crm_sync_errors` |
| Schedules | `get_schedules`, `get_schedule`, `get_default_schedule`, `create_schedule`, `update_schedule`, `delete_schedule` |
| Profile & apps | `get_me`, `update_me`, `get_connected_calendars`, `get_conferencing_apps` |
| Organizations & teams | `get_org_teams`, `get_my_teams`, `get_org_memberships`, `get_org_membership`, `create_org_membership`, `update_org_membership`, `delete_org_membership`, `get_team_memberships`, `get_team_membership`, `create_team_membership`, `update_team_membership`, `delete_team_membership`, `create_team_invite`, `get_org_team_bookings`, `get_org_user_bookings`, `get_org_routing_forms`, `get_org_routing_form_responses`, `get_org_attributes`, `get_org_attribute`, `get_attribute_options`, `get_user_attributes`, `assign_attribute_to_user`, `update_user_attribute`, `unassign_attribute_from_user`, `get_user_attribute_history` |
| API catalog | `find_api_operation`, `describe_api_operation`, `call_api_operation` for any other documented [API v2](https://cal.com/docs/api-reference/v2/introduction) operation |

Every tool carries MCP annotations (`readOnlyHint`, `destructiveHint`, `idempotentHint`),
so Grok can tell a lookup from a cancellation before calling it.

## Example prompts

- "What bookings do I have this week?"
- "Show me my available slots for next Monday afternoon."
- "Create a 30-minute event type called Quick Chat."
- "Reschedule my 2pm meeting tomorrow to Thursday at 3pm."
- "Cancel my meeting with Alex tomorrow and say I'm out sick."

## Authentication and network

The plugin connects only to `https://mcp.cal.com`. Authentication is OAuth 2.1
authorization code with PKCE and dynamic client registration; Grok handles the flow.

Network endpoints:

- `https://mcp.cal.com/mcp`: hosted MCP (Streamable HTTP)
- `https://mcp.cal.com/oauth/authorize`, `/oauth/token`, `/oauth/register`, `/oauth/revoke`: OAuth 2.1 + DCR
- `https://mcp.cal.com/.well-known/oauth-authorization-server`, `/.well-known/oauth-protected-resource`: discovery metadata
- `https://app.cal.com`: human sign-in and consent screen during authorization

Credentials: a Cal.com account. The MCP server exchanges the grant for Cal.com OAuth
tokens scoped to that account and sends them as `Authorization: Bearer` on `/mcp`.
The plugin stores no API key and requests no filesystem or shell access. Tools act only
on data the signed-in user can already see in Cal.com.

## Self-hosting

Prefer a local server with an API key? The same tools ship as the
[`@calcom/cal-mcp`](https://www.npmjs.com/package/@calcom/cal-mcp) npm package over
stdio. Point `.mcp.json` at `npx @calcom/cal-mcp@latest` with `CAL_API_KEY` set; see
[the MCP server docs](https://cal.com/docs/mcp-server).

## License

MIT for the files in this plugin. Use of the hosted MCP server is governed by the
[Cal.com terms](https://cal.com/terms) and [privacy policy](https://cal.com/privacy).
