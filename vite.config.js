import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/zand-amlak-frontend/',
  plugins: [react()],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (info) =>
          (info.name ?? '').endsWith('.css')
            ? 'assets/app.css'
            : 'assets/[name][extname]',
      },
    },
  },
});