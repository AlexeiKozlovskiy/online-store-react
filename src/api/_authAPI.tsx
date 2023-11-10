import { API_ROUTES } from '@/helpers/constant';
import {
  UserResp,
  CredentialGoogle,
  FormDataSignIN,
  FormDataSignUP,
  AuthDataResp,
} from '@/types/types';
import axios, { AxiosError } from 'axios';

export function useAuthApi() {
  function commonError(err: unknown) {
    const error = err as AxiosError<Error>;
    if (error.response) {
      const err = error.response.data.message;
      return { error: err, data: null };
    }
  }

  async function getSignIn({ formSignIN }: FormDataSignIN) {
    try {
      const response: AuthDataResp = await axios({
        method: 'post',
        url: API_ROUTES.SIGN_IN,
        data: formSignIN,
      });
      return { error: null, data: response.data };
    } catch (err) {
      return commonError(err);
    }
  }

  async function getSignInGoogle(dataGoogle: CredentialGoogle) {
    try {
      const response: AuthDataResp = await axios({
        method: 'post',
        url: API_ROUTES.SIGN_IN_GOOGLE,
        data: { ...dataGoogle, isGoogle: true },
      });
      return { error: null, data: response.data };
    } catch (err) {
      return commonError(err);
    }
  }

  async function getSignUP({ formSignUP }: FormDataSignUP) {
    try {
      await axios({
        method: 'post',
        url: API_ROUTES.SIGN_UP,
        data: formSignUP,
      });
      return { error: null };
    } catch (err) {
      return commonError(err);
    }
  }

  async function getUser(accessToken: string, idUser: string) {
    try {
      const response: UserResp = await axios({
        method: 'GET',
        url: API_ROUTES.GET_USER + idUser,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return { error: null, data: response.data };
    } catch (err) {
      return commonError(err);
    }
  }

  async function getRefreshTokens(refreshToken: string) {
    try {
      const response: AuthDataResp = await axios({
        method: 'POST',
        url: API_ROUTES.REFRESH,
        headers: {
          Authorization: `Refresh ${refreshToken}`,
        },
      });
      return { error: null, data: response.data };
    } catch (err) {
      return commonError(err);
    }
  }

  return {
    getSignInGoogle,
    getSignIn,
    getSignUP,
    getUser,
    getRefreshTokens,
  };
}
