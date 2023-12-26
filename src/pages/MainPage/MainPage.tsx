import './MainPage.scss';
import { useState } from 'react';
import { SortedSelect } from '@/components/TopMainPanel/SortedSelect';
import { ProductsList } from '@/components/ProductList/ProductsList';
import { SearchPanel } from '@/components/SearchPanel/SearchPanel';
import { SideFilter } from '@/components/SideFilter/SideFilter';
import { useMyFiltersContext } from '@/context/FiltersContext';

export function MainPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [clickFilters, setClickFilters] = useState(false);

  const { emptyCatalog } = useMyFiltersContext();

  function handleShowFilters() {
    showFilters ? setShowFilters(false) : setShowFilters(true);
  }

  function handleClickFilters(value: boolean) {
    setClickFilters(value);
  }

  const noItemsFound = <section className="empty-catalog">No items found</section>;

  return (
    <main className="MainPage-container wrapper">
      <SearchPanel />
      <div className="store-page">
        <section className="main-catalog">
          <aside className="main-catalog__filters">
            <SideFilter
              showFilters={showFilters}
              onClickHideFilter={handleShowFilters}
              handleClickFilters={handleClickFilters}
            />
          </aside>
          <div className="main-catalog__center-section main-center-section">
            <SortedSelect onClickShowFilter={handleShowFilters} />
            {emptyCatalog ? noItemsFound : <ProductsList clickFilters={clickFilters} />}
          </div>
        </section>
      </div>
    </main>
  );
}
