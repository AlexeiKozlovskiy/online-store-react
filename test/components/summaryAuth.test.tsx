import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { Summary } from '@/components/CartSummary/Summary';
import { CloseOpenModalsContextProvider } from '@/context/CloseOpenModalsContext';

const mockSetOpenModals = vi.fn();

vi.mock('react-redux', async () => {
  const mod = await vi.importActual('react-redux');
  return {
    ...mod,
    useSelector: vi
      .fn()
      .mockImplementationOnce(() => ({
        authenticated: true,
      }))
      .mockImplementation(() => ({
        applied: [],
        available: [
          { id: 1, name: 'NEW-YEAR-2024', discount: 7 },
          { id: 2, name: 'JOLLY-XMAS', discount: 10 },
        ],
      })),
  };
});

vi.mock('@/hooks/TotalCartInfo', async () => {
  const mod = await vi.importActual('@/hooks/TotalCartInfo');
  return {
    ...mod,
    useTotalCartInfo: vi.fn().mockImplementation(() => ({
      totalItems: 10,
      totalPrice: 10,
      totalPriseByPromocode: 8,
    })),
  };
});

vi.mock('@/context/CloseOpenModalsContext', async () => {
  const mod = await vi.importActual('@/context/CloseOpenModalsContext');
  return {
    ...mod,
    useCloseOpenModalsContext: vi.fn(() => ({
      setOpenModals: mockSetOpenModals,
    })),
  };
});

describe('summary', () => {
  it('should open sign in modal if user is authorised', async () => {
    const { getByText } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <CloseOpenModalsContextProvider>
            <Summary />
          </CloseOpenModalsContextProvider>
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(getByText('Proceed to Checkout'));

    expect(mockSetOpenModals).toHaveBeenCalled();
  });
});
