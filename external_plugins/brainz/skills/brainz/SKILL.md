---
name: brainz
description: >-
  Work with a Brainz vault through the Brainz MCP server: pull a curated briefing
  of the specs, decisions and code areas that govern a task, search and read
  concepts, write new product knowledge back, and claim, create and complete
  tasks on the shared work pile. Use when the user mentions Brainz, a Brainz
  vault, brainz.brownmatter.ai, or asks for product context, specs or tasks that
  live in their Brainz graph.
---

# Brainz

Brainz (https://brainz.brownmatter.ai) is a shared product-knowledge graph for
agent fleets. A vault holds concepts (domains, features, stories, specs,
workflows, decisions, constraints, glossary entries and tasks) linked by typed
relations (`part_of`, `realized_by`, `governs`, `depends_on`, ...) and anchored
to the codebase through `codeAreas` paths. The `brainz` MCP server bundled with
this plugin acts on the one vault the user picked when signing in.

## Authentication

The server signs in with OAuth, and the token is scoped to one vault. Brainz
lets clients list its tools without signing in, so the tools show up before the
user has authenticated. If a Brainz tool call fails with `Auth required` or a
401:

- Tell the user to open `/mcps`, select **brainz** under **Plugin: brainz**,
  press `i` and approve access in the browser. The tools work after that, with
  no restart.
- If the user has no browser (headless or CI runs), point them to the API-key
  fallback in the plugin README: a `brainz` server in their Grok config that
  sends `Authorization: Bearer ${BRAINZ_API_KEY}`.
- A 401 saying "workspace expired unclaimed" means the API key belongs to a
  provisional workspace that was never claimed. The user needs a new key, or
  can sign in with OAuth instead.
- Never ask the user to paste a key or token into chat, and never print, log or
  commit one.

## Before changing code in a Brainz-tracked product

1. Call `get_context` with a `query` describing the task (or `ids` of concepts
   you already know). It returns a markdown briefing, with code areas, of the
   specs and decisions that govern that area. When delegating to a subagent,
   paste the briefing into its prompt.
2. Use `search_concepts` when you don't know which concept ids exist, and
   `get_related` to see what else a change touches.
3. If a result says the vault is not onboarded, tell the user and offer to run
   `onboard {action: "start"}`. It returns a playbook for indexing the product.
   Follow it, then finish with `onboard {action: "complete", summary}`.

## After the work

- Record new decisions, features and constraints with `upsert_concept`, with
  `codeAreas` pointing at where they live. Add a missing edge with
  `link_concepts`.
- File follow-up work you found but did not do with `create_task`.
- If a response carries a staleness notice, offer to run `sync`. It returns a
  playbook for bringing the graph back in line with the code.

## Tasks

| You want to | Use |
|---|---|
| See open, taken or done work | `list_tasks {taskStatus?, domain?}` |
| Claim a task and get its briefing | `take_task {id?, takenBy?}` |
| Finish a task | `complete_task {id, outcome}`, then `upsert_concept` for what changed |
| Turn a finding into work | `create_task {title, body, domain?, realizes?, governedBy?, codeAreas?}` |

After implementing a taken task, check the result against every spec the task is
`governed_by`. Fix or file a task for any gap before completing it.

## Other tools

- `get_concept {id}`: one note with its direct neighbours.
- `list_concepts {type?, tag?}` and `vault_stats {}`: what the vault holds.
- `delete_concept {id}`: removes a concept. Confirm with the user first.
- `dream {action: "status" | "diary" | "revert" | "configure"}`: the vault's
  nightly consolidation. `revert` undoes one dream. Change the configuration
  only when the user asks.
- `session_hook {client?}` (API-key connections only, not OAuth): returns
  steps for adding a Brainz primer to the project's agent rules. It does not edit anything itself. Apply the steps only
  when the user asks for that.
