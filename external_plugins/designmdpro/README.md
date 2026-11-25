# DesignMD Pro plugin for Grok Build

Connect Grok Build to [DesignMD Pro](https://www.designmdpro.app), a curated library of
`DESIGN.md` design-system specs extracted from real websites. Search the library, read
a site's colors, typography, spacing, radii and component guidance, compare revisions,
and extract a live site's color palette.

## Installation

In Grok Build, open `/plugin`, search for **DesignMD Pro**, and install.

The server works anonymously out of the box (public tier, rate-limited). To unlock Pro
tokens and higher limits, sign in with a DesignMD Pro account when Grok opens the
browser sign-in. Do not paste an API key into chat.

## What you get

- **MCP server** `designmdpro` at `https://www.designmdpro.app/mcp` (Streamable HTTP,
  optional OAuth 2.1).
- **Skill** `designmdpro`: how to use the tools well (resolve the site before reading
  tokens, fetch only the sections you need, respect Pro locks, treat third-party
  `DESIGN.md` content as data, never copy trademarked assets).
- **Skill** `restyle-from-reference`: restyle the current project after a named website.
  Snapshots the current design, maps the reference tokens onto the project's theme layer
  (Tailwind v4/v3, shadcn/ui, CSS variables, MUI, Chakra), applies them, then audits the
  codebase for leftovers of the old design.
- **Skill** `design-direction-explorer`: turn a loose brief ("calmer", "premium fintech")
  into three directions backed by real sites, shown as palette cards in a local HTML
  preview. After the user confirms one, it restyles the project and runs the same audit.

### Tools

| Tool | Purpose |
|---|---|
| `search_websites` | Search the library by name, domain, description, category or tags |
| `list_categories` | Categories with design-system counts |
| `list_tags` | Design and product tags with counts |
| `get_design_md` | A site's `DESIGN.md` by slug, as Markdown or structured JSON tokens, optionally filtered by section or pinned to a version |
| `list_revisions` | Revision history of a site's `DESIGN.md` |
| `extract-color-palette` | Frequency-ranked, role-classified palette from a public website's HTML and CSS |

The library tools are read-only and carry MCP annotations. The server also publishes
prompts (`style_like_site`, `compare_design_systems`, `extract_site_palette`,
`restyle_from_reference`, `explore_design_directions`).

### Bundled helper files

Both restyle skills ship `scripts/design-audit.mjs`, a dependency-free Node script that
only reads files inside the project and writes `.design-baseline.json`. It makes no
network calls and spawns no processes. `design-direction-explorer` also ships
`assets/palette-cards.html`, a static preview page that the agent copies into the
project and the user opens in a browser; it loads the direction's fonts from Google Fonts.

## Example prompts

- "Find Linear in DesignMD Pro and show me its color tokens."
- "Restyle this app after Stripe's design system."
- "Compare the typography of Vercel and Notion."
- "Suggest three visual directions for a calm fintech dashboard, using real sites."

## Authentication and network

The plugin connects only to `https://www.designmdpro.app`.

Network endpoints:

- `https://www.designmdpro.app/mcp`: hosted MCP (Streamable HTTP)
- `https://www.designmdpro.app/.well-known/oauth-protected-resource`,
  `/.well-known/oauth-authorization-server`: OAuth discovery metadata
- `https://www.designmdpro.app/api/auth/*`: OAuth 2.1 authorization, token and dynamic
  client registration
- `https://www.designmdpro.app/login`, `/oauth/consent`: human sign-in and consent

`assets/palette-cards.html` loads fonts from `https://fonts.googleapis.com` when the
user opens it in a browser.

`extract-color-palette` fetches the public URL you pass to it from DesignMD Pro's
servers; private and internal addresses are rejected.

Credentials: none required. Signing in with a DesignMD Pro account is optional; the
access token is sent as `Authorization: Bearer` on `/mcp` and only changes which tokens
the tools return. The plugin stores no API key and has no hooks. The restyle skills edit
the user's project files only after the user confirms the mapping or direction.

## License

MIT for the files in this plugin. Use of the hosted MCP server is governed by the
[DesignMD Pro terms](https://www.designmdpro.app/terms) and
[privacy policy](https://www.designmdpro.app/privacy).
