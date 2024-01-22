import { describe, expect, it, vi } from 'vitest';
import { rootState } from '@/store/store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FiltersContextProvider, useMyFiltersContext } from '@/context/FiltersContext';

vi.mock('@/api/ProductsAPI', async () => {
  const mod = await vi.importActual('@/api/ProductsAPI');
  return {
    ...mod,
    useGetProductsQuery: vi.fn(() => ({
      data: [],
    })),
  };
});

describe('filters context', () => {
  it('should have a empty catalog', async () => {
    const TestComponent = () => {
      const { itemsCount, emptyCatalog } = useMyFiltersContext();

      return (
        <div>
          <div data-testid="filter-context-itemsCount">{itemsCount}</div>
          <div data-testid="filter-context-emptyCatalog">
            {emptyCatalog ? 'empty catalog' : 'catalog is not empty'}
          </div>
        </div>
      );
    };

    const { getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <FiltersContextProvider>
            <TestComponent />
          </FiltersContextProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(getByTestId('filter-context-itemsCount')).toHaveTextContent('0');
    expect(getByTestId('filter-context-emptyCatalog').textContent).toBe('empty catalog');
  });
});
