---
name: schedule-post
description: Write and schedule a social media post with Posty for a time the user names, with a preview per account before anything is saved.
---

# Schedule a post with Posty

1. Ask for the message, the channels and the time if any of them is missing.
2. Call `get_workspace_context` and convert the user's local time to UTC.
3. Call `list_integrations` and `get_integration_schema` for each channel.
4. Write the post for each platform and call `preview_post`. Show the account,
   the `@handle`, the local time, the character count and any problem.
5. Call `create_post` after the user confirms, with a new `idempotencyKey`.
