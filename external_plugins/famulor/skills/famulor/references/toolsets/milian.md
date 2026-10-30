# Milian toolset

Milian workspace questions and voice sessions. Both require explicit approval for additional credits. Connect only this group with `https://app.famulor.io/mcp?toolsets=milian`.

This 2026-10-08 snapshot covers all 2 tools assigned to `milian` in the canonical 439-tool registry. The live MCP `tools/list` response is authoritative for arguments, current availability, annotations, and plan or role gating. Never invent fields from this catalog.

Toolsets limit discovery context; they do not grant access. OAuth/API scopes and workspace roles are enforced separately. The Effect column reflects MCP risk annotations: `Delete/destructive` also covers overwrites or changes that can remove data or safeguards.

**Caution:** Milian questions and voice sessions consume additional workspace credits. Explain the cost and obtain approval for each request.

| Tool | Effect | Accepted scope | Execution | Purpose snapshot |
| --- | --- | --- | --- | --- |
| `ask_milian` | Write/action | `milian:write` | Immediate | Ask Milian for workspace answers, analysis, and recommendations. Milian uses additional workspace credits, billed by actual usage at the same rates as the dashboard. BEFORE EVERY call, tell the user about these extra credits and obtain explicit user approval for this question; only then set confirmed=true. Never infer approval from a general request for help or retry automatically. Milian can only read data permitted by this connection; it cannot change workspace resources. Each call is a new paid question, including follow-ups. |
| `create_milian_voice_session` | Write/action | `milian:write` | Immediate | Start a live voice conversation with Milian using workspace credits. Requires explicit user approval for this session, workspace Beta Features, and an eligible plan. Return the short-lived connection URL and protocols to a voice-capable client; connect within 60 seconds. Audio and optional shared-screen analysis consume additional credits until disconnected or the session limit is reached. The connection also accepts optional visible page text from the client; explicit screen sharing takes priority. Workspace tools retain this connection's scopes and role. Do not create a session speculatively or retry without user approval. |
