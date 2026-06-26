# Rule Pack Format

The customer-specific contract the audit asserts against. Lives at the project root as `luciq-verify.yaml`. The skill merges this with a base pack (defined in this file) and runs every rule in the merged set.

## Table of contents

1. [How the merge works](#how-the-merge-works)
2. [Schema](#schema)
3. [Worked example](#worked-example)
4. [Base pack — what the skill ships](#base-pack--what-the-skill-ships)
5. [Bootstrap inference (first run)](#bootstrap-inference-first-run)
6. [Drift detection (every subsequent run)](#drift-detection-every-subsequent-run)
7. [Anti-patterns to avoid](#anti-patterns-to-avoid)

## How the merge works

The audit assembles its rule set in two steps:

1. **Base pack** ships with the skill — sensible defaults for every code in the catalog (`E*`, `C0*`, `C1`–`C9`, `S*`, `P1`, `T1`, `U1`).
2. **Customer rule pack** (`luciq-verify.yaml`) supplies the integration-specific values (`redaction.*`, `network.*`, `attributes.*`, `pii.regex`) that turn the base rules into real assertions.

Customer entries always win on conflict — the base pack is a starting point, not authority. An empty customer pack produces a sparse but real audit; drift detection fills it in over time.

## Schema

```yaml
# luciq-verify.yaml — customer rule pack

# Identity of the customer integration. Used to derive marker names and report headers.
integration:
  app_slug: "example"                       # MCP slug from list_applications
  bundle_ids:
    debug:   "com.example.app.debug"
    release: "com.example.app"
  expected_sdk_version: "<set by skill at run time>"

# Backend / dashboard scope this verification targets.
# Allowed values match the Luciq MCP `mode` enum.
env:
  backend_hosts_allow:
    - "*.staging.example.com"
  dashboard_mode: "staging"                 # alpha | beta | staging | qa | development | production

# Harness configuration. Two modes:
#   scaffold (default) — the skill generates LuciqVerifyHarness into the debug variant.
#   reuse              — the skill drives an existing dev-tools surface in your app.
# See references/harness-contract.md for the full spec of both modes.
harness:
  mode: "scaffold"                          # scaffold | reuse

  # Only used when mode=reuse. Triggers can be:
  #   - String shorthand:  "CrashTrigger.forceUnwrapNil"  (defaults to invoke_via=manual)
  #   - Object form:       see below for per-trigger invoke_via options
  # invoke_via options: deep_link_param | intent_extra | tap_by_label | manual
  # See references/harness-contract.md "Driving the smoke in reuse mode" for the full spec.
  # reused_surface:
  #   marker_view: "DevToolsFragment" # current_view value on occurrences from this screen
  #   deep_link: "myapp://devtools"         # optional — for hands-free smoke
  #   triggers:
  #     forceCrash:
  #       method: "CrashTrigger.forceUnwrapNil"
  #       invoke_via: "intent_extra"
  #       param_name: "trigger"
  #       param_value: "forceUnwrapNil"
  #     reportBugReport:
  #       method: "BugTrigger.reportFromDevTools"
  #       invoke_via: "tap_by_label"        # requires mobile-mcp (optional, see below)
  #       label: "Report Bug"
  #     setTestPersona: "PersonaTrigger.setTestPersona"   # shorthand → manual

# Optional integrations. The skill works without any of these — they unlock hands-free
# paths and richer reporting when present.
optional_integrations:
  mobile_mcp:
    enabled: "auto"                         # auto | force | off
                                            #   auto: use if installed, fall back otherwise
                                            #   force: pre-flight STOPs if not installed
                                            #   off: never use even if installed
    screenshot_on_smoke_end: false          # embed end-of-smoke screenshot in report
    screenshot_on_smoke_timeout: false      # capture diagnostic screenshot on Phase 4c timeout

# Custom redaction contract.
redaction:
  request_body_token:  "REDACTED"           # what the SDK should leave in request bodies
  response_body_token: "REDACTED"           # what it should leave in 2xx response bodies
  exclude_status:      [non_2xx]            # body redaction exempt on these
  sensitive_headers:                        # must be absent or redacted
    - "Authorization"
    - "Cookie"
    - "Set-Cookie"
    - "Proxy-Authorization"

# URL normalization / capture contract.
network:
  url_allow_hosts:
    - "host.example.com"
  url_exclude_hosts:                        # C7 — hosts to EXCLUDE from "no self-traffic"
    - "api.instabug.com"                    # SDK ships telemetry here; not customer traffic
    - "*.luciq.com"                         # future Luciq backends
  required_headers_on_all_requests:
    - "X-Trace-Id"
  attachment_path_redacted: true

# Attributes — two buckets: user (named) and custom (20 numbered slots).
attributes:
  user:
    required:
      - "tenant"
      - "locale"
      - "install-source"
    required_one_of_pattern:
      - "*-persona"                         # at least one persona key must be set
  custom:
    # Dashboard configuration maps slot index (1..20) to a logical attribute name.
    # The skill cannot infer this — fill it in once per project.
    slot_map:
      1: "tenant_id"
      3: "feature_cohort"
    required_slots:
      - 1
      - 3

# Feature-flag / experiment expectations.
experiments:
  min_count: 1
  max_key_length: 70

# Per-feature flags the agent can't infer from telemetry alone.
# Declare a workspace-level disable here when a feature is off at the dashboard
# (e.g. user_steps disabled by org policy) — runtime rules dependent on it
# emit DISABLED with this as the source rather than SKIP "evidence field missing"
# (which would read as a defect).
features:
  user_steps:
    workspace_disabled: false        # true if turned off at the dashboard
  session_replay:
    workspace_disabled: false
  network_logging:
    workspace_disabled: false

# PII regex set. Customers extend; the skill ships sensible defaults.
pii:
  regex:
    email:       '\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b'
    phone_e164:  '\+\d{7,15}'
    ssn_us:      '\b\d{3}-\d{2}-\d{4}\b'
  scopes:
    - user_steps
    - user_attributes
    - url_query

# Override or disable any base rule by code.
overrides:
  C6: { enabled: true, evidence_hint: "X-Trace-Id" }
  T1: { dashboard_url: "https://app.luciq.ai/.../network" }
  # P3: { enabled: false, reason: "App does not put data in URL query" }
```

## Worked example

A worked example for a project that uses custom URL normalization, header preservation, body redaction, and persona attributes:

```yaml
integration:
  app_slug: "your-app-slug"
  bundle_ids:
    debug:   "com.your-org.your-app.debug"
    release: "com.your-org.your-app"

env:
  backend_hosts_allow:
    - "api.your-app.com"
  dashboard_mode: "alpha"

# Project already has DevToolsFragment with crash triggers — reuse that
# surface instead of scaffolding a parallel LuciqVerifyHarness.
harness:
  mode: "reuse"
  reused_surface:
    marker_view: "DevToolsFragment"
    triggers:
      forceCrash:        "CrashTrigger.forceCrash"
      reportBugReport:   "BugTrigger.reportFromDevTools"
      setTestPersona:    "PersonaTrigger.setTestPersona"
      fireNetworkBurst:  "NetworkTrigger.runBurst"
      flushNow:          "LuciqSDK.flushNow"

redaction:
  request_body_token:  "<REDACTED>"
  response_body_token: "<REDACTED>"
  exclude_status:      [non_2xx]
  sensitive_headers:   ["Authorization", "Cookie", "Set-Cookie"]

network:
  url_allow_hosts:
    - "api.your-app.com"
  url_exclude_hosts:
    - "api.instabug.com"
    - "*.luciq.com"
  required_headers_on_all_requests:
    - "X-Tenant"
  attachment_path_redacted: true

attributes:
  user:
    required:
      - "tenant"
      - "your-app-locale"
      - "install-source"
    required_one_of_pattern:
      - "your-app-*-persona"

experiments:
  min_count: 1
  max_key_length: 70
```

This produces an all-green report: `C1` confirms every outgoing URL matches `api.your-app.com`, `C2` confirms `X-Tenant` is present on every request, `C3a/C3b` confirm bodies are replaced with `<REDACTED>` (non-200 responses are intentionally excluded — see C3b semantics), `A4` confirms the declared persona attribute pattern, and so on.

## Base pack — what the skill ships

The base pack defines every code with sensible defaults. Customer overrides apply on top. The base pack assumes:

- `redaction.request_body_token` defaults to `REDACTED` (generic placeholder; most customers override).
- `redaction.exclude_status` defaults to `[non_2xx]` (the C3b non-2xx exemption).
- `network.attachment_path_redacted` defaults to `true`.
- `experiments.min_count` defaults to `0` (no minimum — overridable).
- `pii.regex` defaults to a generic set (email, phone, SSN, credit-card-luhn). Customers extend with industry-specific patterns.
- `pii.scopes` defaults to `[user_steps, user_attributes, url_query]`.

Every rule code is enabled by default. Customers disable via `overrides.<code>: { enabled: false, reason: "<why>" }`.

## Bootstrap inference (first run)

If `list_crashes` returns ≥ 10 occurrences from the **baseline** (pre-upgrade) SDK version, the skill infers a draft rule pack from observed telemetry:

1. **Headers** — for each header name, compute the fraction of requests it appears on. Headers present on ≥ 95% of requests across ≥ 5 occurrences are candidates for `network.required_headers_on_all_requests`. The skill proposes; the user approves each.

2. **Redaction tokens** — observe the literal string occupying request and response bodies on 2xx requests. If a single token appears in ≥ 95% of bodies, propose it as `redaction.request_body_token` / `redaction.response_body_token`.

3. **URL hosts** — observe the host distribution. Hosts above a threshold become `url_allow_hosts` candidates.

4. **Attribute keys** — observe the key set across occurrences. Keys present in 100% of sessions are proposed as `attributes.user.required`. Keys matching a clustering pattern (`your-app-*-persona`, `tenant-*`) are proposed as `required_one_of_pattern`.

5. **Experiment / flag count band** — observe min/max counts across occurrences; propose `min_count` at the floor.

6. **Static-analysis crosscheck** — grep the codebase for Luciq SDK API call sites. Discrepancies (code calls `setUserAttribute("foo", ...)` but no occurrence ever shipped key `foo`) become INFO findings.

The skill produces a proposed `luciq-verify.yaml` and **shows it to the user before writing**. The user strikes, edits, or accepts each block. The skill writes only what the user confirmed.

### PII regex is never auto-inferred and committed

The skill may *suggest* regexes ("I see strings matching email format in user steps — should this be flagged as PII?") but each one requires explicit user approval. Auto-adding a wrong PII rule produces false alarms forever; a missing PII rule is a known gap. The cost asymmetry favors human approval.

### Custom-attribute slot map is never inferred

Slot configuration is organization-wide dashboard config, not telemetry-derivable. Even if slot 1 always contains a tenant ID across observed occurrences, that doesn't make the mapping "tenant_id" canonical for the org. Prompt the user; don't guess.

## Drift detection (every subsequent run)

After each verification, the skill diffs observed-vs-declared and proposes pack updates as a unified diff. Categories:

- **Newly observed** — a key/header/host that appeared this run but isn't in the pack.
- **No longer observed** — a declared rule that hasn't fired in N runs (default 5). Propose `DISABLED` or removal.
- **Drifted band** — a numeric expectation outside the declared range (e.g. flag count now 156 vs. declared `min_count: 100`).
- **Static-analysis crosscheck** — a new SDK API call site in the codebase since last run (e.g. customer just added a new redaction callback at `NetworkModule.kt:142` — propose extending the redaction rule).

The user accepts, rejects, or edits per hunk. The skill never auto-edits `luciq-verify.yaml`.

## Anti-patterns to avoid

- **Trusting the base pack over the customer pack on conflict.** Customer overrides always win — they're authoritative for the integration; the base pack is a starting point.
- **Auto-committing rule-pack changes from drift detection.** Propose the diff; commit only on user approval. Drift can be intentional (a new attribute the customer just added) or accidental (a regression). The user owns that decision.
- **Inferring PII regexes from observed strings.** False positives are sticky — they generate noise every run forever. Suggest only; commit only on approval.
- **Inferring custom-attribute slot mappings.** Slot config is org-wide; the skill has no way to verify the mapping is correct. Always prompt.
- **Disabling a rule because it FAILed once.** A FAIL is a signal, not a nuisance. Investigate; don't silence. If a rule genuinely doesn't apply (e.g. a header the app doesn't use), document the reason and DISABLE explicitly.
- **Treating an empty customer pack as broken.** An empty pack runs the base rules — that's fine for a first run. The bootstrap inference step fills it in proactively when telemetry is available.
