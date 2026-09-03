# PyTorch CUDA smoke test

This 30-minute example exercises the approval and evidence path before using it on a project issue. It performs one CUDA matrix multiplication in a public, immutable PyTorch container and returns a GPU Repro Capsule.

Ask Grok Bot:

```text
Use /prism-gpu-repro to run this public CUDA smoke test.

Image: pytorch/pytorch:2.13.0-cuda12.6-cudnn9-runtime@sha256:6acf597eeb8e376a96580dde4952f37cc017fef732bb40bfc73f28f25e3f64b4
Duration: 30 minutes
Minimum GPU memory: 40 GiB
Command: python -c 'import torch; assert torch.cuda.is_available(); x=torch.randn(4096,4096,device="cuda"); y=x@x; torch.cuda.synchronize(); print(torch.cuda.get_device_name(0), float(y[0,0]))'
Success condition: exit code 0 and stdout contains a GPU model and a numeric result.
Artifacts: stdout and stderr.

Stop at the Prism wallet approval page until I approve the live quote.
```

Before approval, the Bot can inspect capacity, generate an ephemeral SSH key, and prepare the launch URL. It cannot reserve a GPU or spend funds. After approval and execution, the capsule should contain the exact image and command, observed environment, exit code, logs, cost, refund, and settlement receipt or an explicit `pending` state.
