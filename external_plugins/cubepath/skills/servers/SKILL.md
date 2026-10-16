---
name: servers
description: Deploy, inspect and operate CubePath VPS and dedicated (baremetal) servers, including plans and prices, OS images, power actions, CPU/memory/traffic metrics, resize, reinstall, backups, snapshots, rescue mode, SSH keys and availability groups. Use when the user asks about a server, VM, VPS or dedicated machine on CubePath, wants a new one, or wants to change, repair or delete one.
---

# CubePath servers

## Find the server first

- VPS: `cubepath_vps_list`. There is no "get one server" tool: the listing already carries status, plan, image, public IPs, SSH keys, private network, firewall groups and project. Resolve the `vps_id` from the name there, never guess it.
- Dedicated servers: `cubepath_baremetal_list`, and resolve the `baremetal_id` from the hostname.
- `cubepath_project_list` shows both kinds together with the private networks, grouped by project.
- If two servers have similar names, show both and ask which one.

## Look at a server

| Question | Tool |
|---|---|
| CPU, memory, disk and network over time | `cubepath_vps_metrics` (`time_range`: 30m, 1h, 6h, 24h, 7d) |
| Internet traffic vs private network traffic | `cubepath_vps_metrics` with the `network_public_*` and `network_private_*` metrics |
| Traffic used this month vs included | `cubepath_vps_bandwidth_usage`, compared with the plan's `bandwidth` (TB) from `cubepath_vps_plan_list` |
| Backups and their schedule | `cubepath_vps_backup_list` |
| A whole availability group | `cubepath_vps_availability_group_metrics` |
| Dedicated server traffic | `cubepath_baremetal_metrics` (no CPU or memory on baremetal) |
| Dedicated server temperatures, fans, power state | `cubepath_baremetal_bmc_sensors` |

Report what the tools return. An empty series means there is no data yet (new or powered off server), not zero usage. To advise on a plan change, compare average and peak CPU and memory with the current plan.

## Create a VPS

1. `cubepath_project_list` for the `project_id`. Create a project with `cubepath_project_create` only if the user asks for one.
2. `cubepath_vps_plan_list` narrowed with `location` and, when it helps, `min_ram_gb` or `in_stock_only`. Prices are USD; `price_per_month` is the hourly price x 730. The primary IPv4 and backups are billed apart.
3. `cubepath_vps_template_list` for the `template_name`. Suggest the latest Ubuntu LTS or Debian unless the user wants something else. To deploy a copy of an existing disk, pass `snapshot_id` from `cubepath_vps_snapshot_list` instead.
4. Access: `cubepath_ssh_key_list`. Prefer SSH keys. If the user has none, offer to store their public key with `cubepath_ssh_key_set`: ask them to paste it, never generate one. Never make up a password; ask the user for it.
5. Confirm with the user: name (a valid hostname such as `web-01`), location, plan with its monthly price, image, project, and automatic backups if they want them (extra monthly cost).
6. `cubepath_vps_create`, then `cubepath_wait_for_status` with `resource_type` `vps`. When it is active, give the user the public IP and the SSH command (`ssh root@<ip>`).

Without public IPv4 and IPv6 the server needs a private network (`network_id`). Billing addons only work in projects billed hourly.

## Change a VPS

| Goal | Tool | Before calling it |
|---|---|---|
| Start, stop, restart | `cubepath_vps_power` (`start_vps`, `stop_vps`, `restart_vps`) | Warn that stop and restart interrupt the service |
| Bigger or smaller plan | `cubepath_vps_resize` | Confirm the new price. The disk cannot shrink. The server restarts |
| New OS from scratch | `cubepath_vps_reinstall` | It wipes the disk: explicit yes, and offer a backup first |
| New root password | `cubepath_vps_change_password` | Ask the user for the password |
| Rename, labels | `cubepath_vps_update` | No interruption |
| Move to another project | `cubepath_vps_move_project` | No interruption |
| Authorize or revoke an SSH key | `cubepath_vps_ssh_key_add`, `cubepath_vps_ssh_key_remove` | Confirm which key and which server |
| Private network | `cubepath_vps_network_attach`, `cubepath_vps_network_detach` | Needs a restart to apply. One network per server |
| Boot from an ISO | `cubepath_vps_iso_list`, `cubepath_vps_iso_attach`, restart, later `cubepath_vps_iso_detach` | |
| Lock against destroy and reinstall | `cubepath_vps_protection` | Unlock only when the user explicitly asks |

A server runs one operation at a time: a conflict error means another one is in flight. Follow it with `cubepath_wait_for_status`; never repeat the call.

## Backups and snapshots

- Before anything risky (reinstall, resize, a big upgrade) offer `cubepath_vps_backup_create` and wait until it shows as completed in `cubepath_vps_backup_list`.
- Automatic backups: `cubepath_vps_backup_settings`. Turning them on has a monthly cost; turning them off requires deleting the existing backups first with `cubepath_vps_backup_delete`.
- `cubepath_vps_backup_restore` overwrites the whole disk. Tell the user the date of the backup and get a clear yes.
- Snapshots are permanent copies owned by the organization that survive the server, billed per GB stored each month. Check `cubepath_vps_snapshot_quota`, then `cubepath_vps_snapshot_create`, and follow it with `cubepath_vps_snapshot_get` until it is `available`.

## A server that does not boot, or the user is locked out

1. Check its status in `cubepath_vps_list` and recent `cubepath_vps_metrics`.
2. If the server works and only the password is lost, `cubepath_vps_change_password` is enough.
3. To repair the system: `cubepath_vps_rescue_enable` (it shuts the server down: confirm first). The temporary root password is emailed to the organization and never shown here; SSH keys from `cubepath_ssh_key_list` can be added. Follow it with `cubepath_vps_rescue_get`, which gives the SSH address and warns if the firewall blocks SSH.
4. When the repair is done, `cubepath_vps_rescue_disable` boots the server from its disk again.

## Destroy a VPS

1. Name the exact server (name, IP, project) and ask for explicit confirmation: its data and backups are lost for good. Snapshots are kept.
2. Ask whether to keep its public IPs in the organization (`release_ips: false`, they stay billed) or release them.
3. A protected server is refused. Remove protection with `cubepath_vps_protection` only if the user asks for it.
4. `cubepath_vps_destroy`, then `cubepath_wait_for_status`.

## Availability groups

They spread servers across different physical hosts so a host failure does not take them all down. Create one with `cubepath_vps_availability_group_create` (free, tied to one location), then deploy servers with `availability_group_uuid` or add existing ones with `cubepath_vps_availability_group_member`. `cubepath_vps_availability_group_list` shows the groups of a project. Good fit for servers behind a load balancer.

## Dedicated (baremetal) servers

- Models, stock and prices: `cubepath_baremetal_catalog` with `location`, `model_name` or `in_stock_only`. USD per month plus a setup fee.
- `cubepath_baremetal_deploy` charges the user's card at once (setup fee plus the first month, not prorated, not reversible). Always state the model, location and exact amount and wait for a clear yes. If the bank asks for 3D Secure, the user completes it in the CubePath dashboard.
- Reinstall: `cubepath_baremetal_catalog` with `baremetal_id` for a compatible `os_name` and `disk_layout_name`, then `cubepath_baremetal_reinstall` with `install`. It wipes every disk and baremetal has no automatic backups.
- Power: `cubepath_baremetal_power` (`start_metal`, `stop_metal`, `restart_metal`) cuts power abruptly, with no clean shutdown. Check the result with `cubepath_baremetal_bmc_sensors`.
- Recovery: `cubepath_baremetal_recovery` with `rescue` (credentials are emailed) or `reset_bmc` when the management controller hangs.
- Hostname, tags, protection, project and SSH keys: `cubepath_baremetal_update`. Private network: `cubepath_baremetal_network`.
- The remote console (KVM) is only available in the CubePath dashboard.
