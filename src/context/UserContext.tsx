import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import {
  MyForms,
  User,
  CredentialGoogle,
  Authentication,
  RootReducerProps,
  FORM_MESSAGES,
} from '@/types/types';
import { useCloseOpenModalsContext } from './CloseOpenModalsContext';
import { useSelector } from 'react-redux';
import { setAuthParams, clearAuthParams } from '@/reducers/controller';
import { refreshTokensApi, signInApi, signInGoogleApi, signUPApi, getUser } from '@/api/AuthAPI';

interface IUserContext {
  user: User | null;
  authenticated: boolean;
  logOut: () => void;
  signIn: ({ formSignIN }: MyForms) => void;
  signUP: ({ formSignUP }: MyForms) => void;
  showPreloader: boolean;
  errorUser: string | null;
  isFetching: boolean;
  setGoogleData: (value: CredentialGoogle) => void;
  setErrorUser: (value: string | null) => void;
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
  setErrorUser: () => null,
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAutenticated] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [googleData, setGoogleData] = useState<CredentialGoogle | null>(null);
  const [showPreloader, setShowPreloader] = useState(false);
  const {
    openModalSignUP,
    openModalSignIN,
    setOpenModalSignIN,
    setOpenModalSignUP,
    closeModalSignInAnimation,
  } = useCloseOpenModalsContext();
  const [errorUser, setErrorUser] = useState<string | null>(null);
  const authState = useSelector<RootReducerProps, Authentication>((state) => state.auth);
  const { accessToken, refreshToken, expiresIn, idUser } = authState;

  useEffect(() => {
    function resetErrorByCloseModal() {
      if (!openModalSignUP || !openModalSignUP) {
        setErrorUser(null);
      }
    }
    resetErrorByCloseModal();
  }, [openModalSignUP, openModalSignIN]);

  useEffect(() => {
    async function checkRefreshTokens() {
      if (new Date().getTime() > +expiresIn!) {
        refreshTokens();
      }
    }
    const id = setInterval(() => {
      if (authenticated) {
        checkRefreshTokens();
      }
    }, 10000);

    return () => {
      clearInterval(id);
    };
  }, [authenticated, expiresIn]);

  useEffect(() => {
    async function getUserDetails() {
      const authUser = await getAuthUser();
      const { auth, user } = authUser;

      if (!auth || !user) {
        return;
      }
      setUser(user);
      setAutenticated(auth);
    }
    getUserDetails();
  }, [accessToken, refreshToken, expiresIn, idUser]);

  useEffect(() => {
    if (googleData) {
      signInByGoogle(googleData);
    }
  }, [googleData]);

  async function signIn(formSignIN: MyForms) {
    setShowPreloader(true);
    const signInData = await signInApi(formSignIN);
    setShowPreloader(false);

    if (signInData) {
      const { data, error } = signInData;

      if (data) {
        const { user, backendTokens } = data;
        const { id: idUser } = user;
        setAuthParams({ ...backendTokens, idUser });
        closeModalSignInAnimation();
      } else {
        setErrorUser(`${FORM_MESSAGES.INCORRECT_USERNAME_OR_PASSWORD} ${error}.`);
      }
    }
  }

  async function signInByGoogle(dataGoogle: CredentialGoogle) {
    setShowPreloader(true);
    setIsFetching(true);
    const signInGoogleData = await signInGoogleApi(dataGoogle);

    setIsFetching(false);
    setShowPreloader(false);

    if (signInGoogleData) {
      const { data, error } = signInGoogleData;

      if (data) {
        const { user, backendTokens } = data;
        const { id: idUser } = user;
        setAuthParams({ ...backendTokens, idUser });
        setAutenticated(true);
      } else {
        setErrorUser(`${FORM_MESSAGES.SOMETHING_WRONG_WITH_GOOGLE} ${error}.`);
      }
    }
  }

  async function getAuthUser() {
    const defaultReturnObject = { auth: false, user: null };

    if (!accessToken || !idUser) {
      return defaultReturnObject;
    }

    setIsFetching(true);
    const authUser = await getUser(accessToken, idUser);
    const { data: user } = authUser;
    setIsFetching(false);

    if (user) {
      return { auth: true, user };
    } else {
      logOut();
      setErrorUser(FORM_MESSAGES.SOMETHING_WRONG);
      return defaultReturnObject;
    }
  }

  async function refreshTokens() {
    const token = await refreshTokensApi(refreshToken!);
    const { data, error } = token;

    if (data) {
      setAuthParams({ ...data.backendTokens, idUser });
    } else if (error) {
      setErrorUser(FORM_MESSAGES.SOMETHING_WRONG);
    }
  }

  async function signUP(formSignUP: MyForms) {
    setShowPreloader(true);
    const signUPData = await signUPApi(formSignUP);
    const { error } = signUPData;
    setShowPreloader(false);

    if (error) {
      setErrorUser(error);
    }
    if (!error) {
      setOpenModalSignUP(false);
      setOpenModalSignIN(true);
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
        setErrorUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
