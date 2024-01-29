import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import store, { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { TEST_PRODUCTS } from '../testsData';
import { addProductToCart } from '@/store/controller';
import { QuantityPiecesCart } from '@/components/QuantityPieces/QuantityPiecesCart';

vi.mock('@/api/ProductsAPI', async () => {
  const mod = await vi.importActual('@/api/ProductsAPI');
  return {
    ...mod,
    useGetProductsQuery: vi.fn(() => ({
      data: TEST_PRODUCTS,
    })),
  };
});

describe('quantity pieces cart', () => {
  it('should changes quantity', async () => {
    const id = '16';

    act(() => {
      addProductToCart(id, TEST_PRODUCTS!);
    });

    const updatedState = store.getState().cart;
    const quantity = updatedState[0].quantity;

    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <QuantityPiecesCart id={id} quantity={quantity} stock={8} />
        </BrowserRouter>
      </Provider>
    );

    const quantityInput: HTMLInputElement = screen.getByTestId('quantity-input');
    const quantityArrowUp = screen.getByTestId('quantity-arrow-up');
    const quantityArrowDown = screen.getByTestId('quantity-arrow-down');

    fireEvent.click(quantityArrowUp);
    fireEvent.click(quantityArrowUp);
    fireEvent.click(quantityArrowUp);

    await waitFor(() => {
      const updatedStates = store.getState().cart;
      expect(updatedStates[0].quantity).toBe(4);
    });

    fireEvent.click(quantityArrowDown);
    fireEvent.click(quantityArrowDown);

    await waitFor(() => {
      const updatedStates = store.getState().cart;
      expect(updatedStates[0].quantity).toBe(2);
    });

    fireEvent.change(quantityInput, { target: { value: '4' } });

    await waitFor(() => {
      const updatedStates = store.getState().cart;
      expect(updatedStates[0].quantity).toBe(4);
    });

    fireEvent.change(quantityInput, { target: { value: '10' } });

    await waitFor(() => {
      const updatedStates = store.getState().cart;
      expect(updatedStates[0].quantity).toBe(8);
    });

    fireEvent.change(quantityInput, { target: { value: '*' } });

    await waitFor(() => {
      const updatedStates = store.getState().cart;
      expect(updatedStates[0].quantity).toBe(8);
    });
  });
});
