# Rankwise

[Rankwise](https://tryrankwise.com) measures how often AI search engines cite your brand, and helps you close the gaps.

This plugin connects your agent to one Rankwise workspace. It works in Claude Code, Codex and Grok Build.

## Install

- **Grok Build:** open `/plugin`, search for **Rankwise**, and install.
- **Claude Code:** `/plugin marketplace add 0xrome/rankwise-plugin`, then `/plugin install rankwise@rankwise`.

## What you get

- **MCP server** `rankwise` at `https://tryrankwise.com/api/mcp` (Streamable HTTP, OAuth 2.1). The full tool list is in the [developer docs](https://tryrankwise.com/api-docs#mcp).
- **Skill** `audit-to-briefs`: reads your scorecard, the questions where AI engines do not cite you, and your content opportunities. It proposes briefs for the biggest gaps. It writes draft briefs only when you agree, and it approves a brief, which spends credits, only when you name it.
- **Skill** `read-share-of-voice`: reads your AI share of voice and its history, the competitor leaderboard, citations per engine, and the citations you won or lost in the last 30 days. It only reads, unless you ask for a fresh snapshot.

## Example prompts

- "What is my AI share of voice, and how do I compare with competitors?"
- "Why don't AI engines cite my brand? Turn my audit into content briefs."
- "Which AI citations did we win or lose in the last 30 days?"

## Sign-in and account

The first time a workspace tool runs, your agent opens the Rankwise sign-in in your browser. You sign in, approve the app, and choose the scopes:

- `read`: read tools change nothing.
- `write`: changes that cost nothing, such as adding a tracked question.
- `spend`: actions that use credits or a plan allowance, such as a citation check or an approved brief.

The skills ask you before they call a tool that changes the workspace or spends credits. The plugin does not edit your website, and it does not publish an article unless you ask.

You need a Rankwise workspace for the skills. See [pricing](https://tryrankwise.com/pricing).

Without an account, six public tools still work. They check whether AI crawlers can reach a site, score a homepage's AI visibility readiness, check a page's citation readiness, link to the free AI visibility audit, and search the Rankwise guides.

## Network and credentials

The plugin connects only to `https://tryrankwise.com`.

- `https://tryrankwise.com/api/mcp`: the hosted MCP server.
- `https://tryrankwise.com/.well-known/oauth-authorization-server` and `https://tryrankwise.com/.well-known/oauth-protected-resource/api/mcp`: OAuth discovery metadata.
- `https://tryrankwise.com/oauth/authorize` and `https://tryrankwise.com/api/oauth/*`: OAuth 2.1 authorization code with PKCE (S256) and dynamic client registration. Your agent handles this flow.
- `https://tryrankwise.com/.well-known/mcp/server-card.json`: the MCP server card.

Credentials: a Rankwise account. The plugin stores no API key. It runs no local code, has no hooks, and asks for no file system or shell access. Each tool acts only on data the signed-in person can already see in Rankwise.

## Links

- Docs: https://tryrankwise.com/api-docs#mcp
- Privacy policy: https://tryrankwise.com/privacy
- Terms: https://tryrankwise.com/terms
- Support: https://tryrankwise.com/contact

## License

MIT for the files in this plugin. Use of the Rankwise service is governed by the [Rankwise terms](https://tryrankwise.com/terms) and [privacy policy](https://tryrankwise.com/privacy).
