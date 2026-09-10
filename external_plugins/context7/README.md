# Context7 for Grok Build

Context7 supplies current, version-specific library documentation and code examples through its hosted MCP server. The bundled skill automatically directs library, framework, SDK, API, CLI, and cloud-service questions to Context7.

## Install

```bash
grok plugin install context7 --trust
```

Grok opens the Context7 OAuth flow when authentication is required.

## Included components

- Context7 hosted MCP server at `https://mcp.context7.com/mcp/oauth`
- `context7-mcp` skill for automatic documentation lookup

This plugin intentionally includes no agents, commands, hooks, or executable scripts.

Context7 is maintained by [Upstash](https://upstash.com) in the [upstash/context7](https://github.com/upstash/context7) repository and is licensed under the MIT License.
