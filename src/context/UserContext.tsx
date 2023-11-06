import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';
import { API_ROUTES } from '@/helpers/constant';
import { FORM_MESSAGES, FormDataSignIN, FormDataSignUP, IUser } from '@/types/types';
import { useCloseOpenModalsContext } from './CloseOpenModalsContext';

interface IUserContext {
  user: IUser | null;
  authenticated: boolean;
  logOut: () => void;
  storeAccessToken: (value: string) => void;
  storeIDUser: (value: string) => void;
  signIn: ({ formSignIN }: FormDataSignIN) => void;
  signUP: ({ formSignUP }: FormDataSignUP) => void;
  showPreloader: boolean;
  errorUser: string | null;
  isFetching: boolean;
  idUser: string | null;
}

export const useMyUserContext = () => useContext(UserContext);

export const UserContext = createContext<IUserContext>({
  user: null,
  authenticated: false,
  logOut: () => null,
  storeAccessToken: () => null,
  storeIDUser: () => null,
  signIn: () => null,
  signUP: () => null,
  showPreloader: false,
  errorUser: null,
  isFetching: false,
  idUser: '',
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [authenticated, setAutenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [expiresIn, setExpiresIn] = useState(localStorage.getItem('expiresIn'));
  const [idUser, setIdUser] = useState(localStorage.getItem('idUser'));
  const [isFetching, setIsFetching] = useState(false);
  //   const { data: User = {}, isFetching } = useGetUserQuery({ idUser, accessToken });

  const {
    openModalSignUP,
    openModalSignIN,
    setOpenModalSignIN,
    setOpenModalSignUP,
    closeModalSignInAnimation,
  } = useCloseOpenModalsContext();
  const [showPreloader, setShowPreloader] = useState(false);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  useEffect(() => {
    if (!openModalSignUP || !openModalSignUP) {
      setErrorUser(null);
    }
  }, [openModalSignUP, openModalSignIN]);

  useEffect(() => {
    async function getRefreshTokens() {
      if (new Date().getTime() > +expiresIn!) {
        refresh();
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

  async function refresh() {
    try {
      const response = await axios({
        method: 'POST',
        url: API_ROUTES.REFRESH,
        headers: {
          Authorization: `Refresh ${refreshToken}`,
        },
      });
      const { expiresIn, accessToken, refreshToken: refreshTokenNew } = response.data;
      storeExpiresIn(expiresIn);
      storeAccessToken(accessToken);
      storeRefreshToken(refreshTokenNew);
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
      const response = await axios({
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

  async function signIn({ formSignIN }: FormDataSignIN) {
    try {
      setShowPreloader(true);
      const response = await axios({
        method: 'post',
        url: API_ROUTES.SIGN_IN,
        data: {
          username: formSignIN.email,
          password: formSignIN.password,
        },
      });
      const { accessToken, refreshToken, expiresIn } = response.data.backendTokens;
      const { id } = response.data.user;
      storeAccessToken(accessToken);
      storeRefreshToken(refreshToken);
      storeExpiresIn(expiresIn);
      storeIDUser(id);
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
    try {
      setShowPreloader(true);
      await axios({
        method: 'post',
        url: API_ROUTES.SIGN_UP,
        data: {
          name: formSignUP.login,
          email: formSignUP.email,
          password: formSignUP.password,
        },
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

  function storeAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
    setAccessToken(token);
  }

  function removeAccessToken() {
    localStorage.removeItem('accessToken');
    setAccessToken(null);
  }

  function storeRefreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
    setRefreshToken(token);
  }

  function removeRefreshToken() {
    localStorage.removeItem('refreshToken');
    setRefreshToken(null);
  }

  function storeExpiresIn(value: string) {
    localStorage.setItem('expiresIn', value);
    setExpiresIn(value);
  }

  function removeExpiresIn() {
    localStorage.removeItem('expiresIn');
    setExpiresIn(null);
  }

  function storeIDUser(id: string) {
    localStorage.setItem('idUser', id);
    setIdUser(id);
  }

  function removeIDUser() {
    localStorage.removeItem('idUser');
    setIdUser(null);
  }

  function logOut() {
    removeAccessToken();
    removeRefreshToken();
    removeExpiresIn();
    removeIDUser();
    setUser(null);
    setAutenticated(false);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        authenticated,
        logOut,
        storeAccessToken,
        storeIDUser,
        signIn,
        signUP,
        showPreloader,
        errorUser,
        isFetching,
        idUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
