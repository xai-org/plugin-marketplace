# Davia Creation for Grok Build

Connect Grok Build to [Davia Creation](https://davia.ai/wiki/for-creators/create-with-your-assistant) to inspect and edit your private Tale game drafts.

## Install and sign in

Open `/marketplace` in Grok Build, find **Davia Creation**, and install it. On first connection, complete the Davia sign-in and consent flow in your browser. The plugin contains no API key or local executable.

The hosted MCP server lists only the signed-in creator's editable private drafts. Select a game by name before changing it. Its seven tools can list and select drafts, inspect the active draft, list and read virtual files, search their contents, and edit them. The editable files cover the game's premise, world, simulation rules, stats, cells, entities, and landmarks. The server validates edits before saving them. It cannot add or remove cells, change their geometry, or assign 3D assets.

## Network access and permissions

- `https://tale-mcp-208104258932.us-east4.run.app/mcp` — Davia's hosted Streamable HTTP MCP endpoint. The same host serves public OAuth discovery metadata.
- `https://rcdmbpuqpujxpyfrldrs.supabase.co/auth/v1` — Davia's OAuth authorization server, discovered from the MCP metadata. Sign-in, client registration, token issuance, and refresh use this host.
- `https://davia.ai/oauth/consent` — the browser consent page reached during sign-in.

Authentication uses the creator's Davia account through browser-based OAuth. Grok sends the resulting bearer token to the hosted MCP server. The server restricts tools to private drafts owned by that creator. `edit_file` can change game content; `list_drafts`, `current_draft`, `list_files`, `read_file`, and `grep` read it, while `select_draft` changes the active selection. No token or database credential is bundled with this plugin.

## License

Proprietary. Use of the hosted service is governed by [Davia's terms](https://davia.ai/legal/terms-of-use).
