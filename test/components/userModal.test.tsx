import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';

import { UserModal } from '@/components/ModalWindow/User/UserModal';

const mockOnClickOutside = vi.fn();
const mockCloseModalUserAnimation = vi.fn();

describe('user modal', () => {
  it('should render user modal', async () => {
    const { getByText, getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <UserModal
            handelCloseModal={mockOnClickOutside}
            closeModalUserAnimation={mockCloseModalUserAnimation}
          />
        </BrowserRouter>
      </Provider>
    );

    expect(getByText('Account')).toBeInTheDocument();
    expect(getByText('My profile')).toBeInTheDocument();

    fireEvent.click(getByText('My profile'));

    expect(mockCloseModalUserAnimation).toHaveBeenCalled();

    fireEvent.click(getByText('Logout'));

    expect(mockCloseModalUserAnimation).toHaveBeenCalledTimes(2);

    fireEvent.click(getByTestId('user-modal-overlay'));

    expect(mockOnClickOutside).toHaveBeenCalled();
  });
});
