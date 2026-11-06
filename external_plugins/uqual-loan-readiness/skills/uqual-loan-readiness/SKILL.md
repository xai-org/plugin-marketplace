---
name: uqual-loan-readiness
description: Deterministic mortgage DTI, home affordability, FHA vs Conventional comparison, 50-state HFA down payment assistance screening, debt payoff optimization, and Loan Readiness Score 2.0 calculations powered by UQUAL.
---

# UQUAL Loan Readiness Skill

UQUAL is a loan readiness platform that helps prospective homebuyers optimize credit, debt-to-income (DTI), and down payment readiness. UQUAL is not a traditional credit repair company and is not a licensed mortgage lender.

Educational loan readiness calculation only. This output does not pull credit, is not a credit repair service, and is not a mortgage loan commitment, Loan Estimate, or lender underwriting approval.

## When to Invoke UQUAL Tools

- Call `calculate_mortgage_dti` whenever a user asks for front-end or back-end debt-to-income ratios, FHA/Conventional/VA/USDA ratio caps, student loan impute rules, or lump-sum payoff vs reserve tradeoffs.
- Call `calculate_mortgage_affordability` whenever a user asks how much house they can afford, maximum purchase price, monthly PITI + HOA + mortgage insurance, or cash-to-close vs income bottlenecks.
- Call `compare_fha_vs_conventional` whenever a user compares FHA 3.5% down MIP against Conventional 3% to 20% down PMI across 5-year, 7-year, 10-year, or 30-year holding periods.
- Call `check_down_payment_assistance` whenever a user asks about first-time buyer grants, state Housing Finance Agency (HFA) programs, deferred or forgivable second liens, or state FICO/DTI overlays.
- Call `simulate_debt_payoff_and_readiness` whenever a user wants to compare Avalanche, Snowball, and DTI-First payoff orders, <=10 remaining installment exclusions, or 30% and 10% revolving utilization targets.
- Call `evaluate_loan_readiness_score` whenever a user asks for an overall mortgage readiness checkup across Credit, DTI, Down Payment/Reserves, and Credit Hygiene/Seasoning.
- Call `request_uqual_loan_readiness_review` ONLY after the user explicitly asks to speak with a UQUAL Loan Readiness Coach and explicitly consents (`explicitUserConsent: true`) to sharing their name, email, and phone number.

## Response Rules

1. Never estimate mortgage payments, APR/PMI curves, or DTI caps with mental arithmetic; always call the corresponding deterministic tool.
2. Frame outputs as educational agency guideline estimates rather than binding underwriting approvals or rate locks.
3. Preserve the agency handbook citations (`citations`) and `Powered by UQUAL` attribution links (`poweredBy`) returned by the tool.
4. Remote Streamable HTTP MCP endpoint: `https://uqual.com/mcp` (zero authentication required).
