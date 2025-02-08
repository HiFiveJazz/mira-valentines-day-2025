import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const inputDir = join(__dirname, '../public/photography/'); // Source images
const outputDir = join(__dirname, '../public/photography-compressed/'); // Destination
const outputFile = join(__dirname, '../src/components/PhotoBox/imageImports.js'); // Image imports file

async function compressImages() {
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
    console.error('❌ Error during compression:', err);
  }
}

async function generateImageImports() {
  try {
    const files = await readdir(outputDir);
    const imageFiles = files.filter(file => /\.(webp)$/i.test(file)); // Use only webp

    const imageArray = `const imageList = [\n  ${imageFiles.map(file => `'photography-compressed/${file}'`).join(',\n  ')}\n];\n\nexport default imageList;`;

    await writeFile(outputFile, imageArray);
    console.log('✅ Image import file generated successfully!');
  } catch (err) {
    console.error('❌ Error during image import generation:', err);
  }
}

// Run both functions sequentially
(async () => {
  await compressImages();
  await generateImageImports();
})();
