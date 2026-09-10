# Grok Build release checklist

## Local plugin gate

- [ ] `.grok-plugin/plugin.json` is valid and its version matches `package.json`.
- [ ] `.mcp.json` registers only Global and the inactive `.mcp.china.json` registers only China, both as `Plugin-Grok-kling-ai`; validate the Global marketplace package and test the China private-distribution variant separately.
- [ ] The telemetry-only header is `X-Kling-Integration: Plugin-Grok`.
- [ ] The archive contains no `mcp-app/`, local MCP server, OAuth tokens, `.env`, profile config, or caches.
- [ ] `grok plugin validate grok/kling-ai` passes on the supported Grok Build version.
- [ ] A clean `grok plugin install <path> --trust` plus `grok plugin enable kling-ai` exposes both Skills and exactly one MCP server.
- [ ] `/mcps` authorization, OAuth refresh/reconnect, `grok mcp doctor`, and account switching pass.
- [ ] Text/resource fallback works; interactive MCP App rendering is not claimed until the target Grok surface is verified.
- [ ] Generation confirmation, at-most-once submission, ambiguous-timeout recovery, and `generationId` preservation are manually verified.
- [ ] `npm run check`, `npm test`, and root `node scripts/verify-host-parity.mjs` pass.

## xAI official marketplace gate

xAI's official catalog is <https://github.com/xai-org/plugin-marketplace>.
For a third-party remote source, publish this directory as the root of a
public repository owned by the actual publisher. Then:

1. Fork `xai-org/plugin-marketplace` and branch from `main`.
2. Add exactly one `kling-ai` entry to `.grok-plugin/marketplace.json` with a clear description, `homepage`, product-scoped `keywords`/`domains`, category, public repository URL, and a full 40-character lowercase commit SHA.
3. Run `python3 scripts/generate-plugin-index.py` in the marketplace fork; never edit the generated index manually.
4. Run `python3 scripts/validate-catalog.py` and `python3 scripts/generate-plugin-index.py --check`.
5. Open a PR using xAI's template and disclose both possible network endpoints, the one-active-region invariant, OAuth requirement, requested permissions, and telemetry-only integration header.

Alternative: vendor the plugin under the official repository's
`external_plugins/kling-ai/` and use a local source entry. Remote source is
the official contribution guide's recommended path for third parties.

- [ ] The submitted source is public, reachable, licensed, and under the real publisher's organization rather than an unrelated personal account.
- [ ] The catalog source is pinned to a reachable full commit SHA, not a branch, tag, or abbreviated SHA.
- [ ] The repository README declares network endpoints, OAuth/permissions, privacy/terms URLs, data handling, and publisher ownership.
- [ ] No `curl | bash`, postinstall execution, secret reading/exfiltration, obfuscated payload, broad hook, or local shell-exec MCP server is present.
- [ ] The official catalog PR has passed CI and code-owner review before any “available in the xAI marketplace” claim is published.
- [ ] Marketing states that third-party catalog inclusion is not xAI authorship, endorsement, or verification.
