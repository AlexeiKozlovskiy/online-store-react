import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ssr from 'vite-plugin-ssr/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), [ssr({ prerender: true })]],
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
});
