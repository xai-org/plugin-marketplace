# Woodstock MCP

Connect to [Woodstock](https://woodstock.co), the Japanese stock-trading service for buying US stocks in JPY (fractional shares supported), over the Model Context Protocol.

This plugin configures the hosted Woodstock MCP server at `https://mcp.app.woodstock.co/mcp` (streamable HTTP). On first use you authenticate with your Woodstock account via OAuth; no API keys are required.

## What you can do

- **Account & funds** — account info, deposit/withdraw history, withdrawal availability, virtual bank details for deposits, estimated US wallet balance. All monetary values are JPY-denominated.
- **Portfolio** — held assets, individual positions by ticker, dividend history.
- **Orders & trading** — list and inspect orders, pre-check and place market/limit orders (by quantity or notional amount), cancel orders, view executions.
- **Market data** — US market status and holidays, real-time quotes/trades/snapshots, historical bars, previous close, tradable-symbol checks, and company fundamentals.

## Notes

- A Woodstock account is required. Trading tools operate on your real account — pre-check tools (`check_order`, `check_cancel_order`) let an agent validate before committing.
- All monetary fields are JPY even for US-stock data; tool descriptions call this out explicitly.

## Links

- Homepage: https://woodstock.co
