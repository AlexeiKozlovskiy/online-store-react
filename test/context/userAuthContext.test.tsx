import { UserAuthContextProvider, useMyUserAuthContext } from '@/context/UserAuthContext';
import { rootState } from '@/store/store';
import { FORM_MESSAGES } from '@/types/types';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { describe, expect, it } from 'vitest';

describe('user context', () => {
  it('should perform sign in, and then log out', async () => {
    const userData = { email: 'test16@gmail.com', password: 'test16test17' };

    const TestComponent = () => {
      const { user, showPreloader, getSignIN, errorUser, logOut } = useMyUserAuthContext();

      return (
        <div>
          <div data-testid="user-context-email">{user ? user.email : 'No user'}</div>
          <div data-testid="user-context-preloader">
            {showPreloader ? 'show preloader' : 'hide preloader'}
          </div>
          <div data-testid="user-context-error">{errorUser}</div>
          <button onClick={() => getSignIN(userData)}>Sign In</button>
          <button onClick={() => logOut()}>Log Out</button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <Provider store={rootState}>
        <UserAuthContextProvider>
          <TestComponent />
        </UserAuthContextProvider>
      </Provider>
    );

    expect(getByTestId('user-context-email')).toHaveTextContent('No user');

    await act(async () => {
      fireEvent.click(getByText('Sign In'));
    });

    expect(getByTestId('user-context-preloader')).toHaveTextContent('show preloader');

    await waitFor(
      () => {
        expect(getByTestId('user-context-preloader')).toHaveTextContent('hide preloader');
        expect(getByTestId('user-context-email')).toHaveTextContent('test16@gmail.com');
        expect(getByTestId('user-context-error')).toHaveTextContent('');
      },
      { timeout: 5000 }
    );

    await act(async () => {
      fireEvent.click(getByText('Log Out'));
    });

    await waitFor(() => {
      expect(getByTestId('user-context-email')).toHaveTextContent('No user');
    });
  });

  it('should perform sign in, with error password either email', async () => {
    const userWrongData = { email: 'test16@gmail.com', password: 'test16test16' };

    const TestComponent = () => {
      const { user, showPreloader, getSignIN, errorUser } = useMyUserAuthContext();

      return (
        <div>
          <div data-testid="user-context-email">{user ? user.email : 'No user'}</div>
          <div data-testid="user-context-preloader">
            {showPreloader ? 'show preloader' : 'hide preloader'}
          </div>
          <div data-testid="user-context-error">{errorUser}</div>
          <button onClick={() => getSignIN(userWrongData)}>Sign In</button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <Provider store={rootState}>
        <UserAuthContextProvider>
          <TestComponent />
        </UserAuthContextProvider>
      </Provider>
    );

    expect(getByTestId('user-context-email')).toHaveTextContent('No user');
    expect(getByTestId('user-context-error')).toHaveTextContent('');

    await act(async () => {
      fireEvent.click(getByText('Sign In'));
    });

    expect(getByTestId('user-context-preloader')).toHaveTextContent('show preloader');

    await waitFor(() => {
      expect(getByTestId('user-context-preloader')).toHaveTextContent('hide preloader');
      expect(getByTestId('user-context-error')).toHaveTextContent(
        FORM_MESSAGES.INCORRECT_USERNAME_OR_PASSWORD
      );
    });
  });
});
