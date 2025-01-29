import { readdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the photography images inside /public/
const imagesDir = join(__dirname, '../public/photography/');
const outputFile = join(__dirname, '../src/components/PhotoBox/imageImports.js');

(async () => {
  try {
    const files = await readdir(imagesDir);

    // Filter only image files
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    // Generate an array of image URLs (relative to /public/)
    const imageArray = `const imageList = [\n  ${imageFiles.map(file => `'photography/${file}'`).join(',\n  ')}\n];\n\nexport default imageList;`;

    // Write the output file
    await writeFile(outputFile, imageArray);
    console.log('✅ Image import file generated successfully!');
  } catch (err) {
    console.error('❌ Error:', err);
  }
})();

