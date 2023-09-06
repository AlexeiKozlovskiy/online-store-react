import './SideFilter.scss';
import { useState } from 'react';
import ReactSlider from 'react-slider';

const PRICE_MIN = 1.99;
const PRICE_MAX = 31.99;

const SIZE_MIN = 1;
const SIZE_MAX = 700;

const STOCK_MIN = 1;
const STOCK_MAX = 50;

const COLORS = ['black', 'silver', 'white', 'yellow', 'green', 'pink', 'red', 'purple', 'blue', 'brown'];
const COLLECTIONS = ['2021', '2022', '2023'];

const CATEGORIES = [
  { category: 'Tree decorations', products: 32 },
  { category: 'Garland & Wreath', products: 9 },
  { category: 'Do It Yourself', products: 4 },
  { category: 'Christmas decorations', products: 12 },
  { category: 'Christmas lights', products: 3 },
];

type setStateType = {
  (values: [number | null, number | null]): void;
};

export function SideFilter() {
  const [selectedColors, setSelectedColors] = useState<String[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<String[]>([]);
  const [[valMinPrice, valMaxPrice], setValuesPrice] = useState<any[]>([PRICE_MIN, PRICE_MAX]);
  const [[valMinSize, valMaxSize], setValuesSize] = useState<any[]>([SIZE_MIN, SIZE_MAX]);
  const [[valMinStock, valMaxStock], setValuesStock] = useState<any[]>([STOCK_MIN, STOCK_MAX]);

  function handleColorClick(color: string) {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((el) => el !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  }

  function handleCollectionClick(collection: string) {
    if (selectedCollections.includes(collection)) {
      setSelectedCollections(selectedCollections.filter((el) => el !== collection));
    } else {
      setSelectedCollections([...selectedCollections, collection]);
    }
  }

  function handleInputChange(startValue: string, endValue: string, setState: setStateType) {
    setState([parseFloat(startValue) || null, parseFloat(endValue) || null]);
  }

  return (
    <div className="filters">
      <div className="filters__item filters-item">
        <div className="filters-item__title">Color</div>
        <div className="filters-item__content item-content">
          <div className="item-content__colors colors">
            {COLORS?.map((color) => (
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
            {COLLECTIONS?.map((collection) => (
              <div
                key={collection}
                className={`collection__year ${
                  selectedCollections.includes(collection) ? 'is-selected' : ''
                }`}
                data-collection={collection}
                onClick={() => handleCollectionClick(collection)}
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
              onChange={(e) => handleInputChange(e.target.value, valMaxPrice, setValuesPrice)}
            />
            <span className="item-content-position__start">$</span>
            <input
              type="text"
              className="box-end"
              value={valMaxPrice || ''}
              maxLength={4}
              onChange={(e) => handleInputChange(valMinPrice, e.target.value, setValuesPrice)}
            />
            <span className="item-content-position__end">$</span>
          </div>
          <ReactSlider
            className="slider"
            onChange={setValuesPrice}
            value={[valMinPrice, valMaxPrice]}
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
              onChange={(e) => handleInputChange(e.target.value, valMaxSize, setValuesSize)}
            />
            <span className="item-content-position__start">cm</span>
            <input
              type="text"
              value={valMaxSize || ''}
              className="box-end"
              maxLength={3}
              onChange={(e) => handleInputChange(valMinSize, e.target.value, setValuesSize)}
            />
            <span className="item-content-position__end">cm</span>
          </div>
          <ReactSlider
            className="slider"
            onChange={setValuesSize}
            value={[valMinSize, valMaxSize]}
            min={SIZE_MIN}
            max={SIZE_MAX}
          />
        </div>
      </div>
      <div className="filters__item filters-item">
        <div className="filters-item__title">Category</div>
        <div className="filters-item__content item-content">
          {CATEGORIES?.map(({ category: categoryName, products }) => {
            const id = categoryName.toLowerCase().replace(' ', '-');
            return (
              <div key={id} className="item-content__category category">
                <label htmlFor={id} className="category__label">
                  {categoryName}
                </label>
                <div className="category__count">({products})</div>
                <input
                  id={id}
                  type="checkbox"
                  className="category__checkbox"
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
              onChange={(e) => handleInputChange(e.target.value, valMaxStock, setValuesStock)}
            />
            <input
              type="text"
              value={valMaxStock || ''}
              className="box-end"
              maxLength={2}
              onChange={(e) => handleInputChange(valMinStock, e.target.value, setValuesStock)}
            />
          </div>
          <ReactSlider
            className="slider"
            onChange={setValuesStock}
            value={[valMinStock, valMaxStock]}
            min={STOCK_MIN}
            max={STOCK_MAX}
          />
        </div>
      </div>
      <div className="filters__close-btn"></div>
    </div>
  );
}
