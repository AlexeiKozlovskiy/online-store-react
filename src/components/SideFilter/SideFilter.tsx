import './SideFilter.scss';
import Slider from 'react-slider';
import { useEffect, useState } from 'react';
import { PRICE_MIN, PRICE_MAX, SIZE_MIN, SIZE_MAX, STOCK_MIN, STOCK_MAX } from '@/helpers/constant';
import { SelectedFilter } from '@/types/types';
import { useMyFiltersContext } from '@/context/FiltersContext';
import { useMyURLContext } from '@/context/URLContext';
import { ButtonCross } from '@/components/ButtonCross/ButtonCross';
import { Client, Server } from 'react-hydration-provider';
import { DualRangeInput } from './DualRangeInput';

interface ISideFilter {
  showFilters: boolean;
  onClickHideFilter: (event: React.MouseEvent<Element, MouseEvent>) => void;
  handleClickFilters: (value: boolean) => void;
}

export function SideFilter({ showFilters, onClickHideFilter, handleClickFilters }: ISideFilter) {
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
    handleClickFilters(true);
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
    handleClickFilters(true);
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
    handleClickFilters(true);
    setSelectedFilters({
      ...selectedFilters,
      [selectedType]: value,
    });
    setFilter(value);
  };

  function categoryHandelChange(category: string) {
    handleClickFilters(true);
    const updatedCategories = [...categorySelected];
    const index = [...categorySelected].indexOf(category);
    index !== -1 ? updatedCategories.splice(index, 1) : updatedCategories.push(category);
    setSelectedFilters({
      ...selectedFilters,
      categorySelected: updatedCategories,
    });
  }

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
            <Client>
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
            </Client>
            <Server>
              <DualRangeInput defaultValue={PRICE_MIN} unit={'$'} unitPosition={'start'} />
              <DualRangeInput defaultValue={PRICE_MAX} unit={'$'} unitPosition={'end'} />
            </Server>
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
            <Client>
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
            </Client>
            <Server>
              <DualRangeInput defaultValue={SIZE_MIN} unit={'cm'} unitPosition={'start'} />
              <DualRangeInput defaultValue={SIZE_MAX} unit={'cm'} unitPosition={'end'} />
            </Server>
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
            <Client>
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
            </Client>
            <Server>
              <DualRangeInput defaultValue={STOCK_MIN} unit={''} unitPosition={''} />
              <DualRangeInput defaultValue={STOCK_MAX} unit={''} unitPosition={''} />
            </Server>
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
