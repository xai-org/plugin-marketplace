# Nitrozen plugin for Grok Build

Connect Grok Build to [Nitrozen](https://nitrozen.io), hosted public changelog pages for software
products.

## Installation

In Grok Build, open `/plugin`, search for **Nitrozen**, and install.

On first connection, Grok opens the Nitrozen sign-in in your browser (OAuth 2.1 with PKCE and
dynamic client registration via nitrozen.io). Click Authorize. No API key is needed and nothing
should be pasted into chat.

## What you get

- **MCP server** `nitrozen` at `https://mcp.nitrozen.io/mcp` (Streamable HTTP, OAuth 2.1).
  Source: https://github.com/nitrozenio/nitrozen-mcp
- **16 tools** (8 read-only, 4 write, 4 destructive: `delete_project`, `update_entry`,
  `delete_entry`, `revoke_token`). Every tool carries MCP annotations (`title`, `readOnlyHint`,
  `destructiveHint`, `idempotentHint`, `openWorldHint`), so Grok asks before publishing or deleting.

List your changelog projects, draft and publish entries in Markdown with categories (new,
improvement, fix, announcement), update or remove entries, and read any project's public changelog.

## Example prompts

1. "List my changelog projects and their public URLs."
2. "Draft a changelog entry for my project about faster PDF exports, category improvement, but don't publish it."
3. "Show the last 3 entries in my Demo Project changelog."
4. "Publish the draft 'Price update on Jan 1'."
5. "How many entries have I published this month, and what's my plan limit?"

## Network endpoints and credentials

- `https://mcp.nitrozen.io/mcp` and OAuth at `https://nitrozen.io`: the only endpoints used.
- Credentials: a Nitrozen account, authorized via OAuth in the browser. No local secrets,
  hooks, scripts or skills are shipped.

## Links

- Docs: https://nitrozen.io/docs/mcp
- Privacy: https://nitrozen.io/privacy
- Support: support@nitrozen.io

## License

The files in this plugin directory are MIT licensed. The Nitrozen service is governed by its own terms.
