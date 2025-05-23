import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat } from 'fs/promises';
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

    // Process images and store creation times
    const imageData = await Promise.all(imageFiles.map(async (file) => {
      const inputPath = join(inputDir, file);
      const fileStat = await stat(inputPath);
      const creationTime = fileStat.birthtime.getTime(); // Get original creation time
      
      const outputFileName = `${basename(file, extname(file))}.webp`; // Convert to .webp
      const outputPath = join(outputDir, outputFileName);

      await sharp(inputPath)
        .resize({ width: 1000 }) // Resize to max width of 1000px
        .toFormat('webp', { quality: 80 }) // Convert to .webp with 80% quality
        .toFile(outputPath);

      console.log(`✅ Compressed: ${file} → ${outputFileName}`);

      return { name: outputFileName, time: creationTime };
    }));

    console.log('🎉 All images compressed successfully!');
    return imageData;
  } catch (err) {
    console.error('❌ Error during compression:', err);
    return [];
  }
}

async function generateImageImports(imageData) {
  try {
    if (imageData.length === 0) {
      console.error('❌ No images found for import generation.');
      return;
    }

    // Sort images so that the newest (by creation time) comes first
    imageData.sort((a, b) => b.time - a.time);
    const sortedImageFiles = imageData.map(file => file.name);

    const imageArray = `const imageList = [\n  ${sortedImageFiles.map(file => `'photography-compressed/${file}'`).join(',\n  ')}\n];\n\nexport default imageList;`;

    await writeFile(outputFile, imageArray);
    console.log('✅ Image import file generated successfully, sorted by original creation date (newest first)!');
  } catch (err) {
    console.error('❌ Error during image import generation:', err);
  }
}

// Run both functions sequentially
(async () => {
  const imageData = await compressImages();
  await generateImageImports(imageData);
})();

