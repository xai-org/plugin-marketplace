# Sofia plugin for Grok Build

Connect Grok Build to [Sofia](https://www.sofia-post.com), the social media assistant for
independent businesses: restaurants, service providers and shops. Draft, schedule and publish
posts on the networks connected in Sofia, reuse the media library, prepare campaign plans for
review and read how publications perform, through the hosted Sofia MCP server.

## Installation

In Grok Build, open `/plugin`, search for **Sofia**, and install.

On first connection, Grok opens the Sofia sign-in in your browser. Sign in with your Sofia account,
approve the access on Sofia's consent page and choose the establishment Grok works on. No API key
is needed and nothing should be pasted into chat. A Sofia account is required.

## What you get

- **MCP server** `sofia` at `https://mcp.sofia-post.com` (Streamable HTTP, OAuth 2.1).
- **Skill** `sofia`: the first-contact flow (check the establishment, connect a first network) and
  the working rules (draft first, confirm before scheduling or publishing, report only the figures
  Sofia returns).

### Tools

The main tools, grouped by area. The server's `tools/list` returns the complete, current list.

| Area          | Tools                                                                                                                                                                                                                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Discovery     | `get_sofia_capabilities`, `get_supported_platforms`, `get_publishing_options`, `get_sofia_profile`                                                                                                                                                                                                               |
| Establishment | `get_establishment`, `list_establishments`, `set_up_establishment`, `rename_establishment`, `get_profile_build_status`                                                                                                                                                                                           |
| Brand profile | `analyze_brand_site`, `get_brand_analysis`, `apply_brand_analysis`, `update_brand_profile`, `add_brand_product`                                                                                                                                                                                                  |
| Networks      | `list_connected_accounts`, `connect_social_account`                                                                                                                                                                                                                                                              |
| Publications  | `list_publications`, `create_publication_draft`, `create_publication`, `get_publication`, `update_publication`, `validate_publication`, `schedule_publication`, `reschedule_publication`, `unschedule_publication`, `publish_publication`, `delete_publication`, `share_publication`, `revoke_publication_share` |
| Media library | `search_media`, `find_media`, `get_media`, `pick_media`, `show_media`, `create_media_upload`, `confirm_media_upload`                                                                                                                                                                                             |
| Campaigns     | `list_campaigns`, `prepare_campaign_plan`, `create_campaign`, `get_campaign`, `update_campaign`, `propose_campaign_plan`, `accept_campaign_plan`, `reject_campaign_plan`, `add_publication_to_campaign`, `edit_planned_publication`, `remove_planned_publication`, `attach_campaign_media`                       |
| Widget        | `get_widget_messages`, `report_widget_diagnostic`, `report_widget_action` (the in-conversation cards: labels and render logs, nothing changes in Sofia)                                                                                                                                                          |
| Statistics    | `get_network_insights`, `get_cross_network_insights`, `list_network_publications`, `get_publication_metrics`, `list_post_comments`, `get_content_audit`                                                                                                                                                          |

Every tool carries MCP annotations (`readOnlyHint`, `destructiveHint`, `openWorldHint`), so Grok can
tell a lookup from a publication before calling it. Sofia publishes or schedules a post only when
the user asks for it, and a campaign plan waits for the user's approval unless they chose automatic
campaigns in Sofia.

## Example prompts

- "Which establishment is set up in Sofia, and which social networks are connected?"
- "Write an Instagram post announcing our new weekend brunch menu and save it as a draft in Sofia."
- "Schedule that draft for next Tuesday at 9am."
- "How did my Instagram posts perform over the last 30 days in Sofia?"
- "Plan a three-week campaign in Sofia to promote our summer terrace."

## Authentication and network

The plugin connects only to Sofia's own hosts. Authentication is OAuth 2.1 authorization code with
PKCE (S256); the client registers through a Client ID Metadata Document or dynamic client
registration, and Grok handles the flow. Sofia asks for five scopes on first consent: `read`,
`write`, `publish`, `stats` and `media`.

Network endpoints:

- `https://mcp.sofia-post.com`: hosted MCP (Streamable HTTP)
- `https://mcp.sofia-post.com/.well-known/oauth-protected-resource`: resource metadata
- `https://api.sofia-post.com/.well-known/oauth-authorization-server`: authorization server metadata
- `https://api.sofia-post.com/api/oauth/authorize`, `/token`, `/register`, `/revoke`, `/jwks`: OAuth 2.1, DCR
- `https://app.sofia-post.com`: human sign-in and consent screen during authorization

Credentials: a Sofia account. The MCP server receives a Sofia access token scoped to the account
and the establishment chosen at consent. Social network credentials stay in Sofia: Grok never sees
them, and the user connects a network on Sofia, never in the chat. The plugin stores no API key and
requests no filesystem or shell access. The access can be revoked at any time from Sofia's settings
(Connected apps).

## Support and policies

- Support: [sofia-post.com/en-US/contact](https://www.sofia-post.com/en-US/contact), support@sofia-post.com
- Privacy policy: [sofia-post.com/en-US/privacy-policy](https://www.sofia-post.com/en-US/privacy-policy)
- Terms of use: [sofia-post.com/en-US/terms-of-use](https://www.sofia-post.com/en-US/terms-of-use)

## License

The plugin files (this README, `.mcp.json`, `.grok-plugin/plugin.json` and the skill) are released
under the MIT license. The Sofia service itself is governed by its terms of use.
