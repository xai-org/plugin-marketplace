#!/usr/bin/env node
// Make a local, viewport-sized inspection copy of a full-page capture. The
// original JPEG and its document coordinates remain unchanged for native reports.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { findCaptureScript } from './capture.mjs';

const SYSTEM_BROWSERS = [
  process.env.PINCUSHION_CHROMIUM,
  process.env.CHROME_PATH,
  process.env.PUPPETEER_EXECUTABLE_PATH,
  '/opt/pw-browsers/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/snap/bin/chromium',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
].filter(Boolean);

export function parseCropArgs(args) {
  if (args.length !== 6) throw new Error('Expected absolute source JPEG, absolute output JPEG, x, y, width and height.');
  const [source, output, ...numbers] = args;
  if (!isAbsolute(source) || !isAbsolute(output) || resolve(source) === resolve(output)) {
    throw new Error('Source and output must be different absolute paths.');
  }
  if (existsSync(output)) throw new Error('Output already exists; choose a new inspection path.');
  if (numbers.some((value) => !/^(0|[1-9]\d*)$/.test(value))) {
    throw new Error('Crop coordinates must be non-negative decimal integers.');
  }
  const values = numbers.map(Number);
  if (values.some((value) => !Number.isSafeInteger(value)) || values[0] < 0 || values[1] < 0 ||
      values[2] < 1 || values[3] < 1 || values[2] > 4000 || values[3] > 4000) {
    throw new Error('Crop coordinates must be non-negative integers and dimensions must be 1–4000 pixels.');
  }
  return { source, output, x: values[0], y: values[1], width: values[2], height: values[3] };
}

export async function inspectionCrop(args) {
  const { source, output, x, y, width, height } = parseCropArgs(args);
  const input = readFileSync(source);
  if (input[0] !== 0xff || input[1] !== 0xd8) throw new Error('Source must be a JPEG capture.');
  const mcpRoot = dirname(dirname(findCaptureScript()));
  const require = createRequire(join(mcpRoot, 'package.json'));
  const { chromium } = require('playwright-core');
  const executablePath = SYSTEM_BROWSERS.find(existsSync);
  const browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  });
  try {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, offline: true });
    try {
      const page = await context.newPage();
      const imageUrl = `data:image/jpeg;base64,${input.toString('base64')}`;
      await page.setContent(`<html><head><style>*{margin:0;padding:0}body{overflow:hidden}img{display:block;position:absolute;left:-${x}px;top:-${y}px}</style></head><body><img src="${imageUrl}"></body></html>`);
      const size = await page.locator('img').evaluate((image) => ({ width: image.naturalWidth, height: image.naturalHeight }));
      if (!size.width || !size.height || x + width > size.width || y + height > size.height) {
        throw new Error('Crop lies outside the captured image.');
      }
      const cropped = await page.screenshot({ type: 'jpeg', quality: 90 });
      writeFileSync(output, cropped, { flag: 'wx' });
      return { sourceWidth: size.width, sourceHeight: size.height, crop: { x, y, width, height }, outputPath: output };
    } finally { await context.close(); }
  } finally { await browser.close(); }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(await inspectionCrop(process.argv.slice(2)))); }
  catch (error) { console.error(`Pincushion inspection crop: ${error.message}`); process.exitCode = 1; }
}
