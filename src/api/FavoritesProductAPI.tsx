import { API_ROUTES } from '@/helpers/constant';
import axios from 'axios';

interface FavoritesData {
  userId: string;
  favorites: string[];
}

export async function getFavorites(userId: string): Promise<FavoritesData> {
  const response = await axios({
    method: 'GET',
    url: API_ROUTES.FAVORITES + userId,
  });
  return response.data;
}

export async function updateFavorites(userId: string, productID: string) {
  await axios({
    method: 'POST',
    url: API_ROUTES.FAVORITES + userId,
    data: { favorite: productID },
  });
}

export async function deleteFavorites(userId: string, productID: string) {
  await axios({
    method: 'DELETE',
    url: API_ROUTES.FAVORITES + userId,
    data: { favorite: productID },
  });
}
