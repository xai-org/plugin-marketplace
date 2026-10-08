# Agiled

Connect Grok to [Agiled](https://agiled.app) to find and manage clients, contacts, deals, projects, tasks, invoices, estimates, expenses, payments, products, files, tickets, and time entries within your workspace permissions.

This plugin contains one remote MCP server and the `agiled-workspace` skill. It has no executable scripts, hooks, local server, package dependencies, or telemetry.

## Install and connect

After this submission is approved in the xAI marketplace:

```sh
grok plugin marketplace add xai-org/plugin-marketplace
grok plugin install agiled --trust
```

For local review of this directory:

```sh
grok plugin validate ./external_plugins/agiled
grok plugin install ./external_plugins/agiled --trust
```

Restart Grok or reload plugins. On first use, complete the browser OAuth flow with your own Agiled account and select the intended workspace. In Grok Build, `/mcps` also exposes authentication controls. No API key or password belongs in the plugin files.

The submission targets the xAI Grok Build plugin marketplace. Grok Bot also documents Marketplace connectors, but availability there depends on xAI's review and distribution; this submission does not establish a Grok Bot listing.

## Try it

- "Show my 10 most recent Agiled tasks and their statuses."
- "Find Dunder Mifflin in my Agiled workspace and summarize the matching client."
- "Create a task called Review homepage copy in my Website Redesign project, then show the saved task."

Replace example names with records in your own workspace. Reads and writes remain limited by your current Agiled role. Mutations can trigger configured workflows, webhooks, or notifications.

## Authentication and network access

- MCP: `https://api.agiled.ai/mcp` — Streamable HTTP for authorized workspace tools.
- OAuth resource discovery: `https://api.agiled.ai/.well-known/oauth-protected-resource/mcp`.
- OAuth issuer: `https://my.agiled.ai/api/auth` — browser sign-in, consent, client registration, token issuance, and refresh.
- Returned workspace links: `https://my.agiled.ai`.

Requires an Agiled account with workspace membership and permission for the requested records. OAuth uses authorization-code PKCE S256 and dynamic client registration. `mcp:read` permits authorized reads; `mcp:write` permits authorized writes, intersected with the user's current role. The plugin does not request filesystem access or read environment variables. Grok manages OAuth credentials; the plugin contains no embedded credentials.

If authentication fails, reconnect from `/mcps`. If an operation is denied, check the Agiled role and consented scopes. `grok mcp doctor --json` diagnoses configuration and connectivity.

## Publisher, license, and support

Published for Agiled by ZTABS. The plugin files in this directory are MIT licensed; the hosted Agiled service remains governed by its own terms.

- [Support](https://agiled.app/contact-us) / hello@agiled.app
- [Privacy policy](https://agiled.app/legal/privacy-policy)
- [Terms of service](https://agiled.app/legal/terms-of-service)
