import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const inputDir = join(__dirname, '../public/moments/'); // Source images
const outputDir = join(__dirname, '../public/moments-compressed/'); // Destination

(async () => {
  try {
    // Create output directory if it doesn't exist
    await mkdir(outputDir, { recursive: true });

    // Read all image files
    const files = await readdir(inputDir);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    console.log(`🔍 Found ${imageFiles.length} images. Compressing...`);

    // Process images
    await Promise.all(imageFiles.map(async (file) => {
      const inputPath = join(inputDir, file);
      const outputFileName = `${basename(file, extname(file))}.webp`; // Convert to .webp
      const outputPath = join(outputDir, outputFileName);

      await sharp(inputPath)
        .resize({ width: 1000 }) // Resize to max width of 1000px
        .toFormat('webp', { quality: 80 }) // Convert to .webp with 80% quality
        .toFile(outputPath);

      console.log(`✅ Compressed: ${file} → ${outputFileName}`);
    }));

    console.log('🎉 All images compressed successfully!');
  } catch (err) {
    console.error('❌ Error:', err);
  }
})();
