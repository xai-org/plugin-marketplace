# Adrio plugin for Grok Build

Connect Grok Build to [Adrio](https://adrio.ai), the AI media buyer for Meta ads.

- Brief Spark, Adrio's creative agent, to make static and video ad creatives from your products and brand.
- Launch finished creatives to Facebook and Instagram through Adrio's ad launcher.
- Search a library of analyzed competitor ads and save the best ones to swipe-file boards.
- Manage brand angles, audiences, and products.

Nothing changes in your workspace or Meta account, and no credits are spent, until you approve it.

## Installation

In Grok Build, open `/plugin`, search for **Adrio**, and install.

On first connection, Grok opens Adrio sign-in in the browser. Do not paste an API key or token into chat.

## Authentication

The plugin connects only to `https://api.adrio.ai/mcp`. Authentication is OAuth 2.1 with PKCE and dynamic client registration against that host.

Network endpoints:

- `https://api.adrio.ai/mcp`: hosted MCP (streamable HTTP)
- `https://api.adrio.ai/mcp/authorize`, `/mcp/token`, `/mcp/register`: OAuth 2.1 + DCR
- `https://adrio.ai`: human sign-in and consent

Credentials: an Adrio account. No API key is stored in the plugin. Tools are scoped to the organisation and brand the signed-in user picks on the consent screen.

## Support

info@adrio.ai. Docs: https://adrio.ai/docs/mcp

## License

Proprietary. Use of the hosted MCP is governed by the [Adrio Terms](https://adrio.ai/terms) and [Privacy Policy](https://adrio.ai/privacy).
