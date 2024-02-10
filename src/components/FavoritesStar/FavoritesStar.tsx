import './FavoritesStar.scss';
import { useSelector } from 'react-redux';
import { Authentication, RootReducerProps } from '@/types/types';
import { useCloseOpenModalsContext } from '@/context/CloseOpenModalsContext';
import { useMyFavoritesContext } from '@/context/FavoritesContext';

interface IFavoritesStar {
  id: string;
  add_style: string;
  added_style: string;
}

export function FavoritesStar({ id, add_style, added_style }: IFavoritesStar) {
  const { favoritesData, updateUserFavorites, deleteUserFavorites } = useMyFavoritesContext();
  const { authenticated } = useSelector<RootReducerProps, Authentication>((state) => state.auth);
  const { setOpenModals } = useCloseOpenModalsContext();

  function getIsInFavorites(id: string) {
    if (favoritesData) {
      return favoritesData.favorites.includes(id);
    }
  }

  function productItemFavorites(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const { dataset } = e.target as HTMLElement;

    if (authenticated) {
      updateUserFavorites(dataset.id!);
    } else {
      setOpenModals((prevOpenModals) => ({
        ...prevOpenModals,
        modalSignIN: true,
      }));
    }
  }

  function productItemRemoveFavorites(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const { dataset } = e.target as HTMLElement;
    deleteUserFavorites(dataset.id!);
  }

  const isFavorite = getIsInFavorites(id);

  const addToFavorite = (
    <div
      className={`favorite-star favorite-star__add ${add_style}`}
      data-id={id}
      onClick={productItemFavorites}
    ></div>
  );

  const inFavorite = (
    <div
      className={`favorite-star favorite-star__added ${added_style}`}
      data-id={id}
      onClick={productItemRemoveFavorites}
    ></div>
  );
  return <>{isFavorite ? inFavorite : addToFavorite}</>;
}
