// scripts/compressBlog.js
import sharp from "sharp";
import { readdir, mkdir, stat, access } from "fs/promises";
import { join, dirname, extname, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Your raw blog images live here
const inputBaseDir = join(__dirname, "../public/blog/");

// ✅ Output goes here (served as /blog-compressed/...)
const outputBaseDir = join(__dirname, "../public/blog-compressed/");

// Blog-compressed settings
const BLOG_MAX_WIDTH = 1600;
const BLOG_WEBP_QUALITY = 72;
const BLOG_EFFORT = 5;

async function ensureDirExists(path) {
  try {
    await access(path);
  } catch {
    await mkdir(path, { recursive: true });
  }
}

async function processDirectory(dirPath, outputPath) {
  await mkdir(outputPath, { recursive: true });

  const files = await readdir(dirPath);

  for (const file of files) {
    const inputPath = join(dirPath, file);
    const fileStats = await stat(inputPath);

    if (fileStats.isDirectory()) {
      await processDirectory(inputPath, join(outputPath, file));
      continue;
    }

    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

    const outName = `${basename(file, extname(file))}.webp`;
    const outputFilePath = join(outputPath, outName);

    try {
      await sharp(inputPath, { failOnError: false })
        .rotate() // respect EXIF orientation
        .resize({ width: BLOG_MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: BLOG_WEBP_QUALITY, effort: BLOG_EFFORT })
        .toFile(outputFilePath);

      console.log(`✅ Blog compressed: ${inputPath} → ${outputFilePath}`);
    } catch (err) {
      console.error(`❌ Failed: ${inputPath}`, err);
    }
  }
}

(async () => {
  await ensureDirExists(inputBaseDir);
  await ensureDirExists(outputBaseDir);

  console.log(`🔍 Compressing BLOG images from:\n  ${inputBaseDir}\n→ to:\n  ${outputBaseDir}\n`);

  await processDirectory(inputBaseDir, outputBaseDir);

  console.log("🎉 Blog images compressed successfully!");
})();
