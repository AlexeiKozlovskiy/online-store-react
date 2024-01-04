/// <reference types="vite/client" />

import { defineConfig, mergeConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitestConfig from './vitest.config';

// https://vitejs.dev/config/

const viteConfig = defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
           @import '/src/assets/styles/common.scss';
        `,
      },
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: 'components', replacement: '/src/components' },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('react-router-dom') || id.includes('react-router')) {
            return '@react-router';
          }
          if (id.includes('@reduxjs/toolkit')) {
            return '@reduxjs';
          }
        },
      },
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
