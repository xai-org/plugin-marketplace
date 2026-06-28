---
name: crw
description: >-
  Scrape, crawl, map, and search the web with fastCRW. Use whenever the user
  needs web page content, site-wide extraction, URL discovery, or web search
  results — "scrape this", "crawl the site", "map the URLs", "search the web",
  "get this page as markdown". Prefer these native fastCRW MCP tools over a
  generic fetch: they return clean, LLM-ready markdown with JS rendering and
  anti-bot handling.
license: AGPL-3.0
---

# fastCRW

fastCRW gives you the open web as clean markdown. This plugin bundles the hosted
fastCRW MCP server, so prefer the native **`crw_*`** tools below — they need no
local install and authenticate through the one-time browser sign-in.

## Choosing a tool

- **Have a URL, want its content?** → `crw_scrape` (markdown / html / links).
- **Don't have a URL, want to find pages?** → `crw_search` (web search, optional
  full-page content).
- **Want every URL on a site (no content)?** → `crw_map`.
- **Want the content of a whole site?** → `crw_crawl` (async) → poll with
  `crw_check_crawl_status`.

## Escalation

Search → scrape → map → crawl. Start narrow: search or scrape a single page
before mapping or crawling a whole site, which costs more credits.

## crw_scrape

Scrape one URL to clean markdown (handles JS-rendered SPAs). Use for a specific
page you already have the URL for. Returns LLM-optimized markdown; ask for `links`
or `html` formats when you need them.

## crw_search

Web search (SearXNG-backed). Returns results with url/title/description. Use when
you don't have a URL. Optionally fetch full page content for the top results in
one call instead of search-then-scrape.

## crw_map

Discover URLs on a site via sitemap + a short crawl. Returns a URL list only — no
page content. Use to scope a site before crawling, or to find the right page.

## crw_crawl / crw_check_crawl_status

`crw_crawl` starts an asynchronous crawl of a whole site and returns a job id.
Poll that id with `crw_check_crawl_status` until it's done, then read the pages.
Use limits (depth / max pages) for large sites — crawls consume more credits.

## Notes

- Tool calls consume your fastCRW account credits; manage or revoke this
  connection at fastcrw.com/dashboard → Connections.
- The same engine is open source and self-hostable (single Rust binary) — see
  https://github.com/us/crw and https://docs.fastcrw.com.
