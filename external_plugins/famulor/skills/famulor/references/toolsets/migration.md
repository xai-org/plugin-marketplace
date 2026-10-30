# Migration toolset

Previewing and importing supported Famulor 1.0 resources. Connect only this group with `https://app.famulor.io/mcp?toolsets=migration`.

This 2026-10-08 snapshot covers all 2 tools assigned to `migration` in the canonical 439-tool registry. The live MCP `tools/list` response is authoritative for arguments, current availability, annotations, and plan or role gating. Never invent fields from this catalog.

Toolsets limit discovery context; they do not grant access. OAuth/API scopes and workspace roles are enforced separately. The Effect column reflects MCP risk annotations: `Delete/destructive` also covers overwrites or changes that can remove data or safeguards.

**Caution:** Imports create or change workspace resources. Preview the exact source and destination, then confirm before starting an import.

| Tool | Effect | Accepted scope | Execution | Purpose snapshot |
| --- | --- | --- | --- | --- |
| `import_famulor_1_data` | Write/action | `assistants:write or knowledge:write or campaigns:write or automations:write or calls:write` | Immediate | Import selected Famulor 1.0 resources into this workspace. Campaigns and automations are always created as inactive drafts; unsupported automation steps become visible review nodes. Preview first. |
| `preview_famulor_1_migration` | Read-only | `assistants:read or campaigns:read or automations:read or calls:read` | Immediate | Read a Famulor 1.0 account and return a migration preview with mappings and warnings. The source API key is used only for this request and is never persisted or returned. |
