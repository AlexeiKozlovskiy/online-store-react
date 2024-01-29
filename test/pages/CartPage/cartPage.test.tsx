import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import store, { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { CartPage } from '@/pages/CartPage/CartPage';
import { TEST_PRODUCT, TEST_PRODUCTS } from '../../testsData';
import { addProductToCart, removeAllProductsFromCart } from '@/store/controller';
import { useMyURLContext } from '@/context/URLContext';
import { select } from 'react-select-event';
import { CartItemList } from '@/components/CartItemList/CartItemList';

const mockSetPerCartPageOption = vi.fn();

vi.mock('@/context/URLContext', async () => ({
  useMyURLContext: vi.fn(() => ({
    curPageCart: 1,
    setCurPageCart: vi.fn(),
    perCartPageOption: { value: '3', label: 'Show items: 3' },
    setPerCartPageOption: mockSetPerCartPageOption,
  })),
}));

vi.mock('@/context/CloseOpenModalsContext', async () => ({
  useCloseOpenModalsContext: vi.fn(() => ({
    openModals: {
      payment: true,
    },
  })),
}));

describe('Cart page', () => {
  const windowMock = {
    scrollTo: vi.fn(),
  };
  Object.assign(global, global, windowMock);

  it('should render Cart page', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <CartPage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('SHOPPING CART')).toBeInTheDocument();
    expect(screen.getByText(/You have no items in your shopping cart./i)).toBeInTheDocument();
  });

  it('should changes show items view', async () => {
    const id = '16';
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <CartPage />
        </BrowserRouter>
      </Provider>
    );

    act(() => {
      addProductToCart(id, TEST_PRODUCTS);
    });
    expect(screen.getByText('Gingerbread House')).toBeInTheDocument();
    expect(screen.getAllByText('$4.99')[0]).toBeInTheDocument();

    expect(screen.getByText('Show items: 3')).toBeInTheDocument();

    const customSelect = screen.getByRole('combobox');

    act(() => {
      fireEvent.change(customSelect, { target: { value: '1', label: 'Show items: 1' } });
    });

    expect(screen.getByText('Show items: 1')).toBeInTheDocument();

    await select(customSelect, 'Show items: 10');

    const { setPerCartPageOption } = useMyURLContext();

    expect(mockSetPerCartPageOption).toHaveBeenCalled();
    expect(setPerCartPageOption).toHaveBeenCalledWith({ value: '10', label: 'Show items: 10' });

    act(() => {
      removeAllProductsFromCart(id);
    });
  });

  it('should remove cart item in cart, by cross click', async () => {
    const id = '15';
    const { getByText, getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <CartItemList itemNumber={10} quantity={20} product={TEST_PRODUCT} cartID={'1'} />
        </BrowserRouter>
      </Provider>
    );

    act(() => {
      addProductToCart(id, TEST_PRODUCTS);
    });

    expect(getByText('Nutcracker')).toBeInTheDocument();
    expect(getByText('Color: blue')).toBeInTheDocument();

    await waitFor(() => {
      const updatedStates = store.getState().cart;
      expect(updatedStates.length).toBe(1);
    });

    fireEvent.click(getByTestId('crossBtn'));

    await waitFor(() => {
      const updatedStates = store.getState().cart;
      expect(updatedStates.length).toBe(0);
    });
  });

  it('should add to chosen product in redux state, by img click', async () => {
    const { getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <CartItemList itemNumber={10} quantity={20} product={TEST_PRODUCT} cartID={'1'} />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(getByTestId('product-item-chose'));

    expect(store.getState().chosenProduct).toStrictEqual({
      id: TEST_PRODUCT.id,
      name: TEST_PRODUCT.name,
    });
  });
});
