import './TopMainPanel.scss';
import { useEffect, useState } from 'react';
import { BreadCrumdPanel } from './BreadCrumdPanel';
import { ITEMS_IN_PAGE, SORT_OPTIONS } from '@/helpers/constant';
import { useMyFiltersContext } from '@/context/FiltersContext';
import { useMyURLContext } from '@/context/URLContext';
import { ISelect } from '@/types/types';
import { CustomSelect } from '@/components/Select/Select';
import { ServerSelect } from '../Select/ServerSelect';
import { Server, Client } from 'react-hydration-provider';

interface ISortedFilters {
  onClickShowFilter: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

export function SortedSelect({ onClickShowFilter }: ISortedFilters) {
  const { itemsCount } = useMyFiltersContext();
  const {
    isEmptyFilters,
    sortindViewOption,
    setSortindViewOption,
    perMainPageOption,
    setPerMainPageOption,
    swichedView,
    setSwichedView,
  } = useMyURLContext();
  const [selectedPagination, setSelectedPagination] = useState<ISelect | null>(null);

  useEffect(() => {
    setSelectedPagination(perMainPageOption);
  }, [perMainPageOption]);

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
    <>
      {!isEmptyFilters && <BreadCrumdPanel />}
      <div className="main-center-section__sorted sorted-filters">
        <div className="sorted-filters__filters-menu filters-menu">
          <div onClick={onClickShowFilter} className="filters-menu__icon"></div>
          <div className="filters-menu__title">Show filters</div>
        </div>
        <div className="sorted-filters__item-count">{itemsCount} items</div>
        <div className="sorted-filters__select">
          <Client>
            <CustomSelect
              selectedItem={sortindViewOption}
              handleChange={handleChangeSort}
              options={SORT_OPTIONS}
            />
          </Client>
          <Server>
            <ServerSelect selectedItem={sortindViewOption.label} />
          </Server>
        </div>
        <div className="sorted-filters__select">
          <div className="pagination__select">
            <Client>
              <CustomSelect
                selectedItem={selectedPagination}
                handleChange={handleChangePagination}
                options={ITEMS_IN_PAGE}
              />
            </Client>
            <Server>
              <ServerSelect selectedItem={perMainPageOption.label} />
            </Server>
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
    </>
  );
}
