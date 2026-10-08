# Perfloop plugin for Grok Build

Perfloop: always-on performance engineering for teams where performance is the
product.

This plugin connects Grok Build to the Perfloop MCP server at
`https://app.perfloop.ai/mcp`. With it, Grok can submit a branch or a pull
request and read the ranked hypotheses Perfloop finds on the change. It can
read a Case's evidence and measurements, start or stop work on it, steer it
with feedback, and decide what waits in the Inbox. Perfloop opens pull
requests. It cannot approve or merge one, and it cannot deploy.

## First run

1. Sign up at [perfloop.ai](https://perfloop.ai), or accept an invitation to a
   workspace.
2. An Admin connects GitHub and selects repos in Setup in the Perfloop app.
   Perfloop works only on selected repos.
3. Install this plugin in Grok Build (below) and sign in with your Perfloop
   account.
4. Ask Grok to list your Perfloop Cases, or to submit your branch.

The agent guide, with each job as exact tool calls, is at
[perfloop.ai/docs/work/mcp](https://perfloop.ai/docs/work/mcp).

## Installation

In Grok Build, open `/plugin`, search for **Perfloop**, and install. On first
connection, Grok opens the Perfloop sign-in page in your browser. No API key
is needed, and nothing goes into chat.

## What you get

- **MCP server** `perfloop` at `https://app.perfloop.ai/mcp` (Streamable HTTP,
  OAuth 2.1). Every tool has a title and `readOnlyHint`, `destructiveHint`,
  and `openWorldHint` annotations. Tools that start work say so, because that
  work is paid from the workspace's Usage balance.

Tool reference: [perfloop.ai/docs/work/mcp](https://perfloop.ai/docs/work/mcp).

## Authentication and network

The plugin holds no code and no credential. It only tells Grok where the
Perfloop MCP server is. Authentication is OAuth 2.1 authorization code with
PKCE; Grok registers its client and runs the flow.

Network endpoints:

- `https://app.perfloop.ai/mcp`: the MCP server (Streamable HTTP)
- `https://app.perfloop.ai/.well-known/oauth-protected-resource`: discovery metadata
- `https://auth.perfloop.ai`: the authorization server, with the sign-in and consent pages

Credentials: a Perfloop account. Grok sends its tool calls and their
arguments to `app.perfloop.ai`; Perfloop does not receive the conversation
history. The workspace role of the signed-in user decides what Grok can read
or change, and every write is recorded under that account.

## License

MIT for the files in this plugin. Use of Perfloop is governed by the
[terms](https://perfloop.ai/terms) and the [privacy policy](https://perfloop.ai/privacy).
