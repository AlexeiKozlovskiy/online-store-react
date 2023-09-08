import { SortedFilters } from '../../components/SortedFilter/SortedFilters';
import { ProductsList } from '../../components/Products/ProductsList';
import { SearchPanel } from '../../components/SearchPanel/SearchPanel';
import { SideFilter } from '../../components/SideFilter/SideFilter';
import './MainPage.scss';
import { useState } from 'react';

export function MainPage() {
  const [showFilters, setShowFilters] = useState(false);

  const handleShowFilters = () => {
    showFilters ? setShowFilters(false) : setShowFilters(true);
  };

  return (
    <main className="MainPage-container wrapper">
      <SearchPanel />
      <div className="store-page">
        <section className="main-catalog">
          <div className="main-catalog__filters">
            <SideFilter showFilters={showFilters} onClickHideFilter={handleShowFilters} />
          </div>
          <div className="main-catalog__center-section main-center-section">
            <SortedFilters onClickShowFilter={handleShowFilters} />
            <ProductsList />
          </div>
        </section>
      </div>
    </main>
  );
}
