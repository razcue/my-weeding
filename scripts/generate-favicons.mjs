/* eslint-disable no-undef */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
let pngToIco;

const ICONS_DIR = path.resolve(process.cwd(), 'public', 'icons');
const SIZES = [16, 32, 180, 512];

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function generateForSvg(svgPath) {
  const base = path.basename(svgPath, path.extname(svgPath));
  const outDir = ICONS_DIR; // keep alongside
  const svgBuffer = await fs.promises.readFile(svgPath);

  for (const size of SIZES) {
    const outPath = path.join(outDir, `${base}-${size}.png`);
    const png = await sharp(svgBuffer)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90 })
      .toBuffer();
    await fs.promises.writeFile(outPath, png);
    console.log(`✓ ${path.basename(svgPath)} -> ${path.basename(outPath)}`);
  }
  // If this is the chosen classic icon, also emit a favicon.ico at project root
  if (base === 'favicon-twinstars-classic') {
    const rootOut = path.resolve(process.cwd(), 'public', 'favicon.ico');
    const png16 = path.join(outDir, `${base}-16.png`);
    const png32 = path.join(outDir, `${base}-32.png`);
    try {
      // optional dependency: only attempt if available
      if (!pngToIco) {
        try {
          ({ default: pngToIco } = await import('png-to-ico'));
        } catch {
          console.warn('png-to-ico not installed; skipping favicon.ico generation');
          return;
        }
      }
      const icoBuf = await pngToIco([png16, png32]);
      await fs.promises.writeFile(rootOut, icoBuf);
      console.log(`✓ Created favicon.ico from ${path.basename(png16)}, ${path.basename(png32)}`);
    } catch {
      console.warn('Could not create favicon.ico:', 'Unknown error');
    }
  }
}

async function main() {
  await ensureDir(ICONS_DIR);
  const entries = await fs.promises.readdir(ICONS_DIR);
  const svgs = entries.filter((f) => f.endsWith('.svg'));
  if (svgs.length === 0) {
    console.error('No SVGs found in public/icons');
    process.exit(1);
  }
  for (const file of svgs) {
    await generateForSvg(path.join(ICONS_DIR, file));
  }
  console.log('\nAll favicon PNGs generated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
