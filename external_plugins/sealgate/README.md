# SealGate

Connect agents to everything and manage agent access. SealGate handles adding, monitoring, enforcing policies, and blocking data exfiltration at runtime for any MCP. Flexible CLI, API, and MCP interfaces available.

- Website: https://sealgate.ai
- Dashboard: https://dashboard.sealgate.ai
- Docs: https://docs.sealgate.ai

## What this plugin does

Connects Grok to the SealGate MCP gateway as a single composite MCP server. Once
connected, the tools from every downstream server you have enabled in your
SealGate dashboard become available to Grok, with SealGate adding, monitoring,
enforcing policies, and blocking data exfiltration at runtime on every call.

## Requirements

- A SealGate account. Sign in / sign up at https://dashboard.sealgate.ai.

## How it connects (OAuth 2.1)

The plugin declares one remote MCP server (`.mcp.json`) pointing at
`https://mcp.sealgate.ai/mcp`. No credentials are stored in the listing. The
client discovers the authorization server from the 401 `WWW-Authenticate`
challenge, registers via DCR / Client ID Metadata Document, runs the PKCE (S256)
authorization-code flow (you approve on the SealGate consent screen), and
connects with a bearer token to your own per-user SealGate instance. Each
installing user authenticates as themselves.

SealGate also exposes CLI and API interfaces for the same gateway; this plugin
uses the MCP interface.
