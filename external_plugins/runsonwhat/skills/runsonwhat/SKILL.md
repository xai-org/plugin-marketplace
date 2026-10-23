---
name: runsonwhat
description: >-
  Look up the software a company runs on, or the companies that use a tool, with
  runsonwhat (runsonwhat.com). Use whenever the user mentions runsonwhat, pastes a
  runsonwhat.com link, or asks what tech stack a specific company uses, which companies
  use a specific tool (for example "companies that use HubSpot in Germany"), or which
  companies recently started or stopped using a tool.
---

# runsonwhat

runsonwhat reads public traces of a company's software (DNS records, certificate logs,
website code, tag-manager containers, subprocessor lists, public job boards) and shows
the evidence behind every tool it lists. It covers two questions:

- **What does a company run on?** Every tool found for a domain, where it was found, and
  since when when a certificate proves it.
- **Who runs on a tool?** The companies using a tool, filterable by country, industry
  and size, plus recent starts and stops.

There are two ways to read the data. Use the public pages unless the user has an API
key or needs more than they show.

## 1. Public pages (no key)

Every page has a Markdown copy at the same URL plus `.md`. Always use the `www.` host
(the bare domain redirects). Fetch it with your web or
fetch tool and quote from it:

| Question | URL |
|---|---|
| A company's stack | `https://www.runsonwhat.com/company/<domain>.md` (e.g. `stripe.com`) |
| Companies using a tool | `https://www.runsonwhat.com/reverse/<tool-id>.md` (e.g. `hubspot`) |
| A tool in one country | `https://www.runsonwhat.com/reverse/<tool-id>/<country>.md` (lowercase ISO code, e.g. `de`) |
| Tools in a category | `https://www.runsonwhat.com/tools.md` lists every category with a link to its page (e.g. `https://www.runsonwhat.com/tools/analytics.md`) |

Tool pages list the top 40 companies. If you don't know a tool's id, open
`https://www.runsonwhat.com/tools.md` and find it there; ids are short lowercase slugs
(`hubspot`, `salesforce`, `ga`, `stripe`).

## 2. The API (key required)

Use the API when the user wants full company lists, filters, exports or change feeds.
It needs a key in the `RUNSONWHAT_API_KEY` environment variable. Keys start with
`row_live_` and are created at https://www.runsonwhat.com/account/api.

- Base URL: `https://www.runsonwhat.com/api/v1` (use `www.`: the bare domain redirects,
  and some clients drop the auth header on redirect)
- Auth header: `Authorization: Bearer $RUNSONWHAT_API_KEY`
- Docs: https://www.runsonwhat.com/docs (OpenAPI: https://www.runsonwhat.com/api/v1/openapi.json)

```bash
curl -s "https://www.runsonwhat.com/api/v1/companies/stripe.com" \
  -H "Authorization: Bearer $RUNSONWHAT_API_KEY"
```

| Endpoint | Returns | Credits |
|---|---|---|
| `GET /v1/companies/{domain}` | Every tool for one company, with evidence, profile, recent starts/stops and open roles | 1 per company (a company not tracked yet returns 404 and isn't charged) |
| `GET /v1/tools/{tool}/companies` | Companies using a tool. Filters: `country` (ISO code), `industry`, `size`, `has_linkedin`, `plan`, `since_after`; paging: `limit` (1–100), `cursor` | 1 per company returned |
| `GET /v1/changes` | Starts, stops and returns, newest first. Pass `tool` (up to 25 ids, comma-separated), `category` or `domain`; optional `event`, `since`, `until` | 2 per change returned |
| `GET /v1/tools` | Tool ids, names, categories and company counts | none |
| `GET /v1/usage` | The key's balance, limits and usage | none |

### Rules for the API

1. **Never print, echo or log the key.** Pass it only in the `Authorization` header to
   `runsonwhat.com`, and never send it anywhere else.
2. **If `RUNSONWHAT_API_KEY` is unset,** answer from the public pages and tell the user
   a key unlocks full lists and filters. Don't ask them to paste the key into chat;
   ask them to set the environment variable.
3. **Calls spend credits.** Before a list or change-feed call that could return many
   rows, say roughly how many credits it may use (use `limit`, and check the tool's
   company count from `GET /v1/tools` first). Ask before reading past the first page.
   Every response carries `X-Credits-Remaining`.
4. **Errors:** 401 = bad or missing key, 402 `insufficient_credits` = balance too low
   (point the user to hello@runsonwhat.com), 404 = company not tracked yet,
   429 = rate limited (wait for `Retry-After` seconds).

## Presenting results

- Group a company's tools by category and say where each was found (DNS, website
  code, certificate, subprocessor list…). runsonwhat lists only tools with public
  evidence; describe its results as "tools runsonwhat found", not as a complete
  inventory.
- Give a "since" date only when the data has one, and link the runsonwhat page
  (`url` field in API results) so the user can check the evidence.
- For lists, show name, domain, industry, size and country, and say how many companies
  use the tool in total.
