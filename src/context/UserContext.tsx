import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import {
  FormDataSignIN,
  FormDataSignUP,
  User,
  CredentialGoogle,
  Authentication,
  RootReducerProps,
  FORM_MESSAGES,
  AuthData,
} from '@/types/types';
import { useCloseOpenModalsContext } from './CloseOpenModalsContext';
import { useSelector } from 'react-redux';
import { setAuthParams, clearAuthParams } from '@/reducers/controller';
import { useAuthApi } from '@/api/_authAPI';

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
  setErrorUser: (value: string | null) => void;
}

type Common = {
  user: User | null;
  data: AuthData | null;
  auth: boolean;
  error: string | null;
};

type Refresh = Omit<Common, 'auth' | 'user'>;
type AuthUser = Omit<Common, 'data' | 'error'>;
type SignUP = Pick<Common, 'error'>;
type SignIn = Pick<Common, 'data' | 'error'>;
type GetUser = Pick<Common, 'error'> & { data: User | null };

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
  const { getRefreshTokens, getSignIn, getSignInGoogle, getSignUP, getUser } = useAuthApi();
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
      const authUser: AuthUser = await getAuthUser();
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

  async function signIn(formSignIN: FormDataSignIN) {
    setShowPreloader(true);
    const signInData = await getSignIn(formSignIN);
    const { data, error } = signInData as SignIn;
    const { user, backendTokens } = data as AuthData;
    setShowPreloader(false);

    if (error) {
      setErrorUser(`${FORM_MESSAGES.INCORRECT_USERNAME_OR_PASSWORD} ${error}.`);
    }
    if (data) {
      const { id: idUser } = user;
      setAuthParams({ ...backendTokens, idUser });
      closeModalSignInAnimation();
    }
  }

  async function signInByGoogle(dataGoogle: CredentialGoogle) {
    setShowPreloader(true);
    setIsFetching(true);
    const signInGoogleData = await getSignInGoogle(dataGoogle);
    const { data, error } = signInGoogleData as SignIn;
    const { user, backendTokens } = data as AuthData;
    setIsFetching(false);
    setShowPreloader(false);

    if (error) {
      setErrorUser(`${FORM_MESSAGES.SOMETHING_WRONG_WITH_GOOGLE} ${error}.`);
    }
    if (data) {
      const { id: idUser } = user;
      setAuthParams({ ...backendTokens, idUser });
      setAutenticated(true);
    }
  }

  async function getAuthUser() {
    const defaultReturnObject = { auth: false, user: null };

    if (!accessToken || !idUser) {
      return defaultReturnObject;
    }

    setIsFetching(true);
    const authUser = await getUser(accessToken, idUser);
    const { data: user, error } = authUser as GetUser;
    setIsFetching(false);

    if (error) {
      setErrorUser(FORM_MESSAGES.SOMETHING_WRONG);
    }
    if (user) {
      return { auth: true, user };
    } else {
      return defaultReturnObject;
    }
  }

  async function refreshTokens() {
    const token = await getRefreshTokens(refreshToken!);
    const { data, error } = token as Refresh;
    const { backendTokens } = data as AuthData;

    if (error) {
      setErrorUser(FORM_MESSAGES.SOMETHING_WRONG);
    }
    if (data) {
      setAuthParams({ ...backendTokens, idUser });
    }
  }

  async function signUP(formSignUP: FormDataSignUP) {
    setShowPreloader(true);
    const signUPData = await getSignUP(formSignUP);
    const { error } = signUPData as SignUP;
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
