# SaaSCity plugin for Grok Build

Plan a product launch from Grok Build. The agent audits your homepage the way directory scrapers and link-preview bots see it, picks launch directories out of 1,600+ with Ahrefs DR, link type and price, and turns them into a dated checklist. When you ask, it drafts a listing on [SaaSCity](https://saascity.io), the launch directory for SaaS and AI tools, for you to review.

## Installation

In Grok Build, open `/plugin`, search for **SaaSCity**, and install. There is nothing to sign in to and no API key: the server is keyless.

## What you get

- **MCP server** `saascity` at `https://saascity.io/api/mcp` (Streamable HTTP, no auth).
- **Skill** `launch-plan`: audit, fix the blockers, pick directories, write a dated checklist, and draft a SaaSCity listing only when the user asks for one.

### Tools

| Area | Tools |
|---|---|
| Launch audit | `check_launch_readiness` |
| Directories | `recommend_launch_directories`, `find_launch_directories`, `get_launch_directory`, `check_backlink` |
| SaaSCity listing | `get_offers`, `get_launch_weeks`, `submit_project`, `get_submission_status`, `check_badge` |
| Research | `search_listings`, `get_listing`, `find_alternatives`, `get_leaderboard` |
| SaaS metrics | `calculate_arr`, `calculate_arr_bridge`, `calculate_churn`, `calculate_nrr`, `rule_of_40`, `calculate_nps`, `ab_test_significance`, `markup_margin`, `uptime_downtime` |

Every tool is read-only except `submit_project`, which creates an inert draft and returns a claim link. Nothing is published or charged until a person opens that link, picks a plan and pays, and every listing is reviewed by a person.

## Network and credentials

- Calls one endpoint: `https://saascity.io/api/mcp`. `check_launch_readiness`, `check_badge` and `check_backlink` make the server fetch the public URLs you pass them.
- Needs no credentials and reads nothing from your machine.
- Rate limits are per IP: `submit_project` 5 per day, `check_launch_readiness` 20 per hour, the rest 30-60 per minute.

## Links

- Docs: https://saascity.io/mcp
- Source of the stdio bridge and the server metadata: https://github.com/nyyhao/saascity-mcp
- Support: support@saascity.io

## License

MIT
