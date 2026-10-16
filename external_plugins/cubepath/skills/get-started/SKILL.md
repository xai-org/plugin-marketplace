---
name: get-started
description: First steps with the CubePath plugin. Use when the user connects CubePath for the first time or asks what they can do with their CubePath account.
---

# Getting started with CubePath

CubePath is a cloud provider: VPS and baremetal servers, DNS, CDN, private networks, floating IPs, firewalls, load balancers, NAT gateways, managed Kubernetes, managed databases and object storage.

## First conversation

1. Call `cubepath_project_list` to see what the user already has. Projects group every resource, and this tool is also the way to read a server's details (there is no separate "get server" tool).
2. Summarize it briefly: number of projects, servers and their status, and any other resources present.
3. Suggest two or three next steps that fit what you found, for example checking the metrics of a busy server, adding a DNS record or reviewing firewall rules.

If the account is empty, explain what CubePath offers and point to the plans with `cubepath_vps_plan_list`. Do not create resources unless the user asks for it.

## Rules

- Only the tools the user granted when connecting are available. If a tool is missing, the user did not grant that permission: tell them they can reconnect CubePath and grant it, instead of trying another route.
- Creating servers, load balancers, clusters or databases is billed to the user's CubePath account. State the plan and monthly price before creating anything and wait for an explicit yes.
- Stopping, restarting, resizing, detaching, deleting or overwriting interrupts a service or loses data. Name the exact resource and ask for confirmation first.
- Long operations are queued and return at once. Follow them with `cubepath_wait_for_status` or the list tools; never repeat the call.
- Payments, balance top ups, invoices and account settings are handled in the CubePath dashboard at https://my.cubepath.com, not here.
