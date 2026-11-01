# Autotelic Plugin for Grok Build

This package connects a host MCP client to Autotelic's remote HTTP MCP endpoint (`https://itsbarbot.ai/mcp/autotelic`) for the v1 public contract: four team tool-registry capabilities and four crew/team work checklist, photo-evidence, and status capabilities.

## Contents

| Path | Purpose |
| --- | --- |
| `.grok-plugin/plugin.json` | Plugin manifest and MIT license metadata |
| `.mcp.json` | Remote HTTP MCP server configuration |
| `LICENSE` | MIT License for the public plugin package files |
| `README.md` | Package contract, boundaries, and concrete limitations |
| `commands/find-tool.md` | Slash command for tool discovery and work-tool routing |
| `skills/check-registry-first/SKILL.md` | Team registry discovery, health interpretation, gap reporting, and role routing |
| `skills/submit-work-evidence/SKILL.md` | Crew/team work listing, photo evidence submission, and review/pay status checks |

No runtime code, external dependencies, or lifecycle shell hooks are bundled.

## Tools, Roles, and Scopes

All callable tools and input schemas are discovered live from MCP `tools/list`. The server determines caller identity, granted OAuth scopes, and project/task membership from the authenticated account; tool arguments never grant or escalate a role.

### Team registry tools

- `find_tool`: search capabilities visible to the authenticated team account.
- `list_tools`: browse the authorized team catalog.
- `tool_health`: return historical `inventory_status` (`live`, `unknown`, `broken`, or `retired`) alongside fresh scheduled public-endpoint health checks when available. Missing or stale checks return `current_status: unknown` and `checked_at: null`; a passing health check never proves authenticated operations work. Registry text and `how_to_call` are treated strictly as data, never executed.
- `report_gap`: record a bounded internal capability gap report with non-sensitive details (sends no messages, opens no external tickets, spends no money, and mutates no business records).

**Scopes & access**: Require `mcp:use` and `autotelic:registry:read`; `report_gap` additionally requires `autotelic:registry:report`. **Crew accounts cannot access the private registry tools** and must use the discovered work tools directly.

### Crew and team work tools

- `list_work`: list authorized tasks and checklist items (with a 64-character lowercase hex `item_revision` per item). Supports optional `project_id` and pagination (`limit` max 50; the live `tools/list` schema is authoritative).
- `submit_photo`: submit pending photo evidence for a checklist item using `project_id`, `checklist_id`, `item_index`, exact `item_revision` (64-char lowercase hex from `list_work`), `idempotency_key` (UUID), `photo_base64` (actual user-provided JPEG/PNG, max 2 MiB decoded), optional `notes` (`<= 2000` chars), and `worker_id` (team only).
- `review_status`: read QC review status for a `submission_id` (plus `worker_id` for team) with subject and membership checks.
- `pay_status`: read non-financial status labels for the worker (optional `project_id`, plus `worker_id` for team). Never returns pay rates, dollar amounts, or tax data, and never executes a payment.

**Scopes & `worker_id` boundary**: Reading work or status requires `mcp:use` and `autotelic:crew:read`; `submit_photo` additionally requires `autotelic:crew:submit`.
- **Crew** sees only assigned tasks/checklist items on active projects and **MUST OMIT `worker_id`** on all four work tools.
- **Team** **MUST explicitly select and provide `worker_id`** on all four work tools.
- No approve, pay, rates, dollar amounts, or other workers' private data are exposed.

## Evidence Submission Integrity

- **User-provided media only**: Never manufacture, generate, or alter evidence, and never fetch arbitrary URLs. If the host client cannot supply the actual JPEG/PNG attachment bytes, state that constraint instead of inventing a photo or receipt.
- **Cockpit QC review**: The backend verifies project/task membership and `item_revision`, sanitizes and re-encodes the private image, and creates pending evidence in the existing Cockpit QC review workflow. `submit_photo` does not approve work or release payment.
- **Idempotency**: Reuse the same `idempotency_key` UUID only when retrying an identical payload after an uncertain delivery failure. Any changed payload (corrected task/checklist item, refreshed `item_revision`, different photo, or updated `notes`) requires a new UUID and a new submission. Never duplicate a confirmed submission.

## Network, Authentication, and Error Handling

`.mcp.json` declares a single HTTP server (`https://itsbarbot.ai/mcp/autotelic`) with `type` and `url` only—no embedded tokens, static headers, workstation paths, or custom OAuth fields. Host clients use platform OAuth discovery.

- **401 / expired auth**: sign in or reconnect through the host MCP client. Never paste credentials into chat.
- **403 / role, scope, or membership denied**: account lacks the required role, scope, or project/worker membership; do not attempt to bypass or report the tool as missing.
- **Service unavailable**: report an endpoint outage and use bounded retry rather than assuming re-authentication will fix it.

## Limitations

- Requires an active Autotelic team or crew account and permission on the selected project. Sign in with existing account credentials, a current field link, or an existing field session. Write permissions are optional on the consent screen.
- `submit_photo` requires a host client capable of supplying real user-provided JPEG/PNG bytes (`<= 2 MiB` decoded).
- The [xAI Plugin Marketplace](https://github.com/xai-org/plugin-marketplace) targets **Grok Build**; Grok Bot mobile/desktop compatibility is unverified.

## License

The newly authored public plugin files in this package are licensed under the **MIT License** (`Copyright (c) 2026 Autotelic`; see [`LICENSE`](LICENSE)). This license applies **only** to these public plugin package files; nothing in this package licenses Autotelic's private backend code, private tool inventory, credentials, or customer media.
