# Mugpipe for WordPress

Hosted MCP server that lets Grok Build read and change a WordPress site you connect: drafts, a content audit, and high-impact changes after you confirm.

## Installation

In Grok Build, open `/plugin`, search for **Mugpipe for WordPress**, and install.

On first connect you sign in to Mugpipe. No API keys are stored in the plugin, and nothing should be pasted into chat. Connecting a site uses a WordPress application password entered on a Mugpipe page, not in the chat.

## What you get

- **MCP server** `mugpipe-for-wordpress` at `https://wp.mugpipe.com/mcp` (streamable HTTP, OAuth).
- **Skill** `mugpipe-for-wordpress`: connect a site, read posts and pages, save drafts, and apply high-impact changes only after you confirm.

Documentation: https://mugpipe.com/wordpress/docs

Pricing: 7-day free trial, then $9/month on [mugpipe.com](https://mugpipe.com).

## Authentication and network

The plugin file declares a single HTTP MCP server. There are no lifecycle hooks, scripts, or local executables, and the plugin does not read local secrets, tokens, or environment variables.

Network endpoints:

- `https://wp.mugpipe.com/mcp` — hosted MCP (streamable HTTP). This is the only endpoint in `.mcp.json`.
- `https://auth.mugpipe.com` — sign-in and OAuth for that MCP host. Scopes are `wordpress:read` and `wordpress:write`.
- `https://mugpipe.com` — product, documentation, and legal pages.

Credentials: a Mugpipe account. The access token stays with the MCP host. No API key is stored in the plugin. A WordPress application password is entered on the Mugpipe connection page returned by the connect tool, never in the chat. High-impact writes need a confirmation token from the matching plan tool.

Privacy: https://mugpipe.com/legal/wordpress/privacy · Terms: https://mugpipe.com/legal/wordpress/terms

Support: support@mugpipe.com

Mugpipe for WordPress is an independent tool and is not affiliated with or endorsed by the WordPress Foundation. WordPress is a trademark of the WordPress Foundation.

## License

Proprietary (service). Plugin config files in this directory may be redistributed with the marketplace.
