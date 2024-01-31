import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import store, { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { TEST_PRODUCT, TEST_PRODUCTS } from '../testsData';
import { ProductItem } from '@/components/ProductItem/Product';

vi.mock('@/api/ProductsAPI', async () => {
  const mod = await vi.importActual('@/api/ProductsAPI');
  return {
    ...mod,
    useGetProductsQuery: vi.fn(() => ({
      data: TEST_PRODUCTS,
    })),
  };
});

describe('main page product item', () => {
  it('should add to chosen product in redux state, by img click', async () => {
    const { getByText, getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <ProductItem isInCart={false} product={TEST_PRODUCT} />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('$10')).toBeInTheDocument();
    expect(getByText('Nutcracker')).toBeInTheDocument();

    fireEvent.click(getByTestId('product-item-chose'));

    expect(store.getState().chosenProduct).toStrictEqual({
      id: TEST_PRODUCT.id,
      name: TEST_PRODUCT.name,
    });
  });

  it('should add to cart', async () => {
    const { getByText } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <ProductItem isInCart={false} product={TEST_PRODUCT} />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(getByText('Add to cart'));

    expect(store.getState().cart.length).toBe(1);
  });

  it('should remove from cart', async () => {
    const { getByText } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <ProductItem isInCart={true} product={TEST_PRODUCT} />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(getByText('In cart'));

    expect(store.getState().cart.length).toBe(0);
  });
});
