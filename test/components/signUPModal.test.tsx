import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { SignUPModal } from '@/components/ModalWindow/SignUP/SignUPModal';

const mockHandelCloseModalSignUP = vi.fn();

describe('signUP modal', () => {
  it('should render signUP modal', async () => {
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
          <SignUPModal handelCloseModalSignUP={mockHandelCloseModalSignUP} />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('SIGN UP')).toBeInTheDocument();
    expect(getByText('Get started now')).toBeInTheDocument();

    fireEvent.click(getByTestId('crossBtn'));

    expect(mockHandelCloseModalSignUP).toHaveBeenCalled();
  });
});
