import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  base: process.env.NODE_ENV === 'production' ? '/temp-yodeck-airq/' : '/',
  envDir: '../', // Look for .env files in the project root, one level up from src
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        room: resolve(__dirname, 'src/templates/room.html'),
        roomDefault: resolve(__dirname, 'src/templates/room-default.html'),
        roomGlass: resolve(__dirname, 'src/templates/room-glass.html')
      },
      output: {
        // Make CSS output more predictable by not hashing in production
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            // Ensure CSS files are output with consistent naming
            return 'dist/output.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // Ensure JS files are placed in a predictable location
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
      }
    },
    // Extract CSS to avoid CSS in JS issues
    cssCodeSplit: false,
    // Minify CSS to reduce size
    cssMinify: true,
  },
  server: {
    port: 8080
  },
  // Ensure environment variables are properly loaded
  envPrefix: 'VITE_',
});
