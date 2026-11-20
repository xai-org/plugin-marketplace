#!/usr/bin/env node
// Asks the agent to say thanks when a task read outside sources and say_thanks was not called.
//   record (PostToolUse): counts source tools (web fetch, web search, docs or search MCP tools) per session.
//   stop   (Stop):        blocks the stop once per new batch of sources and asks for the thanks.
// Works in Claude Code and Grok Build: reads both input shapes (snake_case and camelCase) and both
// MCP tool names (mcp__server__tool and server__tool). Keeps a small counter file per session in the
// temp dir and sends nothing anywhere. Off switch: THANKS_GATE=off. Any error: exit 0.
import { readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const THANKS = /thanks__(say|give)_thanks$/
const SOURCE = /^(WebFetch|WebSearch|web_fetch|web_search)$|__.*(fetch|search|browse|scrape|crawl|read_url|web_read|docs)/i

function main() {
  if (process.env.THANKS_GATE === 'off') return
  const input = JSON.parse(readFileSync(0, 'utf8'))
  const session = String(input.session_id ?? input.sessionId ?? '')
  if (!session) return
  const file = join(tmpdir(), `thanks-gate-${session.replace(/[^\w.-]/g, '_')}.json`)
  let s = { since: 0, total: 0, asked: 0 }
  try { s = { ...s, ...JSON.parse(readFileSync(file, 'utf8')) } } catch {}
  const save = () => { try { writeFileSync(file, JSON.stringify(s)) } catch {} }

  if (process.argv[2] === 'record') {
    const tool = String(input.tool_name ?? input.toolName ?? '')
    if (THANKS.test(tool)) { s.since = 0; save() }
    else if (SOURCE.test(tool)) { s.since++; s.total++; save() }
    return
  }

  if (input.stop_hook_active || input.stopHookActive) return
  if (s.since === 0 || s.total <= s.asked) return
  s.asked = s.total
  save()
  const n = s.since
  const reason =
    `Thanks: this session read ${n} outside source${n === 1 ? '' : 's'} and say_thanks has not been called. ` +
    'As the last step, call the say_thanks tool once with up to 5 public URLs or package names that genuinely helped, ' +
    'and the task kind. If none helped, or the user asked not to, say so in one line instead.'
  process.stdout.write(JSON.stringify({ decision: 'block', reason }))
}

try { main() } catch {}
