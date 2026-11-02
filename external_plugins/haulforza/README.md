# HaulForza plugin for Grok Build

Connect Grok Build to [HaulForza](https://www.haulforza.com), the trucking business OS for
carriers and dispatchers. Look up loads, drivers, brokers and rates, get monthly revenue,
driver pay and expenses, and create loads or update a load's status after you confirm.

## Installation

In Grok Build, open `/plugin`, search for **HaulForza**, and install.

On first connection, Grok opens the HaulForza sign-in in your browser. Authorize with your
HaulForza account. No API key is needed and nothing should be pasted into chat.

## What you get

- **MCP server** `haulforza` at `https://www.haulforza.com/mcp` (Streamable HTTP, OAuth 2.1).
- **Skill** `haulforza`: how to use the HaulForza tools (confirm the company, prefer
  read-only tools, show and confirm before any write, never invent data).

### Tools

| Tool | Kind | What it does |
|---|---|---|
| `list_companies` | read-only | Companies the signed-in user belongs to |
| `list_loads` | read-only | Loads for a company (broker, stops, rate, drivers, status) |
| `get_load` | read-only | Full detail for one load |
| `list_drivers` | read-only | Drivers for a company |
| `company_summary` | read-only | Revenue, driver pay and expenses for a period |
| `create_load` | write (non-destructive) | Create a new load; asks for confirmation |
| `update_load_status` | write (destructive) | Change a load's status; confirmation required |

Every tool carries MCP annotations (`readOnlyHint`, `destructiveHint`), and write tools are
only available when the user's HaulForza role allows them.

## Example prompts

- "Show me my delivered HaulForza loads."
- "Give me the details for load HF-1234."
- "Summarize October revenue, driver pay and expenses."
- "Which drivers are active?"
- "Create a load from Dallas to Houston for $1,800."

## Authentication and network

Authentication is OAuth 2.1 authorization code with PKCE and dynamic client registration,
discovered via RFC 9728 protected-resource metadata; Grok handles the flow. HaulForza uses
Supabase Auth as its authorization server.

Network endpoints:

- `https://www.haulforza.com/mcp`: hosted MCP (Streamable HTTP)
- `https://www.haulforza.com/.well-known/oauth-protected-resource`, `/.well-known/oauth-authorization-server`: discovery metadata
- `https://ynbqqjksevqbwjyavctq.supabase.co/auth/v1/oauth/authorize`, `/oauth/token`, `/oauth/clients/register`: OAuth 2.1 + DCR (HaulForza's Supabase Auth project)
- `https://www.haulforza.com`: human sign-in and consent screen during authorization

Credentials: a HaulForza account. The access token is sent as `Authorization: Bearer` on
`/mcp`. The plugin stores no API key, ships no hooks or scripts, and requests no filesystem
or shell access. Tools act only on data the signed-in user can already see in HaulForza.

## Support

- Privacy: https://www.haulforza.com/privacy
- Terms: https://www.haulforza.com/terms
- Support: https://www.haulforza.com/support · support@haulforza.com

## License

MIT for the files in this plugin (see `LICENSE`). Use of the hosted HaulForza service is
governed by the [HaulForza terms](https://www.haulforza.com/terms) and
[privacy policy](https://www.haulforza.com/privacy).
