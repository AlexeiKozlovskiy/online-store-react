import { SetSelectedFilters } from '@/components/types/types';

interface SetFromURL extends SetSelectedFilters {
  setInputSearchValue: (value: string) => void;
}

export function setFromURL({
  setSelectedColors,
  setSelectedCollections,
  setSelectedCategory,
  setSelectedPrice,
  setSelectedSize,
  setSelectedStock,
  setInputSearchValue,
}: SetFromURL) {
  const queryParams = new URLSearchParams(location.search);
  const [colors] = queryParams.getAll('colors');
  const [collections] = queryParams.getAll('collections');
  const [categories] = queryParams.getAll('categories');
  const valMinPrice = queryParams.getAll('minPrice');
  const valMaxPrice = queryParams.getAll('maxPrice');
  const valMinSize = queryParams.getAll('minSize');
  const valMaxSize = queryParams.getAll('maxSize');
  const valMinStock = queryParams.getAll('minStock');
  const valMaxStock = queryParams.getAll('maxStock');
  const [search] = queryParams.getAll('q');

  if (colors) {
    setSelectedColors(colors?.split(','));
  }
  if (collections) {
    setSelectedCollections(collections?.split(',').map(Number));
  }
  if (categories) {
    setSelectedCategory(categories?.split(','));
  }
  if (valMinPrice.length || valMaxPrice.length) {
    setSelectedPrice([+valMinPrice, +valMaxPrice]);
  }
  if (valMinSize.length || valMaxSize.length) {
    setSelectedSize([+valMinSize, +valMaxSize]);
  }
  if (valMinStock.length || valMaxStock.length) {
    setSelectedStock([+valMinStock, +valMaxStock]);
  }
  if (search) {
    setInputSearchValue(search);
  }
}
