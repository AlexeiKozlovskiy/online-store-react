import { useDebounce } from '@/hooks/DebounceHook';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('useDebounce', () => {
  it('should debounce value', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'firstValue', delay: 500 },
    });

    expect(result.current).toBe('firstValue');

    rerender({ value: 'updatedValue', delay: 500 });

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(result.current).toBe('firstValue');

    act(() => {
      vi.advanceTimersByTime(120);
    });

    expect(result.current).toBe('updatedValue');

    vi.useRealTimers();
  });
});
