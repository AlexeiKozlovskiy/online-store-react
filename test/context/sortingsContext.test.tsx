import { describe, expect, it, vi } from 'vitest';
import { rootState } from '@/store/store';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SortingsContextProvider, useMySortingsContext } from '@/context/SortingsContext';
import { products } from '../testsData';
import { URLContextProvider, useMyURLContext } from '@/context/URLContext';

vi.mock('@/api/ProductsAPI', async () => {
  const mod = await vi.importActual('@/api/ProductsAPI');
  return {
    ...mod,
    useGetProductsQuery: vi.fn(() => ({
      data: products,
    })),
  };
});

describe('sortings context', () => {
  it('sorting view by ViewOption', async () => {
    const TestComponent = () => {
      const { sortindViewOption, setSortindViewOption } = useMyURLContext();
      const { sortProducts } = useMySortingsContext();

      return (
        <div>
          <div>
            <button
              onClick={() => setSortindViewOption({ value: 'name', label: 'Name' })}
              data-testid="byName"
            ></button>
            <button
              onClick={() => setSortindViewOption({ value: 'price-asc', label: 'Price ascending' })}
              data-testid="priceAscending"
            ></button>
            <button
              onClick={() =>
                setSortindViewOption({ value: 'price-desc', label: 'Price descending' })
              }
              data-testid="priceDescending"
            ></button>
            <button
              onClick={() => setSortindViewOption({ value: 'stock-asc', label: 'Stock ascending' })}
              data-testid="stockAscending"
            ></button>
            <button
              onClick={() =>
                setSortindViewOption({ value: 'stock-desc', label: 'Stock descending' })
              }
              data-testid="stockDescending"
            ></button>
          </div>
          {sortProducts.map((product) => {
            const { id, name, price, stock } = product;
            return <div data-testid="sortProducts" key={id}>{`${name}, ${price}, ${stock}`}</div>;
          })}
          <div data-testid="urlSortOptionValue">{JSON.stringify(sortindViewOption)}</div>
        </div>
      );
    };

    const { getByTestId, getAllByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <URLContextProvider>
            <SortingsContextProvider>
              <TestComponent />
            </SortingsContextProvider>
          </URLContextProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(getByTestId('urlSortOptionValue').textContent).include('Recommended');
    expect(getAllByTestId('sortProducts')[0].textContent).toBe(
      'Luxury Christmas bauble with ice flowers, 3.39, 31'
    );
    expect(getAllByTestId('sortProducts')[1].textContent).toBe('Gingerbread House, 4.99, 8');
    expect(getAllByTestId('sortProducts')[2].textContent).toBe('Nutcracker, 9.95, 27');
    expect(getAllByTestId('sortProducts')[3].textContent).toBe('LED lights warm, 8.99, 20');
    expect(getAllByTestId('sortProducts')[4].textContent).toBe('50 LED Light Chain, 12.99, 30');
    expect(getAllByTestId('sortProducts')[5].textContent).toBe('10 LED Light Chain, 10.99, 40');
    expect(getAllByTestId('sortProducts')[6].textContent).toBe('Onion Glass Bauble, 3.99, 2');
    expect(getAllByTestId('sortProducts')[7].textContent).toBe(
      'Christmas stars 12 pieces, 6.95, 34'
    );

    fireEvent.click(getByTestId('byName'));

    expect(getByTestId('urlSortOptionValue').textContent).include('Name');
    expect(getAllByTestId('sortProducts')[0].textContent).toBe('10 LED Light Chain, 10.99, 40');
    expect(getAllByTestId('sortProducts')[1].textContent).toBe('50 LED Light Chain, 12.99, 30');
    expect(getAllByTestId('sortProducts')[2].textContent).toBe(
      'Christmas stars 12 pieces, 6.95, 34'
    );

    fireEvent.click(getByTestId('priceAscending'));

    expect(getByTestId('urlSortOptionValue').textContent).include('Price ascending');
    expect(getAllByTestId('sortProducts')[0].textContent).toBe(
      'Luxury Christmas bauble with ice flowers, 3.39, 31'
    );
    expect(getAllByTestId('sortProducts')[1].textContent).toBe('Onion Glass Bauble, 3.99, 2');
    expect(getAllByTestId('sortProducts')[2].textContent).toBe('Gingerbread House, 4.99, 8');

    fireEvent.click(getByTestId('priceDescending'));

    expect(getByTestId('urlSortOptionValue').textContent).include('Price descending');
    expect(getAllByTestId('sortProducts')[0].textContent).toBe('50 LED Light Chain, 12.99, 30');
    expect(getAllByTestId('sortProducts')[1].textContent).toBe('10 LED Light Chain, 10.99, 40');
    expect(getAllByTestId('sortProducts')[2].textContent).toBe('Nutcracker, 9.95, 27');

    fireEvent.click(getByTestId('stockAscending'));

    expect(getByTestId('urlSortOptionValue').textContent).include('Stock ascending');
    expect(getAllByTestId('sortProducts')[0].textContent).toBe('Onion Glass Bauble, 3.99, 2');
    expect(getAllByTestId('sortProducts')[1].textContent).toBe('Gingerbread House, 4.99, 8');
    expect(getAllByTestId('sortProducts')[2].textContent).toBe('LED lights warm, 8.99, 20');

    fireEvent.click(getByTestId('stockDescending'));

    expect(getByTestId('urlSortOptionValue').textContent).include('Stock descending');
    expect(getAllByTestId('sortProducts')[0].textContent).toBe('10 LED Light Chain, 10.99, 40');
    expect(getAllByTestId('sortProducts')[1].textContent).toBe(
      'Christmas stars 12 pieces, 6.95, 34'
    );
    expect(getAllByTestId('sortProducts')[2].textContent).toBe(
      'Luxury Christmas bauble with ice flowers, 3.39, 31'
    );
  });
});
