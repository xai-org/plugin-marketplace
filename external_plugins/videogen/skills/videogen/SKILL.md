---
name: videogen
description: Create, edit, caption, and export videos or generate media through the VideoGen MCP connector when the user asks to use VideoGen.
---

# VideoGen

Use the hosted VideoGen tools to produce media and downloadable videos.

## Connect and discover

Call `get_me` to check the connection. If authentication is required, ask the
user to connect their VideoGen account through the host's OAuth flow. Do not
ask them to paste credentials into chat.

Call `get_getting_started_guidance` for onboarding, `get_workflows_guidance`
before a full video workflow, and `get_async_tasks_guidance` before polling.
Use the current tool schemas and guidance for accepted inputs and actions.
Full video generation commonly takes several minutes and uses account credits;
respect the user's requested scope and budget.

## Choose a workflow

| Intent | Tool |
| --- | --- |
| Product ad or shot-by-shot video | `storyboard_to_video` |
| Narrated video from a script | `script_to_video` |
| Video around recorded narration | `voiceover_to_video` |
| Video from a PDF or presentation | `slideshow_to_video` |
| One generated clip | `prompt_to_video_clip` |
| Individual image, voice, music, or sound effect | Matching `generate_*` tool |

For a product ad, a useful default is vertical 9:16 with a hook, product in
use, and call to action. Preserve the user's chosen format and scene count.
Storyboard visuals belong in each scene's `prompt`; spoken copy belongs in
`voiceoverScript`. Prefer a full workflow to manually chaining individual
media tools when the user wants a complete video.

## Transfer files

`open_uploader` is a ChatGPT-only interface and is unavailable in Grok Build.
Use `upload_file` for small files when the host can supply base64 bytes. For
larger files, use `create_file_upload`, transfer the bytes to the returned URL
when supported, then call `get_file` with `wait: true`. If the host cannot
transfer an attachment, direct the user to upload it in the VideoGen app.
Never claim upload success without a returned VideoGen `fileId`.

## Wait, edit, and export

Poll `get_workflow_run` for workflows, `get_tool_execution` for media,
`list_project_remix_actions` for remixes, and `get_project_export` for exports.
Follow the async guidance until a terminal status; never invent completed
results, ids, or URLs.

Preserve the returned `projectId`. For requested edits, use `remix_project`
with actions supported by its current schema, then wait for completion before
calling `export_project`. Use `saveAsNewProject: true` if the user wants to
preserve the original. Return the successful export's `downloadUrl`.
If an edit is unavailable, use `get_app_deep_link` to open the project in VideoGen.

Report terminal failures clearly and retry only as directed by structured
errors or guidance. For credit or account-access errors, direct the user to
`https://app.videogen.io`. Do not expose internal model or infrastructure names.
