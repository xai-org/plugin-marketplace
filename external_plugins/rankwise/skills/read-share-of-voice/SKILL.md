---
name: read-share-of-voice
description: Read a domain's AI share of voice from Rankwise and explain it. It reads the latest share of voice snapshot and its history, the competitor leaderboard, the per-question citations, and recent citation wins and losses, then says what moved and why. Use it when the user asks how often AI engines mention their brand, how they compare with competitors in AI answers, or whether their AI visibility went up or down.
---

# Read share of voice

This skill explains a domain's AI share of voice from one Rankwise workspace. It uses the Rankwise MCP server at `https://tryrankwise.com/api/mcp`. It only reads, unless the user asks for a fresh snapshot.

## Before you start

1. Call `get_workspace`. It names the workspace, your role, and the scopes of this connection.
2. If a tool answers `isError`, tell the user the reason and the link it gives. Do not guess the data.
3. A snapshot of `null` means share of voice was never measured. Say so. Never report it as 0%.

## Steps

1. Call `list_domains`. If there is more than one domain, ask the user which one.
2. Call `get_share_of_voice` with its `domain_id`. Keep the share of voice, the brand's own citations and mentions, the capture date, the competitor leaderboard, and the earlier snapshots.
3. Call `list_citations` with the `domain_id`. Count, per engine, the questions where the engine cites the brand. An engine that failed to answer is not a lost citation: leave it out.
4. Call `list_visibility_events` with `domain_id` and `since` set to 30 days ago. Keep the citations won and lost.

## Write the readout

1. **The number.** The share of voice, the date it was captured, and the change since the earliest snapshot you have. If there is only one snapshot, say there is no trend yet.
2. **Against competitors.** The top five on the leaderboard with their share, and where the brand sits.
3. **Per engine.** One line per engine: how many tracked questions cite the brand.
4. **What moved.** The citations won and lost in the last 30 days, each with its question and engine.
5. **What to do next.** At most three actions. If the gaps are content gaps, offer the `audit-to-briefs` skill.

Rules:

- Use only measured numbers from the tools. Never estimate a share for a competitor or an engine that Rankwise did not measure.
- Use short sentences in the active voice. Do not use em dashes.

## Fresh snapshot (ask first)

`refresh_share_of_voice` buys new data. It returns the last snapshot instead when one is less than 12 hours old, and it costs no credits. Call it only when the user asks for a fresh number. Send a unique `idempotency_key`, and reuse the same key if you retry.
