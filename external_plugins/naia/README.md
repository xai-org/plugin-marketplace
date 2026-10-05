# Naia GEO Autopilot

Connect Grok Build to the Naia hosted MCP server at https://naia.today/api/v1/mcp using Streamable HTTP and per-user OAuth.

A Naia account is required. Authorize through the browser when your MCP client prompts you. Analyses and content generation consume the credits of the authenticated Naia account; read the balance before starting a paid task.

The server supports GEO analyses, reports, content generation and editing, audits, memories and execution plans. Requests operate within the authenticated account permissions. Do not start analyses or make changes without the user approving the action.

This plugin contains only an MCP connection configuration and metadata. It has no hooks, local executables, embedded credentials, or telemetry. The only configured network endpoint is https://naia.today/api/v1/mcp.

Documentation: https://naia.today/developers
Privacy: https://naia.today/privacy
Terms: https://naia.today/terms
Support: ariel@naia.today

License: UNLICENSED, matching the Naia MCP package. The hosted service is proprietary and governed by its own terms; this submission does not grant a license to the hosted application.
