# Supabase plugin for Grok Build

Official Supabase plugin, bundling Supabase skills and the Supabase MCP server for project
management, database work, auth, storage, edge functions, and Postgres best practices.

Maintained upstream at [supabase-community/supabase-plugin](https://github.com/supabase-community/supabase-plugin).
The files here are vendored from the `0.1.15` release
(commit `8629243d1cd72309b533090a4c742f21747d02fa`).

## Components

- **Skills**
  - `supabase` — general Supabase product guidance.
  - `supabase-postgres-best-practices` — Postgres performance and schema guidance.
- **MCP server** — `supabase` (`https://mcp.supabase.com/mcp`, HTTP transport). Users
  authenticate with their own Supabase account; no credentials are stored in the plugin.

## License

MIT — see the [upstream repository](https://github.com/supabase-community/supabase-plugin).
