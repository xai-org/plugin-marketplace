---
name: tradiebridge
description: >-
  Answer questions from a trade business's TradieBridge backup of Simpro, Xero,
  Deputy, Verizon Connect, The Fleet Office or Moveware through the TradieBridge
  MCP server. Use when the user mentions TradieBridge, or asks about their own
  jobs, quotes, invoices, customers, timesheets, rosters, vehicles, trips or
  removal jobs held in one of those systems.
---

# TradieBridge

TradieBridge copies a trade business's records out of the systems it runs on (Simpro, Xero, Deputy,
Verizon Connect, The Fleet Office and Moveware) into a backup the business owns. The `tradiebridge`
MCP server reads that backup. It never writes to a source system.

The first call opens a TradieBridge sign-in in the browser. The user needs a TradieBridge account
with at least one source connected (https://app.tradiebridge.com).

## How to answer a question

1. `list_connections` names the company's builds. A build is the copy of one source. Pass its `id`
   as `build_id` to the other tools.
2. `discover_questions` lists the common questions the server answers in one call (receivables,
   quotes won, hours by employee, and more). If one fits, call `ask_question`. It reads the copy on
   the server and is the cheapest path.
3. Otherwise `describe_resources` says what a build holds and which columns can be filtered,
   ordered, summed and grouped.
4. `summarize_records` counts, sums and groups. Use it for totals instead of paging through
   `search_records`.
5. `search_records` finds records, and `get_record` returns a record exactly as the source sent it,
   with the records it links to.

Two sources measure different ledgers. When `ask_question` answers from several builds, show each
build's answer beside the others and never add them together.

`discover_operations` with `call_read_operation` and `call_write_operation` reach every other screen
and action in the app, such as starting a sync or emailing an export. Confirm with the user before a
write.

When the copy cannot answer, or a figure looks wrong, offer `send_feedback`. Read the title and
details back to the user and send only once they agree.

## Privacy

Agents never receive tax file numbers, bank details or birth dates: the server redacts them.
