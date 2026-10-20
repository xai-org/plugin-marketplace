# codetopo plugin for Grok Build

Connect Grok Build to [codetopo](https://aimlds.org/codetopo), a domain-blind code
graph engine. codetopo indexes a repository into a deterministic graph — packages,
modules, files, classes, functions, calls, imports — and answers structural
questions about it over MCP: what calls what, what breaks if this changes, how two
symbols connect. The indexed code is parsed, never executed, and every answer is a
deterministic graph query, not a guess.

## Installation

The plugin runs the `codetopo-mcp` server locally over stdio, so install the
binary first and make sure it is on your `PATH`:

```bash
cargo install codetopo-mcp
```

No Rust toolchain? Prebuilt `codetopo-mcp` binaries for Linux, macOS, and Windows
are attached to the releases at
[github.com/nrupala/codetopo/releases](https://github.com/nrupala/codetopo/releases).

Then, in Grok Build, open `/plugin`, search for **codetopo**, and install. The
plugin's `.mcp.json` starts `codetopo-mcp` with no arguments; there is nothing
else to configure and no account or API key.

## What you get

- **MCP server** `codetopo` (stdio, local) with 12 read-only tools:

| Tool | What it does |
|---|---|
| `codetopo_index` | Index a repository into the local graph store |
| `codetopo_stats` | Node/edge counts and graph diagnostics for an indexed repo |
| `codetopo_search_symbols` | Find symbols by name (ranked, deterministic) |
| `codetopo_get_symbol` | Full detail for one symbol |
| `codetopo_descendants` | Everything a symbol calls or depends on |
| `codetopo_ancestors` | Everything that calls or depends on a symbol |
| `codetopo_blast_radius` | The impact set if a symbol changes |
| `codetopo_path` | A directed dependency path between two symbols |
| `codetopo_neighborhood` | The subgraph around a symbol |
| `codetopo_snapshot` | Export a snapshot carrying a signed proof certificate |
| `codetopo_verify` | Verify a snapshot's certificate and audit chain |
| `codetopo_describe_schema` | The graph schema (node and edge kinds) |

Snapshots are tamper-evident: each one binds the graph hash, a hash-chained audit
log, and an HMAC proof certificate that `codetopo_verify` re-checks independently.

## Example prompts

- "Index this repo with codetopo and show me the symbols with the largest blast radius."
- "What calls `Store::replace_graph`, and what would break if its signature changed?"
- "Find the dependency path between the CLI entry point and the snapshot verifier."
- "Take a codetopo snapshot of this repo and verify its proof certificate."

## Authentication and network

None. The MCP server is a local stdio process: it makes **no network calls**,
needs **no credentials**, and collects **no telemetry**. It reads only the
repositories on your machine that you ask it to index, and its index (a local
SQLite store) stays on your machine. The plugin declares no hooks and requests
no filesystem or shell access beyond running the `codetopo-mcp` binary you
installed.

## Elsewhere

codetopo is also listed on the
[Official MCP Registry](https://registry.modelcontextprotocol.io) as
`io.github.nrupala/codetopo`, on
[Smithery](https://smithery.ai/servers/nrupalakolkar/codetopo), and on
[crates.io](https://crates.io/crates/codetopo-mcp).

## License

AGPL-3.0-or-later — see [LICENSE](https://github.com/nrupala/codetopo/blob/main/LICENSE)
in the codetopo repository.

Support: info@nrupalakolkar.com
