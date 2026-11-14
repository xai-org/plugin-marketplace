# Scrapewise plugin for Grok Build

Clean, matched, AI-ready product data from any website, served by the hosted
[Scrapewise](https://scrapewise.ai) MCP server. Your agent can read clean product and price data
from any shop or from Amazon, see the same product matched across shops, search Google and Amazon,
fetch web pages, read the rows saved in your account and, with a Full key, build and run scrapers.

## Installation

In Grok Build, open `/plugin`, search for **Scrapewise**, and install.

## API key

Sign up at [scrapewise.ai](https://scrapewise.ai), then create a key under **Settings > API Keys**.
Set it in the environment Grok Build runs in, so it never goes into chat or a file:

```bash
export SCRAPEWISE_API_KEY=<your key>
```

- A **Read key** can read your groups, scrapers, runs and saved rows. It cannot spend credits or
  change anything.
- A **Full key** can also run the paid data tools and build, run and change scrapers.

## What you get

- **MCP server** `scrapewise` at `https://mcp.scrapewise.ai/mcp` (Streamable HTTP).
- Auth: `Authorization: Bearer ${SCRAPEWISE_API_KEY}`, read from your environment.

## Network and credentials

- Calls `https://mcp.scrapewise.ai/mcp` only.
- Needs one credential, your Scrapewise API key, sent as a Bearer header to that endpoint.

## Links

- Source and per-client setup: https://github.com/BEBOTECH-OU/scrapewise-mcp
- Docs: https://scrapewise.ai/mcp
- License: MIT
