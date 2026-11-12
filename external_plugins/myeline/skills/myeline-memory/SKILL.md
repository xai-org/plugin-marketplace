---
name: myeline-memory
description: >-
  Persistent memory for AI agents, with receipts. Use when the user asks the
  agent to remember something across sessions, recall what was decided or
  preferred earlier, or check the team's past decisions before answering.
  Triggers include "remember this", "what did we decide about", "do you recall",
  "my preferences", "save this for later", and questions about prior
  conversations or project history.
---

# Myeline memory

Myeline gives the agent a reviewed knowledge base that survives every session.
Every memory a person approves carries its source, and nothing goes live
without their click.

## How to use it

1. Search first. When a question turns on the user's or their team's
   preferences, history, decisions, projects, or past conversations, call
   `cortex_query` and answer from what it returns. If nothing trustworthy
   matches, say so plainly rather than guessing.
2. Save only on the user's ask. When the user asks you to remember something,
   call `cortex_remember` with exactly what they asked to keep. You may ask
   once whether to save something durable they just stated; when in doubt,
   do not ask.
3. Everything you save is staged. The user reviews each proposal in the
   Myeline workspace and approves it before it becomes memory.
4. When the user asks to remove a memory, call `cortex_retract` with their
   reason.

## Connecting

The MCP server asks for Myeline sign-in on first use. The user creates a free
account at https://workspace.myeline.si and approves the connection once.
