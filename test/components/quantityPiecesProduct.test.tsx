import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { QuantityPiecesProduct } from '@/components/QuantityPieces/QuantityPiecesProduct';
import { TEST_PRODUCT } from '../testsData';

describe('quantity pieces product', () => {
  it('should changes quantity', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <QuantityPiecesProduct
            onChangeQuantity={vi.fn()}
            onResetInput={false}
            stock={TEST_PRODUCT.stock}
          />
        </BrowserRouter>
      </Provider>
    );
    const quantityInput: HTMLInputElement = screen.getByTestId('quantity-input');
    const quantityArrowUp = screen.getByTestId('quantity-arrow-up');
    const quantityArrowDown = screen.getByTestId('quantity-arrow-down');

    fireEvent.click(quantityArrowUp);
    fireEvent.click(quantityArrowUp);
    fireEvent.click(quantityArrowUp);

    expect(quantityInput.value).toBe('4');

    fireEvent.click(quantityArrowDown);
    fireEvent.click(quantityArrowDown);
    fireEvent.click(quantityArrowDown);
    fireEvent.click(quantityArrowDown);

    expect(quantityInput.value).toBe('1');

    fireEvent.change(quantityInput, { target: { value: '7' } });

    expect(quantityInput.value).toBe('7');

    fireEvent.change(quantityInput, { target: { value: '200' } });

    expect(+quantityInput.value).toBe(TEST_PRODUCT.stock);

    fireEvent.click(quantityArrowUp);

    expect(+quantityInput.value).toBe(TEST_PRODUCT.stock);

    fireEvent.change(quantityInput, { target: { value: '*' } });

    expect(quantityInput.value).toBe('1');
  });
});
