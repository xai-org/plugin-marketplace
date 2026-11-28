---
name: patfee
description: Use PATFEE to estimate international patent family costs, compare filing routes, or generate a PDF for an individual patent budget.
---

# Patent budgets with PATFEE

1. Call `patfee_get_options` to confirm supported filing offices, routes, currencies and report languages when these are relevant to the request. Collect the cost assumptions with the tool schema and clarify material missing inputs.
2. Call `patfee_calculate_budget` for one budget or `patfee_compare_scenarios` for two or three scenarios with a shared first-filing date and currency. Keep the jurisdictions, route and cost assumptions visible. Use the returned estimates, currency, exclusions and any missing costs. Treat translation costs as optional and report whether they were priced.
3. For a PDF, pass the reference returned by a fresh individual calculation to `patfee_generate_report`. Give the user the returned download link and expiry. A comparison can be accompanied by individual scenario PDFs.

Dates, jurisdictions, numerical parameters and fee assumptions are sufficient for an estimate. A hypothetical case does not require the name of an inventor or the contents of a patent application.
