# SunSeekr plugin for Grok Build

Connect Grok to [SunSeekr](https://www.sunseekr.com), the sunshine map for pubs, cafés,
restaurants and rooftops. Ask where the sun is and get venues in direct sun, hour by hour.

## Installation

In Grok Build, open `/marketplace`, search for **SunSeekr**, and install.

On first connection, Grok opens the SunSeekr sign-in in your browser. Sign in (or create
a free account) and allow access. No API key is needed.

## What you get

- **MCP server** `sunseekr` at `https://mcp.sunseekr.com/mcp` (Streamable HTTP, OAuth 2.1
  with dynamic client registration and PKCE).
- **Skill** `sunseekr`: when to use which tool, and the rules for covered cities and weather.

### Tools

| Area | Tools |
|---|---|
| Sun near a place | `find_sunny_spots`, `golden_hour`, `whats_trending` |
| Sun at specific places | `sun_check`, `get_venue_sun`, `search_venues` |
| Coverage | `list_cities` |
| Your account | `my_saved_spots`, `save_spot`, `join_plus_waitlist` |

All tools are read-only except `save_spot` (adds a saved spot) and `join_plus_waitlist`.

## Example prompts

- "Find me a sunny pub garden near Farringdon, London right now"
- "Which of these will be in the sun at 1pm: The Fence, Double Standard, The Rake?"
- "Where near Shoreditch can I catch the last of the sun this evening?"
- "Which of my saved SunSeekr spots will be sunny this afternoon?"

## Coverage

London, Paris, Berlin, Amsterdam, Hamburg, Munich, Copenhagen, Cologne, Bristol and
Manchester. Elsewhere the tools say the place isn't covered yet.

## Network and credentials

- Calls one endpoint: `https://mcp.sunseekr.com/mcp` (SunSeekr's hosted MCP server), plus the
  SunSeekr OAuth sign-in at `https://www.sunseekr.com` on first connect.
- Credentials: a SunSeekr account, authorized through OAuth in the browser. No API keys, no local
  files, no environment variables, no hooks, no scripts.

## Privacy and support

SunSeekr only receives the requests Grok sends, never your conversation.
Privacy: https://www.sunseekr.com/privacy · Terms: https://www.sunseekr.com/terms ·
Support: support@sunseekr.com · Docs: https://www.sunseekr.com/mcp

## License

The files in this plugin are MIT-licensed. The SunSeekr service is provided under its terms of use.
