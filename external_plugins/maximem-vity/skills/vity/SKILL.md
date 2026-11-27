---
name: vity
description: >-
  Use the user's Maximem Vity personal memory through the Vity MCP server: recall
  their profile, preferences, history, decisions, projects and relationships, check what
  they already know about a topic, save new facts about them, and draft or
  rewrite messages in their own writing voice. Use whenever an answer depends on who
  the user is ("what do you know about me", "what did I decide about X", "catch me up
  on Y"), when the user says "remember this", "write this as me" or "in my voice",
  or when "Vity", "Maximem" or their memory vault comes up.
---

# Maximem Vity

Vity is the user's personal AI memory. The `vity` MCP server bundled with this plugin
reads from and writes to **their own** vault, identified only by their API key. No tool
takes a user, account or vault argument, so you never need to pass an identity.

## Before you act

1. **Recall before answering personal questions.** If the answer depends on the user's
   preferences, history, projects or people, call `recall_context` with their actual
   words first. Do not answer from guesses and then check. For who they are (name,
   role, location, skills), `get_profile_card` is a fast first read.
2. **Memory is evidence, not certainty.** Speak from what the tools return. If recall
   comes back empty or low-confidence, say you don't have that in their memory rather
   than inventing it.
3. **Respect "confirm before use".** If `recall_context` says the user has "confirm
   before use" on, list the memories it returned, numbered, and ask which to use
   ("all", "none" or numbers). Use only the ones they confirm.
4. **Report a `remember` result exactly as the tool states it.** Depending on the
   user's Vity setup, a fact is either saved straight away or staged for their review.
   If the result says "Saved", tell them it is saved and will be searchable in a few
   minutes (often 10 or more). If it says the fact is pending their review, tell them
   it is "noted and pending your review" and not yet part of their memory.
5. **Only save what you were told.** Do not save inferences, transient chatter, or
   anything the user asked you to keep private.
6. **Ask before `capture_conversation`.** It sends the whole exchange to the user's
   memory, so tell them what you are about to capture and wait for a yes. A single
   `remember` the user asked for ("remember that…") needs no extra confirmation.
7. **Drafting is not sending.** `rewrite_as_me` and `get_voice_card` only produce text.
   Show the draft to the user; never treat it as approval to post or send it anywhere.
8. **Some tools cost credits or take seconds.** `recall_context`, `search_memories`,
   `query_knowledge`, `remember` and `capture_conversation` cost 1 credit each, and
   `summarize` costs 20. `get_profile_card` and `get_voice_card` are free and fast.
   `get_user_context`, `summarize` and `rewrite_as_me` take several seconds. Use the
   cheaper tool when it is enough.

## Choosing a tool

| You want to | Use |
|---|---|
| Who the user is: name, role, location, skills, goals (fastest) | `get_profile_card` |
| Background to personalise an answer | `recall_context` (pass the user's words as `current_prompt`; for a follow-up, pass the last few turns as `conversation`, one per line as `user: …` / `assistant: …`; `strategy: "recency"` for "what was I working on") |
| A specific remembered fact ("what's my sister's name") | `search_memories` (lower `min_score` to ~0.15 if nothing matches) |
| A grounded profile before high-stakes drafting or advice | `get_user_context` with `task_hint` (slower, verified against memory) |
| How much the user knows about a subject | `query_knowledge` (treat `user_accessed_knowledge` as weak evidence, not expertise) |
| Write something in their voice yourself | `get_voice_card`, then draft to that spec |
| Have Vity restyle a finished draft | `rewrite_as_me` with `host` (slack, email, linkedin, x) and `recipient_hint` |
| A summary personalised to what they already know, or of a URL | `summarize` (for plain text already in context, summarize it yourself; it may also note in their memory that they read the content) |
| Keep one durable fact for future sessions | `remember`, as a self-contained third-person statement, one fact per call |
| Keep a whole substantive session | `capture_conversation` (newest 50 messages; Vity drops junk and extracts what matters) |

Pick one `session_key` per conversation, such as `chat-` plus a few random digits, and
pass the same key to every `remember` and `capture_conversation` call in it. A repeat
capture then adds only the new messages instead of a second copy.

The server also exposes prompts (`write_as_me`, `brief_me_on`, `catch_me_up`) and
resources (`vity://voice-card`, `vity://knowledge/topics`).

## Writing good memories

Write each `remember` statement so it still makes sense months later, with none of
this conversation around it:

- Good: "Prefers async standups over daily calls."
- Bad: "yes I do", "the thing we discussed".

## Not supported through this server

Deleting memories and managing API keys happen in the Vity dashboard at
https://app.maximem.ai, not over MCP. If the user asks to delete something, point them
there.

## When Vity fails

Tool errors come back as plain sentences meant for you to relay. Never claim a memory
was recalled, saved or captured when the call failed; say what happened and, for a
write, give the user the text so it is not lost.

| Error says | Tell the user |
|---|---|
| Invalid or revoked API key | Generate a fresh key at https://app.maximem.ai (**API Keys** in the sidebar) and update `VITY_API_KEY` |
| Not confirmed (on `remember` or `capture_conversation`) | Retry once. Vity skips what it already has, so nothing is saved twice. If it fails again, say it was not saved |
| Not saved: nothing lasting in it | Rewrite it as a full statement of the fact and try once more |
| Out of credits | Top up in the dashboard |
| Key not permitted for that action | Re-issue the key with the needed scope in the dashboard |
| Rate limit reached | Wait and retry later; do not loop on the call |
| Unreachable or temporary error | Vity is down for the moment; answer without memory and say so |

The server needs a Vity API key (starts with `mx_`) in `VITY_API_KEY`. A `synap_` key
belongs to a different product and will be rejected. Docs:
https://docs.maximem.ai/vity/mcp.
