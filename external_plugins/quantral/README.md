# Quantral plugin for Grok Build

Connect Grok Build to [Quantral](https://quantral.com): stock sentiment for US
and Korean stocks. 0-100 signal scores from tracked X, Reddit, Substack and
Naver accounts plus Congress trades and insider buys, the posts behind each
score, monthly recaps, and rule-based model portfolios tracked against the
S&P 500.

The score measures sentiment, not a price prediction. Strategies are tracked
lists, not recommendations.

## Installation

In Grok Build, open `/plugin`, search for **Quantral**, and install.

On first connection, Grok opens Quantral sign-in in the browser. A Quantral
account with an active subscription is required (free trial in the app). Do
not paste tokens into chat. Setup guide: https://app.quantral.com/connect

## Tools

All 8 tools are read-only:

- `get_top_signals`
- `search_companies`
- `get_company_score`
- `get_company_recaps`
- `get_company_signals`
- `list_strategies`
- `get_strategy`
- `get_strategy_changes`

## Authentication

The plugin connects only to `https://app.quantral.com/api/mcp`. Authentication
is OAuth 2.0 with dynamic client registration against that host.

Network endpoints:

- `https://app.quantral.com/api/mcp`: hosted MCP (streamable HTTP)
- `https://app.quantral.com/api/auth/mcp/authorize`, `/token`, `/register`: OAuth 2.0 + DCR

Credentials: a Quantral account. No API key is stored in the plugin.

Docs: https://quantral.com/mcp

## License

Proprietary. Use of the hosted MCP is governed by Quantral's terms.
