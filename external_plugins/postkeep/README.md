# postkeep plugin for Grok Build

Connect Grok Build to [postkeep](https://postkeep.ai) — remote Streamable HTTP MCP for
Gmail, Outlook / Microsoft 365, iCloud Mail, Fastmail, and Yahoo Mail with OAuth 2.1
and per-workspace access controls.

The core server is open source (MIT) at [postkeep/postkeep](https://github.com/postkeep/postkeep)
and published in the Official MCP Registry as `ai.postkeep/postkeep`.

## Installation

In Grok Build, open `/plugin`, search for **postkeep**, and install.

On first connection, Grok opens postkeep sign-in in your browser. Authorize with your
postkeep account and select the workspace Grok can access. Free accounts include up to
2 mailboxes with no card required. Do not paste mailbox passwords or tokens into chat.

## What you get

- **MCP server** `postkeep` at `https://mcp.postkeep.ai/mcp` (Streamable HTTP, OAuth 2.1).
- **22 tools** across reading, searching, organizing, composing, webhooks, and workspace
  control:

| Area | Tools |
|---|---|
| Read & search | `list_folders`, `search_messages`, `get_message`, `download_attachment`, `get_mailbox_capabilities` |
| Compose & organize | `create_draft` (IMAP providers), `send_message`, `reply_to_message`, `update_flags`, `move_message`, `delete_message`, `create_folder`, `upload_attachment` |
| New-mail webhooks | `get_webhook_status`, `set_webhook_enabled`, `set_webhook_outbox_limits`, `list_webhook_filters`, `add_webhook_filter`, `remove_webhook_filter` |
| Workspace & mailboxes | `get_account`, `connect_mailbox`, `disconnect_mailbox` |

Every tool declares explicit MCP annotations (`readOnlyHint`, `destructiveHint`,
`idempotentHint`) so your client can prompt before write, send, or delete actions.
Reading a message returns clean Markdown or plain text without loading remote tracking
images or marking it read.

## Example prompts

- "What mailboxes are connected in postkeep?"
- "Search my inbox for unread messages from this week."
- "Read the latest invoice email and download its PDF attachment."
- "Save a draft reply thanking them and confirming Thursday at 2pm."
- "Move the processed receipts from Inbox to Receipts."

## Authentication and network

The plugin connects only to postkeep's hosted endpoints over HTTPS using OAuth 2.1
(authorization code + PKCE `S256`, RFC 7591 dynamic client registration, and Client ID
Metadata Documents). No static API key is stored in the plugin.

Network endpoints:

- `https://mcp.postkeep.ai/mcp` — hosted MCP server (Streamable HTTP)
- `https://mcp.postkeep.ai/.well-known/oauth-protected-resource/mcp` — RFC 9728 protected resource metadata
- `https://app.postkeep.ai/.well-known/oauth-authorization-server` — RFC 8414 authorization server metadata
- `https://app.postkeep.ai/authorize`, `/token`, `/register`, `/revoke` — OAuth 2.1 endpoints and browser consent screen

Credentials: a postkeep account (free tier supports up to 2 mailboxes; mailbox credentials
are encrypted at rest with AES-256-GCM and entered on a one-time browser page, never in
chat).

## Documentation & policies

- Docs: <https://postkeep.dev/docs/>
- Client setup guide: <https://postkeep.dev/docs/clients/>
- Privacy policy: <https://postkeep.ai/privacy>
- Terms of service: <https://postkeep.ai/terms>
- Security policy: <https://github.com/postkeep/postkeep/blob/main/SECURITY.md>
- Support: `support@postkeep.ai`

## License

MIT. See [LICENSE](LICENSE).

*postkeep is an independent project and is not affiliated with, sponsored by, or endorsed
by Apple, Fastmail, Google, Microsoft, xAI, or Yahoo.*
