import './TopMainPanel.scss';
import { useState, useEffect } from 'react';
import { BreadCrumdPanel } from './BreadCrumdPanel';
import { ITEMS_IN_PAGE, SORT_OPTIONS } from '@/components/helpers/constant';
import { useMyFiltersContext } from '@/components/Context/FiltersContext';
import { useMyURLContext } from '@/components/Context/URLContext';
import { ISelect } from '@/components/types/types';
import { CustomSelect } from '@/components/Select/Select';

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
    perMainPageOption,
    setPerMainPageOption,
  } = useMyURLContext();
  const [selectedPagination, setSelectedPagination] = useState<ISelect | null>(null);

  useEffect(() => {
    setSelectedPagination(perMainPageOption);
  }, [perMainPageOption]);

  function switcherView(view: string) {
    view === 'line' ? onClickSwitcher('line') : onClickSwitcher('block');
  }

  function handleChangeSort(selectedOption: ISelect | null) {
    setSortindViewOption(selectedOption!);
  }

  function handleChangePagination(selectedOption: ISelect | null) {
    setPerMainPageOption(selectedOption!);
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
          <CustomSelect
            selectedItem={sortindViewOption}
            handleChange={handleChangeSort}
            options={SORT_OPTIONS}
          />
        </div>
        <div className="sorted-filters__select">
          <div className="pagination__select">
            <CustomSelect
              selectedItem={selectedPagination}
              handleChange={handleChangePagination}
              options={ITEMS_IN_PAGE}
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
