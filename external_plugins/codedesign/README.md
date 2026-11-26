# CodeDesign for Grok Build

Build and manage websites with the official
[CodeDesign](https://codedesign.ai) hosted MCP server.

## Installation

Once accepted into the xAI marketplace, open `/plugin` in Grok Build, search
for **CodeDesign**, and install. Complete the host's OAuth connection flow
with your CodeDesign account. Nothing is installed locally and no API key or
credentials are bundled in this plugin.

Try: "Use CodeDesign to design a website for my bakery, then check it for SEO
issues."

## What it can do

- Design a website from a short description
- Edit pages and text, and add new pages
- Check a site for SEO issues
- Read form leads and analytics
- Publish a site to your own domain

Every tool is annotated as read-only or write. Delete actions require the
exact name of the item being deleted.

## Components and permissions

This plugin contains one HTTP MCP connection. It has no skills, scripts,
lifecycle hooks, local executables, or dependency installation. The connector
accesses only the sites and workspaces authorized for the connected
CodeDesign account.

## Network and authentication

- `https://mcp.codedesign.ai/mcp`: hosted MCP server (streamable HTTP).
- OAuth endpoints advertised by `mcp.codedesign.ai`: OAuth 2.1 with PKCE;
  dynamic client registration and client ID metadata documents are
  supported. Registration, authorization, and token exchange are handled by
  the MCP host.

A CodeDesign account is required. The host manages OAuth tokens; the plugin
does not read local secrets or environment variables.

## Ownership and license

Maintained by CodeDesign ([official GitHub organization](https://github.com/codedesignapp),
[MCP listing repo](https://github.com/codedesignapp/mcp)). Also published in
the official MCP Registry as `ai.codedesign/codedesign`. Docs:
https://codedesign.ai/chatgpt-claude. Contact: support@codedesign.ai. Plugin
files are MIT licensed.
