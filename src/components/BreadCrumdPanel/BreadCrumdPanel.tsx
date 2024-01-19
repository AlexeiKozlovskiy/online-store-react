import './BreadCrumdPanel.scss';
import { memo, useState } from 'react';
import { PRICE_MIN, PRICE_MAX, SIZE_MIN, SIZE_MAX, STOCK_MIN, STOCK_MAX } from '@/helpers/constant';
import { useMyFiltersContext } from '@/context/FiltersContext';
import { useMyRemoveFiltSortContext } from '@/context/RemoveAllSelectedContext';
import { useMyURLContext } from '@/context/URLContext';

export const BreadCrumdPanel = memo(function BreadCrumdPanel() {
  const [copedLink, setCopedLink] = useState(false);
  const { removeAllSelected } = useMyRemoveFiltSortContext();
  const { removeItemFilterClick } = useMyFiltersContext();
  const { selectedFilters } = useMyURLContext();

  const {
    colorsSelected,
    collectionsSelected,
    categorySelected,
    priceSelected,
    sizeSelected,
    stockSelected,
  } = selectedFilters;

  const [minPrice, maxPrice] = priceSelected;
  const [minSize, maxSize] = sizeSelected;
  const [minStock, maxStock] = stockSelected;

  function handelCopyLink() {
    setCopedLink(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => {
      setCopedLink(false);
    }, 1000);
  }

  const colorFilter = colorsSelected.map((color) => {
    return (
      <div key={color} className="selected-filters__item selected-item">
        <div className="selected-item__name">{color}</div>
        <div
          className="selected-item__remove-btn"
          data-params="colors"
          data-value={color}
          onClick={removeItemFilterClick}
        ></div>
      </div>
    );
  });

  const collectionFilter = collectionsSelected.map((collection) => {
    return (
      <div key={collection} className="selected-filters__item selected-item">
        <div className="selected-item__name">{collection}</div>
        <div
          className="selected-item__remove-btn"
          data-params="collections"
          data-value={collection}
          onClick={removeItemFilterClick}
        ></div>
      </div>
    );
  });
  const categoryFilter = categorySelected.map((category) => {
    return (
      <div key={category} className="selected-filters__item selected-item">
        <div className="selected-item__name">{category}</div>
        <div
          className="selected-item__remove-btn"
          data-params="categories"
          data-value={category}
          onClick={removeItemFilterClick}
        ></div>
      </div>
    );
  });

  const priceFilter = () => {
    if (minPrice !== PRICE_MIN || maxPrice !== PRICE_MAX) {
      return (
        <div key={minPrice} className="selected-filters__item selected-item">
          <div className="selected-item__name">
            Price: ${minPrice} - ${maxPrice}
          </div>
          <div
            className="selected-item__remove-btn"
            data-params="price"
            onClick={removeItemFilterClick}
          ></div>
        </div>
      );
    }
  };

  const sizeFilter = () => {
    if (minSize !== SIZE_MIN || maxSize !== SIZE_MAX) {
      return (
        <div key={minSize} className="selected-filters__item selected-item">
          <div className="selected-item__name">
            Size: {minSize}cm - {maxSize}cm
          </div>
          <div
            className="selected-item__remove-btn"
            data-params="size"
            onClick={removeItemFilterClick}
          ></div>
        </div>
      );
    }
  };

  const stockFilter = () => {
    if (minStock !== STOCK_MIN || maxStock !== STOCK_MAX) {
      return (
        <div key={minStock} className="selected-filters__item selected-item">
          <div className="selected-item__name">
            Stock: {minStock} - {maxStock}
          </div>
          <div
            className="selected-item__remove-btn"
            data-params="stock"
            onClick={removeItemFilterClick}
          ></div>
        </div>
      );
    }
  };

  const allSelectedFilters = [
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
      {allSelectedFilters}
      <div className="selected-filters__remove-filters" onClick={removeAllSelected}>
        Clear all
      </div>
      {copedLink ? copied : copyLink}
    </div>
  );
});
