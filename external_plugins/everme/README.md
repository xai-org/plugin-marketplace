# EverMe plugin for Grok Build

Connect Grok Build to [EverMe](https://everme.evermind.ai), work memory for you and the AI tools you use. EverMe keeps one memory of how you work: the decisions you made, the problems you solved, the corrections you gave an AI, and how you like things done. Every tool you connect draws on the same memory.

EverMe is built by Evermind AI, Inc. It is a separate product from EverOS, Evermind's context and memory layer for AI agents, and uses a separate account.

## Installation

In Grok Build, open `/plugin`, search for **EverMe**, and install.

On first connection, Grok opens the EverMe sign-in in your browser. Sign in with your EverMe account and approve the connection. No API key is needed and nothing should be pasted into chat.

## What you get

- **MCP server** `everme` at `https://api.everme.evermind.ai/mcp` (Streamable HTTP, OAuth 2.1).
- **Skill** `everme-memory`: when to search memory, when to read the profile, and the rule that nothing is saved unless you ask.

### Memory tools

| Tool | What it does |
|---|---|
| `mem_search` | Searches your memory for earlier decisions, fixes and context |
| `mem_context` | Reads your profile |
| `mem_save_fact` | Saves a fact you ask to keep |
| `mem_save_turn` | Saves the part of a conversation you ask to keep |
| `mem_forget_session` | Deletes what the current conversation saved |

The server also exposes tools for the knowledge base and the apps connected to your EverMe account. They act only on the account you sign in with.

This plugin has no hooks and runs no local code. It does not save your conversations by itself.

## Example prompts

- "What did we decide about the email verification step in onboarding? Check EverMe."
- "Have we fixed this error before? Search my EverMe memory."
- "Save to EverMe that I only review pull requests on Tuesday and Thursday afternoons."
- "Forget what we saved to EverMe in this conversation."

## Authentication and network

The plugin connects only to EverMe's own service. Authentication is OAuth 2.1 authorization code with PKCE (S256) and dynamic client registration; Grok handles the flow.

Network endpoints:

- `https://api.everme.evermind.ai/mcp`: hosted MCP (Streamable HTTP)
- `https://api.everme.evermind.ai/oauth/authorize`, `/oauth/token`, `/oauth/register`, `/oauth/revoke`: OAuth 2.1 + DCR
- `https://api.everme.evermind.ai/.well-known/oauth-authorization-server`: discovery metadata
- `https://everme.evermind.ai`: sign-in and consent screen during authorization

Credentials: an EverMe account. Scopes requested: `mem:read`, `mem:search`, `mem:write`, `openid`, `email`. The plugin stores no credential.

Data sent: a search sends the search query; a save sends only the fact or the messages you asked to save.

## Your data

Your memory stays in your EverMe account. Review, edit or delete any of it at https://everme.evermind.ai.

- Privacy policy: https://everme.evermind.ai/legal/privacy
- Terms: https://everme.evermind.ai/legal/terms
- Support: https://evermind.ai/contact-us

## License

Apache-2.0. Source: https://github.com/EverMind-AI/EverMe
