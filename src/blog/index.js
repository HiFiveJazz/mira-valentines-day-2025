// src/blog/index.js

// Auto-import all posts inside subfolders
const modules = import.meta.glob("./**/*.js", { eager: true });

// Collect default exports
const posts = Object.values(modules)
  .map((mod) => mod.default)
  .filter(Boolean)
  // Optional: sort newest first if you later add a `date` field
  .sort((a, b) => {
    if (!a.meta || !b.meta) return 0;
    return 0;
  });

export default posts;
