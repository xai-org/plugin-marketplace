# Planagram for Grok

Connect Grok to [Planagram](https://getplanagram.com), the social media scheduler.
Draft, schedule, edit and review posts across the social accounts you have connected
to Planagram, straight from a conversation.

## Installation

Once accepted into the xAI marketplace, open `/plugin` in Grok Build, search for
**Planagram**, and install. On first connection, a Planagram sign-in page opens in the
browser. Sign in with your Planagram account and approve access. No API key is
bundled in this plugin or needed.

Try: "Use Planagram to draft three posts for next week and schedule them for 9:30 AM
on my LinkedIn and X accounts."

## Components and permissions

This plugin contains one HTTP MCP connection and one workflow skill. It has no
scripts, lifecycle hooks, local executables or dependency installation, and it does
not read local files, secrets or environment variables.

Tools: `list_social_accounts`, `list_posts`, `get_post`, `create_post`,
`update_post`, `delete_post`, `get_account_plan`. Every tool is scoped to the
signed-in Planagram user's own posts and connected accounts. Posts are saved as
drafts unless the user asks for them to be scheduled or published.

## Network and authentication

- `https://mcp.getplanagram.com/mcp`: hosted MCP server (streamable HTTP).
- `https://mcp.getplanagram.com/.well-known/oauth-authorization-server` and
  `/.well-known/oauth-protected-resource`: OAuth discovery.
- `https://mcp.getplanagram.com/oauth/register`, `/oauth/authorize`, `/oauth/token`,
  `/oauth/revoke`: OAuth 2.0 with PKCE and dynamic client registration.
- `https://getplanagram.com`: Planagram account sign-in and consent page.

Credentials: a Planagram account (a free plan is available). The host manages the
OAuth tokens; nothing is stored in the plugin.

## Ownership and license

Maintained by Planagram LLC. Contact: support@getplanagram.com.
Plugin files are MIT licensed; use of the hosted service is governed by
[Planagram's terms](https://getplanagram.com/terms) and
[privacy policy](https://getplanagram.com/privacy).
