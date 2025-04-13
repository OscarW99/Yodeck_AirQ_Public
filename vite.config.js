import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  base: './', // Add base configuration for GitHub Pages
  envDir: '../', // Look for .env files in the project root, one level up from src
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        room: resolve(__dirname, 'src/templates/room.html'),
      }
    }
  },
  server: {
    port: 8080
  },
  // Ensure environment variables are properly loaded
  envPrefix: 'VITE_'
});
