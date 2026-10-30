# Chronotek Pro Agent for Grok Build

Connect Grok Build to Chronotek Pro's hosted MCP service for workforce operations. Review time and attendance, schedules, coverage, and exceptions; perform supported actions within your Chronotek permissions and approval requirements. Requires an eligible Chronotek account with Agent access.

## Preview status

This submission is a draft pending deployment of Chronotek's dedicated `chronotek-grok-build` OAuth registration and end-to-end testing in Grok Build. Previous testing in Grok web, Grok Bot, or Cursor does not certify Grok Build. Do not treat catalog validation as production certification.

## Install and connect

Use a Grok Build release supporting remote HTTP MCP servers with `oauth.clientId`, `oauth.scopes`, and `oauth.callbackPort` settings. These settings were verified against Grok Build source commit `2bdd1d6a6369de0e8c68132ea4539e9abd9e14a8`.

1. After the OAuth registration is deployed, install from a checkout of this marketplace branch:

   ```sh
   grok plugin install ./external_plugins/chronotek-pro-agent --trust
   ```

2. Open `/mcps`, select the `chronotek` server, and press `i` to start OAuth sign-in.
3. Sign in on Chronotek's own authorization page and review the requested access before consenting. This plugin contains no client secret or shared login.
4. Start with a permitted read, such as “Show my Chronotek company and region access,” before requesting changes.

Once the plugin is accepted into the marketplace and certification is complete, the catalog install command will be `grok plugin install chronotek-pro-agent --trust`.

The connector uses public client `chronotek-grok-build`, PKCE, and callback `http://127.0.0.1:8788/callback`. Ensure local port 8788 is available. If authentication fails, use `/mcps` to inspect status and retry after resolving the port conflict. Dynamic client registration is not required. Do not substitute another application's OAuth client ID.

## Examples

- “Show this week's Chronotek attendance exceptions for the region I can access.”
- “Which scheduled shifts have coverage issues?”
- “Draft a message about this exception and show me the recipients and wording before sending.”

Chronotek enforces account eligibility, company and region boundaries, roles, granted scopes, and action approvals. Ask Grok to show proposed changes before approving them. Read-only access does not permit writes. Do not use workforce summaries as a substitute for payroll or compliance review.

## Access and data

| Endpoint | Purpose |
|---|---|
| `https://admin.mychronotek.com/mcp` | MCP discovery, tool descriptions, and authorized workforce operations. |
| `https://admin.mychronotek.com/.well-known/oauth-protected-resource` | Protected-resource discovery. |
| `https://auth.mychronotek.com` | Chronotek authorization-server discovery, browser sign-in, consent, token refresh, and revocation. |

Requested scopes are `agent.read`, `agent.write`, and `offline_access`: read operations, permitted write operations, and continued access through refresh tokens. Actual permissions are limited by the signed-in account and granted consent. A read-only setup may remove `agent.write` before connecting. Grok Build manages OAuth tokens through its normal credential storage. Disconnect/revoke access through the host and Chronotek's connector controls when no longer needed.

Workforce records returned by tools are shared with Grok/xAI to answer your requests. Review your organization's policies and the providers' privacy terms before connecting customer or employee data. This package adds no telemetry. It ships one static remote MCP configuration, this documentation, a manifest, a license, and an approved icon. It contains no executable server, shell commands, lifecycle hooks, skills, agents, filesystem readers, or bundled credentials.

## Support and ownership

Published by The Chrono-Tek Company, Inc. See the [Chronotek website](https://www.chronotek.com) for product and support information. Include the client version, time of failure, and a sanitized correlation ID in a support request. Never include passwords, authorization codes, tokens, or customer records in public issues.

The connector package is proprietary licensed; see [LICENSE](LICENSE). The license permits authorized use with Chronotek and the GitHub/xAI distribution needed for this integration. Selling, reselling, broader sublicensing, and other redistribution require prior written permission. Chronotek names and the included icon may be used solely to identify this integration. Listing does not imply endorsement by xAI.
