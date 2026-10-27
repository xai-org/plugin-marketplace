# Spacefast plugin for Grok Build

Connect Grok Build to [Spacefast](https://spacefast.com), Automattic's platform for
publishing what you build with AI to a live URL. Publish a site or app, update an
existing Space, check deployments and build logs, and connect a custom domain,
all from the terminal.

## Installation

In Grok Build, open `/marketplace`, find **spacefast**, and press `i` to install.
Or from the CLI:

```bash
grok plugin install spacefast --trust
```

On first connection, open `/mcp`, select **spacefast** and press `i` to sign in.
Grok opens the Spacefast sign-in in your browser. No API key is needed and nothing
should be pasted into chat.

## What you get

- **MCP server** `spacefast` at `https://mcp.spacefast.com/mcp` (Streamable HTTP, OAuth).
- **Skill** `spacefast`: how to publish well (pick the right Space, publish build
  output, send files inline, skip secrets, follow the publish to a live URL) and
  how to use the read and API tools.

### Tools

| Tool | What it does | Annotation |
|---|---|---|
| `publish` | Uploads files and creates an immutable version of a new or existing Space | destructive |
| `operation_status` | Checks a publish that is still running | read-only |
| `show_space` | Read-only views: deployments, build logs, domains, analytics, source history and comparisons | read-only |
| `execute` | Runs a sandboxed JavaScript program against the Spacefast API catalog (no network access beyond Spacefast's own API) | destructive |
| `resume_execution` | Continues an `execute` program that paused for the user's approval | destructive |

## Example prompts

- "Build a landing page for my bakery and publish it to Spacefast."
- "Publish `dist/` to Spacefast and give me the live URL."
- "Show me the deployments for this Space and whether the last build passed."
- "Point docs.example.com at this Space and tell me which DNS records to add."

## Authentication and network

The plugin connects only to Spacefast. The hosted server is an OAuth 2.0 protected
resource; Grok handles the authorization flow.

Network endpoints:

- `https://mcp.spacefast.com/mcp`: hosted MCP server (Streamable HTTP)
- `https://spacefast.com`: sign-in, consent and approval pages in the browser

Default OAuth scopes: `teams:read`, `teams:create`, `spaces:read`, `spaces:write`,
`spaces:rename`, `publish:write`, `domains:read`, `domains:write`, `offline_access`.
Each tool declares the scopes it needs in `tools/list`.

Credentials: a Spacefast account. The client never receives a Spacefast API
token; each request mints a five-minute delegation token scoped to the signed-in
user. Writes made through `execute` can require an explicit approval in the
browser before they run. The plugin ships no hooks, scripts or local processes and
requests no filesystem or shell access of its own.

## Local alternative

Prefer to publish straight from disk? The Spacefast CLI runs the same tools over
stdio with workspace file access: `sf mcp`. See
[the MCP server docs](https://spacefast.com/docs/agents/mcp-server).

## License

MIT for the files in this plugin. Use of Spacefast is governed by the Spacefast
terms of service and privacy policy at https://spacefast.com.
