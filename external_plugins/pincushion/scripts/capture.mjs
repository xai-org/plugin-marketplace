#!/usr/bin/env node
// Resolve the explicitly pinned npm-exec package, then use its existing capture
// implementation unchanged. No shell, credentials, uploads or new browser logic.
import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { delimiter, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

export const MCP_VERSION = '1.11.26';

export function findCaptureScript(searchPath = process.env.PATH || '') {
  for (const directory of searchPath.split(delimiter).filter(Boolean)) {
    const binary = join(directory, 'pincushion-mcp');
    if (!existsSync(binary)) continue;
    try {
      const root = dirname(realpathSync(binary));
      const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
      if (pkg.name !== 'pincushion-mcp' || pkg.version !== MCP_VERSION) continue;
      const script = join(root, 'scripts', 'capture-snapshot.mjs');
      if (existsSync(script)) return script;
    } catch { /* Another PATH entry may contain the pinned package. */ }
  }
  throw new Error(`Pinned pincushion-mcp@${MCP_VERSION} not found. Run this helper through npm exec --yes --package=pincushion-mcp@${MCP_VERSION} -- node <absolute-helper-path> ...`);
}

export function capture(args, { searchPath, spawn = spawnSync } = {}) {
  if (args.length < 3) throw new Error('Expected page URL, pins JSON/file and an absolute output JPEG path, followed by capture flags.');
  const script = findCaptureScript(searchPath);
  const result = spawn(process.execPath, [script, ...args], { stdio: 'inherit', shell: false });
  if (result.error) throw result.error;
  return result.status ?? 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { process.exitCode = capture(process.argv.slice(2)); }
  catch (error) { console.error(`Pincushion capture: ${error.message}`); process.exitCode = 1; }
}
