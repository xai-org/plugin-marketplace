# OpenRush plugin for Grok Build

Connect Grok Build to [OpenRush](https://www.openrush.com), a marketing-data
layer for SEO and AI-search research. Results come back with source and
freshness details so answers can be cited.

## Installation

In Grok Build, open `/plugin`, search for **OpenRush**, and install.

On first connection, Grok opens OpenRush sign-in in the browser. Do not paste
an API key or token into chat.

## What it does

Read-only tools for SERP and keyword research, domain and page inspection,
competitor discovery, AI-search visibility, backlinks, and site audits.

| Tool | Purpose |
|---|---|
| `describe_capabilities` | Lists enabled tools and data sources |
| `list_connections` | Shows connected accounts (Google) |
| `inspect_domain` | Domain overview |
| `inspect_page` | Page-level inspection |
| `audit_site` | Site audit |
| `discover_competitors` | Find competing domains |
| `research_keywords` | Keyword research |
| `inspect_keyword` | Single-keyword detail |
| `compare_keyword_coverage` | Keyword coverage comparison between domains |
| `inspect_serp` | Live Google SERP |
| `inspect_search_visibility` | Search visibility for a domain |
| `discover_ai_citations` | Find AI-search citations |
| `inspect_ai_visibility` | AI-search visibility for a brand or domain |
| `inspect_backlinks` | Backlink profile |
| `compare_backlink_gap` | Backlink gap between domains |
| `get_search_performance` | Search Console performance (needs connected Google account) |
| `get_website_analytics` | Analytics data (needs connected Google account) |
| `get_ad_performance` | Ads performance (needs connected Google account) |
| `export_dataset` | Export a full dataset from a prior result |

## Authentication and network

The plugin connects only to `https://api.openrush.com/mcp` (streamable HTTP).
Authentication is standard OAuth 2.1 with PKCE, discovered through the
server's `/.well-known/oauth-protected-resource` metadata.

Credentials: an OpenRush account. No API key or secret is stored in the plugin.
The plugin ships no hooks, scripts or skills.

## License and legal

Proprietary. Use of the hosted MCP is governed by OpenRush's
[Terms](https://www.openrush.com/terms) and [Privacy Policy](https://www.openrush.com/privacy).
