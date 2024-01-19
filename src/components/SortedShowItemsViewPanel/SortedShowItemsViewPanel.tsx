import './SortedShowItemsViewPanel.scss';
import { ITEMS_IN_PAGE, SORT_OPTIONS } from '@/helpers/constant';
import { useMyFiltersContext } from '@/context/FiltersContext';
import { useMyURLContext } from '@/context/URLContext';
import { ISelect } from '@/types/types';
import { CustomSelect } from '@/components/Select/Select';

interface ISortedShowItemsViewPanel {
  onClickShowFilter: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

export function SortedShowItemsViewPanel({ onClickShowFilter }: ISortedShowItemsViewPanel) {
  const { itemsCount } = useMyFiltersContext();
  const {
    sortindViewOption,
    setSortindViewOption,
    perMainPageOption,
    setPerMainPageOption,
    swichedView,
    setSwichedView,
  } = useMyURLContext();

  function switcherView(view: string) {
    view === 'row' ? setSwichedView(view) : setSwichedView(view);
  }

  function handleChangeSort(selectedOption: ISelect | null) {
    setSortindViewOption(selectedOption!);
  }

  function handleChangePagination(selectedOption: ISelect | null) {
    setPerMainPageOption(selectedOption!);
  }

  return (
    <div className="main-center-section__sorted sorted-filters">
      <div className="sorted-filters__filters-menu filters-menu">
        <div
          className="filters-menu__icon"
          onClick={onClickShowFilter}
          data-testid="showFilterButton"
        ></div>
        <div className="filters-menu__title">Show filters</div>
      </div>
      <div className="sorted-filters__item-count">{itemsCount} items</div>
      <div className="sorted-filters__select">
        <CustomSelect
          selectedItem={sortindViewOption}
          handleChange={handleChangeSort}
          options={SORT_OPTIONS}
        />
      </div>
      <div className="sorted-filters__select">
        <div className="pagination__select">
          <CustomSelect
            selectedItem={perMainPageOption}
            handleChange={handleChangePagination}
            options={ITEMS_IN_PAGE}
          />
        </div>
      </div>
      <div className="sorted-filters__switch-view switch-view">
        <div
          className={`switch-view__line ${swichedView === 'row' && 'switch-active'} `}
          onClick={() => switcherView('row')}
        ></div>
        <div
          className={`switch-view__block ${swichedView === 'block' && 'switch-active'} `}
          onClick={() => switcherView('block')}
        ></div>
      </div>
    </div>
  );
}
