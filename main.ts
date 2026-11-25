// news-image-20261125 entry program (Node 22+, stdlib only, no network).
// The judged artifact is the image file; this program's whole job is to
// publish the entry.png that sits next to it into the output directory the
// grader mounts at /output (MAKEFUN_OUTPUT_DIR is the local stand-in).
// The copy is a straight byte-for-byte copy, so repeated runs always yield
// identical output bytes.

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const imageDir = dirname(fileURLToPath(import.meta.url));
const source = join(imageDir, 'entry.png');
const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(targetDir, 'entry.png');

if (!existsSync(source)) {
  console.error(
    `error: source image ${source} is missing; nothing to publish`,
  );
  process.exit(1);
}

mkdirSync(targetDir, { recursive: true });
copyFileSync(source, target);
console.log(`copied ${source} -> ${target}`);
