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
        // Ensure CSS gets a predictable name without hashes
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/style.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // Ensure JS keeps its directory structure
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
      }
    },
    // Ensure external modules are properly handled
    commonjsOptions: {
      include: [/node_modules/],
    }
  },
  server: {
    port: 8080
  },
  // Ensure environment variables are properly loaded
  envPrefix: 'VITE_',
  // Handle external imports
  optimizeDeps: {
    exclude: ['firebase']
  }
});
