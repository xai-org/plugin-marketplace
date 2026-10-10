# TradieBridge plugin

Connects Cursor, Grok Build and Claude Code to [TradieBridge](https://tradiebridge.com): a backup a
trade business owns of its Simpro, Xero, Deputy, Verizon Connect, The Fleet Office and Moveware
records. Ask about jobs, quotes, invoices, payments, customers, timesheets, rosters, vehicles, trips
and removal jobs, answered from your own copy.

## What it ships

| Component | Path | Purpose |
| --- | --- | --- |
| MCP server | `mcp.json` (Cursor), `.mcp.json` (Grok Build, Claude Code) | TradieBridge's hosted server at `https://app.tradiebridge.com/mcp` |
| Skill | `skills/tradiebridge/SKILL.md` | Which tool to call for which question |

No hooks, commands, scripts or local code.

## Install

- **Cursor:** Cursor Settings → Plugins, search **TradieBridge**, then Install.
- **Grok Build:** `/plugin install tradiebridge` from the xAI marketplace.
- **Claude Code:** `/plugin marketplace add tradiebridge/tradiebridge-plugin`, then
  `/plugin install tradiebridge@tradiebridge`.

The first tool call opens a TradieBridge sign-in in your browser (OAuth). There is no API key to paste.

## Before you connect

You need a TradieBridge account with at least one source connected. Sign up at
[app.tradiebridge.com](https://app.tradiebridge.com). A$49 + GST a month, with a 7-day trial.

## Tools

| Tool | What it does |
| --- | --- |
| `whoami` | The signed-in user and company |
| `list_connections` | The company's builds, one per source, with sync health |
| `discover_questions`, `ask_question` | Common questions answered in one call on the server |
| `describe_resources` | What a build holds, and the columns to filter and group by |
| `search_records`, `summarize_records`, `get_record` | Find, total and read records as the source sent them |
| `discover_operations`, `call_read_operation`, `call_write_operation` | Every other screen and action in the app, such as a sync or an export |
| `send_feedback` | Send an idea or a problem to the TradieBridge team |

The server is the source of truth for tool names and schemas.

## Network and credentials

- The plugin calls one endpoint: `https://app.tradiebridge.com/mcp`, with OAuth discovery at
  `https://app.tradiebridge.com/.well-known/oauth-protected-resource`.
- The plugin stores no credential. Your MCP client keeps the OAuth token.
- TradieBridge never writes to Simpro, Xero or any other source. Agents never receive tax file
  numbers, bank details or birth dates.
- Every tool call is recorded for 90 days. See the [privacy policy](https://tradiebridge.com/privacy)
  and [terms](https://tradiebridge.com/terms).

## Support

hello@tradiebridge.com · [Docs](https://docs.tradiebridge.com)

## License

MIT
