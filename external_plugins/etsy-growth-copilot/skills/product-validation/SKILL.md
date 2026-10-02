---
name: product-validation
description: >-
  Decide whether a new Etsy product idea is worth making and listing. Score
  candidates on demand, competition, price, margin, license, and shipping
  risk, then return a ranked go, test, or kill list.
---

# Product validation scorecard

For each candidate product, score 1–5 on each criterion, with evidence and a date. Do not create the listing. Recommend only.

1. **Demand**: Etsy search results and autocomplete, number of competing ads, bestseller badges, recent reviews on competitors, and Reddit or forum pain points.
2. **Competition density**: how many close listings there are, how strong the top ones are (reviews, photos), and whether there is room to differentiate.
3. **Price range**: the typical price band on Etsy, and whether it can clear $35 alone or in a bundle. US search favors the free-shipping guarantee on orders of $35 or more. Listings that charge $6 or more for shipping have been demoted since October 2024.
4. **Cost and margin**: materials, labor or machine time, packaging, shipping, and Etsy fees. Fee reference (re-verify on Etsy before quoting): $0.20 listing fee renewed every 4 months, 6.5% transaction fee, US processing 3% + $0.25. Items under $10 can see fixed fees around 15%. Report margin after fees.
5. **IP / license**: trademark or brand exposure. Never imply affiliation; use "fits X". For print-on-demand or 3D or digital files, check the license. CC0, public domain, CC BY, and MIT allow selling (credit where required). CC BY-SA allows selling with credit and share-alike. NC does not allow selling. Save proof (URL and date).
6. **Operational risk**: fragility and shipping risk, production time, returns, and safety or compliance claims. No unverifiable claims (for example "FDA food safe").

## Output

- Table: product, score per criterion, total, key evidence, verdict (Go / Test / Kill).
- Ranked go/kill list with a recommended next pick and why.
- Any IP or license issue is an automatic Kill until it is resolved.
- Label numbers `[FACT]`, `[EST]`, or `[NOTES]`.
