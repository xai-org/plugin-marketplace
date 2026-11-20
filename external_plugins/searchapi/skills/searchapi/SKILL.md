---
name: searchapi
description: >-
  Search the live web and structured data sources through the SearchApi MCP server:
  Google (web, Images, News, Scholar, Jobs, Shopping, Maps, Flights, Hotels, Trends,
  Patents), Bing, DuckDuckGo, YouTube, Amazon, eBay, Walmart, Reddit, TikTok, LinkedIn,
  GitHub and 100+ other engines, returned as structured JSON. Use whenever "SearchApi",
  "searchapi.io", a SERP or "search results" come up, or when the user needs current
  information, prices, listings, reviews, jobs, citations or a video transcript that is
  not in your training data.
---

# SearchApi

SearchApi is a real-time SERP API. The `searchapi` MCP server bundled with this plugin
exposes one tool per engine or endpoint (around 185 tools; the list with example prompts
is at https://www.searchapi.io/integrations/mcp#tools). Every tool returns the parsed
page as JSON: titles, links, snippets, prices, ratings, addresses, knowledge graph data,
rather than raw HTML. Each call costs one API request on the signed-in account.

## Choosing a tool

| You want | Use |
|---|---|
| General web results, a fact, a recent article | **Google** (the `google` engine, full SERP); **Google Search Light** when you only need the organic list and want it fast; **Bing Search** or **DuckDuckGo Search Light** as a second opinion |
| Headlines | **Google News**, **Google News Light**, **Bing News**, **Yahoo News** |
| Papers and citations | **Google Scholar** (plus **Google Scholar Case Law** for court opinions) |
| Products and prices | **Google Shopping Search**, **Google Product**, **Amazon Search** / **Amazon Product** / **Amazon Offers**, **eBay Search**, **Walmart Search**, **Best Buy Search** |
| Places, businesses, reviews | **Google Maps Search**, **Google Maps Place**, **Google Maps Reviews**, **Google Local**, **Tripadvisor**, **Trustpilot Reviews**, **Capterra Reviews**, **Glassdoor Reviews** |
| Travel | **Google Flights One Way / Round Trip**, **Google Hotels**, **Airbnb Search**, **Booking**, **Skyscanner Flights**, **Kayak Hotels** |
| Jobs | **Google Jobs**, **Indeed Jobs**, **LinkedIn Jobs**, **ZipRecruiter Jobs** |
| Video | **YouTube Search**, **YouTube Video**, **YouTube Transcript** (full captions of one video), **TikTok Search** |
| Images | **Google Images**, **Google Images Light**, **Google Reverse Image**, **Google Lens** (what is in this picture) |
| Trends and SEO | **Google Trends**, **Google Rank Tracking** (where a domain ranks for a query), **Google Ads Search** |
| Social | **Reddit Search** / **Reddit Post**, **Instagram Profile**, **TikTok Profile**, **LinkedIn People** |
| Developers | **GitHub Search**, **GitHub Repository**, **GitHub Trending**, **Apple Appstore Search**, **Google Play Search** |

When a dedicated tool exists (Amazon Product for an ASIN, YouTube Transcript for a video),
prefer it over a generic Google query: the response is already structured for that task.

## Writing a good query

- **Localize when it matters.** Google tools accept `gl` (country, e.g. `de`), `hl`
  (interface language, e.g. `de`) and `location` (a city or region string, e.g.
  `Berlin, Germany`). Set them when the user cares about a market or a language; leave
  them out for a neutral English search.
- **Page, do not over-fetch.** `num` caps the organic results (up to 10 on Google);
  `page` is 1-based. Ask for a second page only when the first one did not answer.
- **Narrow with operators.** Google understands `site:`, `"exact phrase"`, `-exclude`,
  `filetype:` and `after:2026-01-01`. Time filters are also available as `time_period`
  (`last_hour`, `last_day`, `last_week`, `last_month`, `last_year`).
- **Ask the engine the question the user asked.** Pass the user's intent, not a rewrite
  into keywords, when the tool is Google AI Mode, ChatGPT or Gemini.

## Reading the response

- The main list is `organic_results[]` with `position`, `title`, `link`, `snippet` and,
  when present, `date`, `displayed_link`, `sitelinks`, `rich_snippet`.
- Look at the extra blocks before you summarize: `answer_box`, `knowledge_graph`,
  `top_stories`, `related_questions`, `shopping_results`, `local_results`,
  `inline_videos`, `jobs`. They often hold the direct answer.
- `search_information.total_results` and `pagination.next` tell you whether paging is
  worth it.
- Some `link` values are `https://www.google.com/goto?url=…` redirects. Pass them through
  as they are; they resolve to the target page.
- No results is not an error: the response is HTTP 200 with an `error` message such as
  "Google didn't return any results." and no `organic_results`. Say so and try a broader
  query or another engine.
- Cite what you used. Give the user the `title` and `link` of each source you relied on,
  and quote `snippet` text as a snippet, not as the full page.

## Authentication problems

The server signs the user in with OAuth on first connect. A `401` means the session was
not authorized or the token expired: ask the user to reconnect the SearchApi plugin and
sign in again. Do not ask the user for an API key, and never paste a key or token into
chat. Clients without OAuth can use an `X-MCP-Token` header instead; the setup for that
is documented at https://www.searchapi.io/integrations/mcp.

## Building against SearchApi in code

When the user is writing software rather than looking something up, the MCP tools are
still the fastest way to see a real response shape, but the code should call the REST API
directly:

- `GET https://www.searchapi.io/api/v1/search?engine=google&q=…` with
  `Authorization: Bearer <SEARCHAPI_API_KEY>` (or `api_key` as a query parameter). The
  same `engine` names and parameters as the MCP tools.
- Docs per engine: https://www.searchapi.io/docs/google (Google), and the sidebar there
  for every other engine.
- Official MCP server for other clients: https://www.searchapi.io/integrations/mcp
