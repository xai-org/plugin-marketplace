# KitCut

[KitCut](https://kitcut.ai) turns an idea into a short animated film. Claude Opus 5.5 writes it, draws or paints it, narrates it and scores it, and the film is 5 seconds to 8 minutes long. This plugin connects Grok Build to KitCut's hosted MCP server at `https://kitcut.ai/mcp`.

## What you can do from Grok

- **Make a film** from an idea, with pictures, text files and voice notes, in a hand-drawn, painted or collage look.
- **Start from a video template.** A template is a finished film that Claude remakes as yours from a few words about what it is for: a conference speaker promo, a call for speakers, an agenda, a birthday or pool-party invitation, a group-ride invitation. Browse them with `list_templates` and `get_template`, then make the film with `make_film` and a template.
- **Run a series.** Projects keep a brief, a cast of recurring characters, pictures and approved narration lines across episodes.
- **Publish to YouTube.** Have the title, description and four thumbnails written from the finished film, publish it to a connected channel, and follow it until it is live.
- Follow a film being made, make it again, and check the credit balance.

Films made through an assistant are link-only by default: they stay out of the public gallery until the person makes them public.

## Sign-in and privacy

The server uses OAuth 2.1 with PKCE. On first connect, sign in to KitCut (Google or an emailed code) and press Allow. Grok never sees the sign-in. An assistant can do only what the signed-in person can do with their own account on the website; no tool reaches another account.

The plugin ships no code, hooks or scripts: its only component is the MCP server entry in `.mcp.json`, which calls `https://kitcut.ai/mcp` and nothing else.

## Docs

- [Assistants (MCP): every tool and its limits](https://kitcut.ai/docs/assistants)
- [Templates](https://kitcut.ai/docs/templates)
- [Plans and credits](https://kitcut.ai/docs/plans-and-credits) (a Free plan is available)
