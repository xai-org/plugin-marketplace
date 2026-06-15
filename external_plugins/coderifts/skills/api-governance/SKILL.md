---
name: api-governance
description: Use before merging or shipping any API or tool-contract change. Runs CodeRifts preflight on OpenAPI specs and MCP manifests to detect breaking changes, score blast radius and agent impact, and return an ALLOW/WARN/REQUIRE_APPROVAL/BLOCK decision. Trigger when a PR touches an API spec, when endpoints or fields are renamed, removed, or made required, or when an MCP or agent tool schema changes.
---

# CodeRifts API Governance

CodeRifts checks API and tool-contract changes for safety before they reach production. It answers not just what changed, but how dangerous it is, who it affects, and whether deployment should be blocked.

## When to use

Run a CodeRifts check whenever a change could alter an API contract:

- A pull request modifies an OpenAPI or Swagger spec.
- Endpoints or fields are renamed, removed, or made required.
- Request or response schemas, status codes, or auth scopes change.
- An MCP manifest or agent tool schema changes.
- Before connecting an agent to an external API whose spec just changed.

## Tools

The coderifts MCP server exposes:

- preflight_check - diff two OpenAPI specs (before, after); returns risk score, blast radius, agent impact, and a merge decision.
- agent_tool_check - detect changes that break agent tool calling.
- mcp_diff - compare two MCP manifests for breaking tool-schema changes.
- agent_readiness_score - score a spec or manifest (0-100) for agent readiness.
- governance_health - A-F governance grade for a spec.
- agent_preflight, registry_validate, traffic_analyze - workflow, registry, and traffic-based checks.

## Decision protocol

Every check returns one decision, always in the same shape:

- ALLOW - safe to merge.
- WARN - non-breaking but worth noting.
- REQUIRE_APPROVAL - risky; get a human sign-off.
- BLOCK - breaking change; do not merge without remediation.

On REQUIRE_APPROVAL or BLOCK, surface the detected patterns and blast radius to the user, and suggest the safer path (deprecate-then-remove, additive change, versioning) rather than shipping the break.

## Setup

Authentication uses a CodeRifts API key. Set CODERIFTS_API_KEY in your environment (get a key at https://coderifts.com). Discovery (initialize, tools/list) works without a key; running a check requires one.
