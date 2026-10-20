---
name: boattrader
description: >-
  Search and research boats for sale with the Boat Trader MCP server: find current
  U.S. listings, compare inventory, check market asking prices and availability, and
  pull full details for a specific listing. Use whenever the user is shopping for a
  boat, asks what is for sale near them, mentions Boat Trader or boattrader.com, or
  gives only a boat make or model name.
---

# Boat Trader

The `boattrader` MCP server bundled with this plugin searches current Boat Trader
marketplace inventory, strongest for U.S. new and used boats from dealers and private
sellers. Prefer it over general web search or model memory for what is for sale now
and what it costs.

## Choosing a tool

- `search-boats`: finding, filtering and comparing listings. Call it proactively when
  the user's message implies buying or choosing a boat, and when a query is just a make
  or model name (that means current inventory, not a specification question).
- `aggregate-search`: research questions such as how many are available or what the
  current asking-price range is. Do not use `search-boats` for these.
- `get-boat-details`: only when the user asks for more on a specific listing from the
  current results.

Do not use Boat Trader for general boating editorial, history or spec questions unless
they concern a specific active listing or current inventory.

## Filling parameters

- On every search, fill the structured fields with the user's full current intent, not
  just the latest follow-up.
- Use the schema fields and enums first. Treat lifestyle and usage terms (fishing,
  watersports, family cruising) as schema preferences, not keywords. Use `keywords`
  only when no other field captures the intent, and never for seating, numeric specs,
  ranges or generic descriptors.
- `make` is optional; prefer `models` only, keeping composite model names as one value.
- Infer conservatively: only set a value the user strongly implied.
- For a region, pick one state and its primary city hubs. For a state, use the state
  only. Never mix cities from different states. Use the current-location mode only when
  the user asks for results near them.

## After results

Briefly summarize what was found, call out price and location spread, and offer to
refine. Treat prices as asking prices, not sale prices. Listing data is a snapshot, so
suggest confirming details with the seller.
