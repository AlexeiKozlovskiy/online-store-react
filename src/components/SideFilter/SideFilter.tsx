import './SideFilter.scss';
import Slider from 'react-slider';
import { useEffect, useState } from 'react';
import { PRICE_MIN, PRICE_MAX, SIZE_MIN, SIZE_MAX, STOCK_MIN, STOCK_MAX } from '@/helpers/constant';
import { Balancers, DualRange, RootReducerProps, SelectedFilter } from '@/types/types';
import { useMyURLContext } from '@/context/URLContext';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';
import { DualRangeInput } from './DualRangeInput';
import { useSelector } from 'react-redux';

interface ISideFilter {
  showFilters: boolean;
  onClickHideFilter: (event: React.MouseEvent<Element, MouseEvent>) => void;
  handleClickFilters: (value: boolean) => void;
}

export function SideFilter({ showFilters, onClickHideFilter, handleClickFilters }: ISideFilter) {
  const { selectedFilters, setSelectedFilters } = useMyURLContext();
  const [[priseMin, priseMax], setPrice] = useState<DualRange>([null, null]);
  const [[sizeMin, sizeMax], setSize] = useState<DualRange>([null, null]);
  const [[stockMin, stockMax], setStock] = useState<DualRange>([null, null]);
  const {
    balancerColor,
    balancerCollection,
    balancerCategory,
    balancerPrise,
    balancerSize,
    balancerStock,
  } = useSelector<RootReducerProps, Balancers>((state) => state.balansersFilters);

  const {
    colorsSelected,
    collectionsSelected,
    categorySelected,
    priceSelected,
    sizeSelected,
    stockSelected,
  } = selectedFilters;

  const [balancedMinPrice, balancedMaxPrice] = balancerPrise;
  const [balancedMinSize, balancedMaxSize] = balancerSize;
  const [balancedMinStock, balancedMaxStock] = balancerStock;
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

  const handleColorClick = (color: string) => {
    handleClickFilters(true);
    const updatedColors = colorsSelected.includes(color)
      ? colorsSelected.filter((el) => el !== color)
      : [...colorsSelected, color];
    setSelectedFilters({ ...selectedFilters, colorsSelected: updatedColors });
  };

  const handleCollectionClick = (collection: string) => {
    handleClickFilters(true);
    const updatedCollections = collectionsSelected.includes(+collection)
      ? collectionsSelected.filter((el) => el !== +collection)
      : [...collectionsSelected, +collection];
    setSelectedFilters({ ...selectedFilters, collectionsSelected: updatedCollections });
  };

  const handelCategoryChange = (category: string) => {
    handleClickFilters(true);
    const updatedCategories = categorySelected.includes(category)
      ? selectedFilters.categorySelected.filter((el) => el !== category)
      : [...selectedFilters.categorySelected, category];
    setSelectedFilters({ ...selectedFilters, categorySelected: updatedCategories });
  };

  function handleInputChange(selectedType: string, startValue: string, endValue: string) {
    setSelectedFilters({
      ...selectedFilters,
      [selectedType]: [parseFloat(startValue) || null, parseFloat(endValue) || null],
    });
  }

  const handleSliderChange = (type: string, value: DualRange, setFilter: SelectedFilter) => {
    handleClickFilters(true);
    setSelectedFilters({ ...selectedFilters, [type]: value });
    setFilter(value);
  };

  return (
    <div className="filters" data-show={showFilters} data-testid="filterPanel">
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
                data-testid={`button-color-${color}`}
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
            <DualRangeInput
              value={priseMin || ''}
              unit={'$'}
              unitPosition={'start'}
              onChange={(e: { target: { value: string } }) =>
                handleInputChange('priceSelected', e.target.value, priseMax!.toString())
              }
            />
            <DualRangeInput
              value={priseMax || ''}
              unit={'$'}
              unitPosition={'end'}
              onChange={(e: { target: { value: string } }) =>
                handleInputChange('priceSelected', priseMin!.toString(), e.target.value)
              }
            />
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
            <DualRangeInput
              value={sizeMin || ''}
              unit={'cm'}
              unitPosition={'start'}
              onChange={(e) =>
                handleInputChange('sizeSelected', e.target.value, sizeMax!.toString())
              }
            />
            <DualRangeInput
              value={sizeMax || ''}
              unit={'cm'}
              unitPosition={'end'}
              onChange={(e: { target: { value: string } }) =>
                handleInputChange('sizeSelected', sizeMin!.toString(), e.target.value)
              }
            />
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
                  onChange={() => handelCategoryChange(categoryName)}
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
            <DualRangeInput
              value={stockMin || ''}
              unit={''}
              unitPosition={''}
              onChange={(e: { target: { value: string } }) =>
                handleInputChange('stockSelected', e.target.value, stockMax!.toString())
              }
            />
            <DualRangeInput
              value={stockMax || ''}
              unit={''}
              unitPosition={''}
              onChange={(e: { target: { value: string } }) =>
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
