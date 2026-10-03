# Chashmalink plugin for Grok

Connect Grok to [Chashmalink](https://www.chashmalink.com) (חשמלינק), which answers
questions about Israeli household electricity from measured smart-meter data
rather than estimates off a bill.

Behind it sits an analysed corpus of more than 20,000 Israeli households across
500+ municipalities, each a full hourly export from the Israel Electric
Corporation (IEC).

## What it does

- **Plan comparison** — ranks every electricity plan on the Israeli market by
  what it saves a specific household per year, from a monthly kWh figure, a
  24-hour curve, or the household's own IEC consumption file.
- **Your own IEC file** — reads the hourly CSV downloaded from the IEC website
  (pasted, or uploaded on a one-time Chashmalink page) into a consumption
  profile that the comparison, solar and classification tools can use.
- **Rooftop solar** — compares Israel's two exclusive solar tracks (net
  metering vs feed-in tariff) against a real load shape, with payback.
- **Consumption profile** — evening, night, morning, weekend or balanced, with
  a night-shift opportunity figure.
- **Published statistics** — city benchmarks and the national hourly load curve.
- **Running costs** — appliances, air-conditioner sizing, EV vs petrol.
- **Reference** — supplier directory, how to export IEC data, the supplier
  switch process, smart-meter availability at an address.

The live tool list and schemas are documented at
<https://www.chashmalink.com/mcp>. Figures are in shekels (₪) and kWh.

## Installation

In Grok Build, run `/marketplace` (or `grok plugin install chashmalink`). In
Grokbot, open **Marketplace** in the sidebar and install **Chashmalink**.

No sign-in, account or API key is needed.

## Network endpoints

- `https://www.chashmalink.com/api/mcp` — the hosted MCP server (Streamable
  HTTP). Stateless, unauthenticated and read-only. This is the only endpoint
  the plugin connects to.
- Links returned in tool results point to pages on `https://www.chashmalink.com`
  (a one-time file-upload page, plan recommendation pages, `/onboarding`). They
  open only if the user follows them.

The plugin ships no code, hooks, skills or scripts — only the MCP server
configuration in `.mcp.json`.

## Credentials

None. The plugin reads no local files, environment variables or tokens.

## Limits

Published at <https://www.chashmalink.com/mcp>: 30 calls per minute and 300
tool calls per hour per IP address, plus a global hourly cap. Over the limit
the server answers HTTP 429 with `Retry-After`.

## Privacy

Calls are logged (tool name, timing, client name and version, IP) for rate
limiting and abuse prevention; address fields in the smart-meter lookup are
redacted from the log. When a consumption file is analysed, personal details in
it (name, address, meter number) are discarded; only hour-of-day and monthly
summaries are kept, for 30 days, under a random id, and can be deleted at any
time with `delete_consumption_profile`. Adding readings to anonymous national
statistics is opt-in only. Published population figures require at least 25
households behind them.

Full policy: <https://www.chashmalink.com/privacy>.

## Transparency

Plans are ranked by computed saving only. Chashmalink may earn a fee from some
suppliers; each plan says so, and it never affects the order. Nothing is bought
in the chat.

## Support

<https://www.chashmalink.com/support> · hello@chashmalink.com

## License

Proprietary. Use of the hosted service is governed by the Chashmalink terms of
use: <https://www.chashmalink.com/terms>.
