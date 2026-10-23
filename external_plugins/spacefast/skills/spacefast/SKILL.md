---
name: spacefast
description: >-
  Publish sites, apps and files to the web with Spacefast through the hosted
  Spacefast MCP server: create a new Space or update an existing one, get the
  live URL, check deployments and build logs, view analytics, and connect custom
  domains. Use whenever "Spacefast", a spacefast.com or *.space.fast URL, a
  `.spacefast/` folder in the project, or publishing something the user built to
  Spacefast comes up.
---

# Spacefast

Spacefast hosts what you build at a live URL. Each project is a **Space**; every
publish creates an immutable **version** and moves the Space's live URL to it.
The `spacefast` MCP server bundled with this plugin acts as the signed-in
Spacefast user.

## Tools

| Tool | Use it to | Notes |
|---|---|---|
| `publish` | Create a Space or publish a new version of one | Destructive. Hosted server takes inline `files`, not a path |
| `operation_status` | Follow a publish that returned `status: "publishing"` | Read-only. Poll about every 2 seconds until `done` |
| `show_space` | Read deployments, build logs, domains, analytics, source history | Read-only. Never changes anything |
| `execute` | Run a short JavaScript program against the Spacefast API catalog | Destructive. For lookups and changes the typed tools don't cover |
| `resume_execution` | Continue an `execute` program paused for approval | Reuse the same `executionId` |

Read each tool's input schema from `tools/list` before the first call.

## Publishing

1. **Decide the destination.** If the project has a `.spacefast/` folder or the
   user names a Space, update that Space by passing its `spaceId`. Otherwise a
   publish without `spaceId` creates a new Space. Never publish to a different
   Space or team than the one the user asked for; if you can't resolve it, ask
   before publishing.
2. **Build first.** Publish the build output (for example `dist/`, `build/`,
   `out/`), not the source tree, for frameworks that compile.
3. **Send files inline.** The hosted server has no filesystem access. Read the
   files to publish and pass them as `files: [{ path, content, encoding }]`,
   using `encoding: "base64"` for binary files such as images and fonts.
   Paths are relative to the site root (`index.html`, `assets/app.js`). Limit:
   1 to 1000 files per call.
4. **Never upload secrets.** Skip `.env` and `.env.*`, `.git`, `node_modules`,
   `.ssh`, key files (`*.pem`, `*.key`, `id_rsa`) and anything that looks like
   credential material.
5. **Set access deliberately** for a new Space: `private`, `team` or `public`.
   If the user didn't say, ask, or default to `private` and tell them.
6. **Add a short `description`** as the version's changelog
   ("Fix the pricing table").
7. **Report the result.** Give the user `liveUrl` once `status` is `published`.
   If it is `publishing`, poll `operation_status` with
   `result.job.poll.operationId` and report success only when `status` is
   `succeeded`. On `failed`, open `show_space` with the `build_logs` view and
   explain what broke.
8. **Retries.** If a publish times out, retry with the same `requestId` so it
   isn't applied twice.

## Inspecting a Space

Use `show_space` with `request.view` set to one of `deployments`, `build_logs`,
`domains`, `analytics`, `source_files`, `source_changes`, `source_history`,
`source_comparison` or `deployment_comparison`, and `request.input` as that
view's schema requires (for example `{ "space": "docs.example.com" }`).

## Everything else: `execute`

`execute` runs one JavaScript program with a `tools` object that exposes the
whole Spacefast API:

- `tools.search({ query, limit })` finds operations,
- `tools.describe.tool({ path })` returns an operation's input shape,
- `tools[path]({ path, query, body })` calls it and returns `{ ok, data }` or
  `{ ok: false, error }`. Always check `ok`.

There is no `fetch`, and programs run for at most 30 seconds. Return one compact
value. Use it to list Spaces, look up a team, add and verify a custom domain, or
change Space settings. It is not the publish path: resolve the Space with
`execute`, then call `publish`.

## Approvals

A write inside `execute` can pause with `status: "user_approval_required"` and
an `approvalUrl`. Show the user the link, wait for them to decide in the browser
(they have four minutes), then call `resume_execution` with the same
`executionId`. Do not start a new `execute` call while one is paused; that
discards the pause.

## Errors

API errors are problem documents. Match on `code`, not on the message text, and
open the error's `type` URL (under `https://spacefast.com/docs/errors/`) for the
fix. A `team_required` error on publish means the account has several teams:
ask which one and pass its `teamId`.

## Docs

- MCP server: https://spacefast.com/docs/agents/mcp-server
- All docs: https://spacefast.com/docs
