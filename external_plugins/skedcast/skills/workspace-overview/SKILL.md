---
name: workspace-overview
description: Understand the SkedCast workspace. Use at the start of a session or when the user asks about their plan, role, permissions, or workspace settings.
---

# Workspace Overview

Call `get_agency` to read the current workspace profile: name, plan, app mode,
settings, and — importantly — the caller's role. This is a read-only call.

## Why it matters

- **Role and permissions.** The assistant acts as the user, never more: their role
  and per-client permissions still apply. If a tool call is rejected, explain it in
  terms of the role (e.g. deleting a client is OWNER ONLY).
- **Plan awareness.** The plan determines connected-account limits, bulk ceilings,
  and which features are available. When a user asks for something beyond their
  plan, explain what their plan includes and which plan unlocks it — link to the
  informational plans page, never to a checkout.
- **Settings context.** Workspace settings (e.g. default timezone) anchor scheduling
  and reporting throughout the session. Read once, reuse everywhere.

## When to call it

At the start of a substantive session, or whenever the user's request touches
permissions, limits, or plan-gated features. Don't call it for every trivial
question — once per session is enough unless something changes.
