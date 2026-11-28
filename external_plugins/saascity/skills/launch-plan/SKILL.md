---
name: launch-plan
description: Plan a SaaS, AI or developer-tool launch with the SaaSCity MCP server. Audit the homepage the way directory scrapers see it, fix what blocks launch, pick launch directories by Ahrefs DR, link type and price, turn them into a dated checklist, and, only when the user asks, draft a SaaSCity listing for them to review.
license: MIT
---

# Plan a product launch

Every tool named below comes from the SaaSCity MCP server, `https://saascity.io/api/mcp`
(Streamable HTTP, no account, no API key).

## Steps

1. **Audit the site.** Call `check_launch_readiness` with the product homepage. Report the score and
   the verdict, then every `fail` with its exact fix, then the `warn` rows. If the verdict is
   `not_ready`, stop here and help the user fix the failures first: a directory that scrapes a
   page with no title, a broken og:image or a `noindex` tag lists it badly or not at all.
2. **Pick directories.** Call `recommend_launch_directories` with `product_type` set to `saas`,
   `ai`, `devtools` or `any`. Keep each pick's human-written note, including the ones that say a
   paid listing is not worth it.
3. **Go wider when the user wants more.** Call `find_launch_directories`, for example with
   `link_type: "dofollow"` and `pricing: "free_or_freemium"`, sorted by DR. Use
   `get_launch_directory` to vet one site the user names before they pay for it.
4. **Write the checklist.** Launch-day platforms on day 1, the rest spread over the next two weeks.
   For each row give the directory, its submit URL, price, link type, DR and whether its free
   listing asks for a badge on the user's site.
5. **List on SaaSCity, only if the user asks.** Call `get_offers` and show the current plans and
   prices. Draft a title (3-60 characters), tagline (10-100), category and a plain-text description
   (50-5,000: the problem, who it is for, what is different). Show the draft and wait for the
   user's OK, then call `submit_project`. It is the only tool that writes anything.
6. **Hand over the claim link.** Give the user the `claimUrl` and its expiry. Say that the draft is
   inert: the user opens the link, signs in, picks a plan and a launch week and pays. Nothing is
   published or charged before that, and a person reviews every listing.
   `get_submission_status` with the `claimToken` shows where it stands later.

## Reporting rules

- DR is Ahrefs Domain Rating, a third-party estimate of a domain's link profile. Name the source
  and the date the tool gives (`drCheckedAt`, `dataUpdatedAt`) next to the numbers.
- Treat `unknown` link types and prices as unverified. Never present them as free or dofollow.
- A DR of 0 means there is no data, not that the site is worthless.
- Do not promise rankings, traffic or a Domain Rating increase from any listing. A directory gives
  a listing page and a link; what that does for search is not something these tools measure.
- Never submit to SaaSCity without the user's explicit OK on the final draft, and never fill in or
  pay on the claim page for them.
- When a tool returns a rate-limit message, say so and wait. Do not retry in a loop.

## Done when

- The audit's failures are listed with fixes, or the user has decided to launch anyway.
- Every recommended directory has a submit URL, price, link type, DR with its source, and the
  badge requirement.
- The checklist has dates.
- A SaaSCity listing exists only as a draft the user approved, and they have the claim link.
