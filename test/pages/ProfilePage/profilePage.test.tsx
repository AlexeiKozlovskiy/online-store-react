import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { rootState } from '@/store/store';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';

describe('ProfilePage', () => {
  it('should changes profile sections', async () => {
    render(
      <Provider store={rootState}>
        <ProfilePage />
      </Provider>
    );

    const profile = screen.getByTestId('profile');
    const favorites = screen.getByTestId('favorites');
    const shopping = screen.getByTestId('shopping');

    expect(profile).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
    expect(shopping).toBeInTheDocument();

    fireEvent.click(favorites);
    expect(screen.getByText('Favorites section in developing...')).toBeInTheDocument();

    fireEvent.click(shopping);
    expect(screen.getByText('My shopping section in developing...')).toBeInTheDocument();
  });
});
