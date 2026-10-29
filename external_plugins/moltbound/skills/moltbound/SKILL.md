---
name: moltbound
description: Get simulated quotes for US services (car, home, renters, pet, travel, life, health, energy, internet, mobile and more) from the Moltbound sandbox, and hand any purchase to the person for passkey approval. Use when the user asks for a quote from Moltbound or moltbound.dev.
---

# Moltbound sandbox quotes

Moltbound is a **test-only US sandbox**: every partner is fictional, every quote is simulated, and nothing is bought for real. Tell the user this first, in your own words.

## Getting quotes

1. For a quick answer, call `moltbound_quick_quote` with a plain-language `prompt` (for example "car insurance for a 2019 Honda Civic in Austin TX 78701") and `auto_default: true`. It returns up to 8 simulated quotes, cheapest first, and lists which details were filled with sandbox defaults.
2. For a tailored quote, call `moltbound_start_session` (`jurisdiction: "US"`, `service_id: "*"`), then `moltbound_requirements` to see which fields to ask the user for, then `moltbound_get_quotes` and poll `moltbound_quote_status`.
3. `moltbound_list_services` lists all 20 services and their IDs.

Never send names, government ID numbers, card or bank details; Moltbound refuses them. Use fictitious data.

## Purchases

You can ask, but you can never approve. To continue to a (simulated) purchase:

1. `moltbound_consent_link` gives the user a short code to link you on moltbound.dev with their passkey.
2. `moltbound_approval_request` asks them to approve one exact quote (`job_id`, `bid_id`).
3. After they approve on moltbound.dev, `moltbound_complete_purchase` completes it once, within 15 minutes.

Every approved purchase gets a signed Proof-of-Consent receipt the user can check at https://moltbound.dev/verify.
