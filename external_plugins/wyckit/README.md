# Wyckit for Grok Build

Explore Wyckit's shared design components and public releases, validate supplied designs, and prepare drafts for review and saving in Wyckit.

This package contains one remote MCP connection. It installs no binary, shell hook, local server, model or background process. Marketplace submission and acceptance are separate from this prepared package.

## Connection

Endpoint: `https://connectors.wyckit.com/mcp`.

Transport: Streamable HTTP. Authentication: none. The public tools do not read private projects, use local files, save account content, share, publish, purchase or run an AI. No credentials or environment variables are configured by this package.

## Try it

- “Show me Wyckit's calendar and poll building pieces and inspect the calendar's requirements.”
- “Prepare a Wyckit interface project called Review workspace and give me a link to review it.”
- “Inspect a published Wyckit component and export its exact verified manifest.”

[Reviewer walkthrough and synthetic sample](https://connectors.wyckit.com/review/).

Open a prepared review in Wyckit, sign in normally if needed, and explicitly save there. A valid graph or signature does not imply executable capabilities or permission. Plot creation is being updated; the launch examples focus on Design.

## Network and data handling

- Grok Build sends selected tool arguments to `https://connectors.wyckit.com/mcp` and receives results.
- The connector's public catalog tools read `https://build.wyckit.com`; no arbitrary host is selected by tool input.
- Review links open `https://build.wyckit.com` or `https://wyckit.com` in the user's browser.
- The connector does not require passwords, API keys, tokens or private account data. The assistant provider sees submitted content and returned results.

The `.mcp.json` file configures only the connector endpoint. It does not grant permission to save, publish, share or execute anything in Wyckit.

## Privacy Policy

[Connector data handling](https://connectors.wyckit.com/privacy.html) supplements [Wyckit's Privacy Policy](https://auth.wyckit.com/privacy). Avoid confidential content in testing. The public connector processes tool inputs without persisting submitted documents in an application content database; infrastructure request metadata may be recorded. Destination applications store content only after authenticated saving.

## Support and license

[Connector support](https://connectors.wyckit.com/support.html), or support@wyckit.com.

Proprietary. Copyright 2026 Wyck I.T. Solutions LLC. Use of the hosted service is governed by [Wyckit's Terms](https://auth.wyckit.com/terms). This prepared package does not grant an open-source license to the hosted service or the rest of the Wyckit codebase.
