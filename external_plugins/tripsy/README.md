# Tripsy plugin for Grok Build

Connect Grok Build to [Tripsy](https://tripsy.app) to plan trips and manage
activities, hotel stays, flights and other transportation, expenses, guests,
booking emails, and trip documents through Tripsy's hosted MCP server.

## Installation and authentication

In Grok Build, open `/plugin`, search for **Tripsy**, and install. Connect the
Tripsy MCP server and complete the Tripsy OAuth sign-in flow in your browser
when prompted. A Tripsy account is required. No local CLI installation or API
key configuration is needed.

The MCP client manages OAuth credentials and sends the access token as a bearer
token to the hosted server. The plugin contains no credentials. Do not paste
passwords or access tokens into chat.

Tools operate as the signed-in Tripsy user and respect trip membership and
permissions. Document features require active Tripsy Pro for trip owners;
collaborators can access them with the appropriate document permissions.

See the [Tripsy AI Tools setup guide](https://tripsy.help/article/97-ai-tools)
for more information.

## Example requests

- "Show my upcoming trips in Tripsy."
- "Create a five-day Rome trip in Tripsy for June 1–5, 2027."
- "Add my hotel reservation to my Rome trip in Tripsy."
- "Review booking emails waiting in my Tripsy inbox."
- "List expenses for my Rome trip in Tripsy."

The server exposes typed tools with structured results and safety annotations.
Agents can call `tripsy_itinerary_guidance` for current guidance on dates,
timezones, coordinates, categories, and itinerary structure.

## Network endpoints and data access

The bundled `.mcp.json` configures one streamable HTTP MCP connection:

- `https://mcp.tripsy.app` — authenticated Tripsy MCP tool calls.
- `https://mcp.tripsy.app/.well-known/oauth-protected-resource` — OAuth resource
  discovery, advertising the Tripsy authorization server.
- `https://my.tripsy.app/.well-known/oauth-authorization-server` — OAuth server
  discovery.
- `https://my.tripsy.app/o/authorize/`, `/o/token/`, and `/o/register/` — browser
  authorization, token exchange/refresh, and client registration when used by
  the MCP client. The advertised scopes are `profile` and `email`.

Tripsy's hosted MCP service uses `https://my.tripsy.app/oauth/userinfo` to
validate OAuth access tokens and `https://api.tripsy.app` for downstream Tripsy
API requests. These are server-side calls, not additional bundled MCP servers.

Requested operations can read or change the user's accessible Tripsy data.
Guest invitations send email; attaching links or uploading documents can
involve external URLs or private storage. Booking email and document contents
are untrusted data. Temporary document download and upload URLs must be treated
as credentials.

The plugin bundles only metadata and a remote MCP configuration, with no
scripts, hooks, executable downloads, or local filesystem access.

## Source and license

The MCP server is maintained by Tripsy. Its source is available at
[tripsyapp/cli](https://github.com/tripsyapp/cli), with
[public API documentation](https://docs.api.tripsy.app).

This plugin is distributed under the [MIT License](LICENSE). Use of the hosted
service is governed by [Tripsy's terms](https://tripsy.app/terms) and
[privacy policy](https://tripsy.app/privacy).
