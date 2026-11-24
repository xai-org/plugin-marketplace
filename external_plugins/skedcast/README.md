# SkedCast plugin for Grok Build

Connect Grok Build to [SkedCast](https://skedcast.com), the social media scheduling platform for
agencies, creators and teams. Draft, validate, schedule and publish posts across X, LinkedIn,
Instagram, Facebook Pages, TikTok, YouTube, Threads, Pinterest, Bluesky, Telegram and Google
Business Profile, run approval workflows, manage clients and campaigns, and read analytics, all
through the hosted SkedCast MCP server.

## Installation

In Grok Build, open `/marketplace`, search for **SkedCast**, and install. Or from a terminal:

```bash
grok plugin install skedcast
```

On first connection, Grok opens the SkedCast sign-in in your browser. Sign in with the SkedCast
account whose workspace you want Grok to work with and approve the consent screen. No API key is
needed and nothing should be pasted into chat. You can revoke access at any time under
**Settings > Developer > Connected apps** in SkedCast.

## What you get

- **MCP server** `skedcast` at `https://api.skedcast.com/mcp` (Streamable HTTP, OAuth 2.1).
- **11 skills** that teach Grok how to use the tools well:

| Skill | What it covers |
|---|---|
| `schedule-post` | read the platform rulebook, dry-run with `validate_post`, then schedule or bulk-schedule |
| `manage-calendar` | list, reschedule, revise, retry and cancel scheduled posts |
| `approval-workflow` | find posts waiting for approval and approve or reject them |
| `analytics-report` | workspace, account, client and post analytics; reports and exports |
| `campaign-manager` | create campaigns, assign posts, shift a whole campaign in time |
| `client-management` | client groups with their approval policy, posting rules and brand voice |
| `media-library` | upload or import media and reuse library assets |
| `evergreen-content` | recycle evergreen posts on a schedule |
| `account-connect` | list connected accounts and send a connect invite for a new one |
| `webhooks-setup` | create, test and rotate webhooks; read deliveries |
| `workspace-overview` | plan, quota, posting limits and capabilities of the workspace |

Every tool carries MCP annotations (`readOnlyHint`, `destructiveHint`, `openWorldHint`,
`idempotentHint`), so Grok can tell a lookup from a publish or a delete before calling it. The
skills tell Grok to confirm every write with the user first.

## Example prompts

- "Schedule a post to my LinkedIn and X accounts for tomorrow at 9 AM."
- "What posts are waiting for my approval?"
- "When should I post on Instagram this week?"
- "How did my posts perform last week?"
- "Move my Friday Facebook post to Saturday morning."

## Authentication and network

The plugin connects only to SkedCast. Authentication is OAuth 2.1 authorization code with PKCE and
dynamic client registration; Grok handles the flow. Access is limited to the one workspace you
sign in to, and to the scopes you approve.

Network endpoints:

- `https://api.skedcast.com/mcp`: hosted MCP (Streamable HTTP)
- `https://api.skedcast.com/oauth/authorize`, `/oauth/token`, `/oauth/register`, `/oauth/revoke`: OAuth 2.1 + DCR
- `https://api.skedcast.com/.well-known/oauth-authorization-server`, `/.well-known/oauth-protected-resource/mcp`: discovery metadata
- `https://app.skedcast.com`: sign-in and consent screen during authorization

Credentials: a SkedCast account. The plugin ships no scripts, hooks or binaries: only this
manifest, the MCP server address and the skills.

## Support

- Help: https://skedcast.com/help
- Privacy: https://skedcast.com/legal/privacy
- Terms: https://skedcast.com/legal/terms
- Email: hello@skedcast.com

## License

MIT. See [LICENSE](LICENSE).
