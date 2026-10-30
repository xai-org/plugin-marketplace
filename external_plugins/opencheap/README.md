# OpenCheap plugin for Grok Build

Connect Grok Build to [OpenCheap](https://opencheap.si): every major AI model (Claude,
GPT, Gemini, Llama, DeepSeek, Qwen, Kimi and more) behind one OpenAI-compatible API.
Each request goes to the cheapest healthy provider of the exact model you asked for,
never a substitute, and popular models usually cost less than the public list price.
Find a model and its price, give your code its own key with a monthly cap, set
budgets, watch balance and usage, and put fallbacks, a cache, limits and guardrails in
front of your calls, all through the hosted OpenCheap MCP server.

## Installation

In Grok Build, open `/plugin`, search for **OpenCheap**, and install.

On first connection, Grok opens OpenCheap sign-in in your browser. Sign in with your
OpenCheap account (email, Google or a wallet) and select **Allow**, with read and
write access or read only. No API key is needed and nothing should be pasted into
chat. You can disconnect Grok at any time from **API keys** in the console at
https://app.opencheap.si.

## What you get

- **MCP server** `opencheap` at `https://app.opencheap.si/api/v1/mcp` (Streamable
  HTTP, OAuth 2.1).
- **Skill** `opencheap`: how to use the OpenCheap tools well (start from the account,
  ask before anything that spends money, confirm changes that overwrite or remove,
  never repeat a secret, use `idempotencyKey` on creates) and how to call models from
  code with the OpenAI SDK.

### Tools

Every tool is one operation of the OpenCheap Management API
([OpenAPI](https://app.opencheap.si/api/v1/openapi.json)). A browser-connected app sees
66 tools: 32 read-only and 34 that change something, 27 of them marked destructive. A
read-only connection sees the 32 read-only tools.

| Area | Tools |
|---|---|
| Account | `get_whoami`, `get_account`, `update_account`, `get_balance`, `get_usage`, `list_ledger` |
| Models | `list_models` (search with `q`, price per million tokens) |
| Model keys | `list_keys`, `create_key`, `update_key`, `revoke_key` |
| Budgets | `list_budgets`, `get_account_budget`, `set_account_budget`, `remove_account_budget`, `get_key_budget`, `set_key_budget`, `remove_key_budget` |
| Gateways | `list_gateways`, `create_gateway`, `get_gateway`, `update_gateway`, `delete_gateway`, `gateway_stats`, `gateway_decisions` (fallbacks, cache, limits, guardrails, decisions classifiers) |
| Customers | `list_customers`, `create_customer`, `get_customer`, `update_customer`, `delete_customer`, `credit_customer`, `list_customer_ledger`, `list_customer_keys`, `create_customer_key`, `revoke_customer_key` |
| Top-ups | `create_topup_checkout` (a card checkout link for a person to open) |
| Wallets and agent keys | `list_wallets`, `remove_wallet`, `list_management_keys` (adding a wallet or an agent key is owner-only and not listed for a browser sign-in) |
| Sell | 27 tools for accounts that accepted the selling terms in the console: saved keys, offers, earnings and payouts (`list_supply_presets`, `list_offers`, …) |

A customer is a group of keys under one name with its own monthly limit and usage;
every call on its keys is debited from your own balance.

Every tool carries MCP annotations (`title`, `readOnlyHint`, `destructiveHint`,
`idempotentHint`, `openWorldHint`), so Grok can tell a lookup from a revocation before
calling it.

## Example prompts

- "Check my OpenCheap balance and this week's usage by model."
- "List the Claude models on OpenCheap with their price per million tokens."
- "Create an OpenCheap key for this repo, capped at $10 a month, and save it to .env."
- "Cap that key at $5 a day and email me at 80 %."
- "Create a gateway support-bot that falls back from one model to another with a one-hour cache, and block prompt injection on it."

## Authentication and network

The plugin connects only to `https://app.opencheap.si`. Authentication is OAuth 2.1
authorization code with PKCE (S256), with dynamic client registration or a client ID
metadata document; Grok handles the flow.

Network endpoints:

- `https://app.opencheap.si/api/v1/mcp`: hosted MCP server (Streamable HTTP, stateless JSON responses)
- `https://app.opencheap.si/.well-known/oauth-protected-resource/api/v1/mcp`, `/.well-known/oauth-authorization-server`: discovery metadata
- `https://app.opencheap.si/oauth/register`, `/oauth/token`, `/oauth/revoke`: OAuth 2.1 + dynamic client registration
- `https://app.opencheap.si/oauth/authorize`: human sign-in and consent in the browser

Credentials: an OpenCheap account. The access token is scoped to that account (scope
`mcp`, or read only), lasts one hour and is refreshed with a rotating refresh token.
The plugin stores no API key, ships no hooks, scripts or commands, and requests no
filesystem or shell access. Tools act only on the signed-in account.

Your own code calls models at `https://api.opencheap.si/v1` with a model key that you
create through the plugin; the plugin itself never calls that host.

## Pricing

Installing the plugin and connecting the MCP server are free. Model calls made with
your keys are billed to your OpenCheap balance at the prices listed at
https://opencheap.si/pricing, next to each model's public list price. Add funds by
card in the console; your own code can also pay per call in USDC on Base (x402) with
no account. Some models are free.

## Support

- Docs: https://docs.opencheap.si/mcp
- Email: hello@opencheap.si

## License

MIT for the files in this plugin. Use of the hosted service is governed by the
[OpenCheap Terms](https://opencheap.si/terms) and
[Privacy Policy](https://opencheap.si/privacy).
