# VideoGen for Grok Build

Create product ads, narrated videos, and media with the official
[VideoGen MCP connector](https://videogen.io/videogen-mcp).

## Installation

Once accepted into the xAI marketplace, open `/plugin` in Grok Build, search
for **VideoGen**, and install. Complete the host's OAuth connection flow with
your VideoGen account. No API key or credentials are bundled in this plugin.

Try: "Use VideoGen to create a 15-second vertical product ad from this brief,
add captions, and export an MP4."

## Components and permissions

This plugin contains one HTTP MCP connection and one workflow skill. It has
no scripts, lifecycle hooks, local executables, or dependency installation.
The connector accesses projects and media authorized for the connected account.
Generation and export may consume VideoGen credits according to the account's
plan and the requested operation. The skill itself grants no permission to
perform operations the user has not requested.

## Network and authentication

- `https://mcp.videogen.io/mcp`: hosted MCP tools and guidance over HTTP.
- OAuth discovery and endpoints advertised by `mcp.videogen.io`: client
  registration, authorization, and token exchange handled by the MCP host.
- `https://app.videogen.io`: VideoGen account sign-in and project deep links.
- Upload and download URLs returned by tools: transfer only user-requested
  media using those operation-specific URLs.

An authenticated VideoGen account is required. The host manages OAuth tokens;
the plugin does not read local secrets or environment variables. Authentication
compatibility and real generation should be verified in Grok Build during review;
this submission has been statically validated, not exercised in that host.

## Ownership and license

Maintained by VideoGen ([official GitHub organization](https://github.com/video-gen)).
Contact: support@videogen.io. Plugin files are MIT licensed; use of the hosted
service is governed by [VideoGen's terms](https://videogen.io/terms-of-service) and
[privacy policy](https://videogen.io/privacy-policy).

## Updating the submission

Keep this folder in sync with `external_plugins/videogen` in the xAI marketplace.
After updating the vendored files, run the marketplace's
`python3 scripts/generate-plugin-index.py`, `python3 scripts/validate-catalog.py`,
and `python3 scripts/generate-plugin-index.py --check`, then submit a PR.
