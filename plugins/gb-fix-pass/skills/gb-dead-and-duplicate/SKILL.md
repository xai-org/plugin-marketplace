---
name: gb-dead-and-duplicate
description: Find the code a change orphaned and the code it reinvented, across a PR's files, using parallel subagents. Delete the dead, consolidate the duplicate, trim redundant tests and asserts. Use when the user says "no duplicative tests", "minimal spanning tests", "delete any extra unnecessary tests", "don't we already have this somewhere", or "surely there are already utils for this".
user-invocable: true
disable-model-invocation: true
argument-hint: "[PR number, branch, or 'local']"
---

# GB Dead and Duplicate

A change leaves two kinds of mess that the compiler does not report. Five goals, one section each:

1. **No orphans.** Nothing the change stopped using is still there.
2. **No twins.** Nothing the change added does a job that existing code already does.
3. **No pass-throughs.** No method exists only to read a field its callers can already read.
4. **No redundant tests.** Every test proves a behaviour no other test proves.
5. **No redundant asserts.** Every assert catches a bug no other assert in that test catches.

**Delete only what this change caused.** The search reaches the whole repository and shows dead code that was dead before this branch. Leave it. Report it in one line at the end if it looks serious. A change that also cleans unrelated code is a change nobody can review.

**Every claim of "unused" carries its evidence.** Name the space you searched and why that space is complete. "I grepped the repo" is not evidence when the word was `expose`, which matches 8,141 files here.

## 1. Orphans

**Goal.** Every symbol whose last use the change deleted is gone, with its tests and its entries in docs and configs.

Work from what the change **removed**.

1. List every symbol whose last use the diff deleted: functions, constants, struct fields, enum variants.
2. Work out the search space from the symbol's visibility **before** you search.

   | Visibility   | Where a caller can be                      | Search                                                   |
   | ------------ | ------------------------------------------ | -------------------------------------------------------- |
   | private      | the module and its child modules           | the file                                                 |
   | `pub(crate)` | the crate                                  | the crate directory                                      |
   | `pub`        | this crate, plus crates that depend on it  | the dependants, found with the command below             |

       rg -l "<crate-name>" --glob 'Cargo.toml' --glob 'BUILD.bazel' --glob '!target'

   Zero dependants means the crate is the whole search space. Paste the dependant list into the report; it is the evidence that the narrow search was enough.

   Two cases need the whole repository, and only these: a name reachable **as a string** (a config key, a CLI flag, a feature name, a theme token), and a **workspace-wide rename**. Restrict those searches by file type.
3. Classify the result. Only the definition: dead. Definition plus its own tests: dead; a test of a thing nobody uses is dead too. Definition plus another crate: live; name the crate.
4. Search the surfaces that never fail to compile: docs that list keys, tokens, flags, or commands; theme files, config schemas, JSON and TOML defaults; BUILD files, feature lists, CI job names.

Before you delete:

- **Can a user set it by name?** A config key, a theme token, or a CLI flag may be live through a file you cannot see. Check for a deserializer. A type with no `Deserialize` cannot be set by name.
- **Is it published API?** In a crate other people depend on, deprecate first.
- **Does a test assert on it?** Delete the test with the code, in the same commit.

## 2. Twins

**Goal.** Every helper, constant, and type the change added is the only code in the workspace that does its job.

Work from what the change **added**.

1. List every helper, constant, and type the change introduced.
2. Search for each one's **nouns and verbs**, not its name. A twin has a different name; that is why you missed it. For a new `keep_draft`, search `draft`. For a new `width_of`, search `width`.
3. Read the results. A twin does the same job for the same reason, even when the code looks different.
4. Search the usual homes for prior art: the crate's `util`, `common`, or `helpers` module; the shared crate one level up; the file that defines the type you operate on.

When you find a twin, call the code that already exists, even when the PR never touched it. Move the caller to the existing helper; never move the existing helper to your new name. Two exceptions:

- The existing helper is in a layer you must not depend on. Name the layer.
- Merging needs more than one axis of variation. Count the axes, not the differing lines. Three unrelated axes means keep both, and say so.

## 3. Pass-throughs

**Goal.** No method whose whole body reaches one field that every caller can already reach.

Such a method is a synonym for a field access. It costs a name, a doc comment, and a jump. Two conditions make it one:

1. The body is one expression that reads, borrows, or takes one field: no validation, conversion, computation, laziness, or logging.
2. Every caller can see the field. A private struct used inside its own module is the common case. So is a `pub(crate)` struct with `pub(crate)` fields.

When both hold, delete the method and write the field access at the call site. Count the callers first: one or two is the usual finding. A method with ten callers stays, because renaming the field later is one edit instead of ten.

Keep a one-line accessor in these four cases:

- **The field is not visible to the caller.** The method is the boundary.
- **The name carries meaning the field cannot.** `is_running()` over `state.as_ref().is_some()`.
- **A trait requires it,** or a caller passes it as a function item.
- **It narrows a borrow,** so the caller borrows one field instead of the whole struct. Deleting it does not compile; stop there.

Watch for the pair. A guard type often has one accessor to look and one to take. The take usually has the invented name. Both go when the struct is private.

## 4. Redundant tests

**Goal.** Every test the change added or touched proves a behaviour no other test proves, and you can name the production change that turns it red.

Delete these four kinds:

- **Twin tests.** Same setup, same assertions, different entry point. Keep the one that drives the code the way the product does: through the key handler or the public entry point. Delete the one that calls an internal helper directly.
- **Tests that cannot fail.** Name the change to production code that turns the test red. If you cannot, the test asserts something the code has no path to violate.
- **Tests that keep dead code alive.** A test of an unreachable branch makes the branch look live. Delete the test with the branch.
- **Tests of an orphan.** They go in the same commit as the orphan.

Keep both in these two cases:

- Two tests that reach one function through **different branches**: an empty composer and a composer that already holds text.
- One test at a lower level and one at a higher level (a unit test and a PTY test) when the higher one is the only proof that the wiring works.

After you delete, name each path where a regression would be silent and user-visible, and confirm one test still covers it. Deleting the only test of an exit path is never safe.

Three rules to apply while you are in the file:

- **Name the behaviour, not the function.** `spawn_rejects_a_missing_bundle`, never `test_spawn_2`. The failure line alone must say what broke.
- **`expect` with a reason, never a bare `unwrap`,** even in a test. A failure names the step, not a line number.
- **Hoist helpers to module scope.** A helper inside one test body cannot be reused and hides the scenario. The body reads as scenario, action, assertion.

## 5. Redundant asserts

**Goal.** Every assert in a test catches a bug that no other assert in that test catches.

Ask that question of each assert. Four kinds usually fail it:

- **It restates the arrange block.** It asserts that the value you set is set.
- **It checks a library's formatting.** `assert!(rendered.contains("REDACTED"))` tests the wrapper crate's `Debug`, not your code. It breaks on their release, not on your bug.
- **It repeats one fact in another shape.** `{:?}` and then `{:#?}` for the same absence.
- **It restates itself in a comment.** `// 8 - 3` beside `assert_eq!(x, 5)`. `gb-fix-comments` owns this rule; delete the echo here if you are already in the file.

**The floor is the assert that stops a vacuous pass.** A test that only asserts a secret is absent from a debug string also passes when the secret was never set. It keeps a second assert that proves the value is there. "The thing exists" and "the thing is hidden" are the minimum, not duplication.

Order the asserts as the story: what is true going in, then what the code did.

## Cost rules

Every question here is a search question; `rg` answers it and its output is the evidence. Do not run cargo, tests, pytest, clippy, fmt, or any build or test command; do not commit or push. A deletion that leaves two blank lines is expected; `gb-fix-layout` runs after this pass. A finding that spans more than one file is reported, not applied; the workflow's cross-file step applies it.
