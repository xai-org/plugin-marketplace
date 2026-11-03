---
name: weekly-competitor-review
description: Write a weekly competitor review from a Debriefing workspace. It reads what changed in the last 7 days, ranks the competitor moves by severity, checks the evidence behind each one, and ends with recommended actions. Use it when the user asks what competitors did this week, asks for a weekly competitive update, or prepares a team meeting about competitors.
---

# Weekly competitor review

This skill writes a short weekly review of competitor moves from one Debriefing workspace. It uses the Debriefing MCP server at `https://debriefing.io/mcp`. Every claim in the review links to its source.

## Before you start

1. Call `get_workspace`. It names the workspace, your role, and the scopes of this connection.
2. If a tool answers `isError`, tell the user the reason and the link it gives. Do not guess the data.
3. This skill only reads. Do not call a tool that changes the workspace unless the user asks for that change.

## Steps

1. Call `what_changed` with `since` set to 7 days ago (ISO 8601). It lists the new signals, digests, and battlecards.
2. Call `list_competitors`. Use the names, not the ids, in the review.
3. Call `search_signals` with `since` set to 7 days ago and `severity: "high"`. Then call it again with `severity: "medium"`. Keep at most 8 signals in total.
4. For each signal you keep, call `get_evidence`. Keep the source URL, the excerpt, and the date Debriefing saw it. Drop a signal that has no evidence.
5. Call `list_digests` with `limit: 1`. If a digest is newer than 7 days, call `get_digest` and read its `headline` and `tldr`.

## Write the review

Write for a person who reads it in two minutes.

1. **Headline.** One sentence: the most important competitor move of the week and what it means for the user.
2. **What changed.** One line per signal, most severe first: the competitor, what it did, and the source link with its date.
3. **What it means.** Two or three sentences about the effect on the user's pricing, product, sales, or positioning. Say what is a fact from the evidence and what is your reading of it.
4. **Recommended actions.** At most three. Each action names who does it and what they do.
5. **Quiet competitors.** One line that lists the tracked competitors with no new signal this week.

Rules:

- Cite the source URL for each claim. Never state a move that has no evidence.
- Use one word for one thing. Use short sentences in the active voice.
- Do not use em dashes.

## Next steps the user can ask for

These tools change the workspace. Ask the user before you call one, and say what it will do.

- `pin_signal`: pins a signal for the team.
- `add_signal_note`: adds a talking point to a signal.
- `rate_signal`: tells Debriefing whether a signal was useful.
