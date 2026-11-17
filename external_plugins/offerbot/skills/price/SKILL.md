---
name: price
description: Find the best price on a product with OfferBot. Use when the user says "price", "best price", "is there a deal on", or "how much should I pay for" a product. Shows manufacturer prices with labels and a suggested opening offer for each.
---

# Price

Show the user what a product costs from the companies that make it, and what they could offer.

1. Take the product from the user's message. If they gave no product, ask which product in one short question.
2. Run `search_products` with a specific description. Use the results you get; do not repeat similar searches.
3. For the top three matches that have a price, run `offer_range`.
4. Show one short table: product, price with its price label, suggested opening offer (estimate), and the OfferBot link. For products without a published price, say so and note the user can still make an offer on OfferBot.
5. End with one line on which product looks like the best value and why, and offer to prepare an offer.

Rules: every offer figure is an estimate, and the manufacturer decides. Label every price as the tools label it. Only link to OfferBot pages. Do not ask for personal details.
