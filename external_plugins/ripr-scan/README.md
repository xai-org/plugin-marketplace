# Ripr Scan for Grok Build

Read-only Solana token intelligence in Grok Build. Ask about a token's price, liquidity, trades, holders, launch history, or risk signals, and Grok answers using the hosted Ripr Scan MCP server. It never trades, signs transactions, moves funds, or writes data.

## Use it

Install the plugin, then sign in when Grok first connects by entering an email address or handle on the Ripr Scan page. No API key is needed. Then ask, for example:

- Search Ripr Scan for the BONK token and summarize its intelligence bundle.
- Summarize the holder concentration and risk signals for EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v.

## Network endpoints and credentials

- **Endpoint:** `https://mcp.riprscan.com/mcp`, the Ripr Scan MCP server. It is the only endpoint this plugin calls. It receives the tool inputs for your request: token and wallet addresses, SQL text, and Solana RPC calls.
- **Credentials:** OAuth 2.0 sign-in with PKCE. The plugin stores no credentials and reads no local files or environment variables.

The plugin runs no local code, and has no hooks or scripts. Documentation: https://mcp.riprscan.com/docs. Privacy: https://mcp.riprscan.com/legal/privacy. Terms: https://mcp.riprscan.com/legal/terms. Support: team@riprscan.com.

Outputs are informational and are not financial advice.
