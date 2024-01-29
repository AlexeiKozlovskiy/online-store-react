import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { UserIcon } from '@/components/UserProfile/UserIcon';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { rootState } from '@/store/store';
import { UserAuthContextProvider } from '@/context/UserAuthContext';
import { TEST_PRODUCT } from '../testsData';

const testImage = TEST_PRODUCT.images[0];

vi.mock('@/context/UserAuthContext', async () => {
  const actual = await vi.importActual('@/context/UserAuthContext');
  return {
    ...actual,
    useMyUserAuthContext: vi.fn(() => ({
      user: {
        isGoogle: false,
        picture: testImage,
        login: 'test',
      },
    })),
  };
});

describe('User Icon component', () => {
  it('renders user picture when user is logged in with not Google', () => {
    const { getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <UserAuthContextProvider>
            <UserIcon />
          </UserAuthContextProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(getByTestId('user-icon').textContent).toBe('T');
  });
});
