/// <reference types="vitest" />
/// <reference types="vitest-dom/extend-expect" />

import { defineConfig } from 'vitest/config';

const vitestConfig = defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['node_modules'],
    setupFiles: ['./test/setupTests.ts'],
    coverage: {
      provider: 'istanbul',
      all: true,
      exclude: ['src/types/types.ts', '.eslintrc.cjs'],
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: 'components', replacement: '/src/components' },
    ],
  },
});

export default vitestConfig;
