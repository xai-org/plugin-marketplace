---
name: object-storage
description: Manage CubePath Object Storage (S3 compatible), including tiers and pricing, buckets, versioning, Object Lock, lifecycle expiration, replication, bucket event notifications (webhooks, Slack, Discord), access keys, usage and costs, and serving a bucket through the CDN. Use when the user asks about S3 buckets, storing files or backups on CubePath, storage costs, or bucket events.
---

# CubePath Object Storage

## Read

- `cubepath_object_storage_bucket_list`: buckets with tier, status, size, object count, versioning, protection, tags, CDN connection and month to date cost. It gives the UUID every other tool needs.
- `cubepath_object_storage_bucket_get`: how to connect an S3 client (endpoint, region, path style and virtual host URLs) and this month's usage and cost.
- `cubepath_object_storage_tiers_list`: tiers with location, endpoint, prices per GiB stored, per GiB of egress and per 1,000 requests, and the monthly free allowance.

This plugin does not list, upload or download objects. The user does that with any S3 client (AWS CLI, rclone, an SDK) and an access key.

## Create a bucket

1. `cubepath_object_storage_tiers_list` and explain the prices and the free allowance.
2. Agree on a name: names are global across all CubePath customers, 3 to 63 lowercase letters, digits and hyphens.
3. Decide on Object Lock now: it can only be turned on at creation. In compliance mode nobody can delete the protected data or shorten its retention, and it stays billed until it expires. Explain that before passing `object_lock` and `accept_object_lock_terms: true`.
4. Confirm and call `cubepath_object_storage_bucket_create` with `name`, `tier` and `project_id` (optionally `versioning`, `tags`).
5. `cubepath_wait_for_status` with `resource_type` `object_storage_bucket` (10 to 20 seconds).
6. Access key: the user creates it in the CubePath dashboard, the API or cubecli, because its secret is shown only once and never passes through this conversation. Then give them the endpoint, region and URL from `cubepath_object_storage_bucket_get` for their S3 client.

## Access keys

`cubepath_object_storage_key_list` shows the keys, their permission (`read_write` or `read_only`) and the buckets they are limited to; secrets are never shown. `cubepath_object_storage_key_delete` revokes a key and every application using it loses access within seconds: confirm first.

## Bucket settings

- `cubepath_object_storage_bucket_update`: versioning (`enabled` or `suspended`; once enabled it can never go back to off), deletion protection, and `tags` (replaces every tag; send the full set).
- Lifecycle: read `cubepath_object_storage_bucket_lifecycle_get` first, because `cubepath_object_storage_bucket_lifecycle_set` replaces ALL the rules. Expiration permanently deletes objects in the background, usually within 48 hours of the due date: confirm the bucket, prefix and days. The rules are applied when `applied_generation` equals `generation`. `cubepath_object_storage_bucket_lifecycle_delete` removes all of them.
- Object Lock default retention: `cubepath_object_storage_bucket_object_lock_set`.

## Serve a bucket publicly

Buckets are private. The way to publish one is a CDN zone with the bucket as its origin: `cubepath_cdn_origin_set` with `name` and `object_storage_bucket_uuid` (see the `cdn` skill).

## Replication

- The source bucket needs versioning on and no Object Lock.
- `cubepath_object_storage_replication_create` to ONE destination: another CubePath bucket of the same tier (same cluster, so it is NOT a disaster recovery copy), or an external S3 bucket over HTTPS (billed as egress, including the initial copy of existing objects). Confirm the destination and the cost.
- Follow it with `cubepath_wait_for_status` (`object_storage_replication`) and check health with `cubepath_object_storage_replication_list` or `cubepath_object_storage_replication_get`.
- `cubepath_object_storage_replication_update` pauses, resumes, changes filters or rotates the external key. `cubepath_object_storage_replication_resync` copies existing objects again. `cubepath_object_storage_replication_delete` stops it.
- Replicating into a bucket of another organization needs a grant token, created in the dashboard, the API or cubecli. `cubepath_object_storage_replication_grant_list`, `cubepath_object_storage_replication_grant_delete` and `cubepath_object_storage_replication_revoke` manage incoming replication.

## Event notifications

- Destinations (signed webhooks, Slack or Discord) are created in the dashboard, the API or cubecli. Here they are read with `cubepath_object_storage_event_destination_list` and `cubepath_object_storage_event_destination_get`, changed or disabled with `cubepath_object_storage_event_destination_update`, removed with `cubepath_object_storage_event_destination_delete`, and `cubepath_object_storage_event_destination_test` sends a test event.
- Rules decide which events (created, removed, tagging) under which prefix and suffix go to which destination: `cubepath_object_storage_event_rule_list`, `cubepath_object_storage_event_rule_create`, `cubepath_object_storage_event_rule_update`, `cubepath_object_storage_event_rule_delete`. Deliveries may be billed per million: confirm before creating a rule.
- Events not arriving: check the destination status (`auto_disabled` after repeated failures) and `cubepath_object_storage_event_deliveries_list` for the HTTP status and error of each attempt.

## Usage and costs

- `cubepath_object_storage_usage_get`: the month per tier and per bucket (GiB-month stored, egress, CDN traffic, requests), cost so far and projected cost. Filter or group by `tags` for cost per team or customer.
- `cubepath_object_storage_bucket_metrics`: storage, traffic and responses (2xx to 5xx, 429) of one bucket over time.

## Delete a bucket

`cubepath_object_storage_bucket_delete` only works on an empty bucket. With `force` it first deletes EVERY object and version permanently: get an explicit yes. It is refused while the bucket is protected or served by a CDN origin; remove the origin with `cubepath_cdn_origin_delete` first.
