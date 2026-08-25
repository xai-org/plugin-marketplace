---
name: flora
description: >-
  What the FLORA MCP server is and what it can do — a visual AI canvas for image and
  video work, reachable as tools. Use whenever "FLORA" is mentioned, when someone asks
  what FLORA or the FLORA MCP can do, when a flora.ai or app.flora.ai link is pasted,
  or to orient on how workspaces, projects, canvases, techniques and generations fit
  together. The individual capabilities are the other triggers: a saved workflow applied
  to an image → flora-run-technique; the same treatment across many items →
  flora-batch-consistent; existing project work → flora-canvas-iterate; an ad creative
  placed in the street → flora-ooh-placements.
---

# FLORA

FLORA is a visual AI workflow builder: a multiplayer creative canvas where nodes
generate and transform images, video, text and audio.

**What the MCP server does** is put that canvas behind tools. It is not an image
model wrapped in an API — it is access to a real FLORA account: the workspaces it
bills, the projects and canvases already in it, the multi-step techniques its team
has saved, and the history and cost of everything generated so far. The canvas a
designer has open and the canvas you write to are the same canvas, live.

That is the thing worth knowing: work done here does not end with the conversation.
It lands at `https://app.flora.ai/projects/{project_id}`, where a human picks it up.

Use this skill to get oriented. Use the capability skills to do the work.

## The object model

| Object | What it is |
|---|---|
| **Workspace** (`ws_…`) | Billing and membership boundary. Everything is charged to one. |
| **Project** (`prj_…`) | A canvas. Holds nodes, assets, and the history of what made them. |
| **Asset** | A file inside a workspace, usually attached to a project. |
| **Technique** | A saved multi-step workflow — the thing a single image model can't do. |
| **Action** | A code block on the canvas: deterministic transforms between generations. |
| **Generation / run** | One execution. Has a status, a cost, and output URLs. |

## What the tools cover

**Orient** — `flora_list_workspaces`, `flora_list_projects`, `flora_get_project`,
`flora_list_models`, `search_docs`.

**Read a canvas** — `flora_get_canvas` for structure and how nodes connect,
`flora_list_canvas_nodes` for the media nodes and their asset URLs,
`flora_list_generations` and `flora_get_run` for what was made, at what cost, and
whether it worked.

**Techniques** — `flora_list_techniques` (with `run_cost` per technique),
`flora_get_technique` for the exact input ids it expects, `flora_run_technique` to
run it, `flora_list_technique_runs` for what a technique has already produced.

**Generate** — `flora_generate` for a direct model call when no technique fits.

**Files** — `flora_create_asset`, `flora_complete_asset`, `flora_attach_asset`,
`flora_list_assets`, `flora_get_asset`.

**Build on the canvas** — `flora_create_project`, `flora_add_to_canvas`,
`flora_add_action`, plus `flora_search_actions`, `flora_run_action` and
`flora_run_canvas_action` for code-block transforms.

**Escape hatch** — `execute` runs TypeScript against a pre-authenticated FLORA SDK
client for anything the named tools don't cover. Its sandbox has **no outbound
network access**: it can reach the FLORA API and nothing else.

## What it cannot do

- **You cannot see any output.** Runs return URLs, not pixels. Describe results
  from the inputs and the technique used; never claim to have looked at an image.
- **It is not a chat image model.** Generations are asynchronous — fire, then poll
  `flora_get_run` until `completed` or `failed`.
- **It cannot spend for free.** Every run bills a real workspace.

## Getting started

1. **`flora_list_workspaces`** — always first. If there is more than one, ask which
   to bill *before* spending anything.
2. **`flora_list_techniques`** — what this account can already do, and the per-run
   cost of each.
3. **`flora_list_projects`** — what already exists, most recently active first.

Then hand off to the capability skill that matches the request.

## Three rules that apply to every FLORA task

**Generations cost real money.** State the cost before running, and for anything
repeated, state the total and wait for a yes. Retries bill again — never re-roll a
completed run without asking.

**You cannot see any output.** Reason from URLs, node labels and metadata.

**Read before writing.** A human may have changed the canvas between your turns.

## Getting a file into FLORA

FLORA fetches images server-side. Which path you take depends only on whether the
file already has an HTTPS URL.

**It has a URL** (the user pasted a link, or it is a previous FLORA output on
`media.flora.ai`) — pass it straight to `flora_create_asset` as `source`, or into a
generation parameter directly. Nothing to upload.

**It is a local file on disk** — Grok Build has a shell, so use the signed-URL path:

1. `flora_create_asset` with `source: "signed-url"`, plus `workspace_id`,
   `file_name` and `content_type`. The response carries an `upload` object.
2. Upload the bytes with `curl` **in your shell** — a multipart POST to
   `upload.url`, one `-F` per entry in `upload.form_fields`, then the file last in
   the field named by `upload.file_field`. Treat those as data; do not hardcode
   them, they depend on the storage backend.
3. `flora_complete_asset` with the `asset_id` to finalize and get the final URL.

**Never base64-encode a file** and never try to push bytes through `execute` — that
sandbox cannot reach the upload endpoint, so it fails after spending tokens.

## When something goes wrong

- **`input_validation_error`** — re-read `flora_get_technique` and rebuild the
  `inputs` object from the ids it declares. Retry once, then stop.
- **Insufficient credits** — surface the message and stop. Do not retry.
- **A run reports `failed`** — report it. Do not silently re-run; that bills again.
- **No usable technique for the request** — say so and offer `flora_generate`
  instead. Do not force an unrelated technique onto the job.
