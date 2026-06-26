---
name: luciq-verify
description: Verify a Luciq SDK upgrade end to end before shipping. Confirms the customer's custom integration (URL redirection, masking / redaction callbacks, preserved headers, persona attributes, PII masking, feature flags, experiments, user steps, user attributes) still behaves correctly against the new SDK version. Use whenever the user mentions verifying an SDK upgrade, auditing a Luciq version bump, "is it safe to release", smoke-testing the new SDK, or pastes a build with a freshly bumped Luciq dependency and asks whether to release. Scaffolds a luciq-verify harness into the debug variant, drives it to produce a fresh occurrence, pulls evidence via the Luciq MCP server (APM, bug, and crash channels), applies a customer-specific rule pack against the captured payload, and renders a pass/fail HTML+Markdown report. For first-time SDK installs use luciq-setup; for the rename/upgrade transform use luciq-migrate; for production crash investigation use luciq-debug.
---

# Luciq SDK Upgrade Verification

End-to-end behavioral verification of a Luciq SDK upgrade. The mechanism is **the dashboard as oracle**: drive a debug build through a deterministic smoke, let the new SDK ship telemetry, then pull that occurrence back through MCP and audit what landed against the customer's contract. The skill catches integrations broken by SDK internal changes — redaction callbacks that no longer fire, header-preservation hooks that silently dropped, attribute APIs whose keys got renamed, new auto-instrumentation that captured PII. None of those break a build. All of them ship broken if you only test "does it compile."

The skill is **self-contained and idempotent**. The verification harness is not a published package; this skill generates it directly inside the customer's debug variant the first time it runs and reuses it forever after. First invocation does the heavy work (harness scaffold, rule-pack bootstrap, environment confirmation); every subsequent SDK upgrade is a 2-minute "press go."

## When NOT to use this skill

- First-time integration of Luciq into a project that has never used Luciq, use `luciq-setup`. Setup must succeed before verification can run.
- Performing the Instabug-to-Luciq rename or applying vN-to-vN+1 API transforms, use `luciq-migrate`. Verification runs **after** the migration transform, against the new build.
- Investigating a production crash, hang, or bug, use `luciq-debug`. Verification audits a synthetic smoke; debug audits real-user signal.
- General mobile QA where Luciq is not the data source. This skill is grounded in what the Luciq MCP exposes; without it, do not pretend to use it.

If the request fits any of the above, route there and stop — running this skill on those situations produces misleading results.

## Prerequisites

### Hard dependencies (skill refuses to run without these)

| Artifact | What for | If missing |
| --- | --- | --- |
| **Luciq MCP server, authenticated** | The entire audit is grounded in what the Luciq MCP exposes — `list_applications`, `list_crashes`, `list_bugs`, `list_occurrences_tokens`, `get_occurrence_details`, `bug_details`, `crash_patterns`, and `apm_*`. Without it the skill has no oracle to verify against. | STOP at Phase 3 pre-flight. Route the user to `luciq-setup` step 7 or to https://docs.luciq.ai/product-guides-and-integrations/product-guides/ai-features/luciq-mcp-server/setup-by-ide. Do not attempt static-analysis-only "verification" — it would silently pass real regressions. |
| **A debug-variant build with the new SDK + the luciq-verify harness** | Produces a deterministic occurrence to audit | Run Phase 1 below — the skill generates the harness (scaffold mode) or validates the customer's existing dev-tools surface (reuse mode). |
| **A device, simulator, or emulator** | Executes the build that produces the occurrence | Stop; ask the user to boot one. Do not spawn one without confirmation. |

The skill itself runs locally and pulls cloud-side telemetry — but cannot synthesize an occurrence without something running the build. This is not optional.

### Optional integrations (the skill works without these, gains capabilities with them)

| Integration | What it adds | If missing |
| --- | --- | --- |
| **[mobile-mcp](https://github.com/mobile-next/mobile-mcp)** server | Drives the smoke by reading the device's accessibility tree and tapping buttons by label / element ID. Required for reuse mode's `invoke_via: tap_by_label` path — useful when the customer's existing dev-tools menu can't be driven by intent extras or deep-link params. Also enables diagnostic screenshots (`optional_integrations.mobile_mcp.screenshot_on_smoke_end/timeout`). | `tap_by_label` triggers degrade to `manual` (the skill prints the trigger sequence and waits for the user to tap). Screenshots are simply not captured. Pre-flight passes unless the rule pack sets `optional_integrations.mobile_mcp.enabled: force`. |

## Reference files

Detailed material is split out so the SKILL.md stays workflow-focused. Read the relevant reference when the workflow points to it:

| Reference | When to read |
| --- | --- |
| `references/payload-schemas.md` | Before any runtime audit. Defines the three channels (APM / Bug / Crash), every MCP tool's response shape, identifier model, mode/platform/crash-type enums, filter naming differences. Field paths used in this SKILL.md come from here. |
| `references/check-catalog.md` | When implementing Phase 5 (runtime audit). Full E/C/S/P/A/T/U code catalog with per-channel evidence sources and the platform applicability matrix (which rules emit `N/A` on which platforms). |
| `references/static-checks-catalog.md` | When implementing Phase 2 (static audit). Full S-* code catalog: install, modules, invocation, identity, feature-flags, logging, masking, dSYM/mapping upload, build systems, privacy modifiers. |
| `references/extractors-ios.md` | When running Phase 2 on an iOS project. Per-file scan patterns + the agent-native extraction recipe (Read + Grep instructions). |
| `references/extractors-android.md` | Phase 2 on Android. Gradle Groovy + KTS coverage. |
| `references/extractors-flutter.md` | Phase 2 on Flutter. `pubspec.yaml` + Dart source patterns. |
| `references/extractors-rn.md` | Phase 2 on React Native. `package.json` + JS/TS source patterns. |
| `references/rule-pack-format.md` | When scaffolding `luciq-verify.yaml` (Phase 1c), running bootstrap inference (Phase 1d), or processing drift detection (Phase 6b). Full YAML schema, base pack, inference rules. |
| `references/harness-contract.md` | When generating the harness (Phase 1b/1c) or regenerating it on a later run. Per-platform scaffold paths, required API surface, marker convention, debug-only gating. |

## Canonical sources of truth

Verify SDK API signatures and platform packaging against the live integration guides — they evolve, and signatures memorized in this skill or its references can go stale:

| Concern | Source |
| --- | --- |
| Per-platform SDK API surface (init, hooks, callbacks, masking, identification, `reportBug`) | The platform-specific guides linked in `luciq-setup`'s "Canonical sources of truth" table |
| MCP tool surface and authentication | https://docs.luciq.ai/product-guides-and-integrations/product-guides/ai-features/luciq-mcp-server/setup-by-ide |
| App tokens, slugs, and modes | Luciq MCP `list_applications` |

## Workflow checklist

Track every phase. Stop on any failed step rather than continuing past a broken state — a misleading "PASS" report is worse than no report.

```
Verification Progress:
- [ ] 0. Detect customer maturity tier (drives phase shape below)
- [ ] 1. Setup (idempotent; no-ops on second run)
- [ ] 2. Static audit (config inspection; skipped if --runtime)
- [ ] 3. Pre-flight safety checks (skipped if --static)
- [ ] 4. Smoke — drive the harness; produce an occurrence (skipped if --static)
- [ ] 5. Runtime audit (MCP pull + rule application; skipped if --static)
- [ ] 6. Report (rendered HTML/Markdown) + drift detection
```

## 0. Detect customer maturity tier

The skill **degrades gracefully** by tier. Detect which tier applies before doing anything else; the rest of the workflow branches on this. Detection is purely local (lockfile reads + MCP probes). Report the detected tier explicitly — the user often doesn't know which tier they're in until you tell them.

| Tier | Marker | What works |
| --- | --- | --- |
| T3 (full) | Upgrade-verify harness present **and** `luciq-verify.yaml` exists | Deterministic synthetic audit with customer-specific rule pack — the end state |
| T2 (harness only) | Harness scaffolded, no rule pack | Deterministic synthetic audit against base rule pack only — most `C*` and `P*` checks run, customer-specific checks (`A*` personas, custom redaction tokens) skipped |
| T1 (telemetry only) | Neither installed, but `list_crashes` or `apm_list_groups` returns ≥ 1 record in the last 30 days from the bumped SDK version | Audit the most recent organic occurrence; `S*` synthetic-marker checks become SKIP; `C0b` (recency) becomes WARN |
| T0 (empty) | No telemetry, no harness | Cannot audit. Run Phase 1 (Setup), stop, ask the user to produce one occurrence, re-invoke |

APM channel availability is a sub-detection: APM's `filters.platform` is `ios | android` only — Flutter (DART) and React Native (JAVASCRIPT) projects have APM permanently `N/A`. Don't probe APM on those platforms; the bug + crash channels carry the full audit there. (Detail: `references/payload-schemas.md`.)

## 1. Setup

Idempotent. Skip any sub-step whose artifact already exists. On a clean repo, this phase produces a single PR-shaped change set scoped strictly to the debug variant.

### 1a. Detect platform

Reuse `luciq-setup`'s platform-detection rules verbatim (first match wins on root markers; stop on ambiguity). Verification refuses to proceed on an ambiguous workspace — guessing the platform here corrupts every downstream step.

### 1b. Set up the harness — scaffold or reuse

Two modes, picked by the customer's `harness.mode` in `luciq-verify.yaml`. Default is `scaffold`. Read `references/harness-contract.md` for the full spec of both.

**Scaffold mode** (default — `harness.mode: scaffold`)
The skill generates `LuciqVerifyHarness.<ext>` directly inside the customer's debug variant. Per-platform file paths, the required API surface, the marker convention (`current_view == "LuciqVerifyHarness"`), and debug-only gating rules are in `references/harness-contract.md`.

Why generated, not packaged: per-customer customization (which redaction tokens to fire, which personas to test) makes a single binary library a poor fit; the generated source is small (≈ 100–200 lines per platform) and can be regenerated by the skill on subsequent runs.

Show diffs before applying. Never touch release / production source sets, manifests, Info.plists, or entry points — a release-variant harness with a public deep link is a remote-crash vector.

**Reuse mode** (`harness.mode: reuse`)
For projects that already have a debug menu with crash / hang / bug triggers (e.g. a `DevToolsFragment` or a `CrashLab` / `HangTrigger` / `ErrorTrigger` family), the skill drives the existing surface instead of generating a parallel one. The rule pack declares the marker view, an optional deep link / activity, and a trigger map (e.g. `forceCrash: "CrashTrigger.forceUnwrapNil"`).

Before the smoke runs, the skill enforces the reuse-mode invariants from `references/harness-contract.md`:
- `marker_view` is non-empty and has at least one prior occurrence in the dashboard
- The reused surface is gated to the debug variant (debug source set, `#if DEBUG`, or debug-only manifest entry)
- A `flushNow` mapping exists (strongly recommended; without it recency becomes a timer race)

Unmapped triggers become no-ops in the smoke and the rules that needed them SKIP. The audit degrades gracefully — a reuse-mode setup with only `forceCrash` and `flushNow` mapped still runs E*, C0*, S1, and (via the crash channel) most of C1–C7.

### 1c. Scaffold the rule pack

Write `luciq-verify.yaml` at the repo root with the base pack inlined plus TODO stubs for customer-specific rules. Schema, base pack defaults, and a worked example are in `references/rule-pack-format.md`. The first run can leave all customer-specific rules commented out; bootstrap inference (Phase 1d) and drift detection (Phase 6b) fill them in over time.

### 1d. Bootstrap rule inference (if any telemetry exists)

If `list_crashes` returns ≥ 10 occurrences from the **baseline** (pre-upgrade) SDK version, run the inference pass described in `references/rule-pack-format.md` ("Bootstrap inference"). The skill proposes a populated rule pack draft; commit only on user confirmation. On a brand-new integration, skip and rely on drift detection over subsequent runs.

PII regex and custom-attribute slot mappings are **never auto-inferred and committed** — the cost asymmetry of false positives vs. missing rules favors human approval. The skill may suggest; the user approves.

## 2. Static audit

Inspects the customer's source tree and build config without running the app. Catches integration bugs that surface at build/config time and never get caught by the runtime audit alone: SDK not installed (or pinned to the wrong version), modules disabled by code, masking off, dSYM / mapping upload not wired, redundant invocation listeners, suspicious patterns in custom logging.

Skipped if invoked with `--runtime`. In default and `--static` modes, this phase runs after Phase 1 (Setup) and before Phase 3 (Pre-flight). The findings feed the combined report alongside runtime-audit results.

The audit is **agent-native**: the skill instructs the agent which files to read and which patterns to look for, via per-platform extractor reference docs. No external runtimes, no scanning daemon, no installed dependencies.

### 2a. Discover platform-relevant files

Reuse the platform detection from Phase 1a. Based on the detected platform, point the agent at the corresponding extractor reference:

| Platform | Reference | Files scanned |
| --- | --- | --- |
| iOS | `references/extractors-ios.md` | `Package.resolved`, `Podfile` (+ `.lock`), `Cartfile` (+ `.resolved`), `*.swift`, `*.m`, `Info.plist`, `project.pbxproj`, dSYM upload shell scripts |
| Android | `references/extractors-android.md` | `build.gradle`(`.kts`), `settings.gradle`(`.kts`), `AndroidManifest.xml`, `*.kt`, `*.java` |
| Flutter | `references/extractors-flutter.md` | `pubspec.yaml`, `*.dart` |
| React Native | `references/extractors-rn.md` — plus `extractors-ios.md` on `ios/` and `extractors-android.md` on `android/` when those subfolders exist (RN projects are hybrid; native-side Pod / Gradle integration is part of the audit) | `package.json`, `*.{js,jsx,ts,tsx}`, and the native files when applicable |

### 2b. Run the extractors

Each reference doc enumerates a category of static checks (`S-*` codes — distinct from the `E*` / `C*` / `P*` / `A*` codes that live in `references/check-catalog.md` for the runtime audit). The agent reads the listed files (Read + Grep), applies the documented patterns, and produces findings. Field paths and check semantics live in `references/static-checks-catalog.md`.

Categories per platform (full per-platform spec in each extractor reference):

- **SDK install + version detection** — pinned version, install method, mismatched debug vs. release
- **Module activation** — Bug Reporting, Crash Reporting, APM, Session Replay, NDK, Surveys, Replies, Feature Requests, OOM monitor, ANR monitor, network auto-masking
- **Invocation events** — shake / screenshot / floating-button / two-finger swipe / programmatic
- **User identification + attribute hooks** — `setUserData`, `setCustomData`, `addUserAttribute`, `trackUserSteps`
- **Feature flag API usage** — `addFeatureFlag`, `removeFeatureFlag`, `checkFeatures`
- **Custom logging + user-event logging** — `Luciq.log*`, `LCQLog.log*`, `logUserEvent`
- **Masking / privacy config** — network auto-masking, screenshot auto-masking modes, sensitive header configuration
- **dSYM / mapping upload setup** — iOS dSYM upload script presence; Android mapping upload Gradle plugin presence
- **Build system detection** — SPM / CocoaPods / Carthage on iOS; Gradle Groovy / Gradle KTS on Android; npm on RN; pub on Flutter
- **Privacy view modifiers** — iOS only (SwiftUI `.luciqPrivate()`, UIKit equivalents)

### 2c. Privacy constraints during extraction

Hard constraints, baked into every extractor pattern:

1. **Never quote contiguous source regions in findings.** The agent reads files to grep for specific patterns and may cite matched API names (e.g. `Luciq.start`, `setBugReportingEnabled`) by name. Surrounding lines, full functions, or other source regions must not be reproduced in the report — findings cite file path and 1-indexed line range only.
2. **Mask all detected tokens in the report.** If the agent extracts an app token from source, the report shows the first 4 characters + length (e.g. `2c5f… [40 chars]`), never the full token.
3. **Never read screenshots, asset binaries, or compiled artifacts.** Static analysis is text-only.
4. **Never open `.env` files even when present.** Listed in findings as "present" / "absent"; contents not read.

The agent's outputs go into the customer's local report file; nothing is uploaded. The skill never reaches a network endpoint other than the Luciq MCP server (during runtime audit, not static).

### 2d. Findings shape

Each finding produces one row in the static-audit section of the combined report:

| Field | Example |
| --- | --- |
| Code | `S-INSTALL-001` (see `references/static-checks-catalog.md`) |
| Status | `PASS` / `FAIL` / `WARN` / `INFO` / `DISABLED` / `SKIP` |
| Evidence | File path + line range (1-indexed) — never the matched text itself unless it's a known-safe identifier |
| Remediation | Doc link or short hint |

`FAIL` blocks release the same way runtime-audit `FAIL` does. `--static` mode produces a report with only the static section populated; default mode combines static + runtime findings into one report ordered by severity.

## 3. Pre-flight safety checks

Runs on every invocation. The point of these checks is to refuse to verify against the wrong thing — a "PASS" report from a build that's still on the old SDK, or a debug build that's mistakenly pointing at production traffic, is worse than no report.

| Check | What it confirms | Stop condition |
| --- | --- | --- |
| New SDK version in lockfile | The build the user is about to verify actually has the new SDK | Lockfile pins the old version |
| Build variant is debug | Smoking against `*.debug` / `Debug` configuration | Active variant is release / production |
| Backend environment is non-prod | Build is pointed at `alpha` / `beta` / `staging` / `qa` / `development` backend | Build is pointed at production API |
| Dashboard mode matches build env | A staging build should produce occurrences in `mode: staging` | Build env and `mode` mismatch |
| Device / emulator available | `adb devices` shows ≥ 1, or `xcrun simctl list devices booted` returns ≥ 1 | Nothing booted / connected |
| **Luciq MCP reachable** | `list_applications` returns the user's app at the expected `slug` | Auth expired or MCP not configured — STOP. This is the hard dependency that grounds the entire audit; the skill cannot proceed. |
| mobile-mcp probe (only if `optional_integrations.mobile_mcp.enabled: force`) | mobile-mcp's tool surface responds to a probe call | Rule pack forced it; STOP with "mobile-mcp required by rule pack but not installed." On default `enabled: auto`, missing mobile-mcp is fine — `tap_by_label` triggers degrade to manual. |

The skill refuses to proceed against a production build variant, a build pointed at a production backend, or `mode: production` on the MCP queries. These refusals are not overridable inline — the production-canary audit is a separate mode (see "Modes" below) that the user invokes explicitly.

## 4. Smoke

The skill drives the harness end-to-end. No manual "tap the button" handoff unless the user prefers it.

### 4a. Install + launch

Default path uses platform-native commands:

| Platform | Install | Launch harness |
| --- | --- | --- |
| iOS | `xcodebuild -scheme <Debug> -destination 'platform=iOS Simulator,id=<UDID>' install` | `xcrun simctl openurl <UDID> luciq://luciq-verify-harness` |
| Android | `./gradlew :app:installDebug` | `adb shell am start -W -a android.intent.action.VIEW -d "luciq://luciq-verify-harness"` |
| Flutter | `flutter install --debug` | platform-specific `am start` / `simctl openurl` |
| React Native | `npx react-native run-<platform>` | as above |
| KMP | run both | as above |

Derive `<Scheme>`, `<UDID>`, package name from the project. Stop on ambiguity.

If mobile-mcp is available (`optional_integrations.mobile_mcp.enabled: auto` or `force`), the skill can also use it as a unified driver — its `install_app` / `launch_app` / `open_url` primitives work across iOS and Android without the per-platform command split. This is purely a convenience; both paths produce the same outcome.

### 4b. Trigger the canonical action sequence

Order matters: attributes are set before network traffic so the audit sees them associated with the right session. The bug report is created before the crash so the audit gets a clean bug-channel sample alongside the crash sample.

```
1. LuciqVerifyHarness.setTestPersona("<persona-key-from-rule-pack>")
2. LuciqVerifyHarness.fireNetworkBurst(n=<count-from-rule-pack>)
3. LuciqVerifyHarness.exerciseFeatureFlags()       # iterates declared flags / experiments
4. LuciqVerifyHarness.reportBugReport()            # produces a bug record with SPLIT log archives — cleanest C1–C7 evidence channel after APM
5. LuciqVerifyHarness.flushNow()                   # synchronously ship pending telemetry — removes the timer race
6. LuciqVerifyHarness.forceCrash()                 # produces the auditable crash with current_view=LuciqVerifyHarness
```

In **scaffold mode**, the scaffolded harness UI fires these in sequence as soon as the deep link opens it — the skill just opens the link and waits. In **reuse mode**, the skill invokes each trigger using the `invoke_via` strategy declared in the rule pack (`deep_link_param` / `intent_extra` / `tap_by_label` / `manual`). `tap_by_label` requires mobile-mcp; absent mobile-mcp, it degrades to `manual` (the skill prints the trigger sequence and waits for the user to tap). See `references/harness-contract.md` for the strategy decision table.

### 4c. Wait for the occurrence to land — three parallel channels

Poll all three channels because the audit pulls evidence from whichever returns data. The exact polling commands per channel are in `references/payload-schemas.md`. Summary:

- **Crash path** (the synthetic crash and its session payload): `list_crashes` → `list_occurrences_tokens` → `get_occurrence_details`. If C1–C7 must run on the crash-path fallback (APM unavailable), immediately fetch `state.logs.compressed_logs.url` — the URL is time-limited.
- **Bug path** (the synthetic bug from `reportBugReport()`): `list_bugs` → `bug_details`. Fetch any non-empty archive URLs (`network_log`, `user_events`, etc.) immediately.
- **APM path** (iOS / Android only): `apm_list_groups` → `apm_group_view` → `apm_occurrence`.

**Filter every poll to the smoke window.** In shared dev workspaces an unfiltered list call returns lots of irrelevant rows; the harness marker narrows but still risks latching onto an older synthetic occurrence from a previous engineer's run. Pass `date_ms.gte = now - (recency_thresholds.fail_minutes × 60_000)` on `list_crashes` and `apm_list_groups` — the window matches `C0b`'s FAIL band so anything outside it would fail recency anyway. Per-channel filter args:

- **Crash**: `list_crashes(filters: { current_views: ["<marker_view>"], type: "CRASH", date_ms: { gte: <ts> } })`. Default `sort_by: last_occurred_at`, `direction: desc` — take the first group that matches, then page its tokens with `list_occurrences_tokens(number: <group.number>)` and apply `max(states_tokens)` (Phase 4d).
- **Bug**: `list_bugs(filters: { app_version: [<build_app_version>] })`. `list_bugs` exposes no `date_ms` or `current_views` filter; rely on the default `sort_by: reported_at`, `direction: desc`, take recent results, and client-side discard any whose `state.fields.current_view` doesn't match the marker.
- **APM**: `apm_list_groups(filters: { date_ms: { gte: <ts> }, app_version: [<build_app_version>] })`. APM also has no `current_views` filter; the date + app_version pair plus the harness's deterministic traffic shape (e.g. `fireNetworkBurst` against a known host) make the synthetic groups identifiable.

Poll every 5s for up to 90s per channel. If any channel lands, proceed with that evidence and SKIP missing-channel checks with a clear reason. Stop only if all three channels timeout — diagnostics on full timeout: was `flushNow()` actually called? Is the device offline? Is the dashboard `mode` correct for the build's backend? Did `forceCrash()` actually fire (check `adb logcat` / `xcrun simctl spawn ... log stream`)?

If mobile-mcp is available and `optional_integrations.mobile_mcp.screenshot_on_smoke_timeout: true`, capture a screenshot of the device at the moment of timeout and embed it in the report — useful diagnostic for "no occurrence landed" (was the screen blank? wrong activity? crash dialog overlay?). Similarly `screenshot_on_smoke_end: true` captures a screenshot when the smoke completes successfully, as proof of "harness was reachable and the build was installed correctly."

### 4d. Pick the right occurrence — `max(tokens)`

`list_occurrences_tokens` (crash) and `apm_occurrence` with `selector: list` (APM) can each return multiple tokens. In shared development workspaces where multiple engineers smoke against the same workspace concurrently, the audit must verify *this build's* synthetic occurrence — not someone else's.

The selection rule: sort the returned tokens **lexicographically descending** and take the first (max). ULIDs are time-prefixed, so `max(tokens) ≡ newest`. Aggregate-timestamp fields like `last_occurred_at` are group-level rollups that can lag ingest order; the ULID's embedded base32 timestamp is the authoritative chronology of the occurrence itself.

```
# pseudocode
tokens   = list_occurrences_tokens(...).tokens   # ordered however the API returns
selected = max(tokens)                            # lex-max == ULID-newest
detail   = get_occurrence_details(token=selected, ...)
```

Bugs are addressed by integer `number`, not ULID, so this rule doesn't apply on the bug channel. Detail: `references/payload-schemas.md` ("ULID structure and `max(tokens)` selection").

### 4e. Verify freshness — parse the ULID timestamp

Once the freshest occurrence is selected, verify it's *actually* fresh enough to represent this build's behavior. Parse the ULID's embedded timestamp (first 10 base32 chars, Crockford's alphabet — full recipe in `references/payload-schemas.md`) and compare against mode-dependent thresholds (`C0b` in `references/check-catalog.md`):

| Mode | WARN if older than | FAIL if older than |
| --- | --- | --- |
| `synthetic` (default) | 5 min | 30 min |
| `prod-canary` | 12h | 24h |

Customers running reuse-mode against an existing dev-tools surface can override per rule pack (`recency_thresholds: { warn_minutes, fail_minutes }`) — engineers often run the in-house trigger sequence minutes-to-hours before invoking the audit, so the synthetic defaults can be too tight.

Why parse the ULID rather than read `state.fields.reported_at`: the ULID timestamp is set at occurrence creation and is what the audit identifies the record by; `reported_at` is a separate field whose precision and timezone representation can vary. Parsing the ULID is deterministic.

## 5. Audit

The audit runs every rule in the merged rule pack (base + customer) against the captured payload. Each rule produces exactly one row in the report with a status, evidence string, and (on failure) a remediation pointer.

Full rule catalog with evidence sources per channel is in `references/check-catalog.md`. The status taxonomy (PASS / FAIL / WARN / INFO / SKIP / MANUAL / DISABLED / N/A) is also there. Key principles:

- **Cite the MCP tool result that produced each piece of evidence.** No paraphrasing, no fabrication. If the evidence comes from a presigned-URL archive, cite the archive name and the parsed line range.
- **Empty evidence is never PASS.** A missing field or empty array is SKIP with reason "evidence field missing," not silent pass. Auto-passing missing data masks integration regressions — exactly the kind of failure mode this skill exists to catch.
- **`DISABLED` is not `FAIL`.** A feature turned off at the workspace level (e.g. `user_steps` disabled by dashboard policy) is intentional configuration, not a regression. Surface as `DISABLED` with the source ("workspace policy" or "rule pack"). FAILing on intentional disables produces false-positive release blocks. See `references/check-catalog.md` for detection heuristics.
- **A single FAIL blocks the release.** MANUAL items do not block automatically but appear at the top of the report.
- **Channel preference for C1–C7 / S2 / P1 / C9: APM > Bug > Crash.** APM exposes per-request structured data; the bug payload splits logs into typed archives (`network_log`, `user_events`, `instabug_log`); the crash payload bundles everything into one archive that requires disambiguating parsing.

### Input from Phase 2 (static audit)

When the default invocation runs both static + runtime, Phase 2's findings shape Phase 5's rule evaluation. Before evaluating each rule whose evidence depends on a specific SDK module, the runtime audit consults Phase 2's `S-MODULE-*` findings:

- **`S-MODULE-<x> DISABLED`** (module turned off in source) → every dependent runtime rule emits `SKIP` with reason `"module disabled in source (S-MODULE-<x> at <file>:<line>)"`. The cross-link makes the cause traceable without re-deriving it from the empty payload.
- **`S-MODULE-<x> INFO`** (default-ON, no explicit toggle) → runtime rules run normally; the static finding is the static-side affirmation and the runtime finding is the behavioural confirmation.
- **`S-MODULE-<x> FAIL`** (module expected per rule pack but pattern absent) → runtime rules still run, but the report flags the static finding at the top so the customer sees the misconfiguration before reading runtime detail.

`--runtime`-only invocations skip this coordination because there is no Phase 2 input. `--static`-only invocations stop after Phase 2; no runtime rules to coordinate with.

## 6. Report and drift detection

### 6a. Render

Two artifacts:
- `luciq-verify-report.html` — colored status pills, expandable evidence rows, network audit table, occurrences list. Format matches the customer-screenshot style.
- `luciq-verify-report.md` — same content, plain Markdown, for PR comments and CI logs.

Both include: summary bar (counts per status); test environment block (slug, mode, app version, backend host, bundle ID, SDK version); selected occurrence block (type, number, ULID, reported timestamp, current_view); APM coverage block when available; verification checks table (every rule, status, evidence, source channel); network log audit table (full table for successful redaction; failed rows excluded with stated count); occurrences list (crash + bug IDs in the smoke window); user attributes; experiments.

A single FAIL is highlighted at the top. MANUAL rows are also surfaced at top.

### 6b. Drift detection (always runs)

Compare the observed payload to the declared rule pack and produce a "Rule-pack drift" appendix proposing pack updates as a unified diff. Categories and proposal semantics are in `references/rule-pack-format.md` ("Drift detection"). The user accepts, rejects, or edits per hunk — never auto-edit `luciq-verify.yaml`.

## Modes

Two run modes are supported. Default is synthetic. Production canary requires explicit invocation.

| Mode | When | What changes |
| --- | --- | --- |
| **synthetic** (default) | Pre-release SDK upgrade verification | Smoke phase runs; harness produces a fresh occurrence; recency window is 5 min; MCP `mode` is whichever non-prod value matches the build's backend |
| **prod canary** | Day-1 of a staged rollout, audit real-user traffic from the new SDK | Smoke phase is skipped; the skill audits the most recent occurrence with the new SDK version from MCP `mode: production`; `S*` rules SKIP; recency window is 24h; PII findings are **release-blocking** even without a synthetic FAIL. Adds an explicit SDK-version regression diff via `crash_patterns` across all six `pattern_key` values: `app_versions` (primary), `oses`, `devices`, `current_views`, `app_status`, `experiments`. Same APM diff via `apm_list_groups` filtered by `app_version: [<baseline>, <new>]` and ranked by `apdex_change desc`. |

Prod canary mode is invoked explicitly: `--mode=prod-canary`. The skill surfaces a top-banner warning in the report that this is production telemetry. The "prod backend" pre-flight refusal is inverted in this mode — prod *is* the target — but every other refusal still applies.

## Invocation flags

Orthogonal to audit mode. Default invocation runs every phase; flags trim scope when only part of the audit is needed.

| Flag | Phases run | When to use |
| --- | --- | --- |
| (none — default) | 0, 1, 2, 3, 4, 5, 6 | Full audit. Static config inspection + runtime smoke + MCP-driven runtime audit, combined into one report. The intended path for SDK upgrades. |
| `--static` | 0, 1, 2, 6 | Static config inspection only. No smoke, no MCP. Useful as a precondition check before upgrade, or anytime the user wants a snapshot of "is my integration wired correctly" without driving the device. |
| `--runtime` | 0, 1, 3, 4, 5, 6 | Skip the static phase; go straight from setup to pre-flight + smoke + runtime audit. Useful when the user has already validated static config and only wants the upgrade-emission audit. |

Combine with audit mode as needed: `luciq-verify --static` runs static-only synthetic mode; `luciq-verify --runtime --mode=prod-canary` skips static and audits prod telemetry. `--static --mode=prod-canary` is an error (static doesn't read telemetry, so the mode flag has nothing to apply to) — surface the conflict and stop.

## Out of scope

Grounded in what Luciq's MCP exposes today; the skill deliberately does not:

- Audit metrics that are aggregate-only on the dashboard (crash-free session rate, MTTR, retention). The audit is per-occurrence behavioral, not statistical.
- Compute "is this string PII" via LLM judgment alone. Customer PII regex is the source of truth; the skill suggests candidates only.
- Run real UI tests (Espresso / XCUITest). The smoke is a single deep-link launch + canonical trigger sequence. Broader scenario coverage belongs in customer-owned UI tests that feed additional triggers into the harness, not in this skill.
- Modify the customer's actual integration code (redaction callbacks, URL rewriters, attribute setters). The skill edits the debug variant's harness scaffolding and the rule pack only.
- Verify on `mode: production` without explicit `prod-canary` invocation.

When new MCP tools land (APM Flows, release comparison, session replay), this skill grows with them. Until then, gaps surface as `MANUAL`.

## Style

- Show diffs before applying any code edit (harness scaffold, harness regeneration, rule-pack updates).
- Confirm before running `pod install`, gradle syncs, build commands, or smoke triggers that install / launch the app.
- Cite the MCP tool result that produced each piece of evidence in the audit. Don't paraphrase. Don't fabricate.
- Render the report in both HTML and Markdown.
- Hold the full identifier (crash: `(slug, mode, number, ulid)`; bug: `(slug, mode, number)`; APM: `(slug, mode, metric, group_uuid|group_url, token)`) end-to-end. Partial identifiers cross-contaminate.
- Verify SDK API signatures against the live guides. Verify response field shapes against an actual response when the references say "verify live."
- Refuse production-backend audits except in explicit `prod-canary` mode.

## Red Flags — patterns that mean STOP and surface to the user

These are the failure modes that produce a misleading "PASS" report. If you catch yourself reasoning in any of these directions, surface to the user and don't proceed.

**Environment and pre-flight**
- "The lockfile pins the old SDK version but I assume the user already bumped it locally." Don't assume — read the lockfile. A stale lockfile means the audit verifies the wrong build.
- "Pre-flight says the build is pointing at the prod backend, but it's a debug build so it's probably fine." It isn't. A debug build hitting prod can leak real PII into the audit payload.
- "I'll query `mode: production` because the user said 'production app'." They probably mean the production build variant for testing, not real prod telemetry. Confirm; default to a non-prod `mode`.

**Channel and identifier confusion**
- "I'll filter `list_crashes` by `platform: flutter` and got nothing — the integration must be broken." Wrong call shape. Crash filters use UPPERCASE platform values (`DART` for Flutter, `JAVASCRIPT` for RN). The lowercase form is only for `list_applications`. Re-run before concluding anything.
- "I queried `apm_group_view` with `experiments: [<x>]` and it errored." The APM filter is singular (`experiment`); the crash filter is plural (`experiments`). They are not aliases.
- "This is a Flutter project so I'll probe APM and degrade if it fails." Don't probe. APM's platform enum is `ios | android` — DART / JAVASCRIPT is permanently `N/A`. Set the channel to N/A in Phase 0.
- "I'll use the same `(slug, mode, number, ulid)` identifier for the bug." Bugs are addressed by `(slug, mode, number)` only — there is no ULID. The bug-side identifier is `state_number` (integer) inside `state.fields`.

**Channel-precedence and data shape**
- "Both crash channel and APM channel returned data — I'll just use the crash one." Reversed preference. Prefer APM > Bug > Crash for C1–C7. APM is the richer typed source; the fallback exists for accounts without APM, not as a default.
- "`get_occurrence_details` returned no `network_log` field — I'll FAIL the network checks." The crash payload does not carry network logs inline; they live at the presigned URL `state.logs.compressed_logs.url`. Fetch + decompress + parse. If `is_empty_array: true`, SKIP with reason "no log archive captured."
- "I'll look for `experiments` under `state.logs` on the bug payload." On bugs, `experiments` is at the **root** (sibling of `state`), not nested under `state.logs`. Different shape from crash.
- "I'll fetch the `compressed_logs.url` later when I render the report." Don't defer. The URL is presigned with an `Expires=` param — fetch immediately. Late fetches return 403.
- "The `os` field shows `iOS 26.1` so I'll match it against the platform filter `IOS`." Type confusion. `state.fields.os` is a combined human-readable string, not a platform enum.

**Empty evidence and false positives**
- "MCP returned empty for the network log — I'll mark the redaction checks PASS because nothing is there to leak." Empty evidence is never PASS. Mark SKIP with the reason and tell the user the smoke probably didn't generate network traffic.
- "The payload has no `user_steps` key at all — I'll FAIL the user-steps checks." Could be workspace policy (`user_steps` disabled by dashboard). Mark `DISABLED` with reason `"workspace policy: user_steps disabled"` rather than FAIL. Same logic for any feature whose entire payload key is absent rather than empty — absence-of-key often means "feature off at workspace level," empty-array means "feature on, no data captured this run."
- "The non-2xx response bodies are not redacted but C3b says response bodies should be redacted." C3b excludes failed responses by design — error bodies are intentionally captured for diagnostics. Re-read the rule.
- "`state.fields.user_attributes` is `{}` so the customer's integration is broken." Maybe — but `{}` could also mean the harness didn't call `setTestPersona()`, or the customer's app doesn't set user attributes for this code path. FAIL only when `attributes.user.required` is non-empty AND a required key is missing AND the harness was supposed to set it.
- "I see strings that look like emails in user steps — I'll auto-add an email regex to the PII rule pack." PII regexes require user approval. Auto-additions create permanent false alarms.
- "I'll auto-infer the custom-attribute slot mapping from observed traffic." Slot config is org-wide dashboard configuration, not telemetry. A wrong mapping creates permanent silent false positives. Prompt the user.

**Tool-call errors**
- "APM returned a 4xx with `{error: ...}` — I'll raise and STOP." The MCP forwards 4xx and 501 as a tool response body. Inspect the JSON, mark APM-dependent checks SKIP, continue. Stop only on 5xx (raised as `StandardError`).
- "APM tools returned 'tool not found' — I'll FAIL the network checks." Missing tools is SKIP with reason "apm tools unavailable on this account," fallback to bug / crash channel.
- "`crash_patterns` returned `MCP error -32603: Internal error` — STOP and bail." It's observably flaky. Retry once. On repeated failure, mark the prod-canary regression-diff step SKIP and continue. Don't infer "no regression" from a tool failure.

**Workflow shortcuts**
- "The harness occurrence didn't land within the poll window, but there's an older occurrence from yesterday — I'll audit that one." Recency exists so the audit verifies *this build's* behavior. Surface the timeout.
- "Drift detection found a new attribute key — I'll add it to the rule pack and commit." Never auto-commit rule-pack changes. Propose the diff; commit only on user approval.
- "The customer's rule pack disagrees with the base pack on a header name — I'll trust the base pack." Wrong. Customer overrides always win — they're authoritative for the integration.
- "Synthetic mode is failing because the user only has prod telemetry — I'll silently switch to prod canary." Mode switches are user-invoked. Recommend explicitly; wait for the flag.
- "I'll add the harness deep-link intent filter to the main `AndroidManifest.xml` because the debug merge wasn't working." The intent filter must live in `src/debug/`. A release-variant deep link is a remote-crash vector.
- "I'll generate the harness file into `src/main/` because the project has no debug source set yet." Stop, tell the user their project needs a debug source set, let them create it. The skill does not invent build-variant separation.
- "The verification report says PASS but one rule is INFO with a slightly off value — close enough." INFO is not PASS. If the rule should assert, change its status. Otherwise leave it INFO and don't claim PASS as the summary.
- "I'll only call `reportBugReport()` if the customer opts in — it might pollute their dashboard." The bug record is in staging (per pre-flight) and tagged with the harness marker — that's exactly the kind of synthetic signal the dashboard is meant to receive. Run it every smoke; document the bug number in the report for cleanup.

Every shortcut here trades "looks verified" for "actually verified." The skill's job is to actually verify.
