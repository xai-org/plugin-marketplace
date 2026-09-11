---
description: Install the gb-fix-pass workflow into ~/.grok/workflows if it is not there yet, then run it on the current branch.
---

Run the gb-fix-pass workflow on the current branch against origin/main.

1. If `~/.grok/workflows/gb-fix-pass.rhai` does not exist, or is older than `${GROK_PLUGIN_ROOT}/workflows/gb-fix-pass.rhai`, copy the plugin's copy there. The workflow reads its skills from `${GROK_PLUGIN_ROOT}/skills/`, so leave that path as it is.
2. Launch it with the workflow tool: source `{ "type": "name", "name": "gb-fix-pass" }`. Do not pass args.
3. Tell the user the run's display name and that the edits stay uncommitted for review. When it completes, show the report path and the unification verdict from the summary.
