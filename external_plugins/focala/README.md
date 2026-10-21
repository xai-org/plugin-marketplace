# Focala for Grok Build

Ask Grok about your brand's AI search visibility, compare competitors, and turn
insights from your [Focala](https://focala.ai) workspace into next steps.

## Get connected

You need a Focala account and access to a workspace with monitored prompts.
New to Focala? A free trial is available at [focala.ai](https://focala.ai).

1. Open `/plugin` in Grok Build, search for **Focala**, and install it.
2. When prompted to connect, sign in to Focala in your browser.
3. Select the workspace you want Grok to use and approve the connection.
4. Return to Grok and ask: **“Give me an overview of my Focala workspace.”**

Choose **read access** to explore reports and tasks. Choose **manage access** if
you also want Grok to create or update monitored prompts and tasks. Managing
prompts and tasks requires an editor or admin role; viewers have read access.

You do not need an API key. Complete sign-in in your browser; never paste your
password or access tokens into chat.

## Ask about your performance

Try these requests, adding a date range, engine, or competitor when useful:

- “How has my brand's AI visibility changed over the last 30 days?”
- “Which competitors rank ahead of my brand on monitored prompts?”
- “Which prompts have the biggest visibility gaps?”
- “What are my highest-priority AI visibility recommendations?”
- “Show my AI referral traffic for the last 30 days by engine.”
- “Which content pages are getting traffic from AI search?”
- “Show my open tasks, including their status and priority.”

Ask follow-up questions to explore the evidence behind a result or turn findings
into a prioritized action plan.

## Manage prompts and tasks

With manage access and an editor or admin role, you can ask:

- “Create a task called Improve our comparison page copy.”
- “Add a monitored prompt: What are the best alternatives to [competitor]?”

Be specific about the changes you want. Assigning a task can notify the assignee,
and completing a task can run Focala's normal verification. New prompts follow
your workspace's monitoring schedule.

## Understand your results

Grok uses the workspace you selected when connecting. Reports depend on its
monitored prompts, available observations, and connected integrations. Asking a
question does not start a new monitoring run.

Missing data does not mean zero performance. Recommendation impact scores are
estimates, and a change in traffic after a content update does not prove the
update caused it.

## If something is missing

- **No results:** check that your selected Focala workspace has monitored prompts
  and observations for the requested dates. Try a wider date range.
- **Traffic reports are unavailable:** check your workspace's connected analytics
  integrations in Focala.
- **You cannot create or update a task or prompt:** check that your connection has
  manage access and your workspace role is editor or admin.
- **Sign-in is requested again:** follow the browser sign-in flow to reconnect.

## Your data and connection

The plugin connects to `https://app.focala.ai/api/mcp` to retrieve workspace data
and carry out requested changes. Focala's discovery and authorization endpoints
on `app.focala.ai` and its sign-in provider,
`https://respectable-bicycle-26.authkit.app` (authorization, registration, and
token endpoints), handle account connection. Each connection is limited to one
workspace and your permissions. Requested workspace data is returned to Grok.

## Help

[Contact support](https://focala.ai/contact) ·
[Privacy policy](https://focala.ai/privacy-policy) ·
[Terms of service](https://focala.ai/tos)

## License

The plugin files are [MIT licensed](LICENSE). Use of Focala's hosted service is
governed by its terms of service.
