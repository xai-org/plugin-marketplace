---
name: knowngood
description: >-
  Find websites where an agent can actually do a task, and check what a given site
  supports for agents, through the Known Good MCP server: search the probe-verified
  index (find_capability), fetch one host's dated verification report
  (get_site_report), or check a site live for WebMCP tools (check_webmcp). Use
  when the user asks which sites an agent can use for something, whether a
  specific site is agent-ready (MCP server, markdown for agents, llms.txt, API
  catalog, WebMCP), or mentions Known Good or knowngood.sh.
---

# Known Good

Known Good is a directory of websites that agents can use. The `knowngood` MCP
server bundled with this plugin is read-only and needs no sign-in. Probe-verified,
a date on every check, and placement is never for sale.

**How a site gets listed.** A site is listed when at least two of its agent-facing signals are present and at least one of them is strong: an MCP endpoint that returns its tool list, markdown served on request or at a markdown URL, or an API catalogue or MCP server card at its well-known path. An `llms.txt` counts as a second signal and never lists a site by itself.
The full rubric, the current figures and the changelog are
at https://knowngood.sh/benchmark. Take figures from there, not from memory.

## Choosing a tool

| The user wants to | Use |
|---|---|
| Find sites where an agent can do something | `find_capability` |
| Know whether one specific host is agent-ready, and on what evidence | `get_site_report` |
| Check a site that may not be in the index for in-page WebMCP tools, right now | `check_webmcp` |

### find_capability: search the index

Pass `query` as the task in plain language: "buy perfume", "book scuba diving",
"currency conversion API", "seo agency". Narrow it with filters:

- `country`: ISO 3166-1 alpha-2, e.g. `GB`.
- `entity_type`: one of business, ecommerce, saas, documentation, media, blog,
  government, education, nonprofit, personal, community, directory, tool, other.
- `transactional: true`: only sites where an agent can act, not just read.
- `has_mcp: true`: only sites whose MCP server answered `tools/list` when tested.
  The results include the tool names.
- `has_md: true`: only sites with verified markdown for agents.
- `has_endpoint: true`: only sites with a working MCP server or API catalog.
- `has_webmcp: true`: only sites whose WebMCP tools registered when the page ran
  in a browser.
- `limit`: default 10, at most 25.

`query` may be omitted when at least one filter is set. The tool then lists every
matching site in a fixed order, with `total`. Example question shapes:

- "Which UK shops can an agent check out on?" →
  `country: "GB", entity_type: "ecommerce", transactional: true`
- "Find documentation sites with an MCP server for payments." →
  `query: "payments API documentation", has_mcp: true`
- "Any SaaS tools that serve markdown to agents?" →
  `entity_type: "saas", has_md: true`

`count: 0` with an `empty_note` means nothing in the index matches. Report that
plainly. The tool never returns a nearest guess, so do not present one.

### get_site_report: one host's evidence

Pass `host`: a hostname or URL, e.g. `developers.cloudflare.com`. The report
covers:

- which checks were run, which passed, and the date of each;
- what an agent can apparently do on the site;
- how the site was found: it declared agent access, the probe discovered it, or
  it was submitted.

Cite the report URL and its date when you answer. `found: false` means the host is
not in the index. It is not a verdict that the site is not agent-ready. Offer
`check_webmcp` or the submission page at https://knowngood.sh/submit instead.

### check_webmcp: a live check

Pass `url`: a hostname or full URL. The tool fetches that one site now and returns
one of these states:

- `registered`
- `declared_only`
- `declared`
- `not_declared`
- `could_not_ask`
- `excluded`: the site's robots.txt refuses AI input.

`could_not_ask` means the check could not be completed. Never report it as a
"no". Tools are listed, never called, and the check does not change the index.

## Answering well

- Separate verified from apparent. Probe-verified signals carry dates. "Apparent
  actions" are read from page content and are not verified. Say which is which.
- Quote dates. A check is as of its date. If it matters, offer
  `get_site_report` for the latest record.
- Do not state index-wide counts from memory. Link https://knowngood.sh/benchmark.
- Keyless use has a daily limit. If a call returns a rate-limit error, tell the user
  that a free key is available (https://knowngood.sh/auth.md) rather than retrying
  in a loop.
