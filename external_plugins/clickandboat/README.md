# Click&Boat plugin for Grok Build

Connect Grok Build to [Click&Boat](https://www.clickandboat.com), the boat rental marketplace.
Search available boats worldwide with real-time prices, inspect full boat details (photos, equipment, cancellation terms, security deposit, mandatory extras, and verified reviews), and generate pre-filled checkout links through the hosted Click&Boat MCP server.

## Installation

In Grok Build, open `/plugin`, search for **Click&Boat**, and install.

No account or API key is required to search boats or inspect listings. When you are ready to book, Grok generates a pre-filled checkout link that opens directly on Click&Boat in your browser.

## What you get

- **MCP server** `clickandboat` at `https://www.clickandboat.com/mcp` (Streamable HTTP, no authentication required).
- **Skill** `clickandboat`: guidance on using the Click&Boat MCP tools accurately (confirming required search parameters, resolving dates, filtering by boat type/skipper/budget, quoting exact cancellation and deposit terms, and generating checkout links).

### Tools

| Tool | Description |
|---|---|
| `search_boats` | Search available boats for rent by `location`, `startDate` (`YYYY-MM-DD`), `endDate` (`YYYY-MM-DD`), and `guests`, with optional filters (`boatType`, `skipper`, `licenceFree`, `minPriceEur`, `maxPriceEur`, `cabins`, `berths`, `lengthMin`, `lengthMax`, `minBuildYear`, `instantBooking`, `bestRating`, `cancellationPolicy`, `excludeIds`, `locale`). |
| `show_boats` | Display selected boats from `search_boats` with photos, total prices, capacity, cabins, skipper options, badges, and booking links. |
| `get_boat_details` | Retrieve full details for a boat ID returned by `search_boats`: description, photo gallery, equipment, cancellation policy, security deposit, mandatory extras, and recent reviews. |
| `get_booking_link` | Generate a pre-filled Click&Boat checkout URL (`checkout_url`) for a chosen boat and date range so the user can finalize their booking on Click&Boat. |

Every tool is read-only and carries MCP annotations (`readOnlyHint: true`, `destructiveHint: false`, `idempotentHint: true`, `openWorldHint: false`).

## Example prompts

- "Find a catamaran in Marseille for 8 guests from 2026-07-18 to 2026-07-25 with a skipper."
- "Show me motorboats in Palma de Mallorca for 6 people on 2026-08-10 under €600."
- "What are the equipment, deposit, and cancellation terms for the first boat?"
- "Give me the booking link for that boat."

## Authentication and network

The plugin connects only to `https://www.clickandboat.com/mcp` over HTTPS (Streamable HTTP).

Network endpoints:

- `https://www.clickandboat.com/mcp`: hosted Click&Boat MCP server (Streamable HTTP)

Credentials: None required (`noauth`). All tools are read-only catalog lookups and checkout link generators. The plugin stores no API keys, defines no hooks, and requests no local filesystem or shell access. Booking and payment happen on `https://www.clickandboat.com` when the user opens a generated checkout link in their browser.

## License

MIT for the files in this plugin. Use of the hosted MCP server and Click&Boat services is governed by the [Click&Boat Terms & Conditions](https://www.clickandboat.com/en/terms-conditions) and [Privacy Policy](https://www.clickandboat.com/en/privacy-policy).
