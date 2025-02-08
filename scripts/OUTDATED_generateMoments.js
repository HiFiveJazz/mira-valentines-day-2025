import { readdir, stat, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imagesDir = join(__dirname, '../public/moments-compressed/');
const outputFile = join(__dirname, '../src/components/MomentBox/imageImports.js');

(async () => {
  try {
    const files = await readdir(imagesDir);
    const imageFiles = files.filter(file => /\.(webp)$/i.test(file)); // Use only webp

    // Fetch file stats to get creation times
    const fileStats = await Promise.all(
      imageFiles.map(async file => {
        const fileStat = await stat(join(imagesDir, file));
        return {
          name: file,
          time: fileStat.birthtime.getTime(), // Use file creation time
        };
      })
    );

    // Flip sorting order: newest at the top
    fileStats.sort((a, b) => a.time - b.time); // Oldest at the bottom, newest at the top

    const sortedImageFiles = fileStats.map(file => file.name);

    const imageArray = `const imageList = [\n  ${sortedImageFiles.map(file => `'moments-compressed/${file}'`).join(',\n  ')}\n];\n\nexport default imageList;`;

    await writeFile(outputFile, imageArray);
    console.log('✅ Image import file generated successfully, sorted by creation date (newest first)!');
  } catch (err) {
    console.error('❌ Error:', err);
  }
})();

