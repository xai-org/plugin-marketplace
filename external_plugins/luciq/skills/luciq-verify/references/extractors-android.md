# Android Extractors

Per-file scan recipe for Android projects in Phase 2 (static audit). Covers both Gradle Groovy and Gradle KTS variants.

## Table of contents

1. [Scan plan](#scan-plan)
2. [Gradle scripts](#gradle-scripts)
3. [`AndroidManifest.xml`](#androidmanifestxml)
4. [Source files (`*.kt`, `*.java`)](#source-files-kt-java)
5. [Mapping upload pipeline](#mapping-upload-pipeline)
6. [Anti-patterns to flag](#anti-patterns-to-flag)

## Scan plan

| File | Role |
| --- | --- |
| `build.gradle`, `build.gradle.kts` (root + module-level) | Dependencies, plugins, build types |
| `settings.gradle`, `settings.gradle.kts` | Repository declarations |
| `app/build.gradle`(`.kts`) | App-module dependencies + plugin application |
| `**/AndroidManifest.xml` | Permissions, activities, application class |
| `**/*.kt` | Kotlin source (init, modules, masking, identity, flags, logging) |
| `**/*.java` | Java source (same surface) |

Skip directories: `.git/`, `build/`, `.gradle/`, `.cxx/`, `release/`, `*.aar/`. Bytes-only files (`.so`, `.png`, etc.) are never read.

## Gradle scripts

### Dependency detection (`S-INSTALL-001`, `S-INSTALL-002`)

Search for the Luciq Maven coordinate in any `*.gradle*` file:

- Current: `ai.luciq.library:luciq` (and submodules `:luciq-core`, `:luciq-bug`, `:luciq-crash`, `:luciq-apm`, `:luciq-survey`)
- Legacy: `com.instabug.library:instabug` (and submodules)

Match forms:
- Groovy: `implementation 'ai.luciq.library:luciq:X.Y.Z'`
- KTS: `implementation("ai.luciq.library:luciq:X.Y.Z")`
- Version catalog reference: `implementation(libs.luciq)` — cross-check against `gradle/libs.versions.toml` if present

Emits:
- `S-BUILD-AND-GROOVY` and/or `S-BUILD-AND-KTS PASS` based on which file types are present
- `S-INSTALL-001 PASS` if a Luciq coord is found in any Gradle file
- `S-INSTALL-002` per `expected_sdk_version` cross-check
- `S-INSTALL-004 WARN` if both `ai.luciq.*` AND `com.instabug.*` coords coexist — message: `"both Luciq and legacy Instabug Maven coords declared; if you're mid-migration, run luciq-migrate to finish the rename. Long-term coexistence is not supported."`

### Mapping upload plugin (`S-SYMBOL-AND-*`)

Search for the Luciq Gradle plugin:

- Groovy: `apply plugin: 'luciq.upload'`, `apply plugin: 'instabug.upload'` (legacy)
- KTS: `id("luciq.upload")`, `id("instabug.upload")` inside the `plugins { }` block

If plugin applied, look for the configuration block:

```groovy
luciqUpload {
    applicationToken = "..."
    // mappingFileUploadPath, etc.
}
```

Emits:
- `S-SYMBOL-AND-PLUGIN PASS` if plugin applied
- `S-SYMBOL-AND-TOKEN PASS` if a token configuration block is found; `WARN` if plugin applied but no token block
- Mask the detected token in the report (first 4 chars + length, never the full token)

## `AndroidManifest.xml`

Read every manifest in the project (main + variant-specific).

### Permissions

| Manifest entry | Maps to |
| --- | --- |
| `android.permission.INTERNET` | required for any SDK to ship telemetry — `S-INSTALL-* INFO` if missing (extremely unusual) |
| `android.permission.ACCESS_NETWORK_STATE` | informational |
| `android.permission.RECORD_AUDIO` | maps to `voice_note` attachment capability |
| `android.permission.READ_EXTERNAL_STORAGE` | gallery / photos |
| `android.permission.WRITE_EXTERNAL_STORAGE` | gallery / photos |
| `android.permission.POST_NOTIFICATIONS` | needed for in-app notifications on API 33+ |

Cross-reference with detected attachment types from source.

### Custom `Application` class

If a custom `android:name="..."` is declared on the `<application>` tag, that's where the SDK init typically lives. Note the class name so the source scan can find init there.

## Source files (`*.kt`, `*.java`)

### SDK init (`S-INSTALL-003`)

Patterns:

- `new Luciq.Builder(this, "...")` (Java)
- `Luciq.Builder(this, "...")` (Kotlin)
- `.build()` chained call closes the builder

Multi-line builder chains are common; agent must read enough context lines to capture the chain (look for `.build()` after the `Builder()` call). Note the chained method names — they reveal initial module states and invocation events.

### Module toggles (`S-MODULE-*`)

| Module | Patterns |
| --- | --- |
| Bug Reporting | `BugReporting.setState`, `Luciq.setBugReportingState`, `BugReporting.setEnabled` |
| Crash Reporting | `CrashReporting.setState`, `Luciq.setCrashReportingState`, `LuciqNonFatalException` (presence implies CR is in use) |
| APM | `APM.setEnabled`, `APM.setState`, `Luciq.setApmEnabled` |
| Session Replay | `SessionReplay.setState`, `SessionReplay.setSyncCallback`, `SessionReplay.setNetworkLogsState` |
| Network Logs | `NetworkLogger.disable`, `NetworkLogger.enable`, `Luciq.setNetworkLoggingState` |
| ANR Monitor | `Luciq.setAnrMonitorEnabled`, `CrashReporting.setAnrState` |
| NDK | `LuciqNDK.init`, `setNdkCrashesEnabled` |
| Surveys / Replies / Feature Requests | `Surveys.setState`, `Replies.setState`, `FeatureRequests.setState` |
| Network Auto-Masking | `Luciq.setNetworkAutoMaskingState` |

Builder-chained equivalents (called inside `Luciq.Builder()...build()`):
- `setBugReportingState(Feature.State.ENABLED)`
- `setCrashReportingState(Feature.State.DISABLED)`
- `setReproStepsState(State.ENABLED)`

Capture the `Feature.State.*` value passed on the same line.

### Invocation events (`S-INVOKE-*`)

Patterns:
- `setInvocationEvents(`
- `LuciqInvocationEvent.SHAKE`, `LuciqInvocationEvent.SCREENSHOT`, `LuciqInvocationEvent.TWO_FINGER_SWIPE_LEFT`, `LuciqInvocationEvent.FLOATING_BUTTON`, `LuciqInvocationEvent.NONE`

Programmatic invocation:
- `Luciq.show()`, `BugReporting.show()`, `BugReporting.invoke()`

### Identity + attributes (`S-IDENTITY-*`)

| Code | Patterns |
| --- | --- |
| `S-IDENTITY-USER` | `Luciq.identifyUser`, `Luciq.setUserData` |
| `S-IDENTITY-LOGOUT` | `Luciq.logoutUser`, `Luciq.logOutUser` |
| `S-IDENTITY-ATTR` | `Luciq.setUserAttribute`, `Luciq.removeUserAttribute` |
| `S-IDENTITY-CDATA` | `Luciq.setUserData(` |

### Feature flags (`S-FLAG-*`)

| Code | Patterns |
| --- | --- |
| `S-FLAG-ADD` | `Luciq.addFeatureFlag`, `Luciq.addFeatureFlags` |
| `S-FLAG-REMOVE` | `Luciq.removeFeatureFlag`, `Luciq.removeFeatureFlags` |
| `S-FLAG-CLEAR` | `Luciq.removeAllFeatureFlags`, `Luciq.clearAllFeatureFlags` |
| `S-FLAG-CHECK` | `Luciq.checkFeatures` |

### Custom logging (`S-LOG-*`)

| Code | Patterns |
| --- | --- |
| `S-LOG-API` | `Luciq.log(`, `Luciq.logVerbose(`, `Luciq.logInfo(`, `Luciq.logWarn(`, `Luciq.logError(`, `Luciq.logDebug(` |
| `S-LOG-USEREVENT` | `Luciq.logUserEvent(` |

### Masking config (`S-MASK-*`)

| Code | Patterns |
| --- | --- |
| `S-MASK-NETWORK` | `Luciq.setNetworkAutoMaskingState`, `Luciq.setNetworkAutoMaskingType` |
| `S-MASK-SCREEN` | `MaskingType.MEDIA`, `MaskingType.LABELS`, `MaskingType.MEDIA_AND_LABELS`, `MaskingType.NONE`, `setScreenshotMaskingEnabled` |
| `S-MASK-CALLBACK` | `setNetworkLogListener`, `setNetworkLogSyncCallback` |

### Network interceptor presence (`S-MODULE-NLG` / `S-MASK-CALLBACK`)

Search for known interceptor classes:

- `LuciqOkhttpInterceptor`
- `LuciqAPMOkhttpInterceptor`
- `LuciqAPMGrpcInterceptor`

If any are referenced, surface as `INFO` — the customer is intercepting traffic explicitly (rather than relying on auto-instrumentation). Useful diagnostic when runtime audit's C1-C7 returns unexpected coverage.

### APM call sites (informational)

The presence of these calls implies which APM features the customer relies on:

- Flows: `APM.startFlow`, `APM.endFlow`, `APM.setFlowAttribute`
- Screen loading: `APM.startScreenLoading`, `APM.endScreenLoading`
- UI traces: `APM.startUITrace`, `APM.endUITrace`
- WebView: `APM.setWebViewsTrackingEnabled`

Emit `INFO` rows under `S-MODULE-APM` for each detected capability.

## Mapping upload pipeline

Cross-reference Gradle (plugin applied + token configured) with the ProGuard / R8 config:

- `proguard-rules.pro` / `consumer-rules.pro` files should not strip Luciq classes
- Look for `-keep class ai.luciq.**` rules; absence is `INFO` (Luciq libraries are usually self-protected, but custom ProGuard configs can break this)

Emits:
- `S-SYMBOL-AND-PLUGIN PASS` if Luciq upload plugin is applied
- `S-SYMBOL-AND-TOKEN PASS` if token block is configured
- `WARN` if plugin applied but token missing
- `INFO` if no Luciq keep rules in ProGuard config (likely fine, but worth surfacing)

## Anti-patterns to flag

| Anti-pattern | Detection | Status |
| --- | --- | --- |
| Builder called more than once | Multiple `Luciq.Builder(` sites in source | `WARN` |
| Builder gated by a debug-only block (e.g. `BuildConfig.DEBUG`) | Init nested inside `if (BuildConfig.DEBUG) { ... }` | `FAIL` (unless project is explicitly debug-only) |
| Token in source (vs. resource / env) | Builder call with a long string literal token argument | `WARN` "credential detected — confirm scope" — masked in report |
| Both `ai.luciq.*` AND `com.instabug.*` coords | Both Maven groups present in Gradle dependencies | `WARN` — run `luciq-migrate` to finish the rename if mid-migration; long-term coexistence is unsupported |
| Module disabled in production build type | `setXState(Feature.State.DISABLED)` outside any debug-only guard | `INFO` (surface for review; intentional disables are fine) |
