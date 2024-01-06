import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
  vi.resetModules();
  vi.resetAllMocks();
  vi.restoreAllMocks();
  vi.clearAllMocks();
});
