import './TopMainPanel.scss';
import { SelectedFilters } from '@/components/types/types';
import { BreadCrumdPanel } from './BreadCrumdPanel';
import { ITEMS_IN_PAGE, SORT_OPTIONS } from '@/components/helpers/constant';

interface ISortedFilters extends SelectedFilters {
  onClickShowFilter: (event: React.MouseEvent) => void;
  onClickSwitcher: (string: string) => void;
  swichedView: string;
  itemsCount: number;
}

export function SortedFilters({
  onClickShowFilter,
  onClickSwitcher,
  swichedView,
  itemsCount,
  selectedColors,
  selectedCollections,
  selectedPrice,
  selectedSize,
  selectedStock,
  selectedCategory,
  setSelectedColors,
  setSelectedCollections,
  setSelectedPrice,
  setSelectedSize,
  setSelectedStock,
  setSelectedCategory,
}: ISortedFilters) {
  function switcherView(view: string) {
    view === 'line' ? onClickSwitcher('line') : onClickSwitcher('block');
  }

  const queryParams = new URLSearchParams(location.search);

  return (
    <>
      {queryParams.size ? (
        <BreadCrumdPanel
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          selectedCollections={selectedCollections}
          setSelectedCollections={setSelectedCollections}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStock={selectedStock}
          setSelectedStock={setSelectedStock}
        />
      ) : (
        ''
      )}
      <div className="main-center-section__sorted sorted-filters">
        <div className="sorted-filters__filters-menu filters-menu">
          <div onClick={onClickShowFilter} className="filters-menu__icon"></div>
          <div className="filters-menu__title">Show filters</div>
        </div>
        <div className="sorted-filters__item-count">{itemsCount} items</div>
        <div className="sorted-filters__select">
          <select className="filters-select">
            {SORT_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="sorted-filters__select">
          <div className="pagination__select">
            <select className="pagination-select">
              {ITEMS_IN_PAGE.map((value) => (
                <option key={value} value={value}>
                  Show items: {value}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="sorted-filters__switch-view switch-view">
          <div
            className={`switch-view__line ${swichedView === 'line' ? 'switch-active' : ''} `}
            onClick={() => switcherView('line')}
          ></div>
          <div
            className={`switch-view__block ${swichedView === 'block' ? 'switch-active' : ''} `}
            onClick={() => switcherView('block')}
          ></div>
        </div>
      </div>
    </>
  );
}
