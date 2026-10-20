---
name: kubernetes
description: Create and operate CubePath managed Kubernetes clusters, including versions, worker plans and prices, node pools and autoscaling, marketplace addons (ingress, monitoring, storage...), cluster health and node metrics, and deletion. Use when the user wants a Kubernetes (k8s) cluster on CubePath, needs more or fewer nodes, wants to install an addon, or asks why a cluster or node is unhealthy.
---

# CubePath managed Kubernetes

CubePath runs the control plane (standard or high availability). The workers are VPS billed to the organization, so every node added costs money.

## Read

- `cubepath_k8s_cluster_list` lists the clusters and gives the UUID every other tool needs.
- `cubepath_k8s_cluster_get` with `view`:
  - `overview` (default): API endpoint, CIDRs, private network, node pools with their workers, and the latest health.
  - `node_pools`: pools with their scaling, labels and taints.
  - `addons`: installed addons and the state of each installation.
  - `load_balancers`: the load balancers pointing at the workers.
  - `metrics`: ready nodes, pending and failed pods, API latency; with `node_name`, the series of one worker.

## Create a cluster

1. `cubepath_k8s_catalog` with `catalog: versions` for the version and the control plane price, then `catalog: plans` for the worker plans that version accepts. Never make up a version or a plan.
2. `cubepath_project_list` for the `project_id` (and the `network_id` if the user wants an existing private network).
3. Summarize and get a yes: location, version, high availability control plane or not, each node pool (plan x number of workers), and the monthly estimate (control plane plus the workers as VPS).
4. `cubepath_k8s_cluster_create` with `project_id`, `name`, `location_name`, `version`, `node_pools` and `ha_control_plane`.
5. `cubepath_wait_for_status` with `resource_type` `kubernetes`. Creating a cluster can outlast one wait: call it again, never create the cluster twice.

The kubeconfig is downloaded from the CubePath dashboard (or with cubecli). This channel never returns it, because it is a full admin credential.

## Scale

- More workers in an existing pool: `cubepath_k8s_node_pool_update` with `add_nodes`, or `desired_nodes` for the total. Lowering `desired_nodes` DESTROYS the newest workers: confirm first.
- Autoscaling: `auto_scale` with `min_nodes` and `max_nodes`. A `min_nodes` above the current count creates workers right away, which adds cost.
- A different worker size, or workloads kept apart: `cubepath_k8s_node_pool_create` with its own plan (from `catalog: plans`), labels and taints.
- Do not send `add_nodes` together with `desired_nodes` in one call. The cluster has to be active with no other operation running.

## Addons

1. `cubepath_k8s_catalog` with `catalog: addons` to turn the addon name into its `slug`.
2. `cubepath_k8s_addon_install`. It installs in the background.
3. Check the outcome with `cubepath_k8s_cluster_get` and `view: addons`.

`cubepath_k8s_addon_uninstall` takes the `addon.uuid` shown in `view: addons`. Removing an ingress controller or monitoring stack can cut traffic or alerts: confirm first.

## Troubleshoot

1. `view: overview` for the API server and worker health.
2. `view: metrics` for not ready nodes, pending or failed pods and API latency.
3. `view: metrics` with `node_name` for one worker (Ready, kubelet CPU and memory, and its server's usage).
4. To remove a broken worker: `cubepath_k8s_delete` with `target: worker` and its `vps_id` drains and destroys it. Then check the pool size in `view: node_pools` and add a worker with `add_nodes` if needed.

## Delete

`cubepath_k8s_delete` with `target`:
- `cluster`: removes the control plane and ALL workers, and the workloads with them.
- `node_pool`: removes a pool and its workers (not the last pool of a cluster).
- `worker`: drains and removes one node.

It cannot be undone: always confirm, naming the cluster. A protected cluster is refused; turn protection off with `cubepath_k8s_cluster_update` only if the user asks. Suggest protection for production clusters.
