import { getProfile, updateProfile } from '@/api/ProfileUserAPI';
import { Authentication, Profile, RootReducerProps } from '@/types/types';
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import { useMyUserAuthContext } from './UserAuthContext';

interface IProfileUserContext {
  updateUserProfile: (data: Profile) => void;
  profileData: Profile | null | undefined;
  profileLoading: boolean;
}

export const useMyProfileUserContext = () => useContext(ProfileUserContext);

export const ProfileUserContext = createContext<IProfileUserContext>({
  updateUserProfile: () => null,
  profileData: null,
  profileLoading: false,
});

export const ProfileUserContextProvider = ({ children }: { children: ReactNode }) => {
  const [profileLoading, setProfileLoading] = useState(false);
  const authState = useSelector<RootReducerProps, Authentication>((state) => state.auth);
  const { accessToken, idUser } = authState;
  const { logOut } = useMyUserAuthContext();
  const updateUserMutation = useMutation((data: Profile) => updateProfile(data, idUser!));
  const {
    data: profileData,
    isLoading: profileDataLoading,
    refetch,
  } = useQuery(['profile', accessToken, idUser], () => getProfile(accessToken, idUser), {
    enabled: !!accessToken && !!idUser,
    onError: () => logOut(),
    refetchOnWindowFocus: false,
  });
  const { isLoading: updateProfileLoading } = updateUserMutation;

  useEffect(() => {
    commonPreloadingProfile();
  }, [profileDataLoading, updateProfileLoading]);

  const updateUserProfile = async (data: Profile) => {
    try {
      await updateUserMutation.mutateAsync(data);
      await refetch();
    } catch (error) {
      console.error(updateUserMutation, error);
    }
  };

  function commonPreloadingProfile() {
    if (profileDataLoading || updateProfileLoading) {
      setProfileLoading(true);
    } else setProfileLoading(false);
  }

  return (
    <ProfileUserContext.Provider
      value={{
        profileData,
        updateUserProfile,
        profileLoading,
      }}
    >
      {children}
    </ProfileUserContext.Provider>
  );
};
