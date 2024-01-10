import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { CartPage } from '@/pages/CartPage/CartPage';
import { products } from '../../testsData';
import { addProductToCart } from '@/store/controller';
import { useMyURLContext } from '@/context/URLContext';
import { select } from 'react-select-event';

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
    const id = '16';
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <CartPage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('SHOPPING CART')).toBeInTheDocument();
    expect(screen.getByText(/You have no items in your shopping cart./i)).toBeInTheDocument();
    act(() => {
      addProductToCart(id, products);
    });
    expect(screen.getByText('Gingerbread House')).toBeInTheDocument();
    expect(screen.getAllByText('$4.99')[0]).toBeInTheDocument();
  });

  it('should changes show items view', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <CartPage />
        </BrowserRouter>
      </Provider>
    );
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
  });
});
