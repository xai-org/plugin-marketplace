# CrawlGraph plugin

Backlink research and competitor gap prospecting for Grok Build and Claude Code, using quarterly Common Crawl observations. This vendored plugin uses the accepted `.claude-plugin/plugin.json` manifest and a local STDIO MCP server; it is not a remote Claude connector.

Plugin version **1.0.0** is separate from the pinned runtime **crawlgraph-mcp@0.2.2**. Author: Petteri Pucilowski. [CrawlGraph](https://crawlgraph.com) · [MCP source](https://github.com/pucilpet/crawlgraph-mcp) · [published package](https://www.npmjs.com/package/crawlgraph-mcp/v/0.2.2).

## Setup

Install this plugin through your client's plugin mechanism. Have Node.js 18 or newer and `npx` available on PATH. Use your own existing CrawlGraph API key, following the [public API documentation](https://crawlgraph.com/docs/api).

Set `CRAWLGRAPH_API_KEY` securely in your local launch environment **before starting Grok Build or Claude Code**. The root `.mcp.json` explicitly passes `${CRAWLGRAPH_API_KEY}` through the client's environment expansion. The variable must exist in the Grok process environment; the placeholder is not a credential. Restart the client after updating the launch environment. Keep the key out of chat, source control, and shared configuration.

The client starts `npx` directly with `-y` and `crawlgraph-mcp@0.2.2`. No shell wrapper, hooks, or additional permissions are bundled. This preparation has not exercised a live Grok Build or Claude Code session; client loading and successful authenticated queries remain runtime acceptance checks.

## Tools and costs

| Published 0.2.2 tool | Arguments and behavior | API quota cost |
|---|---|---|
| `backlinks` | `domain`; optional `limit` (1–10,000, default 1,000), `sort` (`authority` or `hosts`), `release_id` | One backlink call |
| `gap_analysis` | `my_domain`, 1–5 `competitor_domains`; submits and polls a gap job | One gap job |
| `gap_outreach_targets` | `my_domain`, 2–5 competitors; optional `include_platforms` (default false), `enrich_top` (0–25, default 10) | One gap job plus up to N backlink calls for N enriched priority targets |
| `releases` | Lists queryable snapshots; no arguments | No quota cost |

The bundled `backlink-research` skill explicitly uses `enrich_top: 0` unless the user chooses a bounded enrichment count after learning the additional cost. Failed enrichment attempts may consume quota even when not counted in `authority_enriched`. Gap calls poll internally for about 90 seconds; failures and timeouts must not be automatically resubmitted because quota may already have been charged. This version provides no resume tool or guaranteed resumable handle.

The public API documentation, checked October 3, 2026, states account quotas of **15 backlink calls / 0 gap jobs** for free access and **1,000 backlink calls / 50 gap jobs** for paid core access per UTC calendar month. Paid access includes eligible monthly plans as well as lifetime access. The published legacy server's lifetime-only wording is outdated; current access rules belong to the service. No purchase or account creation is performed by this plugin.

## Network and credentials

`npx` downloads the pinned package and its dependencies from the configured npm registry (normally `https://registry.npmjs.org`) and executes the local STDIO server. Runtime requests go to the canonical `https://crawlgraph.com/api/v1` endpoint. The server sends your CrawlGraph API key in the Authorization header and the requested domain/query data to CrawlGraph, consuming your existing API quota. The bundle contains no literal keys, shared paid credentials, OAuth setup, or provider credentials.

The upstream server supports a `CRAWLGRAPH_BASE_URL` override, but this bundle does not configure one. Ensure the client launch environment has no inherited override if you intend to use the canonical endpoint. The top-level npm version is pinned; npm resolves its dependency ranges when installing.

## Data and version limits

These are quarterly Common Crawl graph observations, not live link verification or a complete inventory of the web. Referring-domain rows are not individual linking-page URLs. Competitor overlap suggests prospects; it does not prove publisher interest, contact details, or an outreach opportunity. CrawlGraph authority/rank are graph metrics, not independently verified quality. Platform filtering is heuristic. Outreach output is for drafting; this plugin does not send messages.

The frozen published 0.2.2 server defines the four tools above. Current source and public platform documentation may describe additional features such as `backlink_changes`, OAuth, or newer output limits; those are not capabilities of this pinned plugin. Backlink responses include release identity; this version's gap responses do not. Do not assume modern resume/refresh behavior.

## License

MIT. The included [LICENSE](LICENSE) preserves the upstream copyright notice for Petteri Pucilowski. CrawlGraph service access remains subject to its applicable terms and quotas; marketplace listing does not imply xAI endorsement or verification.
