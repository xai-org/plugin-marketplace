---
name: schedule-social-posts
description: Schedule posts on X, TikTok or YouTube through a connected Hogmatix account, including videos or images from the user's machine, check upcoming posts and their status, or cancel pending posts. Use when the user mentions Hogmatix or asks to schedule, queue, list or cancel social media posts on their Hogmatix-connected accounts.
---

Use Hogmatix's connected-account tools for the requested scheduling task. The server supports X posts and threads (optionally with one image or video), TikTok videos, and YouTube videos. Other platforms, published-post deletion, analytics and media generation are outside this tool surface.

Discover destination identifiers with `list_accounts`: X uses `profile`, TikTok uses `openId`, YouTube uses `channelId`. When the request is about one platform, pass `platform` to list only that platform's accounts. Sign-in happens through Grok's OAuth flow with Hogmatix, and social accounts are connected on hogmatix.com. Do not ask for passwords, tokens or payment details in chat.

Preserve supplied post text, captions, titles and descriptions verbatim unless the user requests editing. When text exceeds a platform limit, explain the limit and ask how to proceed. Never silently shorten, reword or normalize it.

Resolve the destination account, exact content, calendar date and time zone before scheduling. Use ISO 8601 with an explicit offset for that date; Hogmatix requires at least ten minutes of lead time. Before each scheduling call, show the destination account, exact content, date and time with its time zone, and every label, and get the user's confirmation, even when the request already states them all. For multi-platform work, review each destination's content and options before its write.

Read queues with `list_scheduled_posts`. For X, supply a discovered profile. Report returned statuses and times faithfully. Scheduling success means queued; it does not establish platform publication. After a timeout or ambiguous failure, inspect the queue before retrying a non-idempotent scheduling operation.

## Media from the user's machine

Upload only a file the user explicitly pointed to, once per platform, with the destination's purpose: `x-media` (image or video) for X, `tiktok-video` for TikTok, `youtube-video` for YouTube. Each upload serves only its own purpose, and an unscheduled upload holds one of the account's upload slots until it is scheduled, so upload only for the platforms the user chose and schedule each platform's post before uploading for the next.

1. Read the file's exact size in bytes and its MIME type (for example `video/mp4`, `video/quicktime`, `image/png`).
2. Call `create_media_upload` with `purpose`, `filename`, `mimeType` and `byteSize`. It returns `uploadId`, `partSize` and `partCount`.
3. For each part, numbered from 1, take exactly the bytes from offset `(partNumber - 1) × partSize` (the last part may be shorter), for example with `dd if=FILE of=part bs=PARTSIZE skip=$((N-1)) count=1`. Compute the base64 SHA-256 of those bytes (`openssl dgst -sha256 -binary part | base64`), call `get_upload_part_url` with `uploadId`, `partNumber` and `checksumSha256`, and PUT exactly those bytes to the returned `url` with every returned header (for example `curl -fsS -X PUT --data-binary @part -H ... URL`). Ask for a fresh URL if a PUT fails. Delete the temporary part files afterwards.
4. Call `complete_media_upload`, and schedule only once the state is `promoted`; otherwise check `get_upload_status`.

Pass the `uploadId` to `schedule_x_post`, `schedule_tiktok_video` or `schedule_youtube_video`. `schedule_tiktok_video` also needs `durationSec`, the video's length in seconds: measure it with `ffprobe -v error -show_entries format=duration -of csv=p=0 FILE` when available, otherwise ask the user. Never invent upload IDs. `import_attached_file` is for files attached in a ChatGPT conversation; do not use it here.

## TikTok

Call `get_tiktok_creator_info`, then show the creator what Hogmatix's composer shows:
- Posting as: `creator_nickname` (@`creator_username`).
- Who can see this: only the returned privacy options, named Everyone, Friends, Followers or Only me.
- Allow comments, Allow Duet, Allow Stitch; any the creator disabled in TikTok stay off.
- Disclose video content, if the video promotes a brand, product or service: Your Brand ("You are promoting yourself or your own business", labeled "Promotional content") and/or Branded Content ("You are promoting another brand or a third party", labeled "Paid partnership"). With disclosure on, at least one is required. Branded Content requires Everyone or Friends visibility.
- AI-generated content: "Yes, AI made or changed this video" (TikTok adds an "AI-generated" label; AI voices, music, people or scenes count) or "No AI-generated images, video, voice or music".
- The declaration, word for word: "By posting, you agree to TikTok's Music Usage Confirmation." With Branded Content: "By posting, you agree to TikTok's Branded Content Policy and Music Usage Confirmation." Link https://www.tiktok.com/legal/page/global/music-usage-confirmation/en and https://www.tiktok.com/legal/page/global/bc-policy/en.

Require the creator's explicit choice for privacy, each interaction, disclosure and the AI label; never default or guess one. Show these choices with the video's file name, caption and time, and get the creator's go-ahead before `schedule_tiktok_video`, even when the request already states every choice. If the account can't post now or the video exceeds `max_video_post_duration_sec`, explain and stop. If Hogmatix says the caption names the account's own brand, ask whether to turn on Your Brand. After scheduling, note that TikTok may take a few minutes to process the video once it posts.

## YouTube

Resolve title, description, privacy (private, unlisted or public) and the made-for-kids selection, and confirm them before `schedule_youtube_video`.

## Cancelling and account status

Cancel only the specifically authorized pending post with `cancel_scheduled_post`, using its returned ID and platform. Resolve ambiguous targets first, then verify the resulting queue status. Already-published posts cannot be recalled here.

Use `get_plan` to explain current account entitlement and posting allowance when relevant. Do not sell subscriptions, promote trials or upgrades, initiate billing, or supply transactional links through this plugin.
