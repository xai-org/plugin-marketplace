---
name: calorie-cub
description: Log meals, check calories and macros, save recipes, and track weight in a person's Calorie Cub diary through its MCP server. Use when someone asks to log what they ate, see what they ate, check progress against calorie or protein goals, or save a recipe.
---

# Calorie Cub

Calorie Cub is a calorie and macro diary built for agents. One verified food catalog (USDA foods and US restaurant chain menus), one private diary per person.

## Connect

- MCP server: `https://mcp.caloriecub.com/mcp` (Streamable HTTP). Sign-in is OAuth 2.1 with PKCE and dynamic client registration; the person approves scopes once. Details: https://caloriecub.com/auth.md
- Claude Code: `claude mcp add --transport http calorie-cub https://mcp.caloriecub.com/mcp`
- Clients without OAuth: a personal API key from Settings → API keys, sent as `Authorization: Bearer cc_…`.

## Log a meal

1. `search_foods` with what the person ate (include the restaurant name for chain items). Pick the closest match and one of its serving ids.
2. `log_meal` with `food_id`, `serving_id`, `quantity`, `meal` (breakfast, lunch, dinner, snacks), the person's local `date` (YYYY-MM-DD), and a fresh `idempotency_key`. Reuse a key only to retry the same request. The server computes nutrition; never send numbers.
3. Nothing matches: `save_food` with the label values (leave unknown nutrients null, not 0), then log it.
4. Something they eat often: `save_recipe` from catalog foods, then log the recipe like a food.

## Answer questions

- One day: `get_diary`. A range up to 31 days: `get_summary`. Targets: `get_goals`. Weight: `get_weights`.
- Dates are the person's local dates. Ask instead of guessing when "yesterday" is ambiguous across midnight.

## Rules

- Confirm before `delete_meal`, `set_goals`, or logging more than a few items at once.
- `update_meal` needs the entry's current `version` from `get_diary`.
- Errors that start with `plan_limit`, `insufficient_scope`, or `daily_limit_reached` mean stop and tell the person; retrying won't help.
