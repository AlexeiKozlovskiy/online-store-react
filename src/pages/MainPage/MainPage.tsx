import { SearchPanel } from '../../components/SearchPanel/SearchPanel';
import { SideFilter } from '../../components/SideFilter/SideFilter';

export function MainPage() {
  return (
    <main className="MainPage-container wrapper">
      <SearchPanel />
      <div className="store-page">
        <section className="main-catalog">
          <div className="main-catalog__filters">
            <SideFilter />
          </div>
        </section>
      </div>
    </main>
  );
}
