# IPGeolocation.io for Grok Build

Official IPGeolocation.io MCP server with 17 tools for accurate IP geolocation, company information, ASN and network data, IP security (VPN, proxy, Tor, bot, hosting and spam detection), abuse contacts, time zones, astronomy, currency data and user-agent parsing.

The plugin runs the published npm package locally over stdio. Node.js 22 or later is required. It follows npm's latest tag and supports paginated retrieval of cached results. Available data depends on your IPGeolocation.io plan.

## Setup

Install IPGeolocation.io from Grok Build's Marketplace, or use the CLI:

```bash
grok plugin install ipgeolocation-io-mcp --trust
```

Set `IPGEOLOCATION_API_KEY` in the private environment that launches Grok Build, then start a new session. Grok expands that variable at startup. The plugin configuration contains the variable reference. `get_my_ip` works without a key. The authenticated API tools need a key, and cached-result retrieval uses the same key as the original lookup.

Use `grok mcp doctor ipgeolocation --json` to check connectivity and tool discovery.

## Data and connections

- `api.ipgeolocation.io`: API requests for the tools, including keyless public-IP discovery.
- `registry.npmjs.org`: downloads the published npm package and dependencies when needed.

The launcher adds one MCP server. It includes no hooks, skills, install scripts or telemetry. IP addresses, user-agent strings and other lookup inputs are sent to IPGeolocation.io when the corresponding API tools run. Cached-result retrieval reads the current server process's memory.

[Tool and setup documentation](https://github.com/IPGeolocation/ipgeolocation-io-mcp#readme) · [Privacy policy](https://ipgeolocation.io/privacy.html) · [Support](mailto:support@ipgeolocation.io)

License: MIT. Source: [IPGeolocation/ipgeolocation-io-mcp](https://github.com/IPGeolocation/ipgeolocation-io-mcp).
