# Guaca

Connect Grok to [Guaca](https://useguaca.com), your personal finance tracker, and answer money questions from your actual accounts, assets, liabilities, holdings, transactions, recurring payments, savings goals, exchange rates, and retirement plan.

## What this plugin provides

A single remote MCP server (`https://useguaca.com/api/mcp`, Streamable HTTP) with 14 tools:

- **13 read-only tools** (`guaca:read` scope): net worth summary and history, accounts, holdings, assets, liabilities, transaction search, spending by category, categories, exchange rates, retirement projection, recurring payments, and savings goals.
- **1 write tool** (`create_pending_transaction`, separately scoped `guaca:write`): creates a private, reviewable **pending** bookkeeping draft in Guaca. It cannot transfer money, trade, withdraw funds, contact a bank, or change balances. Repeating it creates a duplicate, so its description requires user confirmation and forbids automatic retries.

All tools are private (`openWorldHint: false`), use strict input/output schemas, return bounded structured content, and carry complete `readOnlyHint`/`destructiveHint`/`idempotentHint` annotations.

## Network endpoints and credentials

- The plugin ships no code and runs nothing locally — it only configures the remote MCP server above.
- The only network endpoint called is `https://useguaca.com` (the first-party Guaca API).
- Authentication is OAuth 2.1 with PKCE, handled by the Guaca authorization server at `useguaca.com`. No API keys or tokens are stored in this plugin. Users can disconnect and revoke access at any time from their Guaca account.

## Requirements

An active Guaca account with financial data. Some features require Guaca Pro.

## Example prompts

- "What changed my net worth over the last six months, and how much was investment growth versus debt reduction?"
- "Where did I spend the most in the last 30 days, and how does that compare with my budgets?"
- "List my recurring commitments and tell me how much cash I need before the next payday."
- "Am I on track for retirement under my current assumptions?"

## Support

- Documentation: <https://useguaca.com>
- Contact: <contact@useguaca.com>
- Privacy policy and terms: linked from <https://useguaca.com>

## License

The files in this plugin directory are MIT licensed. The Guaca service itself is a proprietary first-party product operated by Guaca.
