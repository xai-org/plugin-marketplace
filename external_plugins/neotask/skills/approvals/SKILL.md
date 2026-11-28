---
name: approvals
description: Show the Neotask approvals waiting on the person and help them decide. Use when the person asks what is waiting for them, what needs approval, or about a specific Neotask approval.
argument-hint: "[approval id]"
---

Show what is waiting for the person's approval in Neotask. $ARGUMENTS

1. Call `neotask_approvals_list`, or `neotask_approvals_get` when the person named one approval.
2. List the ones still waiting, newest first: what the agent wants to do, which agent and company asked, and when it expires. Say plainly when nothing is waiting.
3. For an approval the person wants to look at, call `neotask_approvals_get` and explain what approving would allow, in plain words.
4. The person decides, not Grok:
   - To decide in Neotask, create a review link with `neotask_approvals_handoff_create` and give the person the link. The link only opens the approval; it decides nothing.
   - Call `neotask_approvals_decide` only when the person has just said, in this conversation, to approve or deny that exact approval. Neotask still checks its own policy and may refuse; report its answer as it is.
5. After a decision, call `neotask_approvals_get` once to show the result.
