# Apollo Invoicing

Connect Grok Build to your Apollo invoicing account through the official remote MCP service maintained by Studio 404 d.o.o.

## Connect

Install Apollo Invoicing from the marketplace, then open `/mcps` and authenticate the `apollo-invoicing` server. Sign in with your Apollo account, select your business and environment, and approve read-only access first. Read/write access is optional and requires a suitable role. An existing Apollo account and entity are required.

Manual connection before marketplace approval:

```sh
grok mcp add --transport http apollo-invoicing https://eu.spaceinvoices.com/mcp/r/wlr_156199db8087faa6901fdb63ed664604
```

## Try it

- List my overdue invoices.
- Find Acme and show its latest invoices.
- Summarize unpaid invoices by currency.
- Create a draft invoice for my monthly retainer (requires read/write consent).

## Tools and permissions

`search_operations` finds available business operations; `describe_operation` returns the selected operation's schema; `execute_read` runs permitted reads; `execute_write` performs permitted changes and external effects. Read-only connections do not expose `execute_write`.

Each connection is bound to the Apollo user, account, entity, environment and OAuth resource. Existing permissions are checked for every operation. Review the operation and arguments before approving writes. Revocation is available in Apollo Settings → Integrations. Do not automatically retry an uncertain write outcome.

## Network and data

The plugin contains only metadata and remote MCP configuration. Its service endpoint is:

https://eu.spaceinvoices.com/mcp/r/wlr_156199db8087faa6901fdb63ed664604

The Space Invoices platform hosts Apollo's dedicated white-label resource. OAuth discovery, registration, authorization, token and revocation endpoints are on `https://eu.spaceinvoices.com`; Apollo sign-in uses `https://v2.getapollo.io`. OAuth handles credentials; no API key or environment variable is embedded or required by this package. Invoice/customer data is returned to the connected AI client only under the user's authorization.

- Website: https://getapollo.io/global/en/
- Privacy: https://getapollo.io/global/en/privacy/
- Service terms: https://getapollo.io/global/en/terms/
- Support: support@getapollo.io
- MCP technical reference: https://docs.spaceinvoices.com/guides/mcp

## License

The integration configuration and documentation are MIT licensed; see LICENSE. Apollo service access remains governed by its service terms. The Apollo logo remains the property of its owner and is included only to identify this integration.
