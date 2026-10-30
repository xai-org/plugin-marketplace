# Famulor for Grok Build

Build, review, and operate Famulor voice, WhatsApp, and webchat AI assistants
from Grok Build through the official hosted [Famulor MCP server](https://docs.famulor.io/mcp/overview).

## Installation

Open `/marketplace` in Grok Build, find **Famulor**, and install. On first use the
host runs Famulor's OAuth flow (dynamic client registration + browser sign-in);
choose the workspace and approve the scopes you want. No API key or credential is
bundled in this plugin.

Try: "List my Famulor assistants and summarize the last five calls of the first one."

## Components and permissions

- One HTTP MCP connection: `famulor` → `https://app.famulor.io/mcp`
- One skill: `skills/famulor` (operating workflow, authorization rules, toolset router,
  and dated per-toolset reference tables; live `tools/list` is authoritative)

No scripts, lifecycle hooks, local executables, or dependency installation.
Every tool call is constrained server-side by the OAuth scopes the user approved,
the authenticated workspace, membership role, and plan. The skill requires an explicit
target and confirmation before outbound calls, messages, campaign starts, purchases,
billing changes, API-key changes, and destructive actions. Clients can narrow discovery
with `https://app.famulor.io/mcp?toolsets=assistants,calls`.

## Network and authentication

- `https://app.famulor.io/mcp`: hosted Streamable HTTP MCP server.
- OAuth discovery and endpoints advertised by `app.famulor.io`
  (`/.well-known/oauth-protected-resource/mcp`): client registration, authorization,
  and token exchange handled by the MCP host.

The host manages OAuth tokens; the plugin does not read local secrets, files, or
environment variables.

## Ownership and license

Famulor is operated by BEK Service GmbH (https://www.famulor.io, support@famulor.io).
The upstream multi-client source is https://github.com/bekservice/Famulor-Skill
(BEK Service GmbH). Plugin files are MIT licensed; the hosted service is governed by
Famulor's [terms](https://www.famulor.io/terms) and [privacy policy](https://www.famulor.io/privacy).
