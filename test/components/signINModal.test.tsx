import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { SignINModal } from '@/components/ModalWindow/SignIN/SignINModal';

const mockHandelCloseModalSignIN = vi.fn();

describe('signIN modal', () => {
  it('should render signIN modal', async () => {
    window.google = {
      accounts: {
        id: {
          initialize: vi.fn(),
          renderButton: vi.fn(),
        },
      },
    };
    const { getByText, getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <SignINModal handelCloseModalSignIN={mockHandelCloseModalSignIN} />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('SIGN IN')).toBeInTheDocument();

    fireEvent.click(getByTestId('crossBtn'));

    expect(mockHandelCloseModalSignIN).toHaveBeenCalled();
  });
});
