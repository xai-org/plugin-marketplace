---
name: cdn
description: Set up and run CubePath CDN zones, including plans and pricing, origins (web servers, external S3 buckets or CubePath Object Storage buckets), custom domains and SSL, cache and redirect rules, WAF blocking and rate limits, cache purges, signed URLs and traffic analytics. Use when the user wants to put a site or bucket behind the CDN, change what is cached or blocked, purge content, or understand CDN traffic.
---

# CubePath CDN

`cubepath_cdn_zone_list` is the entry point: with no arguments it lists the zones, with `zone_uuid` it gives one zone in detail (origins with their health, rules, price per GB), and with `include_plans` it adds the plan catalog. Every other CDN tool takes the zone UUID.

## Put a site or bucket behind the CDN

1. Plans: `cubepath_cdn_zone_list` with `include_plans: true`. A zone is billed by the hour for its plan plus the traffic served: confirm the plan and the price.
2. `cubepath_cdn_zone_create` with `name`. The zone is published at `<name>.cubecdn.io` with SSL already in place. Pass `custom_domain` to serve it under the user's own domain.
3. Add an origin with `cubepath_cdn_origin_set`. The zone serves nothing until it has one. The easiest way is the full `origin_url` (for example `https://origin.example.com/`).
   - Private S3 bucket at another provider (AWS, Wasabi, R2, Backblaze): enable `s3_auth_enabled` and pass the credentials the user gives you; the edge signs every request.
   - CubePath Object Storage bucket: pass only `name` and `object_storage_bucket_uuid`. This is the only way to serve a CubePath bucket publicly.
4. Custom domain: the user creates a CNAME from their domain to the zone's `cubecdn.io` domain. If the domain is hosted in CubePath DNS, offer to create it with `cubepath_dns_record_create`. The certificate is issued automatically once the CNAME resolves. If issuing failed on DNS and the user has fixed it, call `cubepath_cdn_zone_update` with `retry_ssl` once: Let's Encrypt allows only 5 failed validations per hour.
5. `cubepath_wait_for_status` with `resource_type` `cdn_zone`.

## Rules

Read the current rules with `cubepath_cdn_rule_list` first. There are two families:

- `edge`: `cache`, `cache_bypass`, `redirect`, `header_request`, `header_response`.
- `waf`: `firewall_ip`, `firewall_country`, `firewall_ua`, `rate_limit`, `js_challenge`, and limits on speed, requests, connections and monthly bandwidth.

`cubepath_cdn_rule_set` without `rule_uuid` creates a rule (`rule_type` and `action_config` required); with `rule_uuid` it updates only what is sent (the type is fixed). `match_conditions` limits which requests it applies to and a lower `priority` runs first. To pause a rule set `enabled: false` instead of deleting it with `cubepath_cdn_rule_delete`.

Typical cases:

- Cache static files longer: a `cache` rule on the path or extension with a TTL.
- Never cache an admin area or an API: `cache_bypass`.
- Block a country or abusive IPs: `firewall_country`, `firewall_ip`.
- Bot or scraper traffic: look at `cubepath_cdn_metrics` with `top_user_agents`, `top_asn` and `top_urls` first, then add a `rate_limit` or a `js_challenge`.

Before a blocking rule, confirm its scope with the user so they do not lock out their own visitors or themselves.

## Purge the cache

After the user changes files at the origin: `cubepath_cdn_purge_cache` with `paths` (up to 100; a trailing `*` purges a prefix). Prefer paths over `everything: true`, which sends all traffic back to the origin until the cache fills again. It is asynchronous: check it with `cubepath_cdn_purge_list`. Each organization can request 300 purges per hour, at most 60 of them whole zone or prefix purges.

## Traffic analytics

`cubepath_cdn_metrics` over the last `minutes`, with `metric`: `summary` (requests, bytes, cache hit rate, error rate), `requests`, `bandwidth`, `cache`, `status_codes`, `top_urls`, `top_countries`, `top_asn`, `top_user_agents`, `blocked` (what the WAF stopped and why), `pops`, `file_extensions`. Filters such as `country`, `status`, `cache_status` or `path_prefix` narrow it down.

- Low cache hit rate: check `cache` and `top_urls`, then the rules.
- 5xx errors: check the origin health in the zone detail.

## Maintenance

- Take an origin out of rotation without losing it: `cubepath_cdn_origin_set` with `enabled: false`. A zone can have several origins with weights, priorities and a backup origin.
- `cubepath_cdn_origin_delete` on the only origin leaves the zone returning errors; on a bucket origin it also stops serving the bucket.
- Signed URLs: `cubepath_cdn_token_sign_url` on a zone with Token Auth. Turning Token Auth on for the first time creates a secret that is shown only once, so that is done in the CubePath dashboard.
- Uploaded custom certificates are managed in the CubePath dashboard.
- `cubepath_cdn_zone_delete` removes the zone with its origins and rules and cannot be undone: the domains pointing at it stop responding.
