# Canopy agent plugin

Canopy books appointments with local home-service businesses (plumbers, HVAC
technicians, electricians and similar trades) that have connected their
calendars to Canopy. This plugin gives an AI agent the Canopy MCP server and a
skill that teaches it to use the server well.

Canopy never searches for, ranks or recommends businesses. The agent finds
businesses itself; Canopy says which of them can be booked and handles the
booking. Nothing is booked until the customer confirms by email or the business
approves the request.

## Contents

- `plugin.json`: Agent Plugins manifest (https://agent-plugins.org).
- `.mcp.json`: the remote Canopy MCP server (Streamable HTTP, no sign-in, no secrets).
- `skills/book-with-canopy/SKILL.md`: how to check bookability, read open times,
  start a booking and report the outcome truthfully.
- `assets/`: icon.

## Tools

`canopy_check_bookable`, `resolve_business`, `get_availability`,
`request_booking`, `propose_times`, `request_callback`, `get_request_status`,
`reschedule_booking`.
Descriptions are served by the MCP server itself. `get_request_status` and
`reschedule_booking` also need the `manage_token` returned when the request or
booking was created, so follow-ups work only in the conversation that made them.

## Privacy and support

- Privacy policy: https://canopy.coppoak.com/privacy
- Terms: https://canopy.coppoak.com/terms
- Support: support@coppoak.com

## License

MIT. See `LICENSE`.
