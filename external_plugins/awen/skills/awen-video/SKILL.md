---
name: awen-video
description: Make videos and motion with awen, from a brief or from images. Use when the user asks for a video, an animation, a clip or motion for an image, even if they do not name awen.
---

# Make a video with awen

Follow the `awen-create` skill to pick the project, bring files and start the turn. This skill adds what a video brief needs.

## Write the brief

Give awen's agent, in the user's words:

- what happens on screen, from start to end
- the length and the format (for example 9:16 for a story, 16:9 for a website)
- the images the video starts from or must follow, as `file_ids`
- the sound, when the user asked for it

awen's agent chooses the model and the settings. Do not name a model unless the user did.

## Wait for the result

A video takes longer than an image, and the turn stays `working` until its video is saved. Keep following the card, or call `get_turn` until the status is no longer `working`, then show the result or the failure. Do not start the same video again because it is still `working`.

A video costs more credits than an image. Do not make extra versions unless the user asks for them.
