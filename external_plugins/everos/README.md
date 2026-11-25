# EverOS plugin for Grok Build

Connect Grok Build to [EverOS](https://evermind.ai/everos), the context and memory layer for your organization's AI agents. The plugin lets Grok save to and read from one memory space in your EverOS account, so what one agent learns is there for the others.

EverOS is built by Evermind AI, Inc. It is a separate product from EverMe, Evermind's work memory for people and the AI tools they use, and uses a separate account.

## Installation

In Grok Build, open `/plugin`, search for **EverOS**, and install.

On first connection, Grok opens the EverOS sign-in in your browser. Sign in with your EverOS account and choose the memory space Grok may use. No API key is needed and nothing should be pasted into chat.

## What you get

- **MCP server** `everos` at `https://everos-mcp.evermind.ai/mcp` (Streamable HTTP, OAuth 2.1).
- **Skill** `everos-memory`: when to save, when to search, and the rules for deleting.

### Tools

| Tool | What it does |
|---|---|
| `add_memory` | Saves a fact, preference or decision you want kept |
| `search_memory` | Searches stored memories |
| `get_profile` | Reads the profile EverOS built from your memories |
| `list_memories` | Lists stored memories, newest first |
| `delete_session` | Deletes the current conversation and the memories extracted from it |
| `delete_memories` | Deletes particular memories you name |

This plugin has no hooks and runs no local code.

## Example prompts

- "Save to EverOS that we're moving the launch to March 3."
- "What does EverOS remember about my current projects?"
- "Show me the latest things EverOS has saved about me."
- "Forget what we saved to EverOS in this conversation."

## Authentication and network

The plugin connects only to EverOS's own service. Authentication is OAuth 2.1 authorization code with PKCE (S256) and dynamic client registration; Grok handles the flow.

Network endpoints:

- `https://everos-mcp.evermind.ai/mcp`: hosted MCP (Streamable HTTP)
- `https://everos-mcp.evermind.ai`: OAuth 2.1 + DCR endpoints and discovery metadata
- `https://everos.evermind.ai`: sign-in and consent screen during authorization, and the EverOS Console

Credentials: an EverOS account. Scopes requested: `openid`, `email`. The plugin stores no credential.

Data sent: a save sends the text to save and a session id; a search sends the search query; a delete sends the session id or the memory ids. The server refuses saves that look like credentials.

## Your data

Memories live in the memory space you chose when connecting. Revoke access under Connected Apps in the EverOS Console at https://everos.evermind.ai, or delete the memory space there.

- Docs: https://docs.evermind.ai/cloud/mcp
- Privacy policy: https://evermind.ai/privacy-policy
- Terms: https://evermind.ai/terms-of-service
- Support: https://evermind.ai/contact-us

## License

Apache-2.0. Source: https://github.com/EverMind-AI/Plugins
