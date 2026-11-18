# SignalDock

Published market reports, earnings history and optional account research through
SignalDock's hosted MCP server.

## Connect

This package configures one Streamable HTTP server:
`https://www.signaldock.app/api/mcp`.

Install the `signaldock` plugin from the marketplace after its catalog entry is
approved. Until then, add the endpoint directly in an MCP-compatible client.
Use this configuration for a client accepting an `mcpServers` JSON object:

```json
{
  "mcpServers": {
    "signaldock": {
      "type": "http",
      "url": "https://www.signaldock.app/api/mcp"
    }
  }
}
```

This repository contains the connection package and documentation, not the hosted
server implementation. No local server process or package installation is needed.
Installing the package does not authorize access to a SignalDock account.

Public reports and earnings history work without sign-in. A client that supports
OAuth authorization-code flow with PKCE and dynamic client registration can ask
the user to sign in at `www.signaldock.app` for protected tools. Review the requested
permissions in the browser. No publisher key or shared credential is bundled.

## Capabilities and permissions

The server exposes twelve read-only tools. Public access includes fifteen market
reports, retained earnings history and published simulated Trading Agent sessions.
The reports include Macro, SMSI, Options Report and weekly Predictor earnings
outlooks. Predictor describes predicted moves beyond the options-implied move
where available, alongside market expectations.

- `research:read`: company research, price forecasts, options questions,
  comparisons and archive access.
- `portfolio:read`: supplied-holdings analysis and saved or broker-linked
  portfolio reads.
- `workspace:read`: Rules, Notes, Trades and saved Snapshot reports/settings.
- Account context requires both private permissions because it includes a broker
  summary. Existing research-only consent does not expand automatically.

These tools do not place or change orders, transfer funds, synchronize brokers,
edit Workspace data or trigger report emails. Responses retain dates and coverage
limits. Revoke each client connection in
[Settings → Integrations](https://www.signaldock.app/workspace/settings?tab=integrations).

## Example requests

- Read the latest SignalDock SMSI score, trend and source date. Review the
  risk-management logic I provide against that reading and explain assumptions.
- Read the latest Macro report and compare its dated GDP and inflation evidence
  with the earnings-model assumptions I provide.
- Compare my authorized saved portfolio holdings with the published Options
  Report. Cite contract dates, volume/open interest and IV; state missing coverage
  and do not call IV elevated without a comparable baseline.
- Analyze supplied portfolio holdings using historical daily risk metrics.
  Separate single-stock 63-day simulations are not a joint 63-day portfolio VaR
  or a maximum possible loss. State the horizon and confidence level explicitly.

## Network and data

The configuration contacts only `https://www.signaldock.app/api/mcp`. Account
consent uses the authorization endpoints advertised by that same SignalDock
origin. User queries and authorized research inputs go to SignalDock. No hooks,
local commands, executables, filesystem access, telemetry or credential reads are
included in this package. The hosted service and third-party market data are not
redistributed with the package.

## Links and license

- [Setup and examples](https://www.signaldock.app/faq#integrations)
- [Privacy](https://www.signaldock.app/privacy)
- [Terms](https://www.signaldock.app/terms)
- Support: support@signaldock.app

See [LICENSE](LICENSE). SignalDock retains its rights; third-party market data
and trademarks are not licensed by this connection package. Research and
information only, not investment advice. A prepared catalog submission is not
marketplace approval or a claim of native-client verification.
