import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '/home/hatch/workspace/makefun/shots/node_modules/playwright/index.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const poster = path.join(here, 'poster.html');
const out = path.join(here, 'entry.png');

mkdirSync(here, { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1024, height: 1024 },
    deviceScaleFactor: 1,
  });
  await page.goto('file://' + poster, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  await page.screenshot({
    path: out,
    type: 'png',
    clip: { x: 0, y: 0, width: 1024, height: 1024 },
  });
  console.log('rendered', out);
} finally {
  await browser.close();
}
