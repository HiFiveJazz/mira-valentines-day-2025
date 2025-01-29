import { readdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use the new compressed folder
const imagesDir = join(__dirname, '../public/photography-compressed/');
const outputFile = join(__dirname, '../src/components/PhotoBox/imageImports.js');

(async () => {
  try {
    const files = await readdir(imagesDir);
    const imageFiles = files.filter(file => /\.(webp)$/i.test(file)); // Use only webp

    const imageArray = `const imageList = [\n  ${imageFiles.map(file => `'photography-compressed/${file}'`).join(',\n  ')}\n];\n\nexport default imageList;`;

    await writeFile(outputFile, imageArray);
    console.log('✅ Image import file generated successfully!');
  } catch (err) {
    console.error('❌ Error:', err);
  }
})();

