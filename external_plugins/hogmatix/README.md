# Hogmatix plugin for Grok Build

Connect Grok Build to [Hogmatix](https://hogmatix.com), a social media scheduler. Schedule X posts
and threads, and TikTok and YouTube videos, on the accounts connected to your Hogmatix account.
You can also check upcoming posts, cancel pending ones and see your posting allowance.

## Installation

In Grok Build, open `/marketplace`, search for **Hogmatix**, and install.

You need a Hogmatix account with at least one X, TikTok or YouTube account connected on
[hogmatix.com](https://hogmatix.com). On first connection, Grok opens Hogmatix sign-in in the
browser: sign in and choose **Allow**. Do not paste a password or token into chat.

## Authentication

The plugin connects only to Hogmatix. Authentication is OAuth 2.1 with PKCE and dynamic client
registration against `hogmatix.com`; the granted scopes are `hogmatix:read` and
`hogmatix:schedule`. Access tokens last an hour and are refreshed. No API key is stored in the
plugin, and the tools act only on the signed-in user's own connected accounts.

Network endpoints:

- `https://hogmatix.com/mcp`: hosted MCP (streamable HTTP)
- `https://hogmatix.com/authorize`, `/token`, `/register`, `/revoke`: OAuth 2.1 and DCR
- `https://hogmatix.com/oauth/consent`: human sign-in and consent
- `https://<account>.r2.cloudflarestorage.com`: short-lived pre-signed URLs returned by
  `get_upload_part_url`. Used only when you ask to schedule a video or image from your machine;
  the file's bytes are uploaded to Hogmatix's private media storage.

Credentials: a Hogmatix account. The plugin reads no local credentials, environment variables or
files other than a media file you explicitly ask it to schedule.

## What it does

The skill `schedule-social-posts` guides Grok through the Hogmatix MCP tools:
`list_accounts`, `get_plan`, `list_scheduled_posts`, `get_tiktok_creator_info`,
`schedule_x_post`, `schedule_tiktok_video`, `schedule_youtube_video`, `cancel_scheduled_post`
and the media upload tools. It confirms the account, exact text, time and every TikTok or
YouTube setting with you before anything is scheduled. Scheduled posts go out publicly at the
chosen time, unless you choose a private or "only me" setting.

## Support

[hogmatix.com/support.html](https://hogmatix.com/support.html)

## License

Proprietary. Use of the hosted service is governed by the Hogmatix
[Terms of Service](https://hogmatix.com/terms.html) and
[Privacy Policy](https://hogmatix.com/privacy.html).
