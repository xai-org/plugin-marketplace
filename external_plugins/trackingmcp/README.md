# TrackingMCP plugin for Grok

Connect Grok to [TrackingMCP](https://trackingmcp.com) by Navo: container and air
waybill tracking, vessel positions, demurrage, sailing schedules and freight rates.

## Installation

In Grok Build, open `/plugin`, search for **TrackingMCP**, and install.
In grok.com: Connectors → New Connector → Custom → `https://mcp.trackingmcp.com/mcp`.

On first connection Grok opens TrackingMCP sign-in in the browser. Use a
TrackingMCP account. Do not paste an API key into chat.

## Tools (12)

add_container, get_container_detail, get_shipment_summary, get_vessel_position,
get_demurrage_report, get_demurrage_free_time, get_port_congestion,
get_sailing_schedules, get_ocean_freight_rates, get_air_freight_rates,
track_air_waybill, get_account_access.

## Authentication

The plugin connects only to `https://mcp.trackingmcp.com/mcp` (streamable HTTP).
Authentication is OAuth 2.1 with dynamic client registration.

Network endpoints:

- `https://mcp.trackingmcp.com/mcp` - hosted MCP
- `https://mcp.trackingmcp.com/.well-known/oauth-protected-resource` - discovery
- TrackingMCP OAuth 2.1 authorization server (OAuth 2.1 + DCR), advertised by the discovery endpoint above
- `https://trackingmcp.com` - human sign-in and consent page

Credentials: a TrackingMCP account. The access token is sent as
`Authorization: Bearer` on `/mcp`. No API key is stored in the plugin. Tools see
only the shipments of the signed-in user's organization.

## License

Proprietary. Use of the hosted MCP is governed by TrackingMCP terms.
