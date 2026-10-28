---
name: debriefing-api
description: Work on a Debriefing workspace (competitors, evidence-backed signals, digests, battlecards, company profile, and team) through the Debriefing read API or MCP server. Use it when a Debriefing user asks what competitors changed, asks for evidence or the latest brief, or wants to change the watchlist, act on signals, or run research.
---

# Debriefing API

Debriefing is competitive intelligence for companies of 20 to 249 people, in any industry. It monitors competitor pages and turns source-backed evidence into signals, digests, and battlecards. The read API only reads one workspace. The MCP server reads it and, with the person's consent, changes it.

## What you need

- For the read API, a paid plan on the workspace. Without one, every call returns HTTP 402.
- For the MCP server, any set-up workspace. Signals, digests, and battlecards read in full on a paid plan, including its 3-day trial. There is no free plan. A tool that needs a paid plan answers `isError` with the pricing link.
- A credential, one of two:
  - For the MCP server, an OAuth sign-in. Claude, ChatGPT, and other OAuth clients add `https://debriefing.io/mcp` and the user signs in to Debriefing and approves the app. You never see a key.
  - An API key. It starts with `dbk_`. A workspace admin creates it in Debriefing, in Organization settings, under Integrations. The read API takes only a key.

If you need a key, ask the user for it. Do not guess it. Do not write it to a file or a log.

## Option 1: the read API

Base URL: `https://debriefing.io/api/v1`

Send the key in one of these headers:

- `Authorization: Bearer <key>`
- `X-API-Key: <key>`

Endpoints (all GET, all JSON, all wrap the result in `data`):

| Path | Returns |
| --- | --- |
| `/competitors` | The tracked competitors, with ids. |
| `/competitors/{id}` | One competitor: company record, current reads, freshness. |
| `/signals` | Open signals, newest first. Filters: `competitor_id`, `severity` (low, medium, high), `since` (ISO 8601), `q` (text). Paged with `page` and `per_page` (max 50). |
| `/signals/{id}` | One signal with its evidence. |
| `/digests` | Generated digests, newest first. Filter: `type`, for example `weekly_tldr`. Paged. |
| `/digests/{id}` | One digest by slug or id. The `markdown` field holds the full text. |
| `/battlecards` | Generated battlecards. |
| `/battlecards/{id}` | One battlecard, by battlecard id or competitor id. |

Example:

```sh
curl -H "Authorization: Bearer $DEBRIEFING_API_KEY" \
  "https://debriefing.io/api/v1/signals?severity=high&per_page=10"
```

Errors are RFC 9457 problem details, sent as `application/problem+json`. Branch on `code`, and follow `hint`. The status is 400 (`invalid_request`), 401 (`invalid_api_key`), 402 (`paid_plan_required`), 404 (`not_found`), 429 (`rate_limited`, wait for `Retry-After`), or 500 (`internal_error`). The `error` field holds the same text as `detail`. Every code is on `https://debriefing.io/developers#errors`.

The OpenAPI description is at `https://debriefing.io/developers/openapi.yaml`, and as JSON at `https://debriefing.io/openapi.json`.

## Option 2: the MCP server

Endpoint: `https://debriefing.io/mcp` (Streamable HTTP: JSON-RPC 2.0 in a POST, one JSON answer, no SSE).

- `initialize`, `ping`, and `tools/list` need no credential. The four public tools below need none either. Any other `tools/call` with no credential gets 401 with a `WWW-Authenticate` header. It points at `https://debriefing.io/.well-known/oauth-protected-resource/mcp`, which names the authorization server. The server supports the authorization code flow with PKCE (S256), dynamic client registration, client ID metadata documents, and refresh tokens.
- Scopes: `read` (always granted), `write` (changes that cost nothing), and `spend` (actions that use a plan allowance). The person ticks write and spend on the consent screen.
- API key: send the same key in the same headers as the read API. A key only reads (scope `read`), as the admin who created it. Write and spend tools need an OAuth sign-in.
- Rate limit: 120 requests a minute per credential, 600 per address, and 100 public tool calls a minute per address without a credential. Then 429 with `Retry-After`.

Every tool works as the signed-in person. It checks the scope, the person's role (admin where the app needs one), and the plan. A refusal answers `isError: true` with the reason and the link that fixes it; tell the person both. Tools that change something have `readOnlyHint: false`, and their other hints are true to what they do: ask the person before you call one.

Tools that spend an allowance or send something take an `idempotency_key`. Make a new unique string, such as a UUID, for each request, and send the same one when you retry. The retry returns the first answer with `replayed: true`.

Public tools (no credential, no workspace). They read only what Debriefing publishes on debriefing.io. Each answer has the page `url` and a `free_brief` link:

- `search_public_briefs`: the competitive briefs Debriefing published about named companies, newest first. Arguments: `query`, `company` (name, slug, or domain), `limit`.
- `get_public_brief`: one published brief by `url`, or by `company_slug` and `slug`: summary, findings, and numbered sources with URLs.
- `search_guides`: the CI library (guides, glossary, comparisons, alternatives, company profiles, intel). Arguments: `query` (required), `collection`, `limit`.
- `get_free_brief_link`: the links to request a free brief, sign up, and see pricing. It creates nothing. One email address may request 3 free briefs in 24 hours; pass `email` to check it.
- `request_free_brief`: requests a free brief for a person with no account and returns a `claim_url`. It starts research and emails the person, so ask first and send `person_consented: true` only after they agree. The person opens the claim URL and signs up once, with the same email, to get a workspace that holds the brief. One email address gets one brief this way.

Read tools (scope `read`):

- `get_workspace`: the workspace, you and your role, the connection's scopes, and the plan.
- `get_plan_and_limits`: the plan, competitor slots, the weekly research allowance, the daily caps, share link lifetimes, cadences, and the pricing link.
- `list_competitors`: the tracked competitors, with ids.
- `get_competitor`: the dossier for one `competitor_id`: company facts, workspace risk and opportunity, and the stored reads.
- `search_signals`: signals, newest first. Arguments: `competitor_id`, `severity`, `query`, `since`, `limit` (max 50).
- `get_evidence`: the evidence behind one `signal_id`.
- `what_changed`: signals, digests, and battlecards that are new since a `since` time.
- `list_digests`: generated digests, newest first. Arguments: `type` (for example `daily_digest`), `limit`.
- `get_digest`: one digest by `id` or slug, or the newest. Pass `type: "daily_digest"` for the daily one.
- `list_battlecards`: the generated battlecards.
- `get_battlecard`: one battlecard, by `competitor_id` or `battlecard_id`.
- `get_company_profile`: the company profile, positioning, and ideal customer profile.
- `get_delivery_settings`: the monitoring cadence and delivery channels. Admin only.
- `list_members`: the people in the workspace. An admin also sees pending invitations.

Write tools (scope `write`):

- `add_competitor`, `rename_competitor`, `remove_competitor`: the core watchlist. Admin only. Removing needs a paid plan, and the plan sets the number of slots.
- `add_monitored_page`, `remove_monitored_page`: extra pages watched on a core competitor. Admin only, paid plan.
- `pin_signal`, `save_signal`, `add_signal_note`, `rate_signal`: act on a signal. `pinned: false` and `saved: false` undo.
- `pin_digest`, `add_digest_note`, `rate_digest`: act on a digest.
- `add_battlecard_note`: what the team knows about a core competitor.
- `update_company_profile`: the company profile and positioning lists. Admin only.
- `set_monitoring_cadence`, `set_delivery_channels`: delivery settings. Admin only.
- `create_share_link`: a public link to one signal. Takes an `idempotency_key`.
- `invite_member`: emails an invitation. Admin only, paid plan. Takes an `idempotency_key`.
- `create_checkout_link`: a Stripe Checkout link that buys one `plan` (`starter`, `growth`, or `portfolio`), billed each `month` or `year`. It charges nothing: give the link to the person, who pays in a browser. Admin only. Takes an `idempotency_key`. ChatGPT does not list it.

Spend tools (scope `spend`, all take an `idempotency_key`):

- `research_competitor`, `refresh_watchlist`: research that uses the weekly allowance. Admin only.
- `generate_battlecard`: writes a battlecard now. Paid plan or trial. Daily cap.
- `update_icp`: sets the ideal customer profile and re-reads competitor overlap. Admin only. Daily cap.
- `draft_positioning`: drafts empty positioning fields from the company website. Admin only. Daily cap.

The MCP server never deletes a workspace, charges a card, changes an existing subscription, passwords, or email addresses, creates API keys, connects Slack, or removes teammates. Send the person to the app for those.

A client that cannot send headers connects through `npx mcp-remote https://debriefing.io/mcp --header "Authorization: Bearer <key>"`.

## How to answer the user

1. Start with `list_competitors` or `/competitors` to get ids. For one competitor in depth, call `get_competitor` or `/competitors/{id}`.
2. For "what changed", read signals. Sort by severity, then by date.
3. Cite the evidence. Each signal has `evidence` items with `source_url` and `observed_at`. Give the user the source URL for each claim.
4. For "the latest brief", read the newest digest and quote its `headline` and `tldr`.
5. Link the user to the `url` field. It opens the record in the Debriefing dashboard.
6. Before a change, say what you will do and ask. After it, report the `message` field.

## No account yet

A person with no Debriefing account can still use the public tools. Cite the brief or guide `url` for each claim. They can get one free brief of their own at https://debriefing.io/ (`get_free_brief_link` returns the link). They enter a company website and a work email. The brief arrives by email. Only submit that form with the person's consent.

Docs: https://debriefing.io/developers (Markdown: https://debriefing.io/developers.md)
