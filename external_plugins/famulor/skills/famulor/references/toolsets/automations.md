# Automations toolset

Automations, connections, CRM sync, routines, and runs. Connect only this group with `https://app.famulor.io/mcp?toolsets=automations`.

This 2026-10-08 snapshot covers all 43 tools assigned to `automations` in the canonical 439-tool registry. The live MCP `tools/list` response is authoritative for arguments, current availability, annotations, and plan or role gating. Never invent fields from this catalog.

Toolsets limit discovery context; they do not grant access. OAuth/API scopes and workspace roles are enforced separately. The Effect column reflects MCP risk annotations: `Delete/destructive` also covers overwrites or changes that can remove data or safeguards.

**Caution:** Routines can keep running unattended after a tool call returns, perform workspace actions, and incur charges. Review the prompt, schedule, permissions, and expected side effects; confirm before creating, enabling, or running one.

| Tool | Effect | Accepted scope | Execution | Purpose snapshot |
| --- | --- | --- | --- | --- |
| `create_assistant_automation` | Write/action | `assistants:write or automations:write` | Immediate | Create a draft automation and securely connect it across voice, web chat, messaging, and email conversations. The webhook credential and tool assignment are handled automatically. |
| `create_automation` | Write/action | `automations:write or calls:write` | Immediate | Create a native automation. For call.completed / call.variables, trigger.assistant_id is required before status=active. For call.variables, end the graph with variables.return. |
| `create_automation_connection` | Write/action | `automations:write or calls:write` | Immediate | Store a reusable workspace credential for an external CRM (HubSpot, HighLevel, Salesforce, Pipedrive, Close, Zoho, Attio, Keap, or Twenty), SMTP relay, or an MCP endpoint. `credentials` values are AES-256-GCM encrypted at rest. |
| `create_crm_sync` | Write/action | `automations:write or calls:write` | Immediate | Create a recurring CRM sync. Direction can import CRM records into Audience, push Audience contacts to the CRM, or both on the same schedule. Combined {{field}} expressions are import-only; outbound needs a 1:1 phone or email mapping. |
| `create_routine` | Write/action | `routines:write` | Immediate | Create a Milian Mission: a prompt that runs unattended in the background on a schedule (or only on demand, for schedule_type 'manual'), billed like a normal copilot turn. |
| `delete_automation` | Delete/destructive | `automations:write or calls:write` | Immediate | Delete an automation and unbind any assistant webhook links. |
| `delete_automation_connection` | Delete/destructive | `automations:write or calls:write` | Immediate | Delete an automation connection. |
| `delete_crm_sync` | Delete/destructive | `automations:write or calls:write` | Immediate | Delete a CRM sync configuration and its memberships. Imported Audience contacts are kept. |
| `delete_routine` | Delete/destructive | `routines:write` | Immediate | Permanently delete a Milian Mission. It stops running immediately; past run transcripts already on record are unaffected. This cannot be undone. |
| `disconnect_assistant_automation` | Write/action | `assistants:write or automations:write` | Immediate | Pause and disconnect an assistant-callable automation and archive its generated tool. |
| `discover_crm_sync` | Read-only | `automations:read or calls:read` | Immediate | Discover importable objects, fields, optional list/view/filter sources, and an optional read-only mapped preview without exposing credentials. |
| `get_automation` | Read-only | `automations:read or calls:read` | Immediate | Get one automation and recent runs. |
| `get_automation_connection` | Read-only | `automations:read or calls:read` | Immediate | Get one automation connection (secrets masked as '•••'). |
| `get_automation_platform` | Read-only | `automations:read or calls:read` | Immediate | Get the workspace's native automation platform entitlement, monthly run allowance, and usage. |
| `get_automation_run` | Read-only | `automations:read or calls:read` | Immediate | Get one automation run with its step log: each executed step's action, status, input (step config as saved), output, error and timing, plus the trigger payload. Use it to debug a failed run. |
| `get_automation_trigger_test_data` | Read-only | `automations:read or calls:read` | Immediate | Read configured Conversation started samples or poll for a new conversation. Does not execute an automation. Listen without since first, then poll with the returned since timestamp. Choose source_id from sources when more than one channel matches. |
| `get_crm_sync` | Read-only | `automations:read or calls:read` | Immediate | Get one CRM sync and its recent durable run history. |
| `get_routine` | Read-only | `routines:read` | Immediate | Get one Milian Mission. |
| `get_routine_webhook` | Read-only | `routines:read` | Immediate | Get the public inbound webhook URL, required header name, and whether a secret is configured. The secret and internal Automation identity are never returned. |
| `list_acuity_connections` | Read-only | `integrations:read or assistants:read` | Immediate | List Acuity Scheduling accounts connected to this workspace through OAuth. Tokens and secrets are never returned. |
| `list_assistant_automations` | Read-only | `assistants:read` | Immediate | List automations an assistant can run in voice, web chat, messaging, or email conversations. |
| `list_automation_ai_actions` | Read-only | `automations:read` | Immediate | Discover Milian AI classification, conditions, scores, labels and custom analysis, including configuration defaults, output fields and three editable presets. |
| `list_automation_connections` | Read-only | `automations:read or calls:read` | Immediate | List workspace-scoped CRM / SMTP / MCP credentials that automation nodes can reference. Secrets are never returned; masked as '•••'. |
| `list_automation_runs` | Read-only | `automations:read or calls:read` | Immediate | List one automation's runs, newest first, with status, trigger event, error, timing and credits. Filter by status; page with limit/offset (total included). Use get_automation_run for the step-by-step log of one run. |
| `list_automations` | Read-only | `automations:read or calls:read` | Immediate | List native workspace automations (graph workflows). |
| `list_calendly_connections` | Read-only | `integrations:read or assistants:read` | Immediate | List Calendly accounts connected to this workspace through OAuth. Tokens and secrets are never returned. |
| `list_crm_syncs` | Read-only | `automations:read or calls:read` | Immediate | List CRM sync configurations and their current status. Provider credentials are never returned. |
| `list_routine_runs` | Read-only | `routines:read` | Immediate | List recent runs of one mission, most recent first — status, trigger, credits charged, and timing. |
| `list_routine_versions` | Read-only | `routines:read` | Immediate | List drafts and immutable published versions of one Milian Mission, newest first. |
| `list_routines` | Read-only | `routines:read` | Immediate | List this workspace's Milian Missions: schedule, enabled state, next run, and the last run's status. |
| `pause_routine` | Write/action | `routines:write` | Immediate | Pause a Milian Mission and its managed trigger. Its immutable published version remains available for later reactivation. |
| `publish_routine` | Write/action | `routines:write` | Immediate | Publish one reviewed Mission draft. The resulting version is immutable and becomes the active, pre-authorized version. |
| `retry_routine_run` | Write/action | `routines:write` | Immediate | Explicitly retry one finished Mission run. Creates a new run linked to the original and reuses its immutable published version; no automatic retry is scheduled. |
| `run_automation_ai_action` | Write/action | `automations:write` | Immediate | Preview a Milian AI analysis action. dry_run defaults to true and does not spend credits. Explicitly set false to evaluate and charge workspace credits; each live invocation is a separate paid request. Use list_automation_ai_actions first. Uncertain answers are null; technical failures return success=false. |
| `run_crm_sync` | Write/action | `automations:write or calls:write` | Immediate | Queue a durable manual run for a CRM sync. |
| `run_routine` | Write/action | `routines:write` | Immediate | Trigger one mission right now as a background run, independent of its schedule. Starts an unattended AI copilot turn billed like a normal copilot turn, and returns immediately with the new run's id and status while it keeps executing in the background. |
| `save_routine_draft` | Write/action | `routines:write` | Immediate | Create or replace the editable Mission draft while the published version keeps running unchanged. |
| `set_routine_webhook_secret` | Write/action | `routines:write` | Immediate | Set or rotate a Mission inbound webhook secret. Generate a 32-byte random base64url value client-side and save it before calling this tool because the secret is accepted only as input and never returned. |
| `trigger_automation` | Write/action | `automations:write or calls:write` | Immediate | Manually start an automation run with an optional JSON payload. |
| `update_automation` | Write/action | `automations:write or calls:write` | Immediate | Update name, status, trigger, graph, or tags of an automation. |
| `update_automation_connection` | Write/action | `automations:write or calls:write` | Immediate | Patch an automation connection. Sending '•••' for a secret keeps the stored value; omit to leave a field unchanged. |
| `update_crm_sync` | Write/action | `automations:write or calls:write` | Immediate | Update composed mapping, source, default phone country, interval, direction, outbound create, policies, or active/paused status. |
| `update_routine` | Write/action | `routines:write` | Immediate | Update a mission's name, prompt, schedule, timezone, or enabled state — only pass the fields that change. |
