import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define paths
const inputBaseDir = join(__dirname, '../src/images/'); // Source images
const outputBaseDir = join(__dirname, '../src/images-compressed/'); // Compressed output

async function processDirectory(dirPath, outputPath) {
  try {
    // Create output directory if it doesn't exist
    await mkdir(outputPath, { recursive: true });

    // Read directory contents
    const files = await readdir(dirPath);

    for (const file of files) {
      const inputPath = join(dirPath, file);
      const outputFileName = `${basename(file, extname(file))}.webp`;
      const outputFilePath = join(outputPath, outputFileName);

      const fileStats = await stat(inputPath);
      if (fileStats.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(inputPath, join(outputPath, file));
      } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
        // Compress and convert images
        await sharp(inputPath)
          .resize({ width: 1000 }) // Resize to max width 1000px
          .toFormat('webp', { quality: 80 }) // Convert to .webp with 80% quality
          .toFile(outputFilePath);
        console.log(`✅ Compressed: ${inputPath} → ${outputFilePath}`);
      }
    }
  } catch (err) {
    console.error('❌ Error processing', dirPath, err);
  }
}

(async () => {
  console.log(`🔍 Compressing all images from ${inputBaseDir} to ${outputBaseDir}...`);
  await processDirectory(inputBaseDir, outputBaseDir);
  console.log('🎉 All images compressed successfully!');
})();

