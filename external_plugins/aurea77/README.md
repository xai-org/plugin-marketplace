# Aurea77

![Aurea77](assets/icon.png)

Connect your own [Aurea77](https://aurea77.com) athlete account to prepare for sporting events, organize logistics, record existing registrations and results, manage equipment, and read your backend-generated insights.

## Review status

This is an initial marketplace submission for Grok Build. The production MCP service and the three workflows have been connected in Grok web, where `get_my_profile` and `list_my_events` with `page=1` and `per_page=1` succeeded on 2026-10-15. The event read returned an empty list. These are actual authenticated browser-client reads, not Grok Build acceptance tests. No account data or screenshots are bundled here.

**Grok Build OAuth setup remains a release gate.** The existing production public Grok client is registered to the exact hosted callback `https://grok.com/connectors-oauth-exchange-code/`. Grok Build uses a loopback callback (`http://127.0.0.1:<port>/callback`) and needs its own compatible client registration/configuration. The Aurea77 server currently supports preregistered public clients and does not implement dynamic client registration. This package does not reuse the hosted client's ID or embed credentials. The draft PR should not be merged as an immediately usable Grok Build integration until that separate flow is configured and verified. The existing Grok web connection remains operational.

## Package contents

- `aurea77-setup`: link the athlete's own account and continue their chosen task.
- `aurea77-event-journey`: event discovery, existing registrations, preparation, travel, stays, pickup logistics and athlete-reported race results.
- `aurea77-equipment-community`: equipment inventory and edits, awarded badges and visible post text.
- One remote HTTP MCP declaration pointing to the existing production Aurea77 service.

The workflows reuse the canonical Aurea77 instructions; only their skill names are prefixed. There are no hooks, local servers, executables, dependency installers, agents, client secrets, access tokens or reviewer credentials in the package.

## Capabilities and boundaries

The service exposes 28 focused account tools: 16 reads and 12 controlled updates. The API enforces account ownership, visibility, OAuth scopes, revisions, idempotency and computed state. Tools can read your profile, event information, preparation, logistics, recorded results, equipment, awarded badges and permitted post text. With the appropriate consent they can record or update selected athlete profile fields, existing registrations, checklist items, logistics, results and equipment.

Before a write, the workflow previews the exact target and fields and requests confirmation. Existing-resource edits require the current backend revision; confirmed operations use a fresh UUID idempotency key. Collections are paginated. Unknown values are not treated as zero, and readiness insights remain backend-generated state.

External registrations and results are athlete-reported records. The integration does not register with organizers, make bookings, buy equipment, take payments, certify official race results, grant badges, edit posts, send messages or delete equipment. Private files, booking references, medical-certificate fields, post images, comments and messages are excluded.

## Authentication and network access

You need your own Aurea77 athlete account. Enter credentials only on Aurea77's sign-in page and review the permissions on its consent screen. Never paste a password, access token or refresh token into chat or plugin files. Each user authorizes their own account; installing the package grants no account access.

The remote service uses authorization code with S256 PKCE, public clients without a client secret, exact registered callback/resource validation and rotating refresh tokens. Eight read scopes cover profile, events, preparation, insights, logistics, equipment, badges and post text. Six separate write scopes cover profile, preparation, event registrations, logistics, results and equipment. Request only the permissions needed for the chosen task; old read consent does not authorize updates.

Network endpoints used by the integration:

- `https://api.aurea77.com/mcp/aurea77-grok`: OAuth-required account MCP transport.
- `https://api.aurea77.com/.well-known/oauth-protected-resource/mcp/aurea77-grok`: exact resource and authorization-server discovery.
- `https://api.aurea77.com/.well-known/oauth-authorization-server`: authorization-server metadata.
- `https://api.aurea77.com/chatgpt/oauth/authorize`: human sign-in and explicit consent.
- `https://api.aurea77.com/chatgpt/oauth/token`: authorization-code and refresh exchange.
- `https://api.aurea77.com/chatgpt/connections`: user-controlled connection revocation.

The server requires the exact resource `https://api.aurea77.com/mcp/aurea77-grok` in authorization and token requests. The working manual Grok web setup specifies the token endpoint as `https://api.aurea77.com/chatgpt/oauth/token?resource=https%3A%2F%2Fapi.aurea77.com%2Fmcp%2Faurea77-grok`, with token authentication `none`. That browser configuration is evidence for the hosted client only; it is not a substitute for configuring and testing the Grok Build loopback flow.

The package requests no shell or local filesystem access. Account data is returned only by the remote tools the user invokes. The instructions do not collect telemetry or inspect local credentials. Grok processes returned content under the applicable xAI terms; Aurea77 persists user-requested changes and consent/audit metadata under its existing service policies.

Disconnect from the host or [Aurea77 connected accounts](https://api.aurea77.com/chatgpt/connections). Revocation prevents future access; earlier conversation copies are governed by the host's data controls.

## Example prompts

- "Show my Aurea77 profile and next recorded events."
- "Show my preparation tasks and missing travel information for my next event."
- "Help me record my existing event registration and BIB."
- "Show my Aurea77 equipment and preview updating an item."

For pre-merge review, complete the Build-specific OAuth configuration first, then read the connected profile and one paginated collection. Confirm unauthorized access is denied and a second user receives only their own account data. Write execution, refresh after expiry and disconnect have automated backend coverage but have not been live-verified in Grok Build. Do not execute a real mutation without a concrete user-authorized target and independent readback.

## Publisher, license and support

This submission is made from the Aurea77 owner's personal GitHub account, `pedlima`. The package retains the existing Aurea77 public-package author, MAIDOT, and its `Proprietary` license designation. This submission does not relicense the service or backend source; the backend source is not included.

[Website](https://aurea77.com) | [Support](https://aurea77.com/support) | [Privacy policy](https://aurea77.com/privacy-policy) | [Service terms](https://aurea77.com/terms-conditions)
