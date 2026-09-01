# Postqued plugin for Grok

Plan, review, schedule, publish, and analyze social content through Postqued's hosted Model Context Protocol server. The plugin covers shared workspaces, connected social accounts, media, multi-platform publishing, analytics, engagement, approvals, client review, and collaboration.

## Connect

Install the plugin and connect the `postqued` MCP server. The client discovers Postqued's OAuth authorization server automatically and opens a browser for sign-in and consent. No API key is stored in this plugin.

A Postqued account with API and MCP access is required. Access remains limited by the signed-in user's current organization memberships, workspace role, plan capabilities, and connected social accounts. Write, publish, and administrative operations use separate OAuth scopes and may require additional consent.

## Network access

The plugin declares one remote MCP endpoint:

- `https://mcp.postqued.com/mcp` — tool discovery and calls.

During OAuth and tool execution, the MCP service uses Postqued's API and authorization service at `https://api.postqued.com`. Postqued may contact a connected social network only when a selected tool needs provider data or performs a user-approved provider action.

The plugin contains no hooks, executable scripts, post-install steps, local file access, or telemetry. It does not read environment variables or local credentials.

## Safe publishing workflow

1. Resolve the intended workspace with `list_workspaces`.
2. Resolve connected account IDs and current provider constraints.
3. Upload any required media through the MCP upload tools.
4. Call `publish_content` with `dryRun: true`.
5. Confirm the exact copy, destinations, and timing before a real publish or schedule.
6. Use a fresh UUID idempotency key for the approved live request.
7. Read the durable publish status instead of assuming provider success.

The complete hosted catalog currently exposes 62 structured tools. Tool input schemas are discovered from the server at runtime.

## Links

- [Postqued MCP guide](https://postqued.com/mcp)
- [Postqued privacy policy](https://postqued.com/privacy)
- [Postqued terms](https://postqued.com/terms)

## License

The vendored plugin files are licensed under the [MIT License](LICENSE). Use of the Postqued service is governed by Postqued's terms and privacy policy.
