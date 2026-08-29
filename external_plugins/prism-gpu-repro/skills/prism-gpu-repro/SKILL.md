---
name: prism-gpu-repro
description: Run bounded, reproducible GPU and CUDA work through Prism Network and return an evidence capsule with environment facts, logs, artifact hashes, cost, and public settlement proof. Use for GPU-only bug reproduction, pinned-container compatibility checks, model evaluation, inference benchmarks, or other non-confidential workloads that need a clean external GPU. Trigger on Prism Network, GPU repro, CUDA repro, clean GPU, L40S, GPU benchmark, or proof-carrying compute requests.
---

# Prism GPU Repro

Give the task a temporary GPU capability. Keep wallet authority, secrets, and production control with the user.

## Check the capability

Require these tools from the plugin's `prism-network` MCP connector:

- `prism_gpu_capacity`
- `prism_prepare_gpu_repro`
- `prism_gpu_receipts`

If any tool is unavailable, stop and ask the user to enable the Prism GPU Repro plugin. Do not substitute a generic GPU, lease, payment, or shell-execution tool. In particular, never use a fallback that creates or funds a lease during preparation or cannot bind the approved OCI image digest.

## Establish the contract

Require:

- A concrete success or failure condition.
- A public source revision or sanitized input artifact.
- A public OCI image pinned to `repository@sha256:<digest>`.
- The command to run and artifacts to retain.
- One of 30, 60, 120, or 360 minutes.
- A minimum GPU memory requirement.

Use only public or explicitly non-confidential data. Independent providers may operate the assigned GPU. Refuse credentials, private model weights, customer data, unreleased source, wallet material, or any workload whose data boundary is unclear.

If the user supplies a mutable image tag, resolve its current registry digest and show the pinned reference before continuing. Never substitute `latest` or another moving tag.

## Prepare isolated access

Create a task-specific directory and an ephemeral Ed25519 key. Keep the private key on the Bot computer.

```sh
capsule_dir=$(mktemp -d)
ssh-keygen -q -t ed25519 -N '' -C prism-gpu-repro -f "$capsule_dir/id_ed25519"
```

Send only the contents of `id_ed25519.pub` to Prism. Never send the private key, an SSH agent socket, a seed phrase, or a wallet key.

## Plan before spending

1. Call `prism_gpu_capacity` with the memory floor.
2. Select the shortest duration that safely fits the repro.
3. Call `prism_prepare_gpu_repro` with the pinned image, duration, memory floor, and ephemeral public key.
4. Present the estimated GPU, exact image digest, duration, and maximum USDG escrow.

Treat the result as a live estimate, not a reservation. Capacity and the final quote can change before funding.

## Hold the approval boundary

The preparation tool is read-only. Funding is not.

Open the returned approval URL only after showing the plan. Let the user review the live quote and approve the wallet transaction in Prism. Do not click a wallet confirmation, export wallet material, bypass a signing prompt, or claim a lease exists until Prism confirms it.

Use Grok Bot's browser handoff for Prism sign-in and wallet approval. Resume only after the user returns control and the page confirms the lease. The Bot may continue through the Prism lease page to read the workspace endpoint; the user must not copy wallet material or a private key into chat.

Stop if the final GPU, image, duration, or maximum escrow differs from the approved plan. Ask for renewed approval.

## Execute the repro

Wait for the lease to expose SSH access in Prism. Connect with the ephemeral key and an isolated host-key file:

```sh
ssh -i "$capsule_dir/id_ed25519" \
  -o IdentitiesOnly=yes \
  -o ForwardAgent=no \
  -o ClearAllForwardings=yes \
  -o UserKnownHostsFile="$capsule_dir/known_hosts" \
  -o StrictHostKeyChecking=accept-new \
  -p <port> <user>@<host>
```

Prefer a public repository and exact commit so the remote workspace can fetch inputs without credentials. Before transferring a local artifact, inspect its contents and exclude `.env`, credentials, tokens, wallet files, private source, and user data.

Capture these facts before running the workload:

```sh
nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv,noheader
python3 --version
```

Record the source commit, image digest, exact command, UTC start and finish, exit code, stdout, stderr, and artifact hashes. Do not include hostnames, device UUIDs, access tokens, or ephemeral endpoints in a public capsule.

Run only the agreed command. Do not turn a repro into a persistent service, miner, network scanner, or unrelated workload.

## Close and verify

Download the agreed artifacts before expiry. Confirm access closes at the lease boundary. Remove only the task-specific private key after access is closed; retain the non-secret capsule files.

Call `prism_gpu_receipts` after settlement finalizes. A receipt may not exist immediately. Mark it `pending` and retry later instead of inventing proof.

State the proof boundary exactly: a Prism receipt links platform-attested metering to an onchain settlement event. It does not independently prove honest hardware execution, confidential computing, or contract correctness.

## Return a GPU Repro Capsule

Use this compact structure:

```text
GPU Repro Capsule
Status: pass | fail | inconclusive

Workload
- source revision
- OCI image digest
- exact command
- success condition

Execution
- GPU model and memory
- driver, CUDA, and relevant framework versions
- UTC start/end, runtime, exit code

Evidence
- stdout/stderr paths
- artifact paths and SHA-256 hashes
- important observed result

Economics
- maximum escrow
- charged and refunded USDG, or settlement pending

Proof
- receipt ID and settlement transaction, or pending
- proof boundary

Follow-up
- smallest next action if fail or inconclusive
```

Never report `pass` without the declared success condition and supporting artifact. Never report hardware attestation when only platform metering exists.
