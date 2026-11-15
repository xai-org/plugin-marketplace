---
name: offer
description: Make an offer on a product with OfferBot. Use when the user says "offer", "make an offer", "what should I offer", or names a product and a price they want to pay. Finds the product from its manufacturer, estimates a fair offer, and prepares an OfferBot link where the user reviews and sends it.
---

# Offer

Help the user make a private offer to the company that makes a product, using the OfferBot tools.

1. Take the product from the user's message. If they gave no product, ask which product in one short question.
2. Run `search_products` with a specific description (type, key specs, brand if given). Show the top matches in a short table: name, price with its price label, and the OfferBot link.
3. For the product the user means (or the best match), run `offer_range`. If the user named a price, pass it as `price`. Show the suggested opening offer and the price bands, and call every figure an estimate.
4. If the user gave a price, run `start_offer` with it. If not, ask what they want to offer, then run `start_offer`.
5. Give the OfferBot link. Say plainly that nothing is sent or charged until they review and send the offer on OfferBot, and mention the plan it needs when the tool says Pro Verified.

Rules: say "offer", never "bid" or "try". Never promise a discount or say an offer will be accepted; the manufacturer decides. Label every price as the tools label it. Only link to OfferBot pages, never to a store or the manufacturer's site. Do not ask for names, emails, addresses or card details.
