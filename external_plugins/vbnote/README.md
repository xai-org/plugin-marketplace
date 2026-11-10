# vbnote for Grok Build

vbnote connects Grok Build to Vb. Use an authorized Vb account to browse notes
and folders or read summaries and transcripts.

1. From the marketplace repository root, launch
   `grok --plugin-dir ./external_plugins/vbnote`.
2. Open `/mcps` and authenticate the vbnote server. Sign in to Vb and review
   the requested permissions in the browser.
3. Ask “Use vbnote to list my recent notes.” Verify that the result includes
   a note from the authorized Vb account.

The Streamable HTTP MCP endpoint is
`https://4a08142c38dbe374195d41c04562d9f8.nebulab.app/mcp`.
It advertises `https://86e8f7ab32cfd12577bc2619bc635690.nebulab.app` as its
OAuth authorization server. Grok Build discovers the OAuth endpoints from
the MCP server and authenticates the account in the browser.

Note and folder tools read data from the authorized account. The feedback tool
sends feedback to Vb only when the user requests it.

The MIT license applies to the plugin configuration and this README.
The hosted Vb service is outside the scope of this license.
