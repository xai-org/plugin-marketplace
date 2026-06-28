# fastCRW Plugin for Grok Build

Give your agents reliable web access: **scrape, crawl, map, and search** any site
and get clean, LLM-ready markdown — straight from Grok Build.

fastCRW is an **open-source, self-hostable web crawler & search API written in
Rust**. The engine is a single ~6 MB static binary (no Redis, no Node, no Python
venv, no headless-browser sidecar in the request path), so you can run the exact
same engine yourself or use the managed cloud. This plugin bundles the **hosted
fastCRW MCP server** — connect once, sign in through your browser, and Grok gets
native `crw_*` tools for the whole web.

## Why fastCRW

- **Open core, self-hostable.** AGPL-3.0 engine ([github.com/us/crw](https://github.com/us/crw))
  — one static binary, ~50 MB RAM idle. Use the managed cloud or host it yourself.
- **Fast + high recall.** Reproducible 1K-URL benchmarks: faster than Firecrawl and
  Tavily, with higher truth-recall than Crawl4AI/Firecrawl on the same set. See the
  benchmark on [fastcrw.com](https://fastcrw.com).
- **SearXNG-optimized search.** Web search via a tuned SearXNG backend (embedded
  sidecar when self-hosting, managed when hosted).
- **Drop-in migration.** Firecrawl-compatible REST API (`/v1/*` and `/v2/*`) if
  you're moving an existing pipeline — but the MCP tools below are the native path.

## Installation

In Grok Build, run `/plugin` and search for **fastcrw**, then install it. This
wires up the bundled fastCRW MCP server.

### Sign in (no API key)

The first time Grok uses a fastCRW tool, you'll be prompted to authorize in your
browser through your fastCRW account (OAuth). Approve once — **no API key to copy
or paste**. Check the connection any time with `/mcp`, and manage or revoke
connected apps from your dashboard at **fastcrw.com/dashboard → Connections**.

**Prefer a key in the URL?** The connector also accepts an API key in the path —
add `https://fastcrw.com/mcp/<API_KEY>` instead (handy for clients that can't run
the OAuth flow). Get a key at [fastcrw.com/dashboard](https://fastcrw.com/dashboard).

## Tools

| Tool | What it does |
| --- | --- |
| `crw_scrape` | Scrape one URL to clean markdown, HTML, or links. |
| `crw_crawl` | Start an async site crawl; returns a job id. |
| `crw_check_crawl_status` | Poll an async crawl job and retrieve its pages. |
| `crw_map` | Discover URLs on a site (sitemap + short crawl). URLs only, no content. |
| `crw_search` | Web search with optional full-page content (SearXNG-backed). |

Tool calls consume your fastCRW account credits.

## Usage

Once installed, just ask naturally:

```text
Scrape https://fastcrw.com/pricing and summarize the plans
Map all URLs on https://example.com
Search for "best practices for RAG chunking" and pull the top results
```

## Self-hosting

The same engine is open source. Run it yourself and point an MCP/REST client at
your own instance:

```bash
# see https://github.com/us/crw and https://docs.fastcrw.com
crw serve   # single static binary, Firecrawl-compatible /v1 + /v2 API + /mcp
```

## Security

- **Network endpoints this plugin calls:** the hosted MCP server at
  `https://fastcrw.com/mcp` (HTTPS only). No other outbound calls.
- **Credentials it requires:** a browser OAuth sign-in to your fastCRW account
  (or, optionally, a fastCRW API key supplied in the connector URL). No secrets are
  bundled in this plugin; nothing is read from your machine.

## Links

- Website: https://fastcrw.com
- Docs: https://docs.fastcrw.com
- Engine (open source, AGPL-3.0): https://github.com/us/crw

## License

This plugin is licensed under AGPL-3.0, consistent with the fastCRW engine.
