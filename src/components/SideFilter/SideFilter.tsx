import './SideFilter.scss';
import Slider from 'react-slider';
import { useEffect, useLayoutEffect, useState } from 'react';
import { PRICE_MIN, PRICE_MAX, SIZE_MIN, SIZE_MAX, STOCK_MIN, STOCK_MAX } from '@/helpers/constant';
import { SelectedFilter } from '@/types/types';
import { useMyFiltersContext } from '@/context/FiltersContext';
import { useMyURLContext } from '@/context/URLContext';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';

interface ISideFilter {
  showFilters: boolean;
  onClickHideFilter: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

export function SideFilter({ showFilters, onClickHideFilter }: ISideFilter) {
  const { selectedFilters, setSelectedFilters } = useMyURLContext();
  const { balanserFilters } = useMyFiltersContext();
  const [[priseMin, priseMax], setPrice] = useState<[number | null, number | null]>([null, null]);
  const [[sizeMin, sizeMax], setSize] = useState<[number | null, number | null]>([null, null]);
  const [[stockMin, stockMax], setStock] = useState<[number | null, number | null]>([null, null]);

  const {
    colorsSelected,
    collectionsSelected,
    categorySelected,
    priceSelected,
    sizeSelected,
    stockSelected,
  } = selectedFilters;

  const {
    balancerColor,
    balancerCollection,
    balanserPrise,
    balanserSize,
    balancerCategory,
    balanserStock,
  } = balanserFilters;

  const [balancedMinPrice, balancedMaxPrice] = balanserPrise;
  const [balancedMinSize, balancedMaxSize] = balanserSize;
  const [balancedMinStock, balancedMaxStock] = balanserStock;
  const [selectedMinPrice, selectedMaxPrice] = priceSelected;
  const [selectedMinSize, selectedMaxSize] = sizeSelected;
  const [selectedMinStock, selectedMaxStock] = stockSelected;

  useEffect(() => {
    function getSelectedFilters() {
      setPrice([selectedMinPrice, selectedMaxPrice]);
      setSize([selectedMinSize, selectedMaxSize]);
      setStock([selectedMinStock, selectedMaxStock]);
    }
    getSelectedFilters();
  }, [
    selectedMinPrice,
    selectedMaxPrice,
    selectedMinSize,
    selectedMaxSize,
    selectedMinStock,
    selectedMaxStock,
  ]);

  useLayoutEffect(() => {
    function getBalancerFilters() {
      if (selectedMinPrice === PRICE_MIN && selectedMaxPrice === PRICE_MAX) {
        setPrice([balancedMinPrice, balancedMaxPrice]);
      }
      if (selectedMinSize === SIZE_MIN && selectedMaxSize === SIZE_MAX) {
        setSize([balancedMinSize, balancedMaxSize]);
      }
      if (selectedMinStock === STOCK_MIN && selectedMaxStock === STOCK_MAX) {
        setStock([balancedMinStock, balancedMaxStock]);
      }
    }
    getBalancerFilters();
  }, [
    balancedMinPrice,
    balancedMaxPrice,
    balancedMinSize,
    balancedMaxSize,
    balancedMinStock,
    balancedMaxStock,
  ]);

  function handleColorClick(color: string) {
    if (colorsSelected.includes(color)) {
      setSelectedFilters({
        ...selectedFilters,
        colorsSelected: colorsSelected.filter((el) => el !== color),
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        colorsSelected: [...colorsSelected, color],
      });
    }
  }

  function handleCollectionClick(collection: string) {
    if (collectionsSelected.includes(+collection)) {
      setSelectedFilters({
        ...selectedFilters,
        collectionsSelected: collectionsSelected.filter((el) => el !== +collection),
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        collectionsSelected: [...collectionsSelected, +collection],
      });
    }
  }
  function handleInputChange(selectedType: string, startValue: string, endValue: string) {
    setSelectedFilters({
      ...selectedFilters,
      [selectedType]: [parseFloat(startValue) || null, parseFloat(endValue) || null],
    });
  }

  const handleSliderChange = (
    selectedType: string,
    value: [number, number],
    setFilter: SelectedFilter
  ) => {
    setSelectedFilters({
      ...selectedFilters,
      [selectedType]: value,
    });
    setFilter(value);
  };

  function categoryHandelChange(category: string) {
    const updatedCategories = [...categorySelected];
    const index = [...categorySelected].indexOf(category);
    index !== -1 ? updatedCategories.splice(index, 1) : updatedCategories.push(category);
    setSelectedFilters({
      ...selectedFilters,
      categorySelected: updatedCategories,
    });
  }

  return (
    <div className="filters" data-show={showFilters}>
      <div className="filters__item filters-item">
        <div className="filters-item__title">Color</div>
        <div className="filters-item__content item-content">
          <div className="item-content__colors colors">
            {balancerColor.map(({ color }) => (
              <div
                key={color}
                className={`colors__color is-${color} ${
                  colorsSelected.includes(color) && 'is-selected'
                }`}
                data-color={color}
                onClick={() => handleColorClick(color)}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="filters__item filters-item">
        <div className="filters-item__title">Collection</div>
        <div className="filters-item__content item-content">
          <div className="item-content__collection collection">
            {balancerCollection.map(({ collection }) => (
              <div
                key={collection}
                className={`collection__year ${
                  collectionsSelected.includes(collection) && 'is-selected'
                }`}
                data-collection={collection}
                onClick={() => handleCollectionClick(collection.toString())}
              >
                {collection}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="filters__item filters-item">
        <div className="filters-item__title">Price</div>
        <div className="filters-item__content item-content">
          <div className="item-content__price price">
            <input
              type="text"
              className="box-start"
              value={priseMin || ''}
              maxLength={4}
              onChange={(e) =>
                handleInputChange('priceSelected', e.target.value, priseMax!.toString())
              }
            />
            <span className="item-content-position__start">$</span>
            <input
              type="text"
              className="box-end"
              value={priseMax || ''}
              maxLength={4}
              onChange={(e) =>
                handleInputChange('priceSelected', priseMin!.toString(), e.target.value)
              }
            />
            <span className="item-content-position__end">$</span>
          </div>
          <Slider
            className="slider"
            onAfterChange={(value: [number, number]) =>
              handleSliderChange('priceSelected', value, setPrice)
            }
            value={[priseMin!, priseMax!]}
            min={PRICE_MIN}
            max={PRICE_MAX}
          />
        </div>
      </div>
      <div className="filters__item filters-item">
        <div className="filters-item__title">Size</div>
        <div className="filters-item__content item-content">
          <div className="item-content__size size">
            <input
              type="text"
              value={sizeMin || ''}
              className="box-start"
              maxLength={3}
              onChange={(e) =>
                handleInputChange('sizeSelected', e.target.value, sizeMax!.toString())
              }
            />
            <span className="item-content-position__start">cm</span>
            <input
              type="text"
              value={sizeMax || ''}
              className="box-end"
              maxLength={3}
              onChange={(e) =>
                handleInputChange('sizeSelected', sizeMin!.toString(), e.target.value)
              }
            />
            <span className="item-content-position__end">cm</span>
          </div>
          <Slider
            className="slider"
            onAfterChange={(value: [number, number]) =>
              handleSliderChange('sizeSelected', value, setSize)
            }
            value={[sizeMin!, sizeMax!]}
            min={SIZE_MIN}
            max={SIZE_MAX}
          />
        </div>
      </div>
      <div className="filters__item filters-item">
        <div className="filters-item__title">Category</div>
        <div className="filters-item__content item-content">
          {balancerCategory.map(({ category: categoryName, count }) => {
            const id = categoryName.toLowerCase().replace(' ', '-');
            return (
              <div key={id} className="item-content__category category">
                <label htmlFor={id} className="category__label">
                  {categoryName}
                </label>
                <div className="category__count">({count})</div>
                <input
                  id={id}
                  type="checkbox"
                  checked={selectedFilters.categorySelected.includes(categoryName)}
                  className="category__checkbox"
                  onChange={() => categoryHandelChange(categoryName)}
                  data-categories={categoryName}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="filters__item filters-item">
        <div className="filters-item__title">In stock</div>
        <div className="filters-item__content item-content">
          <div className="item-content__stock stock">
            <input
              type="text"
              value={stockMin || ''}
              className="box-start"
              maxLength={2}
              onChange={(e) =>
                handleInputChange('stockSelected', e.target.value, stockMax!.toString())
              }
            />
            <input
              type="text"
              value={stockMax || ''}
              className="box-end"
              maxLength={2}
              onChange={(e) =>
                handleInputChange('stockSelected', stockMin!.toString(), e.target.value)
              }
            />
          </div>
          <Slider
            className="slider"
            onAfterChange={(value: [number, number]) =>
              handleSliderChange('stockSelected', value, setStock)
            }
            value={[stockMin!, stockMax!]}
            min={STOCK_MIN}
            max={STOCK_MAX}
          />
        </div>
      </div>
      <ButtonCross onClickCross={onClickHideFilter} adittionClassName="close-side-filters-cross" />
    </div>
  );
}
