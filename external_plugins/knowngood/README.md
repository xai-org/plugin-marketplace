# Known Good plugin for Grok Build

Connect Grok Build to [Known Good](https://knowngood.sh), a directory of websites that
agents can use. Every capability in it is probe-verified and dated, and placement
cannot be bought.

## Installation

In Grok Build, open `/plugin`, search for **Known Good**, and install. There is no
sign-in and no API key.

## What you get

- **MCP server** `knowngood` at `https://knowngood.sh/mcp` (Streamable HTTP, no auth).
- **Skill** `knowngood`: when to use each tool, the filters, how a site gets
  listed, and how to report results honestly. Empty results and "could not ask"
  answers are reported as what they are.

### Tools

All three tools only read. None writes, deletes or calls anything on a third-party site.

| Tool | What it does |
|---|---|
| `find_capability` | Search the index for sites where an agent can do a task, with filters for country, site type, transactional sites, MCP, markdown, endpoints and WebMCP. |
| `get_site_report` | One host's dated verification report: the checks run, the checks passed, the probe dates and how the site was found. |
| `check_webmcp` | A live check of one named site for in-page WebMCP tools. The tools are listed, never called. |

## Example prompts

- "Which UK shops can an agent check out on?"
- "Is developers.cloudflare.com agent-ready? Show the evidence."
- "Find documentation sites with an MCP server for payments."
- "Does example.com register any WebMCP tools?"

## Network and credentials

The MCP server is `https://knowngood.sh/mcp`; the plugin connects to nothing else.
`check_webmcp` asks that server to fetch the one site you name. It does not
fetch the site from your machine.

Credentials: none. Keyless use has a daily limit, and a free key is available
(see https://knowngood.sh/auth.md). The plugin stores no key and requests no
filesystem or shell access.

The rubric, the current figures and the changelog are at
https://knowngood.sh/benchmark.

## License

MIT for the files in this plugin. Use of the hosted service is governed by the
[Known Good terms](https://knowngood.sh/terms) and
[privacy policy](https://knowngood.sh/privacy).
