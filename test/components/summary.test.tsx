import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import store, { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { Summary } from '@/components/CartSummary/Summary';
import { CloseOpenModalsContextProvider } from '@/context/CloseOpenModalsContext';

const mockSetOpenModals = vi.fn();

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
  it('should render summary', async () => {
    const { getByText } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <Summary />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('SUMMARY')).toBeInTheDocument();
  });

  it('should open sign in modal if user is unauthorised', async () => {
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

  it('should apply promocode and his remove', async () => {
    const { getByText, getAllByTestId, getByPlaceholderText } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <CloseOpenModalsContextProvider>
            <Summary />
          </CloseOpenModalsContextProvider>
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(getByPlaceholderText('Enter promo code'), {
      target: { value: 'NEW-YEAR-2024' },
    });

    fireEvent.click(getByText('Apply'));

    await waitFor(() => {
      const updatedStates = store.getState().promocode;
      expect(updatedStates.applied).toStrictEqual([{ id: 1, name: 'NEW-YEAR-2024', discount: 7 }]);
    });

    fireEvent.click(getByText('JOLLY-XMAS'));
    fireEvent.click(getByText('Apply'));

    await waitFor(() => {
      const updatedStates = store.getState().promocode;
      expect(updatedStates.applied).toStrictEqual([
        { id: 1, name: 'NEW-YEAR-2024', discount: 7 },
        { id: 2, name: 'JOLLY-XMAS', discount: 10 },
      ]);
    });

    fireEvent.click(getAllByTestId('crossBtn')[1]);

    await waitFor(() => {
      const updatedStates = store.getState().promocode;
      expect(updatedStates.applied).toStrictEqual([{ id: 1, name: 'NEW-YEAR-2024', discount: 7 }]);
    });
  });
});
