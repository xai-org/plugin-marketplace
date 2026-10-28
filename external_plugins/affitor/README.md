# Affitor

Read your [Affitor](https://affitor.com) affiliate program from Grok Build: partners, commissions, earnings, payouts and billing.

This plugin connects to the hosted Affitor MCP server at `https://mcp.affitor.com/mcp`. It is **read-only**: no tool can change data or move money.

## What you can ask

Brands (program owners) connect one program:
- "Which partners drove the most sales in the last 30 days?"
- "List my pending commissions."
- "How is my program set up, and is the tracker installed?"

Partners connect their partner account:
- "Which programs have I joined?"
- "How much have I earned, and when is it paid?"
- "List my referral links."

## Sign-in

On first connect, your browser opens Affitor's sign-in page. Sign in with your Affitor account, choose the program (brands), and click **Allow**. Access is read-only. You can disconnect at any time in Affitor: brands under **Settings** › **Developers** › **AI agents**, partners under the account menu › **Integrations**.

## Network endpoints and credentials

- **Network endpoints:** `https://mcp.affitor.com` only (the MCP endpoint `/mcp` and its OAuth endpoints under `/oauth`).
- **Credentials:** none stored by this plugin. It uses OAuth 2.1 with PKCE in your browser. No API key, no environment variables, no local files.
- **Components:** one MCP server (`.mcp.json`). No skills, commands, hooks or scripts.

## Tools

| For | Tools |
|---|---|
| Brands | `get_program`, `list_partners`, `get_partner`, `list_applications`, `list_commissions`, `get_commission_summary`, `get_billing` |
| Partners | `list_my_programs`, `list_my_links`, `get_my_earnings`, `list_my_commissions`, `list_my_payouts` |

Full guide: https://affitor.com/docs/api-reference/mcp

## Privacy, terms and support

- Privacy policy: https://affitor.com/privacy
- Terms: https://affitor.com/terms
- Help: https://affitor.com/docs/support or hello@affitor.com

## License

Proprietary. Copyright © 2026 Affitor.
