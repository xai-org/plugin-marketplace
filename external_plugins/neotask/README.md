# Neotask plugin for Grok Build

Run your [Neotask](https://neotask.ai) workspace from Grok Build. Neotask is where your AI agents work for your companies: they plan, run tasks, build boards and ask you before they do anything that needs your say. With this plugin Grok can check on that work, give your agents new tasks, show what is waiting for your approval and keep watch on what needs you.

## Installation

In Grok Build, open `/plugins`, go to the **Marketplace** tab, search for **Neotask** and install it.

On first use, Grok opens Neotask's sign-in in your browser. Sign in as yourself, choose the Neotask account Grok works in and whether it may only view or also make changes. No API key is needed and nothing should be pasted into chat. You need a Neotask account; [sign up at neotask.ai](https://neotask.ai).

## What you get

- **MCP server** `neotask` at `https://neotask.ai/mcp` (Streamable HTTP, OAuth 2.1). Its tools cover companies, agents, tasks, runs, boards, approvals and more; the [tool catalog](https://neotask.ai/docs/mcp.md) lists each one with what it reads or changes. Some tools depend on your plan and the features your account has switched on, and Neotask offers Grok only the tools the connection may use.
- **Four skills**, which Grok uses when they fit and which you can run yourself:

| Command | What it does |
|---|---|
| `/neotask:connect` | Signs you in to Neotask and reports what the connection can do |
| `/neotask:run-task [what to do]` | Gives one of your Neotask agents a task and starts it |
| `/neotask:approvals [approval id]` | Shows the approvals waiting on you and helps you decide |
| `/neotask:watch [company]` | Shows what changed and what needs you now; `/loop 10m /neotask:watch` keeps checking |

Every tool carries MCP annotations (`readOnlyHint`, `destructiveHint`, `idempotentHint`), so Grok can tell a lookup from a change before calling it. Approvals stay with you: the approvals skill decides one only when you have just said to, and Neotask applies its own approval rules before agents act.

## Example prompts

- "What needs me in Neotask today?"
- "Ask my Acme company to draft next week's newsletter."
- "Show the approvals waiting for me in Neotask."
- "How are my Neotask runs going?"

## Authentication and network

The plugin contains no code: only this manifest, the server address and the four skills. It connects only to Neotask. Authentication is OAuth 2.1 authorization code with PKCE and dynamic client registration; Grok handles the flow.

Network endpoints:

- `https://neotask.ai/mcp`: hosted MCP (Streamable HTTP)
- `https://neotask.ai/.well-known/oauth-protected-resource/mcp`: protected-resource metadata
- `https://striking-seed-36.authkit.app`: Neotask's authorization server (`/oauth2/authorize`, `/oauth2/token`, `/oauth2/register`, `/.well-known/oauth-authorization-server`), run by WorkOS AuthKit
- `https://neotask.ai`: the person's sign-in and consent screen during authorization

Credentials: a Neotask account. Grok stores the resulting OAuth tokens itself and sends the access token to `/mcp` as an OAuth bearer token. You can see and revoke the connection at any time in Neotask's settings, under connected agents.

Neotask keeps every action in your account's history. See Neotask's [privacy policy](https://neotask.ai/privacy-policy) and [terms](https://neotask.ai/terms).

## Help

[Neotask support](https://neotask.ai/support) and the [MCP documentation](https://neotask.ai/docs/mcp.md).

## License

MIT, see [LICENSE](LICENSE).
