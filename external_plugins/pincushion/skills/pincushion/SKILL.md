---
name: pincushion
description: Connect the current app repository to Pincushion and run its first confirmed, brand-aware Crit. Use for Pincushion setup or /pincushion.
user-invocable: true
disable-model-invocation: true
---

# Connect Pincushion

1. Confirm the current working directory is the user's app repository, not this
   plugin's installation directory. Discover the `pincushion` MCP tools with
   Grok's tool search. Read `get_project_context` and, when identity is unclear,
   `get_project_identity_diagnostic`. These are read-only; never register a
   project just to look it up. If the MCP is bound to another directory, stop
   and restart Grok from the intended repository before writing any pins.
2. If connection is required, use the existing browser sign-in:
   `npx --yes pincushion-mcp@1.11.26 login`. Let the user complete sign-in; never
   ask for a license key, read credential files, or copy credentials into chat,
   source, plugin configuration or logs. Refresh `/mcps` afterward. An absent
   credential is a connection blocker, not an empty project.
3. Obtain the intended project name, exact page URL, existing project ID when
   present, and desired comment access. If several projects or URLs could match,
   ask the user to choose; never select the first result. Preserve an existing
   project's identity and access mode. For a new project explain open,
   domain-restricted and invite-only access using the server's current plan
   capabilities; do not silently make a private app open.
4. Read the app's own brand documents, README, representative routes and theme
   tokens. Draft a concise brand brief covering audience, purpose, tone, visual
   identity and exclusions. Ask only for missing context. Do not inspect .env,
   credentials, unrelated repositories or private customer records. If the
   brief cannot be grounded, stop before critique rather than inventing it.
5. Explain the first Crit before asking for confirmation: project URLs and the
   approved brand brief are stored by Pincushion; Crit aims for at least three
   distinct useful AI findings when the rendered evidence supports them, with
   at most three per page. Findings with
   selectors and relevant element context are synced as pins accessible under
   the project's access settings. Grok processes the sources and screenshots
   it reads through the user's model session. Local screenshots stay local
   unless the user also asks for a share report. A share report uploads selected
   screenshots/positions and creates a native link. Public reports are
   accessible to anyone with the link; private reports require authenticated
   project membership. Private/authenticated screens require deliberate
   sharing approval and a member-only report.
6. Once the user confirms the project, access and first Crit, call
   `configure_project` with that exact identity, URLs, approved `critiqueContext`
   (maximum 8192 characters), relevant `critiquePolicy`, and `autoCritique: false`.
   Do not set deploymentAutomation or add members, hooks, source injection or
   subscriptions. Inspect the response for errors, then read back
   `get_project_context({ projectId })` and verify identity, URLs and context.
   Do not proceed through connection_required, an access error or a mismatch.
7. Run `/pincushion-crit` immediately for the confirmed URL and project. Do not
   silently stop after registration. If a prerequisite blocks the Crit, state
   the precise blocker and resume after it is resolved. A setup completion is
   not a Crit completion. Follow the Crit skill's zero-finding behavior.
8. Offer `/pincushion-pins` to review results and `/pincushion-implement` only
   when the user wants approved findings fixed. Never approve or implement
   findings automatically. After later completed UI work, suggest another Crit
   once per batch using the checkpoint skill.
