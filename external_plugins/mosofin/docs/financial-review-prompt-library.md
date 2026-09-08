# Financial review prompt library

These prompts are practical starting points for MosoFin’s permission-scoped,
read-only workspace in Claude, Grok, ChatGPT, or another supported MCP client. They do not add
permissions, change source records, or replace accounting judgment.

Connected accounting platforms are the live financial data source. Describe a
source as available only once it is connected and verified in the workspace.

## Before every review

Use this scope block before the task-specific prompt:

```text
List my accessible MosoFin workspaces and ask me to confirm the workspace or
workspaces for this review. Then confirm the connected company file,
reporting period, accounting basis, and available source coverage.

Retrieve only the data required for the question. Cite the fetched source and
time, separate facts from assumptions, flag missing or inconsistent data, and
do not change, post, send, pay, reconcile, or delete any record. I will review
the support and make the final decision.
```

## 1. Period-over-period P&L review

```text
For the confirmed workspace, compare the profit and loss statement for
[current period] with [comparison period] using [cash/accrual] basis.

Show the largest revenue, direct-cost, gross-profit, operating-expense, and net
income changes. For each material change, give the amount, percentage where the
denominator is meaningful, and the supporting account or report context. Mark
an explanation as unknown when the retrieved records do not prove the cause.
End with the five most useful follow-up questions for the reviewer.
```

## 2. Profit versus cash question

```text
The business appears profitable for [period], but cash is under pressure.
Review the P&L together with available cash, receivables, payables, and relevant
balance-sheet activity for the confirmed company and period.

Explain which observed movements can make profit and cash differ. Distinguish
recorded facts from timing hypotheses, identify missing information, and list
the source checks a person should complete before making a liquidity decision.
Do not produce a cash forecast unless I explicitly provide the assumptions and
ask for a clearly labeled scenario.
```

## 3. A/R aging and collections exceptions

```text
Review accounts receivable as of [date] for the confirmed workspace. Reconcile
the aging total with the compatible control-account or balance-sheet amount
when the required reports are available.

Group balances by aging bucket, identify customer concentration, and prioritize
exceptions for human review. Check for credits, payments, disputes, or missing
fields before recommending contact. Any communication must remain an unsent,
review-only draft. Do not chase a customer whose net supported balance is zero.
```

For the complete workbook method, use the public
[A/R aging and collections guide](https://www.mosofin.com/blog/quickbooks-ar-aging-collections-workbook).

## 4. Multi-client monthly review

```text
I manage separate client workspaces. Ask me to select one client before each
review and never combine one client’s facts with another client’s conclusion.

For the selected client and [period], run this review structure: confirm scope,
validate the P&L and balance-sheet dates and basis, identify material changes,
review cash and receivables exceptions, record missing support, and produce a
follow-up list with owner and due date fields. Stop for confirmation before
moving to the next client.
```

Use the public
[multi-client month-end review checklist](https://www.mosofin.com/multi-client-quickbooks-month-end-review-checklist)
to document the 17 review steps and reviewer approval.

## 5. Selected-company comparison

```text
Ask me to confirm the company workspaces included in this question.
For [period], compare [metric or report] across only those selected companies.
Show each company separately before any combined analytical total. Preserve the
company, period, basis, currency, and source context for every figure.

Label any sum across companies as an illustrative combined analysis. Do not
call it a consolidation or consolidated financial statement, and do not imply
that eliminations, ownership rules, currency translation, close controls, or
formal reconciliation procedures were performed.
```

## 6. Unusual-expense review

```text
For the confirmed company and [period], identify expenses that are unusual by
amount, frequency, vendor, account, or change from [comparison period]. Show the
supporting transactions or report lines retrieved for each item.

Do not label an item fraudulent, erroneous, or misclassified without evidence.
Group the output into: observed fact, possible explanation, missing evidence,
and person responsible for follow-up.
```

## 7. Save a proven review as a skill

Use only after the review produced a useful, verified result:

```text
Summarize the review method we just completed, including required inputs,
source checks, calculation rules, output structure, and human approval points.
Show me the proposed reusable MosoFin skill before saving it. Do not expand its
permissions or turn any review-only output into an action. Save it only after I
explicitly approve the final skill text.
```

## What a strong answer should contain

- confirmed workspace and company scope;
- reporting period, accounting basis, and material filters;
- source names and fetch timestamps;
- figures traceable to retrieved reports or records;
- facts separated from assumptions and unknowns;
- missing or inconsistent data called out plainly;
- review-only drafts clearly labeled as not sent;
- next steps assigned to an authorized person; and
- no claim that read-only analysis performed a formal close or consolidation.
