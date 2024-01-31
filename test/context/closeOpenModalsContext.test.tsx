import { describe, expect, it } from 'vitest';
import { rootState } from '@/store/store';
import { Provider } from 'react-redux';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {
  CloseOpenModalsContextProvider,
  useCloseOpenModalsContext,
} from '@/context/CloseOpenModalsContext';

describe('filters context', () => {
  it('should close/open modals', async () => {
    const TestComponent = () => {
      const { openModals, setOpenModals, handelCloseModal } = useCloseOpenModalsContext();

      return (
        <>
          <div className="sign-in-modal">
            <div className="signIN-modal">modal sign IN</div>
            <div data-testid="sign-in-modal">{`Sign IN Modal Open: ${openModals.signIN}`}</div>
            <button onClick={() => setOpenModals({ ...openModals, signIN: true })}>
              open sign in modal
            </button>
            <div data-id="modal-signIN" onClick={handelCloseModal}>
              close sign in modal
            </div>
          </div>
          <div className="sign-up-modal">
            <div className="signUP-modal">modal sign UP</div>
            <div data-testid="sign-up-modal">{`Sign UP Modal Open: ${openModals.signUP}`}</div>
            <button onClick={() => setOpenModals({ ...openModals, signUP: true })}>
              open sign up modal
            </button>
            <div data-id="modal-signUP" onClick={handelCloseModal}>
              close sign up modal
            </div>
          </div>
          <div className="user-modal">
            <div className="user-modal">modal user</div>
            <div data-testid="user-modal">{`User Modal Open: ${openModals.user}`}</div>
            <button onClick={() => setOpenModals({ ...openModals, user: true })}>
              open user modal
            </button>
            <div data-id="modal-user" onClick={handelCloseModal}>
              close user modal
            </div>
          </div>
          <div className="profile-modal">
            <div className="payment-modal">modal payment</div>
            <div data-testid="payment-modal">{`Payment Modal Open: ${openModals.payment}`}</div>
            <button onClick={() => setOpenModals({ ...openModals, payment: true })}>
              open payment modal
            </button>
            <div data-id="modal-profile" onClick={handelCloseModal}>
              close payment modal
            </div>
          </div>
        </>
      );
    };

    const { getByTestId, getByText } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <CloseOpenModalsContextProvider>
            <TestComponent />
          </CloseOpenModalsContextProvider>
        </BrowserRouter>
      </Provider>
    );

    // sign in modal
    expect(getByTestId('sign-in-modal')).toHaveTextContent('false');

    fireEvent.click(getByText('open sign in modal'));

    expect(getByTestId('sign-in-modal')).toHaveTextContent('true');

    fireEvent.click(getByText('close sign in modal'));

    await waitFor(() => {
      expect(getByTestId('sign-in-modal')).toHaveTextContent('false');
    });

    // sign up modal
    expect(getByTestId('sign-up-modal')).toHaveTextContent('false');

    fireEvent.click(getByText('open sign up modal'));

    expect(getByTestId('sign-up-modal')).toHaveTextContent('true');

    fireEvent.click(getByText('close sign up modal'));

    await waitFor(() => {
      expect(getByTestId('sign-up-modal')).toHaveTextContent('false');
    });

    // user up modal
    expect(getByTestId('user-modal')).toHaveTextContent('false');

    fireEvent.click(getByText('open user modal'));

    expect(getByTestId('user-modal')).toHaveTextContent('true');

    fireEvent.click(getByText('close user modal'));

    await waitFor(() => {
      expect(getByTestId('user-modal')).toHaveTextContent('false');
    });

    // payment up modal
    expect(getByTestId('payment-modal')).toHaveTextContent('false');

    fireEvent.click(getByText('open payment modal'));

    expect(getByTestId('payment-modal')).toHaveTextContent('true');

    fireEvent.click(getByText('close payment modal'));

    await waitFor(() => {
      expect(getByTestId('payment-modal')).toHaveTextContent('false');
    });
  });
});
