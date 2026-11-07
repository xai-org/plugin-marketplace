# RenewRoster plugin for Grok Build

Connect Grok Build to [RenewRoster](https://renewroster.com), which helps web agencies and
freelancers keep every client's domains and SSL certificates from lapsing.

## Installation

In Grok Build, open `/plugin`, search for **RenewRoster**, and install.

On first connection, Grok opens the RenewRoster sign-in in your browser (OAuth 2.1 with PKCE and
dynamic client registration). Approve access for one agency, read-only or read + write. No API key
is needed and nothing should be pasted into chat. Revoke access any time on the Connected apps page.

## What you get

- **MCP server** `renewroster` at `https://app.renewroster.com/mcp` (Streamable HTTP, OAuth 2.1).
- **28 tools** (17 read-only, 9 write, 2 destructive: `delete_asset`, `delete_alert_channel`).
  Every tool carries MCP annotations (`title`, `readOnlyHint`, `destructiveHint`,
  `idempotentHint`, `openWorldHint`), so Grok asks before making changes. A read-only grant exposes
  only the lookup tools.

Ask which domains or certificates expire soon, see the monthly renewal report with who pays each
renewal, look up any domain's registration expiry (RDAP/WHOIS) or a host's live certificate, and
add, re-check or stop tracking assets.

## Example prompts

1. "Which client domains and SSL certificates expire in the next 30 days? Group them by client."
2. "Show this month's renewal report: who pays for each renewal and what's the total?"
3. "When does example.org's domain registration expire, and who is the registrar?"
4. "Check the SSL certificate on github.com and tell me how many days are left."
5. "Start tracking acme.com under the client Acme, then show my plan usage."

## Network endpoints and credentials

- `https://app.renewroster.com/mcp` and its OAuth endpoints: the only endpoint the plugin talks to.
- Server-side, live lookup tools (`lookup_domain`, `lookup_cert`, `lookup_ct`, `check_now`,
  `test_alert_channel`) contact public RDAP/WHOIS servers, the host being checked, Certificate
  Transparency logs, or the user's own configured alert channel.
- Credentials: a RenewRoster account, authorized via OAuth in the browser. No local secrets,
  hooks, scripts or skills are shipped.

## Links

- Docs: https://renewroster.com/docs/mcp
- Privacy: https://renewroster.com/legal/privacy
- Terms: https://renewroster.com/legal/terms
- Support: support@renewroster.com

## License

The files in this plugin directory are MIT licensed. The RenewRoster service is governed by its
[terms](https://renewroster.com/legal/terms).
