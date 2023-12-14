import { getProfile, createProfile, updateProfile } from '@/api/ProfileUserAPI';
import { Authentication, Profile, RootReducerProps } from '@/types/types';
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';

interface IProfileUserContext {
  createUserProfile: (data: Profile) => void;
  updateUserProfile: (data: Profile) => void;
  profileData: Profile | null | undefined;
  profileLoading: boolean;
}

export const useMyProfileUserContext = () => useContext(ProfileUserContext);

export const ProfileUserContext = createContext<IProfileUserContext>({
  createUserProfile: () => null,
  updateUserProfile: () => null,
  profileData: null,
  profileLoading: false,
});

export const ProfileUserContextProvider = ({ children }: { children: ReactNode }) => {
  const [profileLoading, setProfileLoading] = useState(false);
  const authState = useSelector<RootReducerProps, Authentication>((state) => state.auth);
  const { accessToken, idUser } = authState;
  const createUserMutation = useMutation((data: Profile) => createProfile(data, idUser!));
  const updateUserMutation = useMutation((data: Profile) => updateProfile(data, idUser!));
  const {
    data: profileData,
    isLoading: profileDataLoading,
    refetch,
  } = useQuery(['profile', accessToken, idUser], () => getProfile(accessToken, idUser), {
    enabled: !!accessToken && !!idUser,
  });
  const { isLoading: updateProfileLoading } = updateUserMutation;
  const { isLoading: createProfileLoading } = createUserMutation;

  useEffect(() => {
    commonPreloadingProfile();
  }, [profileDataLoading, updateProfileLoading, createProfileLoading]);

  const createUserProfile = async (data: Profile) => {
    try {
      await createUserMutation.mutateAsync(data);
      await refetch();
    } catch (error) {
      console.error(createUserMutation, error);
    }
  };

  const updateUserProfile = async (data: Profile) => {
    try {
      await updateUserMutation.mutateAsync(data);
      await refetch();
    } catch (error) {
      console.error(updateUserMutation, error);
    }
  };

  function commonPreloadingProfile() {
    if (profileDataLoading || updateProfileLoading || createProfileLoading) {
      setProfileLoading(true);
    } else setProfileLoading(false);
  }

  return (
    <ProfileUserContext.Provider
      value={{
        profileData,
        createUserProfile,
        updateUserProfile,
        profileLoading,
      }}
    >
      {children}
    </ProfileUserContext.Provider>
  );
};
