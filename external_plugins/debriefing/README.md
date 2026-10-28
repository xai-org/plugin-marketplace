# Debriefing

[Debriefing](https://debriefing.io) is competitive intelligence for B2B teams. It watches your competitors and finds their moves, such as a price change, a launch or a new hire. Every signal carries its source evidence.

This plugin connects your agent to one Debriefing workspace. It works in Claude Code, Codex and Grok Build.

## Install

- **Grok Build:** open `/plugin`, search for **Debriefing**, and install.
- **Claude Code:** `/plugin install debriefing --marketplace 0xrome/debriefing-plugin`

## What you get

- **MCP server** `debriefing` at `https://debriefing.io/mcp` (Streamable HTTP, OAuth 2.1). It has 43 tools. The full list is in the [developer docs](https://debriefing.io/developers?tab=mcp).
- **Skill** `weekly-competitor-review`: reads what changed in the last 7 days, ranks the moves by severity, checks the evidence, and writes a short review with recommended actions. It only reads.
- **Skill** `battlecard-from-signals`: reads the competitor dossier, the recent signals and their sources, and the current battlecard. It writes talk tracks and objection answers that cite the evidence.
- **Skill** `debriefing-api`: explains the Debriefing read API and every MCP tool, with the scopes, limits and error codes.

## Example prompts

- "What did my competitors change this week?"
- "Build a battlecard for my next sales call against a competitor."
- "Show me the evidence behind the latest high-severity signal."
- "What does the latest Debriefing digest say?"

## Sign-in and account

The first time a workspace tool runs, your agent opens the Debriefing sign-in in your browser. You sign in, approve the app, and choose the scopes:

- `read`: always granted. Read tools change nothing.
- `write`: changes that cost nothing, such as pinning a signal or adding a competitor.
- `spend`: actions that use a plan allowance, such as new research or a battlecard rewrite.

The skills ask you before they call a tool that changes the workspace.

You need a Debriefing workspace on a paid plan. Each plan starts with a 3-day trial that needs a card, and has a 14-day money-back guarantee. There is no free plan. See [pricing](https://debriefing.io/pricing).

Without an account, five public tools still work. They search and read the competitive briefs and guides that Debriefing publishes on debriefing.io. They can also request one free brief for you, but only after you agree.

## Network and credentials

The plugin connects only to `https://debriefing.io`.

- `https://debriefing.io/mcp`: the hosted MCP server.
- `https://debriefing.io/.well-known/oauth-authorization-server` and `https://debriefing.io/.well-known/oauth-protected-resource`: OAuth discovery metadata.
- `https://debriefing.io/oauth/*`: OAuth 2.1 authorization code with PKCE (S256) and dynamic client registration. Your agent handles this flow.
- `https://debriefing.io/.well-known/mcp/server-card.json`: the MCP server card.

Credentials: a Debriefing account. The plugin stores no API key. It runs no local code, has no hooks, and asks for no file system or shell access. Each tool acts only on data the signed-in person can already see in Debriefing, and checks the scope, the person's role and the plan.

## Links

- Docs: https://debriefing.io/developers?tab=mcp
- Privacy policy: https://debriefing.io/privacy_policy
- Terms: https://debriefing.io/terms
- Support: https://debriefing.io/contact

## License

MIT for the files in this plugin. Use of the Debriefing service is governed by the [Debriefing terms](https://debriefing.io/terms) and [privacy policy](https://debriefing.io/privacy_policy).
