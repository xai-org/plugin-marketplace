# Grok Build MCP workflow

Grok namespaces MCP tools from the packaged server. Inspect the active tool
names rather than reconstructing them from this document.

1. Inspect the active MCP tools and their current schemas; do not infer model names or enums from this file.
2. For media inputs, call the discovered upload tool first and preserve its returned reference.
3. After the user confirms final billable settings, call the selected generation tool exactly once.
4. Preserve `generationId` and `taskTraceId`. On ambiguity, call the discovered `query_tasks` tool rather than resubmitting.
5. Do not parallelize generation submissions or speculative retries.
