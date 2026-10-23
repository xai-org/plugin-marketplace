# Slate Stone for Grok Build

Read-only access to the Slate Stone Financial catalog of Excel financial models and the Slate Stone tax guidance library through the hosted MCP server at `https://mcp.slatestonefinancial.com/mcp` (Streamable HTTP).

## Requirements
An active Slate Stone All-Access subscription (see https://slatestonefinancial.com/pricing/). The subscription includes a personal API key: after subscribing, request an account access code on https://slatestonefinancial.com/contact/ using the email on your subscription, then create your account at https://mcp.slatestonefinancial.com/account and make your key there. Set it as the `SLATE_STONE_API_KEY` environment variable; the plugin sends it as `Authorization: Bearer <key>`. Keys are read-only and revocable.

Without a key, only `get_pricing` works (it explains how to subscribe); every other tool returns a "subscription required" message.

## Tools (all read-only)
`search_models`, `get_model`, `list_categories`, `get_pricing`, `search`, `fetch`, `search_guidance`, `get_guidance`.

`search_guidance` and `get_guidance` search and read the tax guidance library (federal, California, Nevada and multistate topics, with primary-source citations). Guidance is educational, not tax advice; rows still under professional review are labeled "Unverified (pending professional review)".

## Network endpoints and credentials
- Calls only `https://mcp.slatestonefinancial.com/mcp`.
- Needs only the user's own Slate Stone API key from `SLATE_STONE_API_KEY`. No hooks, no commands, no shell, no file access, no telemetry.

## License
Plugin configuration: MIT. Slate Stone content and models: proprietary, under the terms at https://slatestonefinancial.com/terms/. Educational use only, not financial advice.
