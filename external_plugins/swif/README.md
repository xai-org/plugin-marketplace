# Swif.ai UEM

Your Swif devices and people

Swif.ai is a UEM software platform that connects Grok to your unique Swif.ai device management tenant. This plugin can be used to control your Macs, Windows, Linux, iOS and Android devices with Chromebooks and GoogleBooks coming soon.

You can ask about your organization's devices, employees, teams, and the applications and browser extensions installed across your fleet. Find devices by team, owner or status. See who is in a team. Check which apps or extensions a device runs, or find every device with a given application. Add an employee, or move one to another team, when you ask and after confirming the details with you.

Swif cannot change, lock or wipe devices, and cannot delete employees from this tool for your organization's safety. You can connect with your Swif API key, and only your organization's data is visible.

This is designed for IT and security teams that manage their devices with Swif. This requires a Swif.ai UEM account and an API key from the Swif admin console.

## Installation

In Grok Build, open `/marketplace`, find **swif**, and press `i`. Or from the terminal:

```sh
grok plugin install swif --trust
```

On first use, open `/mcps`, select **swif** and press `i`. Grok opens the Swif connect
page in your browser. Enter a Swif API key from the Swif admin console there, once.
Never paste the key into chat.

You need a Swif.ai account and an API key from the Swif admin console. US and EU
organizations both connect through the same server.

## What you get

- **MCP server** `swif` at `https://mcp.swifteam.com/mcp` (Streamable HTTP, OAuth 2.1).
- **Skill** `swif`: how to use the Swif tools well. Resolve teams by id before
  filtering, use Swif's own compliance verdict, report incomplete pages and scans, and
  confirm before either write.

### Tools

| Tool | What it does | Writes |
|---|---|---|
| `list_teams` | The organization's teams and their ids | no |
| `list_devices` | Devices with owner, OS, encryption, last check-in, team, and Swif's compliance verdict with reasons. Can filter by team | no |
| `list_employees` | Employees, filterable by team | no |
| `list_device_applications` | The apps installed on one device | no |
| `list_device_extensions` | The browser extensions on one device | no |
| `find_devices_with_application` | Every device that has a given app | no |
| `create_employee` | Adds an employee: name, one email, and optional position, department and team | yes |
| `update_employee_team` | Moves an employee to another team. Changes nothing else | yes |

Every tool carries MCP annotations (`readOnlyHint`, `destructiveHint`,
`idempotentHint`), so Grok can tell a lookup from a change before calling it.

## Example prompts

- "Which devices are in the QA team?"
- "How many devices in the QA team are compliant, and why are the others not?"
- "Which devices have Zoom installed?"
- "What browser extensions are on Jane Doe's laptop?"
- "Add Jane Doe, jane@example.com, to the QA team."

## Authentication and network

The plugin connects only to `https://mcp.swifteam.com`. Authentication is OAuth 2.1
authorization code with PKCE and dynamic client registration; Grok handles the flow and
receives the callback on `http://127.0.0.1:<port>/callback` on your own computer.

Network endpoints:

- `https://mcp.swifteam.com/mcp`: hosted MCP (Streamable HTTP)
- `https://mcp.swifteam.com/api/auth/oauth2/authorize`, `/token`, `/register`,
  `/revoke`, and `/api/auth/jwks`: OAuth 2.1 and dynamic client registration
- `https://mcp.swifteam.com/.well-known/oauth-protected-resource/mcp` and
  `/.well-known/oauth-authorization-server`: discovery metadata
- `https://mcp.swifteam.com/connect`: the page where you enter your Swif API key during
  sign-in

Credentials: a Swif API key. You enter it once on the Swif connect page in your browser.
Swif stores it encrypted on its servers, tied to that connection, and uses it to call
the Swif API for your organization. Grok receives only an OAuth token for the Swif MCP
server, never the API key. Grok stores that token locally in
`~/.grok/mcp_credentials.json`, as it does for every OAuth MCP server.

The plugin ships no code, hooks, commands or agents, and requests no filesystem or shell
access.

To stop using the plugin, uninstall it with `grok plugin uninstall swif`. To cut off
access entirely, revoke the API key in the Swif admin console; the connection stops
working on its next call.

## Support

- Website: https://swif.ai
- Support: https://swif.ai/support, support@swif.ai
- Privacy policy: https://swif.ai/privacy-policy
- Terms: https://swif.ai/terms

## License

MIT for the files in this plugin. Use of the hosted Swif MCP server and the Swif
service is governed by the [Swif terms](https://swif.ai/terms) and
[privacy policy](https://swif.ai/privacy-policy).
