import { describe, expect, it, vi } from 'vitest';
import { useMainPagination } from '@/hooks/MainPaginationHook';
import { renderHook } from '@testing-library/react';
import { TEST_PRODUCTS } from '../testsData';

vi.mock('@/context/SortingsContext', () => ({
  useMySortingsContext: vi.fn(() => ({
    sortProducts: TEST_PRODUCTS,
  })),
}));

vi.mock('@/context/URLContext', () => ({
  useMyURLContext: vi.fn(() => ({
    curPageMain: 100,
    setCurPageMain: vi.fn(),
    perMainPageOption: { value: 'all', label: 'All' },
    inputSearchURL: 'test',
  })),
}));

describe('useMainPagination hook', () => {
  it('should initialize with selected all values', () => {
    const { result } = renderHook(() => useMainPagination({ clickFilters: false }));

    expect(result.current.countPages).toBe(1);
    expect(result.current.curPageMain).toBe(100);
    expect(result.current.currentItems.length).toBe(0);
  });
});
