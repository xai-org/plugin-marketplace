# ClawCall

ClawCall lets Grok Build place real phone calls on a user's behalf through an OAuth-protected hosted MCP server.

## Capabilities

- Place outbound calls to US phone numbers with a complete set of call instructions.
- Navigate phone menus and hold queues.
- Bridge the user into a live call when a person is reached.
- Poll call status and retrieve results, transcripts, and temporary recording URLs.
- List inbound and outbound call history, end an active call, and inspect plan or trial usage.
- Read ClawCall's hosted calling guide before placing a call.

## Authentication and permissions

The first connection opens ClawCall's OAuth 2.1 authorization flow. Users sign in to their ClawCall account and approve:

- `calls:read` for call status, transcripts, recordings, history, balance, and calling guides.
- `calls:write` for placing and ending calls.

No API key, local secret, environment variable, hook, or executable is bundled with this plugin.

## Network access

The plugin connects only to ClawCall's production service:

- `https://api.clawcall.dev/mcp` — Streamable HTTP MCP endpoint.
- `https://api.clawcall.dev/.well-known/*` and `https://api.clawcall.dev/{authorize,token,register,revoke}` — OAuth discovery, authorization, dynamic client registration, token, and revocation endpoints.

ClawCall's production service is hosted on Railway, and OAuth discovery may resolve to its canonical `api-server-production-465e.up.railway.app` origin.

## Safety and scope

Phone calls have real-world effects. Grok should confirm consequential instructions and decision boundaries before calling. The connector is currently limited to US phone numbers.

## Links

- [ClawCall](https://clawcall.dev)
- [Documentation](https://clawcall.dev/docs)
- [Source](https://github.com/ClawCall-Dev/ClawCall)
- [Privacy policy](https://clawcall.dev/privacy)
- [Terms of service](https://clawcall.dev/terms)

## License

The plugin configuration is distributed under the [MIT License](LICENSE). The hosted ClawCall service is governed by ClawCall's terms and privacy policy.
