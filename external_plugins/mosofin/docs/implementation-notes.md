# Implementation notes: source-conscious financial review

## Audience and purpose

This repository is for accountants, bookkeepers, accounting firms, CAS teams,
fractional CFOs, business owners, and developers who want to use MosoFin’s MCP
connection for review and analysis of authorized business data.

The plugin is intentionally a thin client. It connects to the existing remote
MosoFin MCP server, guides workspace confirmation and tool selection, and keeps
the response grounded in data fetched during the current conversation. It does
not bundle a financial database or copy customer records into this repository.

## Current product boundary

- Connected accounting platforms are the live financial data source.
- MosoFin tools exposed by this plugin are read-only except for the explicit,
  consent-gated ability to save a proven MosoFin skill.
- Read-only means the financial tools do not create, update, delete, post, send,
  pay, reconcile, or otherwise change financial records in the connected source.
- MosoFin supports questions across deliberately selected workspaces; it does
  not claim a released formal consolidation, forecasting, board-pack, scheduled
  distribution, or write-back accounting workflow.
- The AI assistant (Claude, Grok, ChatGPT, or another MCP client) prepares the conversation and analysis. The
  responsible person checks the support and owns the final judgment.

## Why workspace confirmation comes first

A financial question is unsafe when the company context is implicit. The call
order therefore starts with `list_workspaces`, asks the user to select by name,
and confirms the opaque workspace handles before any datasource operation.

For a multi-client firm, separate workspaces reduce the risk that one client’s
data or conclusion appears in another client’s review. For a multi-entity owner,
the same pattern makes the selected scope visible before a comparison begins.

## Why source discovery precedes analysis

The plugin does not assume a report or operation exists. It checks connected
datasources and their allowed tool catalog, then invokes only the operation that
fits the question. A missing connection, blocked tool, absent date, or ambiguous
company is a reason to stop and clarify—not a reason to invent a result.

Every data-backed answer should end with a **Data sources** line that identifies
the datasource and `fetched_at` value returned by the live tool call.

## Permission and failure behavior

- `approval_required` pauses for explicit user consent.
- `tool_policy_disabled` stops the operation; the plugin must not work around it.
- `entity_required` asks the user to select the displayed company.
- a reconnect URL is presented to the user; the plugin does not claim data was
  retrieved while the connection is unavailable.
- an invalid or inaccessible workspace is treated as unknown, without revealing
  other tenant information.

These behaviors are part of the product boundary, not incidental error handling.

## Building a reusable review

A repeatable financial review should state:

1. audience and decision supported;
2. required workspace, company, period, basis, and source coverage;
3. allowed read operations and calculation rules;
4. how facts, assumptions, unknowns, and exceptions are separated;
5. the output structure and supporting evidence;
6. human approval and follow-up ownership; and
7. how the workflow stops when inputs or support are missing.

Only save the workflow as a MosoFin skill after a real result exists and the user
approves the proposed skill. A saved skill preserves a useful method; it does not
grant new data access or authorize write actions.

## Public reference assets

- [Prompt library](./financial-review-prompt-library.md)
- [MCP tool specification](./mcp-tool-spec.md)
- [Plugin contract](./plugin-contract.md)
- [Multi-client month-end review checklist](https://www.mosofin.com/multi-client-quickbooks-month-end-review-checklist)
- [Financial review workflow directory](https://www.mosofin.com/workflows)

Examples in this repository must use synthetic data. Do not commit customer
records, credentials, access tokens, exported financial reports, or screenshots
containing private company information.

## License and contribution method

Code and documentation in this repository are available under the MIT License;
see [`LICENSE`](../LICENSE). Submit documentation corrections and new read-only
workflow patterns through a GitHub issue or pull request. A proposed workflow
should include its audience, source requirements, review checkpoints, expected
output, and failure behavior, and must preserve the boundary above.
