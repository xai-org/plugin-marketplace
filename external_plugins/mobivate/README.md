# Mobivate for Grok Build

Send SMS messages via Mobivate
[Mobivate MCP connector](https://wiki.mobivatebulksms.com/~gitbook/mcp).

## Installation

Once accepted into the xAI marketplace, open `/plugin` in Grok Build, search
for **Mobivate**, and install.

### First Authenticate
Log into [Mobivate Hub](https://hub.mobivate.com) and collect your API Key.
Try: "Authenticate {api key}"


### Send your first message
Try: "Send an SMS message with Mobivate to 447900000000 from 'GROK' saying 'HELLO WORLD'"

## Components and permissions

This plugin contains one HTTP MCP connection and one workflow skill. It has
no scripts, lifecycle hooks, local executables, or dependency installation.
The connector is restricted by API Key privilages to what it can execute and perform.
The skill itself grants no permission to perform operations the user has not requested.

## Network and authentication

- `https://wiki.mobivatebulksms.com/~gitbook/mcp`: hosted MCP tools and guidance over HTTP.
- `https://hub.mobivate.com`: Mobivate account sign-in and project deep links.
- `https://vortex.mobivatebulksms.com`: SMS Gateway and API Endpoint.


An authenticated Mobivate account is required. The host manages API Keys;
the plugin does not read local secrets or environment variables. Authentication
compatibility and real generation should be verified in Grok Build during review;
this submission has been statically validated, not exercised in that host.

## Ownership and license

Maintained by Mobiavte ([official GitHub organization](https://github.com/mobivate)).
Contact: support@mobivate.com. Plugin files are MIT licensed; use of the hosted
service is governed by [Mobivate's terms](https://www.mobivate.com/legal/bulksms/terms-of-service) and
[privacy policy](https://www.mobivate.com/legal/data-protection).

## Updating the submission

Keep this folder in sync with `external_plugins/mobivate` in the xAI marketplace.
After updating the vendored files, run the marketplace's
`python3 scripts/generate-plugin-index.py`, `python3 scripts/validate-catalog.py`,
and `python3 scripts/generate-plugin-index.py --check`, then submit a PR.
