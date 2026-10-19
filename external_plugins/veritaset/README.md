# Veritaset plugin for Grok Build

Connect Grok Build to [Veritaset](https://veritaset.com): verified, dated prices for consumer mobile plans in
32 European markets and the US (preview), and home internet offers in 7 markets (preview).

## Installation

In Grok Build, open `/plugin`, search for **Veritaset**, and install. No sign-in or API key is needed.

## What you get

- **MCP server** `veritaset` at `https://veritaset.com/mcp` (Streamable HTTP, read-only, no authentication).
- **Skill** `veritaset`: how to ask for the details that decide the answer (data per month, contract tolerance,
  eSIM, travel, current price) and how to report results (price inclusions, promo length, one-off fees, source
  link and check date).

### Tools

| Tool | What it does |
|---|---|
| `compare_mobile_plans` | Plans that meet a person's needs, ranked by 12-month cost |
| `find_better_plan` | From a few months of real usage and the current plan; returns the yearly saving |
| `get_mobile_plan_details` | The full record of one plan, with source link and check date |
| `explain_ranking_method` | The public ranking rules |
| `list_supported_countries` | Markets, plan counts and last check date |
| `compare_home_internet` | Home internet offers (preview) |

## Data and independence

Every price links to the operator's own page and the date it was checked. Rankings follow a public method
(https://veritaset.com/method/). No operator pays for placement; no affiliate links or commissions. Prices are
indicative: the operator's checkout price is binding. The server reads no user data beyond the query it is sent.

## License

The plugin files in this directory are MIT licensed. The Veritaset data is not open; access through the hosted
server is free.
