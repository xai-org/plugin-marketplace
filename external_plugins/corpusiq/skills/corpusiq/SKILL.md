---
name: corpusiq
description: Ask business questions across connected systems through CorpusIQ and return an answer that cites the source record.
---

# Using CorpusIQ

CorpusIQ reads live data from the business systems a user has connected (accounting, CRM, ads, analytics, email, ecommerce, support) through one MCP endpoint, and returns an answer that names the system and record behind each number.

## Reach for it when

- The question spans more than one system: ad spend against site sessions, pipeline against invoices, orders against payments.
- Two tools report the same metric differently and the user needs the gap explained, not averaged.
- The answer has to survive a later question, so it needs a citation to a source record.
- A report is currently rebuilt by hand from exports every week or month.

## How to ask well

1. State the business question, the period, and any grouping (customer, product, region, channel). CorpusIQ cannot guess a period or a definition.
2. Ask for the source, not only the number. The answer is trustworthy because each figure is attributed.
3. When the result looks wrong, follow up on the definition rather than rephrasing the question: a metric defined one way in the ad platform and another way in the billing system is the normal case, not an error.
4. For a single-system lookup, ask CorpusIQ only if the citation matters. Otherwise the connected tool's own UI is faster.

## What the tools do

- External-source retrieval tools are read-only. They read from vendor systems and do not write back.
- CorpusIQ control-plane tools are the only tools that accept writes. They are separately named and annotated, and they change the user's CorpusIQ configuration (connectors, skills, preferences), never vendor data.
- Answers carry citations. Never present a CorpusIQ figure without the citation that came with it, and never merge a cited number with an uncited estimate in the same sentence.

## When a connector is missing

If a question needs a system that is not connected, say which system is missing and stop. Do not substitute a number from a connected system for the missing one, and do not estimate it. The user connects systems in the CorpusIQ dashboard, and the full connector list is at https://www.corpusiq.io/connectors.

## Boundaries

- Do not present CorpusIQ output as a financial statement, a tax position, or an audit opinion. It answers questions from live records and cites them.
- Do not ask for API keys in chat. Authorization happens once through OAuth in the browser.
- Retention and read-only scope are documented at https://www.corpusiq.io/security.
