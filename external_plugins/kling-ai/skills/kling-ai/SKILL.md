---
name: kling-ai
description: Create and monitor Kling AI image and video generations through the OAuth-protected remote MCP server in Grok Build. Use for generation routing, uploads, Elements, the motion library, task status, credit checks, and account switching.
version: 1.0.1
author: KLING AI
license: MIT
metadata:
  author: KLING AI
  short-description: Generate images and videos with Kling AI
---

# Kling AI for Grok Build

Use only the packaged server `kling-ai` at the Global endpoint `https://kling.ai/mcp/plugin`. This package does not bundle, start, or depend on a local MCP server.

A China-region private distribution may instead activate `https://klingai.com/mcp/plugin`. Never activate both regions; disconnect the old OAuth session before replacing the endpoint and authorizing again.

## Request routing

- Route text-to-image, image-to-image, posters, covers, product stills, portraits, and image variants to `kling-ai-generate-image`.
- Route text-to-video, image-to-video, motion control, animation, camera movement, storyboards, and video concepts to `kling-ai-generate-video`.
- Keep OAuth, sign-out or account switching, uploads, the motion library, Elements, credit checks, cross-media requests, and task-status requests in this Skill.
- Follow up on an existing task with `query_tasks`; do not create a replacement generation.

An attachment does not determine its role. When the user has not specified one, ask only which materially relevant role it serves: first frame, tail frame, identity or product reference, editable source, motion source, or style reference.

## Grok Build connection boundary

- Use native Grok Build MCP OAuth for `kling-ai`. Never request an API key, token, cookie, authorization header, or credential file. Never log private account fields or signed URLs.
- Grok Build owns OAuth registration, PKCE, credential storage, and refresh. Preserve its native flow and the packaged server identity. The `X-Kling-Integration: Plugin-Grok` header is telemetry-only and must not affect authorization or billing.
- Create one RFC 4122 UUIDv7 `taskTraceId` for each unrelated new objective. Reuse it across discovery, upload, generation, and querying for the same objective. Present `generationId` as the task number; do not expose `taskTraceId` unless troubleshooting requires it.

## Billing and single submission

- Image, video, and motion generation are credit-consuming write actions. Call `who_am_i` before submission and use its live model and argument definitions. If the remote `mcpVersion` is newer than the current tool snapshot, refresh the native MCP tools before proceeding; report the limitation if the host cannot refresh them.
- Before generation, show the final workflow, model, prompt summary, resolution or duration, aspect ratio, output count, and reference roles. Obtain explicit confirmation immediately before submission. A read-only query, account check, or upload is not generation approval.
- Submit at most once per confirmed intent. Never retry automatically or silently change models after a failure, timeout, ambiguous response, or rendering problem.
- An accepted task is not a completed work. Claim completion only after a terminal-success result has at least one usable primary media URL; if work-level status exists it must be successful, and a video cover alone is not a completed video.
- After receiving a `generationId`, use only `query_tasks` for status. If the submission response is lost before a `generationId` is known, stop and report that creation state is unknown; the current MCP cannot list account history or recover a task by `taskTraceId`.

Read [tool workflows](references/tool-workflows.md), the [MCP contract](references/mcp-contract.md), and [asset workflows](references/asset-workflows.md) before generation, Element management, motion-library use, or local media preparation. Read [troubleshooting](references/troubleshooting.md) only after an authorization, schema, upload, or provider failure.

## Workflow

1. Classify the request as generation, motion control, Element management, account mutation, or read-only query.
2. Read the current remote tool definitions. Before generation or motion control, call `who_am_i` and use only the canonical model name, arguments, defaults, enums, and media inputs declared for the selected model.
3. For Element, motion-library, or upload requests, follow [asset workflows](references/asset-workflows.md); these operations do not implicitly create a generation task.
4. Fill only creative details that materially affect the result. Do not invent models, fields, or values from memory.
5. When local media is required, upload it first and reuse the returned provider reference exactly as the live schema requires. Upload completion does not replace the billing confirmation.
6. After explicit confirmation, call the selected generation tool exactly once and preserve both `generationId` and `taskTraceId`.
7. If Grok Build mounts the generation MCP App, that App is the sole refresh owner and calls headless `query_tasks` internally; do not poll the same task from the model. If no App mounts, poll with headless `query_tasks` at the provider-permitted interval until terminal, cancelled, or the turn cannot continue.
8. For a direct request about an existing task, call `query_tasks` once and report the current state. Do not start a new generation or long-running polling loop.
9. When Grok Build renders an MCP App resource returned by Kling, treat the App as the only media preview. Do not add Markdown image/video syntax, a separate media attachment, a thumbnail, or a duplicate download link outside the App. Only when no App is rendered may you return the same call's text fallback and one primary result link.
10. Call `element_delete`, `logout`, or account switching only when the user explicitly requests the state change. Account switching stays on the same active regional endpoint. When logout requires sign-in again, immediately use the native Grok Build OAuth flow and call no other Kling tool until authorization completes.

## Quality defaults

Apply these defaults only when the user did not specify another choice and the live schema supports them:

- Model: prefer a full-quality model compatible with the requested mode and references. Prefer Turbo, fast, or low-cost models only when the user explicitly prioritizes drafts, speed, or credit savings.
- Image resolution: prefer `2k` for normal delivery, `4k` for commercial work, advertising, fine materials, or crop-heavy post-production, and `1k` only for drafts or speed. Never lower a higher live default.
- Video resolution: prefer `1080p` for normal delivery and `4k` for supported commercial, large-screen, or post-production work. Use `720p` for drafts, speed, cost, or model limitations.
- Output count: generate one result unless the user requests more.
- Duration: use about 5 seconds for one action or shot, about 10 seconds for dialogue, a complete product action, or two connected beats, and longer only when supported and narratively necessary.
- Aspect ratio: use `9:16` for vertical shorts, `1:1` for square feeds, and `16:9` for landscape ads or web. For image-to-video, preserve the first frame unless the live tool requires an explicit ratio.

## Failure behavior

- Unauthorized: open `/mcps`, select `kling-ai`, and press `i`; continue only after native authorization succeeds.
- Unsupported argument: refresh the live tool definitions and change only the rejected field. Show the revised settings and obtain confirmation again before any new generation.
- Insufficient credits or provider failure: report the provider message and task number, then stop. Do not retry automatically.
- Expired result URL: query the original task number for a fresh URL; do not create a new task.
- Opaque error, unexpected empty result, or billing anomaly: submit one feedback report as directed by the tool description. Feedback is not a retry, refund, or fix.
