---
name: gb-extract-or-inline
description: Extract the hidden rules out of long functions across a PR's files using parallel subagents, and leave the rest alone. Pure refactoring, never a behaviour change.
user-invocable: true
disable-model-invocation: true
argument-hint: "[PR number, branch, or 'local']"
---

# GB Extract or Inline

Find the rules hiding inside long functions in every file the PR (or branch, or local diff) changed, and give each one a name. Leave everything else alone. Three goals, one section each:

1. **One question per function.** A function that answers two questions becomes two functions.
2. **Extract rules, not runs of lines.** A new function is a decision you can name, never a block that is only long.
3. **The new function sits with its caller.** Caller above callee, directly adjacent, in the same file.

**Move code. Do not change behaviour.** The diff shows the code moving plus the new signature, and nothing else. Test assertions never change; test setup may, because a call site moved.

Scope: only functions this branch changed. Find at most three candidates per file. Extracting nothing is a valid outcome.

## 1. One question per function

**Goal.** Every function the PR touched answers one question. If it answers two, each answer has a name.

Extract when one of these holds:

- **A comment names what a branch does.** The comment is a function name that cannot escape. Two exceptions: a comment that records an external fact stays next to the code that depends on it, and a comment that records an ordering constraint stays, because extraction removes the adjacency that enforces the order.
- **The arms of an `if` answer one question in different ways.** Two height rules, two submit rules. Each arm is a rule. The `if` is a dispatch.
- **An early return guards a special case.** The special case is a separate rule.
- **A test cannot reach the logic today.** A test you cannot write is a strong reason to extract. It outranks the input count below.
- **The same rule exists in two places.** Give both the same name. Matching names turn a silent drift risk into a search.

## 2. Extract rules, not runs of lines

**Goal.** Every new function is a decision the reader can name from its signature alone. A run of lines with a name is still a run of lines, and the reader now looks in two places to learn one thing.

Leave it inline when one of these holds:

- **The name would be `handle_rest` or `draw_part_two`.** That is a run of lines.
- **The caller still needs to know everything.** A function that hides nothing from its caller only adds a jump.
- **The blocks share local variables.** Count the shared variables, not the branches. Part 2 reading five variables that part 1 set does not extract.
- **The new function must write back into the parent's locals.** A sink the parent passes in, such as `&mut Buffer`, is not a write-back.
- **It would create one implementation of a general thing.** A flag, a trait, or an enum with one case is a guess about the future. Wait for the second caller.
- **A line limit is the only reason.** A helper that exists to shorten its caller can only be read by first reading the caller.

Count the inputs the new function needs. Four or fewer is cheap. Five or more is a signal, not a refusal; ask two questions first:

- **Is a noun missing?** Five values that always travel together are one object with no name yet. Introduce the object, then count again.
- **Does the receiver hide the cost?** A method taking `&self` reaches any field, so it always passes a parameter count. Four values are easier to test than `&self` plus one, because a test supplies values but must construct a receiver. Prefer the honest signature.

Merging two similar blocks: count the **axes of variation**, not the differing lines. Differing lines are always what a shared helper would take as parameters, so that count proves nothing. One axis of one type merges well. Three unrelated axes do not. A boolean parameter that names the caller means the callers wanted different functions.

## 3. The new function sits with its caller

**Goal.** Reading down the file, the reader meets the function that decides, then the pieces it decides between, and can stop at the level that answers the question.

- **Define the caller before the callee.** A function that fans out to three helpers sits above all three.
- **Keep it next to its caller.** A function with one caller sits directly below that caller, not in a utility section at the bottom of the file and not in a shared module.
- **A helper with several callers goes below the first one.** Adjacent to the group it serves beats strictly below every caller.
- **Move to a shared module only when a second file calls it.** One caller in another file is enough. Zero is not.
- **A file that already orders callees before callers, and does so consistently, wins.** Match the file and say so in the report.

When you extract:

- Move the code. Do not rewrite it.
- Name the function after the rule it applies, never after its position.
- Move the explaining comment onto the new function as its doc line.
- If the same rule exists in another file, reuse that exact name.
- Change nothing else: no renames, no reordering, no reformatting, no new tests.
- Stay inside this one file.

## Cost rules

Reading and `rg` answer every question here; a build answers none. Do not run cargo, tests, pytest, clippy, fmt, or any build or test command; do not commit or push. A moved function landing flush against its neighbour is expected; `gb-fix-layout` runs after this pass. Report each candidate with its verdict (extract or inline) and the reason, and for each extraction the new function's name and parameter count.
