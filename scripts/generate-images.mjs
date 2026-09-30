/**
 * Pre-generates responsive WebP versions of every photo in src/assets into
 * public/img/, plus a manifest the custom next/image loader reads.
 *
 * The site serves these static files instead of optimising images at request
 * time: Next.js 16's runtime optimiser can hang permanently on an image if a
 * visitor cancels the request at the wrong moment (see docs/PERFORMANCE.md).
 *
 * Runs automatically before `dev`, `build` and `typecheck`. Unchanged images
 * are skipped, so repeat runs are fast.
 */
import { mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDir = path.join(root, "src/assets");
const outDir = path.join(root, "public/img");
const manifestPath = path.join(root, "src/lib/image-manifest.json");

/** Must match images.deviceSizes + images.imageSizes in next.config.ts. */
export const WIDTHS = [96, 256, 384, 640, 828, 1080, 1280, 1920, 2400];
const QUALITY = 78;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) yield full;
  }
}

async function isFresh(output, sourceMtime) {
  try {
    return (await stat(output)).mtimeMs >= sourceMtime;
  } catch {
    return false;
  }
}

await mkdir(outDir, { recursive: true });
const manifest = {};
const seen = new Map();
let written = 0;

for await (const file of walk(assetsDir)) {
  const base = path.basename(file).replace(/\.[^.]+$/, "");
  if (seen.has(base)) {
    throw new Error(`Duplicate image name "${base}" in ${file} and ${seen.get(base)}; image names must be unique.`);
  }
  seen.set(base, file);

  const { mtimeMs } = await stat(file);
  const { width: original } = await sharp(file).metadata();
  const widths = WIDTHS.filter((w) => w < original);
  widths.push(Math.min(original, WIDTHS.at(-1)));
  manifest[base] = [...new Set(widths)].sort((a, b) => a - b);

  for (const w of manifest[base]) {
    const output = path.join(outDir, `${base}-${w}.webp`);
    if (await isFresh(output, mtimeMs)) continue;
    await sharp(file).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(output);
    written++;
  }
}

// Remove variants whose source image no longer exists.
const expected = new Set(Object.entries(manifest).flatMap(([base, ws]) => ws.map((w) => `${base}-${w}.webp`)));
let removed = 0;
for (const file of await readdir(outDir)) {
  if (!expected.has(file)) {
    await rm(path.join(outDir, file));
    removed++;
  }
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(
  `images: ${Object.keys(manifest).length} sources, ${written} variants written, ${removed} stale removed (public/img)`,
);
