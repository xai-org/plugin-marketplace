---
name: opencheap
description: >-
  Run an OpenCheap account through the OpenCheap MCP server: find models and their
  price per million tokens, create model keys with monthly caps for code, set spend
  budgets, read balance and usage, set up gateways (fallbacks, cache, limits,
  guardrails, decisions classifiers), and group keys under customers with their own
  limit. Use whenever "OpenCheap", "opencheap.si", an OpenCheap key (kl_live_...,
  kl_rs_...), or the user's OpenCheap balance, keys, budgets, gateways or usage come
  up, or when code should call a model through api.opencheap.si.
---

# OpenCheap

OpenCheap sells every major model (Claude, GPT, Gemini, Llama, DeepSeek, Qwen, Kimi
and more) through one OpenAI-compatible API at `https://api.opencheap.si/v1`. Each
request goes to the cheapest healthy provider of the exact model id that was asked
for, never a substitute; popular models usually cost less than the public list price.
The `opencheap` MCP server bundled with this plugin runs the user's OpenCheap account:
models, keys, budgets, balance, usage, gateways and customers. It acts as the
signed-in account, and every tool is one call of the OpenCheap Management API.

## Connecting

The MCP server is `https://app.opencheap.si/api/v1/mcp` (Streamable HTTP, OAuth 2.1).
On first use the app opens OpenCheap sign-in in the browser and the user selects
**Allow**, with read and write access or read only. No API key is needed for the MCP
server: do not ask the user to paste a key into chat and do not invent one.

- A browser-connected app cannot add wallets or create agent keys. Those stay with
  the account owner in the console at https://app.opencheap.si.
- A read-only connection lists and runs the read tools only. A change answers
  `insufficient_scope`; to allow changes, the user reconnects and picks read and write.

## Before you act

1. **Start with the account.** Call `get_whoami` or `get_balance` once to learn which
   account you are on and what it holds. Never guess ids: list first (`list_keys`,
   `list_gateways`, `list_customers`, `list_budgets`) and reuse the ids returned.
2. **Ask before spending.** Every key's calls are paid from the user's balance,
   customers' keys included. Get a clear yes before `create_key`,
   `create_customer_key` or `create_topup_checkout`, and suggest a `monthlyLimitUsd`
   cap or a budget on new keys.
3. **Confirm changes that overwrite or remove.** `update_account`, `update_key`,
   `update_customer`, `update_gateway`, `set_account_budget` and `set_key_budget`
   replace what is there. `revoke_key`, `revoke_customer_key`, `delete_customer`,
   `delete_gateway`, `remove_account_budget`, `remove_key_budget` and `remove_wallet`
   remove it. Their annotations mark them destructive: say what will change and get
   an explicit yes first.
4. **Secrets are shown once.** `create_key` and `create_customer_key` return the
   secret only in that response. Write it where the user asks (for example a `.env`
   file that is not committed) and do not repeat it back in chat.
5. **Make changes safe to retry.** Pass an `idempotencyKey` argument on creates,
   `set_account_budget`, `set_key_budget` and `create_topup_checkout`; it is required
   by `credit_customer`. Repeating a call with the same key never applies it twice.
6. **Read lists in pages.** Pass a result's `nextCursor` back as `cursor`.
   `list_models` takes `q` (for example `q=claude`): search with it instead of
   reading every page of the catalog.

## Choosing a tool

| You want to | Use |
|---|---|
| See the account, balance, spending | `get_whoami`, `get_account`, `get_balance`, `get_usage`, `list_ledger` |
| Find a model and its price | `list_models` with `q`; each model has `price.promptUsdPerM` and `price.completionUsdPerM` (USD per million tokens) |
| Give code its own key with a cap | `create_key` with `name` and `monthlyLimitUsd` (optional `allowedModels`, `maxPrice`); `list_keys`, `update_key`, `revoke_key` |
| Cap spend per day, week, month or for good | `set_account_budget`, `set_key_budget`; `list_budgets`, `get_account_budget`, `get_key_budget`, `remove_account_budget`, `remove_key_budget` |
| Add fallbacks, retries, a cache, limits, guardrails or a classifier | `create_gateway`, `get_gateway`, `update_gateway` (replaces the whole config), `delete_gateway`, `list_gateways` |
| Put a gateway on one key, or on every key | `update_key` with `{ "gateway": "<name>" }`; `update_account` with `{ "defaultGateway": "<name>" }` |
| See what a gateway did | `gateway_stats`, `gateway_decisions` |
| Group keys under a name with its own monthly limit | `create_customer`, then `create_customer_key`; `list_customers`, `get_customer`, `update_customer`, `delete_customer`, `list_customer_keys`, `revoke_customer_key` |
| Record a payment for the user's own books | `credit_customer` (with `idempotencyKey`), `list_customer_ledger` |
| Let a person add funds by card | `create_topup_checkout` returns a checkout link for the person to open |
| Set the low-balance alert or the account name | `update_account` with `lowBalanceUsd` or `name` |
| Wallets and agent keys | `list_wallets`, `remove_wallet`, `list_management_keys` (adding them is owner-only, in the console) |

## Calling models from code

1. Pick a model with `list_models`. `kind: "chat"` models are called at
   `https://api.opencheap.si/v1/chat/completions` in OpenAI format. `free: true`
   models cost nothing and work with any key, even with no balance (10 requests a
   minute and 200 a day per key, prompts up to 32k tokens, replies up to 4,096
   tokens); `freeUntil`, when set, is the day billing starts. `uncensored: true` is a
   tag, not a filter: tell the user when a model you suggest carries it.
2. Create a key with `create_key` (ask first, suggest a monthly cap) and save it as
   `OPENCHEAP_API_KEY`.
3. Point any OpenAI SDK at the base URL:

   ```python
   from openai import OpenAI
   import os

   client = OpenAI(base_url="https://api.opencheap.si/v1", api_key=os.environ["OPENCHEAP_API_KEY"])
   reply = client.chat.completions.create(model="<model id from list_models>", messages=[{"role": "user", "content": "Hello"}])
   ```

Reasoning models spend output tokens thinking: give them `max_tokens` of 1,000 or
more. A key with no balance answers 402 `insufficient_balance` on paid models, and a
budget in `hard_stop` mode answers 402 at its limit. Over a rate limit the answer is
429 with `Retry-After`.

**Decisions models** (`kind: "decisions"`, such as `clef`) answer typed questions about
a text instead of chatting: `POST https://api.opencheap.si{endpoint}` (the catalog's
`endpoint`, for example `/v1/systemone`) with a model key, `model`, `state` (the text)
and `questions` (`noul` for yes/no, `choice` with criteria, `score` with ordered
labels). See https://docs.opencheap.si/decisions.

## Budgets

A budget caps spend on the whole account (`set_account_budget`) or on one key
(`set_key_budget` with the key's `id`). `limits` takes `daily`, `weekly`, `monthly`
and `lifetime` in USD (at least one). `mode` is `hard_stop` (requests get a 402 at
the limit) or `alert_only` (never blocks). `alertPct` (default 80) emails once per
limit and window when spend crosses that share. `list_budgets` shows every limit with
its spend this window. Example: `set_key_budget` with
`{ "id": "<key id>", "limits": { "daily": 5, "monthly": 50 }, "mode": "hard_stop" }`.

## Gateways

A gateway is a named config that requests run through. A chat gateway sets fallbacks
between models, retries, a response cache, a rate limit, a time limit, the models
allowed, and guardrails. A decision gateway keeps a decisions model and its questions,
so a call sends only the text.

- **Guardrails** (chat gateways): `prompt_injection`, `pii` (personal data) and
  `topics` checks run on every message before the model is called. Each check either
  blocks the request (HTTP 446, never billed), flags it in the log, or, for `pii`
  only, redacts emails, phone numbers, card numbers and IBANs. Docs:
  https://docs.opencheap.si/guardrails.
- **Which gateway runs:** the request's `x-klinn-gateway` header (it keeps its
  original name), else the key's gateway, else the account's default gateway. A key
  with its own gateway, or under a default gateway with guardrails, is locked to it:
  a header naming another gateway is refused with 403 `gateway_locked`.

Create one with `create_gateway`, attach it with `update_key` or `update_account`, and
read its counters with `gateway_stats` (blocked requests included) and
`gateway_decisions`. Config reference and examples: https://docs.opencheap.si/gateway.

## Customers

A customer groups model keys under one name with its own monthly limit and usage.
Every call on its keys is debited from the user's own balance at OpenCheap's price.

1. `create_customer` with `{ "name": "Northwind", "billingMode": "limit", "spendLimitUsd": 100 }`.
2. `create_customer_key` with `{ "id": "<customer id>", "name": "prod" }` (the secret is
   shown once; `monthlyLimitUsd` caps the key itself).
3. Pause it with `update_customer` `{ "id": "<customer id>", "status": "paused" }`.

`credit_customer` only records a payment for the user's own books; the customer's keys
never draw on it. No tool moves money: top-ups happen in the console or through the
checkout link a person opens.

## Errors

Errors look like `{ "error": { "code", "message", "next" } }`. `next` names the tool
call that fixes it. Common codes: `insufficient_balance`, `insufficient_scope`
(read-only connection), `owner_only` (do it in the console), `gateway_locked`,
`limit_reached`. Money is in USD at OpenCheap's price.

## Docs

- Quickstart: https://docs.opencheap.si/quickstart
- MCP server: https://docs.opencheap.si/mcp
- Gateways: https://docs.opencheap.si/gateway
- Guardrails: https://docs.opencheap.si/guardrails
- Decisions models: https://docs.opencheap.si/decisions
- Management API (budgets, customers): https://docs.opencheap.si/management-api
- Machine-readable API reference: https://app.opencheap.si/api/v1/openapi.json
