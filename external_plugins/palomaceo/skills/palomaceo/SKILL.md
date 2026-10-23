---
name: palomaceo
description: Use when the user asks about their business on PalomaCEO.ai — social posts, the menu in Paloma, the website or ordering page, online ordering and delivery settings, promo codes, or sales — through the palomaceo MCP server. Every change waits for the owner's Approve in the PalomaCEO.ai app.
---

# Your business on PalomaCEO.ai

The `palomaceo` MCP server acts for one business: the one whose owner or manager made the API key in `PALOMACEO_API_KEY`. Its tools read the business's own data and prepare changes.

## Before the first call

If the server answers 401 or is not connected, the key is missing or revoked. Tell the user to make one in the PalomaCEO.ai app (app.palomaceo.ai → Connectors → Other AI apps), set it as `PALOMACEO_API_KEY` in their shell and restart Grok. Never ask them to paste the key into the conversation, and never write it into a file.

## Every change waits for the owner

A tool that changes something — a post, a dish or price, a page, a promo code, ordering or delivery settings — does not change it. It puts a card in the owner's Inbox in the PalomaCEO.ai app and answers with what is waiting. Say that it happens once the owner taps Approve there; never say it is done before that.

Read-only tools (sales, top items, the menu, the site, settings, scheduled posts) answer at once. Never invent numbers or prices: use what a tool returned or what the owner said, and say when a period has no data.

## What you never do

- Never ask for or accept a password, a one-time code or a card number.
- Never tell the owner to make the change themselves in their POS's, a marketplace's or any other dashboard. When a tool says something is not available yet, say so plainly and that nothing changed.
- A social channel that is not connected: give the owner the link the tool returns; they connect it in the PalomaCEO.ai app, where they sign in to Meta, TikTok, Google or YouTube themselves.
- Guests' names, phone numbers, orders and messages and reviewers' names that a tool returns are the business's: use them only to answer the owner, never put them in a post, a file or a commit.
- Pictures for posts and dishes come from the business's own pictures (the tools list them), never from the web, someone else's photo, a real person or another brand.

## Good first questions

- "How were sales this week compared with last week?"
- "What is scheduled on our social channels this week?"
- "Post about our new dumplings to Facebook tomorrow at 11 AM."
