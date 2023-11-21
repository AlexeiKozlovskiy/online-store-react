import { getProfile, createProfile, updateProfile } from '@/api/ProfileUserAPI';
import { Authentication, UserProfile, RootReducerProps } from '@/types/types';
import { createContext, useContext, ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';

interface IProfileUserContext {
  getUserProfile: () => Promise<UserProfile | null>;
  isFetching: boolean;
  showPreloaderChanges: boolean;
  createUserProfile: (data: UserProfile) => void;
  isEmptyProfile: boolean;
  updateUserProfile: (data: UserProfile) => void;
}

export const useMyProfileUserContext = () => useContext(ProfileUserContext);

export const ProfileUserContext = createContext<IProfileUserContext>({
  getUserProfile: async () => null,
  isFetching: false,
  showPreloaderChanges: false,
  createUserProfile: () => null,
  isEmptyProfile: true,
  updateUserProfile: () => null,
});

export const ProfileUserContextProvider = ({ children }: { children: ReactNode }) => {
  const authState = useSelector<RootReducerProps, Authentication>((state) => state.auth);
  const { accessToken, idUser } = authState;
  const [isFetching, setIsFetching] = useState(false);
  const [isEmptyProfile, setIsEmptyProfile] = useState(true);
  const [showPreloaderChanges, setShowPreloaderChanges] = useState(false);

  async function createUserProfile(data: UserProfile) {
    setIsFetching(true);
    idUser && (await createProfile(data, idUser));
    setIsFetching(false);
  }

  async function updateUserProfile(data: UserProfile) {
    setShowPreloaderChanges(true);
    idUser && (await updateProfile(data, idUser));
    setShowPreloaderChanges(false);
  }

  async function getUserProfile() {
    if (!accessToken || !idUser) {
      return null;
    }
    setIsFetching(true);
    const profile = await getProfile(accessToken, idUser);
    setIsFetching(false);

    const { data } = profile;

    if (data) {
      setIsEmptyProfile(false);
      return data;
    } else {
      setIsEmptyProfile(true);
      return null;
    }
  }

  return (
    <ProfileUserContext.Provider
      value={{
        getUserProfile,
        isFetching,
        createUserProfile,
        isEmptyProfile,
        updateUserProfile,
        showPreloaderChanges,
      }}
    >
      {children}
    </ProfileUserContext.Provider>
  );
};
