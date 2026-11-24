---
name: media-library
description: Work with the SkedCast content library (DAM). Use when the user wants to find, import, or upload images and videos for posts, or asks what media is available.
---

# Media Library

The content library holds reusable images and videos. Importing and uploading are
write actions — confirm with the user first.

## Finding assets

Call `list_library_assets` with kind, folder, label, client, or status filters, plus
free-text search. To find assets that are actually publishable, filter
`status: "transcoded"` — every row also carries `status`, `publishable`, and `ready`,
so check those flags before attaching an asset to a post. For one asset in full —
filename, kind, size, dimensions, duration, folder, labels, alt text, pipeline
status, and the per-platform readiness map — call `get_media_asset`.

## Adding media

- **`import_media`** — ingest an external image/video by URL. The file must already be
  reachable at a public URL.
- **`upload_media`** — upload a local image/video and get back a media id for
  `create_post`. Sends the file inline (≤18 MiB) or returns a presigned URL for
  larger files. Use this for bytes you already hold, e.g. an image just rendered in
  the conversation.

## Using media in posts

Pass the media id to `create_post` / `update_post`. For per-platform needs (cover
images, alt text), set them in `variants[].overrides` — `create_post` accepts
per-asset alt text per platform. Check `get_capabilities` first for each platform's
media rules: allowed counts, formats, file-size ceiling, duration bounds, and aspect
ratios.
