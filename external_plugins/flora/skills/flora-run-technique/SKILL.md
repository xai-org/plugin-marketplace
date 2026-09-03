---
name: flora-run-technique
description: Run a saved FLORA technique — a multi-step visual workflow such as background swap, relighting, upscale, model swap, or sketch-to-render. Use when the user names a technique, asks to transform an image they already have ("put this on a clean background", "match this lighting", "upscale this", "make this look photographed"), or asks what FLORA can do. Do not use for a plain text-to-image request with no source image, and do not use to inspect existing project work.
---

# Run a FLORA technique

A technique is a saved workflow that chains several models. It is the thing FLORA
does that a single image model cannot: the steps, prompts, and model choices are
fixed by whoever authored it, so the same technique gives the same treatment every
time.

**Input:** the user's intent, plus any source image.
**Output:** the technique's output URLs, the charged cost, and the project the run
landed in.

## Steps

1. **Resolve the workspace.** Call `flora_list_workspaces`. If there is more than
   one, ask which to bill before spending anything.

2. **Find the technique.** Call `flora_list_techniques` and match on the user's
   intent. It returns `run_cost` and a summary of inputs for each. If nothing fits,
   say so and offer `flora_generate` instead — do not force an unrelated technique.

3. **Get the exact input ids.** Call `flora_get_technique`. Its declared input ids
   are the keys `flora_run_technique` expects. Never guess them from the name.

4. **Get each image input to an HTTPS URL** (see Image inputs below).

5. **Run it.** Call `flora_run_technique` with `workspace_id`, `technique_id`, and
   an `inputs` object keyed by those ids. Omit optional text inputs entirely when
   the user gave no direction — an empty string is rejected, not treated as absent.

6. **Poll and report.** Poll `flora_get_run` until status is `completed` or
   `failed`. Report the output URL, the charged cost, and a link to the project.

## Image inputs

FLORA fetches images server-side from an HTTPS URL.

**Already a URL** — a pasted link, or a previous FLORA output on `media.flora.ai` —
pass it straight to `flora_create_asset` as `source`, or into the technique input
directly.

**A local file on disk** — use the signed-URL path: `flora_create_asset` with
`source: "signed-url"`, upload the bytes with `curl` in your shell as the returned
`upload` object describes, then `flora_complete_asset`. The `flora` skill has the
full sequence.

Never base64-encode a file, and never push bytes through the `execute` tool — its
sandbox has no outbound network access and cannot reach the upload endpoint.

## Rules

- **State the cost before running.** `run_cost` comes back from
  `flora_list_techniques`. Techniques range from free to several dollars per run.
- **You cannot see the output.** Runs return URLs, not pixels. Describe what was
  produced from the technique and the inputs; never claim to have looked at it.
- **On `input_validation_error`,** re-read `flora_get_technique`, rebuild `inputs`
  from what it returns, and retry once. Do not retry other failures — retries bill.
- **On insufficient credits,** surface the message and stop.
