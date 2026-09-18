# EqCheck plugin for Grok Build

EqCheck is an emotional-intelligence translator for written communication. It
reads how a draft lands before you send it, and plans a rewrite toward the tone
you want.

## What it does

The plugin connects Grok Build to the hosted EqCheck MCP server, which exposes
two tools:

- **check** reads a draft across six communication signals (directness, warmth,
  clarity, pressure, respect for boundaries, ambiguity) and reports how each may
  land, plus a scan for AI tells, unfilled placeholders, and grammar or typo
  slips. It describes the draft, it does not grade it.
- **rewrite** returns a plan your assistant applies to reshape a draft toward a
  target tone while preserving its meaning, ask, boundaries, and placeholders.
  Pass a target persona or directional adjustments (for example, decrease
  pressure) and your assistant writes the final text from the plan.

Useful for a support reply, a follow-up, or any message you want to land right
before it goes out.

## Installation

In Grok Build, open `/plugin`, search for **EqCheck**, and install.

## Authentication

None. The server is open and stateless per call. There is no API key, no sign-in,
and no token to paste into chat.

## Network endpoints

The plugin connects only to `https://eqcheck.app/mcp`, the hosted MCP server over
streamable HTTP. No other host is contacted, and nothing you send is retained
between calls.

## License

Proprietary. Use of the hosted MCP is governed by EqCheck's
[terms](https://eqcheck.app/terms) and [privacy policy](https://eqcheck.app/privacy).
