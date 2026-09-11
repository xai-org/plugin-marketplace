---
name: gb-fix-layout
description: Fix how a PR's code sits on the page, using parallel subagents. Fix the blank lines so related code sits together, and move a stranded line back to its group with a written argument that nothing changes. Pure refactoring, never a behaviour change. Run gb-fix-comments first.
user-invocable: true
disable-model-invocation: true
argument-hint: "[PR number, branch, or 'local']"
---

# GB Fix Layout

Fix how every file changed in the PR (or branch, or local diff) reads on the page. Two goals, one practice each:

1. **Readable spacing and structure.** In every changed hunk, a reader sees which lines form one step, and where one step ends and the next begins.
2. **Locality.** Code that belongs together sits together. A line sits with its group. A helper sits next to the code that calls it.

**Nothing in this pass may change what the program does.**

## The practice: spacing

**Goal: readable spacing and structure.** A reader of any changed hunk sees which lines form one step, and where one step ends and the next begins.

A blank line is punctuation. No blank lines reads as one long sentence. A blank line after every statement reads as a list of unrelated facts. Both hide which lines belong together.

- **Separate steps, not statements.** Group the lines that do one thing. Break where the reader's task changes. If two adjacent groups would get the same name, they are one group.
- **Never two blank lines in a row inside a function.** A deletion almost always leaves them.
- **No blank line after** `{` **or before** `}`**.** The brace is the boundary.
- **A comment binds to the code below it.** The blank line goes above the comment, never between the comment and its code. This is the most common spacing bug.
- **A deleted block leaves one blank line,** not the pair that bracketed it. Check every deletion in the diff.
- **A moved item gets one blank line above and one below.**
- **Tests get arrange, act, assert.** One blank line between setup, call, and assertions.
- **Do not pad.** A function you can read at a glance needs no blank lines inside it.
- **Group render code by what is drawn,** one group per element or region, not per API called.
- **Group match arms, struct fields, and imports by meaning.** A blank line between every arm is noise.
- **A** `#[cfg]` **block is its own group,** with one blank line before the attribute and one after the block. Apply this in every file the PR touched.
- **Blank lines cannot fix a line in the wrong place.** That is a placement problem; see the next practice.
- Stay inside the PR's changed hunks. Leave the formatter's work to the formatter.

## The practice: placement

**Goal: locality.** A line sits with the group it belongs to. A helper sits next to the code that calls it. A reader finds related code in one place.

This is pure refactoring: the same statements in a different order on the page, with the same behaviour at run time. It is the only practice here that can go wrong, so it is the only one with a proof obligation.

Moves that are allowed, when the moved line and every line it crosses are independent:

- Move a statement inside its block so it joins its group. The common case is a `let` added after the code that should follow it.
- Move a binding that only later lines use into a test's arrange group.
- Reorder sibling match arms to the enum's order, when the patterns are disjoint and no arm has a guard.
- Reorder struct-literal fields to the declaration order, when every initialiser is a plain value or a call with no side effect.
- Move a whole item (function, const, type) to the section its neighbours belong to.

Never do these in this pass:

- Change an expression, split or merge a statement, rename anything, or change control flow.
- Move a line across an early return, a `?`, an `await`, a lock, a channel send, a log, or a panic whose order matters.
- Move a line into or out of a conditional, a loop body, or a closure.
- Move a line for taste. The bar is a reader who would attach the line to the wrong group.

Write the independence argument for every move in one sentence: what the moved line touches, and what the lines it crossed touch. "No dependency" is not an argument.

### Order of items

These rules place a whole function, const, or type. A whole-item move changes no behaviour, so it needs only the reason from this list.

- **A helper with one caller sits directly next to that caller,** not in a utility section and not in a shared module.
- **A helper with several callers sits next to the first one.** Next to the group it serves beats strictly after every caller.
- **A helper moves to a shared module only when a second file calls it.**
- **A constant with one use sits directly above the function that reads it.** Move it to the top of the file when a second function reads it, and to a shared module when a second file reads it.
- **Define the caller before the callee.** The reader meets the function that decides, then the pieces, and can stop at the level that answers the question.
- **A file that consistently orders items the other way wins.** Match the file and say so in the report.

## Cost rules

This pass edits blank lines and moves lines only. Do not run cargo, tests, pytest, clippy, fmt, or any build or test command, before or after. Do not commit or push. The only check is a diff with comments and blank lines removed from both sides. Identical output means no code moved. A difference must match a reported move, or the file is reverted.
