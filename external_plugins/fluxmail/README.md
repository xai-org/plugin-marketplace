# Fluxmail plugin for Grok Build

Use a local [Fluxmail](https://fluxmail.ai) instance to search and read Gmail, Outlook, Exchange, and IMAP/SMTP mail. This plugin starts the published `fluxmail@0.11.2` npm package as a stdio MCP server with the `read-only` permission profile.

## Setup

Fluxmail requires Node.js 20.20.x, or Node.js 22.22 or later. Before enabling the plugin, set up Fluxmail in a terminal:

```sh
npx -y fluxmail@0.11.2 setup --name "Your name" --email you@example.com
```

Complete the password prompt and connect a mailbox using the [quickstart](https://fluxmail.ai/docs/quickstart). The plugin uses the authenticated member session from the selected local Fluxmail profile. It cannot connect to a remote instance through stdio.

The free Personal plan supports one member and three mailboxes. No paid key is required for that plan.

## Permissions

The bundled configuration allows reading and searching. To enable drafting, sending, scheduling, or mailbox changes, explicitly choose a suitable permission profile in the MCP configuration. You can narrow access to particular mailboxes with `--account`. See [permissions](https://fluxmail.ai/docs/permissions) before changing the scope.

The wrapper includes no hooks, setup scripts, or bundled credentials. Mailbox credentials and local session secrets are managed by Fluxmail in its data directory. Do not paste passwords, OAuth tokens, or API keys into chat.

## Network access

- `registry.npmjs.org`: npx downloads the pinned Fluxmail package and its dependencies.
- Google OAuth and Gmail API hosts (`accounts.google.com`, `oauth2.googleapis.com`, `gmail.googleapis.com`, and `www.googleapis.com`): used when a Gmail mailbox is connected.
- Microsoft OAuth and Graph hosts (`login.microsoftonline.com` and `graph.microsoft.com`), or the configured Exchange host: used for connected Microsoft mailboxes.
- User-configured IMAP and SMTP hosts: used only for connected mailboxes.
- Fluxmail's licensing service at `fluxmail.ai`: used when an operator configures a paid license.

Fluxmail normally sends usage telemetry through `t.fluxmail.ai`. This plugin sets `FLUXMAIL_TELEMETRY=0` to disable it. The server still contacts the providers needed for the user's connected mailboxes.

## Source and license

Richard Chu maintains Fluxmail at [churichard/fluxmail](https://github.com/churichard/fluxmail). The plugin wrapper and Fluxmail are source available under the [Elastic License 2.0](LICENSE.md).
