# Phasio plugin for Grok Build

Query your quotes, parts, pricing, and manufacturing shop floor.

[Phasio](https://phas.io) is the operating platform contract manufacturers run
on: quoting, production, and back office across additive, CNC, molding, and
every process in between. This plugin gives Grok access to your Phasio
workspace, so you can interact naturally with your manufacturing data.

- **Commercial** — Which customers drive the most revenue? How do storefront
  self-service orders compare against quotes your team builds by hand? Where
  do carts convert and where do they stall?
- **Parts** — Inspect any part's volume, bounding box, minimum wall thickness,
  and watertightness, with rendered orthogonal views. Find near-duplicates of
  a part you've already made before you quote it again.
- **Pricing** — Run quotes against parts from inside Grok. Ask Grok to explain
  why a part got a certain price, and to tune and refine your pricing
  equations.
- **Production** — Where do a job's parts sit on the routing right now? What's
  been scrapped and why, and which other jobs were caught by the same failed
  build?
- **Setup** — Configure pricing equations, material and process prices,
  post-processing, lead times, shipping, tax, and payment terms from inside
  Grok. Check your setup for problems that could prevent quoting.

Requires a Phasio account. Connect once and Grok works against your live
workspace: your processes, your pricing rules, your orders.

## Installation

In Grok Build, open `/plugin`, search for **Phasio**, and install.

On first connection, Grok opens Phasio sign-in in the browser. Do not paste
an API key or token into chat.

## Authentication

The plugin connects only to the hosted MCP server. Authentication is OAuth
with dynamic client registration. Grok discovers the authorization server
from the protected-resource metadata of the MCP endpoint.

Network endpoints:

- `https://m-api.eu.phas.io/api/manufacturer/v1/mcp` — hosted MCP (streamable HTTP)
- `https://m-api.eu.phas.io/.well-known/oauth-protected-resource/api/manufacturer/v1/mcp` — protected-resource metadata
- `https://auth.eu.phas.io` — OAuth authorization server and sign-in

Credentials: a Phasio account. The plugin stores no API key. Tokens are
scoped to the signed-in manufacturer workspace.

## Write access

Most tools read data or compute hypothetical results. Quote calculations do
not create orders or send quotes to customers.

The `save`, `delete`, and `publishEquation` tools change workspace
configuration: pricing equations, material and process prices,
post-processing, lead times, shipping methods, tax, payment terms, and
workspace settings. These changes can affect storefront pricing immediately.
Review each change before you approve it.

## License

Proprietary. Use of the hosted MCP is governed by Phasio's terms.
