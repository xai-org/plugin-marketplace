# Kling AI for Grok

This directory is a native Grok Build plugin. It contains a Grok manifest,
Agent Skills, and one selected OAuth-protected remote MCP registration. Use
the marketplace default `.mcp.json` for Global (`https://kling.ai/mcp`). For a
China-region private distribution, replace it with the inactive
`.mcp.china.json` template (`https://klingai.com/mcp`) before installation.
Never activate both. The plugin does not bundle `mcp-app/`, start a local MCP
server, or require a Kling API key.

## Install in Grok Build

Install [Grok Build](https://docs.x.ai/build/overview), then validate and
install this plugin from the repository root:

```bash
grok plugin validate grok/kling-ai
grok plugin install "$PWD/grok/kling-ai" --trust
grok plugin enable kling-ai
grok inspect
```

Open `/mcps` in the Grok TUI, select `Plugin-Grok-kling-ai`, and press `i` to
complete Kling OAuth in the browser. Then verify the connection:

```bash
grok mcp list
grok mcp doctor Plugin-Grok-kling-ai
```

Only trust the plugin after inspecting its source. Grok keeps plugin MCP
servers inactive until the plugin is trusted.

## Connect from grok.com

Grok web supports custom MCP connectors independently of Grok Build plugins:

1. Open <https://grok.com/connectors>.
2. Choose **New Connector → Custom**.
3. Enter the Global endpoint `https://kling.ai/mcp` and complete OAuth. China
   accounts use `https://klingai.com/mcp` instead; never add both.

This web flow connects the remote tools but does not install the Grok Build
Skills in this directory. Use the Grok Build plugin when you need the full
confirmation, single-submit, and result-handling instructions.

## OAuth and results

Grok owns the OAuth client, PKCE flow, credential storage, and refresh. The
packaged `X-Kling-Integration: Plugin-Grok` header is telemetry-only and must
not affect authentication, rollout, billing, or generation behavior.

The plugin sends requests only to the one active Kling MCP endpoint. Requests
may include the creative prompt, selected generation parameters, uploaded
reference media, and task identifiers needed to create or query the requested
work. Kling returns account-scoped capability, credit, task, and output data
through that connection. The plugin bundle does not read Grok's OAuth tokens,
does not run a local server, and does not store a second copy of request or
result data. Grok manages the local OAuth credential; Kling processes service
data under the [Kling AI Privacy Policy](https://kling.ai/docs/privacy-policy)
and [Kling AI Terms of Service](https://kling.ai/docs/user-policy).

Grok Build's public documentation confirms remote MCP tools and OAuth, but it
does not currently document MCP Apps rendering as a supported surface. Do not
claim an interactive widget until it is verified on the target build; preserve
the same remote call's text/resource fallback and primary result link.

## Official marketplace submission

xAI's official catalog is
[`xai-org/plugin-marketplace`](https://github.com/xai-org/plugin-marketplace).
Follow [the release checklist](docs/RELEASE_CHECKLIST.md). A third-party remote
submission should point at a public plugin-root repository owned by the real
publisher and pin a full 40-character commit SHA. Alternatively, the plugin can
be vendored under the official catalog's `external_plugins/` directory.

Being listed does not make a third-party plugin authored, endorsed, or verified
by xAI. This package identifies its publisher as KLING AI Pte Ltd; marketplace
submission and public branding must be performed by an account authorized to
represent that publisher.

## License

[MIT](LICENSE)

## Verify

```bash
npm run check --prefix grok/kling-ai
npm test --prefix grok/kling-ai
node scripts/verify-host-parity.mjs
```
