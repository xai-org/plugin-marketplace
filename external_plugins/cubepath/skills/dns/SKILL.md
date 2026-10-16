---
name: dns
description: Host and manage domains in CubePath DNS, including creating or importing zones, verifying nameservers, adding, changing or deleting records (A, AAAA, CNAME, MX, TXT, SRV...), GeoDNS, SOA timers and health check failover. Use when the user wants to point a domain or subdomain somewhere, set up email records, move a domain's DNS to CubePath, or find out why a name does not resolve.
---

# CubePath DNS

Hosting zones is free. Every DNS tool takes the zone UUID: start with `cubepath_dns_zone_list` to translate the domain into its UUID, and use `cubepath_dns_record_list` to get a record UUID. Never pass a domain name where a UUID is expected.

CubePath does not register domains: the user buys them at a registrar and points the nameservers here.

## Host a domain

1. `cubepath_project_list` for the `project_id`.
2. Moving from another DNS provider: `cubepath_dns_zone_scan` with `domain` and `project_id` creates the zone and imports what public DNS answers today. It only adds records, never overwrites. For a new domain, `cubepath_dns_zone_create`.
3. Review the result with `cubepath_dns_record_list`. The scan only sees what public DNS answers, so ask the user about anything that may be missing (for example DKIM selectors or names nobody queries).
4. `cubepath_dns_zone_get` gives the nameservers. The user sets them at their registrar.
5. `cubepath_dns_zone_verify`. It is asynchronous: check `cubepath_dns_zone_get` later to see the zone turn `active`. Do not call it in a loop; after a failed verification it can only be retried once per hour.

Until the zone is verified, records are stored but not published.

## Records

- Create: `cubepath_dns_record_create`. `name` is `@` for the root domain or the subdomain (`www`, `app`).
- Pointing at a CubePath server: take its public IP from `cubepath_vps_list`, `cubepath_baremetal_list` or `cubepath_floating_ip_list`.
- Change: `cubepath_dns_record_update` touches only the fields sent. The type cannot change: delete the record and create a new one. Before moving a site to another IP, suggest lowering the TTL first.
- Delete: `cubepath_dns_record_delete`. Confirm first and, when several records share the name, show which one by its content.
- SOA records and the NS records of the root domain are managed by CubePath and get rejected.
- A zone holds up to 1000 records: filter `cubepath_dns_record_list` with `record_type` or `name_contains`, or page with `limit` and `offset`.

Email records (MX, SPF, DKIM, DMARC) come from the user's email provider. Ask for the exact values; never invent them.

## GeoDNS and failover

- GeoDNS: `cubepath_dns_region_list` gives the region codes to set in a record's `region`. Any region other than `global` needs the DNS Pro or Business plan.
- Health checks: `cubepath_dns_health_check_set` on an A or AAAA record withdraws that value from the answers while its target is down, which gives automatic failover between several IPs of the same name. It needs DNS Pro or Business and costs 10 USD per month per check: confirm before creating one. It replaces the whole check configuration, so send the unchanged fields too.
- State and uptime: `cubepath_dns_health_check_list`. Incidents over a period: `cubepath_dns_health_check_history`.

## "My domain does not resolve"

1. `cubepath_dns_zone_get`: if the zone is not `active`, the nameservers at the registrar are wrong or have not propagated yet.
2. `cubepath_dns_record_list` filtered by the name: does the record exist with the expected content?
3. `cubepath_dns_health_check_list`: a failing check removes its value from the answers.
4. Caches: resolvers keep answers for the TTL, and negative answers for the SOA `minimum` (`cubepath_dns_soa_get`).

## Other

- Reverse DNS (PTR) is not part of the zone: it is set on the IP with `cubepath_floating_ip_reverse_dns_set`.
- `cubepath_dns_soa_update` changes SOA timers; the defaults are right for almost everything, so only change them if the user asks.
- `cubepath_dns_zone_move_project` only regroups the zone.
- `cubepath_dns_zone_delete` removes the domain with ALL its records and cannot be undone. To stop serving a single name, delete only that record.
