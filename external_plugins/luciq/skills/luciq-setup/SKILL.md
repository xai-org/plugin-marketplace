---
name: luciq-setup
description: Use when the user asks to add, install, set up, integrate, or initialize the Luciq mobile observability SDK in an iOS, Android, Flutter, React Native, or Kotlin Multiplatform project. Triggers include phrases like "add Luciq", "install Luciq SDK", "set up Luciq", "initialize Luciq", or pasting an empty mobile project and asking to wire Luciq. First-time integration only — for SDK upgrades or migration from the legacy Instabug SDK use luciq-migrate.
---

# Luciq SDK Installation

End-to-end first-time integration of the Luciq mobile observability SDK in a mobile project. Drive every API decision off the canonical platform integration guides linked below. The SDK evolved through the Instabug-to-Luciq rebrand, so any signature memorized in this skill may be stale; always verify against the live guide before applying edits.

## When NOT to use this skill

This skill is for first-time SDK integration. Hand off to a sibling skill for any of the following:

- Upgrading an already-integrated Luciq SDK between versions, or migrating from the legacy Instabug SDK, use `luciq-migrate`.
- Investigating a crash, hang, regression, user-reported bug, or rating drop, use `luciq-debug`.
- Looking up an API signature without installing anything, navigate the live integration guides directly (URLs in the workflow below).

If the user's request fits any of the above, STOP and route them to the right skill rather than running this one.

## Canonical sources of truth

YOU MUST verify SDK API signatures, package names, and MCP transport URLs against these live guides before applying edits. Hardcoded values in this file are illustrative and may be stale.

| Concern | Source |
| --- | --- |
| iOS install + init | https://docs.luciq.ai/ios/setup-luciq-for-ios/integrate-luciq-on-ios/luciq-ai-ios-guide |
| Android install + init | https://docs.luciq.ai/android/set-up-luciq-for-android/integrate-luciq-on-android/luciq-ai-android-guide |
| Flutter install + init | https://docs.luciq.ai/flutter/setup-luciq-for-flutter/integrating-luciq |
| React Native install + init | https://docs.luciq.ai/react-native/setup-luciq-for-react-native/integrate-luciq-on-react-native |
| KMP install + init | https://docs.luciq.ai/kmp/setup-luciq-for-kmp/integrating-luciq |
| MCP server config | https://docs.luciq.ai/product-guides-and-integrations/product-guides/ai-features/luciq-mcp-server/setup-by-ide |
| App tokens (when authenticated) | Luciq MCP `list_applications` |

## Workflow checklist

Track every step. STOP on any failed step. Do not continue past a broken state.

```
Setup Progress:
- [ ] 1. Detect platform
- [ ] 2. Acquire app token
- [ ] 3. Run per-platform recipe (deps + init)
- [ ] 4. Configure invocation
- [ ] 5. Configure auto-masking
- [ ] 6. Wire user identification
- [ ] 7. Bootstrap Luciq MCP server
- [ ] 8. Bootstrap Luciq CLI (optional, for symbol upload)
- [ ] 9. Smoke build
- [ ] 10. Hand off summary
```

## 1. Detect platform

Run a single non-recursive Glob at workspace root: `{pubspec.yaml,package.json,*.xcodeproj,*.xcworkspace,build.gradle,build.gradle.kts,shared/build.gradle.kts}`.

Apply the rules below in this exact order. First match wins. Cross-platform projects contain native subfolders (`ios/Runner.xcodeproj`, `android/build.gradle`), so root-level markers MUST take priority over those.

1. Root has `pubspec.yaml` -> Flutter (skip iOS/Android subdirs even if present).
2. Root has `package.json` containing `"react-native"` in `dependencies` -> React Native.
3. Root has `shared/build.gradle.kts` with `kotlin("multiplatform")` -> KMP.
4. Root has `*.xcworkspace` or `*.xcodeproj` (and none of the above) -> iOS.
5. Root has `build.gradle` or `build.gradle.kts` (and none of the above) -> Android.

If two or more rules match unexpectedly (for example, both `pubspec.yaml` and a top-level `*.xcodeproj` outside `ios/`), STOP and ask the user to disambiguate. Do not guess.

If no rule matches (empty repo, unusual layout, or a project where the entry point lives in a non-standard subdirectory), STOP and ask the user which platform they're targeting and where the project root lives. Do not assume — silently picking a platform here corrupts every downstream step.

## 2. Acquire app token

Resolve the token in this order:

1. Try the Luciq MCP server: `list_applications` returns tokens for apps the authenticated user can see. This works only if Luciq MCP is already authenticated in the user's agent from a previous `luciq-setup` run on another project — for genuine first-time setups, this call will fail with a tool-not-found error and you should fall through to step 2 below. Do not attempt to bootstrap MCP here; that is step 7.
2. Read from environment (`LUCIQ_APP_TOKEN`).
3. Prompt the user.

NEVER commit the token inline. Use a build-time injection, an env var, or a gitignored secrets file. Tokens leak via git history, which is irreversible.

## 3. Per-platform recipe

YOU MUST verify the exact init signature, package name, and Gradle plugin name for the detected platform against the live integration guide above before applying. APIs evolved through the Instabug-to-Luciq rebrand. The recipes below name the files to edit, not authoritative signatures.

### iOS

Verify the recommended install method against the live guide before proceeding — the primary method has changed across SDK versions.

**Swift Package Manager (recommended for all new and existing projects)**

First check whether a `Package.swift` exists at the project root.

*Project has `Package.swift`:*
1. Edit `Package.swift` — add to `dependencies` and to the appropriate target's `dependencies`. Verify the repo URL and version on the live guide:
   ```swift
   // dependencies array:
   .package(url: "<REPO_URL_FROM_LIVE_GUIDE>", from: "<VERSION>"),
   // target dependencies:
   .product(name: "<SPM_PRODUCT_NAME>", package: "luciq-ios-sdk"),
   ```
2. Run `swift package resolve` to fetch.
3. Check the resolved `Package.swift` in DerivedData checkouts to confirm the product name and module name — **they are different**: the SPM product may be `Luciq` while the Swift import is `import LuciqSDK`. Use the module name (from the `.xcframework` contents) for `import`, not the product name.
4. Edit `AppDelegate.swift` (or `.m`): import the module and call the start API. Verify the exact init signature on the live guide.
5. Edit `Info.plist`: add `NSMicrophoneUsageDescription` and `NSPhotoLibraryUsageDescription`.

*Project is `.xcodeproj`-only (no `Package.swift`):*
SPM works fine for `.xcodeproj` projects via direct `project.pbxproj` edits. Apply all four changes, then run `xcodebuild -resolvePackageDependencies` immediately (no confirmation needed — it only fetches, it does not build):
1. Add an `XCRemoteSwiftPackageReference` entry with the repo URL and `upToNextMajorVersion` requirement. Verify the repo URL on the live guide.
2. Add an `XCSwiftPackageProductDependency` entry pointing to that reference. **Verify the product name from the package's own `Package.swift` after resolving** — it is not the same as the Swift import name. (Confirmed: SPM product = `Luciq`, Swift import = `import LuciqSDK`.)
3. Add the product dependency UUID to `packageProductDependencies` in `PBXNativeTarget`.
4. Add the package reference UUID to `packageReferences` in `PBXProject`.
5. Run `xcodebuild -resolvePackageDependencies -project <name>.xcodeproj`. If it fails with "no versions match", check the actual release tags on the repo and update `minimumVersion` to match (the SDK may be at a high major version, e.g. `19.x`).
6. Edit `AppDelegate.swift` (or `.m`): import the module and call the start API. Verify the exact init signature on the live guide.
7. Edit `Info.plist`: add `NSMicrophoneUsageDescription` and `NSPhotoLibraryUsageDescription`.

**Carthage (alternative — only if SPM is blocked by a project-level constraint)**
1. Edit (or create) `Cartfile` — verify the binary spec URL on the live guide:
   ```
   binary "<SPEC_URL_FROM_LIVE_GUIDE>"
   ```
2. Run `carthage update --use-xcframeworks` after user confirmation.
3. Embed the built `.xcframework` programmatically using the `xcodeproj` Ruby gem:
   ```bash
   gem install xcodeproj   # skip if already installed
   ```
   Then run a Ruby script (adapt `TARGET_NAME` and the `.xcframework` filename to the actual project — check `Carthage/Build/` after step 2):
   ```ruby
   require 'xcodeproj'
   project = Xcodeproj::Project.open(Dir.glob('*.xcodeproj').first)
   target  = project.targets.find { |t| t.name == 'TARGET_NAME' }
   ref     = project.new_file('Carthage/Build/LuciqSDK.xcframework')
   target.frameworks_build_phase.add_file_reference(ref)
   phase   = target.new_shell_script_build_phase('Copy Luciq Frameworks')
   phase.shell_script    = '"$(SRCROOT)/Carthage/Build/carthage" copy-frameworks'
   phase.input_paths    << '$(SRCROOT)/Carthage/Build/LuciqSDK.xcframework'
   project.save
   ```
   Show the diff of `project.pbxproj` before saving.
4. Edit `AppDelegate.swift` (or `.m`): import the module and call the start API. Verify the exact init signature on the live guide.
5. Edit `Info.plist`: add `NSMicrophoneUsageDescription` and `NSPhotoLibraryUsageDescription`.

**CocoaPods (deprecated — avoid for new integrations)**
> ⚠️ The CocoaPods registry becomes read-only on December 2, 2026. Prefer SPM or Carthage. Only use this path if the project already uses CocoaPods and migration is out of scope for this task.
1. Edit `Podfile`: add the Luciq pod to the main target — verify the pod name on the live guide.
2. Run `pod install` and `pod update Luciq` after user confirmation.
3. Follow steps 4–5 above.

### Android

Verify exact dependency coordinates, version, and init signature against the live guide before applying — these change across releases.

1. **Check compile SDK version**: must be ≥ 29. Raise `compileSdkVersion` in `app/build.gradle(.kts)` if needed.
2. **Add the dependency** in `app/build.gradle(.kts)` (verify groupId, artifactId, and latest version on the live guide):
   - Gradle: `implementation 'ai.luciq.library:luciq:<version>'`
   - Maven projects: use the same groupId/artifactId coordinates from the live guide.
3. **Verify dependency resolution** after user confirmation: `./gradlew :app:dependencies` — this triggers Gradle to fetch the new dependency without needing Android Studio. Fix any resolution errors before continuing.
4. **Initialize in the Application subclass** `onCreate` using the Builder pattern (verify exact API on the live guide):
   - Kotlin: `Luciq.Builder(this, "APP_TOKEN").build()`
   - Java: `new Luciq.Builder(this, "APP_TOKEN").build();`
5. **Permissions**: the SDK automatically injects `WAKE_LOCK` and `INTERNET` into `AndroidManifest.xml` — no manual edits needed. Optional permissions for image/video attachments and network monitoring are listed in the live guide.
6. **Android 15+ (API 35)**: if `targetSdkVersion` is 35 or higher, the live guide requires Luciq ≥ 13.4.0 for 16 KB page-size support. Verify the minimum compatible version on the live guide and pin accordingly.

### Flutter

1. **Add dependency** in `pubspec.yaml` (verify the exact package name and version on the live guide):
   ```yaml
   dependencies:
     luciq_flutter:
   ```
2. **Fetch the package**: `flutter packages get`
3. **Import** in the file where you initialize: `import 'package:luciq_flutter/luciq_flutter.dart';`
4. **Initialize** in `initState()` (verify the exact API signature on the live guide):
   ```dart
   Luciq.init(
     token: 'APP_TOKEN',
     invocationEvents: [InvocationEvent.shake],
   );
   ```
5. **iOS permissions** — add to `Info.plist` (required for media attachments):
   - `NSMicrophoneUsageDescription`
   - `NSPhotoLibraryUsageDescription`
6. **Android permissions**: auto-injected into `AndroidManifest.xml` — no manual edits needed. Exception: if you enable screenshot invocation, the SDK requests storage permission at app launch (it monitors the screenshots directory).

### React Native

**Requirement:** React Native ≥ 0.60.x. Verify the minimum version on the live guide before proceeding.

1. **Install the package** (verify the exact package name on the live guide):
   - npm: `npm install @luciq/react-native`
   - yarn: `yarn add @luciq/react-native`
2. **iOS native deps**: `cd ios && pod install && cd ..` after user confirmation.
3. **Android**: autolinking handles native wiring automatically — no manual step needed.
4. **Initialize** in `index.js` (verify the exact API signature on the live guide):
   ```js
   import Luciq, { InvocationEvent } from '@luciq/react-native';

   Luciq.init({
     token: 'APP_TOKEN',
     invocationEvents: [InvocationEvent.shake],
   });
   ```
5. **iOS permissions** — add these keys to `info.plist` (required for media attachments):
   - `NSMicrophoneUsageDescription`
   - `NSPhotoLibraryUsageDescription`

### KMP

Verify dependency coordinates, version, and init signatures against the live guide — these change across releases.

1. **Add the shared dependency** in `shared/build.gradle.kts` under `commonMain` (get the latest version from Maven Central):
   ```kotlin
   sourceSets {
       commonMain.dependencies {
           api("ai.luciq-library:luciq-kmp:<version>")
       }
   }
   ```
   iOS also requires a separate native LuciqKMP dependency — check the live guide for the exact artifact.

2. **Create a shared config object** in `commonMain` (verify the exact class names and fields on the live guide):
   ```kotlin
   import ai.luciq.kmp.modules.LuciqKmp
   import ai.luciq.kmp.utils.InvocationEvents

   object LuciqDefaults {
       const val APP_TOKEN = "YOUR_TOKEN"
       val invocationEvents = listOf(InvocationEvents.FloatingButton)
   }

   fun initializeLuciq(configuration: LuciqConfiguration) {
       LuciqKmp.init(configuration)
   }
   ```

3. **Android entry point** — call as early as possible in the Application class, passing the `Application` instance:
   ```kotlin
   val configuration = LuciqConfiguration(
       androidApplication = application,
       token = LuciqDefaults.APP_TOKEN,
       invocationEvents = LuciqDefaults.invocationEvents,
   )
   initializeLuciq(configuration)
   ```

4. **iOS entry point** — call as early as possible in the app lifecycle (e.g. `application(_:didFinishLaunchingWithOptions:)`); omit `androidApplication`:
   ```swift
   let configuration = LuciqConfiguration(
       token: LuciqDefaults.shared.APP_TOKEN,
       invocationEvents: LuciqDefaults.shared.invocationEvents,
   )
   initializeLuciq(configuration: configuration)
   ```

5. **Permissions**:
   - Android: the native SDK declares required permissions automatically; remove any that your app does not need.
   - iOS: add `NSMicrophoneUsageDescription` and `NSPhotoLibraryUsageDescription` to `Info.plist`.

6. **Platform-specific extras** (if applicable): Jetpack Compose apps may need additional native Compose libraries for screen tracking and APM; SwiftUI apps may need native SwiftUI APIs. Check the live guide for current requirements.

## 4. Configure invocation

Default to shake gesture plus screenshot. Offer alternatives: floating button, two-finger swipe, or programmatic-only. Apply the user's choice.

## 5. Configure auto-masking

Goal: identify likely-sensitive UI views and configure SDK-side masking. A naive substring grep produces false positives (validators, comments, test fixtures), so the search must be narrowly scoped and every match must be user-confirmed.

1. Grep the platform's UI source files only (`*.swift`, `*.kt`, `*.dart`, `*.tsx`, `*.jsx`) for these identifier-shaped strings: `password`, `email`, `cardNumber`, `ssn`, `cvv`, `pin`, `dob`, `iban`.
2. Filter out matches in `*test*`, `*spec*`, `*mock*`, `*fixture*` paths, validator/regex utilities, and anything under `node_modules`, `Pods/`, or `build/`.
3. Show the filtered match list with `file:line` for each. Get per-match confirmation. Do not apply masking rules in bulk.
4. Verify the masking API signature for the detected platform on the live guide. The masking API has differed across platforms and changed across SDK versions; do not hardcode it.
5. Apply masking config only for confirmed matches.

Also configure network-log redaction: sensitive headers (Authorization, Cookies) and body fields (password, token).

## 6. Wire user identification

If the app has authentication, find login and logout flows. Add `identifyUser(...)` and the corresponding sign-out call so reports tie back to your users. Verify the exact identification API on the live guide.

If the app is anonymous-first (no login surface — typical for many B2C utilities, content readers, and games with guest play), skip this step entirely. Do not synthesize a fake user identity, do not insert `identifyUser` at app launch with placeholder values, and do not block the workflow waiting for a login flow that doesn't exist. Note the skip in the hand-off summary so the user can wire identification later if they add auth.

## 7. Bootstrap Luciq MCP server

YOU MUST verify the MCP server URL and transport type against https://docs.luciq.ai/product-guides-and-integrations/product-guides/ai-features/luciq-mcp-server/setup-by-ide before proceeding. Both have evolved across releases.

Ask the user once: "global or project-local?" — then run immediately. Default to user-global if they don't express a preference. Use the `claude mcp add` CLI. Do NOT hand-edit `~/.claude.json` directly — the file can be very large and a malformed edit will break all MCP servers:

```bash
# User-global (survives across projects):
claude mcp add --transport http luciq <URL_FROM_LIVE_GUIDE> --scope user

# Project-local (.mcp.json in repo root):
claude mcp add --transport http luciq <URL_FROM_LIVE_GUIDE>
```

After running, prompt the user to restart their agent (Claude Code, Cursor, Codex, or other supported client) and complete the OAuth flow. Once authenticated, Luciq MCP tools become available qualified as `luciq:<tool_name>` (for example, `luciq:list_crashes`).

## 8. Bootstrap the Luciq CLI (optional)

If the project will upload symbol artifacts (dSYMs, ProGuard or R8 mapping files, source maps, or split-debug-info) to Luciq for symbolication of obfuscated frames, install the Luciq CLI.

YOU MUST verify the install command, supported platforms, and exact upload subcommand on the live integration guide for the user's platform. The CLI's distribution channel and command surface have changed across releases; do not hardcode an install command here.

Store credentials via environment variables (`LUCIQ_APP_TOKEN` plus any per-platform secrets the live guide names). NEVER commit credentials inline.

## 9. Smoke build

| Platform | Command |
| --- | --- |
| iOS | `xcodebuild -project <Name>.xcodeproj -scheme <Scheme> -sdk iphonesimulator -destination "generic/platform=iOS Simulator" build` |
| Android | `./gradlew :app:assembleDebug` |
| Flutter | `flutter build apk --debug` |
| React Native (Android) | `npx react-native run-android` |
| React Native (iOS) | `npx react-native run-ios` |
| KMP | run both Android and iOS builds |

Deriving `<Workspace>` and `<Scheme>` for iOS and RN-iOS:

- `<Name>`: the `.xcodeproj` filename (without extension) at the project root. If a `.xcworkspace` exists instead (e.g. after CocoaPods install), use `-workspace Foo.xcworkspace` instead of `-project`.
- `<Scheme>`: derive by running `xcodebuild -list -project <Name>.xcodeproj` (or `-workspace` if applicable) and picking the app scheme. Usually matches the project name. For RN, the scheme typically matches the app's display name in `app.json`.
- If multiple workspaces or schemes exist, STOP and ask the user which to build. Do not guess.

STOP on build failure. NEVER claim success on a broken build.

## 10. Hand off

Print:
- File where init was added.
- Invocation event configured.
- Masking rules applied (with file:line for each).
- User identification call sites.
- MCP / CLI wired status.
- A test command (for example, "shake the device or simulator to invoke Luciq").
- Pointers: `luciq-debug` for crash investigation, `luciq-migrate` for moving off the legacy Instabug SDK or upgrading between Luciq versions.

## Style

- ALWAYS show diffs before applying code edits.
- ALWAYS confirm before running `pod install`, gradle syncs, or build commands.
- Verify SDK API signatures from the live integration guide. Do not hardcode them in this skill.

## Red Flags - STOP and surface to the user

If you catch yourself thinking any of these, you are about to ship a broken integration. STOP, surface to the user, do not proceed:

- "The build failed but the SDK is installed, so it's probably fine." It isn't. A failing build means a broken integration. Report the failure verbatim.
- "I skipped checking the live guide because the docs probably haven't changed." That's how you ship a stale signature. Always verify.
- "I hardcoded the init signature from this file, it looked right." This file is illustrative, not authoritative. The live guide is the source of truth.
- "I committed the app token inline because it's just for local testing." Tokens leak via git history. Use env injection or a gitignored secrets file.
- "I auto-applied the masking rules without showing the user the matches." False positives are likely. Per-match confirmation is mandatory.
- "`pod install` or `gradle sync` had warnings but the build went green." Warnings about Luciq specifically are not cosmetic. Read them, surface them.
- "Two platform markers matched but I picked the obvious one." If the workspace is ambiguous, ask. Cross-platform projects break this assumption routinely.

The pattern: every shortcut here trades "looks done" for "actually works." The skill's job is to actually work.
