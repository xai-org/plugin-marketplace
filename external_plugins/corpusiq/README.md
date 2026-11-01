# CorpusIQ plugin for Grok Build

Connect Grok Build to [CorpusIQ](https://www.corpusiq.io), the AI intelligence layer for business data.
Ask one question in plain English and get an answer assembled from the business systems you have
already connected, with the source record cited behind each number.

## Installation

In Grok Build, open `/plugin`, search for **CorpusIQ**, and install.

On first connection, Grok opens the CorpusIQ sign-in in your browser. Authorize with the account
whose connected systems you want Grok to read. No API key is needed and nothing should be pasted
into chat.

## What you get

- **MCP server** `corpusiq` at `https://mcp2.corpusiq.io/mcp` (Streamable HTTP, OAuth 2.1 with
  dynamic client registration and PKCE).
- **Skill** `corpusiq`: how to use the CorpusIQ tools well (state the period and the grouping, ask
  for the citation rather than only the number, name a missing connector instead of estimating,
  never merge a cited figure with an uncited one).

### Entry points

CorpusIQ exposes a small number of high-level entry points rather than one tool per API call:

| Entry point | Use it for |
|---|---|
| `ask_corpusiq` | A supported read-only question that needs fixed, reproducible execution, including executive financial snapshots |
| `resolve_connector` | A broad cross-source question where the right workflow has to be chosen first |
| `invoke_skill`, `select_runbook`, `list_skills` | Running or browsing the pre-built expert workflows |
| `<system>_connector` mega-tools | A question about one named system: QuickBooks, HubSpot, Shopify, Stripe, GA4, Google Ads, Meta Ads, Klaviyo, Search Console, Slack, Airtable and the rest of the connector set |
| `get_connector_status` | Checking which systems are authorized before you ask |

Each answer carries the system and record it came from, so a figure can be defended later.

## Read-only by design

External-source retrieval tools are read-only. They read from your connected business systems and
do not write back to them. The only tools that accept writes are CorpusIQ control-plane tools, which
are separately named and annotated and change your CorpusIQ configuration (which connectors are
enabled, which preferences apply), never vendor data. Details are documented at
[corpusiq.io/security](https://www.corpusiq.io/security).

## Example prompts

- "Reconcile Google Ads spend against GA4 sessions and Shopify booked revenue for last quarter, and
  tell me where the two disagree."
- "Pipeline in HubSpot versus invoices in QuickBooks this month. Which deals are missing an invoice?"
- "Build the weekly performance report I usually assemble by hand, and cite the source of every line."
- "Which customers are overdue, and which of them have an open support ticket?"

## Documentation

- MCP endpoint, OAuth discovery and device login: [corpusiq.io/developers](https://www.corpusiq.io/developers)
- Connector list and the scopes each one requests: [corpusiq.io/connectors](https://www.corpusiq.io/connectors)
- Machine-readable summary for agents: [corpusiq.io/llms.txt](https://www.corpusiq.io/llms.txt)

## License

The plugin files in this directory (catalog metadata, MCP configuration, skill and README) are
provided under the MIT License. CorpusIQ itself is a hosted service governed by its own terms.
