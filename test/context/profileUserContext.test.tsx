import { describe, expect, it } from 'vitest';
import { rootState } from '@/store/store';
import { Provider } from 'react-redux';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProfileUserContextProvider, useMyProfileUserContext } from '@/context/ProfileUserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserAuthContextProvider, useMyUserAuthContext } from '@/context/UserAuthContext';

describe('profile user context', () => {
  const queryClient = new QueryClient();

  it('should update User Profile', async () => {
    const userLoginData = { email: 'test16@gmail.com', password: 'test16test17' };
    const updatedData = {
      address: 'United States, New-York, Times Square',
      cvvCard: '321',
      dateCard: '05/25',
      name: 'Korben Dallas',
      nameCard: 'KORBEN DALLAS',
      numberCard: '5555 4444 3333 9999',
      phone: '+37533123456789',
      userId: 'a9cf1830-f151-4ac7-921c-f75e0a884380',
    };

    const resetData = {
      address: 'United States, New-York, Times Square',
      cvvCard: '123',
      dateCard: '05/25',
      name: 'Rubi Rhod',
      nameCard: 'RUBI RHOD',
      numberCard: '5555 4444 3333 2222',
      phone: '+37533123456789',
      userId: 'a9cf1830-f151-4ac7-921c-f75e0a884380',
    };

    const TestComponent = () => {
      const { profileLoading, profileData, updateUserProfile } = useMyProfileUserContext();
      const { user, showPreloader, getSignIN, errorUser } = useMyUserAuthContext();

      return (
        <div>
          <div data-testid="profile-context-preloader">
            {profileLoading ? 'show preloader' : 'hide preloader'}
          </div>
          <div data-testid="profileData-name">{profileData?.name}</div>
          <div data-testid="profileData-cvvCard">{profileData?.cvvCard}</div>
          <div data-testid="profileData-nameCard">{profileData?.nameCard}</div>
          <div data-testid="profileData-numberCard">{profileData?.numberCard}</div>
          <button onClick={() => updateUserProfile(updatedData)}>Updated profile btn</button>
          <button onClick={() => updateUserProfile(resetData)}>Reset profile btn</button>
          <button onClick={() => getSignIN(userLoginData)}>Sign In</button>
          <div>
            <div data-testid="user-context-email">{user ? user.email : 'No user'}</div>
            <div data-testid="user-context-preloader">
              {showPreloader ? 'show preloader' : 'hide preloader'}
            </div>
            <div data-testid="user-context-error">{errorUser}</div>
          </div>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <UserAuthContextProvider>
              <ProfileUserContextProvider>
                <TestComponent />
              </ProfileUserContextProvider>
            </UserAuthContextProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(getByTestId('profile-context-preloader')).toHaveTextContent('hide preloader');
    expect(getByTestId('user-context-email')).toHaveTextContent('No user');

    await act(async () => {
      fireEvent.click(getByText('Sign In'));
    });

    expect(getByTestId('user-context-preloader')).toHaveTextContent('show preloader');

    await act(async () => {
      fireEvent.click(getByText('Reset profile btn'));
    });

    await waitFor(
      () => {
        expect(getByTestId('user-context-email')).toHaveTextContent('test16@gmail.com');
        expect(getByTestId('profileData-name')).toHaveTextContent(resetData.name);
        expect(getByTestId('profileData-nameCard')).toHaveTextContent(resetData.nameCard);
        expect(getByTestId('profileData-numberCard')).toHaveTextContent(resetData.numberCard);
        expect(getByTestId('profileData-cvvCard')).toHaveTextContent(resetData.cvvCard);
      },
      { timeout: 5000 }
    );

    await act(async () => {
      fireEvent.click(getByText('Updated profile btn'));
    });

    await waitFor(
      () => {
        expect(getByTestId('profileData-name')).toHaveTextContent(updatedData.name);
        expect(getByTestId('profileData-nameCard')).toHaveTextContent(updatedData.nameCard);
        expect(getByTestId('profileData-numberCard')).toHaveTextContent(updatedData.numberCard);
        expect(getByTestId('profileData-cvvCard')).toHaveTextContent(updatedData.cvvCard);
      },
      { timeout: 5000 }
    );

    await act(async () => {
      fireEvent.click(getByText('Reset profile btn'));
    });

    await waitFor(
      () => {
        expect(getByTestId('profileData-name')).toHaveTextContent(resetData.name);
        expect(getByTestId('profileData-nameCard')).toHaveTextContent(resetData.nameCard);
        expect(getByTestId('profileData-numberCard')).toHaveTextContent(resetData.numberCard);
        expect(getByTestId('profileData-cvvCard')).toHaveTextContent(resetData.cvvCard);
      },
      { timeout: 5000 }
    );
  });
});
