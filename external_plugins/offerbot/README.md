# OfferBot for Grok Build

OfferBot lets you make a private offer directly to the company that makes a product. This plugin connects Grok Build to the hosted OfferBot MCP server and adds three skills.

## What it does

- **Search** products sold by their manufacturers' own US stores, with the labeled list price, ratings and key specs. Marketplaces and resellers are never included.
- **Estimate** a fair offer range for a product. Every range is an estimate; the manufacturer decides each offer.
- **Prepare** an offer link. You sign in, verify a card and send the offer on offerbot.com. Nothing is sent or charged from the chat.

## Setup

The plugin uses the hosted server at `https://auth.offerbot.com/functions/v1/offerbotMcp_v1` (Streamable HTTP, OAuth 2.1 with dynamic client registration). Sign in with a free OfferBot account the first time Grok connects. No API key is needed.

## Skills

- `offer`: make an offer on a product
- `price`: check what a product costs and what a fair offer would be
- `under`: find any kind of product under a budget

## Tools

`search_products`, `get_product`, `offer_range`, `start_offer`. None of them sends an offer, places an order or charges a card.

## Support

support@offerbot.com · https://offerbot.com/ai · Privacy: https://offerbot.com/privacy

## License

MIT. Published by ZLABS Technologies Inc.
