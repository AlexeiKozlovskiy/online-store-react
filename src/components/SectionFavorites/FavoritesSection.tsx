import '@/pages/ProfilePage/ProfilePage.scss';
import { useMySortingsContext } from '@/context/SortingsContext';
import { Product } from '@/types/types';
import { useLayoutEffect, useState } from 'react';
import { ProductItem } from '@/components/ProductItem/Product';
import { useMyFavoritesContext } from '@/context/FavoritesContext';

export function FavoritesSection() {
  const [favoritesProducts, setFavoritesProducts] = useState<Product[]>([]);
  const { sortProducts } = useMySortingsContext();
  const { favoritesData } = useMyFavoritesContext();

  useLayoutEffect(() => {
    if (favoritesData) {
      getFavoritProducts(favoritesData.favorites);
    }
  }, [favoritesData]);

  function getFavoritProducts(favorites: string[]) {
    const products = sortProducts.filter(({ id }) => favorites.some((el) => el === id));
    setFavoritesProducts(products);
  }

  const emptyFavorites = <p className="favorites__empty-catalog">You don&#39;t have favorites</p>;
  const favoritesList = (
    <>
      {favoritesProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </>
  );

  return (
    <section className="favorites__section">
      <div className="favorites">{favoritesProducts.length ? favoritesList : emptyFavorites}</div>
    </section>
  );
}
