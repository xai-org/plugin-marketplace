# Coinvest

**Coinvest** is Liquid's multi-asset trading analyst, delivered as a hosted MCP server plus agent skills. It gives Grok Build the same analysis-to-execution loop that powers [Liquid](https://www.liquid.trade): read live market data across crypto, equities, commodities, and indices; layer on proprietary positioning analytics (whale cohorts, liquidation clusters, funding divergence, top-trader exposure) and news catalysts; then place, manage, and close trades on the user's own non-custodial Liquid account.

- **Hosted MCP server:** `https://coinvest.liquid.trade/mcp` (Streamable HTTP, OAuth 2.1)
- **Homepage:** https://coinvest.liquid.trade
- **Source:** https://github.com/LiquidMax-dev/coinvest-computer
- **License:** MIT (see [LICENSE](LICENSE))

## What's included

| Component | Path | Purpose |
|---|---|---|
| MCP server | `.mcp.json` | Remote `coinvest` server — market data, positioning analytics, news, portfolio, and trading tools |
| Skill | `skills/coinvest` | When and how to use Coinvest: market analysis, discovery, portfolio review, `/markets` picks |
| Skill | `skills/coinvest-trading` | Order execution, TP/SL, leverage, paper trading, and the guardrails around bounded automated trading |

## Authentication

The server is protected with standard OAuth 2.1 bearer auth. On first use, the MCP client is redirected to Liquid to sign in (or create an account) and approve the `read` and `trade` scopes. Protected-resource metadata is published at `https://coinvest.liquid.trade/.well-known/oauth-protected-resource`.

- No API keys, tokens, or environment variables are read from the user's machine.
- Tokens are held by the MCP client, never written by this plugin.
- Liquid is non-custodial: trading tools act on the account the user authenticated; Coinvest never holds funds.

## Tools (summary)

**Know — analysis and data**
`analyze_market`, `analyze_markets_batch`, `search_markets`, `get_news`, `get_positioning_pulse`, `get_technical_indicators`, `upcoming_earnings`, `get_portfolio`, `view_open_orders`, `plan_portfolio`, `refer`

**Do — actions on the authenticated account**
`execute_order`, `execute_orders_batch`, `execute_tpsl`, `close_position`, `update_leverage`, `cancel_order`, `enable_trading`, `show_deposit`, `generate_deposit_address`, `create_onramp_session`

**Show — explicit views (only when the user asks)**
`show_chart`, `show_orderbook`, `show_market_overview`, `show_portfolio_chart`, `market_picks`

**Modes**
`enable_paper_trading` / `disable_paper_trading` / `paper_trading_status` / `reset_paper_account` (simulated venue, no real funds) and `enable_automated_trading` / `disable_automated_trading` / `automated_trading_status` (bounded autonomous execution with a user-set per-order notional cap and expiry, server-checked on every order).

Market data, positioning, and news tools work as soon as the user is signed in. Trading tools additionally require a funded Liquid account; the server runs a readiness preflight and returns a clear next step (deposit, enable trading) instead of failing silently.

## Network endpoints

All calls originate from the hosted server, not the user's machine:

| Endpoint | Purpose |
|---|---|
| `https://coinvest.liquid.trade` | The MCP server itself (OAuth metadata, `/mcp`) |
| `https://api-public.liquidmax.xyz` | Liquid authenticated account + trading API (OAuth issuer) |
| `https://api.liquidmax.xyz` | Liquid positioning analytics |
| `https://paper-api.liquidmax.xyz` | Paper-trading venue (only when paper mode is enabled) |
| Hyperliquid `/info` (via Liquid's market-feed proxy) | Public market data — prices, funding, open interest, order books, candles |
| Google News RSS | Headline cross-referencing for `get_news` and `market_picks` |

The plugin ships no hooks, no commands, no scripts, and no local executables.

## Support

Questions or issues: open an issue on [LiquidMax-dev/coinvest-computer](https://github.com/LiquidMax-dev/coinvest-computer) or reach the team via https://www.liquid.trade.

Trading involves risk. Coinvest surfaces analysis and executes the user's instructions; it does not provide personalised financial advice.
