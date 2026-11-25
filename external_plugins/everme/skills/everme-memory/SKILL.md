---
name: everme-memory
description: Use EverMe memory when the user refers to previous conversations, earlier decisions, "last time", "remember when", existing project conventions, or previously solved errors, or asks to remember or save something. If the user names EverOS or an EverOS memory space, use the EverOS tools instead.
---

# EverMe Memory

EverMe is the user's long-term memory across sessions and tools. This plugin has no automatic capture: memory is read and written only through the EverMe tools.

## Read

- `mem_search`: hybrid search over the user's memory (episodes, agent skills and cases, recent raw transcript). Use a short topic query, not the whole user message. Rows under "Recent unextracted transcript" are provisional, not established facts.
- `mem_context`: the user's durable Profile only. It never searches. Call it once when knowing the user would help, and not again unless the user asks to refresh it.

Call `mem_search` when the task depends on history: "last time", "we decided", "did we fix this before", project conventions, previously solved errors. Do not repeat an identical query in the same turn. Set `startTime` and `endTime` only when the user named a window that resolves to exact dates.

## Write

Write only when the user asks.

- `mem_save_fact`: the user asks you to remember a durable fact about themselves (a preference, habit, long-term goal or decision). Save only that fact. Tell the user it was remembered only when the result has `extracted: true`.
- `mem_save_turn`: the user asks you to save part of this conversation, for example how a problem was solved. Send only the messages the user asked to keep, never the whole conversation.
- `mem_forget_session`: the user asks you to forget what this conversation saved. It deletes that conversation's saved messages and the memories extracted from them. Facts already in the profile stay.

On the first save of a conversation, pass `newSession: true`. The result names a `sessionKey`: pass it to every later save in this conversation and to `mem_forget_session`. Never reuse it in another conversation. `mem_forget_session` accepts only that key, so a conversation saved without it cannot be forgotten on its own.

## Do not

- Do not save anything the user did not ask you to save.
- Do not paste whole memory bodies. Quote only the lines you use.
