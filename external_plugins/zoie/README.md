# Zoie plugin for Grok Build

Connect Grok to [Zoie](https://zoie.ai), the AI-powered CRM for lead follow-up. Search and
update leads, read conversation history, notes and activity, check appointments, manage
outreach campaigns, and send replies over SMS, WhatsApp, email, Messenger or Instagram,
all through the hosted Zoie MCP server.

## Installation

In Grok Build, open `/plugin`, search for **Zoie**, and install.

On first connection, Grok opens the Zoie sign-in page in your browser. Sign in with your
Zoie account and approve access. No API key is needed and nothing should be pasted into chat.

## What you get

- **MCP server** `zoie` at `https://mcp-us.zoie.ai` (Streamable HTTP, OAuth 2.1).
- **Skill** `zoie`: how to use the Zoie tools safely (pick the business first, never guess
  IDs, confirm before sending messages or changing many leads at once).

### Tools

| Area | Tools |
|---|---|
| Account | `list_my_businesses`, `list_team_members` |
| Leads | `search_leads`, `get_lead`, `get_lead_by_phone`, `create_lead`, `update_lead`, `assign_lead`, `bulk_update_leads`, `get_lead_activity` |
| Notes | `get_lead_notes`, `add_lead_note`, `update_lead_note` |
| Conversations | `list_conversation_channels`, `get_conversation_by_lead`, `send_message` |
| Appointments | `list_appointment_leads`, `appointment_overview`, `appointment_calendar` |
| Campaigns | `list_campaigns`, `get_campaign`, `list_campaign_options`, `preview_campaign_audience`, `create_campaign`, `update_campaign`, `start_campaign`, `pause_campaign`, `resume_campaign` |
| Search | `global_search` |

Every tool carries MCP annotations (`readOnlyHint`, `destructiveHint`), so Grok can tell a
lookup from a change before calling it.

## Example prompts

- "Which leads came in today, and which ones haven't been contacted yet?"
- "Show me the conversation and notes for Jane Smith."
- "What appointments are booked for tomorrow?"
- "Assign lead 456 to Sam and mark it qualified."
- "Pause the Spring Promo campaign."
- "Text Priya that her appointment is confirmed for Friday at 3pm."

## Authentication and network

The plugin connects only to Zoie-owned hosts. Authentication is OAuth 2.1 authorization
code with PKCE and dynamic client registration; Grok handles the flow.

Network endpoints:

- `https://mcp-us.zoie.ai`: hosted MCP (Streamable HTTP)
- `https://mcp-us.zoie.ai/.well-known/oauth-protected-resource`: discovery metadata
- `https://api-us.zoie.ai/oauth/authorize`, `/oauth/token`, `/oauth/register`: OAuth 2.1 + DCR
- `https://api-us.zoie.ai/.well-known/oauth-authorization-server`: discovery metadata
- The Zoie web app (`*.zoie.ai`): human sign-in and consent screen during authorization

Credentials: a Zoie account. Access is limited to the businesses that account belongs to and
to the role permissions it already has in Zoie. Outbound messages are sent from the
business's own Zoie numbers and accounts and may incur messaging charges, so the skill
requires an explicit yes before `send_message`.

## Links

- Documentation: https://docs.zoie.ai/docs/mcp/overview
- Privacy policy: https://zoie.ai/privacy
- Terms: https://zoie.ai/terms
- Support: https://zoie.ai/contact

## License

Proprietary. The Zoie MCP server and this plugin are provided by Zoie under the
[Zoie Terms](https://zoie.ai/terms).
