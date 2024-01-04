import { beforeEach, describe, expect, it } from 'vitest';
import authSlice, { clearAuthUser, setAuthUser } from '@/store/auth';
import { configureStore } from '@reduxjs/toolkit';

describe('Redux auth reducers', () => {
  let store: any;

  const AUTH_PARAMS = {
    accessToken: 'some_access_token',
    refreshToken: 'some_refresh_token',
    expiresIn: 'some_expires_in',
    idUser: 'some_id_user',
    authenticated: true,
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authSlice,
      },
    });
  });

  it('should set AuthUser', async () => {
    store.dispatch(setAuthUser(AUTH_PARAMS));
    const updatedState = store.getState();

    expect(updatedState.auth).toHaveProperty('accessToken', 'some_access_token');
    expect(updatedState.auth).toHaveProperty('idUser', 'some_id_user');
  });

  it('should remove AuthUser', async () => {
    store.dispatch(setAuthUser(AUTH_PARAMS));
    const updatedState = store.getState();

    expect(updatedState.auth).toHaveProperty('accessToken', 'some_access_token');
    expect(updatedState.auth).toHaveProperty('idUser', 'some_id_user');

    store.dispatch(clearAuthUser());
    const removeState = store.getState();

    expect(removeState.auth.accessToken).toBeNull();
    expect(removeState.auth.idUser).toBeNull();
  });
});
