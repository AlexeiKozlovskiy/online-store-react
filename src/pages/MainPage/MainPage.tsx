import { ProductsList } from '../../components/Products/ProductsList';
import { SearchPanel } from '../../components/SearchPanel/SearchPanel';
import { SideFilter } from '../../components/SideFilter/SideFilter';
import './MainPage.scss';

export function MainPage() {
  return (
    <main className="MainPage-container wrapper">
      <SearchPanel />
      <div className="store-page">
        <section className="main-catalog">
          <div className="main-catalog__filters">
            <SideFilter />
          </div>
          <div className="main-catalog__center-section main-center-section">
            <ProductsList />
          </div>
        </section>
      </div>
    </main>
  );
}
