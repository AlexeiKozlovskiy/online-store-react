import './TopMainPanel.scss';
import { SelectedFilters } from '@/components/types/types';
import { BreadCrumdPanel } from './BreadCrumdPanel';
import { useEffect, useState } from 'react';
import {
  PRICE_MIN,
  PRICE_MAX,
  SIZE_MIN,
  SIZE_MAX,
  STOCK_MIN,
  STOCK_MAX,
  ITEMS_IN_PAGE,
  SORT_OPTIONS,
} from '@/components/helpers/constant';

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
  const [emptyFilters, setEmptyFilters] = useState(true);
  function switcherView(view: string) {
    view === 'line' ? onClickSwitcher('line') : onClickSwitcher('block');
  }
  const [valMinPrice, valMaxPrice] = selectedPrice;
  const [valMinSize, valMaxSize] = selectedSize;
  const [valMinStock, valMaxStock] = selectedStock;

  useEffect(() => {
    function checkSelectedFilters() {
      if (
        !selectedColors.length &&
        !selectedCollections.length &&
        valMinPrice === PRICE_MIN &&
        valMaxPrice === PRICE_MAX &&
        valMinSize === SIZE_MIN &&
        valMaxSize === SIZE_MAX &&
        valMinStock === STOCK_MIN &&
        valMaxStock === STOCK_MAX &&
        !selectedCategory.length
      ) {
        setEmptyFilters(false);
      } else {
        setEmptyFilters(true);
      }
    }
    checkSelectedFilters();
  }, [
    selectedColors,
    selectedCollections,
    selectedCategory,
    selectedPrice,
    selectedSize,
    selectedStock,
  ]);

  return (
    <>
      {emptyFilters ? (
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
