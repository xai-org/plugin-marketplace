# Brainz for Grok Build

Connect Grok Build to [Brainz](https://brainz.brownmatter.ai), a shared
product-knowledge graph for agent fleets. Before coding, Grok pulls a briefing of
the specs, decisions and code areas that govern the task. After coding, it writes
what changed back, so the next agent starts from the same picture. A vault also
holds a task pile that several agents can claim from.

## Installation

1. In Grok Build, open `/plugins`, search for **Brainz** and install it, or run
   `grok plugin install brainz --trust`.
2. Sign in: open `/mcps`, select **brainz** under **Plugin: brainz** and press
   `i`. Grok opens https://brainz.brownmatter.ai in your browser. Sign in (or
   create an account), pick the vault Grok may use and approve. Grok stores the
   tokens and refreshes them itself, so you do this once per machine.

Until you sign in, Grok still connects and lists the Brainz tools, but every
tool call fails with `Auth required`. Brainz lets clients list its tools without
a token, so Grok does not start the sign-in by itself.

Try: "Use Brainz to get the context for the checkout flow before you change it."

### Fallback: API key

For headless or CI runs where no browser is available, use a Brainz API key
instead. Create one in your vault's settings (each key is scoped to one vault),
put it in the environment Grok starts from, and define a `brainz` server in
your Grok config. It replaces the plugin's server of the same name:

```sh
export BRAINZ_API_KEY=bz_...
grok mcp add --transport http brainz https://brainz.brownmatter.ai/mcp \
  --header 'Authorization: Bearer ${BRAINZ_API_KEY}'
```

Keep the single quotes: Grok expands `${BRAINZ_API_KEY}` when it loads the
config, so the key itself is never written to `~/.grok/config.toml`. Run
`grok mcp remove brainz` to go back to OAuth.

## Components and permissions

This plugin contains one HTTP MCP connection and one skill. It has no scripts,
lifecycle hooks, local executables or dependency installation. The MCP tools
read and write concepts and tasks in the one vault you picked when you signed
in (or that the API key belongs to), and nothing else.

## Network and authentication

- `https://brainz.brownmatter.ai/mcp`: the hosted Brainz MCP server (Streamable
  HTTP). It is the only endpoint the plugin contacts.

Credentials: OAuth 2.1 sign-in, handled by Grok's built-in MCP OAuth client.
Grok discovers the authorization server from
`https://brainz.brownmatter.ai/.well-known/oauth-protected-resource/mcp`,
registers itself through dynamic client registration, and signs in with PKCE
(S256) through a loopback redirect. The token is scoped to one vault, and Grok
stores it in `~/.grok/mcp_credentials.json`. No credential is bundled in the
plugin, and the plugin reads no files or environment variables. Each request
re-checks your vault membership, so removing you from the vault ends Grok's
access.

## Ownership and license

Maintained by Brownmatter (https://brownmatter.ai), the maker of Brainz. Source:
https://github.com/claridgicus/brainz (`integrations/grok-build/brainz`).
The plugin files are MIT licensed. Documentation: https://brownmatter.ai/docs.

## Updating the submission

This folder is the source of truth for `external_plugins/brainz` in
[xai-org/plugin-marketplace](https://github.com/xai-org/plugin-marketplace).
After changing it, copy it into the marketplace, run
`python3 scripts/generate-plugin-index.py`, `python3 scripts/validate-catalog.py`
and `python3 scripts/generate-plugin-index.py --check`, and open a PR.
