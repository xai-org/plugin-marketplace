<!--
Adding or updating a plugin? Read CONTRIBUTING.md first.
Run these locally before opening the PR — they're exactly what CI checks:
  python3 scripts/generate-plugin-index.py
  python3 scripts/validate-catalog.py
  python3 scripts/generate-plugin-index.py --check
-->

## What this PR does

<!-- New plugin? Plugin update? Which plugin and what changed? -->

- Plugin name:
- Type: <!-- remote source / local (external_plugins) -->
- Source URL + pinned SHA (remote), or vendored path (local):
- Homepage:

## Ownership

<!-- Confirm you can distribute this. Sourcing from your official org speeds up review. -->

- [ ] I own this plugin or have the right to distribute it.
- [ ] The `source` repo is published under our official org (or I've explained why not below).

## Checklist

- [ ] Added/updated exactly one entry in `.grok-plugin/marketplace.json` (valid JSON, kebab-case `name`).
- [ ] Remote source pins a full 40-char lowercase commit `sha`, and that commit is public + reachable.
- [ ] Regenerated `.grok-plugin/plugin-index.json` (`python3 scripts/generate-plugin-index.py`).
- [ ] `python3 scripts/validate-catalog.py` passes locally.
- [ ] `python3 scripts/generate-plugin-index.py --check` passes locally.
- [ ] `homepage` + clear `description` set; local plugins include `README.md` + `.grok-plugin/plugin.json`.
- [ ] License is stated.

## Security

<!-- Reviewers statically audit MCP configs, hooks, scripts, and skills. See CONTRIBUTING.md. -->

- [ ] No `curl | bash`, remote-code download/exec, or `postinstall` RCE.
- [ ] No reading/exfiltration of secrets, tokens, `.env`, or env vars.
- [ ] Hooks and MCP scope are least-privilege.
- Network endpoints this plugin calls (and why):
- Credentials/permissions it requires (and why):

## Notes for reviewers

<!-- Anything that helps: relationship to your org, prior art, why a personal-account source, etc. -->
