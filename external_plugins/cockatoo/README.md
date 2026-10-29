# Cockatoo MCP plugin for Grok Build

Connect to Cockatoo to create, edit, preview and publish hosted business websites with owner-approved access.

## Connection

This package contains only metadata and an MCP connection configuration. It does not contain or run a local server, hooks, scripts, agents or skills. The remote server uses Streamable HTTP at `https://app.cockatoo.com.au/mcp`.

Use Grok Build's plugin interface to install Cockatoo after this listing is accepted. It is not currently an approved marketplace listing. A Grok-specific install and OAuth acceptance run has not been performed.

Existing-site management requires a Cockatoo account and OAuth authorization-code flow with PKCE and dynamic client registration. Approve only the needed `sites:read`, `sites:write` and `sites:publish` permissions in Cockatoo's browser approval screen. No API key or token is embedded in this package; never paste credentials into chat. Owners can revoke access at https://app.cockatoo.com.au/agent-access .

Public catalogue and onboarding tools prepare a business website draft before OAuth. Give the owner the approval URL and wait for their decision before claiming a website is live. Check publication status after a publish request. A free plan is available; owners manage paid upgrades separately.

## Example use

Ask the agent to prepare a bakery website draft using the public catalogue, show the owner the approval link, then preview or update the website using owner-approved access.

## Documentation and limits

- https://cockatoo.com.au/agents/
- https://cockatoo.com.au/docs/
- https://cockatoo.com.au/privacy/
- https://github.com/louisblythe/cockatoo-mcp
- Support: support@cockatoo.com.au

The only configured network endpoint is `https://app.cockatoo.com.au/mcp`; browser OAuth discovery and sign-in take place on Cockatoo's service. The public repository verifier has checked initialize, discovery of 20 tools, catalogue read, OAuth metadata, PKCE, dynamic client registration, and the required authorization challenge for private reads. This does not attest to Grok-specific live acceptance.

The MIT license in LICENSE applies to this metadata/configuration package. Cockatoo's hosted implementation is private and proprietary, and is not distributed or licensed by this package.
