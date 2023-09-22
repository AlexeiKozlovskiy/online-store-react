import './SortedFilters.scss';

const sortOptions = [
  'Recommended',
  'Name',
  'Price ascending',
  'Price descending',
  'Stock ascending',
  'Stock descending',
];

const itemsInPage = [5, 10, 20, 30, 0];

interface ISortedFilters {
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
}: ISortedFilters) {
  function switcherView(view: string) {
    view === 'line' ? onClickSwitcher('line') : onClickSwitcher('block');
  }

  return (
    <div className="main-center-section__sorted sorted-filters">
      <div className="sorted-filters__filters-menu filters-menu">
        <div onClick={onClickShowFilter} className="filters-menu__icon"></div>
        <div className="filters-menu__title">Show filters</div>
      </div>
      <div className="sorted-filters__item-count">{itemsCount} items</div>
      <div className="sorted-filters__select">
        <select className="filters-select">
          {sortOptions.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="sorted-filters__select">
        <div className="pagination__select">
          <select className="pagination-select">
            {itemsInPage.map((value) => (
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
  );
}
