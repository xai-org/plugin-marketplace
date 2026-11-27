---
name: awen-create
description: Make or edit images, posters, logos, 3D models or documents with awen. Use when the user asks for visual or design work, even if they do not name awen, unless they ask for code. Work on a file that is in awen stays in awen, such as removing a background, resizing or upscaling it.
---

# Create with awen

awen's agent does the creative work. Your job is to give it a clear brief, start the turn, and report what it made.

## Before the turn

1. Pick the project. When the user names none, call `list_projects` and choose the one that fits, then say which one you chose. Ask only when nothing fits or a named project matches more than one.
2. Ask first when the request does not say what to make. A brand or file you find on this machine is not a request.
3. Bring the user's files. For a file on this machine, call `create_upload`, run the command it returns, then call `import_file` with its `upload_id`. For a public link, call `import_file` with the link. Pass the ids that `import_file` returns as `file_ids`.

## Write the brief

Pass the user's own words in `prompt`, plus what they told you about the goal, the audience, the format and the style. Do not invent a style they did not ask for. Use `image_count` and `image_resolution` only when the user gave a number or a size.

awen removes or changes backgrounds, resizes, reframes and upscales its own files. Ask for that in `prompt`, or in a follow-up turn with the same `conversation_id`, instead of editing awen's files on this machine.

## Start and wait

1. Call `create_with_awen`. It spends the organisation's credits: a direct request from the user is approval, but describe your own ideas and ask before you start them.
2. When your host shows awen's card, the card follows the turn. Otherwise call `get_turn` with the `turn_id` until the status is no longer `working`.
3. When the turn ends with a question, show it to the user and wait for their answer. Pass it with the same `conversation_id`.
4. Never start paid work again on your own after a failure or a refusal: ask the user first.

## Get the results

When the user wants the files, call `get_turn` with `include_downloads` for a link to each file of the turn. For many files or a folder, call `download` with their `entry_id`s as `items`: it gives one link. A link lasts 5 minutes, so call again for a fresh one. Give links only to the user.

## Batches

- When each item is its own job, one conversation per item is fine. A person can have at most 100 active conversations in a project: at the limit, ask the user, then archive finished ones with `archive_conversation`.
- Follow up to 10 turns in one call with `get_turns`, and pass its `cursor` back.
- Pass a new `client_request_id` with each `create_with_awen` call. Pass the same one only to retry that call after a timeout or an error: awen then answers the turn it already started and charges nothing again.
- A file you made on this machine from awen files goes back with `import_file`: name those files in `derived_from`, so awen keeps its history.
- `enhance` makes an upscaled or otherwise enhanced copy of one image or video with a preset, at the price of awen's Enhance menu and without a turn. Each call is charged, so never repeat it for the same file on your own.
- Move rejects to the project's Trash with `trash_entries` only after asking the user. `restore_entries` brings them back for 30 days.

## Find earlier work

To see recent work, or what is still running, call `list_conversations` with no project. When the user speaks of their projects, conversations, files, credits or usage and nothing in this conversation matches, look in awen.
