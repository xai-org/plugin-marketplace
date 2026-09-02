# Contributing a plugin

Thanks for submitting to the xAI plugin marketplace. This repo is an **index**: a PR doesn't ship a
product, it adds one entry to `.grok-plugin/marketplace.json` that points Grok Build at your
plugin's source. This guide covers how to submit, what we check, and the mistakes that most often
send a PR back.

For the catalog schema, source types, and SHA pinning mechanics, read the [README](README.md) first
— this guide assumes it and focuses on the *process and tips*.

## Before you start

- **Only submit a plugin you own or have the right to distribute.** Each plugin is governed by its
  own license. xAI does not author or verify third-party plugins (see the disclaimer in the
  [README](README.md)).
- **Plugins execute code on a user's machine.** That's exactly why review is strict — see
  [Security expectations](#security-expectations).

## Submit in 6 steps

1. **Fork** this repo and branch from `main`.
2. **Add your catalog entry** to `.grok-plugin/marketplace.json`:
   - **Remote source (recommended for third-party):** point `source.url` at your public repo and
     pin a full commit `sha`. Nothing else is vendored here.
   - **Local source:** vendor your files under `external_plugins/<name>/` (third-party) and set
     `source` to `{ "type": "local", "path": "./external_plugins/<name>" }`.
3. **Pin the SHA** (remote only) — get it with:
   ```bash
   git ls-remote https://github.com/<your-org>/<your-repo>.git HEAD
   ```
4. **Regenerate the component index** (never hand-edit it):
   ```bash
   python3 scripts/generate-plugin-index.py
   ```
5. **Validate locally** — this is exactly what CI runs:
   ```bash
   python3 scripts/validate-catalog.py
   python3 scripts/generate-plugin-index.py --check
   ```
6. **Open the PR.** Fill in the template, then wait for CI + code-owner review.

## Requirements checklist

- [ ] One entry added to `.grok-plugin/marketplace.json`, valid JSON, `name` in kebab-case and unique.
- [ ] Remote sources pin a full 40-char lowercase commit `sha`; the commit is public and reachable.
- [ ] `.grok-plugin/plugin-index.json` regenerated and committed (CI fails if stale).
- [ ] A `homepage` and a clear `description`; brand-scoped `keywords`/`domains` (not generic terms — they power the plugin CTA) and a `category` where it helps discovery.
- [ ] Local plugins include a `README.md` and a valid `.grok-plugin/plugin.json` manifest (`.claude-plugin/plugin.json` is also accepted for Claude-ecosystem plugins).
- [ ] The plugin is licensed and the license is stated.
- [ ] You've read [Security expectations](#security-expectations) and your plugin complies.

## Tips for a clean submission

- **Source from your official org, not a personal account.** A branded plugin (`acme`) sourced from
  `some-personal-account/acme-thing` reads as a possible impersonation and *will* be questioned.
  Publishing the source under your real org (`acme/...`) makes first-party ownership verifiable at a
  glance and is the single biggest thing that speeds up review.
- **Keep the pinned commit reachable.** Index generation and CI fetch your pinned `sha`; if the repo
  is private, the commit is force-pushed away, or the repo is deleted, the build fails loudly.
- **Pin a real commit, not a branch or tag.** `main`, `v1.2.3`, and abbreviated SHAs are rejected by
  the validator. A moving ref would let a later force-push ship new code to everyone silently.
- **Scope your plugin to least privilege.** Only request the MCP tools, hooks, and filesystem/network
  access you actually need.
- **Keep `keywords` and `domains` brand-scoped.** They power Grok Build's plugin **CTA** — the
  prompt that proactively suggests your plugin — so generic terms like `postgres`, `database`,
  `api`, `cli`, or `deploy` get pushed back: they'd mis-fire the CTA on unrelated requests. Use
  specific, product-scoped terms (e.g. `neon`, `neon postgres`, `neon branch`) and only the
  `domains` your product actually owns.
- **To update a live plugin,** bump the `sha` (remote) or commit the changed files (local) and
  regenerate the index — don't open a parallel duplicate entry.

## Security expectations

Submissions are statically reviewed for supply-chain and execution risk. Plugins that do any of the
following will be rejected or sent back:

- **Arbitrary code execution / RCE:** `curl | bash`, downloading and running binaries, `eval` of
  remote content, or `postinstall` scripts that fetch and execute code.
- **Secret or data exfiltration:** reading `~/.ssh`, `.env`, tokens, or env vars and sending them to
  a network endpoint; undisclosed telemetry.
- **Over-broad hooks / MCP scope:** lifecycle hooks that run shell on `Bash`/`Write` with no matcher,
  or a shell-exec MCP server when a scoped tool would do.
- **Obfuscation:** base64/hex payload blobs, minified bundles with no source, or typosquatted deps.
- **Prompt injection** planted in `SKILL.md` or descriptions aimed at the installing agent.

Declare any network endpoints your plugin calls and the credentials it needs, in your README — it
makes review faster and builds trust.

## What review checks

Every PR gets a pass on these dimensions, so it helps to self-check them first:

| Dimension | What we look for |
|---|---|
| Source legitimacy | Official org vs personal/throwaway account; repo exists; SHA pinned; brand matches source |
| Security | Static audit of MCP configs, hooks, scripts, and skills (see above) |
| Components | What the plugin actually ships (skills/commands/agents/hooks/MCP servers) |
| Duplication | Not already in the catalog; not a parallel entry for an existing plugin |
| Conventions & CI | `validate-catalog.py` + `generate-plugin-index.py --check` pass; valid JSON; naming; README/homepage |

## Common reasons a PR gets sent back

- **Unpinned or invalid `sha`** on a remote source (or a tag/branch instead of a commit).
- **Source repo is private or the pinned commit isn't reachable** → CI can't fetch it.
- **Stale `plugin-index.json`** — you edited the catalog but didn't rerun `generate-plugin-index.py`.
- **Malformed `marketplace.json`** — a botched merge that leaves invalid JSON breaks the whole catalog;
  always run `validate-catalog.py` after resolving conflicts.
- **Personal-account source for a branded plugin** — move it under your official org.
- **Missing `homepage`/`README`** or a vague one-line description.

## Questions

Open an issue, or leave a comment on your PR. We aim to do a first review pass quickly — a clean,
self-checked submission (CI green, index regenerated, official source) is the fastest path to merge.
