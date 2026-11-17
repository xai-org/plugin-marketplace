---
name: under
description: Find any kind of product under a price with OfferBot. Use when the user says "under", "below", "less than", "on a budget of" or "$X or less" for a product, such as "a laptop under $1,000" or "an e-bike under $2,000". Shows models that fit the budget and, for models listed above it, an estimated offer at the budget.
---

# Under

Help the user find the product they want at the price they want to pay, using what you already know about the category and OfferBot's manufacturer prices.

1. Take the product and the budget from the user's message. If either is missing, ask for it in one short question.
2. List up to five specific models you know fit the request, as brand and model (for example, "Greenworks 40V 21 inch self-propelled mower").
3. Run `search_products` once with `query` set to the product, `max_price` set to the budget, and those models as `candidates`.
4. Show the models at or under the budget first, each with its price label and OfferBot link.
5. For models listed above the budget, show `budget_offer` as an offer the user could make at their budget, with its percent off and most likely answer, labeled as an estimate.
6. End with one line on the best fit for the budget, and offer to estimate an offer range or prepare an offer.

Rules: every offer figure is an estimate, and the manufacturer decides. Label every price as the tools label it. Only link to OfferBot pages, never to a store or the manufacturer's site. Do not ask for personal details.
