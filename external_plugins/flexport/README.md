# Flexport plugin for Grok Build

Flexport's MCP (Model Context Protocol) server lets AI assistants and agentic tools connect to your
[Flexport](https://www.flexport.com) account to act on your behalf: looking up shipments, checking
rates, searching your network, and more, using natural language.

This plugin adds Flexport's official hosted MCP server. It does not install or execute a local
binary. On first connection, Grok opens Flexport sign-in in the browser; no API key or environment
variable is required.

## Prerequisites

- **MCP enabled for your organization by an admin** at
  [app.flexport.com/integrations/mcp-connection](https://app.flexport.com/integrations/mcp-connection)
  (**Business Profile → Integrations → MCP Connection**). If you connect and see an error that MCP
  has not been enabled, an admin needs to turn it on there.
- An active Flexport account with role access granted to the tools you need (see
  [Permissions](#permissions)).

## Installation

In Grok Build, open `/plugins`, search for **Flexport**, and install.

Connections are initiated from the agent and tied to your individual Flexport account and user role.
When Grok redirects you, sign in with your Flexport account to authorize — the whole process takes
about a minute. Start a new Grok session after installation, and use `/mcps` to inspect the
connection.

## What you can do

### Shipments

| Tool | Capability |
| --- | --- |
| `track_shipment` | Search for a Flexport shipment by FLEX-ID, name, or client-assigned tag. Returns up to 20 matching shipments with full tracking detail: route stops, containers with last-free-day info, customs declarations with hold status, exceptions, work item tasks, and metadata tags |
| `browse_shipments` | Browse Flexport-managed shipments matching status, mode, date range, task, or demurrage/detention filters, paginated. Returns up to 100 tenant-scoped shipments per page with the same tracking detail as `track_shipment` |

### Network search

| Tool | Capability |
| --- | --- |
| `network_search_ports` | Search Flexport's sea and air ports by name, city, UN/LOCODE, IATA code, ICAO code, or customs port code |
| `network_search_addresses` | Search addresses already onboarded in your Flexport network, by name, street, city, state, or company legal name |
| `network_search_company_entities` | Search active Flexport company entities in your network by legal name. Matches on whole normalized legal-name similarity, not substrings |
| `network_search_google_addresses` | Search Google Places for cities, postal codes, and general place matches not yet onboarded in your Flexport network |
| `network_search_hs_codes` | Search Flexport's six-digit international HS-code catalog by product description or code |
| `list_active_company_users` | List or search active users in your company, including yourself |

### Rates and quotes

| Tool | Capability |
| --- | --- |
| `rates_search_instant_price` | Search available instant-price freight rates for Ocean FCL, Ocean LCL, or Air shipments. Returns carrier, pricing, transit time, charge breakdown, add-on services, detention options, and CO2e emissions. Doesn't support dangerous goods or FTL/road-only shipments |
| `rates_evaluate_total_price_from_instant_price_search` | Get the full, live-evaluated price breakdown for a rate selected from `rates_search_instant_price`, plus the confirmation token needed to book |
| `rates_browse_quote_requests` | Find or browse your organization's rate quote requests by name, FLEX-ID, status, freight mode, origin/destination, or submitter |
| `rates_get_quote_details` | Get one quote option's complete transit, route, and itemized rate detail, including charges, subtotals, total price, and expiration |
| `rates_get_quote_request_details` | Get a quote request's submission details and every priced quote option it received |

### Booking actions

These create real commercial commitments against your Flexport account. Grok marks them as
destructive and asks before running them — review the lane, dates, cargo, and price before
approving.

| Tool | Capability |
| --- | --- |
| `rates_instant_book` | Instantly create a **real, binding booking**, either against a prior `rates_search_instant_price` result or against a known client rate identifier |
| `rates_request_rate` | Request a new rate quote for a lane when `rates_search_instant_price` has no acceptable option — for example, a lane needing a fixed (NAC) rate where only spot pricing is available |
| `rates_book_without_rate` | Create and submit an unrated supplier booking for consignee acceptance. Dangerous-goods cargo and document uploads aren't supported through this tool; use the Flexport web app for those |

Example requests:

```text
Track shipment FLEX-1234567.
Which of my ocean shipments are arriving in the next two weeks?
Show me any containers with a last free day in the next 5 days.
What's the HS code for lithium-ion batteries?
Search instant prices from Shanghai to Los Angeles for 2 FCL, cargo ready next Monday.
```

## Authentication

The plugin connects only to `https://mcp.flexport.com/mcp` (MCP Streamable HTTP transport, a single
JSON-RPC 2.0 endpoint). Authentication is OAuth 2.1 against that host, with PKCE required and
Dynamic Client Registration supported. Flexport is the identity provider; sign-in happens on
`login.flexport.com`.

Network endpoints:

- `https://mcp.flexport.com/mcp` — hosted MCP (streamable HTTP)
- `https://mcp.flexport.com/.well-known/oauth-protected-resource/mcp` — protected-resource metadata
- `https://mcp.flexport.com/.well-known/oauth-authorization-server` — authorization-server metadata
- `https://mcp.flexport.com/register` — OAuth 2.1 Dynamic Client Registration
- `https://mcp.flexport.com/authorize`, `/token` — OAuth 2.1 authorization and token endpoints
- `https://mcp.flexport.com/auth/callback` — sign-in redirect handled by Flexport
- `https://login.flexport.com` — human sign-in (Flexport Universal Login)

Scopes requested: `openid`, `profile`, `email`, and `tool:*`.

Credentials: a Flexport account. No API key is stored in the plugin, and the plugin does not read
local credentials, secrets, `.env` files, or unrelated filesystem data. Access tokens are issued by
Flexport and sent as `Authorization: Bearer` on `/mcp`. Refresh tokens are supported; sessions are
subject to Flexport's session lifetime and idle timeout.

## Permissions

Access is scoped to your own organization and to the roles your Flexport user holds. A tool your
roles don't cover returns a permission error rather than data.

| Role | Tools available |
| --- | --- |
| Admin | All tools |
| Analyst | Shipments, network search (excluding HS codes), users, quote browsing and detail |
| Billing | All tools |
| Member | All tools |
| Tracker | Shipments, network search (excluding HS codes), quote detail |

Data returned by Flexport is processed in your Grok session and is subject to the terms and privacy
policies of the services you use. Requests are rate limited per user and per client.

## Support and resources

- [Flexport](https://www.flexport.com)
- [Flexport Privacy Policy](https://www.flexport.com/privacy/)
- [Flexport Software Visibility Terms and Conditions](https://www.flexport.com/terms-and-conditions/software-visibility-terms-and-conditions/)
- Support: contact your Flexport account team

## License

Proprietary. Use of the hosted MCP is governed by Flexport's
[Software Visibility Terms and Conditions](https://www.flexport.com/terms-and-conditions/software-visibility-terms-and-conditions/).
