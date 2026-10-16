# CubePath plugin for Grok Build

Connect Grok Build to [CubePath](https://cubepath.com) and check and operate your cloud
infrastructure from a conversation: servers and their metrics, DNS, CDN, private
networks, floating IPs, firewalls, load balancers, NAT gateways, managed Kubernetes,
managed databases and object storage.

## Installation

In Grok Build, open `/plugin`, search for **CubePath**, and install. Or from the shell:

```bash
grok plugin install cubepath --trust
```

On first connection, Grok opens the CubePath sign-in in your browser. Sign in with your
CubePath account and choose which permissions to grant, for example read only access or
write access to DNS. No API key is needed and nothing should be pasted into chat.

## What you get

- **MCP server** `cubepath` at `https://mcp.cubepath.com/mcp` (Streamable HTTP, OAuth 2.1).
- **Skills** that guide each area step by step:

| Skill | Covers |
|---|---|
| `get-started` | First steps: what the account already has and what to do next |
| `servers` | VPS and dedicated servers: plans and prices, power actions, metrics, resize, reinstall, backups, snapshots, rescue mode, SSH keys |
| `dns` | DNS zones and records, nameserver checks, GeoDNS, health check failover |
| `cdn` | CDN zones, origins, custom domains and SSL, cache and redirect rules, WAF, purges |
| `networking` | Private networks, floating IPs and reverse DNS, firewalls, load balancers, NAT gateways |
| `kubernetes` | Managed Kubernetes clusters, node pools and autoscaling, addons |
| `databases` | Managed MySQL, PostgreSQL and Valkey: replicas, users, backups, metrics |
| `object-storage` | S3 compatible buckets: versioning, lifecycle, replication, access keys, usage |

## Example prompts

- "Show me my CubePath servers and their status."
- "How much CPU has my web server used in the last 24 hours?"
- "Add a DNS record pointing app to my server's IP."
- "Which VPS plans can I deploy in Barcelona and what do they cost per month?"

## Permissions and safety

The plugin only sees the organization and projects your account belongs to, and every
action runs with your role in that organization and the permissions you granted when
connecting. Anything destructive or billable asks you first. You can revoke access at any
time from Account > Connections in the [CubePath dashboard](https://my.cubepath.com).

Billing, payments and account top ups stay in the CubePath dashboard.

## Authentication and network

The plugin ships no code that runs on your machine: only the MCP server configuration and
the skills above. It connects to:

- `https://mcp.cubepath.com`: the MCP server.
- `https://identity.cubepath.com`: OAuth 2.1 authorization code with PKCE and dynamic
  client registration. Grok handles the flow and keeps the token.

A CubePath account is required.

## Support

- Website: https://mcp.cubepath.com
- Support: https://cubepath.com/contact
- Privacy policy: https://cubepath.com/policy
- Terms of service: https://cubepath.com/terms

## License

Proprietary. Copyright CubePath.
