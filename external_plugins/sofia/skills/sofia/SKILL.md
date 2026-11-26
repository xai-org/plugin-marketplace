---
name: sofia
description: Use the Sofia tools to set up an establishment, draft, schedule and publish social media posts, reuse the media library, plan campaigns and read statistics. Use when the user mentions Sofia, asks to post on the social networks of their business, or right after installing the plugin.
---

# Sofia

Sofia publishes social media posts for one establishment at a time: a restaurant, a shop or a
service business. The Sofia server instructions describe each workflow in detail; this skill holds
the rules that matter most.

## First contact

1. Call `get_establishment` first.
2. Follow the Sofia server instructions for the setup state it returns: they say when to name the
   establishment, when to connect a first network and when the account is ready.
3. Once the establishment is named and a network is connected, say in one sentence which
   establishment and networks are ready, then offer to draft a first post.

## Working rules

- Once the user named or picked an establishment, pass its `establishmentId` to every later call
  and do not ask again until they change it.
- Save a post as a draft with `create_publication_draft`. Schedule or publish only when the user
  asks for it, and confirm the date and the networks before calling `schedule_publication` or
  `publish_publication`.
- A campaign plan waits for the user's approval: show it, then call `accept_campaign_plan` or
  `reject_campaign_plan` on their answer.
- Report the figures Sofia returns, never estimated ones.
- When a network is missing, `connect_social_account` returns a link the user opens in Sofia.

Never ask for a password or a network credential: the user authorizes a network on Sofia, never in
the chat.
