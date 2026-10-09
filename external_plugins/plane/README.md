# Plane plugin for Grok Build

Connect Grok Build to [Plane](https://plane.so), the open-source project management tool.
Create, triage and update work items, plan cycles and modules, track epics, write pages,
ship releases and manage customers through the hosted
[Plane MCP server](https://github.com/makeplane/plane-mcp-server).

Ask for work in the terms you already use, like "what's blocking the current cycle",
"file a bug in Web for the login redirect" or "move everything unfinished to the next
cycle", and Grok reads and writes it in Plane directly.

## Installation

In Grok Build, open `/plugin`, search for **Plane**, and install.

On first connection, Grok opens Plane's sign-in in your browser. Sign in, approve access
and pick the workspace you want Grok to work in. No API key is needed and nothing should
be pasted into chat.

## What you get

- **MCP server** `plane` at `https://mcp.plane.so/http/mcp` (Streamable HTTP, OAuth 2.1).
- **Skill** `plane`: how to use the Plane tools well (resolve names to UUIDs before
  writing, query work items with PQL instead of paging through lists, confirm destructive
  actions, epics and cycle rollovers step by step) plus pointers to the API docs.

### Tools

30 tools, one per Plane resource. Each takes an `action` that selects the operation, and
each tool's description lists its actions with their required and optional parameters.

| Area | Tool | Actions |
|---|---|---|
| Work items | `workitem` | `list`, `list_archived`, `retrieve`, `retrieve_by_identifier`, `search`, `count`, `create`, `update`, `delete`, `archive`, `manage_assignee`, `manage_label` |
| | `workitem_comment` | `list`, `retrieve`, `create`, `update`, `delete` |
| | `workitem_link` | `list`, `retrieve`, `create`, `update`, `delete` |
| | `workitem_attachment` | `list`, `read`, `download_url`, `upload_from_url`, `delete` |
| | `workitem_relation` | `list`, `create`, `delete`, `list_definitions`, `create_definition`, `update_definition`, `delete_definition` |
| | `workitem_activity` | `list`, `retrieve` |
| | `work_log` | `list`, `create`, `update`, `delete` |
| Work item setup | `workitem_type` | `list`, `retrieve`, `resolve`, `create`, `update`, `delete`, `import_to_project` |
| | `workitem_property` | `list`, `retrieve`, `create`, `update`, `delete`, `manage_type_properties`, `list_options`, `retrieve_option`, `create_option`, `update_option`, `delete_option`, `get_value`, `set_value`, `delete_value` |
| | `state` | `list`, `retrieve`, `create`, `update`, `delete` |
| | `label` | `list`, `retrieve`, `create`, `update`, `delete` |
| | `project_estimate` | `retrieve`, `create`, `update`, `delete`, `link`, `list_points`, `create_points`, `update_point`, `delete_point` |
| | `template` | `list`, `create`, `update`, `delete` |
| Planning | `project` | `list`, `retrieve`, `create`, `update`, `delete`, `archive`, `unarchive`, `worklog_summary`, `get_features`, `update_features` |
| | `cycle` | `list`, `retrieve`, `create`, `update`, `delete`, `list_workitems`, `manage_workitems`, `transfer_workitems`, `complete`, `archive`, `unarchive` |
| | `module` | `list`, `retrieve`, `create`, `update`, `delete`, `list_workitems`, `manage_workitems`, `archive`, `unarchive` |
| | `milestone` | `list`, `retrieve`, `create`, `update`, `delete`, `list_workitems`, `manage_workitems` |
| | `initiative` | `list`, `retrieve`, `create`, `update`, `delete`, `list_projects`, `add_projects`, `remove_projects`, `list_workitems`, `manage_workitems` |
| | `intake` | `list`, `retrieve`, `create`, `update`, `delete` |
| Releases | `release` | `list`, `retrieve`, `create`, `update`, `delete`, `get_changelog`, `update_changelog`, `list_workitems`, `manage_workitems` |
| | `release_tag` | `list`, `retrieve`, `create`, `update`, `delete` |
| | `release_label` | `list`, `create`, `update`, `delete`, `attach`, `detach` |
| Customers | `customer` | `list`, `retrieve`, `create`, `update`, `delete`, `list_workitems`, `manage_workitems` |
| | `customer_request` | `list`, `retrieve`, `create`, `update`, `delete` |
| | `customer_property` | `list`, `retrieve`, `create`, `update`, `delete`, `get_values`, `set_values` |
| Pages | `page` | `list`, `retrieve`, `create`, `update`, `archive`, `delete`, `set_collection`, `list_workitem_pages`, `attach_to_workitem`, `detach_from_workitem` |
| | `collection` | `list`, `retrieve`, `create`, `update`, `delete`, `list_pages`, `search_pages`, `add_pages`, `remove_page`, `list_members`, `add_member`, `update_member`, `remove_member` |
| Workspace | `workspace` | `retrieve`, `get_features`, `update_features` |
| | `member` | `me`, `list_workspace`, `list_project`, `list_roles`, `retrieve_role` |
| Query language | `get_pql_reference` | Full PQL syntax, served on demand |

Every tool carries MCP annotations (`readOnlyHint`, `destructiveHint`, `idempotentHint`),
so Grok can tell a lookup from a deletion before calling it.

### Querying with PQL

Work item `list`, `list_archived` and `count` accept **PQL**, Plane's query language, so
Grok can ask for exactly the items it needs instead of paging through a project:

```
priority = "urgent" AND assignee = currentUser()
stateGroup IN openStates() AND isOverdue()
cycle IN activeCycle() AND hasNoAssignee()
```

`get_pql_reference` returns the full syntax (fields, operators, date and relation
functions, custom properties), so Grok looks it up rather than guessing at filters.

## Example prompts

- "What's assigned to me that's overdue?"
- "File a bug in the Web project: login redirect loops on Safari. Make it high priority."
- "Summarize what's left in the current cycle for the Mobile project."
- "Complete this cycle and move everything unfinished to the next one."
- "Create an epic for the billing revamp and nest WEB-41 and WEB-42 under it."
- "Comment on ENG-108 asking Priya to review it, with an @mention so Priya gets notified."
- "Draft a release note page for v2.4 from the work items in that release."

## Authentication and network

The plugin connects only to `https://mcp.plane.so`. Authentication is OAuth 2.1
authorization code with PKCE and dynamic client registration; Grok handles the flow.

Network endpoints:

- `https://mcp.plane.so/http/mcp`: hosted MCP (Streamable HTTP)
- `https://mcp.plane.so/http/authorize`, `/http/token`, `/http/register`: OAuth 2.1 + DCR
- `https://mcp.plane.so/.well-known/oauth-protected-resource/http/mcp`,
  `https://mcp.plane.so/http/.well-known/oauth-authorization-server`: discovery metadata
- `https://api.plane.so/auth/o/authorize-app/` and `https://app.plane.so`: human sign-in
  and consent screen during authorization

Credentials: a Plane Cloud account. The token is scoped `read` and `write` to the single
workspace you approve during sign-in and is sent as `Authorization: Bearer` on `/http/mcp`.
The MCP server calls the Plane API (`https://api.plane.so`) server-side to serve tool
calls; the plugin never contacts it directly. The plugin stores no API key and requests
no filesystem or shell access. Tools act only on data the signed-in user can already see
in Plane, and access can be revoked from Plane at any time.

## Self-hosted Plane

The hosted endpoint serves Plane Cloud. For a self-hosted instance, or to use a personal
access token instead of OAuth, run the same server locally over stdio. Point `.mcp.json`
at `uvx plane-mcp-server stdio` with `PLANE_API_KEY` and `PLANE_WORKSPACE_SLUG` set, and
`PLANE_BASE_URL` for a self-hosted instance; see
[the MCP server docs](https://developers.plane.so/dev-tools/mcp-server) and the
[server README](https://github.com/makeplane/plane-mcp-server#readme).

## License

MIT for the files in this plugin and for the
[Plane MCP server](https://github.com/makeplane/plane-mcp-server/blob/main/LICENSE). Use
of Plane Cloud is governed by the [Plane terms](https://plane.so/legals/terms-and-conditions)
and [privacy policy](https://plane.so/legals/privacy-policy).
