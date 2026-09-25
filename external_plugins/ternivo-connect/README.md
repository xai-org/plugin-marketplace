# Ternivo Connect plugin for Grok Build

Connect Grok Build to [Ternivo Connect](https://ternivo.app/social-delivery), an OAuth-protected social delivery platform for managing approved social-media workflows from an AI agent.

## What it does

Ternivo Connect exposes organization-scoped tools for:

- discovering connected social accounts and connection health;
- checking provider-specific capabilities;
- preflighting content and media;
- publishing or scheduling approved posts;
- verifying delivery and retrieving delivery receipts;
- diagnosing failures and retrying only failed destinations;
- reviewing analytics and inbox activity;
- replying where the connected provider and organization policy allow it.

Ternivo enforces the signed-in organization's permissions, approval rules, destination visibility, provider capabilities, and write policies on every action. Provider passwords and raw provider tokens are never returned to Grok.

## Installation

In Grok Build, open the plugin marketplace, search for **Ternivo Connect**, and install it.

On first connection, Grok should open the Ternivo OAuth sign-in and authorization flow in the browser. Authenticate with your Ternivo account and approve the requested access. Do not paste provider passwords, social-network tokens, or Ternivo access tokens into chat.

## Authentication and network access

The plugin connects to:

- `https://app.ternivo.app/mcp` — Ternivo Connect remote MCP endpoint (streamable HTTP);
- `https://app.ternivo.app/mcp/oauth-protected-resource` — OAuth protected-resource metadata;
- `https://kqdkgxinzdxkwcojmzvl.supabase.co/auth/v1` — authorization server advertised by the MCP metadata.

Authentication is OAuth-based. The plugin itself contains no API key, social credential, or embedded secret. Access is scoped to the signed-in Ternivo organization and the social accounts that organization is authorized to use.

## Write safety

Ternivo Connect supports controlled write operations, including publishing, scheduling, replies, approvals, retries, and related actions. Server-side policy remains authoritative:

- destination and visibility must be permitted;
- provider capability restrictions are enforced;
- organization approval requirements can block writes;
- delivery acceptance is tracked separately from terminal delivery success;
- retries are isolated to the selected failed delivery where supported;
- provider credentials are never exposed through MCP responses.

## Support, privacy, and terms

- Product: https://ternivo.app/social-delivery
- Support: https://ternivo.app/connect/support.html
- Privacy: https://ternivo.app/connect/privacy.html
- Terms: https://ternivo.app/connect/terms.html

## License

Proprietary. Use of Ternivo Connect is governed by Ternivo's Terms of Service.
