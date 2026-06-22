# Static Checks Catalog

The S-* code catalog Phase 2 (static audit) uses. Companion to `check-catalog.md` (runtime audit E/C/P/A codes). Every check declared here is a finding the agent emits during Phase 2.

## Table of contents

1. [Status taxonomy](#status-taxonomy)
2. [SDK install + version (`S-INSTALL-*`)](#sdk-install--version-s-install-)
3. [Module activation (`S-MODULE-*`)](#module-activation-s-module-)
4. [Invocation events (`S-INVOKE-*`)](#invocation-events-s-invoke-)
5. [Identity + attributes (`S-IDENTITY-*`)](#identity--attributes-s-identity-)
6. [Feature flags (`S-FLAG-*`)](#feature-flags-s-flag-)
7. [Custom logging (`S-LOG-*`)](#custom-logging-s-log-)
8. [Masking / privacy config (`S-MASK-*`)](#masking--privacy-config-s-mask-)
9. [dSYM / mapping upload (`S-SYMBOL-*`)](#dsym--mapping-upload-s-symbol-)
10. [Build system (`S-BUILD-*`)](#build-system-s-build-)
11. [Privacy view modifiers (`S-PRIVACY-*`)](#privacy-view-modifiers-s-privacy-)
12. [Platform applicability matrix](#platform-applicability-matrix)

## Status taxonomy

Same eight statuses as runtime audit (see `check-catalog.md`). Static-specific notes:

- `PASS` — pattern found and matches expectations (where applicable)
- `FAIL` — required pattern missing, or anti-pattern present
- `WARN` — pattern present but suboptimal (e.g. default value, deprecated API)
- `INFO` — informational signal; not an assertion
- `SKIP` — file class absent from the project so the check can't run (e.g. no `.swift` files in an Android-only repo)
- `DISABLED` — rule pack explicitly turns the check off
- `N/A` — check doesn't apply on this platform (see applicability matrix below)
- `MANUAL` — finding requires human verification (e.g. "tokens detected; verify scope")

Findings cite **file path + 1-indexed line range** as evidence. Matched text is omitted unless the matched substring is a known-safe identifier (an API name, a module name, etc.). Tokens, secrets, URLs, and contiguous source regions are never quoted.

## SDK install + version (`S-INSTALL-*`)

| Code | Check | Evidence |
| --- | --- | --- |
| `S-INSTALL-001` | SDK declared in the platform's package manifest | iOS: `Podfile` / `Package.resolved` / `Cartfile.resolved` line; Android: `build.gradle`(`.kts`) line; Flutter: `pubspec.yaml` line; RN: `package.json` line |
| `S-INSTALL-002` | Installed version matches `expected_sdk_version` from rule pack (when set) | Manifest line + parsed version |
| `S-INSTALL-003` | SDK init call site found (`Luciq.start*`, `Luciq.Builder().build()`, etc.) | File path + line of init call |
| `S-INSTALL-004` | No legacy Instabug references coexist with Luciq (relevant during migration) | Files containing `import Instabug` or equivalent |

## Module activation (`S-MODULE-*`)

Per-module toggles. Most modules default ON when the SDK is installed; defaults are platform-specific (see each row's `Default` column below and verify against the live integration guide if uncertain — defaults can change between SDK versions).

When no toggle pattern is found in source for a default-ON module, the audit emits `INFO` ("no explicit toggle in source; assumed default-ON — runtime audit confirms"), not `PASS` — static analysis alone cannot confirm runtime behaviour. A toggle pattern set to `false` emits `DISABLED` with the file:line citation. The runtime audit then cross-checks: an `S-MODULE-<x> DISABLED` finding causes every dependent `C*` rule to `SKIP` with reason `"module disabled in source (S-MODULE-<x> at <file>:<line>)"` — see `SKILL.md` Phase 5 for the coordination mechanism.

| Code | Module | Default | Toggle pattern |
| --- | --- | --- | --- |
| `S-MODULE-BR` | Bug Reporting | ON | `BugReporting.enabled`, `Luciq.setBugReportingEnabled`, `BugReporting.setState` |
| `S-MODULE-CRASH` | Crash Reporting | ON | `CrashReporting.enabled`, `Luciq.setCrashReportingEnabled` |
| `S-MODULE-APM` | APM | ON | `APM.enabled`, `Luciq.setAPMEnabled` |
| `S-MODULE-SR` | Session Replay | ON | `SessionReplay.setState`, `Luciq.setSessionReplayEnabled` |
| `S-MODULE-NLG` | Network Logs | ON | `NetworkLogger.enabled`, `Luciq.setNetworkLogging` |
| `S-MODULE-USTEPS` | User Steps | ON | `Luciq.trackUserSteps` |
| `S-MODULE-ANR` | ANR Monitor | ON | `CrashReporting.appHangEnabled`, `Luciq.setANRMonitorEnabled` |
| `S-MODULE-OOM` | OOM Monitor | ON | iOS only — `CrashReporting.setOOMReportingEnabled` |
| `S-MODULE-NDK` | NDK | OFF | Android only — `LuciqNDK.init()` or NDK gradle dependency |
| `S-MODULE-SURVEYS` | Surveys | ON | `Surveys.enabled`, `Luciq.setSurveysEnabled` |
| `S-MODULE-REPLIES` | Replies | ON | `Replies.enabled`, `Luciq.setRepliesEnabled` |
| `S-MODULE-FR` | Feature Requests | ON | `FeatureRequests.enabled` |
| `S-MODULE-FRESTART` | Force Restart | ON | iOS only — `CrashReporting.forceRestartEnabled` |
| `S-MODULE-NETMASK` | Network Auto-Masking | ON | `Luciq.setNetworkAutoMaskingState` |

## Invocation events (`S-INVOKE-*`)

| Code | Check | Evidence |
| --- | --- | --- |
| `S-INVOKE-001` | At least one invocation event configured | `Luciq.start(... invocationEvents:)`, `LuciqInvocationEvent.*` |
| `S-INVOKE-002` | No conflicting invocations (e.g. both `none` AND a real event in different code paths) | Multiple init call sites with mismatched events |
| `S-INVOKE-PROG` | Programmatic invocation present | `Luciq.show(`, `Luciq.invoke(`, `BugReporting.show(`, `BugReporting.invoke(` |
| `S-INVOKE-NONE` | Invocation explicitly `none` | `.none` in invocation event setter |

Supported event values: `shake`, `screenshot`, `floatingButton`, `twoFingersSwipeLeft`, `twoFingersSwipe`, `rightEdgePan`, `none`.

## Identity + attributes (`S-IDENTITY-*`)

| Code | Check | Evidence |
| --- | --- | --- |
| `S-IDENTITY-USER` | User identification call site present | `Luciq.identifyUser`, `Luciq.setUserData` |
| `S-IDENTITY-LOGOUT` | User logout hook present | `Luciq.logOutUser` |
| `S-IDENTITY-ATTR` | User attribute APIs in use | `addUserAttribute`, `setUserAttribute`, `userData` property |
| `S-IDENTITY-CDATA` | Custom data APIs in use | `setCustomData`, `Luciq.userData` |

## Feature flags (`S-FLAG-*`)

| Code | Check | Evidence |
| --- | --- | --- |
| `S-FLAG-ADD` | `addFeatureFlag(s)` call sites | matched pattern in source |
| `S-FLAG-REMOVE` | `removeFeatureFlag(s)` call sites | matched pattern |
| `S-FLAG-CLEAR` | `removeAllFeatureFlags` / `clearAllFeatureFlags` call sites | matched pattern |
| `S-FLAG-CHECK` | `checkFeatures` call sites | matched pattern |

## Custom logging (`S-LOG-*`)

| Code | Check | Evidence |
| --- | --- | --- |
| `S-LOG-API` | Custom log API in use | `Luciq.log*`, `LCQLog.log*`, ObjC macros `LCQLogInfo`, etc. |
| `S-LOG-USEREVENT` | User-event logging in use | `Luciq.logUserEvent(` |

## Masking / privacy config (`S-MASK-*`)

| Code | Check | Evidence |
| --- | --- | --- |
| `S-MASK-NETWORK` | Network auto-masking state | `setNetworkAutoMaskingState`, observed enum value |
| `S-MASK-SCREEN` | Screenshot/replay masking mode | `MaskingType.MEDIA`, `MaskingType.LABELS`, `setReplaceCapturedSensitiveData` |
| `S-MASK-HEADERS` | Sensitive headers list configured | Configuration of `Authorization`, `Cookie`, `X-API-Key`, `Set-Cookie` redaction in source |
| `S-MASK-CALLBACK` | Custom request/response masking callback present | `setNetworkLogRequestCompletionHandler` or equivalent |

## dSYM / mapping upload (`S-SYMBOL-*`)

iOS uses dSYMs; Android uses ProGuard/R8 mapping files. Both required for production crash symbolication.

| Code | Platform | Check | Evidence |
| --- | --- | --- | --- |
| `S-SYMBOL-IOS-UPLOAD` | iOS | dSYM upload shell script present | Detected file: `luciq_dsym_upload.sh` / `upload_symbols.sh` / `upload_dsym.sh` (or legacy `instabug.sh`) |
| `S-SYMBOL-IOS-PHASE` | iOS | Run-script build phase invokes the upload script | `project.pbxproj` shell-script phase referencing the upload script |
| `S-SYMBOL-IOS-DWARF` | iOS | Debug Information Format includes DWARF with dSYM | `project.pbxproj` `DEBUG_INFORMATION_FORMAT = dwarf-with-dsym` for Release |
| `S-SYMBOL-AND-PLUGIN` | Android | Luciq mapping upload Gradle plugin applied | `apply plugin: 'luciq.upload'` or KTS equivalent in `build.gradle` |
| `S-SYMBOL-AND-TOKEN` | Android | Mapping upload token configured | `luciqUpload { applicationToken = "…" }` block |

## Build system (`S-BUILD-*`)

| Code | Platform | Check | Evidence |
| --- | --- | --- | --- |
| `S-BUILD-IOS-SPM` | iOS | Swift Package Manager in use | `Package.resolved` present |
| `S-BUILD-IOS-PODS` | iOS | CocoaPods in use | `Podfile` (+ `Podfile.lock`) present |
| `S-BUILD-IOS-CART` | iOS | Carthage in use | `Cartfile` (+ `Cartfile.resolved`) present |
| `S-BUILD-AND-GROOVY` | Android | Gradle Groovy in use | `build.gradle` (non-`.kts`) present |
| `S-BUILD-AND-KTS` | Android | Gradle KTS in use | `build.gradle.kts` present |
| `S-BUILD-RN-NPM` | RN | npm-style lockfile present | `package-lock.json` |
| `S-BUILD-RN-YARN` | RN | Yarn lockfile present | `yarn.lock` |
| `S-BUILD-RN-PNPM` | RN | pnpm lockfile present | `pnpm-lock.yaml` |
| `S-BUILD-FLUTTER` | Flutter | Flutter pub | `pubspec.yaml` present |

Multiple results are valid (e.g. iOS project can ship SPM + Pods). FAIL only when the SDK is not findable in any detected manifest.

## Privacy view modifiers (`S-PRIVACY-*`)

iOS-only. Marks SwiftUI / UIKit views that should not be captured by Session Replay.

| Code | Check | Evidence |
| --- | --- | --- |
| `S-PRIVACY-SWIFTUI` | `.luciqPrivate()` view modifier usage | matched in `*.swift` |
| `S-PRIVACY-UIKIT` | UIKit equivalent privacy marker present | matched in `*.swift` / `*.m` |

## Platform applicability matrix

| Code family | iOS | Android | Flutter | React Native |
| --- | --- | --- | --- | --- |
| `S-INSTALL-*` | ✓ | ✓ | ✓ | ✓ |
| `S-MODULE-*` | most ✓ (no NDK) | most ✓ (no OOM, no FRESTART) | subset ✓ | subset ✓ |
| `S-INVOKE-*` | ✓ | ✓ | ✓ | ✓ |
| `S-IDENTITY-*` | ✓ | ✓ | ✓ | ✓ |
| `S-FLAG-*` | ✓ | ✓ | ✓ | ✓ |
| `S-LOG-*` | ✓ | ✓ | ✓ | ✓ |
| `S-MASK-NETWORK` | ✓ | ✓ | ✓ | ✓ |
| `S-MASK-SCREEN` | ✓ | ✓ | ✓ | ✓ |
| `S-SYMBOL-*` | iOS-specific ✓ | Android-specific ✓ | N/A | N/A |
| `S-BUILD-*` | iOS rows ✓ | Android rows ✓ | Flutter row ✓ | RN rows ✓ |
| `S-PRIVACY-*` | ✓ | N/A | N/A | N/A |

When a check's platform applicability is `N/A`, the audit emits the code with status `N/A` rather than omitting it — keeps the report shape stable across platforms.
