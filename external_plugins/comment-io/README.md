# Comment.io

Comment.io is a browser workspace where people and their trusted agents share
files. This plugin connects Grok Build to the hosted Comment.io MCP
server so Grok can find, read, edit, comment on and suggest changes to
documents in a Comment.io workspace you approve.

The plugin contains only an MCP server configuration (`.mcp.json`), this
README, its manifest and a LICENSE. It has no skills, hooks, scripts, commands or local
programs.

## The `run` tool

The server at `https://comment.io/mcp` exposes one tool, `run`. It takes a
Comment.io command (for example `help`, `rg`, `doc-read`, `doc-append` or
`doc-comment`) and optional `stdin`, and returns `stdout`, `stderr` and
`exitCode`. Run `help` for the full command list.

The plugin uses this single-tool server because Grok Build works by composing
commands and short scripts, which `run` accepts. Comment.io also offers a
separate server with one typed tool per command, documented in the connector
guide.

`run` is a restricted document-workspace command surface, not a shell on your
computer or on a general-purpose host:

- Commands run on Comment.io's servers in a restricted shell, as the agent you
  approved, and reach only the workspace you approved.
- Nothing runs on your machine.
- Every call ends within 45 seconds.
- Because `run` can change and delete documents, the server marks it as a
  destructive tool, so Grok may ask you to confirm calls.

See the [connector guide](https://comment.io/docs/mcp) for details.

## Sign in

The first time Grok uses the server, it opens Comment.io in your browser. Sign
in, choose a workspace and an agent, and approve. You need a Comment.io account
that belongs to a workspace. No API key is needed.

`.mcp.json` names Comment.io's OAuth client document for Grok Build,
`https://comment.io/oauth/clients/grok-build.json`, as the client ID. That
document registers loopback redirects (`http://127.0.0.1/callback`,
`http://localhost/callback`) and no client secret. This plugin sets
`oauth.clientId` explicitly, so Grok Build uses Comment.io's Grok Build client
document as its client ID instead of registering a client. It listens on a
free loopback port, redirects to `http://127.0.0.1:<port>/callback`, and
sends no client secret because
`clientSecretEnvVar` is not set. With Grok Build 1.0.46 the authorization
request carried this client ID, S256 PKCE and `resource=https://comment.io/mcp`.

To disconnect, open the workspace's **Team** page in Comment.io and disconnect
the agent.

## Network endpoints and credentials

| Endpoint | Why |
|---|---|
| `https://comment.io/mcp` | The MCP server: tool calls |
| `https://comment.io/.well-known/oauth-*`, `/oauth/authorize`, `/oauth/token` | OAuth discovery, sign-in and tokens |
| `https://comment.io/oauth/clients/grok-build.json` | The OAuth client document Grok Build identifies with |

Credentials: an OAuth access token for the agent you approve, obtained through
your browser sign-in. Grok Build stores MCP OAuth tokens in
`~/.grok/mcp_credentials.json` with owner-only permissions. The plugin reads no files,
environment variables or other secrets.

## Data and support

Grok sends each command and its input text to Comment.io, and Comment.io
returns the command's output. See the
[privacy policy](https://comment.io/privacy) and
[terms](https://comment.io/terms).

Support: [support@comment.io](mailto:support@comment.io).

## License

MIT for the files in this plugin directory (see [LICENSE](LICENSE)). The
license does not cover the hosted Comment.io service or its server software,
which remain proprietary; use of the service is governed by the Comment.io
[terms](https://comment.io/terms) and [privacy policy](https://comment.io/privacy).

Published by Comment, Inc.
