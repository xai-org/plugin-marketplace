# React Native Extractors

Per-file scan recipe for React Native projects in Phase 2 (static audit). Static-only check; runtime audit on RN projects uses the bug + crash channels because APM is permanently `N/A` on JAVASCRIPT (see `payload-schemas.md`).

## Table of contents

1. [Scan plan](#scan-plan)
2. [`package.json`](#packagejson)
3. [JS/TS source (`*.{js,jsx,ts,tsx}`)](#jsts-source-jsjstsxtsx)
4. [Native side cross-references](#native-side-cross-references)
5. [Anti-patterns to flag](#anti-patterns-to-flag)

## Scan plan

| File | Role |
| --- | --- |
| `package.json` | Package declaration + pinned version |
| `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml` | Resolved version (cross-reference) |
| `**/*.js`, `*.jsx`, `*.ts`, `*.tsx` | Source: init, modules, invocation, masking, identity, flags, logging |
| `metro.config.js` / `babel.config.js` | Informational — bundler config |

Skip directories: `.git/`, `node_modules/`, `ios/` (iOS extractor handles), `android/` (Android extractor handles), `build/`, `dist/`. Bytes-only files (`.png`, fonts, compiled artifacts) are never read.

## `package.json`

### Dependency detection (`S-INSTALL-001`, `S-INSTALL-002`)

Look in `dependencies` for the Luciq RN package:

- Current: `@luciq/react-native` or `luciq-react-native`
- Legacy: `instabug-reactnative` (during migration)

Cross-reference with lockfile for the actual resolved version.

Emits:
- `S-BUILD-RN-NPM` / `S-BUILD-RN-YARN` / `S-BUILD-RN-PNPM PASS` based on which lockfile is present
- `S-INSTALL-001 PASS` if Luciq package declared
- `S-INSTALL-002` per rule-pack `expected_sdk_version` cross-check (resolved from lockfile)
- `S-INSTALL-004 WARN` if both Luciq and legacy `instabug-reactnative` declared — message: `"both Luciq and legacy Instabug packages declared in package.json; if you're mid-migration, run luciq-migrate to finish the rename. Long-term coexistence is not supported."`

## JS/TS source (`*.{js,jsx,ts,tsx}`)

### SDK init (`S-INSTALL-003`)

Patterns:
- `Luciq.start(`
- `Luciq.start({` (object-arg form)
- `import Luciq from '@luciq/react-native'` / `from 'luciq-react-native'`

Init typically lives in `App.tsx` / `App.js` or `index.js`. Note the entry point so the init position relative to `AppRegistry.registerComponent(...)` can be checked — init must run before component registration to capture early JS errors.

### Module toggles (`S-MODULE-*`)

| Module | Patterns |
| --- | --- |
| Bug Reporting | `BugReporting.setEnabled`, `BugReporting.setOptions`, `Luciq.setBugReportingEnabled` |
| Crash Reporting | `CrashReporting.setEnabled`, `CrashReporting.sendJSCrash`, `CrashReporting.reportError` |
| APM | `APM.setEnabled` (subset support — RN APM is auto-instrumented for screen loading + flows) |
| Session Replay | `SessionReplay.setNetworkLogsEnabled`, `SessionReplay.setUserStepsEnabled`, `SessionReplay.setLuciqLogsEnabled` |
| Network Logger | `NetworkLogger.setEnabled`, `NetworkLogger.setRequestFilterExpression` |
| NDK | `CrashReporting.setNDKCrashesEnabled` |
| Surveys | `Surveys.setEnabled` |
| Replies | `Replies.setEnabled` |
| Feature Requests | `FeatureRequests.setEnabled` |

### Invocation events (`S-INVOKE-*`)

Patterns:
- `invocationEvents:` (object key in `Luciq.start({invocationEvents: [...]})`)
- `InvocationEvent.shake`, `InvocationEvent.screenshot`, `InvocationEvent.floatingButton`, `InvocationEvent.twoFingersSwipeLeft`, `InvocationEvent.none`

### Identity + attributes (`S-IDENTITY-*`)

| Code | Patterns |
| --- | --- |
| `S-IDENTITY-USER` | `Luciq.identifyUser`, `Luciq.setUserData` |
| `S-IDENTITY-LOGOUT` | `Luciq.logOut`, `Luciq.logoutUser` |
| `S-IDENTITY-ATTR` | `Luciq.setUserAttribute`, `Luciq.removeUserAttribute`, `Luciq.getUserAttribute` |
| `S-IDENTITY-CDATA` | `Luciq.setUserData(` |

### Feature flags (`S-FLAG-*`)

RN SDK exposes the full feature-flag API (verified):

| Code | Patterns |
| --- | --- |
| `S-FLAG-ADD` | `Luciq.addFeatureFlag`, `Luciq.addFeatureFlags` |
| `S-FLAG-REMOVE` | `Luciq.removeFeatureFlag`, `Luciq.removeFeatureFlags` |
| `S-FLAG-CLEAR` | `Luciq.removeAllFeatureFlags`, `Luciq.clearAllFeatureFlags` |

### Custom logging (`S-LOG-*`)

| Code | Patterns |
| --- | --- |
| `S-LOG-API` | `Luciq.logVerbose(`, `Luciq.logInfo(`, `Luciq.logWarn(`, `Luciq.logError(`, `Luciq.logDebug(` |
| `S-LOG-USEREVENT` | `Luciq.logUserEvent(` |

### Masking config (`S-MASK-*`)

| Code | Patterns |
| --- | --- |
| `S-MASK-NETWORK` | `NetworkLogger.setRequestFilterExpression`, `NetworkLogger.setObfuscateLogCallback` |
| `S-MASK-SCREEN` | `SessionReplay.setSyncCallback` (return value controls capture) |
| `S-MASK-CALLBACK` | `NetworkLogger.setObfuscateLogCallback`, `setOmitLogCallback` |

### Module toggle state detection

Look for `Luciq.start({ ... initEnabled: false, ... })` and similar named args in the init object — those are the canonical way to disable a module from the get-go on RN.

## Native side cross-references

RN projects are hybrid. The static audit invokes the iOS extractor on the `ios/` folder and the Android extractor on the `android/` folder if those subfolders exist. RN-specific findings are merged with native findings under the same S-* codes.

Hybrid project anti-patterns:
- iOS or Android side has Luciq init but RN side doesn't (or vice versa) — `WARN` "init found on native side but not in JS — telemetry won't capture JS errors"
- Different SDK versions across iOS / Android / JS — `WARN` per version-skew detected

## Anti-patterns to flag

| Anti-pattern | Detection | Status |
| --- | --- | --- |
| `Luciq.start` after `AppRegistry.registerComponent` | Init runs too late; misses early errors | `WARN` |
| `Luciq.start` inside `if (__DEV__) { ... }` only | Release bundle won't initialize | `FAIL` (unless project is explicitly debug-only) |
| Token in source | Long string literal as `token:` value | `WARN` masked in report |
| Both `@luciq/react-native` AND `instabug-reactnative` in deps | Migration coexistence | `WARN` — run `luciq-migrate` to finish the rename if mid-migration; long-term coexistence is unsupported |
| Native + JS version skew | iOS / Android / JS Luciq versions don't match | `WARN` |
| Module disabled at init in production | `bugReportingEnabled: false` etc. without env guard | `INFO` surface for review |
