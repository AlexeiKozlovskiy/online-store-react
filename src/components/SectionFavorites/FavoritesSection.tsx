import '@/pages/ProfilePage/ProfilePage.scss';
import { useMySortingsContext } from '@/context/SortingsContext';
import { ProductItem } from '@/components/ProductItem/Product';
import { useMyFavoritesContext } from '@/context/FavoritesContext';

export function FavoritesSection() {
  const { sortProducts } = useMySortingsContext();
  const { favoritesData } = useMyFavoritesContext();

  function getFavoritesProducts() {
    if (!favoritesData) return [];
    return sortProducts.filter(({ id }) => favoritesData!.favorites.includes(id));
  }

  const favoritesProducts = getFavoritesProducts();
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
