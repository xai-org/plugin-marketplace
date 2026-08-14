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
sits in front of an agent's actions and outputs, not another model. All 27
tools are read-only: WhitePact evaluates and reports, it never mutates
state or acts on an agent's behalf.

## When to use this

- Before letting an agent act on untrusted input: scan it for PII or
  harmful content (`rai_scan`).
- Before trusting a model's claim or output: score it for factual
  reliability (`rai_trust_score`, `rai_hallucination`).
- When a task needs regulatory grounding: check against NIST AI RMF, the
  EU AI Act, or ISO 42001 (`rai_eu_ai_act_classify`, `rai_iso42001_gap`).
- Before allowing a proposed agent action to proceed: evaluate it against
  policy rules for a deterministic ALLOW / ALLOW_WITH_REDACTION /
  REQUIRE_APPROVAL / DENY / QUARANTINE decision (`rai_policy_check`).
- To stress-test a prompt or system for adversarial robustness
  (`rai_redteam_analyze`, `rai_redteam_payloads`).

## Setup

Requires a WhitePact API key (free tier available — self-hosted `stdio`
transport has no quota limit at all; the hosted transport used by this
plugin requires an org on a plan with hosted access). Get one from the
WhitePact dashboard, then set `WHITEPACT_API_KEY` in your environment
before Grok Build loads this plugin's MCP server.

## Network endpoints and credentials this plugin uses

- `https://whitepact-mcp-http.onrender.com/mcp` — the only network
  endpoint this plugin calls, over Streamable HTTP, authenticated with a
  Bearer API key you provide via `WHITEPACT_API_KEY`.
- No other network calls, no telemetry, no local file/secret access
  beyond reading that one environment variable to build the auth header.
