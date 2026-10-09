# Bubble plugin for Grok Build

Connect Grok to your [Bubble](https://bubble.io) apps and build by describing what you
want. Grok can read your app's structure (pages, reusables, data types, option sets,
styles, and workflows) and make changes the same way the Bubble editor does.
See Bubble's [MCP guide](https://manual.bubble.io/help-guides/ai/bubble-mcp) for more.

## Installation

In Grok Build, open `/plugin`, search for **Bubble**, and install.

On first connection, Grok opens Bubble's sign-in in your browser. Approve access with
the Bubble account whose apps you want Grok to work on. No API key is needed and
nothing should be pasted into chat.

## What you can do

- **Design:** create and move elements, set properties, apply styles and color/font
  variables, and add conditionals and custom states.
- **Logic:** create workflow events and actions, reorder steps, and validate
  expressions before writing them.
- **Data:** define data types, fields, option sets, and privacy rules; create, search,
  and update records through your app's Data API.
- **Integrations:** set up API Connector calls and install marketplace plugins.
- **Safety:** app edits are undoable, and you can create savepoints, work on
  development branches, and run issue checks across the whole app.

Grok can also generate preview links so you can see changes in run mode immediately.

The plugin adds one MCP server, `bubble`, at `https://mcp.bubble.io/mcp` (Streamable
HTTP, OAuth 2.1). Every tool carries MCP annotations (`readOnlyHint`,
`destructiveHint`), so Grok can tell a lookup from an edit before calling it. Tools act
only on apps the signed-in user can already access in Bubble.

## Example prompts

- "List my Bubble apps."
- "Show me the pages and data types in my app `my-app`."
- "Add a sign-up form to the index page of `my-app`."
- "Create a Project data type with a name and a due date."
- "When the Save button is clicked, create a new Project from the inputs."

## Authentication and network

The plugin connects to `https://mcp.bubble.io`. Authentication is OAuth 2.1
authorization code with PKCE against Bubble's authorization server at
`https://bubble.io`; Grok handles the flow.

Bubble identifies OAuth clients by a client metadata document URL instead of dynamic
client registration, so `.mcp.json` sets `oauth.clientId` to the document Bubble
hosts for Grok Build. The document names Grok Build and allows only loopback redirects
to `http://127.0.0.1/callback`.

Network endpoints:

- `https://mcp.bubble.io/mcp`: hosted MCP (Streamable HTTP)
- `https://mcp.bubble.io/.well-known/oauth-protected-resource`: discovery metadata
- `https://mcp.bubble.io/oauth/clients/grok-build.json`: this plugin's OAuth client metadata document
- `https://bubble.io/.well-known/oauth-authorization-server`: authorization server metadata
- `https://bubble.io/api/1.1/oauth/authorize`, `/access_token`, `/revoke`: OAuth 2.1 with PKCE
- `https://bubble.io`: human sign-in and consent screen

Credentials: a Bubble account. On first connect, Bubble's consent page asks you to
approve two groups of permissions:

- **Read:** see your apps' names and descriptions, read from the editor, read test
  and live data, and view development and live logs.
- **Write:** create apps, edit apps and their test data, create and delete branches,
  and install free plugins.

The access token is sent as `Authorization: Bearer` on `/mcp`; no API key is stored in
the plugin.

## License

Proprietary. Use of the hosted MCP server is governed by Bubble's terms of service.
