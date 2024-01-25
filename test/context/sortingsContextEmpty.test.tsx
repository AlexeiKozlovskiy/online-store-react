import { describe, expect, it } from 'vitest';
import { rootState } from '@/store/store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SortingsContextProvider, useMySortingsContext } from '@/context/SortingsContext';

describe('sortings context empty', () => {
  it('case if empty array useGetProductsQuery', async () => {
    const TestComponent = () => {
      const { sortProducts } = useMySortingsContext();

      return (
        <div>
          {sortProducts.length
            ? sortProducts.map((product) => {
                const { id, name, price, stock } = product;
                return (
                  <div data-testid="sortProducts" key={id}>{`${name}, ${price}, ${stock}`}</div>
                );
              })
            : 'no products'}
        </div>
      );
    };

    const { getByText } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <SortingsContextProvider>
            <TestComponent />
          </SortingsContextProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('no products')).toBeInTheDocument();
  });
});
