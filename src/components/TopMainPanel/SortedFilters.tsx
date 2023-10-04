import './TopMainPanel.scss';
import { useState } from 'react';
import { BreadCrumdPanel } from './BreadCrumdPanel';
import { ITEMS_IN_PAGE, SORT_OPTIONS } from '@/components/helpers/constant';
import { useMyFiltersContext } from '@/components/Context/FiltersContext';
import Select from 'react-select';
import { ISelect } from '@/components/types/types';
import { customStyles, customTheme } from './selectCustomStyles';

interface ISortedFilters {
  onClickShowFilter: (event: React.MouseEvent) => void;
  onClickSwitcher: (string: string) => void;
  swichedView: string;
}

export function SortedFilters({ onClickShowFilter, onClickSwitcher, swichedView }: ISortedFilters) {
  const { isEmptyFilters, itemsCount, setSortindViewOption } = useMyFiltersContext();
  const [, setSelectedPagination] = useState<ISelect | null>(null);

  function switcherView(view: string) {
    view === 'line' ? onClickSwitcher('line') : onClickSwitcher('block');
  }

  function handleChange(selectedOption: ISelect | null) {
    setSortindViewOption(selectedOption!);
  }

  function handleChangePagination(selectedOption: ISelect | null) {
    setSelectedPagination(selectedOption);
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
            defaultValue={SORT_OPTIONS[0]}
            onChange={handleChange}
            options={SORT_OPTIONS}
            styles={customStyles}
            theme={customTheme}
          />
        </div>
        <div className="sorted-filters__select">
          <div className="pagination__select">
            <Select
              className="pagination-select"
              defaultValue={ITEMS_IN_PAGE[3]}
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
