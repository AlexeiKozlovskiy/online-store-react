import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';
import { API_ROUTES } from '@/helpers/constant';
import {
  FORM_MESSAGES,
  FormDataSignIN,
  FormDataSignUP,
  User,
  CredentialGoogle,
  SignInGoogle,
  AuthUserResp,
  Authentication,
  RootReducerProps,
} from '@/types/types';
import { useCloseOpenModalsContext } from './CloseOpenModalsContext';
import { useSelector } from 'react-redux';
import { setAuthParams, clearAuthParams } from '@/reducers/controller';

interface IUserContext {
  user: User | null;
  authenticated: boolean;
  logOut: () => void;
  signIn: ({ formSignIN }: FormDataSignIN) => void;
  signUP: ({ formSignUP }: FormDataSignUP) => void;
  showPreloader: boolean;
  errorUser: string | null;
  isFetching: boolean;
  setGoogleData: (value: CredentialGoogle) => void;
}

export const useMyUserContext = () => useContext(UserContext);

export const UserContext = createContext<IUserContext>({
  user: null,
  authenticated: false,
  logOut: () => null,
  signIn: () => null,
  signUP: () => null,
  showPreloader: false,
  errorUser: null,
  isFetching: false,
  setGoogleData: () => null,
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAutenticated] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [googleData, setGoogleData] = useState<CredentialGoogle | null>(null);
  const [showPreloader, setShowPreloader] = useState(false);
  const [errorUser, setErrorUser] = useState<string | null>(null);
  const {
    openModalSignUP,
    openModalSignIN,
    setOpenModalSignIN,
    setOpenModalSignUP,
    closeModalSignInAnimation,
  } = useCloseOpenModalsContext();
  const authState = useSelector<RootReducerProps, Authentication>((state) => state.auth);
  const { accessToken, refreshToken, expiresIn, idUser } = authState;
  //   const { data: User = {}, isFetching } = useGetUserQuery({ idUser, accessToken });

  useEffect(() => {
    function resetErrorByCloseModal() {
      if (!openModalSignUP || !openModalSignUP) {
        setErrorUser(null);
      }
    }
    resetErrorByCloseModal();
  }, [openModalSignUP, openModalSignIN]);

  useEffect(() => {
    async function getRefreshTokens() {
      if (new Date().getTime() > +expiresIn!) {
        refreshTokens();
      }
    }
    const id = setInterval(() => {
      if (authenticated) {
        getRefreshTokens();
      }
    }, 30000);

    return () => {
      clearInterval(id);
    };
  }, [authenticated, expiresIn]);

  useEffect(() => {
    async function getUserDetails() {
      const { auth, user } = await getAuthUser();
      if (!auth) {
        return;
      }
      setUser(user);
      setAutenticated(auth);
    }
    getUserDetails();
  }, [accessToken]);

  async function refreshTokens() {
    try {
      const response = await axios({
        method: 'POST',
        url: API_ROUTES.REFRESH,
        headers: {
          Authorization: `Refresh ${refreshToken}`,
        },
      });

      const { expiresIn, accessToken, refreshToken: refreshTokenNew } = response.data.backendTokens;
      setAuthParams({ accessToken, refreshToken: refreshTokenNew, expiresIn, idUser });
    } catch (err) {
      setErrorUser(FORM_MESSAGES.SOMETHING_WRONG);
    }
  }

  async function getAuthUser() {
    const defaultReturnObject = { auth: false, user: null };

    try {
      if (!accessToken) {
        return defaultReturnObject;
      }
      setIsFetching(true);
      const response: AuthUserResp = await axios({
        method: 'GET',
        url: API_ROUTES.GET_USER + idUser,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setIsFetching(false);
      return { auth: true, user: response.data };
    } catch (err) {
      setErrorUser(FORM_MESSAGES.SOMETHING_WRONG);
      setIsFetching(false);
      return defaultReturnObject;
    }
  }

  useEffect(() => {
    if (googleData) {
      signInByGoogle(googleData);
    }
  }, [googleData]);

  async function signInByGoogle(dataGoogle: CredentialGoogle) {
    const { email, name: login, picture } = dataGoogle;

    try {
      setShowPreloader(true);
      setIsFetching(true);

      const response: SignInGoogle = await axios({
        method: 'post',
        url: API_ROUTES.SIGN_IN_GOOGLE,
        data: { email, login, picture, isGoogle: true },
      });

      const { accessToken, refreshToken, expiresIn } = response.data.backendTokens;
      const { id: idUser } = response.data.user;

      setAuthParams({ accessToken, refreshToken, expiresIn, idUser });
      setAutenticated(true);
    } catch (err) {
      const error = err as AxiosError<Error>;
      if (error.response) {
        setErrorUser(
          `${FORM_MESSAGES.SOMETHING_WRONG_WITH_GOOGLE} ${error.response.data.message}.`
        );
      }
    } finally {
      setIsFetching(false);
      setShowPreloader(false);
    }
  }

  async function signIn({ formSignIN }: FormDataSignIN) {
    const { email, password } = formSignIN;

    try {
      setShowPreloader(true);
      const response = await axios({
        method: 'post',
        url: API_ROUTES.SIGN_IN,
        data: { email, password },
      });

      const { accessToken, refreshToken, expiresIn } = response.data.backendTokens;
      const { idUser } = response.data.user;

      setAuthParams({ accessToken, refreshToken, expiresIn, idUser });
      closeModalSignInAnimation();
    } catch (err) {
      const error = err as AxiosError<Error>;
      if (error.response) {
        setErrorUser(
          `${FORM_MESSAGES.INCORRECT_USERNAME_OR_PASSWORD} ${error.response.data.message}.`
        );
      }
    } finally {
      setShowPreloader(false);
    }
  }

  async function signUP({ formSignUP }: FormDataSignUP) {
    const { login, email, password } = formSignUP;
    try {
      setShowPreloader(true);
      await axios({
        method: 'post',
        url: API_ROUTES.SIGN_UP,
        data: { login, email, password },
      });

      setOpenModalSignUP(false);
      setOpenModalSignIN(true);
    } catch (err) {
      const error = err as AxiosError<Error>;
      if (error.response) {
        setErrorUser(FORM_MESSAGES.THIS_EMAIL_IS_ALREADY_REGISTERED);
      }
    } finally {
      setShowPreloader(false);
    }
  }

  function logOut() {
    clearAuthParams();
    setUser(null);
    setAutenticated(false);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        authenticated,
        logOut,
        signIn,
        signUP,
        showPreloader,
        errorUser,
        isFetching,
        setGoogleData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
