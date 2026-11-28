---
name: run-task
description: Give one of the person's Neotask agents a task and start it. Use when the person asks Neotask, a Neotask company or one of their Neotask agents to do something.
argument-hint: "[what the agent should do]"
---

Give a Neotask agent the work the person asked for: $ARGUMENTS

1. If the request does not say what to do, ask for it in one question before calling anything.
2. Find where the work belongs:
   - **A company's work** (the person named a company, or the work is for one of their businesses): call `neotask_companies_list`, then `neotask_company_agents_list` for that company.
   - **A workspace agent** (the person named an agent that belongs to no company): call `neotask_agents_list`.
   If more than one agent fits, ask which one, listing their names. Never guess between agents or companies.
3. Create the task. Use a new `idempotencyKey` for each new task, and reuse a key only to retry the same call.
   - For a company: `neotask_company_tasks_create`. The company's plan and its agents then run it. If Neotask answers `no_current_plan`, the company has no plan yet: offer to start one with `neotask_company_plan_drafts_create`, with this task as its first task, and create it only if the person agrees. A new plan waits for the person's approval in Neotask.
   - For a workspace agent: `neotask_tasks_create` with a short `name`, the person's request as the `instruction` and the agent's `agentId`, then start it with `neotask_runs_create` and the returned task id.
4. Report what Neotask answered:
   - saved or started: the task, the agent or company and, for a run, its id; offer to check on it with `neotask_runs_get` or `neotask_company_tasks_get`;
   - waiting for approval: say so, and offer `/neotask:approvals`;
   - not started because setup is needed (for example `setup_required` with `runner_not_enrolled`, `runner_offline`, or an agent with no computer): say what Neotask said is missing. A saved task can be started again once the setup is done.

Report Neotask's answer as it is. Never say work started or finished unless the tool answer says so. Never create paid resources, such as a cloud computer, unless the person asks for that themselves.
