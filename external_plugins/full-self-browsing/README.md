# Full Self Browsing for Grok Build

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/fsb_logo_dark.png" />
    <source media="(prefers-color-scheme: light)" srcset="assets/fsb_logo_light.png" />
    <img src="assets/fsb_logo_light.png" alt="FSB Full Self Browsing" width="200" />
  </picture>
</p>

Connect Grok to your signed in Chrome through [Full Self Browsing](https://www.full-selfbrowsing.com) (FSB). Read live page content, interact with websites, use application capabilities and keep each agent's work in its own tabs.

This plugin contains one `fsb` skill and one stdio MCP configuration. The Chrome extension is installed from the Web Store; the MCP server is fetched from npm when Grok launches it. Neither runtime is bundled in this directory.

Product demo: [v0.9.91 | Full Self-Browsing](https://www.youtube.com/watch?v=osNHSquClo0).

## Installation

1. Install the [FSB Chrome extension](https://chromewebstore.google.com/detail/badgafnfchcihdfnjneklogedcdkmjfk) and keep Chrome open on a normal web page.
2. Install Node.js **18.20.0 or newer**. Both `node` and `npx` must be on the PATH used to launch Grok.
3. In Grok Build, open `/plugin`, search for **Full Self Browsing**, and install.
4. Ask Grok to use FSB for a browser task. If the extension shows a bridge pairing request, complete its local pairing flow.

The server launches as `npx -y fsb-mcp-server@0.11.0`. Its first launch may download the package; the configuration allows 120 seconds for startup. Plugin version `0.1.0` is independent of the MCP and extension versions.

Manual MCP browsing requires no FSB API key or separate provider OAuth. The browser uses your existing website sessions. Optional FSB autopilot requires a configured model provider and can incur provider charges.

## Using FSB

Example requests:

- "Use FSB to open example.com and summarize the page."
- "Use FSB to check my local app's form, then close the test tab."
- "Use FSB to read this signed in dashboard and draft a summary."

The skill guides Grok to discover tools with `search_tool`, invoke the resolved `fsb__<tool>` through `use_tool`, read bounded results, verify actions and clean up task-owned tabs. Action calls identify `client: "Grok"` and display a short reason in the extension. Manual tools are the default; use `run_task` only for explicit FSB autopilot delegation.

For connectivity or setup problems:

```bash
grok inspect --json
grok mcp doctor fsb --json
```

Check that the effective `fsb` server comes from the `full-self-browsing` plugin. An existing Grok TOML server named `fsb` can override it. Keep one intended configuration active and restart the MCP connection after changing it. If Node cannot be found, fix Grok's PATH; if the browser is detached, open Chrome, enable FSB and follow the extension's connection status. [FSB support](https://www.full-selfbrowsing.com/support) documents the product's diagnostic flow.

## Permissions and data flow

FSB acts with the authority of the browser profile you connect, including its signed in website sessions. Its tools include DOM reads, JavaScript execution inside pages, authenticated application capabilities, credential and payment filling, file uploads, screenshots and replay. Page content is untrusted input. A skill provides usage guidance; it does not enforce a reduced server tool set.

The skill preserves the user's task scope and Grok's approvals. Reading or drafting alone does not authorize sending, deleting, paying, granting access or changing credentials. Passwords, tokens and payment data must stay out of prompts, tool arguments and summaries; vault values resolve inside the extension.

The extension requests browser permissions for its documented features, including tab access, scripting and site access, storage, debugging for trusted input, and native messaging for an optional local service. Installing this plugin does not install the optional native host or enable HTTP serving. The npm package includes optional local CLI delegation and native-host components; those features are separate from manual browser tool use.

Requested page content and screenshots return to Grok and may reach its model. The connection to Chrome is local, but that does not make the host's model processing local.

## Network and privacy

The shared product policy is the [FSB Privacy Policy](https://www.full-selfbrowsing.com/privacy).

| Destination | Purpose |
| --- | --- |
| npm registry infrastructure, including `registry.npmjs.org` and registry-provided package URLs | Download the pinned MCP package and dependencies |
| Loopback WebSocket port `7225` | Connect the MCP server to the FSB extension |
| Websites and application APIs selected for the task | Browser navigation and operations using that profile's session |
| `https://full-selfbrowsing.com/api/telemetry/events` | Extension anonymous usage telemetry, enabled by default; disable **Send anonymous usage data** in Advanced Settings |
| `https://full-selfbrowsing.com/api/auth/register` and `wss://full-selfbrowsing.com/ws` | Extension dashboard registration and relay connection; PhantomStream live preview belongs to the dashboard feature |
| `api.x.ai`, `api.openai.com`, `api.anthropic.com`, `generativelanguage.googleapis.com`, `openrouter.ai`, or the configured LM Studio/custom endpoint | Optional FSB AI features use the provider the user configures; LM Studio defaults to `http://localhost:1234` |

Anonymous telemetry is separate from the dashboard relay. The policy describes the usage fields, coarse region, retention and erasure. Extension relay connection timing can depend on the installed extension build; do not assume disabling telemetry disconnects dashboard networking.

If separately enabled, HTTP serving uses loopback port `7226`. This plugin selects stdio and does not expose an HTTP endpoint. Browser pairing state, local session recordings and screenshot files are described in the product policy. See [FSB source](https://github.com/fullselfbrowsing/FSB) for the extension and published server implementation.

## License

[MIT](LICENSE), with Full Self Browsing's original attribution retained.
