# Clutch plugin for Grok Build

Connect Grok Build to [Clutch.co](https://clutch.co), the platform of trusted B2B service
providers with verified client reviews. Find and compare agencies, consultants and vendors,
read verified client reviews, browse fixed-price service packages, and message providers
through the hosted Clutch MCP server.

## Installation

In Grok Build, open `/plugin`, search for **Clutch**, and install. Or use the CLI:

```bash
grok plugin install clutch
```

Searching providers, reading profiles and reviews, and browsing packages work without an
account. Grok opens the Clutch sign-in in your browser only the first time you ask it to
message a provider. No API key is needed and nothing should be pasted into chat.

## What you get

- **MCP server** `clutch` at `https://bot.clutch.co/mcp` (Streamable HTTP, OAuth 2.1 for the messaging tool).

### Tools

| Tool | What it does | Sign-in |
|---|---|---|
| `recommend_service_providers` | Recommends providers that match a service, location, budget and other requirements | No |
| `get_provider_info` | Profile of a named company: services, rating, location, pricing, Clutch Certified status | No |
| `get_service_provider_reviews` | Verified client reviews for a provider, with project details and feedback | No |
| `get_service_packages` | Fixed-price, fixed-scope service packages for a type of service | No |
| `send_message_to_provider` | Sends your message (quote request, project inquiry) to one or more providers | Clutch account |

Every tool carries MCP annotations (`readOnlyHint`, `destructiveHint`), so Grok can tell a
lookup from an outgoing message before calling it.

## Example prompts

- "Find me a mobile app development agency in Chicago with a budget under $50k."
- "What do you know about Acme? Is it Clutch Certified?"
- "Show me client reviews for Acme."
- "What fixed-price SEO packages are available?"
- "Ask these three agencies for a quote on my e-commerce redesign."

## Authentication and network

The plugin connects only to Clutch-owned hosts. Authentication is OAuth 2.1 authorization
code with PKCE and dynamic client registration through Clutch SSO, and Grok handles the flow.

Network endpoints:

- `https://bot.clutch.co/mcp`: hosted MCP (Streamable HTTP)
- `https://bot.clutch.co/.well-known/oauth-protected-resource/mcp`: protected resource metadata
- `https://account.clutch.co`: Clutch SSO (authorization server, sign-in and consent screen)

Credentials: a Clutch account, needed only for `send_message_to_provider`, so that messages
are sent on behalf of a real user. The plugin stores no API key, ships no hooks, skills or
install scripts, and requests no filesystem or shell access.

## License

MIT for the files in this plugin. Use of the hosted MCP server is governed by the
[Clutch terms of service](https://clutch.co/terms) and [privacy policy](https://clutch.co/privacy).
