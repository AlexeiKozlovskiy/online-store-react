import { Authentication, RootReducerProps } from '@/types/types';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from 'react-query';
import { deleteFavorites, getFavorites, updateFavorites } from '@/api/FavoritesProductAPI';
import { ReactNode, createContext, useContext } from 'react';

interface FavoritesData {
  userId: string;
  favorites: string[];
}
interface IProfileUserContext {
  updateUserFavorites: (productID: string) => void;
  deleteUserFavorites: (productID: string) => void;
  favoritesData: FavoritesData | null | undefined;
  favoritesLoading: boolean;
}

export const useMyFavoritesContext = () => useContext(FavoritesContext);

export const FavoritesContext = createContext<IProfileUserContext>({
  updateUserFavorites: () => null,
  deleteUserFavorites: () => null,
  favoritesData: null,
  favoritesLoading: false,
});

export const FavoritesContextProvider = ({ children }: { children: ReactNode }) => {
  const authState = useSelector<RootReducerProps, Authentication>((state) => state.auth);
  const { idUser } = authState;

  const updateUserMutation = useMutation((productID: string) =>
    updateFavorites(idUser!, productID)
  );
  const deleteUserMutation = useMutation((productID: string) =>
    deleteFavorites(idUser!, productID)
  );
  const {
    data: favoritesData,
    isLoading: favoritesLoading,
    refetch,
  } = useQuery(['favorites', idUser], () => getFavorites(idUser!), {
    enabled: !!idUser,
    // onError: () => logOut(),
    refetchOnWindowFocus: false,
  });

  const updateUserFavorites = async (productID: string) => {
    try {
      await updateUserMutation.mutateAsync(productID);
      await refetch();
    } catch (error) {
      console.error(updateUserMutation, error);
    }
  };

  const deleteUserFavorites = async (productID: string) => {
    try {
      await deleteUserMutation.mutateAsync(productID);
      await refetch();
    } catch (error) {
      console.error(updateUserMutation, error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoritesData,
        updateUserFavorites,
        deleteUserFavorites,
        favoritesLoading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
