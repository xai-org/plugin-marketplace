import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, symlinkSync, rmSync, readFileSync, realpathSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';
import { test } from 'node:test';
import { capture, findCaptureScript, MCP_VERSION } from '../scripts/capture.mjs';

function fixture(t, version = MCP_VERSION) {
  const root = mkdtempSync(join(tmpdir(), 'pincushion-grok-helper-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const pkg = join(root, 'package with spaces');
  const bin = join(root, 'bin');
  mkdirSync(join(pkg, 'scripts'), { recursive: true });
  mkdirSync(bin);
  writeFileSync(join(pkg, 'package.json'), JSON.stringify({ name: 'pincushion-mcp', version }));
  writeFileSync(join(pkg, 'server.js'), '');
  writeFileSync(join(pkg, 'scripts/capture-snapshot.mjs'), '');
  symlinkSync(join(pkg, 'server.js'), join(bin, 'pincushion-mcp'));
  return { bin, script: realpathSync(join(pkg, 'scripts/capture-snapshot.mjs')) };
}

test('resolves the pinned npm binary through symlinks and ignores a different version', t => {
  const old = fixture(t, '0.0.0');
  const current = fixture(t);
  assert.equal(findCaptureScript([old.bin, current.bin].join(delimiter)), current.script);
  assert.throws(() => findCaptureScript(old.bin), /Pinned pincushion-mcp/);
});

test('fails before execution when package is missing or arguments are incomplete', () => {
  assert.throws(() => findCaptureScript(''), /npm exec/);
  assert.throws(() => capture(['https://example.com']), /Expected page URL/);
});

test('forwards URLs and paths literally without a shell and preserves capture failure', t => {
  const current = fixture(t);
  const args = ['https://example.com/?q=$(bad)', '/tmp/pins with spaces.json', '/tmp/out.jpg', '--require-all'];
  let calls = 0;
  assert.equal(capture(args, {
    searchPath: current.bin,
    spawn(command, forwarded, options) {
      calls++;
      assert.equal(command, process.execPath);
      assert.deepEqual(forwarded, [current.script, ...args]);
      assert.equal(options.shell, false);
      return { status: 4 };
    },
  }), 4);
  assert.equal(calls, 1);
});

test('propagates spawn errors and signal-only failure rather than claiming capture success', t => {
  const current = fixture(t);
  const args = ['https://example.com', '{}', '/tmp/out.jpg'];
  assert.throws(() => capture(args, { searchPath: current.bin, spawn: () => ({ error: new Error('unavailable') }) }), /unavailable/);
  assert.equal(capture(args, { searchPath: current.bin, spawn: () => ({ status: null, signal: 'SIGTERM' }) }), 1);
});

test('manifest uses the same published MCP pin, project cwd and no embedded credentials', () => {
  const config = JSON.parse(readFileSync(new URL('../.mcp.json', import.meta.url)));
  assert.deepEqual(config, { mcpServers: { pincushion: {
    command: 'npx', args: ['--yes', `pincushion-mcp@${MCP_VERSION}`, '--project-dir', '.', '--cloud-sync', '--no-auto-register-project'],
  } } });
  const manifest = JSON.parse(readFileSync(new URL('../.grok-plugin/plugin.json', import.meta.url)));
  assert.equal(manifest.name, 'pincushion');
  assert.equal(manifest.license, 'FSL-1.1-Apache-2.0');
});
