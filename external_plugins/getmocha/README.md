# getMocha plugin for Grok Build

Connect Grok Build to [getMocha](https://getmocha.ai). Ask questions about or to
real people by name. Answers draw on each person's public professional background.

## Installation

In Grok Build, open `/plugin`, search for **getMocha**, and install.

## Authentication

The plugin connects only to `https://getmocha.ai/mcp`.

Anonymous use works out of the box and is rate-limited. Sign in with LinkedIn to
lift the rate limit, claim the agent for your own profile, and message the people
you name. Sign-in is optional and happens in the browser. Do not paste a token
into chat.

## Security and network

- The only endpoint this connector calls is `https://getmocha.ai`.
- It reads no local files, no `.env`, and no environment variables.
- It runs no scripts, hooks, or postinstall steps.
- Credentials are optional. The only sign-in is LinkedIn OAuth, in the browser.

## License

Proprietary. Use of the hosted MCP is governed by getMocha's terms.
