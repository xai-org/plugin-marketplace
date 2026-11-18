# Ridekick for Grok Build

Ridekick gets you offers from car dealerships: each dealership's out-the-door price, in writing. This plugin connects Grok Build to Ridekick, so it can read your Ridekick requests and the offers that come back. The Ridekick screen where you approve Grok Build shows what you allow it to do.

You need a Ridekick account in the United States.

## Installation

In Grok Build, open `/plugin`, search for **Ridekick**, and install. On first use, Grok Build opens the Ridekick sign-in in your browser. Sign in with the email code, then approve Grok Build on the Ridekick screen. Nothing needs to be pasted into chat.

## What you get

- **MCP server** `ridekick` at `https://www.ridekick.com/api/mcp` (Streamable HTTP, OAuth 2.1).

Network: it connects to one server, https://www.ridekick.com/api/mcp, with your Ridekick sign-in. It needs no other credentials.

Privacy: Dealerships get your phone and email when you choose to share them to pick a time to visit or lock in an offer. See https://www.ridekick.com/privacy.

## What this plugin is

This plugin is the files in this folder: `.grok-plugin/plugin.json`, `.mcp.json`, `README.md` and `assets/logo.png`. There is no code here and no secret. The Ridekick service it connects to is operated by Ridekick Corp. under Ridekick's own [Terms of Service](https://www.ridekick.com/terms) and [Privacy Policy](https://www.ridekick.com/privacy), and is not part of the plugin. Support: https://www.ridekick.com/support

## License

These files are licensed under the MIT License, copyright Ridekick Corp. The license covers these files only. It does not license the Ridekick service, the ridekick.com website, or the Ridekick name and logo.
