---
name: plane
description: >-
  Work with Plane project management through the Plane MCP server: find, create,
  triage and update work items and epics, plan cycles, modules and milestones, comment
  and @mention teammates, write pages, manage releases, intake and customers, and
  query work items with PQL. Use whenever "Plane", "plane.so", a Plane work item
  identifier such as ENG-42, or the user's Plane projects, cycles, modules, epics or
  backlog come up.
---

# Plane

Plane is open-source project management. The `plane` MCP server bundled with this
plugin wraps the [Plane API](https://developers.plane.so/api-reference/introduction)
and acts as the signed-in Plane user, inside the one workspace they approved at sign-in.
Use it for anything about that workspace: what is being worked on, what is late, filing
and updating work, and planning cycles, modules and releases.

Each tool is one Plane resource and takes an `action`. The tool's own description lists
every action with its required and optional parameters; read it rather than guessing.

## Before you act

1. **Know where you are.** `workspace retrieve` names the connected workspace and
   `member me` the signed-in user. Call them once when the session needs either.
2. **Never guess IDs.** Assignees, labels, states, parents, types, cycles and modules
   are UUIDs. Resolve names first with `project list`, `member list_project`,
   `state list`, `label list`, `cycle list`, `module list` or `workitem_type list`,
   or ask. A human identifier like `ENG-42` goes to `workitem retrieve_by_identifier`.
3. **Work items belong to a project.** If the user doesn't name one and it is not
   obvious from context, ask which project before creating anything.
4. **Filter with PQL, not by paging.** `workitem list`, `list_archived` and `count`
   take a `pql` filter. Call `get_pql_reference` before writing anything beyond a
   simple filter. Common mistakes: the state-group field is `stateGroup` (not
   `state__group`), UUID fields need UUIDs (`currentUser()`, `activeCycle()` and
   `openStates()` are the exceptions), a query holds at most 5 conditions, and there is
   no date arithmetic (use `daysAgo(7)`, not `today() - 7`).
5. **Confirm destructive actions.** Every `delete`, plus `collection remove_page` and
   `remove_member`, `initiative remove_projects`, `page detach_from_workitem`,
   `release_label detach`, `project_estimate delete_point`,
   `workitem_property delete_option` and `delete_value`, and
   `workitem_relation delete_definition`, needs an explicit yes from the user first.
   Tool annotations (`destructiveHint`) mark these. Prefer `archive` when the user
   just wants something out of the way.
6. **Updates are partial.** `update` changes only the fields you pass. To add or remove
   assignees or labels without clobbering the rest, use `workitem manage_assignee` or
   `manage_label`; passing `assignees=[]` or `labels=[]` to `update` clears them.

## Choosing a tool

| You want to | Use |
|---|---|
| See a work item | `workitem retrieve_by_identifier` (e.g. `ENG-42`), `workitem retrieve` by UUID |
| Find work items | `workitem list` with `pql` (omit `project_id` to search the workspace), `workitem search` for free text |
| Count or break down work | `workitem count` with `pql`, `group_by` and `sub_group_by` (e.g. `state__group`, `priority`, `assignees__id`) |
| File or edit work | `workitem create`, `workitem update`, `manage_assignee`, `manage_label` |
| Discuss | `workitem_comment create`; mention with `@[<user uuid>]` inside `comment_html` |
| Links, files, relations | `workitem_link`, `workitem_attachment` (`read` returns images and text inline), `workitem_relation` |
| What changed and who changed it | `workitem_activity list` (history is not queryable through PQL) |
| Time tracking | `work_log`; totals per project with `project worklog_summary` |
| Sprints | `cycle list` / `create`, `cycle manage_workitems`, `cycle complete`, `cycle transfer_workitems` |
| Feature groupings and milestones | `module`, `milestone` (`manage_workitems` to add or remove items) |
| Cross-project goals | `initiative` (`add_projects`, `manage_workitems`) |
| Triage incoming requests | `intake list`, then `intake update` with a `status` |
| Docs and specs | `page` (workspace pages unless `project_id` is given), `collection` to group them |
| Releases | `release`, `release get_changelog` / `update_changelog`, `release_tag`, `release_label` |
| Customers and their asks | `customer`, `customer_request`, `customer_property` |
| Workflow setup | `state`, `label`, `workitem_type`, `workitem_property`, `project_estimate`, `template` |
| Turn features on or off | `project get_features` / `update_features`, `workspace get_features` / `update_features` |

## Recipes

**Epics.** There are no epic tools; an epic is a work item whose type is named "Epic".

1. `workitem_type resolve` with `project_id` and `name="Epic"`. It finds the type, or
   creates it if the project has none, and its `id` is the `type_id`.
2. Create with `workitem create`, passing that `type_id`.
3. List with `workitem list` and `pql='type = "<type id>"'`, or `isEpic()`.
4. Nest a work item under an epic with `workitem update`, `parent=<epic work item id>`.
5. List an epic's children with `pql='childOf("ENG-12")'`, using the epic's identifier.

**Rolling a cycle over.** `cycle transfer_workitems` moves only unfinished work items and
is rejected while the source cycle is still running. Run `cycle complete` first (it sets
the end date to today), then `transfer_workitems` with `new_cycle_id`. Confirm with the
user before completing a cycle early.

**Mentioning someone.** Write `@[<user uuid>]` inline in `comment_html`, e.g.
`<p>@[3f2c...] can you review?</p>`. A bare `@name` is plain text and notifies nobody.
The user must be a member of the work item's project; resolve them with
`member list_project`.

**Triage.** In an `intake` record, `workitem_id` is the record's `issue` field, not the
record's own id. `status` is `-2` pending, `-1` declined, `0` snoozed (needs
`snoozed_till`), `1` accepted, `2` duplicate (needs `duplicate_to`).

**Pages.** Bodies are HTML in `description_html`, and an update replaces the whole body.
A page's parent is fixed at creation, so pass `parent_id` to `create` when building a
hierarchy. A page must be archived before it can be deleted.

## Limits

- Work item types, custom properties, time tracking and some project features depend
  on the workspace's Plane plan. When the server reports a feature as unavailable on
  the plan, tell the user it needs a plan upgrade; it is not a bug.
- Only the workspace approved at sign-in is reachable. To work in another workspace,
  the user reconnects the plugin and picks it.
- Attachments: `read` handles PNG, JPEG, GIF and WEBP images and text formats; use
  `download_url` for anything else. `upload_from_url` needs a public URL.

## Building against Plane in code

When the user is writing an integration rather than managing their own work, the MCP
tools are still the fastest way to inspect real data, but the code should call the API
directly:

- REST API: `https://api.plane.so/api/v1`, docs at
  https://developers.plane.so/api-reference/introduction. Authenticate with an
  `X-API-Key` header; personal access tokens live in Profile Settings > Personal Access
  Tokens in Plane.
- MCP server docs: https://developers.plane.so/dev-tools/mcp-server
- Local stdio server with an API key, or against a self-hosted Plane:
  `uvx plane-mcp-server stdio` with `PLANE_API_KEY`, `PLANE_WORKSPACE_SLUG` and, for
  self-hosted, `PLANE_BASE_URL`. Source at https://github.com/makeplane/plane-mcp-server
