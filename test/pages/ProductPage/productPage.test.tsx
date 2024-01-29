import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import store, { rootState } from '@/store/store';
import { ProductPage } from '@/pages/ProductPage/ProductPage';
import { BrowserRouter } from 'react-router-dom';
import { CartPage } from '@/pages/CartPage/CartPage';
import { TEST_PRODUCTS, TEST_PRODUCT } from '../../testsData';

vi.mock('@/hooks/AnimationsHook', async () => {
  const mod = await vi.importActual('@/hooks/AnimationsHook');
  return {
    ...mod,
    useAnimations: vi.fn(() => ({
      isShake: true,
    })),
  };
});

vi.mock('@/api/ProductsAPI', async () => {
  const mod = await vi.importActual('@/api/ProductsAPI');
  return {
    ...mod,
    useGetProductQuery: vi.fn(() => ({
      data: TEST_PRODUCT,
      isFetching: false,
    })),
    useGetProductsQuery: vi.fn(() => ({
      data: TEST_PRODUCTS,
    })),
  };
});

describe('ProductPage', () => {
  it('should render the product page with the selected product', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <ProductPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(TEST_PRODUCT.name)).toBeInTheDocument();
    expect(screen.getByText(TEST_PRODUCT.id.slice(-5))).toBeInTheDocument();
    expect(screen.getByText(TEST_PRODUCT.price)).toBeInTheDocument();

    const stockRow = screen.getByTestId('shake-product');

    expect(stockRow.className).include('shake-product');
  });

  it('should shake product if his quantity greater than stock', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <ProductPage />
        </BrowserRouter>
      </Provider>
    );

    const stockRow = screen.getByTestId('shake-product');

    expect(stockRow.className).include('shake-product');
  });

  it('should changes main images', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <ProductPage />
        </BrowserRouter>
      </Provider>
    );
    const mainImage = screen.getByAltText('product-image-main') as HTMLImageElement;
    const imagesOne = screen.getByAltText('product-image-one') as HTMLImageElement;
    const imagesTwo = screen.getByAltText('product-image-two') as HTMLImageElement;

    expect(mainImage).toBeInTheDocument();
    expect(imagesOne).toBeInTheDocument();
    expect(imagesTwo).toBeInTheDocument();

    fireEvent.click(imagesTwo);

    expect(mainImage.src).include(TEST_PRODUCT.images[1]);

    fireEvent.click(imagesOne);

    expect(mainImage.src).include(TEST_PRODUCT.images[0]);
  });

  it('should add to cart', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <ProductPage />
        </BrowserRouter>
      </Provider>
    );
    const buttonAdd = screen.getByTestId('button-add-cart');
    fireEvent.click(buttonAdd);
    const updatedState = store.getState().cart;

    expect(buttonAdd).toBeInTheDocument();
    expect(updatedState.length).toBe(1);
    expect(updatedState[0].product).toHaveProperty('name', TEST_PRODUCT.name);
  });

  it('should add to cart and go to cart if pressed buy now btn', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <ProductPage />
          <CartPage />
        </BrowserRouter>
      </Provider>
    );
    const buttonBuyNow = screen.getByTestId('button-buy-now');
    fireEvent.click(buttonBuyNow);
    const updatedState = store.getState().cart;

    expect(updatedState.length).toBe(1);
    expect(updatedState[0].product).toHaveProperty('name', TEST_PRODUCT.name);

    expect(screen.getByText('SHOPPING CART')).toBeInTheDocument();
    expect(screen.getAllByText(TEST_PRODUCT.name)[0]).toBeInTheDocument();
    expect(screen.getAllByText(TEST_PRODUCT.color)[0]).toBeInTheDocument();
  });
});
