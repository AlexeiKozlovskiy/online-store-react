import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Authentication } from '@/types/types';

const initialState: Authentication = {
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  idUser: null,
  authenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<Authentication>) => {
      const { accessToken, refreshToken, expiresIn, idUser, authenticated } = action.payload;

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.expiresIn = expiresIn;
      state.idUser = idUser;
      state.authenticated = authenticated;
    },
    clearAuthUser: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.expiresIn = null;
      state.idUser = null;
      state.authenticated = false;
    },
  },
});

export const { setAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
