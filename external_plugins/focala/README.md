# Focala plugin for Grok Build

Connect Grok Build to [Focala](https://focala.ai) to explore your workspace's
AI search visibility, competitor rankings, monitored prompts, recommendations,
buyer insights, content performance, traffic, and tasks.

## Installation and authentication

Once listed in the xAI marketplace, open `/plugin` in Grok Build, search for
**Focala**, and install. On first connection, follow the OAuth sign-in flow,
select your Focala workspace, and approve the connection's access. A Focala
account and workspace membership are required. Available data depends on your
workspace's monitoring and connected integrations.

No API key, client secret, or manually copied bearer token is required. Never
paste credentials into chat. The MCP client obtains and manages OAuth tokens.
Each connection is limited to one workspace and the signed-in member's permissions.
Use read access for analytics. Manage access also exposes prompt and task creation
and updates to eligible editors/admins; viewers cannot use write tools.

## Example requests

- How has my brand's AI visibility changed over the last 30 days?
- Which competitors rank ahead of my brand on monitored prompts?
- What are my highest-priority AI visibility recommendations?
- Show my AI referral traffic for the last 30 days by engine.
- Show my workspace's open tasks, including their status and priority.

Answers use existing observations; a question does not start a new monitoring run.
Missing data is not zero performance, recommendation impact scores are estimates,
and before/after content metrics do not establish causation. The server supplies
tool descriptions and connection instructions, including permission requirements.

## Network access and data

This package contains only metadata and an HTTP MCP configuration. It installs
no executable scripts, hooks, or local MCP process and requests no local files
or environment variables. Tool calls send requested arguments to Focala and
return data from the authorized workspace to Grok.

Network endpoints used by the connection:

- `https://app.focala.ai/api/mcp` — hosted MCP over Streamable HTTP.
- `https://app.focala.ai/.well-known/oauth-protected-resource/api/mcp` — resource discovery.
- `https://app.focala.ai/.well-known/oauth-authorization-server/api/auth/connect/global`
  — OAuth authorization server discovery.
- `https://app.focala.ai/api/auth/connect/global` — browser authorization gateway;
  sign-in and workspace consent use Focala's application and WorkOS AuthKit.
- `https://respectable-bicycle-26.authkit.app/oauth2/authorize`, `/oauth2/token`,
  and `/oauth2/register` — WorkOS authorization, token exchange/refresh, and
  dynamic client registration, as advertised by Focala's discovery metadata.

OAuth uses authorization code with PKCE (S256). No credentials are bundled.
Focala's hosted service enforces workspace isolation, connection access, member
roles, and rate limits. Task assignment can send the normal Focala notification;
task completion can run verification, and prompt creation uses normal scheduled
monitoring. Review requested changes before approving a write.

## Support and policies

- [Support](https://focala.ai/contact)
- [Privacy policy](https://focala.ai/privacy-policy)
- [Terms of service](https://focala.ai/tos)

## License

The files in this plugin package are licensed under [MIT](LICENSE).
This license does not cover the Focala application or hosted service, whose use
is governed by Focala's terms of service.
