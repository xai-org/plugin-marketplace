# NC Statutes & Rules plugin for Grok Build

Connect Grok Build to North Carolina law through the hosted
[ncstatutes.com](https://ncstatutes.com) MCP server, mirrored weekly from the official sources:

- **General Statutes** and the text of **enacted session laws** (ncleg.gov)
- **NC Constitution** (ncleg.gov)
- **Court rules** of the Supreme Court: the Rules of Appellate Procedure, the General Rules of
  Practice and the Business Court Rules (nccourts.gov), with earlier codifications back to 2019
- **NC Administrative Code**, the rules state agencies adopt (Office of Administrative Hearings)

Search by topic, read any section or rule by citation, look up what a defined term means in the
section that uses it, trace amendment history back to the 1800s, diff versions, see enacted
changes not yet in effect, and follow cross-references in both directions.

Free, public and read-only. No account, API key or sign-in.

## Installation

In Grok Build, open `/plugin`, search for **ncstatutes**, and install. The tools are
available immediately; there is no sign-in step.

## What you get

- **MCP server** `ncstatutes` at `https://mcp.ncstatutes.com/mcp` (Streamable HTTP, no
  authentication).
- **Skill** `ncstatutes`: which tool answers which question, the citation formats the tools
  accept, and the two limits of the data that should be stated in answers.

### Tools

All 15 tools are read-only.

| Tool | What it does |
|---|---|
| `search_statutes` | Find statute sections by topic when you have no citation |
| `get_statute` | Text of one section by citation ("14-72.1", "G.S. 20-141", "1A-1, Rule 12") |
| `get_definition` | What a defined term means in the section that uses it, and why that definition applies |
| `amendment_history` | Every session law that amended a section, back to the 1800s |
| `diff_statute` | Word-level diff between two versions of a section |
| `pending_changes` | Enacted text with a future effective date |
| `recent_law_changes` | What changed or took effect in a date range |
| `chapter_activity` | Amendment counts by year and the most-amended sections in a chapter |
| `cross_references` | What a section cites, what cites it, and the agency rules adopted under it |
| `get_session_law` | The text of an enacted act, by act-section, including uncodified provisions |
| `get_constitution` | NC Constitution by citation ("N.C. Const. art. I, § 20") or topic |
| `get_court_rule` | Appellate, General Practice and Business Court rules; earlier versions and diffs |
| `search_rules` | Find NC Administrative Code rules by topic |
| `get_rule` | One NCAC rule by citation ("26 NCAC 03 .0101"), with status and authority |
| `rule_history` | When an NCAC rule was adopted, amended or repealed, with diffs |

## Example prompts

- "What does N.C.G.S. 20-141 say, and is it about to change?"
- "What does 'impairing substance' mean for NC DWI?"
- "How has G.S. 14-72 been amended over time?"
- "What does Section 1.6 of Session Law 2026-61 say?"
- "What does Article I, Section 20 of the NC Constitution say?"
- "Compare Appellate Rule 28 as codified in 2019 with today's version."
- "Which agency rules were adopted under the authority of G.S. 90-85.6?"

More examples, with what the answers contain: [ncstatutes.com/examples](https://ncstatutes.com/examples)

## Limits

- Statute text is the **codified** text, which lags enacted law. Every response reports how
  current it is (`codified_through`, `session_laws_through`).
- Pending bills are not included; for bill status, use ncleg.gov.
- Agency rule text is the online code, not the official certified version.
- Raw text, not legal advice. Annotations and case notes are not included.

## Network and credentials

- **Network endpoint:** `https://mcp.ncstatutes.com/mcp` only, for lookups.
- **Credentials:** none. The plugin reads no files, environment variables or secrets, and
  includes no hooks or scripts.
- **Privacy:** [ncstatutes.com/privacy.html](https://ncstatutes.com/privacy.html)

## About

ncstatutes is a service of [SmartBump, Inc.](https://smartbumpinc.com) The server is
listed in the official MCP Registry as `com.ncstatutes/ncgs`, with the namespace verified
through DNS. Contact: mike@smartbumpinc.com

## License

MIT
