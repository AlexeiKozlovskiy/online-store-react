import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import {
  User,
  CredentialGoogle,
  Authentication,
  RootReducerProps,
  FORM_MESSAGES,
  FormSignIN,
  FormSignUP,
} from '@/types/types';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';
import { useSelector } from 'react-redux';
import { setAuthParams, clearAuthParams } from '@/store/controller';
import { refreshTokensApi, signInApi, signInGoogleApi, signUPApi, getUser } from '@/api/AuthAPI';

interface IUserAuthContext {
  user: User | null;
  logOut: () => void;
  getSignIN: (formSignIN: FormSignIN) => void;
  getSignUP: (formSignUP: FormSignUP) => void;
  showPreloader: boolean;
  errorUser: string | null;
  isFetching: boolean;
  setGoogleData: (value: CredentialGoogle) => void;
  setErrorUser: (value: string | null) => void;
}

export const useMyUserAuthContext = () => useContext(UserAuthContext);

export const UserAuthContext = createContext<IUserAuthContext>({
  user: null,
  logOut: () => null,
  getSignIN: () => null,
  getSignUP: () => null,
  showPreloader: false,
  errorUser: null,
  isFetching: false,
  setGoogleData: () => null,
  setErrorUser: () => null,
});

export const UserAuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [googleData, setGoogleData] = useState<CredentialGoogle | null>(null);
  const [showPreloader, setShowPreloader] = useState(false);
  const { closeAnimationModal, openModals, setOpenModals } = useCloseOpenModalsContext();
  const [errorUser, setErrorUser] = useState<string | null>(null);
  const authState = useSelector<RootReducerProps, Authentication>((state) => state.auth);
  const { accessToken, refreshToken, expiresIn, idUser, authenticated } = authState;

  const { signUP, signIN } = openModals;

  useEffect(() => {
    function resetErrorByCloseModal() {
      if (!signUP || !signIN) {
        setErrorUser(null);
      }
    }
    resetErrorByCloseModal();
  }, [signUP, signIN]);

  useEffect(() => {
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
    }
    getUserDetails();
  }, [authState]);

  useEffect(() => {
    if (googleData) {
      signInByGoogle(googleData);
    }
  }, [googleData]);

  async function checkRefreshTokens() {
    const curTime = new Date().getTime();
    if (curTime - 15000 > +expiresIn!) {
      logOut();
    }
    if (curTime > +expiresIn!) {
      refreshTokens();
    }
  }

  async function getSignIN(formSignIN: FormSignIN) {
    setShowPreloader(true);

    const signInData = await signInApi(formSignIN);
    setShowPreloader(false);

    if (signInData) {
      const { data, error } = signInData;

      if (data) {
        const { user, backendTokens, authenticated } = data;
        const { id: idUser } = user;
        setAuthParams({ ...backendTokens, idUser, authenticated });
        closeAnimationModal('signIN');
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
        const { user, backendTokens, authenticated } = data;
        const { id: idUser } = user;
        setAuthParams({ ...backendTokens, idUser, authenticated });
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
      setAuthParams({ ...data.backendTokens, idUser, authenticated });
    } else if (error) {
      logOut();
      setErrorUser(FORM_MESSAGES.SOMETHING_WRONG);
    }
  }

  async function getSignUP(formSignUP: FormSignUP) {
    setShowPreloader(true);
    const signUPData = await signUPApi(formSignUP);
    const { error } = signUPData;
    setShowPreloader(false);

    if (error) {
      setErrorUser(error);
    }
    if (!error) {
      setOpenModals({ ...openModals, signIN: true, signUP: false });
    }
  }

  function logOut() {
    clearAuthParams();
    setUser(null);
  }

  return (
    <UserAuthContext.Provider
      value={{
        user,
        logOut,
        getSignIN,
        getSignUP,
        showPreloader,
        errorUser,
        isFetching,
        setGoogleData,
        setErrorUser,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
