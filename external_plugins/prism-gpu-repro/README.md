# Prism GPU Repro for Grok Bot

Give a Bot a temporary GPU only when a task actually needs one.

This plugin combines a GPU-reproduction skill with Prism Network's hosted MCP connector. A Bot can inspect live capacity, prepare a time- and cost-bounded launch, run a public CUDA workload on a clean external GPU, and return a GPU Repro Capsule with environment facts, logs, artifact hashes, actual cost, refunds, and public settlement proof.

The concrete use case is simple: hand a Bot a public GitHub issue that only fails on CUDA and get back evidence another engineer can inspect.

## What the plugin provides

- `/prism-gpu-repro` runs the end-to-end reproduction workflow.
- `prism_gpu_capacity` lists aggregated, schedulable GPU classes and starting rates.
- `prism_prepare_gpu_repro` validates a digest-pinned workload and prepares a live approval URL with a cost ceiling.
- `prism_gpu_receipts` reads public settlement receipts.

The MCP tools are read-only. They cannot create a lease, sign a transaction, spend funds, read a private SSH key, or operate infrastructure. Funding remains a separate user-approved action in Prism's web application.

## Network and permissions

The plugin connects to:

- `https://prismnetwork.tech/api/mcp` for public capacity, launch preparation, and receipts.
- `https://prismnetwork.tech/compute` only when the user chooses to review and fund a prepared lease.

No API key is required for the MCP tools. Funding requires a Prism account and explicit wallet approval in the browser. Never give a Bot a seed phrase or wallet private key.

## Proof boundary

Prism is pre-production. Use public images and non-confidential data only; independent providers may operate the assigned GPU. Published receipts link platform-attested metering to onchain settlement. They are not hardware-rooted execution attestation or confidential-computing proof.

Try the [PyTorch CUDA smoke test](examples/pytorch-cuda-smoke.md) before using a project-specific workload.

## License

Apache-2.0
