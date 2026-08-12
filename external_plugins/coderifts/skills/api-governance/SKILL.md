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

The coderifts MCP server (`https://app.coderifts.com/mcp`) exposes exactly three tools
(from live `tools/list` — do not invent others):

- **preflight_change_set** — Preflight a complete base→head change set of contract
  artifacts. Returns risk score and breaking-change analysis. With
  `preflight_mode: "authorize"` (and `context.operation`), also returns a governance
  decision (ALLOW / WARN / REQUIRE_APPROVAL / BLOCK) and may mint a signed chain-receipt.
  With `preflight_mode: "analyze"`, returns informational risk only (`analysis_outcome`,
  `may_execute: false`, no decision, no receipt). Requires `artifacts` and
  `preflight_mode`. Artifact types include OpenAPI/Swagger, GraphQL SDL, gRPC/protobuf,
  AsyncAPI, MCP manifest, and agent tool schemas. Use for a **new** decision on the
  **current** pending change set — not to re-check an existing receipt (use
  `verify_receipt`) or look up a past `decision_id` (use `get_decision_details`).

- **verify_receipt** — Verify a signed chain-receipt you **already hold**: signature
  authenticity, body binding, and (when lifecycle indices are available) whether it is
  currently authorized for a stated operation/target (not expired, superseded, or
  revoked). Requires `token`. Optional: `operation`, `target_id`, `environment`,
  `fingerprint`, `audience`, `decision_result`. Branch on `currently_authorized`
  (bool or null when not evaluated). Does **not** re-diff specs or re-issue a decision.

- **get_decision_details** — Retrieve a **past** decision by `decision_id` (preferred)
  or `fingerprint`: stored report, breaking changes, scores, and linked receipt metadata
  if present. For explaining or auditing a prior ALLOW/WARN/BLOCK — not for a new
  analysis of current before/after specs (use `preflight_change_set`).

## Decision protocol

On the **authorize** path of `preflight_change_set`, every successful check returns one
decision in a consistent shape:

- ALLOW — safe to merge / proceed under the stated operation.
- WARN — non-breaking but worth noting.
- REQUIRE_APPROVAL — risky; get a human sign-off.
- BLOCK — breaking change; do not merge without remediation.

The companion control signal is `execution_action` (CONTINUE / CONTINUE_WITH_MONITORING /
REQUEST_APPROVAL / STOP). Prefer branching on `execution_action` when present; an
unrecognized value is not permission.

On REQUIRE_APPROVAL or BLOCK, surface the detected patterns and blast radius to the user,
and suggest the safer path (deprecate-then-remove, additive change, versioning) rather
than shipping the break.

Analyze mode (`preflight_mode: "analyze"`) does **not** return that decision vocabulary —
it is informational only (`may_execute: false`, no receipt).

## Setup

Authentication uses a CodeRifts API key. Set `CODERIFTS_API_KEY` in your environment
(get a key at https://coderifts.com). Discovery (`initialize`, `tools/list`) works without
a key; running tools that need authorization requires one.
