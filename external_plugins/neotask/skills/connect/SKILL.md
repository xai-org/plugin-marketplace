---
name: connect
description: Connect Grok to the person's Neotask account and confirm what it can do there. Use when the person asks to connect, sign in to or set up Neotask, or when a Neotask tool answers that sign-in is needed.
---

Connect this session to Neotask and report what the connection can do.

1. Call `neotask_capabilities`. If it answers, the connection is already signed in: go to step 3.
2. If the Neotask tools are missing or answer that sign-in is needed, tell the person to sign in themselves:
   - Run `/mcps`, select the `neotask` server and press `i` to authenticate.
   - Neotask's sign-in opens in the browser. They sign in as themselves, choose the Neotask account Grok works in and the access to give (view only, or view and make changes), then return here.
   - Never ask for a password, a sign-in code or a token in the conversation. The sign-in happens only in the browser.
   Then call `neotask_capabilities` again.
3. Call `neotask_companies_list`.
4. Report in a few lines:
   - who the connection acts for, the account and its plan;
   - whether it can make changes or only view;
   - the companies it can reach, by name;
   - anything the capabilities answer marks as needing setup, such as a runner to enroll, in the words Neotask used.

The person can see and revoke this connection at any time in Neotask's settings, under connected agents.
