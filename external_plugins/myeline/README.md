# Myeline

Plug-and-play memory for AI agents, with receipts.

Myeline connects an agent to a reviewed knowledge base that survives every
session. The agent searches it before answering questions about the user's
preferences, history, decisions, and projects, saves what the user asks it to
remember, and every memory carries its source. Machines propose, humans
approve: nothing becomes memory without the user's click in the Myeline
workspace.

This plugin adds the hosted Myeline MCP server (streamable HTTP with OAuth).

- Server: https://cortex.myeline.si/mcp
- Sign up free: https://workspace.myeline.si
- Docs: https://github.com/Sandbox-Group-LLC/myeline-mcp
- Privacy: Myeline stores only what the user asks the agent to send. It never
  reads conversations or files on its own.

## Tools

- `cortex_query` - search the knowledge base; every answer shows its source
- `cortex_remember` / `cortex_add_fact` - stage a memory for user approval
- `cortex_retract` - remove a memory with a stated reason
- `cortex_daily_card` - file a day's card when the user asks for it
- `cortex_save_prompt` / `cortex_prompt` - saved prompts by #handle

MIT License. By Sandbox Group LLC.
