# WhitePact

AI governance MCP server: trust scoring, PII/harmful-content guardrails,
hallucination detection, and compliance checks (NIST AI RMF, EU AI Act,
ISO 42001) for AI-agent actions or outputs. The current MCP surface exposes
30 tools and 20 advertised resources.

The MCP tool definitions are annotated read-only/non-destructive. On the
hosted service, WhitePact may still record service-side usage, authentication,
and governance/evidence records as part of operating the service; that is
separate from exposing a destructive MCP tool to the calling agent.

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

## Network endpoint and credentials

The plugin itself connects Grok Build to one MCP endpoint:

- `https://whitepact-mcp-http.onrender.com/mcp` (Streamable HTTP)

Authentication is a Bearer API key, read from the `WHITEPACT_API_KEY`
environment variable and substituted into the request's `Authorization`
header — see `.mcp.json`. The plugin configuration does not add telemetry or
additional local-file access. Individual WhitePact tools/services may perform
the network or persistence behavior documented by the upstream WhitePact
project; consult the source repository for the exact current behavior.

## Setup

1. Obtain a WhitePact API key. The hosted transport used by this plugin
   requires an organization/plan with hosted MCP access; the self-hosted
   `stdio` transport is the separate local-install path documented in the
   main WhitePact repository.
2. `export WHITEPACT_API_KEY=...` before Grok Build loads this plugin.
3. WhitePact's current 30-tool MCP surface becomes available to Grok Build,
   subject to the hosted service's authentication, plan, and governance
   controls.

## Safe test prompt

> "Use whitepact's rai_scan tool to check this text for PII: 'Contact
> John at john@example.com or 555-123-4567.'"

Expected: the current `rai_scan` result identifies the PII and provides its
redacted representation; it should not invoke a destructive agent action.
