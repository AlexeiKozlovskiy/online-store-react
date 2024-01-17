import './MainPage.scss';
import { useState } from 'react';
import { SortedShowItemsViewPanel } from '@/components/SortedShowItemsViewPanel/SortedShowItemsViewPanel';
import { ProductsList } from '@/components/ProductList/ProductsList';
import { SearchPanel } from '@/components/SearchPanel/SearchPanel';
import { SideFilter } from '@/components/SideFilter/SideFilter';
import { useMyFiltersContext } from '@/context/FiltersContext';
import { bodyNotScroll } from '@/helpers/helpersFunc';
import { BreadCrumdPanel } from '@/components/BreadCrumdPanel/BreadCrumdPanel';
import { useSelector } from 'react-redux';
import { ProductsQweryParams, RootReducerProps } from '@/types/types';

export function MainPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [clickFilters, setClickFilters] = useState(false);
  const { emptyCatalog } = useMyFiltersContext();
  const { qweryParams } = useSelector<RootReducerProps, ProductsQweryParams>(
    (state) => state.productsQweryParams
  );

  function handleShowFilters() {
    showFilters ? setShowFilters(false) : setShowFilters(true);
    bodyNotScroll();
  }

  function handleClickFilters(value: boolean) {
    setClickFilters(value);
  }

  const noItemsFound = (
    <section className="empty-catalog" data-testid="empty-catalog">
      No items found
    </section>
  );

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
            {qweryParams && <BreadCrumdPanel />}
            <SortedShowItemsViewPanel onClickShowFilter={handleShowFilters} />
            {emptyCatalog ? noItemsFound : <ProductsList clickFilters={clickFilters} />}
          </div>
        </section>
      </div>
    </main>
  );
}
