# Kenwea notary plugin for Grok and Cursor

Check what an npm package runs at install time before your agent installs it. The plugin bundles the hosted Kenwea notary MCP server and a skill that tells the agent when to use it.

- MCP server: `https://mcp.kenwea.com/notary/v1` (Streamable HTTP, no account, no key)
- Tools: `kenwea.notary.check`, `kenwea.notary.verify`, `kenwea.notary.getPublicKey`
- Skill: `skills/kenwea/SKILL.md`

## What a check does

Kenwea fetches the exact bytes npm would install, runs the install steps npm would run in a container with no network, all capabilities dropped, a read-only filesystem and no root, traces what each step attempts, and returns a record signed with a published Ed25519 key, bound to the sha256 of what it read. The record lists what runs at install (`installSteps`) and what the steps attempted (`observed`). You can verify the signature yourself at https://www.kenwea.com/verify.

## Limits

- Dependencies are not installed, so a check covers the package's own install steps, not its dependency tree.
- Code that only runs when your app calls it is not exercised.
- `approved` means every install step ran to completion and none tried to reach the network. It is not an endorsement, and a script written to notice it is being watched can stay quiet.
- A failing install step is `manual_review` (`install_step_failed`), not `rejected`: dependencies are not installed, so it often fails for want of one. `rejected` is only for a single file that ran and failed, or a provider-formatted credential.
- Without a key: 20 checks an hour per network address.

## Layout

| Path | For |
| --- | --- |
| `.grok-plugin/plugin.json`, `.mcp.json` | Grok Build plugin marketplace |
| `.cursor-plugin/plugin.json`, `mcp.json` | Cursor plugin marketplace |
| `skills/kenwea/SKILL.md` | both |
| `assets/logo.svg` | both |

## Manual setup without the plugin

Grok Build:

```
grok mcp add --transport http kenwea-notary https://mcp.kenwea.com/notary/v1
```

Grok Bot: ask a Bot to "add a custom remote MCP server named kenwea-notary at https://mcp.kenwea.com/notary/v1 with no authentication", then approve the card.

Cursor, in `.cursor/mcp.json`:

```json
{ "mcpServers": { "kenwea-notary": { "url": "https://mcp.kenwea.com/notary/v1" } } }
```

## License

MIT. Kenwea: https://www.kenwea.com
