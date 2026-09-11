---
name: gb-unification-pass
description: Review a PR or a Linear ticket for the Grok Build Agent Host migration (the ACP adapter to the agent-host daemon). Checks that it reuses the types that exist, that it is one PR-sized piece of work, and that it is responsible for one thing. Skips anything that is not Agent Host migration work.
user-invocable: true
disable-model-invocation: true
argument-hint: "[PR number, Linear ticket, or 'local']"
---

# GB Unification Pass

Review one PR or one Linear ticket that is part of the Agent Host migration: the work that makes Grok Build run against the agent-host daemon through the ACP adapter (`xai-grok-pager/src/acp/agent_host`, `xai-grok-agent-host-backend`, `xai-grok-login`, and the daemon side in `everysphere`). Three goals, one section each:

1. **Existing types first.** The change uses the types, helpers, and wire shapes that already exist, on both sides of the protocol.
2. **PR-sized pieces.** A large feature is split into steps that each ship as one PR of a few hundred lines.
3. **One thing per PR.** A PR changes protos, or adds a component, or wires a behaviour. Never two of these.

## 0. Is this Agent Host migration work?

**Goal.** The pass runs only on migration work. Anything else is skipped with one line saying so.

Migration work touches at least one of: `crates/codegen/xai-grok-pager/src/acp/agent_host/`, `crates/codegen/xai-grok-agent-host-backend/`, the agent-host parts of `xai-grok-login`, the `agent_host.proto` or `agent.proto` schema, or the everysphere packages `agent-host`, `agent-host-daemon`, `agent-host-exec`, `xai-grok-agent-host`, `xai-grok-local-loop`. A Linear ticket counts when it is in the "Agent host" project or carries the `adapter` label.

If none of these holds, write "Not Agent Host migration work; skipped." and stop. Do not review it under these rules.

## 1. Existing types first

**Goal.** No new type, helper, or wire shape does a job an existing one already does.

- **Protocol types.** ACP has a type for most things: `SessionUpdate::UsageUpdate` for context size, `ToolCall` and `ToolCallUpdate` for tools, `RequestPermission` for approvals, `Plan` for todo lists. Use the ACP type before an `x.ai/*` extension. Use the `x.ai/*` extension the shell already sends before inventing a new one. The pager already deserializes the shell's shapes (`SessionInfoResponse`, `AuthMeta`, `ExtMethodResult`); answer in those shapes and the pager needs no change.
- **Daemon types.** The daemon's protobuf already names the thing: `ConversationTokenDetails`, `SelectedContext`, `AgentSkill`, `TurnOutcome`. Map the proto type to the ACP type in the backend crate. Do not define a third type between them for the same pair of numbers.
- **One shape across the path.** The value that leaves the backend crate is the value the reader signals, the worker stores, and the handler reads. A `ContextSize { used, total }` beside an `acp::UsageUpdate { used, size }` is two shapes for one fact; keep the ACP one.
- **Shell code is reusable.** The shell's scanners, builders, and result helpers (`ExtMethodResult::success(..).to_ext_response()`, `build_skill_information_for_refs`, the skills scanner) are called, not copied. If a shell type is private, the fix is `pub` in the shell, not a copy in the worker.
- **Test helpers too.** Before adding a fixture or a request builder, check `test_utils.rs` and the sibling `*_tests.rs` files for one that exists.

Report each new type, helper, or shape the change adds, and for each either the existing one it should use or the one-line reason none exists.

## 2. PR-sized pieces

**Goal.** Each piece is one PR of a few hundred changed lines including its test, with one behaviour a reviewer can state in a sentence.

Split by event or method first, by layer second:

- **By event or method.** One daemon event, one ACP method, one RPC, one slash command per piece. Subagents is not one piece; it is: map `subagent_started`, map `background_task_completed`, attach to the child session on start, forward the child transcript while it runs, abort on cancel, abort on quit.
- **By layer, when one event needs several.** Backend crate mapping (proto to `SessionEvent`), then journal reader or worker (to ACP or to state), then pager (UI). Each layer has its own test and ships on its own. List them in dependency order.
- **A decision is its own first piece** only when it blocks more than one PR or needs someone outside the team. Otherwise it is the first step of the PR that needs it.
- **Deletion is its own last piece.** The PR that removes the old path never ships with the one that adds the new path.

Too small is also wrong. A piece that changes one match arm, one field, or one assertion merges into its neighbour. A piece a reviewer approves in one sitting is the target.

For a ticket: write the list of pieces, one line each, in the order they land. For a PR: say which piece it is and whether it is one piece or several.

## 3. One thing per PR

**Goal.** A reviewer can state what the PR does in one sentence with no "and".

These are separate PRs, always:

- **Proto changes.** A new RPC or a new field on `agent_host.proto` ships alone, with the regenerated bindings, before any PR that uses it.
- **A new component.** A new module, a new service, a new worker handler file ships with its tests and nothing wired to it, or wired with the smallest possible call.
- **Wiring a behaviour.** The PR that makes the pager show the thing, or the worker answer the method.
- **A rename or a move.** Never in the same PR as a behaviour change.
- **A deletion.** See above.

A PR that touches both `everysphere` and the `xai` monorepo is two PRs. A PR that adds a proto field and uses it is two PRs.

## Report

For a PR: three sections (types, size, one thing), each with the finding and the concrete change: the type to use, the split to make, the part to pull out. For a ticket: the same three, with the piece list under size.

## Cost rules

This pass reads and reports. It does not edit code or tickets unless the user asks. It does not run cargo, tests, or any build. Its evidence is the diff, the proto, and `rg`.
