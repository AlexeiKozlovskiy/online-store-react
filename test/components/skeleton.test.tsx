import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { rootState } from '@/store/store';
import { UserAuthContextProvider } from '@/context/UserAuthContext';
import { UserProfileSkeleton } from '@/components/Skeleton/UserProfile/UserProfileSkeleton';
import { InputSkeleton } from '@/components/Skeleton/ProfilePage/InputSkeleton';

describe('skeleton tests', () => {
  it('renders user profile skeleton', () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <UserAuthContextProvider>
            <UserProfileSkeleton />
          </UserAuthContextProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('user-profile-skeleton')).toBeInTheDocument();
  });

  it('renders input skeleton skeleton', () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <UserAuthContextProvider>
            <InputSkeleton />
          </UserAuthContextProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('input-skeleton')).toBeInTheDocument();
  });
});
