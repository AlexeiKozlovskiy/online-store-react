import { useEffect, useState } from 'react';

import './SideFilter.scss';
import Slider from 'react-slider';
import { PRICE_MIN, PRICE_MAX, SIZE_MIN, SIZE_MAX, STOCK_MIN, STOCK_MAX } from '@/helpers/constant';
import { SelectedFilter } from '@/types/types';
import { useMyFiltersContext } from '@/context/FiltersContext';
import { useMyURLContext } from '@/context/URLContext';

interface ISideFilter {
  showFilters: boolean;
  onClickHideFilter: (event: React.MouseEvent) => void;
}

export function SideFilter({ showFilters, onClickHideFilter }: ISideFilter) {
  const {
    selectedColors,
    selectedCollections,
    selectedCategory,
    selectedPrice,
    selectedSize,
    selectedStock,
    setSelectedColors,
    setSelectedCollections,
    setSelectedCategory,
    setSelectedPrice,
    setSelectedSize,
    setSelectedStock,
  } = useMyURLContext();

  const {
    balancerCategory,
    balancerCollection,
    balancerColor,
    balanserPrise,
    balanserSize,
    balanserStock,
  } = useMyFiltersContext();
  const [[priseMin, priseMax], setPrice] = useState<[number | null, number | null]>([null, null]);
  const [[sizeMin, sizeMax], setSize] = useState<[number | null, number | null]>([null, null]);
  const [[stockMin, stockMax], setStock] = useState<[number | null, number | null]>([null, null]);

  const [selectedMinPrice, selectedMaxPrice] = selectedPrice;
  const [balancedMinPrice, balancedMaxPrice] = balanserPrise;
  const [selectedMinSize, selectedMaxSize] = selectedSize;
  const [balancedMinSize, balancedMaxSize] = balanserSize;
  const [selectedMinStock, selectedMaxStock] = selectedStock;
  const [balancedMinStock, balancedMaxStock] = balanserStock;

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

  useEffect(() => {
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
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((el) => el !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  }

  function handleCollectionClick(collection: string) {
    if (selectedCollections.includes(+collection)) {
      setSelectedCollections(selectedCollections.filter((el) => el !== +collection));
    } else {
      setSelectedCollections([...selectedCollections, +collection]);
    }
  }

  function handleInputChange(startValue: string, endValue: string, setState: SelectedFilter) {
    setState([parseFloat(startValue) || null, parseFloat(endValue) || null]);
  }

  const handleSliderChange = (
    value: [number, number],
    setSelectedState: SelectedFilter,
    setFilter: SelectedFilter
  ) => {
    setSelectedState(value);
    setFilter(value);
  };

  function categoryHandelChange(category: string) {
    const updatedCategories = [...selectedCategory];
    const index = [...selectedCategory].indexOf(category);
    index !== -1 ? updatedCategories.splice(index, 1) : updatedCategories.push(category);
    setSelectedCategory(updatedCategories);
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
                  selectedColors.includes(color) && 'is-selected'
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
            {balancerCollection?.map(({ collection }) => (
              <div
                key={collection}
                className={`collection__year ${
                  selectedCollections.includes(collection) && 'is-selected'
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
                handleInputChange(e.target.value, priseMax!.toString(), setSelectedPrice)
              }
            />
            <span className="item-content-position__start">$</span>
            <input
              type="text"
              className="box-end"
              value={priseMax || ''}
              maxLength={4}
              onChange={(e) =>
                handleInputChange(priseMin!.toString(), e.target.value, setSelectedPrice)
              }
            />
            <span className="item-content-position__end">$</span>
          </div>
          <Slider
            className="slider"
            onAfterChange={(value: [number, number]) =>
              handleSliderChange(value, setSelectedPrice, setPrice)
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
                handleInputChange(e.target.value, sizeMax!.toString(), setSelectedSize)
              }
            />
            <span className="item-content-position__start">cm</span>
            <input
              type="text"
              value={sizeMax || ''}
              className="box-end"
              maxLength={3}
              onChange={(e) =>
                handleInputChange(sizeMin!.toString(), e.target.value, setSelectedSize)
              }
            />
            <span className="item-content-position__end">cm</span>
          </div>
          <Slider
            className="slider"
            onAfterChange={(value: [number, number]) =>
              handleSliderChange(value, setSelectedSize, setSize)
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
          {balancerCategory?.map(({ category: categoryName, count }) => {
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
                  checked={selectedCategory.includes(categoryName)}
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
                handleInputChange(e.target.value, stockMax!.toString(), setSelectedStock)
              }
            />
            <input
              type="text"
              value={stockMax || ''}
              className="box-end"
              maxLength={2}
              onChange={(e) =>
                handleInputChange(stockMin!.toString(), e.target.value, setSelectedStock)
              }
            />
          </div>
          <Slider
            className="slider"
            onAfterChange={(value: [number, number]) =>
              handleSliderChange(value, setSelectedStock, setStock)
            }
            value={[stockMin!, stockMax!]}
            min={STOCK_MIN}
            max={STOCK_MAX}
          />
        </div>
      </div>
      <div className="filters__close-btn" onClick={onClickHideFilter}></div>
    </div>
  );
}
