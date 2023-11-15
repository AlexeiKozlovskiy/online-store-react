import { API_ROUTES } from '@/helpers/constant';
import { UserResp, CredentialGoogle, AuthDataResp, MyForms } from '@/types/types';
import axios, { AxiosError } from 'axios';

export function useAuthApi() {
  function commonError(err: unknown) {
    const error = err as AxiosError<Error>;
    const { message } = error.response!.data;
    return { error: message, data: null };
  }

  async function getSignIn({ formSignIN }: MyForms) {
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

  async function getSignUP({ formSignUP }: MyForms) {
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
