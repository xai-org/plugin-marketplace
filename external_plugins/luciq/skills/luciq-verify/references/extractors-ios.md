# iOS Extractors

Per-file scan recipe for iOS projects in Phase 2 (static audit). The agent uses these patterns with Read + Grep tools; no Python, no scanning daemon. Each subsection lists the file glob, the patterns to look for, and the S-* codes the patterns produce.

## Table of contents

1. [Scan plan](#scan-plan)
2. [Package manifests](#package-manifests)
3. [Source files (`*.swift`, `*.m`)](#source-files-swift-m)
4. [Xcode project + Info.plist](#xcode-project--infoplist)
5. [dSYM upload pipeline](#dsym-upload-pipeline)
6. [Privacy view modifiers](#privacy-view-modifiers)
7. [Anti-patterns to flag](#anti-patterns-to-flag)

## Scan plan

| File | Role |
| --- | --- |
| `Package.resolved` | SPM dependency lockfile (presence + Luciq version) |
| `Podfile`, `Podfile.lock` | CocoaPods declaration + lockfile |
| `Cartfile`, `Cartfile.resolved` | Carthage declaration + lockfile |
| `**/*.swift` | Source: init, modules, invocation, masking, identity, flags, logging, privacy modifiers |
| `**/*.m` | Objective-C source (init, ObjC log macros, ObjC module APIs) |
| `**/Info.plist` | Permission usage descriptions; Luciq does not require any but the presence is informational |
| `**/project.pbxproj` | Build phases (dSYM upload script invocation); `DEBUG_INFORMATION_FORMAT` for Release config |
| `luciq_dsym_upload.sh`, `upload_symbols.sh`, `upload_dsym.sh`, `instabug.sh` | Symbol upload scripts |

Read all of the above. Skip directories: `.git/`, `Pods/Headers/`, `DerivedData/`, `build/`, `*.xcframework/`, `.build/`. Bytes-only files (images, fonts, compiled binaries) are never read.

## Package manifests

### `Package.resolved` (Swift Package Manager)

Grep for `"location"` keys (case-sensitive) ending in known Luciq repository slugs: `luciq-ios-sdk`, `luciq-package` (and legacy `Instabug-SPM`). Adjacent `"version"` key holds the pinned semver.

Emits:
- `S-BUILD-IOS-SPM PASS` (file present at repo root or any subfolder)
- `S-INSTALL-001 PASS` if Luciq location found; `FAIL` if file present but no Luciq entry
- `S-INSTALL-002` if `expected_sdk_version` is set in rule pack: compare parsed `version` to expected; `PASS` / `FAIL` / `WARN` (patch mismatch)

### `Podfile` + `Podfile.lock`

Grep `Podfile` for `pod 'Luciq'` (single or double quotes). Pinned-version forms: `pod 'Luciq', '~> X.Y'` / `'X.Y.Z'` / `:git => '…', :tag => 'vX.Y.Z'`. Cross-reference `Podfile.lock` for the resolved version under `PODS:` → `- Luciq (X.Y.Z)`.

Emits:
- `S-BUILD-IOS-PODS PASS` if either file present
- `S-INSTALL-001 PASS` if `pod 'Luciq'` line found
- `S-INSTALL-002` per `expected_sdk_version` cross-check
- `WARN` if `Podfile.lock` is absent or out of sync with `Podfile`

### `Cartfile` + `Cartfile.resolved`

Grep `Cartfile` for `github "Instabug/Luciq"` or `git "https://…/luciq-ios-sdk"`. Resolved version lives in `Cartfile.resolved` as `vX.Y.Z`.

Emits:
- `S-BUILD-IOS-CART PASS` if either file present
- `S-INSTALL-001 PASS` if Luciq entry found

## Source files (`*.swift`, `*.m`)

### SDK init (`S-INSTALL-003`)

Patterns:
- `Luciq.start(withToken:`
- `Luciq.start(token:` (legacy / Swift 5.5+ keyword-stripped form)
- `[Luciq startWithToken:` (ObjC)

The line containing the match is the evidence. Multiple init sites is informational unless they pass different tokens (then `WARN`).

### Module toggles (`S-MODULE-*`)

Each toggle pattern below. The grep should be substring-anchored (not regex) because Swift / ObjC method call syntax varies. The detected value (`true` / `false`, or the boolean expression after the `=` sign on the same line) determines PASS / DISABLED.

| Module | Patterns (any match counts) |
| --- | --- |
| Bug Reporting | `Luciq.setBugReportingEnabled`, `BugReporting.enabled`, `BugReporting.setState`, `LCQBugReporting.enabled`, `BugReporting.promptOptionsEnabledReportTypes` |
| Crash Reporting | `Luciq.setCrashReportingEnabled`, `CrashReporting.enabled`, `CrashReporting.setState`, `LCQCrashReporting.enabled` |
| APM | `APM.enabled`, `APM.setState`, `Luciq.setAPMEnabled`, `LCQAPM.enabled` |
| Session Replay | `SessionReplay.setState`, `SessionReplay.enabled`, `Luciq.setSessionReplayEnabled`, `LCQSessionReplay.enabled` |
| Network Logs | `NetworkLogger.enabled`, `NetworkLogger.setEnabled`, `Luciq.setNetworkLogging` |
| User Steps | `Luciq.trackUserSteps`, `setUserStepsEnabled` |
| ANR Monitor | `CrashReporting.appHangEnabled`, `Luciq.setANRMonitorEnabled` |
| OOM Monitor | `CrashReporting.setOOMReportingEnabled` |
| Surveys | `Surveys.enabled`, `Luciq.setSurveysEnabled` |
| Replies | `Replies.enabled`, `Luciq.setRepliesEnabled` |
| Feature Requests | `FeatureRequests.enabled` |
| Force Restart | `CrashReporting.forceRestartEnabled` |
| Network Auto-Masking | `Luciq.setNetworkAutoMaskingState`, `NetworkLogger.setNetworkAutoMasking` |

If a pattern is absent for a default-ON module, emit `S-MODULE-<name> INFO` with reason `"no explicit toggle in source; assumed default-ON per integration guide — runtime audit confirms"`. Do not emit `PASS` from absence alone — static analysis can't confirm the runtime state of an unconfigured module. If a pattern is present with a `false` value, emit `DISABLED` (and note the file:line). See `static-checks-catalog.md` "Module activation" for the coordinated handoff to runtime rules.

### Invocation events (`S-INVOKE-*`)

Pattern (regex-friendly): `\.(shake|screenshot|floatingButton|twoFingersSwipeLeft|twoFingersSwipe|rightEdgePan|none)` adjacent to a known invocation API call (`Luciq.start(...invocationEvents:`, `Luciq.invocationEvents`).

Emits:
- `S-INVOKE-001 PASS` if at least one non-`none` event matched
- `S-INVOKE-NONE INFO` if `.none` matched
- `S-INVOKE-PROG INFO` if `Luciq.show(`, `Luciq.invoke(`, `BugReporting.show(`, or `BugReporting.invoke(` matched

### Identity + attributes (`S-IDENTITY-*`)

| Code | Patterns |
| --- | --- |
| `S-IDENTITY-USER` | `Luciq.identifyUser`, `Luciq.setUserData`, `Luciq.userData =` |
| `S-IDENTITY-LOGOUT` | `Luciq.logOutUser` |
| `S-IDENTITY-ATTR` | `Luciq.addUserAttribute`, `Luciq.setUserAttribute` |
| `S-IDENTITY-CDATA` | `Luciq.setCustomData`, `Luciq.userData` (property syntax) |

### Feature flags (`S-FLAG-*`)

| Code | Patterns |
| --- | --- |
| `S-FLAG-ADD` | `Luciq.addFeatureFlag`, `Luciq.addFeatureFlags`, `Luciq.add(featureFlag` (Swift named-arg form) |
| `S-FLAG-REMOVE` | `Luciq.removeFeatureFlag`, `Luciq.removeFeatureFlags` |
| `S-FLAG-CLEAR` | `Luciq.removeAllFeatureFlags`, `Luciq.clearAllFeatureFlags` |
| `S-FLAG-CHECK` | `Luciq.checkFeatures` |

### Custom logging (`S-LOG-*`)

| Code | Patterns |
| --- | --- |
| `S-LOG-API` | Swift: `Luciq.log(`, `Luciq.logVerbose(`, `Luciq.logInfo(`, `Luciq.logWarn(`, `Luciq.logError(`, `Luciq.logDebug(`, `LCQLog.log(`, `LCQLog.logVerbose(`, `LCQLog.logInfo(`, `LCQLog.logWarn(`, `LCQLog.logError(`, `LCQLog.logDebug(`. ObjC macros: `LCQLogVerbose(`, `LCQLogInfo(`, `LCQLogWarn(`, `LCQLogError(`, `LCQLogDebug(`. |
| `S-LOG-USEREVENT` | `Luciq.logUserEvent(` |

### Masking config (`S-MASK-*`)

| Code | Patterns |
| --- | --- |
| `S-MASK-NETWORK` | `Luciq.setNetworkAutoMaskingState` (note the enum value passed) |
| `S-MASK-SCREEN` | `setReplaceCapturedSensitiveData`, `setScreenshotMaskingEnabled` |
| `S-MASK-CALLBACK` | `setNetworkLogRequestCompletionHandler`, `setNetworkLogResponseCompletionHandler` |

## Xcode project + Info.plist

### `project.pbxproj`

Read the file as text. Scan for:
- Run-script build phases referencing the dSYM upload script name (`luciq_dsym_upload.sh` / `upload_symbols.sh` / `upload_dsym.sh` / `instabug.sh`). → `S-SYMBOL-IOS-PHASE PASS` if a phase references it.
- `DEBUG_INFORMATION_FORMAT` setting. For Release configurations: `dwarf-with-dsym` is required → `S-SYMBOL-IOS-DWARF PASS`; otherwise `WARN` or `FAIL`.

### `Info.plist`

Inspect for usage-description keys (informational only; Luciq doesn't require any):

| Key | Maps to |
| --- | --- |
| `NSCameraUsageDescription` | `camera` permission |
| `NSMicrophoneUsageDescription` | `microphone` permission |
| `NSPhotoLibraryUsageDescription` | `photo_library` permission |
| `NSPhotoLibraryAddUsageDescription` | `photo_library_add` permission |

Cross-reference with detected attachment types from source (see `ATTACHMENT_PERMISSION_MAP` semantics):
- If `voice_note` attachment is detected but `NSMicrophoneUsageDescription` is missing → `S-MASK-* INFO` "voice-note attachment detected without microphone usage description"
- Similar for `gallery_image` and photo library

## dSYM upload pipeline

Check for the presence of one of these scripts in the repo (anywhere):

- `luciq_dsym_upload.sh` (current)
- `Luciq_dsym_upload.sh` (current, uppercase variant)
- `upload_symbols.sh`
- `upload_dsym.sh`
- `instabug.sh` (legacy)

If found → `S-SYMBOL-IOS-UPLOAD PASS`. Cross-reference with `project.pbxproj` to confirm a build phase invokes it → `S-SYMBOL-IOS-PHASE PASS`.

If the script is present but no build phase invokes it: `WARN` "dSYM upload script present but not wired into the build."

## Privacy view modifiers

iOS-only check. Session Replay captures the view hierarchy unless views are explicitly marked private.

Grep `*.swift`:
- `.luciqPrivate(` (SwiftUI view modifier) → `S-PRIVACY-SWIFTUI PASS`
- `setLuciqPrivate` (UIKit equivalent) → `S-PRIVACY-UIKIT PASS`

Absence is `INFO` (most apps don't need these unless they show sensitive content not covered by automatic masking).

## Anti-patterns to flag

Surface as `WARN` (or `FAIL` if egregious):

| Anti-pattern | Detection | Status |
| --- | --- | --- |
| `Luciq.start(...)` called more than once | Multiple matches of init pattern across source files | `WARN` |
| `Luciq.start(...)` inside a `#if DEBUG` only | Init in debug-gated block; release builds won't initialize | `FAIL` (unless explicitly debug-only project) |
| Token detected directly in source (vs. read from env / config) | String literal of length ≥ 32 that looks like a Luciq token argument | `WARN` "credential detected in source — confirm scope" — report masked (first 4 chars + length) |
| Legacy `Instabug` import alongside `Luciq` | `import Instabug` plus `import LuciqSDK` in the same target | `WARN` — run `luciq-migrate` to finish the rename if mid-migration; long-term coexistence is unsupported |
| Module toggle in production code path (non-debug) | A `setXEnabled(false)` outside any `#if DEBUG` / `#if PROFILE` guard | `INFO` (intentional disables are fine — surface for review) |
