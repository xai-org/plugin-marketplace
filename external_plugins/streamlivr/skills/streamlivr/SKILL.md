---
name: streamlivr
description: "Discover African and global creator profiles, engagement metrics, and music metadata over x402 on Celo."
---

# Streamlivr Discovery Skill for Grok

Allows Grok to discover creators, search music releases, and query real-time social engagement statistics using Streamlivr's Model Context Protocol (MCP) server.

## Connected Remote Server
- Endpoint: `https://api.streamlivr.com/mcp`
- Protocol: Streamable HTTP (JSON-RPC)
- Settlement: x402 on Celo Mainnet ($0.01 USDC per creator credited)

## Available Tools
- `creator_listings(q, limit, verified, minFollowers)`: Search creators and verified brand profiles.
- `music_catalog(q, limit)`: Query music releases, ISRC codes, and album cover artwork.
- `public_posts(creator_id, sort, limit)`: Retrieve public posts and engagement metrics.
- `creator_profile(id)`: Fetch detailed creator profile.
- `x402_ping()`: Liveness check.
