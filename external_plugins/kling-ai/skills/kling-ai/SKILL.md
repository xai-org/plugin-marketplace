---
name: kling-ai
description: Create and monitor Kling AI image and video generations through the OAuth-protected remote MCP server in Grok Build. Use for text-to-image, image-to-image, text-to-video, image-to-video, uploads, task status, and credit checks.
version: 1.0.0
author: KLING AI
license: MIT
metadata:
  author: KLING AI
  short-description: Generate images and videos with Kling AI
---

# Kling AI for Grok Build

Use only the packaged server `Plugin-Grok-kling-ai`. The marketplace package activates Global `https://kling.ai/mcp`; a China-region private distribution may instead activate `https://klingai.com/mcp`. Never activate both regions in one session. This plugin contains configuration and Skills only; it does not bundle, start, or depend on a local MCP server.

## Safety and submission contract

- Use Grok-native MCP OAuth. Never request an API key or expose credentials, cookies, authorization headers, private account fields, or signed URLs in logs.
- Treat generation as a credit-consuming write action. Show the final workflow, model, duration/resolution or aspect ratio, and obtain explicit confirmation immediately before submission unless the current user message explicitly authorizes immediate submission with final settings.
- Submit at most once per approved intent. Never automatically retry failed, timed-out, or ambiguous submissions.
- Discover the live remote tools and schemas at runtime; provider schemas override examples in this Skill.
- Upload attached or local media before generation when the live workflow requires it. Reuse the returned provider reference exactly as the schema requires.
- After acceptance, use the remote `query_tasks` tool when status checking is needed. Do not invent a local result or claim that a card will refresh itself.

Read [references/tool-workflows.md](references/tool-workflows.md) before a generation call. Read [references/troubleshooting.md](references/troubleshooting.md) only after an authorization, schema, upload, or provider failure.

## OAuth client identity

Grok owns OAuth dynamic registration, PKCE, credential storage, and refresh. Preserve that native flow. The packaged server key and `X-Kling-Integration: Plugin-Grok` header provide telemetry-only integration attribution and must not affect authorization, billing, or rollout.

## Workflow

1. Identify the requested generation or read-only operation.
2. Ask only for missing creative requirements that materially affect the result.
3. Inspect the live schema and confirm the final billable settings.
4. Call the selected remote generation tool at most once.
5. Preserve and report the exact `generationId` and any `taskTraceId` returned by the provider.
6. If the active Grok surface supports the returned MCP App resource, let it render the resource. Otherwise report the same call's text fallback and one link to the primary output when available; do not synthesize or duplicate media.
7. For a direct status request, call remote `query_tasks` once and report the current state.

## Defaults

Use defaults only when the user did not specify alternatives and the live schema supports them:

- video resolution: `720p`
- video duration: `5` seconds
- text-to-video aspect ratio: `16:9`
- image-to-video aspect ratio: derive from the first frame unless required

## Failure behavior

- Authorization failure: open `/mcps`, select `Plugin-Grok-kling-ai`, and press `i`; retry only after authorization succeeds.
- Invalid model or argument: refresh the live schema and revise only the unsupported field.
- Provider task failure: explain the provider message and preserve the `generationId`; do not resubmit.
- Lost or timed-out submission response: treat billing state as unknown and query existing tasks before considering any new submission.
