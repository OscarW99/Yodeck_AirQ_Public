// copy-static.js
// Copies all necessary static files and folders to dist for GitHub Pages deployment

const fs = require('fs');
const path = require('path');

const DIST = path.resolve(__dirname, 'dist');
const SRC = path.resolve(__dirname, 'src');

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      copyRecursiveSync(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Ensure dist exists
if (!fs.existsSync(DIST)) fs.mkdirSync(DIST);

// Copy src/index.html as the main index.html in dist (for GitHub Pages root)
if (fs.existsSync(path.join(SRC, 'index.html'))) {
  fs.copyFileSync(path.join(SRC, 'index.html'), path.join(DIST, 'index.html'));
}
// Do NOT copy the root index.html to dist/index.html (prevents placeholder overwrite)

// Optionally, you can still copy it as src-index.html if you want a backup/reference
// fs.copyFileSync(path.join(SRC, 'index.html'), path.join(DIST, 'src-index.html'));

// Copy src/js, src/templates, and src/pages
for (const folder of ['js', 'templates', 'pages']) {
  const srcFolder = path.join(SRC, folder);
  const distFolder = path.join(DIST, folder);
  copyRecursiveSync(srcFolder, distFolder);
}

// Copy prod-config.js to dist/js if needed
const prodConfigSrc = path.join(SRC, 'js', 'prod-config.js');
const prodConfigDest = path.join(DIST, 'js', 'prod-config.js');
if (fs.existsSync(prodConfigSrc)) {
  if (!fs.existsSync(path.dirname(prodConfigDest))) fs.mkdirSync(path.dirname(prodConfigDest), { recursive: true });
  fs.copyFileSync(prodConfigSrc, prodConfigDest);
}

console.log('Static files copied to dist.');
