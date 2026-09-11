# gb-fix-pass

Code-quality passes for a branch, one subagent per changed file, in the order that leaves the least mess:

| Pass | Skill | What it does |
|---|---|---|
| 1 | `gb-extract-or-inline` | Names the rules hiding in long functions; extracts nothing that is only long |
| 2 | `gb-dead-and-duplicate` | Deletes what the change orphaned, consolidates what it reinvented, trims redundant tests and asserts |
| 3 | `gb-fix-comments` | Deletes comments that restate the code, rewrites the rest in plain words, renames identifiers that use a banned word |
| 4 | `gb-fix-layout` | Fixes blank lines so steps read as steps, moves a stranded line back to its group |
| 5 | `gb-unification-pass` | Read-only review of the whole branch for Agent Host migration work: existing types first, PR-sized pieces, one thing per PR. Skips itself on other work |

Each skill is also invocable on its own (`/gb-fix-comments`, and so on).

## Run it

`/gb-fix-pass` on a branch. The first run copies `workflows/gb-fix-pass.rhai` into `~/.grok/workflows/` (Grok discovers workflows there, not inside plugins). The workflow diffs the branch against `origin/main`, runs the four fix passes, then the unification review, and leaves every edit uncommitted. The report lands in the run's scratch directory as `gb-fix-pass.md`, and the run summary ends with the unification verdict.

None of the passes runs cargo or tests. Every question they ask is answered by reading and by `rg`.
