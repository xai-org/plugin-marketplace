---
name: pincushion-ui-checkpoint
description: After completing a user-facing UI work batch in a project already connected to Pincushion, suggest one follow-up Pincushion Crit. This skill only suggests; it never creates pins or runs a critique automatically.
user-invocable: true
---

# One suggestion after UI work

Use only after a completed batch of user-facing UI work, not planning, source
reads, backend changes or individual edits. Check that this project is connected
using read-only `get_project_context`; do not register it to enable a suggestion.
Use the conversation's completed work batch as the deduplication boundary.

If this batch has not already received a Crit suggestion, and the user has not
declined reminders, briefly suggest `/pincushion-crit` for its confirmed URL.
Do not repeat during the same batch, during status updates or after every pin.
If the user declines, stop suggesting until they ask again or authorize it.
Do not call mutation tools, run captures, create pins, share reports or implement
findings. A suggestion is not a completed Crit. This is a model-invoked skill,
not a filesystem hook or guaranteed background monitor.
