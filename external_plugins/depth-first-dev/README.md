# Depth First Dev

Deeper engineering judgment. Straightforward code. Evidence that the result meets the business requirement.

An independent, third-party Grok Build plugin for collaborating with developers who want junior-readable, maintainable code without limiting the difficulty of the problems they can solve.

## What it does

The plugin provides one skill, `depth-first-dev`:

- Before rewriting a task, identify the missing professional judgment, original source material, specific methods and tools, and independent evidence of correctness.
- Preserve the task's scope while increasing its rigor.
- Explain the concrete need and simpler alternatives before introducing abstractions.
- Show before/after ASCII call chains before refactoring, and keep each refactor focused.
- Explain the completed change and the evidence behind it in accessible language.
- Preserve existing local plaintext keys without copying them into public artifacts.

The English instructions are adapted from the contributor's supplied collaboration principles. They guide the assistant when the skill is loaded; they do not replace project instructions or enforce behavior through code. Replies follow the user's language.

## Use

When the plugin has been accepted into the xAI marketplace, find `depth-first-dev` through Grok Build's `/marketplace` interface, or install it with:

```sh
grok plugin install depth-first-dev --trust
```

Until acceptance, that catalog installation command is not expected to resolve this submission.

Example requests after installation:

> Use Depth First Dev to make this task more rigorous without making it larger: fix incorrect totals in my monthly report.

> Use Depth First Dev to fix this bug. Explain the change so a junior developer can maintain it, and verify it against the supplied business rule.

> Use Depth First Dev to refactor this function. First show the current and proposed call chains, and keep the behavior unchanged.

## Contents and access

- One skill: [`skills/depth-first-dev/SKILL.md`](skills/depth-first-dev/SKILL.md).
- Plugin metadata: [`.grok-plugin/plugin.json`](.grok-plugin/plugin.json).
- No bundled executable scripts, hooks, slash commands, agents, MCP servers, or LSP servers.
- No runtime dependencies, network endpoints, credentials, telemetry, or additional permissions required by this plugin.

While performing a user's coding task, the host assistant may use tools already available and authorized in that environment. This plugin grants no additional access.

## License

[MIT](LICENSE). Copyright (c) 2026 Depth First Dev contributors.

This project is not authored or endorsed by xAI. Submission to a catalog does not establish acceptance, runtime correctness, or a guarantee of model behavior.
