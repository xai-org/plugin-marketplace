# Abby plugin for Grok Build

Connect Grok Build to [Abby](https://www.abby.fr) — the invoicing and bookkeeping
app for French freelancers (micro-entrepreneurs). Create and send invoices,
manage quotes and advances, clients and products, and complete URSSAF
declarations from Grok.

## Installation

In Grok Build, open `/plugin`, search for **Abby**, and install.

On first connection, Grok opens the Abby sign-in page in the browser. Use your
Abby account. Do not paste an API key or token into chat.

Full setup guide: https://docs.abby.fr/mcp/demarrer

## Tools

- **Invoicing** — create, finalize, duplicate, cancel (credit note), archive and
  email invoices; edit draft lines and dates; download PDFs; statistics.
- **Quotes & advances** — create and finalize quotes, mark them signed or
  refused, create advance invoices from a signed quote.
- **Clients** — contacts and organizations: list, create, update, notes, archive.
- **Catalog** — products and services.
- **Declarations** — turnover estimations and URSSAF declaration completion.

Amounts are expressed in cents (100 € = `10000`).

## Authentication

The plugin connects only to `https://api.abby.fr/mcp`. Authentication is
OAuth 2.1 (authorization code + PKCE, dynamic client registration).

Network endpoints:

- `https://api.abby.fr/mcp` — hosted MCP (streamable HTTP)
- `https://api.abby.fr/.well-known/oauth-protected-resource` — resource metadata
- `https://app.abby.fr/.well-known/oauth-authorization-server` — authorization server metadata
- `https://app.abby.fr/oauth/authorize` — human sign-in and consent
- `https://api.abby.fr/oauth2/register`, `/oauth2/accessToken`, `/oauth2/invalidate` — DCR, token, revocation

Credentials: an Abby account. The access token is sent as
`Authorization: Bearer` on `/mcp`, with scopes granted at consent
(`billing:*`, `client:*`, `catalog:*`, `declaration:*`). No API key is stored in
the plugin. Tools only act on the signed-in user's company.

## License

Proprietary. Use of the hosted MCP is governed by Abby's terms of service
(https://www.abby.fr/legals/cguv) and privacy policy
(https://www.abby.fr/legals/confidentiality).
