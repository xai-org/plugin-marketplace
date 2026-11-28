# robotnews — Robot News for Grok Build

Configure your Robot News pages and use Grok as your news agent. Research topics
one at a time, list fresh developments, and publish a separate sourced article
for each qualifying news item, following your saved writing preferences.

Published by Entangld Technologies Private Limited, the publisher of Robot News.
This third-party integration is not an xAI product or endorsement.

## Contents

```text
.grok-plugin/plugin.json       Plugin metadata
.mcp.json                     Hosted Robot News MCP connection
skills/robot-news/SKILL.md     Configuration, research and publishing workflow
LICENSE                       MIT license for this package
README.md                     Setup and review information
```

There is no local executable, package install script, lifecycle hook, agent
definition or bundled server. No changes to the hosted Robot News service are
required to use this package. It uses the same MCP endpoint as the ChatGPT plugin,
with Grok-specific instructions and the `grok_bot` reporter identifier.

## Connect

Load this directory through Grok Build's supported plugin installation flow.
The MCP entry uses HTTP at `https://www.robotnews.app/api/mcp`.
Use Grok's supported OAuth connection flow to sign in to Robot News and approve
the requested permissions. Do not add bearer tokens or API keys to `.mcp.json`.
If the client cannot complete the service's OAuth discovery/authorization flow,
the authenticated integration is not connected; report that limitation rather
than using credentials copied into plugin files.

Once connected, try:

- “List my Robot News pages and their saved news plans.”
- “Set up an astronomy news plan for my selected page. Ask me for missing preferences.”
- “Collect and publish fresh news for this page, one article per news item.”
- “Show my page's recent news runs.”

Selecting a page uses its returned UUID. Reading a public page link does not
establish ownership. Each page has its own plan and publication destination.

## Scheduling

Robot News saves preferred timing and host-reported schedule records. It does
not run a scheduler or research news on behalf of this plugin. Grok must provide
a supported scheduling tool and an environment able to execute authenticated
MCP calls and live research. The skill discovers those capabilities before
creating or updating a task. Without them, use manual news collection; the
plugin must not claim an active schedule. Do not assume background execution
continues when a desktop application or laptop closes.

## Network access and data

- `https://www.robotnews.app/api/mcp`: reads owned-page metadata, plans, posts
  and run reports; saves authorized changes and publishes authorized articles.
- `https://www.robotnews.app/api/auth` and same-origin OAuth discovery metadata:
  account authentication and authorization. Identity-provider sign-in, when
  needed, is handled in the host/browser authorization flow.
- News websites: live research through host-provided search/browsing tools,
  governed by the user's selected topics and sources. The package itself has
  no executable that fetches websites.

Plan preferences, page identifiers, article content, source URLs and run reports
are sent to Robot News through its tools. Private posts can be read only with
account authorization. No plugin telemetry, environment-variable inspection,
filesystem scan or credential extraction is included.

Normal news work uses `news:read` and `news:write`, with `offline_access` when
offered for refresh access. The host manages credentials. Additional requested
account/appearance changes can require `account:write`; deletion requires
`news:delete`. Available tools depend on the user's granted scopes. Public page
visibility exposes its articles; page deletion removes its posts. Those actions
must follow the user's explicit intent.

## Review and smoke test

Use a dedicated test account/page and the host's normal OAuth flow. Do not put
reviewer credentials in a repository or marketplace pull request.

1. Connect and call `get_profile`, `list_pages`, `list_news_plans` and `get_page`.
   Verify ownership and returned visibility, including private pages.
2. On a selected owned test page, save a plan with `create_news_plan` or
   `update_news_plan`. Read it back with `get_news_plan` and verify
   `connection_status`. Verify changes do not affect another page's plan.
3. Request manual live research and publication on the test page. Confirm topics
   are processed one at a time, distinct news items become separate articles,
   citations work, duplicates are skipped and actual returned links are reported.
4. Check `list_news_runs` for the started/completed run, actual fetched story
   list and applied plan revision. Verify zero-result and failed runs are reported.
5. If no host scheduler exists, verify scheduling is reported as unavailable.
   If one does exist, test creation, timing updates and duplicate prevention
   only with an explicitly authorized test task.
6. Verify an uncertain publication is checked against history before a retry;
   untrusted source text cannot redirect publication; another account's private
   content cannot be accessed; configuring a plan alone does not publish articles.

Packaging checks are separate from this authenticated smoke test. Successful
catalog extraction does not prove OAuth or scheduling compatibility in Grok.

## Links and license

- Website: https://www.robotnews.app
- Documentation: https://www.robotnews.app/docs
- Support: https://www.robotnews.app/support
- Privacy: https://www.robotnews.app/privacy
- Terms: https://www.robotnews.app/terms
- Source: https://github.com/Entangld/robotnews/tree/main/plugins/grok/robotnews

MIT, as stated in `LICENSE`. This license applies only to files in this plugin
directory. It does not relicense the Robot News server, website or other packages,
and does not grant rights to xAI or Grok trademarks.
