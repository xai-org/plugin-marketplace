# BatchData for Grok Build

Connects Grok Build to the hosted [BatchData MCP server](https://batchdata.io/mcp-server): U.S. real estate property, ownership and contact data for AI agents (property lookup, comparable properties, property search, skip tracing, phone compliance checks, address verification and geocoding, property datasets and investor buy boxes).

- **Server:** `https://mcp.batchdata.com` (Streamable HTTP, hosted by BatchData; nothing runs locally)
- **Authentication:** OAuth 2.1 browser sign-in with a BatchData account on first use (PKCE, dynamic client registration). A BatchData account is required.
- **Network endpoints this plugin uses:** `https://mcp.batchdata.com` only. The plugin ships no scripts, hooks, skills or agents, and reads no local files or environment variables.
- **Source and docs:** https://github.com/batchdataco/batchdata-mcp-server · https://developer.batchdata.com/
- **Support:** support@batchservice.com
- **License:** MIT (this plugin's configuration files). The BatchData MCP server, API and data are proprietary and governed by the BatchData terms of service.
