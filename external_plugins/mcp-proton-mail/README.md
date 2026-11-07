# mcp-proton-mail plugin for Grok Build

Unofficial, not affiliated with Proton AG.

Connect Grok Build to your own Proton Mail through
[Proton Mail Bridge](https://proton.me/mail/bridge), with
[proton-mail-mcp](https://github.com/legalaspro/proton-mail-mcp): search and read mail, write
drafts and tidy the mailbox, with a preview you approve before mail is moved, deleted or sent.
Everything runs on your own computer; nothing is hosted.

## What you get

- **MCP server** `proton-mail` (stdio). It runs `uvx mcp-proton-mail@1.30.0 connect`, which
  relays Grok Build's requests to the proton-mail-mcp service on `127.0.0.1`. The release is
  pinned, and PyPI shows that it was published from
  [legalaspro/proton-mail-mcp](https://github.com/legalaspro/proton-mail-mcp) with Trusted
  Publishing.
- No skills, commands, agents or hooks.

The tools search, count and read mail without marking it read, save drafts and attachments, and
move, archive, trash, label or unsubscribe after a preview. Each change takes a single-use token
bound to exactly the previewed messages and your approval in the client's form, and most can be
undone. A client that shows no form is refused mailbox changes. Sending is off by default. The
[tool reference](https://github.com/legalaspro/proton-mail-mcp/blob/main/docs/tools.md) lists
every tool.

## Before you install it

1. Install [uv](https://docs.astral.sh/uv/). It downloads the `mcp-proton-mail` package from PyPI,
   and Python 3.12 when there is none.
2. Run the guided setup once, in your own terminal. A paid Proton plan is needed, because Bridge
   requires one.

   ```sh
   git clone https://github.com/legalaspro/proton-mail-mcp.git
   cd proton-mail-mcp
   uvx --from . proton-mail-mcp setup
   ```

   Setup checks or installs Proton Mail Bridge, stores the Bridge password and a new bearer token
   in your system's credential store, and starts the service. Only you can type the Bridge
   password; it is never read from an argument or an environment variable.

## Installation

In Grok Build, open `/plugin`, search for **mcp-proton-mail**, and install.

## Network endpoints and credentials

- `127.0.0.1`: the relay talks only to the proton-mail-mcp service, and the service only to
  Proton Mail Bridge, both on this computer. Bridge syncs with Proton as it does for any mail app.
- `pypi.org` and `files.pythonhosted.org`: uv downloads the pinned package.
- An unsubscribe link from a message, over HTTPS, and only after you approve that unsubscribe.

Credentials: none in the plugin. The relay reads the service's bearer token from the system
credential store each time it starts and never prints it, so no token is in Grok Build's settings.

## Privacy

proton-mail-mcp has no telemetry, and its search index, audit log and saved attachments stay on
your computer. No email is sent without your approval: sending is off until you turn it on, and
then each send needs a saved draft, a preview and a single-use token redeemed only after you
approve. On a client without forms the approval is an OK you type in chat, which the server cannot
tell apart from one the model writes. What Grok reads through these tools is passed to Grok under
xAI's own terms.

## License

Apache-2.0. See the [license](https://github.com/legalaspro/proton-mail-mcp/blob/main/LICENSE).
