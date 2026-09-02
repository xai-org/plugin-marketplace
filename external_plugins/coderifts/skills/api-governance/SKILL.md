---
name: api-governance
description: Before merging or shipping any API or tool-contract change: preflight the change set, then branch on execution_action.
---

# CodeRifts API Governance

<!-- GENERATED from CodeRifts agent-host-rule (single source). Do not edit rule sentences by hand; run: node scripts/generate-agent-host-files.js -->

Call `preflight_change_set` before merge, deploy, publish, or tool registration when a contract artifact changed (OpenAPI/Swagger, GraphQL, gRPC/protobuf, AsyncAPI, MCP manifest, or agent tool schemas).

Send the complete base-to-head change set: every changed contract artifact with full before and after content. Do not send a single-file subset when other contract files also change.

Branch on `execution_action` only. Do not branch on `decision` and do not branch on `safe_for_agent` (not_for_control_flow_use_execution_action). Canonical `execution_action` values: CONTINUE, CONTINUE_WITH_MONITORING, REQUEST_APPROVAL, STOP.

An unrecognised `execution_action` is not permission: fail closed (halt or re-preflight). Well-known code: `not_permission_fail_closed`.

When `execution_action` is REQUEST_APPROVAL or STOP, surface the detected patterns and the blast radius, and propose the safer path — deprecate-then-remove, an additive change, or a new version — rather than shipping the break.

`CONTINUE_WITH_MONITORING` requires a wired monitoring sink (`monitoringSinkWired`). It is not "proceed with caution" without monitoring.

Do not call CodeRifts tools for a documentation-only change (README, guides, comments) with no contract artifact content change.

If you already hold a chain receipt and only need authenticity/lifecycle: `verify_receipt`. If you need a past decision by id: `get_decision_details`. Neither replaces preflight for a new change set.

The CodeRifts MCP server exposes exactly three tools — `preflight_change_set`, `verify_receipt`, `get_decision_details`. Do not invent or assume others.

A receipt authorizes ONE operation: a merge receipt does not authorize a deploy. Before a different operation (deploy, publish), call `preflight_change_set` with `context.operation` set to that operation — reusing a differently-scoped receipt is not permitted and will fail at the gate.

A stale or superseded receipt on a changed head requires a NEW preflight — `verify_receipt` cannot re-diff.

For mutating tools, put only the guarded version in the agent's tool table; keep the raw handler host-only and unreachable from that table. How you name tools is yours — this is a reachability property, not a product rename of host tools. CodeRifts cannot see or stop a raw call the host makes outside the table it returns; adopt this as a host convention, not as a guarantee from the package.

CodeRifts reports a governance decision and `execution_action`; it does not by itself block merges. Blocking requires separate repository configuration (required status checks, enforcement) that this rule file does not set.

To act (mutate a contract, merge, deploy, or publish): call `preflight_change_set` with `preflight_mode` authorize. Analyze is informational (`may_execute` is always false) and is not permission. Read `execution_action` on the `decision_result` envelope.

Before acting under a held receipt: call `verify_receipt` with the intended `context` (operation, environment, repository, branch, pull_request) for THIS attempt. Do not act on a receipt whose scope does not match.

Act only when `currently_authorized` is true (`control_envelope.receipt_view.currently_authorized`). A valid-looking token is not permission if `currently_authorized` is false or omitted.

Commit / CAS evidence is a separate measurement (`commit_observation` on GuardOutcome). It is not a substitute for authorize + `currently_authorized`. Production hosts that want the fail-closed conjunction lock it with `profile: ENFORCING_STRICT` on withCodeRifts.

If the host requests an execution grant (opt-in `include_execution_grant`), the grant is bound to operation + target + after-payload (`scope_hash`) and is short-lived — never reuse it after the after-payload changes.

An ATOMIC-profile grant carries `state_nonce` and is single-use at the executor — if the executor has consumed the nonce, re-preflight; do not retry the same grant.

With a proven tenant↔repo binding you may request `derivation:"server"` instead of assembling `artifacts[]` yourself (`context.repository` + `context.base` + `context.head` required; caller-supplied artifacts are rejected on that path).

A commit is only proven when an executor attestation verifies (customer-held executor key, `cas_evidence: executor_attested`); otherwise say "authorized, commit not proven".
