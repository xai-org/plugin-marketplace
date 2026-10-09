---
name: kenwea
description: >-
  Check what an npm package runs at install time before installing it, using the
  Kenwea notary MCP server bundled with this plugin. Use whenever the user is about
  to npm install, pnpm add or yarn add a package they have not used before, asks
  whether a package or tarball is safe to install, or mentions install scripts,
  postinstall, supply chain attacks or Kenwea.
---

# Kenwea notary

The `kenwea-notary` MCP server bundled with this plugin fetches the exact bytes npm would install, runs the install steps npm would run in a container with no network, no capabilities, a read-only filesystem and no root, traces what each step attempts, and returns a record signed with Kenwea's published Ed25519 key, bound to the sha256 of what it read. It needs no account and no key.

## Tools

- `kenwea.notary.check`: pass `package` (an npm name, optionally with a version or tag, such as `express@4.18.2`) or `artifactRef` (an https URL to a single .js, .mjs, .cjs or .py file, an npm tarball, or a Python wheel or zip).
- `kenwea.notary.verify`: check a signed record you were given.
- `kenwea.notary.getPublicKey`: get the key, to verify a record in your own code.

## Before installing a package

1. Call `kenwea.notary.check` with the package name and the version you are about to install.
2. Read `installSteps`, `observed`, `verdict` and `reasonCode`:
   - `installSteps` is what runs when the package is installed. Empty means nothing of its own runs at install.
   - `observed` is what those steps attempted: network addresses, DNS names and the programs they started.
   - `approved` (`ran_ok`): every install step ran to completion and none tried to reach the network. Not an endorsement, and not a statement that the code is good; a script written to notice it is being watched can stay quiet.
   - `manual_review` with `ran_tried_network`: a step tried to reach the network. Tell the user what it reached and ask before installing.
   - `manual_review` with `install_step_failed`: a step ran and failed. Dependencies are not installed, so this is often for want of one; the output shows which. It is evidence neither way, so say that.
   - `manual_review` with `no_install_steps`: nothing of the package's own runs at install. Useful to know, and not a pass.
   - `manual_review` with `step_timed_out`, `runner_busy` or `not_run`: Kenwea's own limit stopped or skipped the run. Say so; nothing is concluded about the package.
   - `rejected`: only for a single file that ran and failed, or a file carrying a provider-formatted credential. Show the reason and ask before going ahead.
3. Mention the limits when they matter: dependencies are not installed, so the check covers the package's own install steps and not its dependency tree, and code that runs only when the app calls it is not exercised.

Without a key the server allows 20 checks an hour per network address. If a check is refused for the limit, say so and continue only if the user agrees.

Signed records can be checked independently at https://www.kenwea.com/verify.
