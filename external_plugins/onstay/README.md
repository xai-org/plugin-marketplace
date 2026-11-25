# OnStay

Connect your OnStay host account to Grok and Grok Bot to inspect homes, check calendars, manage blocked dates, answer guest questions, teach your home's concierge, and manage stay door codes.

## Setup

1. Install **OnStay** from the marketplace or add `https://onstay.ai/api/mcp` as a custom MCP connector.
2. Sign in with your OnStay email or mobile number on `https://onstay.ai`. Check the OnStay account named on the consent page; choose **Use a different account** if needed.
3. Choose **View only** or **View and change**, pick **All my homes** or one home, and select **Allow**.

Alternatively, connect with a scoped Host API key (`onstay_live_...`) created in **Settings -> Connectors** at `https://onstay.ai/settings?tab=integrations`.

## Included Capabilities

### View (`onstay:view`)
- **Homes & Details**: `list_properties`, `get_property`, `get_property_knowledge`, `list_listing_conflicts`.
- **Calendars & Stays**: `get_calendar`, `get_stay_details`.
- **Guest Conversations & Activity**: `list_guest_conversations`, `get_guest_conversation`, `get_portfolio_analytics`.
- **Booking Messages** (only when explicitly enabled on consent): `list_booking_threads`, `get_booking_thread`.

### View and Change (`onstay:change`)
- **Blocked Dates**: `create_host_block`, `update_host_block`, `delete_host_block`.
- **Guest Questions**: `reply_to_guest_escalation`, `acknowledge_guest_escalation`, `resolve_guest_escalation`.
- **Concierge Knowledge**: `teach_concierge`.
- **Stay Door Codes**: `get_door_codes`, `set_door_code`, `change_door_code_times`, `turn_off_door_code`.
- **Booking Reply Drafts** (when enabled on consent): `draft_booking_reply` leaves a reply in OnStay Messages for the host to review and send. It never sends.
- **Feedback**: `send_feedback`.

## Security & Boundaries

- **No remote unlocking**: Connected apps cannot lock or unlock a door or change a thermostat. View-only connections never see door codes.
- **Instant revocation**: Disconnect any connected app at any time in **Settings -> Connectors** (`https://onstay.ai/settings?tab=integrations`).
- **Setup guide & Privacy**: [https://onstay.ai/mcp](https://onstay.ai/mcp) · [https://onstay.ai/privacy](https://onstay.ai/privacy) · [https://onstay.ai/terms](https://onstay.ai/terms)
