# TimeCamp plugin for Grok

Connect Grok to [TimeCamp](https://www.timecamp.com), the time tracking and
timesheet platform, through TimeCamp's hosted MCP server.

Ask Grok to start a timer, log time you forgot to track, reorganize projects
and tasks, or pull a timesheet report for you or your team, and it works
directly against your TimeCamp workspace.

## Installation

In Grok Build, open `/plugin`, search for **TimeCamp**, and install. On first
use Grok opens TimeCamp's authorization page in your browser. Approve access
there - do not paste an API token into chat.

Grok web, iOS, and Android users can add the same server under
Connectors > New Connector > Custom with the URL
`https://mcp.timecamp.com/mcp`.

## What it does

The plugin ships a single hosted MCP server with 25 tools:

- **Timers** - start and stop the TimeCamp timer, check what is running.
- **Time entries** - list, create, edit, and delete entries, with tags.
- **Tasks and projects** - browse the task tree, create and rename tasks, move
  them, and read task statistics.
- **Task access** - read task assignments and add, update, or remove people.
- **Tags** - list tag lists and tags, and create tags.
- **People** - list workspace users.
- **Timesheet reports** - grouped reports and pivots with filters, metrics,
  sorting, and drill-down, plus field discovery for the workspace.
- **Computer usage** - Activities Center reports and desktop activity records.

## Authentication

The plugin connects only to `https://mcp.timecamp.com/mcp`. Authentication is
OAuth 2.1 with PKCE (S256) and dynamic client registration against
`https://mcp-auth.timecamp.com`. The MCP server advertises its authorization
server at `https://mcp.timecamp.com/.well-known/oauth-protected-resource` and
rejects unauthenticated calls with a 401.

Network endpoints:

- `https://mcp.timecamp.com/mcp` - hosted MCP server (streamable HTTP)
- `https://mcp-auth.timecamp.com/authorize`, `/token`, `/register`,
  `/introspect` - OAuth 2.1 authorization server with dynamic client
  registration
- `https://app.timecamp.com/auth/login` - TimeCamp sign-in, opened from the
  authorization page when you are not already signed in

Credentials: a TimeCamp account. On the authorization page, TimeCamp detects an
existing TimeCamp browser session and uses it; if you are not signed in, the
page links to TimeCamp sign-in, and a "Use API token" fallback lets you paste a
TimeCamp API token into that TimeCamp-hosted page. The token is encrypted at
rest with AES-GCM, stored only after you approve, and released only to the MCP
server over a private internal binding. Nothing is written to your machine by
this plugin, no API key lives in these files, and every tool call is scoped to
what the signed-in user can already see in TimeCamp.

## Privacy and terms

Use of the hosted MCP server is governed by TimeCamp's
[Terms of Service](https://www.timecamp.com/terms-of-service/) and
[Privacy Policy](https://www.timecamp.com/privacy-policy/). Documentation lives
at [docs.timecamp.com/mcp-server](https://docs.timecamp.com/mcp-server).

## License

MIT - see [LICENSE](LICENSE). The plugin files in this repository are MIT
licensed; the hosted TimeCamp service they connect to is governed by TimeCamp's
own terms.
