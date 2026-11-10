# UQUAL Loan Readiness Plugin (Universal 2026 Package)

UQUAL is a loan readiness platform that helps prospective homebuyers optimize credit, debt-to-income (DTI), and down payment readiness. UQUAL is not a traditional credit repair company and is not a licensed mortgage lender.

Educational loan readiness calculation only. This output does not pull credit, is not a credit repair service, and is not a mortgage loan commitment, Loan Estimate, or lender underwriting approval.

## Included Capabilities (Zero Authentication Required)

- **Calculate Mortgage DTI & Agency Limits** (`calculate_mortgage_dti`): Computes front-end and back-end mortgage debt-to-income (DTI) ratios, student loan agency imputations (Fannie Mae, Freddie Mac, FHA, VA), maximum allowable monthly debt across FHA (31/43 standard, 46.99/56.99 AUS), Conventional (28/36 to 45/50 AUS), VA (41% benchmark), and USDA (29/41), plus...
- **Calculate Mortgage Affordability & Purchasing Power** (`calculate_mortgage_affordability`): Computes maximum affordable home purchase price across FHA, Conventional, VA, and USDA, full PITI + MIP/PMI + HOA breakdown, required cash-to-close, and how +20/+40/+60 credit score gains or monthly debt reduction expand purchasing power.
- **Compare FHA vs Conventional Mortgage Cost & Crossover** (`compare_fha_vs_conventional`): Compares FHA (3.5% down at 580+, 1.75% UFMIP + annual MIP) against Conventional (3% first-time buyer / 5% standard down at 620+, credit-tiered PMI with 80%/78% LTV cancellation), returning 5-year and 10-year total cost and the exact credit score crossover point.
- **Check State HFA Down Payment Assistance Eligibility** (`check_down_payment_assistance`): Evaluates eligibility and estimated assistance amounts for state HFA programs (TX TSAHC/TDHCA, FL Florida Housing/Hometown Heroes, CO CHFA, GA Georgia Dream, NC NCHFA NC Home Advantage and $15,000 NC 1st Home Advantage, plus national baseline FTHB rules).
- **Simulate Debt Payoff (Avalanche vs Snowball vs DTI-First)** (`simulate_debt_payoff_and_readiness`): Simulates Avalanche vs Snowball vs UQUAL Mortgage-Readiness DTI-First payoff, targeting installment debts near <=10 remaining payments per Fannie/Freddie/FHA exclusion rules and revolving credit cards above 30% and 10% utilization thresholds.
- **Evaluate 4-Pillar Loan Readiness Score 2.0** (`evaluate_loan_readiness_score`): Computes UQUAL's 4-Pillar Loan Readiness Score (0 to 100) across Credit Middle Score, DTI, Down Payment/Reserves, and Credit Hygiene/Seasoning with compensability cap diagnostics, multi-program alignment, and prioritized counterfactual action steps.
- **Request UQUAL 1-on-1 Loan Readiness Coach Review (Opt-In)** (`request_uqual_loan_readiness_review`): Opt-in lead handoff tool invoked ONLY when the user explicitly consents to share contact details for a personalized UQUAL Loan Readiness Coach review via uqual.com/api/seo-leads.

## Supported Marketplaces & Transports

- **OpenAI ChatGPT Plugin Directory (`Finance`)**: Agent Plugins 1.0.0 `plugin.json` + remote Streamable HTTP MCP (`https://uqual.com/mcp`).
- **Anthropic Claude Directory (`Finance`)**: `.claude-plugin/plugin.json` + `.mcp.json` (`https://uqual.com/mcp`).
- **xAI Grok Marketplace (`finance`)**: `plugin.json` + `.grok-plugin/marketplace-entry.json`.
- **Google Gemini CLI Extensions**: `gemini-extension.json` + `GEMINI.md` + `skills/uqual-loan-readiness/SKILL.md`.
- **Local Stdio MCP**: `npx -y @uqual/mcp-loan-readiness`
- **Interactive Developer Playground**: https://uqual.com/plugins/playground

## Privacy & Consent Policy

- Six of the seven tools are strictly read-only deterministic calculators (`readOnlyHint: true`, `openWorldHint: false`) that process numeric scenarios without collecting personal identifiers.
- `request_uqual_loan_readiness_review` (`readOnlyHint: false`, `openWorldHint: true`) requires `explicitUserConsent: true` and valid borrower contact details before sending a consultation request to UQUAL.
- Privacy Policy: https://uqual.com/privacy
- Terms of Service: https://uqual.com/terms
- Support: https://uqual.com/contact
