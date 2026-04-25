import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import dotenv from 'dotenv';

dotenv.config();

// const modulePath = process.env.FOUNDRY_VTT_DATA_PATH;

// if (!modulePath) {
//   throw new Error("Missing or invalid FOUNDRY_VTT_DATA_PATH in .env");
// }

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: 'src/module.ts',
      output: {
        entryFileNames: 'module.js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: '../module.json', dest: '.' },
        { src: '../templates', dest: '.' },
        { src: '../assets/fonts/**/*', dest: 'assets/fonts' },
        { src: '../css/', dest: '.' },
        { src: '../lang/', dest: '.' },
      ]
    }),
    {
      name: 'copy-to-foundry',
      closeBundle() {
        const fs = require('fs-extra');
        // fs.copySync('dist', modulePath, { overwrite: true });
        // console.log(`✅ Copied dist to ${modulePath}`);
      }
    }
  ]
});
