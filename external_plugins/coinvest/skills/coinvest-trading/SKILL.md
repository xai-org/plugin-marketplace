---
name: coinvest-trading
description: >-
  Execute and manage trades on Liquid through the Coinvest MCP. Use when the
  user wants to buy, sell, long, short, size, or close a position on Liquid,
  set take-profit / stop-loss, change leverage, cancel orders, deposit or
  fund their account, try paper trading, or set up bounded automated trading.
  Requires the user to have authenticated with Liquid via the Coinvest MCP.
---

# Coinvest — Trading

Coinvest executes on the user's own non-custodial Liquid account. The tools below are state-changing: they place real orders unless paper trading is enabled. Treat them accordingly.

## Preflight

Before the first trade in a session:

1. `get_portfolio` — confirm available margin and existing exposure.
2. If the tool reports the account is not ready, follow its instruction: `enable_trading` (one-time account activation) or `show_deposit` / `generate_deposit_address` / `create_onramp_session` to fund. Do not retry `execute_order` until readiness is confirmed.
3. If the user is exploring or unfunded, offer `enable_paper_trading` so they can run the full flow on a simulated venue.

## Placing orders

| Intent | Tool | Required inputs |
|---|---|---|
| Single order | `execute_order` | `symbol`, `side` (`buy` opens/adds a long, `sell` a short), `leverage`, notional USD `size` (= collateral × leverage); optional `type` (`market` default or `limit` + `price`), `tp`, `sl` |
| Basket (1-8 legs) | `execute_orders_batch` | Same fields per leg; returns per-order results |
| Add or change TP/SL | `execute_tpsl` | `symbol`, `tp` and/or `sl` trigger prices |
| Close | `close_position` | `symbol`; optional partial `size` |
| Change leverage | `update_leverage` | `asset`, `targetLeverage` — validates margin before applying |
| Cancel resting order | `cancel_order` | `order_id` from `view_open_orders` |

Rules of thumb:

- **Resolve the market first.** Use `search_markets` to get the exact Liquid symbol (e.g. `BTC`, `xyz:GOLD`, `io:OAI`) before executing.
- **Confirm intent once, then act.** Restate symbol, direction, notional, leverage, and any TP/SL in one line and execute when the user confirms. Do not ask repeatedly.
- **Default to conservative sizing.** If the user gives no size or leverage, propose a small notional at low leverage and ask, rather than guessing large.
- **Always surface the receipt.** Return the fill / order id, average price, and resulting position exactly as the tool reports them.
- **Never fabricate fills.** If the tool returns an error or rejection (insufficient margin, market closed, min notional), relay it verbatim and offer the fix.

## Paper trading

- `enable_paper_trading` reroutes every trading, account, and venue read to Liquid's simulated venue for the current wallet; no real funds move.
- `paper_trading_status` reports which mode is active; `reset_paper_account` restores the simulated balance; `disable_paper_trading` returns to live.
- Tool responses include a notice while paper mode is on. Repeat that the trade is simulated in your reply.

## Automated trading (bounded autonomy)

`enable_automated_trading` lets the assistant execute repeatedly without per-trade approval, but only inside explicit bounds the user sets:

- Only call it when the user explicitly states the maximum notional per automated order (`maxOrderNotional`). `expiresInMinutes` defaults to 7 days and cannot exceed it; batch notional is derived from the per-order cap.
- Capture the user's other constraints (max leverage, stop-loss requirement, asset allow-list, daily budget) in the conversation and honour them on every order — the server enforces the notional and expiry policy on each `execute_order` / `execute_orders_batch`.
- Check `automated_trading_status` before autonomous orders; if the server blocks a trade as out-of-policy, report the block and either adjust within bounds or stop.
- `disable_automated_trading` ends the mandate immediately. Never widen bounds without the user asking.

## Safety expectations

- Leverage amplifies losses; when a user requests high leverage, state the liquidation distance from the analysis before executing.
- Do not execute on behalf of the user based on a hypothetical ("what if I bought…") — analyze instead, and ask if they want to place it.
- Coinvest provides analysis and executes instructions; it is not personalised financial advice.
