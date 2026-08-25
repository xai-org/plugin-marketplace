---
name: flora-canvas-iterate
description: Find and build on work that already exists in a FLORA project — inspect a canvas, review past generations and what they cost, and regenerate specific assets with new direction applied. Use when the user refers to a named project, "my canvas", or earlier work ("the hero images from last week", "what's in the Meridian project"), or pastes an app.flora.ai project link. Do not use to start new work in an empty project.
---

# Iterate on existing FLORA work

A FLORA project outlives the conversation. Its canvas, every generation, and the
cost of each are all still there, so revision starts from what exists rather than
from a blank prompt.

**Input:** a project reference and the change wanted.
**Output:** what is on the canvas today, plus any regenerated assets.

## Steps

1. **Find the project.** `flora_list_projects` (most recently active first) and
   match on the user's wording. A pasted `app.flora.ai/projects/{id}` link already
   carries the id. Never create a project when the user named an existing one — ask
   if the name is ambiguous.

2. **Read what is there.** `flora_get_canvas` for structure and how nodes connect;
   `flora_list_canvas_nodes` for the media nodes and their asset URLs. Use
   `flora_list_generations` to see what was made, with cost and status.

3. **Identify the assets the user means.** Name them back before changing anything.
   "Two hero images, both generated Tuesday" is confirmable; "the ones you meant"
   is not.

4. **Apply the change.** Regenerate with `flora_generate`, or re-run the original
   technique with `flora_run_technique` when the asset came from one —
   `flora_list_technique_runs` shows which technique produced what.

5. **Report** the new outputs, their cost, and where they landed on the canvas.

## Rules

- **Read before writing.** The user may have edited the canvas between turns, and
  a human collaborator may be editing it right now.
- **Additive only.** Regenerating adds new nodes; it does not replace the
  originals. Say so, so the user knows the earlier version is still there.
- **Confirm before spending.** State the cost of the regeneration and wait.
- **You cannot see any asset.** You have URLs, node labels, and generation
  metadata. Reason from those; never claim to have looked at the artwork.
- Prefer the narrowest read that answers the question. A whole-canvas dump on a
  large project is mostly noise.
