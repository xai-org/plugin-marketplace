---
name: neon
description: >-
  Overview of the Neon platform for apps and agents, spanning Postgres, Auth,
  Data API, and the new services: Object Storage, Compute Functions, and AI
  Gateway. Use whenever "Neon" is mentioned for an overview of how to work with Neon and how to get started. Otherwise, the individual capabilities are the triggers: "object storage" or "S3-compatible
  storage", "serverless functions", "background jobs", or
  "run code near my database", "AI gateway", "LLM proxy",
  "model routing", or "call an LLM" → AI Gateway; "database", "Postgres", or
  "authentication" → Postgres and Auth; "branch logs", "query logs",
  "observability", or "telemetry" → branch log APIs.
---

# Neon

Important: Neon is no longer just a Serverless Postgres provider. Neon is the backend for apps and agents with Serverless Postgres, Auth, Functions, Storage, and an AI Gateway: instant, branchable, serverless.

Use this skill as the starting point for anything Neon: get an overview of its capabilities, find your way around the Neon agent skills and documentation, and follow best practices for getting started and for branch-first development workflows.

## Platform Services

Neon bundles several backend primitives for building apps and agents that all branch together with your project:

- **Postgres** — Serverless Postgres that scales and branches with your app. _Generally available._
- **Auth** — Managed authentication with users and sessions stored in Postgres. _Generally available._
- **Object Storage** — S3-compatible object storage that branches with your projects. _Preview / early access._
- **Compute Functions** — Long-running serverless functions running close to your database — for WebSocket servers, long agent HTTP streams, APIs, and server-sent event servers. _Preview / early access._
- **AI Gateway** — One API for all frontier and open-source models, with routing, logging, and cost controls, powered by Databricks. _Preview / early access._

### Preview Service Availability

Object Storage, Compute Functions, and AI Gateway are preview (early access) features.

Early access features are only available on net-new projects created in the `us-east-2` region; they cannot be enabled on existing projects for now. Before guiding a user through any of these services, confirm they are working with a new project in `us-east-2`. If not, they will need to create a new project in that region. Then confirm the user already has early access; otherwise, point them to the private beta sign-up: https://neon.com/blog/were-building-backends#access.

## Neon Documentation

The Neon documentation is the source of truth for all Neon-related information. Always verify claims against the official docs before responding. Neon features and APIs evolve, so prefer fetching current docs over relying on training data.

### Fetching Docs as Markdown

Any Neon doc page can be fetched as markdown in two ways:

1. **Append `.md` to the URL** (simplest): https://neon.com/docs/introduction/branching.md
2. **Request `text/markdown`** on the standard URL: `curl -H "Accept: text/markdown" https://neon.com/docs/introduction/branching`

Both return the same markdown content. Use whichever method your tools support.

### Finding the Right Page

The docs index lists every available page with its URL and a short description:

```
https://neon.com/docs/llms.txt
```

Common doc URLs are organized in the topic links below. If you need a page not listed here, search the docs index: https://neon.com/docs/llms.txt. Don't guess URLs.

## Choosing the Right Skill

- Working with the database, connections, branching, autoscaling, or the CLI/MCP/API → `neon-postgres` (and `neon-postgres-branches` for branch workflows).

Dedicated skills for Object Storage, Compute Functions, and AI Gateway are coming as those preview services roll out.

### Installing the Right Skill

First check whether the target skill is already installed and accessible (for example, it appears in the available skills list or its `SKILL.md` is present). If it is, use it directly. If it is not installed, install it via the `skills` CLI with `npx`/`bunx`:

```bash
npx skills add neondatabase/agent-skills -s <skill-name>
```

Replace `<skill-name>` with the skill you need (for example, `neon-postgres` or `neon-postgres-branches`). Useful flags:

- `-g` — install globally instead of into the current project.
- `-y` — non-interactive mode (skip prompts).
- `-a <agent-name>` — pick the target agent(s) for non-interactive mode.

For example, to install the Postgres skill globally for a specific agent without prompts:

```bash
npx skills add neondatabase/agent-skills -s neon-postgres -g -y -a <agent-name>
```

## Getting Started with Neon

Use this section when guiding a user through first-time Neon setup, or when adding a new Neon service (Auth, object storage, functions, and so on) to a project that is already onboarded (for example, one already using Neon Postgres).

### Check Status Quo

Before starting setup, inspect the user's codebase and environment:

- Existing database connection code
- Existing `.neon` or `neon.ts` files in the workspace
- Existing Neon MCP server or Neon CLI configuration
- Existence of a `.env` file and `DATABASE_URL` environment variable
- Existing ORM (Prisma, Drizzle, TypeORM) configuration

### Self-Driving Setup With Neon's CLI or MCP Server

Offer to inspect existing connected Neon projects or create new ones using the Neon CLI or MCP server. If neither is set up yet, run `npx -y neonctl init`. Use `npx -y` to skip the package install prompt. Auth is handled automatically. If the user is not logged in, it opens their browser for OAuth and waits for completion before proceeding.

```bash
npx -y neonctl@latest init
```

This installs the Neon CLI and MCP server globally, installs the VSCode extension (for Cursor/VS Code), and adds the `neon` and `neon-postgres` agent skills to the project.

If `init` is not suitable, the individual steps can be run non-interactively, using the user's preferred package manager (npm, bun, pnpm):

- **CLI:** `npm i -g neonctl`
- **Extension:** `cursor --install-extension databricks.neon-local-connect`
- **MCP server:** `npx -y add-mcp https://mcp.neon.tech/mcp -g -n Neon -y -a <agent-name>`
- **Agent skill:** `npx skills add neondatabase/agent-skills --skill neon-postgres --skill neon --agent <agent-name> -y`

Prefer the CLI over the MCP server unless the user instructs otherwise, since it provides more capabilities, including deploying Neon Functions. For full CLI installation options, see https://neon.com/docs/reference/cli-install.md

### Setup Flow

Once the CLI, MCP server, and agent skills are installed, ensure the local workspace is linked to a Neon project through the `neonctl init` flow. If it isn't, run `npx -y neonctl link` to let the user interactively link a project. This produces a `.neon` file pointing to the organization, project, and branch the user wants to work with.

For Postgres-specific setup, consult the `neon-postgres` skill (and `neon-postgres-branches` for branch workflows). Dedicated skills for the other services are coming as they roll out.

### Resume Support

If resuming setup, check what's already configured (MCP connection, `.env` with `DATABASE_URL`, dependencies, schema) and continue from the next incomplete step.

### Security Reminders

Remind users to use environment variables for credentials, never commit connection strings, and use least-privilege database roles.

## Branch-First Dev Flow

Default to a branch-first loop that mirrors `git`: one isolated Neon branch per feature, so nothing leaks between features and there are no shared connection strings to copy around. Two commands drive it — `link` once per project, then `checkout` per feature — and a third, `env pull`, runs automatically under the hood so the branch you pin is immediately usable:

- `neonctl link` — Interactively links the workspace to a Neon org, project, and branch, writing the IDs to a git-ignored `.neon` file. Run once per project. Once linked, project- and branch-scoped commands no longer need `--project-id` or `--branch` (for example, `neonctl branch list`).
- `neonctl checkout <branch-name>` — Creates the branch if it doesn't exist, or checks out the existing one, by updating only the branch pointer in `.neon`. Run without a name for an interactive picker. It does not touch code or local Postgres.
- `neonctl env pull` — Fetches the current branch's Neon environment variables (`DATABASE_URL`, …) into your existing `.env`, or `.env.local` if you don't have one (override the target with `--file`). No branch ID needed; it reads `.neon`. **`link` and `checkout` run this for you by default**, so you rarely call it directly.

Run `link` once when starting on a project, then `checkout` per feature:

```bash
neonctl link                     # once; also pulls the linked branch's env
neonctl checkout dev-add-search  # per feature; also pulls the branch's env
```

Because `link` and `checkout` pull env by default, the branch's `DATABASE_URL` lands in your local `.env` automatically — build against it, then `checkout` the next branch and repeat. As the agent, drive this loop yourself: run `checkout` between tasks to get a fresh, isolated database per feature with no shared state to corrupt.

### Updating `.neon` without interactive prompts

Plain `neonctl link` / `neonctl checkout` prompt interactively, which an agent can't answer. Use one of these non-interactive paths instead:

- **`neonctl link --agent`** — a JSON state machine for agents. Each call returns a single JSON object with a `status` (`needs_org` → `needs_project` → `needs_project_details` → `linked`, or `error`), the available `options`, and the exact `next_command_template` to run next. Drive it step by step until `status: "linked"`. (Errors also come back as JSON with exit code 1, so you can always parse the result.)
- **`neonctl set-context --project-id <id> --org-id <id> --branch-id <id>`** — when you already know the IDs, write all three into `.neon` in one shot. This is a **destructive write**: it replaces the file's contents entirely with exactly these fields, so it's the most direct way to point `.neon` at a specific org / project / branch.

Both avoid prompts entirely; reach for `set-context` when you have the IDs and `link --agent` when you need to discover them.

### Opting out of local env vars

If env vars are injected at runtime instead of written to disk — or you simply don't want secrets in the working tree — pass `--no-env-pull` to `link` / `checkout` and supply the env another way:

- `neon-env run -- <your dev command>` (from `@neondatabase/env`) fetches the branch's vars from your `neon.ts` and injects them into the child process at runtime — no `.env` file needed. This is the runtime counterpart to the on-disk `env pull`.
- `neon-env export` (from `@neondatabase/env`) prints the branch's env to stdout as dotenv lines or, with `--format json`, JSON — for piping into another env manager rather than running a command. For example, [varlock](https://varlock.dev) can bulk-load it from a `.env.schema` with `@setValuesBulk(exec("neon-env export --format json"), format=json)`.
- `fetchEnv` from `@neondatabase/env` is the programmatic version of the same thing: resolve the branch's env in code at runtime instead of shelling out to `neon-env run`.
- `neonctl dev` injects the same vars into your local dev server — it's part of Neon Functions local development (a private preview feature).

When an agent should not write a local `.env`, instruct it (for example in your `AGENTS.md`) to run `neonctl checkout <branch> --no-env-pull` and rely on runtime injection.

For reading env you *already* have on disk (typed and validated against your `neon.ts`), use `parseEnv` — see [Neon Infrastructure as Code](#neon-infrastructure-as-code) below.

## Observability

Neon exposes branch-scoped service logs through a typed SDK and a Loki-compatible HTTP API. Logs currently require a project enrolled in the beta and located in `us-east-2`. The `@neon/sdk` API returns `404` with `reason: "telemetry_not_enabled"` when a branch cannot serve logs.

When the Neon MCP server is available, use its read-only `query_logs`, `list_log_fields`, and `list_log_field_values` tools for interactive agent work.

### Query logs with `@neon/sdk`

Use `neon.logs.query()` in application code. It returns a lazy paginated result:

```typescript
import { createNeonClient } from "@neon/sdk";

const neon = createNeonClient({ apiKey: process.env.NEON_API_KEY! });
const query = neon.logs.query(
  process.env.NEON_PROJECT_ID!,
  process.env.NEON_BRANCH_ID!,
  {
    source: "function",
    since: "1h",
    limit: 100,
    sort_order: "desc",
  },
);

const page = await query.page();
if (page.error) throw page.error;

console.log(page.data.items);
console.log(page.data.cursor); // pass to query.page(cursor) for the next page
```

`limit` applies to each page. Use `for await (const record of query)` to stream every page with errors thrown, or `query.all()` to collect every page in a `{ data, error }` result.

With default client settings, `neon.logs.fields(projectId, branchId)` returns `{ data: string[], error }`. `neon.logs.fieldValues(projectId, branchId, fieldName, query?)` returns `{ data: { values, is_truncated }, error }`. When `is_truncated` is true, narrow `since` or `source` before using the values as filters.

Use `source` to select `function` or `storage` records. The SDK type also accepts `pg_endpoint`, but that source has not been observed emitting records. Other structured filters include `service_name`, `scope_name`, `severity_text`, `minimum_severity`, `body_contains`, and `trace_id`. Some backends reject `minimum_severity`. `severity_text` is the fallback, but it is a case-sensitive exact match for one stored level, typically uppercase such as `ERROR`; it does not include higher levels.

An SDK query's time window defaults to one hour and cannot exceed seven days. Supply either `since` or `start_time`, not both. A raw `logql` expression replaces the structured content filters, but `limit`, `sort_order`, and the time window still apply.

The SDK and Loki-compatible HTTP API name the same selections differently:

| `@neon/sdk` | Loki-compatible HTTP |
| --- | --- |
| `source: "function"` | `entity_type="function"` label |
| `service_name`, `scope_name`, `trace_id`, `severity_text` | Same-named labels |
| `minimum_severity` | `severity_text=~` regex covering that level and above |
| `sort_order: "asc"` / `"desc"` | `direction=forward` / `backward` |
| `since`, `start_time`, `end_time` | `since`, `start`, `end` |

The SDK's `body_contains` filter maps to Loki's `|=` line filter.

### Query the Loki-compatible HTTP API

Use the direct HTTP surface for non-TypeScript clients or when a raw Loki response is required:

```bash
curl --get \
  "https://console.neon.tech/telemetry/v1/projects/${NEON_PROJECT_ID}/branches/${NEON_BRANCH_ID}/loki/api/v1/query_range" \
  --header "Authorization: Bearer ${NEON_API_KEY}" \
  --data-urlencode 'query={entity_type="function"}' \
  --data-urlencode 'since=1h' \
  --data-urlencode 'limit=100' \
  --data-urlencode 'direction=backward'
```

The response uses the Loki `streams` envelope. Errors use `{ "status": "error", "error": "..." }`. A query needs at least one stream-label matcher. This API accepts stream selectors and line filters, not aggregations, parsers, or formatting stages. Its `since` parameter uses Go durations such as `1h`; `start` and `end` accept RFC3339 timestamps or Unix nanoseconds.

The HTTP interface has no cursor pagination. `limit` caps one response, and a non-empty `warnings` array means records were dropped. Narrow the time window or filters and query again. Use `/labels` to list stream labels and `/label/{name}/values` to list values for one label. This HTTP surface is separate from the public Neon OpenAPI specification.

## Neon Infrastructure as Code

`neon.ts` is Neon's branch config and infrastructure-as-code file: declare which Neon services your project's branches should have, get type-safe env vars, and program branch settings — all in TypeScript. It's the config layer for Neon as a platform, and it composes with the branch-first loop above. Add it with `@neondatabase/config`:

```bash
npm i @neondatabase/config
```

```typescript
// neon.ts
import { defineConfig } from "@neondatabase/config/v1";

export default defineConfig({
  auth: true,
  dataApi: true,
});
```

### Provision services with neonctl config

Every project ships with serverless Postgres; `neon.ts` lets you also declare Neon Auth and the Data API today (Functions, buckets, and the AI Gateway are landing under a `preview` block). Reconcile the declaration from the CLI — the Neon equivalent of `terraform status` / `plan` / `apply`:

```bash
neonctl config status   # print the branch's live config
neonctl config plan     # dry-run diff of what apply would change
neonctl config apply    # provision the declared services
neonctl deploy          # alias for `neonctl config apply`
```

### Type-safe env vars with parseEnv

`@neondatabase/env`'s `parseEnv` takes your `neon.ts` config object and returns a parsed, typed env object, validated against the services you declared. The shape of `env` follows your config — enable `auth` and you get `env.auth`, enable `dataApi` and you get `env.dataApi` — and missing variables are flagged with clear errors (for you and your agents). Use it to read env you already have (typically pulled into `.env` by `checkout` / `env pull`); for fetching env at runtime without a file, reach for `fetchEnv` / `neon-env run` instead.

```bash
npm i @neondatabase/env
```

```typescript
import { parseEnv } from "@neondatabase/env/v1";
import config from "./neon";

const env = parseEnv(config);

console.log(env.postgres.databaseUrl);
console.log(env.auth.baseUrl);
```

### How checkout composes with neon.ts

When a `neon.ts` is present, `neonctl checkout` applies your policy as it **creates** a branch, so a fresh branch comes up with its declared settings and services already in place. Checking out an *existing* branch never reconciles it — apply config changes to it explicitly with `neonctl config apply` (or `neonctl deploy`). The bundled `env pull` also checks `neon.ts` against the linked branch and fails fast if the branch is missing a declared service, pointing you at `neonctl deploy` to provision it, so your local env and the remote branch never drift apart silently.

### Branch configuration

Beyond services, `neon.ts` can program what configuration *new* branches receive via the `branch` property — a function of the branch being evaluated that returns its settings:

```typescript
// neon.ts
import { defineConfig } from "@neondatabase/config/v1";

export default defineConfig({
  auth: true,
  dataApi: true,
  branch: (branch) => {
    if (branch.exists) {
      // leave existing branches untouched
      return {};
    }
    if (branch.name.startsWith("dev")) {
      return {
        ttl: "7d", // clean up the branch after 7 days
        postgres: {
          computeSettings: {
            autoscalingLimitMinCu: 0.25, // scale to zero
            autoscalingLimitMaxCu: 1, // keep it cheap
            suspendTimeout: "5m",
          },
        },
      };
    }
    return {};
  },
});
```

The `branch` function receives the target branch (its `name`, whether it `exists` yet, whether it's the default, and more) and returns the tuning you want. Here new `dev-*` branches get a 7-day TTL so they clean themselves up, plus a cheap scale-to-zero compute profile, while existing branches and everything else fall through to the defaults. Because `neonctl checkout` applies this policy on create, a fresh `dev-*` branch comes up with these settings already in place.
