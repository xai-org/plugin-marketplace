# UniPost plugin for Grok Build

Connect Grok Build to [UniPost](https://unipost.ai) to schedule social media posts to LinkedIn
profiles, X, TikTok, and YouTube, and to see how published posts performed. Instagram is coming soon.

## Installation

In Grok Build, open `/plugin`, search for **UniPost**, and install.

On first connection, Grok opens UniPost sign-in in your browser. Sign in, choose the workspace Grok
can use, and approve. Don't paste an API key into chat.

## Tools

| Tool | What it does |
|---|---|
| `list_accounts` | Lists the social accounts connected to the workspace (read-only) |
| `list_posts` | Lists scheduled, published, and failed posts (read-only) |
| `schedule_post` | Creates a post with text and public image or video links that waits for approval. After approval it publishes at the scheduled time. TikTok settings are chosen through the approval link, or the post can go to the creator's TikTok inbox as a draft. |
| `approve_post` | Approves a pending post after the user agrees to it in the chat. Posts that include TikTok are approved through a link instead, where the user picks TikTok's settings. |
| `cancel_post` | Cancels a post that hasn't been published yet |
| `get_analytics` | Views, likes, comments, and shares for published posts (read-only) |
| `get_x_allowance` | Remaining monthly X credits and each X account's posting limits (read-only) |

## Authentication

The plugin connects only to `https://mcp.unipost.ai/mcp` (MCP over Streamable HTTP). Authentication
is OAuth 2.1 with PKCE and dynamic client registration.

Network endpoints:

- `https://mcp.unipost.ai/mcp`: hosted MCP server
- `https://mcp.unipost.ai/.well-known/oauth-protected-resource` and
  `/.well-known/oauth-authorization-server`: OAuth discovery
- `https://mcp.unipost.ai/register`, `/authorize`, `/token`, `/revoke`: OAuth 2.1, DCR, and
  token revocation
- `https://unipost.ai/oauth/authorize`: human sign-in and consent

Credentials: a UniPost account that administers the workspace you connect. The access token is used
as `Authorization: Bearer` on `/mcp`, is scoped to that one workspace, and expires after 24 hours;
Grok renews it with a refresh token that is replaced on every use. Revoke the connection at any time
under **API keys** in UniPost. Nothing is stored in the plugin.

## Limits

- Agent API calls (tool calls): 500 a month on the free plan, and 1,000 per account on paid plans.
  Usage is shown under **Billing** in UniPost.
- Up to 60 requests a minute per workspace.

## License

Proprietary. Use of UniPost is governed by the [UniPost Terms](https://unipost.ai/terms) and
[Privacy Policy](https://unipost.ai/privacy).
