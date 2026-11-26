---
name: haulforza
description: Use the HaulForza MCP tools to look up trucking companies, loads, drivers and company financial summaries, and to create loads or change a load status after the user confirms. Use when the user asks about their HaulForza loads, drivers, dispatch, revenue, driver pay or expenses.
---

# HaulForza

HaulForza is a trucking management system for carriers and dispatchers. The `haulforza` MCP server exposes the signed-in user's HaulForza data. Access is limited to the companies and records the user's HaulForza role allows.

## Tools

Read-only:

- `list_companies`: companies the signed-in user belongs to. Call this first when a company is not clear.
- `list_loads`: loads for a company (broker, stops, rate, assigned drivers, status).
- `get_load`: full detail for one load.
- `list_drivers`: drivers for a company.
- `company_summary`: revenue, driver pay and expenses for a company over a period.

Write (only when the user's role allows):

- `create_load`: create a new load.
- `update_load_status`: change the status of an existing load.

## Instructions

1. If the user has more than one company, confirm which one before reading or writing.
2. Prefer read-only tools to answer questions. Quote load numbers, amounts and dates exactly as returned.
3. Before calling `create_load` or `update_load_status`, show the user exactly what will be created or changed and wait for an explicit yes.
4. If a tool returns a permission error, tell the user their HaulForza role does not allow that action; do not retry with other tools.
5. Never invent loads, drivers or amounts that the tools did not return.
