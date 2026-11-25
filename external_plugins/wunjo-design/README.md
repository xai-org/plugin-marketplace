# Wunjo Design plugin for Grok Build

Connect Grok Build to [Wunjo Design](https://wunjo.online/product/design) — a browser-based vector
editor — through its hosted MCP server. Forty-eight tools over the person's own documents: pages and
layers, shapes, paths, gradients, effects, text laid out from real font metrics, placed images, SVG
import, brand components with their palette and fonts, export slices and print-area checks, and a
render of the current page so the agent can look at what it made.

Everything it makes stays an editable file — vector objects on a canvas, not a flat picture. The same
document opens in the editor at `wunjo.online`, and the person keeps working by hand.

## Installation

In Grok Build, open `/plugin`, search for **Wunjo Design**, and install.

On first connection Grok opens the Wunjo sign-in page in the browser. Use a Wunjo account — creating
one is free. Do not paste an API key or a token into chat; there is none to paste.

## Authentication

The plugin connects only to `https://mcp.wunjo.online/design`. Authorisation is OAuth 2.1 with PKCE
and Dynamic Client Registration against that host, so the client registers itself.

Network endpoints:

- `https://mcp.wunjo.online/design` — hosted MCP server (streamable HTTP)
- `https://mcp.wunjo.online/.well-known/oauth-authorization-server`,
  `/.well-known/oauth-protected-resource/design` — OAuth discovery
- `https://mcp.wunjo.online/authorize`, `/token`, `/register` — OAuth 2.1 + DCR
- `https://auth.wunjo.online` — human sign-in, in the person's own browser

Credentials: a Wunjo account. The access token stays on the server side of the flow and is used as
`Authorization: Bearer` against the MCP host; nothing is stored in this plugin. Tools reach only the
documents of the account that signed in.

## Paid tools

The server is free to use. Four tools call the editor's own image models — generation, upscale,
background removal, and splitting a picture into layers — and those spend the account's credits.
Each one quotes its price first and runs only when it is called again with that price confirmed, so
nothing is spent without the person agreeing. `account_status` shows the plan and the balance.

## License

MIT (see the [source repository](https://github.com/wladradchenko/mcp.wunjo.online)). Use of the
hosted service is governed by the [terms](https://wunjo.online/terms-of-service) and
[privacy policy](https://wunjo.online/privacy-policy) of wunjo.online.

Support: `support@wunjo.online`.
