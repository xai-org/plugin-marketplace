---
name: watch
description: Check what changed in the person's Neotask workspace and what needs them now. Use when the person asks what is happening in Neotask, how their runs are going, or to keep an eye on Neotask.
argument-hint: "[company]"
---

Give the person a short picture of their Neotask workspace now. $ARGUMENTS

1. Call `neotask_oversight_list` for what needs attention across their companies.
2. Call `neotask_approvals_list` for approvals waiting on them.
3. For the company the person named, or each company the oversight answer flags, call `neotask_company_runs_list` for recent runs.
4. Report, most urgent first:
   - what needs the person: approvals, questions, failing or paused work;
   - runs that started or finished;
   - anything that changed since the last check in this conversation, if there was one.
   Keep it short and name each company. Say plainly when nothing needs them.

This is a check, not a live feed: Grok Build receives no push events from Neotask, so each check reads the current state. To keep watching, the person can run `/loop 10m /neotask:watch`, which repeats this check every 10 minutes until they stop it.
