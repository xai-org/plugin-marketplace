# MagicPixel plugin for Grok Build

Connect Grok Build to [MagicPixel](https://magicpixel.art), the AI pixel art
editor for game developers. Generate new pixel art, make variants of sprites
you already have, turn a character to new facing directions, merge assets with
AI, and browse or buy community sprites from the marketplace. Everything you
make lands in your MagicPixel library.

## Installation

In Grok Build, open `/plugin`, search for **MagicPixel**, and install.

On first connection, Grok opens MagicPixel sign-in in the browser. Approve
access once with your MagicPixel account. Do not paste an API key into chat.

## Tools

`whoami`, `get_credit_balance`, `create_credit_checkout`, `list_projects`,
`create_project`, `create_folder`, `list_assets`, `get_asset`,
`list_style_references`, `get_style_reference`, `upload_style_reference`,
`get_style_profile`, `update_style_profile`, `enrich_prompt`,
`list_marketplace_assets`, `get_marketplace_asset`,
`purchase_marketplace_asset`, `generate_pixel_art`, `generate_variants`,
`generate_directions`, `apply_with_ai`.

AI generation spends MagicPixel credits and takes about 30 to 90 seconds.
Paid marketplace purchases and credit checkout ask for confirmation first.

## Authentication

The plugin connects only to `https://magicpixel.art/mcp`. Authentication is
OAuth 2.1 with dynamic client registration.

Network endpoints:

- `https://magicpixel.art/mcp` — hosted MCP (streamable HTTP)
- `https://magicpixel.art/.well-known/oauth-protected-resource/mcp` — protected resource metadata
- `https://sddsilidjhvtvejzvolx.supabase.co/auth/v1` — OAuth authorization server
- `https://magicpixel.art` — human sign-in and consent

Credentials: a MagicPixel account. No API key is stored in the plugin. Tools
only see the signed-in user's own projects, assets and credits.

Setup guide: https://magicpixel.art/guides/connect

## License

Proprietary. Use of the hosted MCP is governed by the
[MagicPixel terms](https://magicpixel.art/tos).
