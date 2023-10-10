import './TopMainPanel.scss';
import { useState, useEffect } from 'react';
import { BreadCrumdPanel } from './BreadCrumdPanel';
import { ITEMS_IN_PAGE, SORT_OPTIONS } from '@/components/helpers/constant';
import { useMyFiltersContext } from '@/components/Context/FiltersContext';
import { useMyURLContext } from '@/components/Context/URLContext';
import Select from 'react-select';
import { ISelect } from '@/components/types/types';
import { customStyles, customTheme } from './selectCustomStyles';

interface ISortedFilters {
  onClickShowFilter: (event: React.MouseEvent) => void;
  onClickSwitcher: (string: string) => void;
  swichedView: string;
}

export function SortedSelect({ onClickShowFilter, onClickSwitcher, swichedView }: ISortedFilters) {
  const { itemsCount } = useMyFiltersContext();
  const {
    isEmptyFilters,
    sortindViewOption,
    setSortindViewOption,
    perPageOption,
    setPerPageOption,
  } = useMyURLContext();
  const [selectedPagination, setSelectedPagination] = useState<ISelect | null>(null);

  useEffect(() => {
    setSelectedPagination(perPageOption);
  }, [perPageOption]);

  function switcherView(view: string) {
    view === 'line' ? onClickSwitcher('line') : onClickSwitcher('block');
  }

  function handleChangeSort(selectedOption: ISelect | null) {
    setSortindViewOption(selectedOption!);
  }

  function handleChangePagination(selectedOption: ISelect | null) {
    setPerPageOption(selectedOption!);
  }

  return (
    <>
      {isEmptyFilters ? <BreadCrumdPanel /> : ''}
      <div className="main-center-section__sorted sorted-filters">
        <div className="sorted-filters__filters-menu filters-menu">
          <div onClick={onClickShowFilter} className="filters-menu__icon"></div>
          <div className="filters-menu__title">Show filters</div>
        </div>
        <div className="sorted-filters__item-count">{itemsCount} items</div>
        <div className="sorted-filters__select">
          <Select
            className="filters-select"
            value={sortindViewOption}
            defaultValue={sortindViewOption}
            onChange={handleChangeSort}
            options={SORT_OPTIONS}
            styles={customStyles}
            theme={customTheme}
          />
        </div>
        <div className="sorted-filters__select">
          <div className="pagination__select">
            <Select
              className="pagination-select"
              value={selectedPagination}
              onChange={handleChangePagination}
              options={ITEMS_IN_PAGE}
              styles={customStyles}
              theme={customTheme}
            />
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
