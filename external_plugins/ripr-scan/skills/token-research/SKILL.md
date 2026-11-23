---
name: token-research
description: Research a Solana token with Ripr Scan. Use when the user asks about a Solana token's price, liquidity, holders, launch, creator, or risk, or gives a Solana mint address and wants to know more about it.
---

To research a Solana token:

1. If the user gave a name or symbol, call `search` and confirm the mint when several tokens match. If they gave a mint address, use it directly.
2. Call `token_overview` for the market summary.
3. For risk, call `rug_radar` and `warnings`. Add `holders`, `snipers`, `insiders`, `bundles`, or `wash` when the user asks about those topics or when the summary suggests they matter.
4. For price history, call `price_ohlc` with the interval and window the user asked for. For past holdings or balances, use `holders_as_of`, `token_balance_as_of`, or `sol_balance_as_of`.
5. Prefer these purpose-built tools. Use `run_sql` only when none of them answers the question, and call `list_tables` and `describe_table` first.

Report what the tools returned, and name the mint. If a tool returns `available: false` or an out-of-range result, say the data is unavailable and do not estimate it. Risk signals are indicators, so describe them as such. The output is informational and is not financial advice. These tools cannot trade or move funds, so tell the user that if they ask for a transaction.
