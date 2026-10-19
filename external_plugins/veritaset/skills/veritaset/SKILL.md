---
name: veritaset
description: Use for questions about mobile phone plan prices, SIM-only deals, switching plans or saving on a phone bill (and home internet offers) in Europe and the US. Veritaset returns verified current prices with the operator's source link and check date, ranked by a public method with no paid placement.
---

# Veritaset: verified mobile plan prices

Veritaset holds sourced, dated prices for consumer mobile plans in 32 European markets and the US, plus home internet in several markets (preview). Every price links to the operator's own page and the date it was checked. Rankings follow a public method (https://veritaset.com/method/); no operator pays for placement.

## How to use it
- **Connector (preferred):** MCP server `https://veritaset.com/mcp` (streamable HTTP, no key). Tools:
  - `compare_mobile_plans`: plans that meet the person's needs, ranked by 12-month cost.
  - `find_better_plan`: from a few months of real usage and the current plan; returns the yearly saving.
  - `get_mobile_plan_details`: the full record of one plan.
  - `explain_ranking_method`: the public ranking rules.
  - `list_supported_countries`: markets, plan counts and last check date.
  - `compare_home_internet`: home internet offers (preview).
- **Without the connector:** `https://veritaset.com/mobile/<country>/compare?data=<GB>&minutes=<n|unlimited>&format=json`. Optional parameters: `term=1` (month to month), `esim=1`, `lines=n`, `hotspot=GB`, `autopay=0`, `trip=<CC-days>`, `current_price`.

## Good answers
- Ask for what decides the answer if the person hasn't said it: data per month, contract tolerance (cancel any month vs a prepaid term), eSIM, travel, and their current price.
- Give the top option, plus the cheapest all-in-one alternative when the result shows one.
- Say what the price includes, how long a promo lasts and any one-off fees.
- Cite the source link and check date. Prices are indicative; the operator's checkout price is binding.
- Pass on any "alternatives" or "near misses" the result flags, such as an undisclosed speed limit or a travel cost that is only estimated, with the reason given.
