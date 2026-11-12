---
name: ncstatutes
description: >-
  Look up North Carolina law through the ncstatutes MCP server: the General Statutes, enacted
  session laws, the NC Constitution, the Supreme Court's court rules (Appellate, General
  Practice, Business Court) and the NC Administrative Code. Read by citation, search by topic,
  look up defined terms, trace amendment history, diff versions, find enacted changes not yet
  in effect, and follow cross-references. Use whenever North Carolina law comes up —
  "N.C.G.S.", "NCGS", "G.S. 20-141", "§ 14-72.1", "N.C. Gen. Stat.", "S.L. 2026-61",
  "N.C. Const.", "N.C. R. App. P.", "NCAC", or a question about what North Carolina law says.
---

# NC Statutes & Rules

The `ncstatutes` MCP server bundled with this plugin is a read-only mirror of North Carolina
law, refreshed weekly:

- the General Statutes and enacted session laws, and the NC Constitution (ncleg.gov)
- the Supreme Court's codified court rules (nccourts.gov)
- the NC Administrative Code (Office of Administrative Hearings)

It covers North Carolina only, and every tool is read-only.

## Choosing a tool

| Question | Tool |
|---|---|
| "What does G.S. 20-141 say?" | `get_statute` |
| A topic, no citation ("leaving a child unattended in a car") | `search_statutes`, then `get_statute` on the hit you want |
| "What does 'vehicle' mean in this section?" | `get_definition(term, section)`, or `get_statute(..., include_definitions=True)` |
| "When was this section amended, and by which session laws?" | `amendment_history` |
| "What will change / what changed in this section?" | `diff_statute` (`mode="pending"` for upcoming text) |
| "Is there enacted text that hasn't taken effect yet?" | `pending_changes` |
| "What took effect on 1 October?" / "What changed this year?" | `recent_law_changes` (`source="effective"` answers effective-date questions) |
| "Which sections of chapter 20 change most?" | `chapter_activity` |
| "What cites this section?" / "Which agency rules implement it?" | `cross_references` |
| "What does Sec. 5.14 of S.L. 2026-61 say?" | `get_session_law` |
| "What does Article I, Section 20 say?" | `get_constitution` |
| "Show me Appellate Rule 30(e)" / "Compare Rule 28 with 2019" | `get_court_rule` (`as_of="2019"` or `compare_with="2019"`) |
| An agency regulation by topic | `search_rules`, then `get_rule` |
| "When was this NCAC rule last amended?" | `rule_history` |

`search_statutes` and `search_rules` return ranked hits with fragments, not full text, so
follow up with `get_statute` or `get_rule`. Court shorthand such as AWDW, DWLR, FTA and PJC is
expanded to the statutory wording automatically.

Defined terms matter: many statute words are defined, and a definition applies only within its
scope (a section, Part, Article or Chapter). When an answer turns on a word such as "vehicle",
"person" or "dwelling", use `get_definition` rather than the ordinary meaning.

To read what an enacted act says, including uncodified "Notwithstanding G.S. ..." provisions
and amendments the codified text has not caught up with, use `get_session_law` rather than
fetching the act from ncleg.gov. `get_statute` also quotes the act provisions that name a
section (`act_text`); label that as session-law text, not codified text.

## Citations

- Statutes: section-level citations such as `14-72.1`, `G.S. 14-72.1` and `§ 14-72.1`. Ask for
  `20-141`, not `20-141(j1)`, and read the subsection from the returned text. Single rules of
  the Rules of Civil Procedure and Evidence are statutes: `1A-1, Rule 12`, `8C-1, Rule 104`.
- Session laws: `S.L. 2026-61`, with an act-section such as `Sec. 1.6`.
- Constitution: `N.C. Const. art. I, § 20`, or `Article I, Section 20`.
- Court rules: `N.C. R. App. P. 30(e)`, `App. R. 30`, `BCR 7.2`, `Rule 2 of the General Rules of Practice`.
- Agency rules: `26 NCAC 03 .0101`.

## Two limits to state in answers

- **Codified text lags enacted law.** Every response carries `codified_through`,
  `session_laws_through` and `modifications_through`. Mention how current the text is when
  it matters. A section missing from the codified text may still have been enacted.
- **Enacted law only.** Bills that are pending or awaiting signature are not included, so a
  missing result is never evidence that a bill did not pass. Point bill-status questions to
  the General Assembly at ncleg.gov.

This is raw text, not legal advice. Annotations and case notes are not included, and agency
rule text is the online code, not the official certified version.
