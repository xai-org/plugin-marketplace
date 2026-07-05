# Flutter Extractors

Per-file scan recipe for Flutter projects in Phase 2 (static audit). Static-only check; runtime audit on Flutter projects uses the bug + crash channels because APM is permanently `N/A` on Flutter (see `payload-schemas.md`).

## Table of contents

1. [Scan plan](#scan-plan)
2. [`pubspec.yaml`](#pubspecyaml)
3. [Dart source (`*.dart`)](#dart-source-dart)
4. [Anti-patterns to flag](#anti-patterns-to-flag)

## Scan plan

| File | Role |
| --- | --- |
| `pubspec.yaml` | Package declaration + pinned version |
| `pubspec.lock` | Resolved version (cross-reference) |
| `**/*.dart` | Source: init, modules, invocation, masking, identity, flags, logging |

Skip directories: `.git/`, `build/`, `.dart_tool/`, `ios/`, `android/` (those are scanned by their respective platform extractors when the project is hybrid).

## `pubspec.yaml`

### Dependency detection (`S-INSTALL-001`, `S-INSTALL-002`)

Look for the Luciq Flutter package in `dependencies:` or `dev_dependencies:`:

```yaml
dependencies:
  luciq_flutter: ^X.Y.Z
```

Legacy: `instabug_flutter` (during migration).

Emits:
- `S-BUILD-FLUTTER PASS` if `pubspec.yaml` is present at scan root
- `S-INSTALL-001 PASS` if `luciq_flutter` or `instabug_flutter` declared
- `S-INSTALL-002` per rule-pack `expected_sdk_version` cross-check (parsed from `pubspec.lock` for the resolved version)
- `S-INSTALL-004 WARN` if both `luciq_flutter` and `instabug_flutter` are declared — message: `"both Luciq and legacy Instabug packages declared in pubspec.yaml; if you're mid-migration, run luciq-migrate to finish the rename. Long-term coexistence is not supported."`

## Dart source (`*.dart`)

### SDK init (`S-INSTALL-003`)

Patterns:
- `Luciq.start(`
- `Luciq.start( token:`
- `await Luciq.start(`

Look for `await` keyword on the surrounding line — Flutter init is async; missing `await` is `WARN`.

### Module toggles (`S-MODULE-*`)

| Module | Patterns |
| --- | --- |
| Bug Reporting | `BugReporting.setEnabled`, `BugReporting.setState`, `Luciq.setBugReportingEnabled` |
| Crash Reporting | `CrashReporting.setEnabled`, `CrashReporting.setState`, `Luciq.setCrashReportingEnabled` |
| APM | `APM.setEnabled` (subset support — APM is mostly auto-instrumented on Flutter) |
| Session Replay | `SessionReplay.setNetworkLogsEnabled`, `SessionReplay.setUserStepsEnabled`, `SessionReplay.setLuciqLogsEnabled` |
| Network Logs | `NetworkLogger.disable`, `NetworkLogger.enable` |
| Surveys | `Surveys.setEnabled` |
| Replies | `Replies.setEnabled` |
| Feature Requests | `FeatureRequests.setEnabled` |

### Invocation events (`S-INVOKE-*`)

Patterns:
- `setInvocationEvents:` (named arg in `Luciq.start`)
- `InvocationEvent.shake`, `InvocationEvent.screenshot`, `InvocationEvent.floatingButton`, `InvocationEvent.twoFingersSwipeLeft`, `InvocationEvent.none`

### Identity + attributes (`S-IDENTITY-*`)

| Code | Patterns |
| --- | --- |
| `S-IDENTITY-USER` | `Luciq.identifyUser`, `Luciq.setUserData` |
| `S-IDENTITY-LOGOUT` | `Luciq.logOut` |
| `S-IDENTITY-ATTR` | `Luciq.setUserAttribute`, `Luciq.removeUserAttribute`, `Luciq.getUserAttributeForKey` |
| `S-IDENTITY-CDATA` | `Luciq.setUserData(` |

### Feature flags (`S-FLAG-*`)

Flutter SDK exposes the full feature-flag API (verified):

| Code | Patterns |
| --- | --- |
| `S-FLAG-ADD` | `Luciq.addFeatureFlag`, `Luciq.addFeatureFlags` |
| `S-FLAG-REMOVE` | `Luciq.removeFeatureFlag`, `Luciq.removeFeatureFlags` |
| `S-FLAG-CLEAR` | `Luciq.removeAllFeatureFlags`, `Luciq.clearAllFeatureFlags` |

### Custom logging (`S-LOG-*`)

| Code | Patterns |
| --- | --- |
| `S-LOG-API` | `Luciq.logVerbose(`, `Luciq.logInfo(`, `Luciq.logWarn(`, `Luciq.logError(`, `Luciq.logDebug(`, `LuciqLog.logVerbose(` etc. |
| `S-LOG-USEREVENT` | `Luciq.logUserEvent(` |

### Masking config (`S-MASK-*`)

| Code | Patterns |
| --- | --- |
| `S-MASK-SCREEN` | `setReproStepsConfig`, `setSessionsSyncCallback`, `PrivateView` widget usage |
| `S-MASK-CALLBACK` | `NetworkLogger.setObfuscateLogCallback`, `NetworkLogger.setOmitLogCallback` |

### Route wrapping (informational)

`MaterialApp` typically wraps with `LuciqNavigatorObserver` for screen-loading APM. If the customer uses `MaterialApp.router` (Navigator 2.0), they need the observer wired through `routerDelegate`. Detection:

- `LuciqNavigatorObserver` referenced in `*.dart` → `INFO`
- Absence with route-based app → `INFO` "screen-loading APM may be partial without LuciqNavigatorObserver"

## Anti-patterns to flag

| Anti-pattern | Detection | Status |
| --- | --- | --- |
| `Luciq.start` without `await` | Init call not preceded by `await` on the same / previous line | `WARN` |
| Init in `main()` after `runApp()` | Init must precede `runApp` to capture early errors | `WARN` |
| Token in source (vs. read from env / `--dart-define`) | Long string literal as first positional arg to `Luciq.start` | `WARN` masked in report |
| Both `luciq_flutter` and `instabug_flutter` declared | Both packages in `pubspec.yaml` dependencies | `WARN` — run `luciq-migrate` to finish the rename if mid-migration; long-term coexistence is unsupported |
| Module disabled in release mode source path | `setXEnabled(false)` outside any `kDebugMode` guard | `INFO` surface for review |
