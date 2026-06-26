---
name: luciq-migrate
description: Use when the user asks to migrate a mobile codebase from the legacy Instabug SDK to Luciq, upgrade between Luciq SDK versions, or replace deprecated Luciq APIs. Triggers include phrases like "migrate from Instabug to Luciq", "move us off Instabug", "upgrade Luciq SDK to vX", or "replace deprecated Luciq APIs". Covers iOS, Android, Flutter, React Native, KMP. First-time SDK installs go to luciq-setup.
---

# Luciq SDK Migration

Apply code transforms to migrate or upgrade the Luciq SDK. Drive the workflow off the canonical Migration Hub, not memorized rename tables. Bulk transforms without preview corrupt repos. YOU MUST show three sample diffs before bulk-applying.

## When NOT to use this skill

- First-time integration of Luciq into a project that has never used Luciq or Instabug, use `luciq-setup`.
- Investigating a crash, hang, or production signal, use `luciq-debug`.

If the user's request fits any of the above, STOP and route them to the right skill rather than running this one.

## Canonical source of truth

YOU MUST fetch the current rename and deprecation tables from the live Migration Hub before applying any transform. Do not hardcode them in this skill. They go stale every release.

| Concern | Source |
| --- | --- |
| Instabug-to-Luciq renames, vN-to-vN+1 deprecations, v1-to-v2 API changes | https://docs.luciq.ai/getting-started/luciq-migration-hub |

## Workflow

### 1. Refuse to start on a dirty working tree

Migrations modify source in place. Source must be committed. If `git status` shows uncommitted changes, STOP and ask the user to commit, stash, or explicitly override. No exceptions for "small changes".

### 2. Detect platform and current SDK + version

Apply the rules below. First match wins.

| Platform | Source of truth | What to look for |
| --- | --- | --- |
| iOS | `Podfile.lock` | `Instabug` or `Luciq` pod |
| Android | `app/build.gradle*` plus `gradle.lockfile` | `com.instabug.*` or `ai.luciq.library.*` |
| Flutter | `pubspec.lock` | `instabug_flutter` or `luciq_flutter` |
| React Native | `package-lock.json` or `yarn.lock` | the relevant Instabug or Luciq package |
| KMP | both Android and iOS sources | as above for each side |

Report: SDK name, current version, count of call sites. The call-site count comes from `Grep` of the old symbol root (for example, `Instabug` for iOS, `com.instabug` for Android).

### 3. Pick the transform set

| Intent | Transform set |
| --- | --- |
| Instabug to Luciq | Rename `Instabug*` symbols, imports, packages, dependency entries. |
| vN to vN+1 | Apply known deprecations between those versions. |
| v1 to v2 | v1 to v2 API surface. Fetch the canonical mapping from the Migration Hub. |

Always look up the current rename and deprecation tables from the Migration Hub above. Do not invent renames.

### 4. Show three sample diffs before bulk-applying

This is a hard gate. Do not skip it.

1. Use `Grep` to find the first three call sites of the old symbol.
2. Generate the diff for each call site.
3. Show all three to the user.
4. Wait for explicit sign-off.

If the three samples reveal an ambiguity (for example, a renamed method has different parameters in different call sites), STOP, surface the ambiguity, and ask. Do not bulk-apply across an ambiguity.

### 5. Apply in waves on confirmation

Apply transforms in this order so the project remains parseable after each wave:

1. Dependency manifest: `Podfile`, `build.gradle`, `pubspec.yaml`, `package.json`.
2. Imports: every file referencing the old symbol.
3. Type names: class refs, method calls.
4. Project metadata: group names, build phases.

After each wave, sanity check by opening one sample file and confirming the transform applied cleanly.

### 6. Run the build to verify

| Platform | Command |
| --- | --- |
| iOS | `pod install && xcodebuild -workspace <Workspace>.xcworkspace -scheme <Scheme> build` |
| Android | `./gradlew :app:assembleDebug` |
| Flutter | `flutter pub get && flutter analyze && flutter build apk --debug` |
| React Native | `npm install && npx react-native run-android` (or `run-ios`) |
| KMP | both Android and iOS builds |

Derive `<Workspace>` and `<Scheme>` for iOS as in `luciq-setup`: `xcodebuild -list` to enumerate, ask the user if multiple options exist.

STOP and surface errors. NEVER claim "done" if the build is broken.

### 7. Print the manual-review checklist

For any APIs whose semantics changed beyond a rename (different parameters, callback shapes, default behavior), source the list from the Migration Hub and emit:

```
MANUAL REVIEW REQUIRED:
- [ ] <api>: <what changed>  [<file>:<line>]
```

These are not auto-applied. The user owns the semantic decision.

## Style

- ALWAYS show three sample diffs before bulk-apply.
- ALWAYS verify against the Migration Hub before applying a rename.
- Do not claim "done" if the build is broken.
- Always flag ambiguous renames for manual review.

## Red Flags - STOP and surface to the user

If you catch yourself thinking any of these, you are about to corrupt the repo. STOP, surface to the user, do not proceed:

- "I skipped the three-diff sample because the rename is obvious." It isn't. One ambiguity buried in 200 call sites is a multi-hour cleanup. Show the samples.
- "The working tree was dirty but I figured the changes were unrelated." Migrations interleave with uncommitted work and become impossible to roll back. Refuse and ask.
- "I hardcoded the rename mapping from this file because it looked right." This file is illustrative. The Migration Hub is the source of truth.
- "The build had errors but the rename succeeded, so it's mostly done." It isn't done. Surface the errors verbatim.
- "An ambiguous rename came up but I picked the more common variant." Ambiguity is a stop condition, not a tiebreaker.
- "I bulk-applied across waves without a sanity-check read." Each wave can break parsing for the next. Sanity-check.
- "The manual-review list is long, so I trimmed the low-priority items." The user owns that decision, not the agent. Print the full list.

The pattern: every shortcut here trades "looks done" for "actually correct." The skill's job is to be correct.
