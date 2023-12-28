import { describe, expect, it, vi } from 'vitest';

import { createPersistStorage } from '@/store/store';

describe('createPersistStorage function', () => {
  it('return server-side storage object', async () => {
    const windowSpy = vi.spyOn(global, 'window', 'get');

    const storage = createPersistStorage();

    expect(storage.getItem('key')).resolves.toBeNull();
    expect(storage.setItem('key', 'value')).resolves.toBe('value');
    expect(storage.removeItem('key')).resolves.toBeUndefined();

    windowSpy.mockRestore();
  });
});
