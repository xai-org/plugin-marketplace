---
name: mugpipe-signals
description: Use when the user asks about their website's Google Search Console or GA4 performance (clicks, impressions, CTR, rankings, traffic) and the Mugpipe Signals MCP is connected.
---

# Mugpipe Signals

1. Call `signals_account_status`. If Google is not connected, call `signals_connect_google` and show the user `consentUrl` (stay in chat).
2. If no site is saved, call `signals_list_properties`, let the user name the Search Console site (and GA4 property) in plain language, then call `signals_select_properties`.
3. For "how is my site doing", call `signals_weekly_report`. For growth ideas, call `signals_ctr_opportunities` or `signals_striking_distance`. Use `signals_compare_periods`, `signals_top_movers`, `signals_query_explorer`, `signals_landing_page_check`, `signals_page_deep_dive`, `signals_traffic_sources`, `signals_index_health`, or `signals_ga4_report_explorer` when those match the ask.
4. Quote real numbers from the tool output with the date range. Never invent metrics.
5. If a tool returns an auth or trial/billing error, tell the user to reconnect Google or visit https://mugpipe.com/plans (informational only — do not start checkout inside the AI).
