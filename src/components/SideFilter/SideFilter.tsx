import './SideFilter.scss';
import ReactSlider from 'react-slider';
import {
  PRICE_MIN,
  PRICE_MAX,
  SIZE_MIN,
  SIZE_MAX,
  STOCK_MIN,
  STOCK_MAX,
} from '@/components/helpers/constant';
import { SelectedFilter } from '@/components/types/types';
import { useMyFiltersContext } from '@/components/Context/FiltersContext';
import { useMyURLContext } from '@/components/Context/URLContext';

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

  const { balancerCategory, balancerCollection, balancerColor } = useMyFiltersContext();
  const [valMinPrice, valMaxPrice] = selectedPrice;
  const [valMinSize, valMaxSize] = selectedSize;
  const [valMinStock, valMaxStock] = selectedStock;

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
                  selectedColors.includes(color) ? 'is-selected' : ''
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
                  selectedCollections.includes(collection) ? 'is-selected' : ''
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
              value={valMinPrice || ''}
              maxLength={4}
              onChange={(e) =>
                handleInputChange(e.target.value, valMaxPrice!.toString(), setSelectedPrice)
              }
            />
            <span className="item-content-position__start">$</span>
            <input
              type="text"
              className="box-end"
              value={valMaxPrice || ''}
              maxLength={4}
              onChange={(e) =>
                handleInputChange(valMinPrice!.toString(), e.target.value, setSelectedPrice)
              }
            />
            <span className="item-content-position__end">$</span>
          </div>
          <ReactSlider
            className="slider"
            onAfterChange={(value: [number, number]) => setSelectedPrice(value)}
            value={[valMinPrice!, valMaxPrice!]}
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
              value={valMinSize || ''}
              className="box-start"
              maxLength={3}
              onChange={(e) =>
                handleInputChange(e.target.value, valMaxSize!.toString(), setSelectedSize)
              }
            />
            <span className="item-content-position__start">cm</span>
            <input
              type="text"
              value={valMaxSize || ''}
              className="box-end"
              maxLength={3}
              onChange={(e) =>
                handleInputChange(valMinSize!.toString(), e.target.value, setSelectedSize)
              }
            />
            <span className="item-content-position__end">cm</span>
          </div>
          <ReactSlider
            className="slider"
            onAfterChange={(value: [number, number]) => setSelectedSize(value)}
            value={[valMinSize!, valMaxSize!]}
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
              value={valMinStock || ''}
              className="box-start"
              maxLength={2}
              onChange={(e) =>
                handleInputChange(e.target.value, valMaxStock!.toString(), setSelectedStock)
              }
            />
            <input
              type="text"
              value={valMaxStock || ''}
              className="box-end"
              maxLength={2}
              onChange={(e) =>
                handleInputChange(valMinStock!.toString(), e.target.value, setSelectedStock)
              }
            />
          </div>
          <ReactSlider
            className="slider"
            onAfterChange={(value: [number, number]) => setSelectedStock(value)}
            value={[valMinStock!, valMaxStock!]}
            min={STOCK_MIN}
            max={STOCK_MAX}
          />
        </div>
      </div>
      <div className="filters__close-btn" onClick={onClickHideFilter}></div>
    </div>
  );
}
