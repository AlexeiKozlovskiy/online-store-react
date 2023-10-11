import './MainPage.scss';
import { useState } from 'react';
import { SortedSelect } from '@/components/TopMainPanel/SortedSelect';
import { ProductsList } from '@/components/Products/ProductsList';
import { SearchPanel } from '@/components/SearchPanel/SearchPanel';
import { SideFilter } from '@/components/SideFilter/SideFilter';
import { useMyFiltersContext } from '@/components/Context/FiltersContext';
import { useMySortingsContext } from '@/components/Context/SortingsContext';

export function MainPage() {
  const [showFilters, setShowFilters] = useState(false);
  const { itemsCount } = useMyFiltersContext();
  const { sortProducts: products } = useMySortingsContext();

  function handleShowFilters() {
    showFilters ? setShowFilters(false) : setShowFilters(true);
  }

  const noItemsFound = <div className="empty-catalog">No items found</div>;
  const productsList = <ProductsList products={products} />;

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
            {itemsCount ? productsList : noItemsFound}
          </div>
        </section>
      </div>
    </main>
  );
}
