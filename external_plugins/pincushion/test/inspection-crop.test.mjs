import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { parseCropArgs } from '../scripts/inspection-crop.mjs';

test('a crop keeps its document origin and cannot replace existing evidence', t => {
  const root = mkdtempSync(join(tmpdir(), 'pincushion-crop-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const source = join(root, 'full.jpg');
  const output = join(root, 'viewport.jpg');
  writeFileSync(source, 'source evidence');

  assert.deepEqual(parseCropArgs([source, output, '0', '5000', '390', '844']), {
    source, output, x: 0, y: 5000, width: 390, height: 844,
  });
  assert.throws(() => parseCropArgs([source, source, '0', '0', '390', '844']), /different absolute paths/);
  writeFileSync(output, 'existing evidence');
  assert.throws(() => parseCropArgs([source, output, '0', '0', '390', '844']), /already exists/);
  rmSync(output);
  assert.throws(() => parseCropArgs([source, output, '', '0', '390', '844']), /decimal integers/);
  assert.throws(() => parseCropArgs([source, output, '0', '0', '0', '844']), /dimensions/);
});
