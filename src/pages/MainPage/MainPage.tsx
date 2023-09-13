import './MainPage.scss';
import { useState } from 'react';
import { SortedFilters } from '@/components/SortedFilter/SortedFilters';
import { ProductsList } from '@/components/Products/ProductsList';
import { SearchPanel } from '@/components/SearchPanel/SearchPanel';
import { SideFilter } from '@/components/SideFilter/SideFilter';

export function MainPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [swichedView, setSwichedView] = useState('block');

  function handleShowFilters() {
    showFilters ? setShowFilters(false) : setShowFilters(true);
  }

  function handleSwichedView(value: string) {
    setSwichedView(value);
  }

  return (
    <main className="MainPage-container wrapper">
      <SearchPanel />
      <div className="store-page">
        <section className="main-catalog">
          <div className="main-catalog__filters">
            <SideFilter showFilters={showFilters} onClickHideFilter={handleShowFilters} />
          </div>
          <div className="main-catalog__center-section main-center-section">
            <SortedFilters
              onClickShowFilter={handleShowFilters}
              onClickSwitcher={handleSwichedView}
              swichedView={swichedView}
            />
            <ProductsList swichedView={swichedView} />
          </div>
        </section>
      </div>
    </main>
  );
}
