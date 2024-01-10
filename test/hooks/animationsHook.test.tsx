import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAnimations } from '@/hooks/AnimationsHook';

describe('useAnimations', () => {
  it('should chahges shakeAnim if quantity > stock', () => {
    const quantity = 20;
    const stock = 30;
    const updadedQuantity = 30;

    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ quantity, stock }) => useAnimations({ quantity, stock }),
      {
        initialProps: { quantity: quantity, stock: stock },
      }
    );

    expect(result.current).toBeFalsy();

    rerender({ quantity: updadedQuantity, stock: stock });

    expect(result.current).toBeTruthy();

    act(() => {
      vi.advanceTimersByTime(3505);
    });

    expect(result.current).toBeFalsy();

    vi.useRealTimers();
  });
});
