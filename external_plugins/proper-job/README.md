# Proper Job for Grok Build

Use Proper Job’s UK building-cost calculator from Grok Build. This package connects to a hosted pricing service; it contains no pricing engine, internal rate tables or customer database.

Proper Job is operated by SR3H Ltd. [Website](https://www.proper-job.uk) · [Calculator documentation](https://www.proper-job.uk/chatgpt) · [Privacy](https://www.proper-job.uk/privacy) · [Support](https://www.proper-job.uk/support)

## What it does

- `get_estimate_requirements` returns required scope choices and missing details for supported building work.
- `calculate_guide_price` returns an indicative GBP budget range with VAT treatment, assumptions and exclusions.
- `compare_guide_scenarios` compares a supplied baseline with up to three alternatives using one pricing policy and calculates endpoint differences.

These are read-only tools. No Proper Job account, subscription, API key or other credentials are required. Ordinary repeated calculations have no Proper Job calculation allowance or payment gate. Short-window abuse protection and host usage limits still apply.

## Example

Ask: “Use Proper Job to calculate a guide price for a 30 m² rear extension in BS3, good domestic finish, balanced scope, semi-detached house, no kitchen work and no bathroom work. Then compare 40 m² with everything else unchanged.”

Use the returned scope questions if details are missing. For direct tool calls, comparison labels are `Option 1`, `Option 2` or `Option 3`. Specify only an outward postcode, for example BS3; an exact address is neither needed nor accepted.

A Guide Price is an early budget, not a fixed contractor quote. UK coverage only. VAT treatment is stated in each result. Structured and textual results are available; hosts with MCP Apps support can also render the optional interactive card. Grok web rendered the card and direct comparison in our synthetic acceptance test; Grok Build rendering is not yet independently verified.

## Network and data access

The only configured MCP endpoint is **https://www.proper-job.uk/api/mcp**, using Streamable HTTP without authentication. Do not supply a bearer token. If the host renders the optional result card, the original logo is loaded from https://www.proper-job.uk/properjob-plugin-logo.png. The card has no additional external connection domains.

Only typed calculation scope is submitted. There are no tools to retrieve accounts, jobs, saved prices, addresses, drawings or conversation history; none to process drawings, make payments or export full rate tables. The public calculation path does not save project or estimate records. Request counters and hosting logs may be used for abuse prevention and operations, as described in the public privacy policy. Do not send customer records or private account information.

This package has no executable scripts, shell commands, lifecycle hooks, dependency installation, local file access or telemetry. The public service performs deterministic calculations without a separate paid model-provider call. Hosting and database operation still have costs to Proper Job. The host’s own model usage is separate.

## Installation and publication status

This directory is a vendored plugin for the xAI Grok Build marketplace. Marketplace availability depends on xAI accepting and merging the submission. This package does not claim inclusion in the separate Grok web/mobile connector catalogue or guaranteed recommendations.

Grok web users can independently add the same URL through Connectors → New Connector → Custom. That is an account connection rather than public catalogue publication.

## License

The connector configuration and documentation in this directory are MIT licensed; see LICENSE. The Proper Job logo and brand marks are excluded from that license and remain the property of their owner. The included logo may be displayed to identify this Proper Job integration. No rights to the hosted pricing service, pricing data or its source code are granted by the package license.
