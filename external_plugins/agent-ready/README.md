# Agent Ready plugin for Grok Build

[Agent Ready](https://agent-ready.dev) scans a public website and reports how readable it is to AI agents and AI search: a 0–100 score against the [Vercel Agent Readability Spec](https://agent-ready.dev/methodology), an [llms.txt](https://llmstxt.org) sub-score, an accessibility sub-score, and 72 individual checks, each with a plain-English fix.

This plugin connects Grok Build to the hosted Agent Ready MCP server and adds a skill that tells Grok when to use it and how to summarise the results.

## What's included

| Component | Path | Purpose |
|---|---|---|
| MCP server | `.mcp.json` | Hosted Agent Ready MCP server (streamable HTTP) |
| Skill | `skills/agent-ready/SKILL.md` | When to scan, which tool to call, how to report findings |

### MCP tools

| Tool | What it does |
|---|---|
| `scan_site` | Scans a public URL (up to 5 pages) and returns scores plus per-check results with fixes |
| `get_scan` | Fetches a scan by id, for a scan that was still running |
| `ask` | Searches Agent Ready's own docs: scoring methodology, check registry, specs, glossary |

Prompts: `scan`, `interpret_scan`, `remediation_plan`.

## Install

```
grok plugin install agent-ready --trust
```

Or type `/marketplace` in Grok Build and press `i` on Agent Ready.

## Network access and credentials

- **Endpoint:** `https://agent-ready.dev/api/apps/mcp`, the only host the plugin talks to.
- **Credentials:** none. The endpoint needs no API key or sign-in.
- **What's sent:** the URL you ask to scan, or your `ask` query. Agent Ready then fetches that public URL from its own servers. Private, local, and reserved addresses are refused.
- **Limits:** scans cover up to 5 pages. A shared rate limit applies; if it's hit, the tool returns a `rate_limited` error and you can retry shortly. For deeper scans (up to 250 pages), use the REST API or the [`agent-ready-mcp`](https://github.com/mlava/agent-ready-mcp) package with a Pro key.
- **No local code execution:** the plugin ships no hooks, scripts, or binaries.

Privacy policy: <https://agent-ready.dev/privacy>

## Links

- Homepage: <https://agent-ready.dev>
- Methodology: <https://agent-ready.dev/methodology>
- MCP server card: <https://agent-ready.dev/.well-known/mcp/server-card.json>
- Support: support@agent-ready.dev

## License

MIT. See [LICENSE](LICENSE).
