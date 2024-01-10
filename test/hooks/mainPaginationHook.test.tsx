import { describe, expect, it, vi } from 'vitest';
import { useMainPagination } from '@/hooks/MainPaginationHook';
import { renderHook } from '@testing-library/react';
import { products } from '../testsData';

vi.mock('@/context/SortingsContext', () => ({
  useMySortingsContext: vi.fn(() => ({
    sortProducts: products,
  })),
}));

vi.mock('@/context/URLContext', () => ({
  useMyURLContext: vi.fn(() => ({
    curPageMain: 2,
    setCurPageMain: vi.fn(),
    perMainPageOption: { value: '5', label: 'Show items: 5' },
    inputSearchURL: '',
  })),
}));

describe('useMainPagination hook', () => {
  it('should initialize with select values', () => {
    const { result } = renderHook(() => useMainPagination({ clickFilters: false }));

    expect(result.current.countPages).toBe(2);
    expect(result.current.curPageMain).toBe(2);
    expect(result.current.currentItems.length).toBe(products.length - 5);
  });
});
