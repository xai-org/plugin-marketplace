---
name: 6zzzzzz
description: >-
  Check whether domain names are registered using the 6zzzzzz MCP tools. Use
  when the user wants to know if a domain is available, is brainstorming names
  for a product or company, or has a list of candidate domains to check.
---

# 6zzzzzz domain search

6zzzzzz answers domain availability from ICANN zone files held in memory, so
lookups are exact and fast. Two tools are available.

## check_domains

Pass a list in `domains`, up to 500 entries per call.

- A full domain (`acme.com`) checks exactly that name.
- A bare name (`acme`) checks it across about 28 popular TLDs. Each bare name
  counts once per TLD toward a 2,000-lookup limit per call.

When checking several candidates, send them in one call rather than one call
per name. Results come back in input order.

## search_domain

Pass one `query`. Returns that name across popular TLDs plus variations of it
(`getacme.com`, `acmehq.com`, ...) that are verified free. Use it to explore
when the user has one word in mind; use `check_domains` when they already
have candidates.

## Reading the results

- `taken` — present in the zone file; registered.
- `available` — absent from the zone file. A strong signal the name is free,
  but a registered domain with no nameservers looks the same, so tell the user
  to confirm at checkout.
- `unknown` — no zone data for that TLD. Country-code TLDs such as `.io`,
  `.ai` and `.co` are not published by ICANN, so these are always unknown.
- `invalid` — the input is not a valid domain name.

Available results include a `register_url`. It is an affiliate link to a
registrar's search page for that domain; say so if you show it.
