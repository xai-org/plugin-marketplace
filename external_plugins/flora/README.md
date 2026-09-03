# FLORA

[FLORA](https://flora.ai) is a visual AI workflow builder — a multiplayer creative canvas
where nodes generate and transform images, video, text and audio. This plugin connects
Grok Build to a FLORA workspace over the FLORA MCP server, so the canvas a designer works
on and the canvas Grok writes to are the same canvas.

## What's in it

**MCP server** — `flora`, streamable HTTP at `https://agents.flora.ai/mcp`. It exposes
read tools (`flora_list_workspaces`, `flora_list_projects`, `flora_get_canvas`,
`flora_list_canvas_nodes`, `flora_list_techniques`, `flora_get_technique`,
`flora_list_generations`, `flora_get_run`, `flora_list_models`, `flora_list_assets`,
`flora_get_asset`, `flora_search_actions`, `search_docs`) and write tools that create
projects and assets, run techniques and generations, and add nodes to a canvas.

**Skills**

| Skill | For |
|---|---|
| `flora` | Overview and starting point — the object model, cost discipline, getting files in |
| `flora-run-technique` | Apply one saved technique to one image |
| `flora-batch-consistent` | Apply one technique across many items so results stay consistent |
| `flora-canvas-iterate` | Inspect and build on work already in a FLORA project |
| `flora-ooh-placements` | Place a finished ad creative into out-of-home mockups |

## Setup

Install the plugin and connect. On first use the MCP server starts an OAuth 2.0 flow and
opens `clerk.flora.ai` to sign in with your FLORA account. **No API key is required and
none is read from your environment or disk.**

You need a FLORA account with credits — generations bill the workspace you choose. The
skills state the cost and ask for confirmation before spending, and total it before any
batch.

## Network endpoints and credentials

Declared for review:

| Endpoint | Why |
|---|---|
| `https://agents.flora.ai/mcp` | The MCP server itself — every tool call |
| `https://clerk.flora.ai` | OAuth sign-in, first connection only (browser redirect) |
| `https://media.flora.ai` | Where generation outputs are served from |
| Storage host returned in `upload.url` | Only when uploading a local file, via a `curl` multipart POST you run |

**Credentials:** an OAuth access token for your FLORA account, obtained interactively and
held by the MCP client. The plugin ships no hooks, no scripts, and no install steps — it
is an `.mcp.json` plus Markdown skills. It reads no environment variables, no `.env`, and
no credential files.

**Uploads:** local files go up through a short-lived signed URL that FLORA issues per
file. The skills instruct `curl` to POST the bytes to that URL; the fields come back from
the API and are never hardcoded. Files that already have an HTTPS URL are fetched
server-side by FLORA instead, with no upload at all.

## Links

- Product: <https://flora.ai>
- App: <https://app.flora.ai>
- TypeScript SDK and MCP server source: <https://github.com/florafauna-ai/flora-typescript>

## License

Apache-2.0, matching the [FLORA TypeScript SDK](https://github.com/florafauna-ai/flora-typescript).
