---
name: install-kling-ai-plugin
description: Install, refresh, or troubleshoot the Kling AI plugin and remote OAuth MCP registration in Grok Build. Preserve the packaged server key and do not add a duplicate connection.
version: 1.0.3
author: KLING AI
license: MIT
metadata:
  author: KLING AI
  short-description: Install Kling AI in Grok Build
---

# Install Kling AI in Grok Build

1. The marketplace package defaults to Global: `.mcp.json` activates `https://kling.ai/mcp`. For a China-region private distribution, replace it with the inactive `.mcp.china.json` template for `https://klingai.com/mcp` before installation. Preserve exactly one server named `Plugin-Grok-kling-ai` with `X-Kling-Integration: Plugin-Grok`; never activate both templates.
2. Validate and install the complete plugin directory:

   ```bash
   grok plugin validate /absolute/path/to/grok/kling-ai
   grok plugin install /absolute/path/to/grok/kling-ai --trust
   grok plugin enable kling-ai
   ```

3. Do not copy only the Skill, add a second MCP server, bundle a local server, or request a Kling API key.
4. Run `grok inspect`, `grok plugin details kling-ai`, and `grok mcp list`; verify that one packaged server is active.
5. Open `/mcps`, select `Plugin-Grok-kling-ai`, and press `i` to complete browser OAuth. Grok owns PKCE, credentials, and refresh; do not create a second OAuth flow.
6. Run `grok mcp doctor Plugin-Grok-kling-ai` and start a new session so Skills and tools refresh. Do not submit a generation as part of setup.
