# Zyfai MCP connector

Zyfai provides non-custodial DeFi yield discovery, strategy information, portfolio positions and analytics using a hosted MCP server.

- Website: https://zyf.ai
- Source: https://github.com/ondefy/zyfai-mcp-server
- Setup instructions: https://zyf.ai/setup.md
- Video demo: https://screen.studio/share/wDf9LiA2
- MCP endpoint: `https://mcp.zyf.ai/mcp` (HTTPS Streamable HTTP)

## Configuration and permissions

The connector calls the Zyfai-hosted `mcp.zyf.ai` endpoint. Public yield discovery can be used without a funded wallet. Personal portfolio queries and account operations require authentication through Zyfai's OAuth flow. No wallet private key or API key should be entered into Grok. Supported transaction preparation flows require a separate handoff and user wallet approval in the Zyfai app; the MCP connector does not sign or execute blockchain transactions independently.

License: ISC (declared by the upstream `zyfai-mcp-server` package). See the upstream repository for implementation, security details and terms.
