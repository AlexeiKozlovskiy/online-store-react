import './MainPage.scss';
import { useState } from 'react';
import { SortedSelect } from '@/components/TopMainPanel/SortedSelect';
import { ProductsList } from '@/components/Products/ProductsList';
import { SearchPanel } from '@/components/SearchPanel/SearchPanel';
import { SideFilter } from '@/components/SideFilter/SideFilter';
import { useMyFiltersContext } from '@/context/FiltersContext';
import { useMySortingsContext } from '@/context/SortingsContext';
import { useGetProductsQuery } from '@/api/_productsAPI';
import { Preloader } from '@/components/Preloader/Preloader';

export function MainPage() {
  const [showFilters, setShowFilters] = useState(false);
  const { emptyCatalog } = useMyFiltersContext();
  const { sortProducts } = useMySortingsContext();
  const { isFetching } = useGetProductsQuery();

  function handleShowFilters() {
    showFilters ? setShowFilters(false) : setShowFilters(true);
  }

  const noItemsFound = <div className="empty-catalog">No items found</div>;
  const productsList = isFetching ? <Preloader /> : <ProductsList products={sortProducts} />;

  return (
    <main className="MainPage-container wrapper">
      <SearchPanel />
      <div className="store-page">
        <section className="main-catalog">
          <aside className="main-catalog__filters">
            <SideFilter showFilters={showFilters} onClickHideFilter={handleShowFilters} />
          </aside>
          <div className="main-catalog__center-section main-center-section">
            <SortedSelect onClickShowFilter={handleShowFilters} />
            {emptyCatalog ? noItemsFound : productsList}
          </div>
        </section>
      </div>
    </main>
  );
}
