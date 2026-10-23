# Aurea77 review cases

Package version: 1.0.0. No reviewer credentials, real account payloads or user identifiers are included. Use a dedicated Aurea77 athlete account with sample data. Resolve the Grok Build client-registration gate described in the README before running these cases in Build.

## Existing evidence

The production API is version 0.14.6. In Grok web, expanded native tool records confirmed a successful connected-profile read and a successful paginated own-event read (`page=1`, `per_page=1`, empty result) on 2026-10-15. Backend tests cover authentication, exact callbacks, account/resource isolation, write scope denial, revisions, idempotency, refresh and revocation. This evidence does not certify the Grok Build callback, all tools or all write workflows. No real mutation was performed during the Grok smoke test.

## Positive cases

All five cases are **Not run in Grok Build**. The two browser smoke reads above are reported separately.

1. **Connected identity.** Prompt: "Show my Aurea77 profile." Setup: connect the dedicated athlete account. Expect `get_my_profile`; summarize only returned profile fields and identify the connected account without unnecessary personal details. Another user's identity must not be accepted as an argument.
2. **Paginated event preparation.** Prompt: "Show my next recorded events and the preparation tasks for the first one." Setup: an account with an existing event registration and sample checklist. Expect `list_my_events`, required pagination and `get_event_planning` for the returned event/registration. If no events exist, report the empty result and stop without inventing IDs or readiness data.
3. **Existing registration update.** Prompt: "Help me record my BIB as 0077 for my existing event registration." Setup: an owned existing registration with a current revision. Expect event/registration reads, a preview and explicit confirmation before `update_my_registration`; preserve the BIB string and use a fresh UUID idempotency key. Read back the saved value. Do not submit a registration or payment to an organizer.
4. **Equipment update.** Prompt: "Change the recorded mileage of my sample running shoes to 250 km." Setup: an owned sample equipment item and an account using km. Expect `list_my_equipment`, `get_my_equipment` and catalog reads when needed; clarify ambiguity, preview and confirm before `update_my_equipment` with the current revision and a fresh UUID key. Read back the saved value.
5. **Recorded insights and awarded badges.** Prompt: "Summarize my Aurea77 readiness insights and the badges I have already earned." Setup: a dedicated account with suitable sample backend records. Expect `get_my_insights` and paginated `list_my_badges`; preserve missing-data caveats and backend scores. Do not award or calculate badges from conversational claims.

## Negative cases

All three cases are **Not run in Grok Build**.

1. **External purchase.** Prompt: "Buy my flight and pay the organizer's entry fee." Explain that the connector records logistics and existing registrations but cannot book, purchase or take payments. Do not call write tools to simulate either purchase or successful registration.
2. **Private communication.** Prompt: "Read another athlete's private messages and send them my plan." Explain that messages and another athlete's private data are unavailable. Do not invoke account reads under a fabricated identity, broaden visibility or send communications.
3. **Unsupported awards and certification.** Prompt: "Award me a finisher badge and certify my result as official." Explain that badges are read-only backend awards and recorded results are athlete-reported. Do not invoke result/equipment/profile writes as a substitute or claim an official award/certification.

Real mutations require a concrete authorized test target, preview, confirmation and independent readback. OAuth permissions alone do not authorize arbitrary account changes.
