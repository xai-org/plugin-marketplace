# Eggtimer.app

Hosted MCP server for [Eggtimer.app](https://eggtimer.app), published by Gotoh Industries LLC. This plugin contains only an MCP configuration pointing at the hosted endpoint: no code runs on your machine, no hooks, no scripts, no skills.

## What it does

Seven read-only tools validate a timed plan and return a shareable `eggtimer.app` link: countdowns (`create_timer`), local clock times (`create_clock_link`), multi-step recipes (`create_recipe`), presets such as Pomodoro, Tabata and 52/17 (`list_presets`, `get_preset`), plus `get_capabilities` and `get_integrations`. Creating a link never starts a timer; the countdown starts when someone opens the link in a browser.

## Network and credentials

- Endpoint: `https://eggtimer.app/api/mcp` (Streamable HTTP, JSON responses).
- Credentials: none. No account, API key or OAuth.
- Data sent: only the timer parameters you ask for (durations, labels, step lists).

## Links

- Docs: https://eggtimer.app/ai.html
- Public docs repo: https://github.com/KhyKd/eggtimer_app_docs
- Official MCP Registry: `app.eggtimer/eggtimer`
- Privacy: https://eggtimer.app/privacy · Terms: https://eggtimer.app/terms · Support: support@eggtimer.app

## License

MIT, see `LICENSE`. The hosted service is governed by the Eggtimer.app Terms.
