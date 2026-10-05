# VidTL plugin for Grok Build

Connect Grok Build to [VidTL](https://vidtl.com), a browser-based video editor.
Grok edits the project you have open in the editor, and you watch each change
land on your timeline: cutting and arranging clips, cutting by transcript,
subtitles, audio cleanup, effects, keyframes, motion graphics, stock media,
preview screenshots and export. Every change is an ordinary edit you can undo.

## Installation

In Grok Build, open `/plugin`, search for **VidTL**, and install.

Open the editor at [vidtl.com/app](https://vidtl.com/app/video-editor) in your
browser. On first connection, Grok opens VidTL sign-in in the browser, where
you approve the connection. Do not paste a token into chat.

## Authentication

The plugin connects only to `https://vidtl.com/app/mcp`. Authentication is
OAuth 2.1 with dynamic client registration and PKCE against that host.

Network endpoints:

- `https://vidtl.com/app/mcp` — hosted MCP (Streamable HTTP)
- `https://vidtl.com/app/oauth/authorize`, `/app/oauth/token`, `/app/oauth/register` — OAuth 2.1 + DCR
- `https://vidtl.com/app/.well-known/oauth-protected-resource` — OAuth discovery

Credentials: a VidTL account. The editor is free; connecting an AI app needs
a VidTL Pro plan. No API key is stored in the plugin. You can cut off access at
any time from the editor's AI panel.

Docs: [vidtl.com/video-editor-mcp-cli](https://vidtl.com/video-editor-mcp-cli/)

## License

Proprietary. Use of the hosted MCP is governed by VidTL's terms.
