# Pincushion for Grok Build

Connect your app to [Pincushion](https://pincushion.io), run a brand-aware Crit,
read positioned feedback pins, and ask Grok to implement approved fixes.
This plugin is for the **Grok Build CLI**, not the Build tab on grok.com.

## Install

Requires Grok Build with plugin support, Node **22.22+ within v22 or v24**, npm,
and Chrome/Chromium for local captures. The adapter requires the pinned
`pincushion-mcp@1.11.26`. Confirm that `npm view pincushion-mcp@1.11.26 version`
returns `1.11.26` before running the install sequence below. The pinned release
prevents a new project from being
registered during MCP startup; `/pincushion` registers it only after confirmation.

From your app repository:

```sh
# Review the exact Git source before granting it trust.
review_dir="$(mktemp -d)"
git clone --depth 1 https://github.com/jcooley8/pincushion-plugin.git "$review_dir/pincushion-plugin"
git -C "$review_dir/pincushion-plugin" log -1 --oneline -- pincushion-grok
review_commit="$(git -C "$review_dir/pincushion-plugin" rev-parse HEAD)"
printf 'Reviewed source commit: %s\n' "$review_commit"
git -C "$review_dir/pincushion-plugin" ls-tree -r --name-only HEAD -- pincushion-grok
find "$review_dir/pincushion-plugin/pincushion-grok" -type f -print -exec sed -n '1,260p' {} \;

published_mcp_version="$(npm view pincushion-mcp@1.11.26 version 2>/dev/null || true)"
if [ "$published_mcp_version" = "1.11.26" ]; then
  grok plugin install "$review_dir/pincushion-plugin/pincushion-grok" --trust
  grok plugin details pincushion
  npm exec --yes --package=pincushion-mcp@1.11.26 -- node --version
  grok mcp doctor pincushion
  grok
else
  echo "Expected exact pincushion-mcp@1.11.26 on npm; that pinned version is not currently available. Stop until the pinned release is published." >&2
fi
```

The `--trust` flag records your approval of the reviewed local source, so inspect
the listed files before running the install command. Installing the local
checkout binds the trusted plugin to the exact `review_commit` printed above;
the mutable `jcooley8/pincushion-plugin#pincushion-grok` shorthand is not used
after review. A marketplace listing is optional for direct installation;
publication, marketplace submission and acceptance are separate. For another
reviewed local checkout, use `grok plugin install /absolute/pincushion-grok --trust`.
Use `grok plugin update pincushion` for an available update.
The npm command downloads the pinned MCP before Grok's short startup deadline;
it prints the Node version without starting a project session. Let it finish
before running doctor, especially on the first install.

Start Grok from the **app's repository**, never the plugin directory. The stdio
MCP receives `--project-dir .`, meaning Grok's working directory. If an existing
project/user MCP named `pincushion` overrides the plugin, inspect its origin with
`grok inspect`, preserve its credentials/settings, and resolve the duplicate
before setup. For an explicit project binding, after choosing the app root:

```sh
grok mcp add --scope project pincushion -- npx --yes pincushion-mcp@1.11.26 --project-dir /absolute/path/to/your-app --cloud-sync --no-auto-register-project
```

Do not commit account credentials. Run `/pincushion` in Grok to connect, confirm
the project/URL and brand context, review what will be stored, then run the first
Crit immediately after confirmation. Sign-in uses the existing Pincushion login
flow. There is no embedded key and no separate Grok-specific Pincushion account.

## Commands

| Command | Behavior |
|---|---|
| `/pincushion` | Connect the intended project and run its first confirmed Crit |
| `/pincushion-crit <URL>` | Discover same-origin navigation pages, inspect desktop/mobile evidence, and aim for at least three distinct useful native pins when supported |
| `/pincushion-pins` | Read existing feedback without creating a Crit |
| `/pincushion-implement` | Implement only approved pins when requested |

Web Crit reports require complete desktop and mobile capture evidence for each
screen. Navigation destinations become separate Grid cards and evidenced Flow
connections. Grid shows the full page without a nested scroll; Flow retains a
scrollable capture for focused inspection. The report keeps positioned pins on
both device views. If fewer than three real issues survive inspection, Crit
reports that count rather than creating filler pins.

The checkpoint skill suggests another Crit once after a completed UI work batch.
It does not run a critique automatically. Suggestions depend on Grok invoking
the skill; there is no always-running watcher or shell lifecycle hook.

Crit runs in the command session with the existing capture script and Grok's
native image-capable read_file tool. Sources/DOM establish selectors;
capture hotspots confirm the intended visible element. The capture script uses
the first visible selector match, so ambiguous selectors must be narrowed or
the finding omitted. Tall full-page captures are inspected through local
viewport-sized crops made with the pinned MCP's Chromium dependency; the
original full-page images and coordinates remain the native report evidence.
An explicitly registered localhost preview uses Pincushion's origin-bound
`--critique --page-only` capture mode for its exact host and port; other
private network destinations remain blocked.
If images cannot be inspected, a page is inaccessible,
brand context is missing or anchoring is uncertain, critique stops explicitly.
Zero real findings is a valid result and does not produce a fake report.

Share reports are opt-in and use native Pincushion screenshots, positioned pins
and `/r/` links. No wrapper page replaces the Pincushion experience. Creating AI
pins never automatically approves or implements them.

## Data access and network use

- The MCP reads/writes the intended app's `.feedback/` working data and the
  existing Pincushion user configuration. Existing authentication may use
  `~/.pincushion/license-key`; the agent must never print or copy its contents.
- Project URLs, approved brand context, pin bodies/selectors and relevant element
  context sync to Pincushion under the project's access controls. Implementation
  can attach real commit metadata to a resolved pin.
- Grok processes the app source and screenshot evidence the user permits it to
  read through its normal model session. This plugin adds no model API calls,
  xAI API key, subscription or background outreach.
- Local captures fetch the user-selected page and its resources in Chromium.
  Cookies/state stay local and origin-bound. Never capture or share private
  pages without permission. Only a requested share report uploads screenshots
  and positions. A public report is accessible to anyone with its link; a
  private report requires authenticated Pincushion project membership.
- Package retrieval uses `registry.npmjs.org`. Browser login and native reports
  use `pincushion.io`. The existing default backend is
  `dpsqzszdviltqvethxbr.supabase.co` (functions, storage and sync). User-configured
  backend overrides retain their existing behavior. The pinned MCP enables
  Sentry error monitoring/traces at
  `o4511141316001792.ingest.us.sentry.io` and PostHog product events at
  `us.i.posthog.com` by default, using its built-in public ingestion settings.
  `PINCUSHION_NO_TELEMETRY=1` or `DO_NOT_TRACK=1` disables PostHog, not Sentry.
  This adapter adds no telemetry endpoint or ingestion setting. See the pinned MCP source
  and [Pincushion privacy policy](https://pincushion.io/privacy).

No X posting tools, automatic implementation, new public APIs, database changes,
deployment hooks or credential grants are part of this adapter.

## Validation and release

Run `grok plugin validate ./pincushion-grok` and
`node --test pincushion-grok/test/*.test.mjs` from the source repository.
Use `grok inspect --json`, `grok plugin details pincushion` and
`grok mcp doctor pincushion` in a clean app to verify loaded components and MCP
connectivity. A doctor success proves connection, not a completed Crit.

Before release, run the repository's complete validation and independent review.
Record an actual runtime check for setup identity/authentication, missing context,
inaccessible pages, duplicate/no findings, screenshot inspection and selector
anchoring, plus Crit → pin → requested fix. Distinguish deterministic checks,
host discovery, cloud operations and human tester evidence in release receipts.

The canonical public distribution is the `pincushion-grok/` directory in
`jcooley8/pincushion-plugin`. Publish only this reviewed directory from the
verified private-main integration, via the public repository's own PR workflow;
do not copy private backend, marketing, browser state or credentials. Verify
public file hashes and clean installation at the resulting public commit.
For xAI catalog submission, vendor the same directory under
`external_plugins/pincushion`, add brand-specific discovery terms, regenerate
the catalog index using xAI's script, and run its catalog/index validators.
Submitting a PR does not mean xAI has accepted it.

## License

This adapter and the separately downloaded MCP are source-available under
**FSL-1.1-Apache-2.0**. See [LICENSE.md](LICENSE.md). Grok and Chromium retain
their own terms and licenses.
