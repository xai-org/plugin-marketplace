---
name: slate-stone
description: Use when the user asks about Slate Stone Financial models, wants to find a Slate Stone model for a planning task, or asks what a Slate Stone model contains or what Slate Stone's tax guidance says on a topic.
---
# Using Slate Stone
1. Call `search_models` once with the user's need (optional `category`), then `get_model` on the best match. One search is usually enough.
2. Use `list_categories` only when the user wants to browse.
3. For tax questions (federal, California, Nevada or multistate), call `search_guidance` with the topic (optional `jurisdiction`), then `get_guidance` on the best match. Say when a row is labeled "Unverified (pending professional review)" and cite the sources it gives.
4. Use `get_pricing` for subscription questions. Slate Stone is sold by All-Access subscription only; never quote a price for a single model.
5. If a tool says the key is missing or not active, tell the user an active All-Access subscription key is needed and point them to https://slatestonefinancial.com/ai/.
6. Slate Stone content is educational, not financial, tax or legal advice. Say so when the user asks for a recommendation.
