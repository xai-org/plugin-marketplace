# runsonwhat plugin for Grok Build

[runsonwhat](https://www.runsonwhat.com) shows the tools a company runs on, and the companies that run on a tool, with the public evidence behind every match: DNS records, certificate logs, website code, tag-manager containers, subprocessor lists and public job boards.

This plugin adds one skill, `runsonwhat`, so Grok can answer questions like:

- "What tech stack does stripe.com use?"
- "Which companies in Germany use HubSpot?"
- "Who started using Intercom in the last 30 days?"

## What's included

| Component | Path | Purpose |
|---|---|---|
| Skill | `skills/runsonwhat/SKILL.md` | When and how to read runsonwhat's public pages and API |

No MCP server, hooks, commands or scripts. The skill only tells Grok which URLs to read and how to present the results.

## Setup

Nothing is required for the public pages: company, tool, country and category pages each have a Markdown copy (`<page>.md`).

For full company lists, filters and the starts/stops feed, create an API key at https://www.runsonwhat.com/account/api and set it in your environment:

```bash
export RUNSONWHAT_API_KEY=row_live_...
```

API calls use credits; see https://www.runsonwhat.com/docs.

## Network endpoints and credentials

| Endpoint | Why | Credential |
|---|---|---|
| `https://www.runsonwhat.com/company/<domain>.md`, `/reverse/<tool>.md`, `/reverse/<tool>/<country>.md`, `/tools.md`, `/tools/<category>.md` | Public Markdown copies of runsonwhat pages | none |
| `https://www.runsonwhat.com/api/v1/*` | runsonwhat API (company lookups, tool customer lists, changes, usage) | `RUNSONWHAT_API_KEY`, sent only as `Authorization: Bearer` to runsonwhat.com |

The skill tells Grok never to print the key or send it to any other host, and to ask before calls that would spend many credits.

## Support

hello@runsonwhat.com · API docs: https://www.runsonwhat.com/docs

## License

MIT, see [LICENSE](LICENSE).
