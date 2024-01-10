import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { cart } from '../testsData';
import { useCartPagination } from '@/hooks/CartPaginationHook';

vi.mock('react-redux', async () => {
  const mod = await vi.importActual('react-redux');
  return {
    ...mod,
    useSelector: vi.fn().mockImplementation(() => cart),
  };
});

vi.mock('@/context/URLContext', () => ({
  useMyURLContext: vi.fn(() => ({
    curPageCart: 1,
    setPerCartPageOption: vi.fn(),
    perCartPageOption: { value: 'all', label: 'All' },
  })),
}));

describe('useCartPagination hook', () => {
  it('should initialize with selected all values', () => {
    const { result } = renderHook(() => useCartPagination());

    expect(result.current.countPages).toBe(1);
    expect(result.current.curPageCart).toBe(1);
    expect(result.current.currentItems.length).toBe(4);
  });
});
