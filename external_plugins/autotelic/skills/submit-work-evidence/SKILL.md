---
name: submit-work-evidence
description: Inspect assigned Autotelic work checklists, submit user-provided photo evidence for Cockpit QC review, and check submission review or non-financial pay status labels.
---

# Submit work evidence and check status

Use for Autotelic crew and team work tasks: listing assigned project checklists, submitting photo evidence for a checklist item, checking QC review status, and reading non-financial pay status labels at `https://itsbarbot.ai/mcp/autotelic`.

## Discover work tools and respect role boundaries

Always inspect the current session's MCP `tools/list` response and rely on its live input schemas. Do not hardcode detailed parameter schemas; pass the fields defined by the live schema and the identifiers returned by earlier tool calls. Invoke only tools actually exposed in `tools/list`.

The server determines identity, OAuth scopes, and project/task membership from the authenticated account. Tool arguments never grant or escalate a role:

- **Crew accounts** have access only to their own assigned tasks and checklist items on active projects. Crew cannot use the private team registry tools (`find_tool`, `list_tools`, `tool_health`, `report_gap`) and must call the discovered work tools (`list_work`, `submit_photo`, `review_status`, `pay_status`) directly.
- **Crew MUST OMIT `worker_id`** on all four work tools (`list_work`, `submit_photo`, `review_status`, `pay_status`).
- **Team MUST explicitly select and provide `worker_id`** on all four work tools (`list_work`, `submit_photo`, `review_status`, `pay_status`).
- **Scopes**: `mcp:use` and `autotelic:crew:read` are required for `list_work`, `review_status`, and `pay_status`. `submit_photo` additionally requires `autotelic:crew:submit`. Tool availability depends on granted scopes.
- **No approvals, payments, or financial data**: This plugin exposes metadata only. It has no tools to approve work, execute payments, view rates or dollar amounts, or read other workers' private data.

## Work and evidence workflow

### 1. Inspect assigned tasks (`list_work`)

- Call `list_work` using the live `tools/list` schema. It supports optional `project_id` filtering and pagination (`limit` maximum 50; the live schema is authoritative).
- Include `worker_id` when signed in as team; omit `worker_id` when signed in as crew.
- `list_work` returns authorized tasks/checklists along with an `item_revision` (64-character lowercase hex) for each checklist item. Select the target `project_id`, `checklist_id`, `item_index`, and exact `item_revision` from this response before submitting evidence.

### 2. Submit photo evidence (`submit_photo`)

- `submit_photo` accepts `project_id`, `checklist_id`, `item_index`, `item_revision` (the exact 64-character lowercase hex returned by `list_work`), `idempotency_key` (UUID), `photo_base64` (actual user-provided JPEG or PNG bytes, maximum 2 MiB decoded), optional `notes` (`<= 2000` characters), and `worker_id` (team only; crew must omit).
- **Evidence integrity**: Never manufacture, generate, synthesize, or alter photos, receipts, or evidence. Do not fetch arbitrary URLs to obtain images. If the host client cannot supply the actual user-provided attachment bytes, state that constraint clearly instead of inventing a photo or receipt.
- **Cockpit QC review**: The backend verifies project/task membership and `item_revision`, sanitizes and re-encodes the private image, and creates pending evidence in the existing Cockpit QC review workflow. Submitting photo evidence does **not** approve work or release payment.
- **Idempotency and retry rules**:
  - Reuse the same `idempotency_key` UUID **only** when retrying an identical payload after an uncertain delivery or transient transport failure.
  - If any part of the payload changes—such as correcting the task/checklist item, updating `item_revision`, replacing the photo, or modifying `notes`—correct the task/photo and generate a new UUID for a new submission.
  - Never duplicate a submission that has already been confirmed.

### 3. Check review and pay status (`review_status`, `pay_status`)

- **`review_status`**: Pass `submission_id` (and `worker_id` for team; omit `worker_id` for crew) to read the referenced submission's QC review status. The server enforces subject and membership checks.
- **`pay_status`**: Pass optional `project_id` (and mandatory `worker_id` for team; omit `worker_id` for crew) to read only the selected worker's non-financial status labels. `pay_status` never returns pay rates, dollar amounts, or tax records, and never executes a payment. Treat it strictly as a non-financial product status check; do not research or access financial or tax material.

## Handle authentication, authorization, and availability errors

- **401 / authentication expired**: Direct the user to sign in or reconnect through their host MCP client. Never ask users to paste credentials, tokens, or secrets into chat.
- **403 / role, scope, or membership denied**: Explain that the authenticated account lacks the required role, scope (`autotelic:crew:read` or `autotelic:crew:submit`), or project/worker membership. Do not attempt to bypass the denial by adding or changing `worker_id` or inventing role fields, and do not claim the tool is missing from the platform.
- **Service unavailable / transport failure**: Report the MCP service as unavailable and retry only within a bounded limit. Do not claim that re-signing in will fix a service outage.

Sign in through the host client using existing Autotelic credentials or a current field link. Explicitly select photo submission permission on the consent screen when needed.
