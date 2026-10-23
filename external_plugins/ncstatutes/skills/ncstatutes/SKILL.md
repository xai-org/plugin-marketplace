---
name: ncstatutes
description: >-
  Look up the North Carolina General Statutes through the ncstatutes MCP server: read a
  section by citation, search the statute book by topic, trace amendment history, diff
  versions, find enacted-but-not-yet-effective changes, and follow cross-references. Use
  whenever a North Carolina statute comes up — "N.C.G.S.", "NCGS", "G.S. 20-141",
  "§ 14-72.1", "N.C. Gen. Stat.", or a question about what North Carolina law says.
---

# NC General Statutes

The `ncstatutes` MCP server bundled with this plugin is a read-only mirror of the North
Carolina General Statutes from [ncleg.gov](https://www.ncleg.gov), refreshed weekly. It
covers North Carolina only, and every tool is read-only.

## Choosing a tool

| Question | Tool |
|---|---|
| "What does G.S. 20-141 say?" | `get_statute` |
| A topic, no citation ("leaving a child unattended in a car") | `search_statutes`, then `get_statute` on the hit you want |
| "When was this section amended, and by which session laws?" | `amendment_history` |
| "What cites this section?" / "What does it cite?" | `cross_references` |
| "Is there enacted text that hasn't taken effect yet?" | `pending_changes` |
| "What will change / what changed in this section?" | `diff_statute` (`mode="pending"` for upcoming text) |
| "What took effect on 1 October?" / "What changed this year?" | `recent_law_changes` (`source="effective"` answers effective-date questions) |
| "Which sections of chapter 20 change most?" | `chapter_activity` |

`search_statutes` returns ranked hits with fragments, not full text, so follow up with
`get_statute`. Court shorthand such as AWDW, DWLR, FTA and PJC is expanded to the statutory
wording automatically.

## Citations

Pass section-level citations: `14-72.1`, `G.S. 14-72.1` and `§ 14-72.1` all work.
Subsection citations such as `20-141(j1)` are not accepted; ask for `20-141` and read the
subsection from the returned text.

## Two limits to state in answers

- **Codified text lags enacted law.** Every response carries `codified_through`,
  `session_laws_through` and `modifications_through`. Mention how current the text is when
  it matters. A section missing from the codified text may still have been enacted.
- **Enacted law only.** Bills that are pending or awaiting signature are not included, so a
  missing result is never evidence that a bill did not pass. Point bill-status questions to
  the General Assembly at ncleg.gov.

This is raw statute text, not legal advice. Annotations and case notes are not included.
