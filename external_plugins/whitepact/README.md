# WhitePact

AI governance MCP server: trust scoring, PII/harmful-content guardrails,
hallucination detection, and compliance checks (NIST AI RMF, EU AI Act,
ISO 42001) for any AI agent's actions or outputs. 27 tools, all
read-only — WhitePact evaluates and reports, it never mutates state.

- Homepage / source: https://github.com/Guruprasath-Annadurai/Whitepact
- License: MIT
- Registry: listed on the official MCP Registry
  (`io.github.Guruprasath-Annadurai/whitepact`)

## What this plugin bundles

- An MCP server config (`.mcp.json`) pointing at WhitePact's hosted
  Streamable HTTP endpoint.
- A skill (`skills/whitepact/SKILL.md`) describing when to reach for
  WhitePact's tools — PII scanning, trust scoring, compliance checks,
  red-teaming, and governance decisions.

## Network endpoints and credentials

This plugin's MCP server calls exactly one endpoint:

- `https://whitepact-mcp-http.onrender.com/mcp` (Streamable HTTP)

Authentication is a Bearer API key, read from the `WHITEPACT_API_KEY`
environment variable and substituted into the request's `Authorization`
header — see `.mcp.json`. No other network calls, no telemetry, no file
or secret access beyond reading that one environment variable.

## Setup

1. Get a WhitePact API key from the WhitePact dashboard (a free org is
   enough to try it; the hosted transport used here requires the org be
   on a plan with hosted MCP access — the completely free path is
   self-hosting the `stdio` transport directly, see the main repo).
2. `export WHITEPACT_API_KEY=...` before Grok Build loads this plugin.
3. WhitePact's 27 tools become available to Grok Build.

## Safe test prompt

> "Use whitepact's rai_scan tool to check this text for PII: 'Contact
> John at john@example.com or 555-123-4567.'"

Expected: a redacted copy and a list of PII findings, no writes.
