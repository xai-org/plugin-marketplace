# Automata plugin for Grok Build

Connect Grok Build to [Automata](https://getautomata.app) — scoped, revocable
access to your WhatsApp, Telegram, IMAP email and PostgreSQL. Read, search and
summarise chats and mail, and query databases. Sending messages, saving email
drafts and writing rows happen only when the connector token allows them.

Source: [ju-li/automata-mcp](https://github.com/ju-li/automata-mcp) (MIT).

## Setup

1. Sign in at [getautomata.app](https://getautomata.app) (free tier) and create a
   connection — pair WhatsApp or Telegram by QR, or add an IMAP mailbox or a
   PostgreSQL DSN.
2. On the connection's page, create a **connector token**. Choose which chats,
   folders or tables and which tools it may use. Tokens can be rotated or revoked
   at any time.
3. Export the token before starting Grok Build:

   ```bash
   export AUTOMATA_TOKEN=wamcp_...
   ```

4. In Grok Build, open `/plugin`, search for **Automata**, and install.

Each token is bound to exactly one connection. To use several connections, add
another server entry with its own token variable.

Self-hosting Automata? Point the `url` in `.mcp.json` at your own deployment's
`/mcp` endpoint.

## Tools

The tools offered depend on the connection the token is bound to and the tools
the token was granted:

- **WhatsApp:** `get-connection-status`, `list-chats`, `read-messages`,
  `search-messages`, `send-text-message`
- **Telegram:** `get-telegram-status`, `list-telegram-chats`,
  `read-telegram-messages`, `search-telegram-messages`, `send-telegram-message`
- **PostgreSQL:** `get-database-info`, `list-tables`, `describe-table`,
  `run-query` (read-only), `run-statement` (write)
- **IMAP email:** `get-mailbox-status`, `list-mail-folders`, `list-emails`,
  `search-emails`, `read-email`, `get-email-attachment`, `create-email-draft`
  (saves a draft, never sends)

## Network endpoints and credentials

- `https://mcp.getautomata.app/mcp` — hosted MCP server (streamable HTTP). The
  plugin calls nothing else and ships no code, hooks or skills.
- Credential: one Automata connector token, read from the `AUTOMATA_TOKEN`
  environment variable and sent as `Authorization: Bearer`. The server stores
  only its SHA-256 hash. No WhatsApp, Telegram, mail or database credential ever
  passes through the plugin.

## License

MIT.
