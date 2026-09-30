# Maximem Vity

Personal AI memory over MCP. Connect any MCP-capable Grok surface to your Vity
memory so it can recall what you've told it, look up what you already know, save
new facts, and write in your voice — one memory across all your tools.

- **Website:** https://www.maximem.ai
- **Dashboard (get your key):** https://app.maximem.ai
- **Docs:** https://docs.maximem.ai/vity/mcp

## Connection

| | |
| --- | --- |
| **Endpoint** | `https://vity-mcp.maximem.ai/mcp` |
| **Transport** | Streamable HTTP |
| **Auth** | `Authorization: Bearer ${VITY_API_KEY}` header |

This plugin declares the server in `.mcp.json`. The `Authorization` header reads
your key from the `VITY_API_KEY` environment variable — the key is **never**
stored in this repo.

## Credentials (required)

Maximem Vity needs a personal Vity API key (starts with `mx_`):

1. Sign up / log in at https://app.maximem.ai
2. **Settings → API Keys → Generate New Key**
3. Copy the key (`mx_...`).

Then make it available to Grok as `VITY_API_KEY`, either by:

- **Telling the Grok bot** the variable name and value (it stores it as a header
  on this server entry), or
- **Setting the environment variable** in your agent's MCP settings:
  `VITY_API_KEY=mx_...`

> Vity keys start with `mx_`. A Synap `synap_` key will be rejected — that's a
> separate product ([Synap MCP](https://docs.maximem.ai/integrations/mcp)).

## What your agent can get

**9 tools**
- **Recall** — `recall_context`, `get_user_context`, `search_memories`
- **Knowledge** — `query_knowledge`
- **Voice** — `get_voice_card`, `rewrite_as_me`, `summarize`
- **Capture** — `remember`, `capture_conversation`

**3 prompts** — `write_as_me`, `brief_me_on`, `catch_me_up`
**2 resources** — `vity://voice-card`, `vity://knowledge/topics`

Only `remember` and `capture_conversation` write anything; deletion is a
dashboard-only action and is not exposed over MCP.

## Verify

Ask your agent something only memory can answer:

```
What do you know about me?
```

It should call `recall_context` / `get_user_context` and answer from your vault.
If it says it has no information, the connection is fine but the vault is empty.

## Data & security

Your API key is your identity — a key only ever reaches its own vault, and no
tool takes a user/account/vault argument. Full read/write access; treat the key
like a password and use a separate key per tool so you can revoke one without
breaking the others. See https://docs.maximem.ai/vity/mcp for details and
support: support@maximem.ai.
