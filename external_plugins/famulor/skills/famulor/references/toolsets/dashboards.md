# Dashboards toolset

Dashboards, analytics, widgets, and layout. Connect only this group with `https://app.famulor.io/mcp?toolsets=dashboards`.

This 2026-10-08 snapshot covers all 19 tools assigned to `dashboards` in the canonical 439-tool registry. The live MCP `tools/list` response is authoritative for arguments, current availability, annotations, and plan or role gating. Never invent fields from this catalog.

Toolsets limit discovery context; they do not grant access. OAuth/API scopes and workspace roles are enforced separately. The Effect column reflects MCP risk annotations: `Delete/destructive` also covers overwrites or changes that can remove data or safeguards.

**Caution:** Dashboard, widget, and logo deletion removes workspace resources. Confirm the exact resource and whether it can be recovered before deleting.

| Tool | Effect | Accepted scope | Execution | Purpose snapshot |
| --- | --- | --- | --- | --- |
| `create_dashboard` | Write/action | `dashboards:write or calls:write` | Immediate | Create a custom analytics dashboard. The workspace plan must include Custom Dashboards. |
| `create_dashboard_widget` | Write/action | `dashboards:write or calls:write` | Immediate | Create and attach a widget, or attach a reusable widget by supplying widget_id. New widgets require name; all other fields have dashboard defaults. |
| `create_widget_connector` | Write/action | `assistants:write` | Immediate | Create a web widget connector with widget access. Choose email or SMS verification in a root workspace; email uses the platform sender without extra credits, while SMS requires accepting the current price. Returns public_key for embedding. New widgets default to theme.logo_source=assistant and follow the selected assistant's current profile picture, including future changes. An explicit logo_url defaults to the custom source; an explicit logo_source takes precedence. Existing widgets keep their saved source. |
| `delete_dashboard` | Delete/destructive | `dashboards:write or calls:write` | Immediate | Permanently delete a custom dashboard. Reusable widget records are retained. |
| `delete_widget_connector` | Delete/destructive | `assistants:write` | Immediate | Permanently delete a web widget connector. |
| `delete_widget_connector_logo` | Delete/destructive | `assistants:write` | Immediate | Remove the header logo uploaded for a web widget connector. |
| `get_dashboard` | Read-only | `dashboards:read or calls:read` | Immediate | Get one custom dashboard by ID. |
| `get_dashboard_analytics` | Read-only | `dashboards:read or calls:read` | Immediate | Get call KPIs, comparison deltas, zero-filled activity series, breakdowns, assistant rankings, campaign progress, recent calls, and plan-gated booking/knowledge/simulation/live-monitoring summaries. |
| `get_widget_connector` | Read-only | `assistants:read` | Immediate | Fetch a single web widget connector by its ID. |
| `list_dashboard_widgets` | Read-only | `dashboards:read or calls:read` | Immediate | List a dashboard's widgets, conditions, visualization settings, order, and grid layout. |
| `list_dashboards` | Read-only | `dashboards:read or calls:read` | Immediate | List the workspace's custom analytics dashboards in display order. |
| `list_widget_connectors` | Read-only | `assistants:read` | Immediate | List web widget connectors. Optional assistant_id filter. Plan entitlements for the web widget and the AI avatar are included. |
| `preview_natural_language_dashboard` | Write/action | `dashboards:write or calls:write` | Immediate | Turn a plain-language analytics request into a safe, allow-listed dashboard plan without saving any widgets. |
| `remove_dashboard_widget` | Delete/destructive | `dashboards:write or calls:write` | Immediate | Detach a widget from one dashboard while retaining the reusable widget record. |
| `save_natural_language_dashboard` | Write/action | `dashboards:write or calls:write` | Immediate | Validate a previously previewed semantic dashboard plan and add its widgets to the selected dashboard. |
| `update_dashboard` | Write/action | `dashboards:write or calls:write` | Immediate | Rename, reorder, or switch a custom dashboard between the built-in overview and a blank canvas. |
| `update_dashboard_widget` | Write/action | `dashboards:write or calls:write` | Immediate | Update a widget's data, visualization, filters, order, or 12-column grid layout. |
| `update_widget_connector` | Write/action | `assistants:write` | Immediate | Patch a web widget connector, including email or SMS verification. Activating requires widget access; visitor verification requires a root workspace. |
| `upload_widget_connector_logo` | Write/action | `assistants:write` | Immediate | Upload the header logo for a web widget connector. Provide EXACTLY ONE of url (downloaded server-side) or data_base64 + content_type. PNG or JPEG only, max 10 MB. Returns the stored url — write it into the connector's theme via update_widget_connector to actually use it (this tool only uploads). |
