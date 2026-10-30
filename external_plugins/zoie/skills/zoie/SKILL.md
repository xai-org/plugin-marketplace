---
name: zoie
description: >-
  Work with Zoie CRM through the Zoie MCP server: find and update leads, read
  conversations, notes and activity, check appointments, manage campaigns, and send
  confirmed SMS, WhatsApp, email, Messenger or Instagram messages. Use whenever "Zoie",
  "zoie.ai", "Zoie CRM", or the user's Zoie leads, inbox, appointments or campaigns
  come up.
---

# Zoie

Zoie is an AI-powered CRM for lead follow-up. The `zoie` MCP server bundled with this
plugin acts as the signed-in Zoie user, limited to the businesses and permissions that
user already has in Zoie.

## Before you act

1. **Pick the business first.** Call `list_my_businesses` once per session. If the user
   belongs to more than one business, ask which one, then pass its `business_id` to later
   calls. Never guess a business.
2. **Never guess IDs.** Find leads with `search_leads`, `get_lead_by_phone` or
   `global_search`, and team members with `list_team_members`, before acting on them.
   If more than one lead matches, show the matches and ask.
3. **Confirm before sending.** `send_message` sends a real message to a real person and
   may cost money. Show the channel, recipient and exact text, and wait for an explicit
   yes. Do not send on the same turn you draft.
4. **Confirm before changing many records or live outreach.** `bulk_update_leads`,
   `start_campaign`, `pause_campaign`, `resume_campaign` and `update_campaign` affect
   many leads at once. Say what will change and how many leads it touches (use
   `preview_campaign_audience` for campaigns), then wait for a yes.
5. **Read before you write.** Before replying to a lead, read the recent thread with
   `get_conversation_by_lead` so the reply fits what was already said.

## Choosing a tool

| You want to | Use |
|---|---|
| Find a lead | `search_leads` (free-text query), `get_lead_by_phone`, `global_search` |
| See a lead's details | `get_lead`, `get_lead_activity`, `get_lead_notes` |
| Read the conversation | `get_conversation_by_lead`; `list_conversation_channels` for the channels this business can send on |
| Reply to a lead | `send_message` (after confirmation) |
| Change a lead | `update_lead`, `assign_lead`, `add_lead_note`, `update_lead_note` |
| Change many leads | `bulk_update_leads` (after confirmation) |
| Add a lead | `create_lead` (check `get_lead_by_phone` first to avoid duplicates) |
| Appointments | `appointment_overview`, `appointment_calendar`, `list_appointment_leads` |
| Campaigns | `list_campaigns`, `get_campaign`, `list_campaign_options`, `preview_campaign_audience`, then `create_campaign` / `update_campaign` / `start_campaign` / `pause_campaign` / `resume_campaign` |

## Good habits

- Lead data is private customer information. Only show what the user asked for.
- Phone numbers go in E.164 format (for example `+15551234567`).
- Email sends need a `subject`.
- If a tool returns a permission error, tell the user their Zoie role does not allow it;
  do not retry with a different business.
