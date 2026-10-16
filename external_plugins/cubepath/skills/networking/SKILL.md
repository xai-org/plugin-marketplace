---
name: networking
description: Manage CubePath networking, including private networks with static routes and BGP, public and floating IPs with reverse DNS, firewall groups for VPS and dedicated servers, load balancers (listeners, targets, health checks) and NAT gateways. Use when the user wants servers to talk privately, open or close ports, put servers behind a load balancer, give private servers Internet access, get another public IP or set a PTR record.
---

# CubePath networking

## Private networks

- Read: `cubepath_project_list` is the only way to see the private networks and the servers attached to them.
- Create: `cubepath_network_create` with `name`, `location_name`, `ip_range` and `prefix` (for example `10.10.0.0` and `24`) and `project_id`. Each organization has a network limit (3 by default). The network starts empty.
- Attach servers: `cubepath_vps_network_attach` (the VPS needs a restart) or `cubepath_baremetal_network` (the interface has to be configured inside the OS). One network per server, in the same location.
- Traffic between servers over a private network is free and is not filtered by the firewall.
- Static routes: `cubepath_network_route_list`, `cubepath_network_route_create` (30 per network), `cubepath_network_route_delete`.
- BGP: `cubepath_network_bgp_peer_list`, `cubepath_network_bgp_peer_create` (8 per network; the network needs an attached server first), `cubepath_network_bgp_peer_update` (`enabled: false` brings a session down and keeps it), `cubepath_network_bgp_peer_delete`.
- `cubepath_network_delete` only works when no server or NAT gateway is attached.

## Firewalls

Rules are allow rules grouped in firewall groups, and groups are applied to servers. Once a server has an enabled rule, any inbound traffic to its public IPs that no rule allows is dropped. Outbound traffic from a VPS is allowed.

1. `cubepath_firewall_group_list` to see the groups and their rules.
2. `cubepath_firewall_group_set`. Without `group_id` it creates a group (`project_id`, `name`, `rules`); with `group_id` it edits one. `rules` REPLACES the whole list: always send the unchanged rules too. A rule is `direction` (`in`/`out`), `protocol`, optional `port` (`443`, `8000-8100`, `80,443`) and optional `source` (IP or CIDR; omitted means anyone).
3. Keep SSH reachable: include an inbound tcp rule for port 22 (or the user's SSH port) unless the user explicitly says otherwise.
4. `cubepath_firewall_server_set` with `server_type` (`vps` or `baremetal`), `server_id` and `firewall_group_ids` in evaluation order. It REPLACES the assignment; an empty list turns the firewall off and leaves the server open, so confirm that. Groups must be in the server's project.
5. Confirm it applied with `cubepath_firewall_server_list` (`last_sync.status` `completed`).

On dedicated servers the rules are enforced on the switch without connection state: only `in` rules apply, ICMP is always allowed, and replies are let in for TCP and for UDP from ports 53 and 123.

To pause a group set `enabled: false`. `cubepath_firewall_group_delete` only works on a group that is not applied anywhere.

## Public IPs

- `cubepath_floating_ip_list`: the organization's IPs, the server each one is assigned to, whether it is the primary IP, and its PTR. `view: history` answers questions about the past.
- An extra IP: look for an unassigned one in the list first. `cubepath_floating_ip_acquire` (`ip_type`, `location_name`) starts a monthly charge right away, even while the IP is unassigned: confirm first. The platform picks the address.
- Assigning an IP to a server or unassigning it is done in the CubePath dashboard; there is no tool for it here.
- Reverse DNS: `cubepath_floating_ip_reverse_dns_set` with `address` and `hostname` (omit `hostname` to clear it). The IP has to be assigned to a server. For a mail server, the hostname should also have an A record pointing back to the same IP.
- `cubepath_floating_ip_release` gives the IP back for good: it cannot be recovered and it cannot be a server's primary IP. At most 3 releases per 24 hours. Confirm first.

## Load balancers

1. `cubepath_lb_plan_list`: plans per location with hourly price in USD, maximum listeners, maximum targets and connections per second. Confirm the plan and its monthly price (hourly x 730; public IPs are billed apart).
2. `cubepath_lb_create` with `name`, `plan_name`, `location_name` and `project_id`. Wait with `cubepath_wait_for_status` (`load_balancer`).
3. `cubepath_lb_listener` with `action: create`: `name`, `protocol` (`http`, `https` or `tcp`), `source_port`, `target_port`, `algorithm`. An `https` listener needs `ssl_certificate_uuid`, a certificate uploaded in the CubePath dashboard: there is no tool to list or upload certificates, so ask the user for it.
4. `cubepath_lb_listener` with `action: set_health_check`, so failing servers stop receiving traffic.
5. `cubepath_lb_target` with `action: add`: VPS, dedicated servers or a whole availability group, up to 50 per call.
6. `cubepath_lb_list` shows everything, including the health of each target. `cubepath_lb_metrics` shows connections and traffic.

Maintenance: `drain` a target before working on that server (no new requests, current ones finish); `remove` cuts its connections at once. Resize with `cubepath_lb_update` and `plan_name`, in a call of its own (it reboots the balancer). `cubepath_lb_delete` releases its IPs and cannot be undone.

## NAT gateways

They give Internet access to servers that only have a private IP.

1. The servers must be in a private network (see above).
2. `cubepath_nat_list` with `include_plans: true`. Billed hourly, and it uses one public IPv4 and one IPv6: confirm the plan and the price.
3. `cubepath_nat_create` with `name`, `plan_name` and `network_id`. One gateway per network; the default route is managed for you.
4. `cubepath_wait_for_status` with `nat_gateway`.

Traffic: `cubepath_nat_metrics`. Resize: `cubepath_nat_update` with `plan_name` alone (outbound traffic stops for a moment). `cubepath_nat_delete` leaves the network's servers without Internet access and the outbound IP is not recovered: confirm first.
