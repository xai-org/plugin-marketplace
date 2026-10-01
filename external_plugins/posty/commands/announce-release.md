---
name: announce-release
description: Draft social posts that announce the latest release or a shipped feature, from the changelog and recent commits, and schedule them with Posty after the user approves the previews.
---

# Announce a release with Posty

1. Find what shipped: read `CHANGELOG.md` (or the latest release notes), and
   if needed `git log` since the previous tag. Pick the two or three changes a
   user of the product would care about. Leave out internal refactors.
2. Ask the user which channels to use if they did not say. Call
   `list_integrations` to show the connected accounts with their `@handle`.
3. Write one post per platform, in the product's voice: a short hook, what
   changed, why it matters, a link to the release page where links are allowed
   (not on X). Respect each channel's limit from `get_integration_schema`.
   Offer an X thread when the release has more than one headline.
4. Call `get_workspace_context`, then `preview_post` for the planned time, and
   show every preview. Change what the user asks for.
5. Call `create_post` only after the user approves, with an `idempotencyKey`.
   Report the post ids, the accounts and the local publish times.
