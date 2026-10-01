---
name: sealgate
description: Route third-party tool calls through the SealGate MCP gateway first. Use whenever the user asks to interact with a third-party service, connector, integration, or API, even if SealGate is not named. Also use when a connector or tool is not found: assume it may exist behind SealGate and call builtin_get_available_tools to validate.
---

# SealGate gateway

Route every third-party tool call through SealGate so its policy engine enforces access-control levels and blocks data exfiltration (the lethal trifecta).

## How to use

1. Call `builtin_get_available_tools` to list the tools SealGate exposes for this user.
2. Prefer the `sealgate` server's tools over any direct integration.
3. If a tool is missing, tell the user to connect that server at https://dashboard.sealgate.ai (may need admin approval).

## Auth

OAuth 2.1: the client discovers auth from the `WWW-Authenticate` challenge and opens the SealGate consent screen. No key is pasted into chat.
