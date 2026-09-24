# 6zzzzzz plugin for Grok Build

Connect Grok Build to [6zzzzzz](https://6zzzzzz.com), a domain availability
search backed by ICANN zone files. Check hundreds of candidate names in one
call.

## Installation

In Grok Build, open `/plugin`, search for **6zzzzzz**, and install. There is
no sign-in and no API key.

## What it provides

- **MCP server** (`.mcp.json`): the hosted server at `https://6zzzzzz.com/mcp`
  (Streamable HTTP). Two read-only tools:
  - `check_domains` — up to 500 domains or bare names per call.
  - `search_domain` — one name across popular TLDs, plus free variations.
- **Skill** (`skills/6zzzzzz`): tells the agent to batch lookups and how to
  read the results.

No hooks, commands, scripts or local code.

## Network endpoints and credentials

- `https://6zzzzzz.com/mcp` — the only endpoint. Receives the domain names
  the agent asks about and nothing else.

No credentials are required, and nothing is read from the user's machine.

Results for available domains include a register link of the form
`https://6zzzzzz.com/go/<domain>`. It redirects to an affiliate link (via
Commission Junction) for a registrar's search page for that domain. The skill
asks the agent to show these links to the user and to say they are affiliate
links.

## License

MIT. Use of the hosted service is subject to https://6zzzzzz.com.
