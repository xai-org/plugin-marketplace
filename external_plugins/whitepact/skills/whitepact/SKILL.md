---
name: whitepact
description: >-
  AI governance and trust layer for checking whether an AI agent's action or
  output is safe, fair, compliant, and accountable before or after it happens.
  Use whenever the task involves: scanning text for PII or harmful content
  ("scan for PII", "redact sensitive data"), scoring how trustworthy a claim
  or model output is ("trust score", "is this hallucinating", "fact-check
  this claim"), checking regulatory compliance ("EU AI Act", "NIST AI RMF",
  "ISO 42001", "is this compliant"), red-teaming a prompt for adversarial
  robustness, or deciding whether a proposed agent action should be allowed,
  redacted, held for approval, denied, or quarantined ("governance
  decision", "should this action be allowed").
---

# WhitePact

WhitePact is an AI governance MCP server — a trust and safety layer that
sits in front of agent actions and outputs, not another model. Its current
MCP surface exposes 30 tools and 20 advertised resources. The tool
definitions are annotated read-only/non-destructive; the hosted WhitePact
service may still record usage, authentication, and governance/evidence
records as part of operating the service.

## When to use this

- Before letting an agent act on untrusted input: scan it for PII or
  harmful content (`rai_scan`).
- Before trusting a model's claim or output: evaluate it with the relevant
  trust/hallucination tools (`rai_trust_score`, `rai_hallucination`).
- When a task needs regulatory grounding: check against NIST AI RMF, the
  EU AI Act, or ISO 42001 (`rai_eu_ai_act_classify`, `rai_iso42001_gap`).
- For deterministic governance-policy evaluation, use the tool whose
  documented input contract matches the requested policy/action check; do
  not invent execution authority that the exposed tool does not provide.
- To stress-test a prompt or system for adversarial robustness
  (`rai_redteam_analyze`, `rai_redteam_payloads`).
- For persistent-memory and causal-influence checks, use the current
  `rai_memory_write_check`, `rai_memory_read_check`, and
  `rai_causal_influence_check` tools where their documented schemas fit.

## Setup

Requires a WhitePact API key for the hosted endpoint. The hosted transport
used by this plugin requires an organization/plan with hosted MCP access;
the self-hosted `stdio` transport is a separate local-install path described
in the main WhitePact repository. Set `WHITEPACT_API_KEY` in your environment
before Grok Build loads this plugin's MCP server.

## Network endpoint and credentials this plugin uses

- `https://whitepact-mcp-http.onrender.com/mcp` — the MCP endpoint this
  plugin configuration connects to over Streamable HTTP, authenticated with
  the Bearer API key provided via `WHITEPACT_API_KEY`.
- The plugin configuration itself adds no extra telemetry or local-file
  access beyond reading that environment variable to construct the auth
  header. Individual upstream WhitePact tools/services may have network or
  persistence behavior documented in the WhitePact source repository.
