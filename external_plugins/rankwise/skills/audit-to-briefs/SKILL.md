---
name: audit-to-briefs
description: Turn a Rankwise AI visibility audit into content briefs. It reads the domain's scorecard, which tracked questions AI engines do not cite the brand for, and the ranked content opportunities, then drafts briefs for the biggest gaps and asks before approving any. Use it when the user asks why AI engines do not mention their brand, what to write next to get cited, or to turn an audit into a content plan.
---

# Audit to briefs

This skill turns a Rankwise audit into draft content briefs. It uses the Rankwise MCP server at `https://tryrankwise.com/api/mcp`. Every brief it proposes traces back to a measured citation gap.

## Before you start

1. Call `get_workspace`. It names the workspace, your role, and the scopes of this connection.
2. Call `get_plan_and_credits`. Note the credit balance and what one approved brief costs.
3. If a tool answers `isError`, tell the user the reason and the link it gives. Do not guess the data.
4. A score of `null` means Rankwise has not measured it yet. Never report it as 0.

If the user has no Rankwise account yet, call `score_ai_visibility` with their domain for an on-page readiness score. Its result carries a claim link: give it to the user, and one sign-in opens their own workspace with that domain added. The link works once and expires after 72 hours. Stop there: briefs need a workspace.

## Steps

1. Call `list_domains`. If there is more than one domain, ask the user which one.
2. Call `get_scorecard` with its `domain_id`. Keep the composite score and the two or three weakest dimensions with their recommendations.
3. Call `list_citations` with the `domain_id`. Group the rows by question. A question is a gap when no engine cites the brand. Keep the URLs the engines cite instead: they show what kind of page wins.
4. Call `list_opportunities` with `limit: 10`. Each opportunity has a topic, its queries, and demand, gap and feasibility scores. Skip one that already has a `brief_id`.
5. Call `list_briefs` with `status: "draft"` so you do not draft a brief that already exists.

## Propose the briefs

Show the user a short plan before you write anything to the workspace:

1. **Where you stand.** The composite score and the weakest dimensions, one line each.
2. **The gaps.** The questions no engine cites the brand for, with the pages the engines cite instead.
3. **Proposed briefs.** At most five, best opportunity first. For each: a working title, the target queries, the intent, and why it closes a gap. Name the opportunity it comes from.
4. **Fixes that are not content.** If a weak dimension is technical (structured data, robots rules, head tags), call `list_fixes` and list those fixes separately. Rankwise does not change the site; the user or their developer applies them.

Rules:

- Tie every brief to a measured gap. Never invent a search volume, a ranking, or a competitor claim.
- Use short sentences in the active voice. Do not use em dashes.

## Write to the workspace (ask first)

1. When the user agrees, call `create_brief` for each brief they picked, with `title`, `topic`, `intent`, `target_queries` and the `tracked_domain_id`. A draft brief costs nothing.
2. `approve_brief` spends credits and starts writing the AI draft. Call it only when the user says to approve a named brief. Send a unique `idempotency_key`, and reuse the same key if you retry.
3. Nothing is published by this skill. Publishing is a separate `publish_article` call the user asks for.
