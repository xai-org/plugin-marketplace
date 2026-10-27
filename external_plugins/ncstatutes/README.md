# NC General Statutes plugin for Grok Build

Connect Grok Build to the North Carolina General Statutes through the hosted
[ncstatutes.com](https://ncstatutes.com) MCP server. Search the statute book by topic, read
any section by citation, trace amendment history back to the 1800s, diff versions, see
enacted-but-not-yet-effective changes, and follow cross-references.

Free, public and read-only. No account, API key or sign-in.

## Installation

In Grok Build, open `/plugin`, search for **ncstatutes**, and install. The tools are
available immediately; there is no sign-in step.

## What you get

- **MCP server** `ncstatutes` at `https://mcp.ncstatutes.com/mcp` (Streamable HTTP, no
  authentication).
- **Skill** `ncstatutes`: which tool answers which question, the citation format the tools
  accept, and the two limits of the data that should be stated in answers.

### Tools

All 8 tools are read-only.

| Tool | What it does |
|---|---|
| `search_statutes` | Find sections by topic when you have no citation |
| `get_statute` | Text of one section by citation ("14-72.1", "G.S. 20-141") |
| `amendment_history` | Every session law that amended a section, back to the 1800s |
| `cross_references` | What a section cites, and what cites it |
| `pending_changes` | Enacted text with a future effective date |
| `diff_statute` | Word-level diff between two versions of a section |
| `recent_law_changes` | What changed or took effect in a date range |
| `chapter_activity` | Amendment counts by year and the most-amended sections in a chapter |

## Example prompts

- "What does N.C.G.S. 20-141 say?"
- "Which NC statute covers assault with a deadly weapon?"
- "How has G.S. 14-33 been amended over time?"
- "Which statutes cite G.S. 15A-544.5?"
- "Which NC statutes have enacted changes that aren't in effect yet?"
- "What NC statutes took effect since July 1, 2026?"

## Limits

- The data is the **codified** text mirrored weekly from ncleg.gov, which lags enacted law.
  Every response reports how current it is (`codified_through`, `session_laws_through`).
- Pending bills are not included; for bill status, use ncleg.gov.
- Raw statute text, not legal advice. Annotations and case notes are not included.

## Network and credentials

- **Network endpoint:** `https://mcp.ncstatutes.com/mcp` only, for statute lookups.
- **Credentials:** none. The plugin reads no files, environment variables or secrets, and
  includes no hooks or scripts.
- **Privacy:** [ncstatutes.com/privacy.html](https://ncstatutes.com/privacy.html)

## About

ncstatutes is a service of [SmartBump, Inc.](https://smartbumpinc.com) The server is
listed in the official MCP Registry as `com.ncstatutes/ncgs`, with the namespace verified
through DNS. Contact: mike@smartbumpinc.com

## License

MIT
