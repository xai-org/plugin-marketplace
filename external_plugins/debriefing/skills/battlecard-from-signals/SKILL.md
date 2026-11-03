---
name: battlecard-from-signals
description: Build a sales battlecard for one competitor from the evidence-backed signals in a Debriefing workspace. It reads the competitor dossier, the recent signals and their sources, and the current battlecard, then writes talk tracks and objection answers that cite the evidence. Use it when the user prepares a sales call against a competitor or asks for a battlecard, talk tracks, or how to win against a competitor.
---

# Battlecard from signals

This skill builds a battlecard for one competitor from a Debriefing workspace. It uses the Debriefing MCP server at `https://debriefing.io/mcp`. Every point on the battlecard links to its source.

## Before you start

1. Call `get_workspace`. It names the workspace, your role, and the scopes of this connection.
2. If a tool answers `isError`, tell the user the reason and the link it gives. Do not guess the data.

## Steps

1. Call `list_competitors` and find the competitor the user named. If the name matches more than one competitor, ask the user which one.
2. Call `get_competitor` with its `competitor_id`. Read the company facts and the stored reads.
3. Call `search_signals` with the `competitor_id` and `since` set to 90 days ago. Keep the signals about pricing, packaging, product launches, positioning, and hiring.
4. For each signal you keep, call `get_evidence`. Keep the source URL, the excerpt, and the date.
5. Call `get_battlecard` with the `competitor_id`. If one exists, start from it and keep its notes from the team.
6. Call `get_company_profile`. Use the user's own positioning and differentiators to frame the talk tracks.

## Write the battlecard

1. **In one line.** What the competitor sells, to whom, and how they position it.
2. **Recent moves.** The three to five most important signals, newest first, each with its source link and date.
3. **Where we win.** Talk tracks that set the user's differentiators against the competitor's recent moves.
4. **Where they win.** Be honest. Sales needs to know the real risks.
5. **Objections and answers.** Three likely objections from a buyer and a short answer to each, grounded in the evidence.
6. **Landmines.** Questions a seller can ask a buyer that expose the competitor's weak points.

Rules:

- Cite the source URL for each claim about the competitor. Never state a move that has no evidence.
- Say what is a fact from the evidence and what is your advice.
- Use short sentences in the active voice. Do not use em dashes.

## Save it in Debriefing (ask first)

These tools change the workspace. Ask the user before you call one, and say what it will do.

- `add_battlecard_note`: saves one talking point on the competitor. The next battlecard Debriefing writes reads it.
- `generate_battlecard`: asks Debriefing to rewrite its own battlecard for the competitor now. It uses the `spend` scope and counts toward a daily cap. Send a new `idempotency_key`, such as a UUID, and send the same key if you retry.
