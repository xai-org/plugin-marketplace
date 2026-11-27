# awen

[awen](https://www.awen.ai) is a creative studio. This plugin connects Grok Build to awen's hosted MCP server, so you can ask awen's creative agent to make or edit images, posters, logos, videos, 3D models and documents in your awen projects, and find, read and organise your projects, files and conversations.

## What it contains

- `.mcp.json`: one remote MCP server, `https://app.awen.ai/mcp` (Streamable HTTP). Nothing runs on your machine.
- `skills/awen-create`, `skills/awen-video`, `skills/awen-brand`: when to use awen for design, video and on-brand work, and how to follow a running turn.
- No hooks, commands, agents or scripts.

## Sign-in and credentials

- On first connect you sign in with your awen account (OAuth 2.1 with PKCE) and choose one awen organisation on a paid plan. You choose the permissions: read, write, and create.
- The plugin stores no key. Grok Build keeps the OAuth tokens awen issues.
- Reading and organising spend no credits. Creating with awen's agent spends credits from your awen plan.

## Network endpoints

- `https://app.awen.ai/mcp` (MCP calls) and `https://app.awen.ai/oauth` (sign-in). Files that awen makes are linked from `app.awen.ai`.

## Links

- Documentation: https://docs.awen.ai/mcp
- Privacy: https://www.awen.ai/privacy
- Terms: https://www.awen.ai/terms
- Security contact: security@awen.ai

## License

Proprietary. © Awen AI Corporation. The awen service is governed by its [Terms](https://www.awen.ai/terms).
