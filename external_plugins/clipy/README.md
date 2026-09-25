# Clipy plugin for Grok Build

[Clipy](https://clipy.online) is a screen recorder built to be agent-readable. Every recording
carries an AI transcript, a summary, timestamped key moments with cursor and click evidence, and a
machine-readable context document at the same URL.

This plugin gives Grok two things:

- **The hosted Clipy MCP server** (`https://clipy.online/api/mcp`) — search across your whole
  library, and pull the transcript, summary, key moments, and interaction data for any recording.
- **The `clipy` skill** — how to read a recording from a public link with no auth, import a
  YouTube/Loom/local video as context, and turn screenshots or a tool-native WebM/MP4 into a
  shareable proof link with the Clipy CLI.

## Install

```
/plugin install clipy
```

On first use of an MCP tool, Grok opens Clipy's OAuth sign-in. A free account is enough.

## What it's for

- Hand an agent a bug report video and have it read the actual repro steps.
- Ask "which recording covered the pricing discussion?" across your whole library.
- Have an agent verify its own work and hand back a watchable proof link.

## Network endpoints and credentials

Declared for review:

| Endpoint | Purpose | Auth |
|---|---|---|
| `https://clipy.online/api/mcp` | The MCP server — all tool calls | OAuth 2.1 + PKCE (`S256`) |
| `https://clipy.online/oauth/authorize`, `/api/oauth/token`, `/api/oauth/register`, `/api/oauth/revoke` | OAuth authorization code flow with dynamic client registration | — |
| `https://clipy.online/video/<id>.arec` | Public recording context, fetched by the skill | None (public links only) |

Discovery metadata is served at
[`/.well-known/oauth-protected-resource`](https://clipy.online/.well-known/oauth-protected-resource)
and [`/.well-known/oauth-authorization-server`](https://clipy.online/.well-known/oauth-authorization-server).

**Scopes.** `recordings:read` is the default. `recordings:write` covers renaming, foldering, and
privacy changes only. Nothing is made public without an explicit request from the user.

**The plugin ships no credentials and reads none from disk.** It does not touch `~/.ssh`, `.env`,
or environment variables, runs no install scripts, and sends no telemetry. The MCP server is
remote HTTP — no local process is spawned. The skill documents the optional
[`@clipy/cli`](https://www.npmjs.com/package/@clipy/cli) for creating recordings; that is a separate
user-initiated install, not a dependency of this plugin.

## Documentation

- MCP setup and tool reference: https://clipy.online/docs/mcp
- Agent operating contract: https://clipy.online/agents.md
- Privacy: https://clipy.online/privacy · Terms: https://clipy.online/terms

## License

MIT — see [LICENSE](LICENSE).
