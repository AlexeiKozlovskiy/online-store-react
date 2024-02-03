import { describe, expect, it, vi } from 'vitest';
import { rootState } from '@/store/store';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { FiltersContextProvider, useMyFiltersContext } from '@/context/FiltersContext';
import { URLContextProvider, useMyURLContext } from '@/context/URLContext';
import { TEST_PRODUCTS } from '../testsData';
import { SelectedFilters } from '@/types/types';

vi.mock('@/api/ProductsAPI', async () => {
  const mod = await vi.importActual('@/api/ProductsAPI');
  return {
    ...mod,
    useGetProductsQuery: vi.fn(() => ({
      data: TEST_PRODUCTS,
    })),
  };
});

describe('filters context', () => {
  it('should balanser and remove changed filters', async () => {
    const testSelectedFilters: SelectedFilters = {
      colorsSelected: ['red'],
      collectionsSelected: [2023],
      categorySelected: ['Do It Yourself'],
      priceSelected: [9, 30],
      sizeSelected: [20, 500],
      stockSelected: [3, 40],
    };

    const stockSelectedFilters: SelectedFilters = {
      colorsSelected: [],
      collectionsSelected: [],
      categorySelected: [],
      priceSelected: [1.99, 34.99],
      sizeSelected: [1, 700],
      stockSelected: [1, 50],
    };

    const TestComponent = () => {
      const { selectedFilters, setSelectedFilters } = useMyURLContext();
      const { itemsCount, removeItemFilterClick, emptyCatalog } = useMyFiltersContext();

      return (
        <div>
          <div data-testid="filter-context-itemsCount">{itemsCount}</div>
          <div data-testid="filter-context-emptyCatalog">
            {emptyCatalog ? 'empty catalog' : 'catalog is not empty'}
          </div>
          <button
            onClick={() => setSelectedFilters(testSelectedFilters)}
            data-testid="updateSelectedFilters"
          ></button>
          <div data-testid="filter-context-selectedFilters">{JSON.stringify(selectedFilters)}</div>
          <button data-params="color" data-value="red" onClick={removeItemFilterClick}>
            delete color
          </button>
          <button data-params="collection" data-value="2023" onClick={removeItemFilterClick}>
            delete collections
          </button>
          <button
            data-params="category"
            data-value="Do It Yourself"
            onClick={removeItemFilterClick}
          >
            delete categories
          </button>
          <button data-params="price" onClick={removeItemFilterClick}>
            delete price
          </button>
          <button data-params="size" onClick={removeItemFilterClick}>
            delete size
          </button>
          <button data-params="stock" onClick={removeItemFilterClick}>
            delete stock
          </button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <URLContextProvider>
            <FiltersContextProvider>
              <TestComponent />
            </FiltersContextProvider>
          </URLContextProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(getByTestId('filter-context-itemsCount')).toHaveTextContent(
      TEST_PRODUCTS.length.toString()
    );
    expect(getByTestId('filter-context-emptyCatalog').textContent).toBe('catalog is not empty');

    fireEvent.click(getByTestId('updateSelectedFilters'));

    expect(getByTestId('filter-context-selectedFilters').textContent).toBe(
      JSON.stringify(testSelectedFilters)
    );

    fireEvent.click(getByText('delete color'));
    fireEvent.click(getByText('delete collections'));
    fireEvent.click(getByText('delete categories'));
    fireEvent.click(getByText('delete price'));
    fireEvent.click(getByText('delete size'));
    fireEvent.click(getByText('delete stock'));

    expect(getByTestId('filter-context-selectedFilters').textContent).toBe(
      JSON.stringify(stockSelectedFilters)
    );
  });
});
