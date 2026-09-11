---
name: gb-fix-comments
description: Fix every comment and name a PR introduced, using parallel subagents. Delete comments that restate the code, put the rest into plain words a stranger can read, one fact per sentence, one sentence per line, no metaphors, no deductions, no dashes; rename identifiers that use a banned word. Pure refactoring, never a behaviour change.
user-invocable: true
disable-model-invocation: true
argument-hint: "[PR number, branch, or 'local']"
---

# GB Fix Comments

Fix every comment the PR (or branch, or local diff) wrote, changed, or moved. Five goals, one section each:

1. **English that a person would say.** Plain words, one fact per sentence, no deductions, no textbook register.
2. **No AI slop words.** A literal ban list of metaphors and coinages.
3. **Comment length.** One line, two at most, and zero when the code already says it.
4. **Comment width.** Fill the line up to the language's limit.
5. **Natural line breaks.** One whole sentence per line; a break is a sentence boundary.

**Nothing in this pass may change what the program does.**

A comment is every piece of prose a person reads: `//`, `///`, `//!`, `#` in TOML and YAML, a `description` in `Cargo.toml`, the PR body, the commit message, and the reply to the user. The same rules apply to all of them. Skip generated files.

**Names are comments too.** A test name, a function name, a variable, a field, a type, a const: each is a sentence the reader gets before the code. Sections 1 and 2 apply to every name the PR introduced. Renaming is a code change, so the rename stays inside the PR's own files and every use site moves with it; report each one.

## 1. English that a person would say

**Goal.** A colleague who has never seen this file reads the comment and can say what happens and why. If you would not say it aloud at their desk, rewrite it as what you would say.

- **Write for a stranger.** Use the plainest word that carries the fact. Prefer the noun the code uses (a name the reader can grep) over an abstraction you invented.
- **One fact per sentence. At most 15 words. Two sentences is the ceiling.** Subject, then verb, then object. Never open with a participle ("Kept so...") or a relative clause.
- **No jargon the reader has not been taught.** A term that appears nowhere else in the file and is not an identifier is jargon. "hand-off", "surface", "plumbing", "lifecycle", "semantics", "orchestrate", "materialise" each hide a plainer word. A coinage ("seen-cap", "no-plane answer") is jargon on first use.
- **Unpack stacked noun compounds.** "Tab-fetched state", "the landing response", "pre-edit text" each compress a sentence the reader must rebuild. Name the actor, the action, and the object. Bad: `/// With the pipeline OFF, typing invalidates Tab-fetched state instead: the landing response for the pre-edit text is stale.` Good: `/// When the pipeline is off, typing after a Tab drops what the Tab fetched: that response answered the text as it was before the edit.`
- **No dressing.** Cut "note that", "importantly", "essentially", "simply", "of course", and any clause that admires the design.
- **Do not drop words.** Keep the subject, the verb, and the article. "Listed before those crates exist" has no subject. A fragment born short is still a fragment: verb-first imperatives ("Create socket file"), noun piles ("Time gate"), participles with no subject ("Styled like the shortcuts bar"). Expand it, or delete it if the sentence would restate the line below.
- **A test name states the behaviour it proves.** `fn rejects_expired_token`, never the mechanism or a metaphor. `fn test_2` and `fn arm_and_settle` both fail.
- **A function, variable, field, or const name says what the thing is or does, in the plainest word.** `pending_prompt`, not `parked_request`; `turn_ended`, not `turn_settled`; `is_running`, not `in_flight`. A name a stranger has to decode is jargon with a type signature.
- **Punctuation a person types.** No em-dashes, en-dashes, `--`, or a spaced hyphen standing in for one; use commas, periods, semicolons, or parentheses. No glyphs for words: no `→`, `⇒`, `✓`, `≤`, `->`, `=>`, `+` for "and", `=` for "is". Hyphens stay in compound words, CLI flags, and identifiers; glyphs stay in code blocks, diagrams, and arithmetic. Leave `// ---- section ----` separators alone.
- **A one-line** `//` **comment ends without a period.** `///` and `//!` keep rustdoc's full stop.
- **No design-doc coordinates.** `(K14/§6.15)`, `per R3 feedback`, ticket ids. Keep the fact, delete the citation. A repo-relative path that exists may stay.
- **Point at the thing.** A general truth about a category ("A collapsed row is a one-line summary") is textbook register: authoritative and committed to nothing. Use `this`, `the`, an identifier, a variant, a number, or a literal string. If it could be printed on a poster, it is too abstract for code.

| Reference manual                           | A person                                             |
| ------------------------------------------ | ---------------------------------------------------- |
| A refused note was never recorded anywhere | Nothing recorded it above                            |
| A collapsed row is a one-line summary      | These rows are one line each                         |
| A bare command opens a picker              | `/docs` opens a picker                               |
| A repeat stays where it happened           | `remember_prompt` used to `retain` the old copy away |

Two caveats. An identifier keeps its name: a comment may say `arm_rewind_window` because the reader can grep it. A term the whole file already uses is not jargon.

### The deduction comment

The most common machine-written comment is a small proof: a premise, then "so", then the consequence, and often "and" a second consequence.

```rust
/// `dir` holds no login, so `auth()` fails with NotLoggedIn and never reaches the network.
// Exit does not wait for this task, so an abandoned browser login cannot hold the TUI open.
```

**A comment states one fact. It never derives one.**

- No "so", "so that", "which means", "hence", "therefore", or "which" joining two clauses.
- Decide which clause is the point. If the code shows the premise, keep the consequence. If the consequence is obvious, keep the premise. Delete the other.
- Never add a second consequence with "and".
- A reason may follow as its own short sentence, subject first.
- A doc comment on a struct, field, function, or fixture names what the thing **is**, not what it causes.

| Deduction                                                                                     | Fact                                                                         |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `/// \`dir holds no login, so auth() fails with NotLoggedIn and never reaches the network.`   | `/// An auth manager with no stored login`                                   |
| `/// The login task cannot touch \`WorkerState, so it sends its result here`                  | `/// Where the login task reports its result`                                |
| `// Exit does not wait for this task, so an abandoned browser login cannot hold the TUI open` | `// Untracked on purpose. Exit does not wait for an abandoned browser login` |
| `/// A client on a socket that accepts and never answers, so the worker holds a live handle.` | `/// A client whose socket accepts and never answers`                        |
| `// The loop owns one sender on this channel, so it never closes and \`recv always waits.`    | `// Never closes. The loop holds a sender`                                   |

The test: cover the code and read the comment alone. If it reads as an argument ("because X, therefore Y"), rewrite it as the one fact.

## 2. No AI slop words

**Goal.** None of these appears in any comment, test name, function name, variable, field, type, or const the PR introduced. If one does, replace it. Never reach for one when rewriting or naming. A name the PR did not introduce keeps its word, and a comment may quote it, because the reader can grep it.

| Do not write                                                               | Why                                                                                                                           | Write instead                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "It is not X, it is Y.", "One might expect X, but Y."                      | Defines by denial. State Y.                                                                                                   | `// The message joins the running turn.`                                                                                                                                                                                              |
| "...is Y, not X." (trailing denial)                                        | Denial. Keep only when X is the reader's real assumption.                                                                     | `// A mismatch here is a developer error.`                                                                                                                                                                                            |
| "You're absolutely right!"                                                 | Flattery. Says nothing.                                                                                                       | Nothing, or the fact that follows.                                                                                                                                                                                                    |
| "Just say the word."                                                       | Filler.                                                                                                                       | Nothing, or the actual next step.                                                                                                                                                                                                     |
| "smoke test", "soak test"                                                  | Test jargon that names no specific check.                                                                                     | Say what runs and what it proves. `// Runs one command end to end.`                                                                                                                                                                   |
| "test seam"                                                                | Invented abstraction for "a way to set this in a test".                                                                       | `// Tests cannot set this without a real config file.`                                                                                                                                                                                |
| "riding", "rides on"                                                       | Coined phrase for a value carried in a message.                                                                               | `// The command is still running.`                                                                                                                                                                                                    |
| "pure code motion"                                                         | Reviewer shorthand.                                                                                                           | `// Moved, not changed.` if it needs saying at all.                                                                                                                                                                                   |
| "the smoking gun"                                                          | Metaphor.                                                                                                                     | Name the evidence.                                                                                                                                                                                                                    |
| "arm the X", "unarmed", "armed"                                            | Weapon metaphor for turning something on.                                                                                     | "enable", "turn on", "start", "set".                                                                                                                                                                                                  |
| "pins X", "pinned to X"                                                    | One word for four things: reads one file, holds a version, holds a sha, covers a behaviour.                                   | Say the action. `// The Bazel lint aspect reads the repo-root clippy.toml.` `// Cargo.toml holds tokio at 1.40.` `// The push rejects unless the remote is still at this sha.` `// This test fails if the retry stops being bounded.` |
| "settles", "never settles", "settled"                                      | Finance metaphor for a turn ending.                                                                                           | "ends", "finishes", "never ends". `// The dead daemon's turn never ends.`                                                                                                                                                             |
| "parked", "parks"                                                          | Car metaphor for a request that waits.                                                                                        | "waits", "is waiting". `// The prompt waits for TurnSettled.`                                                                                                                                                                         |
| "holds the X open", "held open", "keeps X open", "hold the TUI open"       | Door metaphor for a request with no answer yet, or a task that stops a process exiting. The reader has to work out which.     | Say what waits and for what. `// The session/prompt waits here until TurnSettled answers it.` `// Exit does not wait for this task.`                                                                                                  |
| "in flight"                                                                | Aviation metaphor for "running" or "not finished".                                                                            | "running", "still running", "not finished".                                                                                                                                                                                           |
| "retires", "retired"                                                       | Employment metaphor for dropping or ending something.                                                                         | "drops", "ends", "removes".                                                                                                                                                                                                           |
| "hands out", "hands back", "hands off"                                     | Physical metaphor for returning or passing a value.                                                                           | "returns", "sends", "gives".                                                                                                                                                                                                          |
| "yields"                                                                   | Generator jargon for "returns" or "produces".                                                                                 | "returns", "produces", "sends".                                                                                                                                                                                                       |
| "stand-in", "scripted"                                                     | Coined words for a test double.                                                                                               | The word the neighbouring tests use, usually "mock".                                                                                                                                                                                  |
| "seam"                                                                     | Sewing metaphor for where two parts meet or a way to inject a dependency.                                                     | Name the two parts and what passes between them.                                                                                                                                                                                      |
| "surfaces", "surfaced"                                                     | Metaphor for showing or reporting.                                                                                            | "shows", "reports", "returns".                                                                                                                                                                                                        |
| "wires", "wired up", "plumbs"                                              | Electrical and plumbing metaphors for connecting two things.                                                                  | "connects", "calls", "passes X to Y".                                                                                                                                                                                                 |
| "drives", "driven by"                                                      | Motor metaphor for calling or controlling.                                                                                    | "calls", "runs", "controls".                                                                                                                                                                                                          |
| "lands", "landed"                                                          | Aviation metaphor for merging or arriving.                                                                                    | "merges", "arrives", "is written".                                                                                                                                                                                                    |
| "gate", "gated", "gates on"                                                | Metaphor for a check that allows or refuses.                                                                                  | "check", "refuses unless", "runs only when".                                                                                                                                                                                          |
| "so that", "instead of", "rather than", "which is what", "as X does"       | Glues a second clause onto a finished sentence.                                                                               | End the sentence. Say the second fact in its own sentence, or drop it.                                                                                                                                                                |
| ", so ", ", and " joining two clauses, "which means", "hence", "therefore" | The joints of a deduction comment.                                                                                            | State the one fact. Cut the premise or the consequence, whichever the code shows.                                                                                                                                                     |
| A colon or semicolon joining a label to a clause                           | A heading with a sentence stapled on.                                                                                         | Two sentences. Subject, verb, object in each.                                                                                                                                                                                         |

## 3. Comment length

**Goal.** A comment is one line, two at most, and zero when the code already says it. Cover the comment, read the code and the names around it, and ask what you lost. Nothing lost means delete.

- **One line, two at most.** The second line carries a fact the first cannot. Cut what the code shows; do not move the surplus to a module doc or docs/.
- **A doc block is at most half the item it documents.** Four lines over a five-line function inverts the page. A `///` paragraph break earns its place only on an item too long to read whole.
- **Delete a doc that only expands the name.** `//! SystemMessageBlock: displays system messages.` says nothing the file name and the type do not. Keep a module doc only for a fact the names cannot carry: who calls this, an invariant, a gotcha.
- **Delete a summary that repeats the per-item docs below it.**
- **Delete a comment that restates the single statement below it.** `// Append tail to output` above `output.extend(tail)`.
- **Delete history and run instructions.** History belongs in git, run commands in the README.
- **Delete sentences that argue for the change.** `// Without this the trigger would only report slash traffic.` is the PR talking about itself. Keep the durable reason the code is there.
- **Delete an** `# Errors` **section that lists the variants.**
- **In a test, delete a comment that restates the assertion.** `// 8 - 3` beside `assert_eq!(x, 5)`.
- **Delete a policy another file owns.** A manifest `description` saying "Monorepo-only: the OSS export denies this crate" restates the export config and goes stale in silence. Keep the description in one sentence, in the shape its neighbours use.

Keep these: a **step label** over two or more statements (it is the group's name; when unsure whether a comment restates or names, keep it), a **label over data rows**, and a `SAFETY:` comment above `unsafe`.

## 4. Comment width

**Goal.** A comment that fits on one line is on one line.

- **Rust comments wrap at 150,** even when every existing comment in the file stops at 100. rustfmt's 100 is for code only; do not measure the file's current comment width.
- **Other languages: the formatter's configured limit,** else the dominant existing width in the file.
- **Do not wrap a comment that fits.** Two short lines where one would do is a wrap the reader pays for.

## 5. Natural line breaks

**Goal.** Every comment line is a whole sentence. A line break is a sentence boundary, never a word count.

- **One sentence per line. Never split a sentence across two comment lines.** Two facts are two whole sentences on two lines, even if the first line is short. A sentence that cannot fit on one line is too long: cut a clause or split it into two sentences.
- **Never strand the start of a sentence at the end of a line.** Bad: `/// Contributors dispatched in registration order. No` / `/// registration after build().` Break at the period.
- **Never leave a one-to-three-word orphan as the last line.** Rebalance or condense.

Beyond deletion and the rewrites above, never change a comment's meaning.

## Cost rules

This pass edits comments and renames identifiers the PR introduced. Do not run cargo, tests, pytest, clippy, fmt, or any build or test command, before or after. Do not commit or push. The only check is a diff with comments removed from both sides. Every remaining difference must be a reported rename, with every use site changed, or the file is reverted.
