import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { PaymentModal } from '@/components/ModalWindow/Payment/PaymentModal';

const mockHandelCloseModalPayment = vi.fn();

describe('payment modal', () => {
  it('should render payment modal', async () => {
    const { getByText, getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <PaymentModal handelCloseModal={mockHandelCloseModalPayment} />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('PAYMENT DETAILS')).toBeInTheDocument();

    fireEvent.click(getByTestId('crossBtn'));

    expect(mockHandelCloseModalPayment).toHaveBeenCalled();
  });
});
