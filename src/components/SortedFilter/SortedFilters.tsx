import './SortedFilters.scss';

interface ISortedFilters {
  onClickShowFilter: (event: React.MouseEvent) => void;
}

export function SortedFilters({ onClickShowFilter }: ISortedFilters) {
  const sortOptions = [
    'Recommended',
    'Name',
    'Price ascending',
    'Price descending',
    'Stock ascending',
    'Stock descending',
  ];

  const itemsInPage = [5, 10, 20, 30, 0];

  return (
    <div className="main-center-section__sorted sorted-filters">
      <div className="sorted-filters__filters-menu filters-menu">
        <div onClick={onClickShowFilter} className="filters-menu__icon"></div>
        <div className="filters-menu__title">Show filters</div>
      </div>
      <div className="sorted-filters__item-count">60 items</div>
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
        <div className="switch-view__line"></div>
        <div className="switch-view__block switch-active"></div>
      </div>
    </div>
  );
}
