import './TopMainPanel.scss';
import { useEffect, useState } from 'react';
import { SelectedFilters } from '@/components/types/types';
import {
  PRICE_MIN,
  PRICE_MAX,
  SIZE_MIN,
  SIZE_MAX,
  STOCK_MIN,
  STOCK_MAX,
} from '@/components/helpers/constant';
import { useMyHeaderClickContext } from '../Context/ContextHeaderLogoClick';

export function BreadCrumdPanel({
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
}: SelectedFilters) {
  const [copedLink, setCopedLink] = useState(false);
  const { clickHeaderLogo } = useMyHeaderClickContext();

  const [valMinPrice, valMaxPrice] = selectedPrice;
  const [valMinSize, valMaxSize] = selectedSize;
  const [valMinStock, valMaxStock] = selectedStock;

  useEffect(() => {
    if (clickHeaderLogo) {
      handelClearAllButton();
    }
  }, [clickHeaderLogo]);

  function handelRemoveItemClick(e: React.MouseEvent<HTMLElement>) {
    const { dataset } = e.target as HTMLElement;
    switch (dataset.params) {
      case 'colors':
        setSelectedColors(selectedColors.filter((el) => el !== dataset.value));
        break;
      case 'collections':
        setSelectedCollections(selectedCollections.filter((el) => el !== Number(dataset.value)));
        break;
      case 'categories':
        setSelectedCategory(selectedCategory.filter((el) => el !== dataset.value));
        break;
      case 'price':
        setSelectedPrice([PRICE_MIN, PRICE_MAX]);
        break;
      case 'size':
        setSelectedSize([SIZE_MIN, SIZE_MAX]);
        break;
      case 'stock':
        setSelectedStock([STOCK_MIN, STOCK_MAX]);
        break;
    }
  }

  function handelClearAllButton() {
    setSelectedColors([]);
    setSelectedCollections([]);
    setSelectedCategory([]);
    setSelectedPrice([PRICE_MIN, PRICE_MAX]);
    setSelectedSize([SIZE_MIN, SIZE_MAX]);
    setSelectedStock([STOCK_MIN, STOCK_MAX]);
  }

  function handelCopyLink() {
    setCopedLink(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => {
      setCopedLink(false);
    }, 1000);
  }
  const colorFilter = selectedColors?.map((color) => {
    return (
      <div key={color} className="selected-filters__item selected-item">
        <div className="selected-item__name">{color}</div>
        <div
          className="selected-item__remove-btn"
          data-params="colors"
          data-value={color}
          onClick={handelRemoveItemClick}
        ></div>
      </div>
    );
  });

  const collectionFilter = selectedCollections?.map((collection) => {
    return (
      <div key={collection} className="selected-filters__item selected-item">
        <div className="selected-item__name">{collection}</div>
        <div
          className="selected-item__remove-btn"
          data-params="collections"
          data-value={collection}
          onClick={handelRemoveItemClick}
        ></div>
      </div>
    );
  });
  const categoryFilter = selectedCategory?.map((category) => {
    return (
      <div key={category} className="selected-filters__item selected-item">
        <div className="selected-item__name">{category}</div>
        <div
          className="selected-item__remove-btn"
          data-params="categories"
          data-value={category}
          onClick={handelRemoveItemClick}
        ></div>
      </div>
    );
  });

  const priceFilter = () => {
    if (valMinPrice !== PRICE_MIN || valMaxPrice !== PRICE_MAX) {
      return (
        <div key={valMinPrice} className="selected-filters__item selected-item">
          <div className="selected-item__name">
            Price: ${valMinPrice} - ${valMaxPrice}
          </div>
          <div
            className="selected-item__remove-btn"
            data-params="price"
            onClick={handelRemoveItemClick}
          ></div>
        </div>
      );
    }
  };
  const sizeFilter = () => {
    if (valMinSize !== SIZE_MIN || valMaxSize !== SIZE_MAX) {
      return (
        <div key={valMinSize} className="selected-filters__item selected-item">
          <div className="selected-item__name">
            Size: {valMinSize}cm - {valMaxSize}cm
          </div>
          <div
            className="selected-item__remove-btn"
            data-params="size"
            onClick={handelRemoveItemClick}
          ></div>
        </div>
      );
    }
  };

  const stockFilter = () => {
    if (valMinStock !== STOCK_MIN || valMaxStock !== STOCK_MAX) {
      return (
        <div key={valMinStock} className="selected-filters__item selected-item">
          <div className="selected-item__name">
            Stock: {valMinStock} - {valMaxStock}
          </div>
          <div
            className="selected-item__remove-btn"
            data-params="stock"
            onClick={handelRemoveItemClick}
          ></div>
        </div>
      );
    }
  };

  const selectedFilters = [
    colorFilter,
    collectionFilter,
    categoryFilter,
    priceFilter(),
    sizeFilter(),
    stockFilter(),
  ];

  const copied = <div className="selected-filters__copy-link">Copied</div>;
  const copyLink = (
    <div className="selected-filters__copy-link" onClick={handelCopyLink}>
      Copy link
    </div>
  );
  return (
    <div className="selected-section__filters selected-filters">
      <div className="selected-filters__title">Selected filters:</div>
      {selectedFilters}
      <div className="selected-filters__remove-filters" onClick={handelClearAllButton}>
        Clear all
      </div>
      {copedLink ? copied : copyLink}
    </div>
  );
}
