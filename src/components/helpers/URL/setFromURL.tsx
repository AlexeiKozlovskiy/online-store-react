import { SetSelectedFilters, ISelect } from '@/components/types/types';
import { SORT_OPTIONS } from '@/components/helpers/constant';

interface SetFromURL extends SetSelectedFilters {
  setInputSearchValue: (value: string) => void;
  setSortindViewOption: (selectedOption: ISelect) => void;
}

export function setFromURL({
  setSelectedColors,
  setSelectedCollections,
  setSelectedCategory,
  setSelectedPrice,
  setSelectedSize,
  setSelectedStock,
  setInputSearchValue,
  setSortindViewOption,
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
  const [viewOption] = queryParams.getAll('sortBy');

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
  if (viewOption) {
    setSortindViewOption({
      value: viewOption,
      label: SORT_OPTIONS.filter(({ value, label }) => {
        if (value === viewOption) {
          return label;
        }
      })[0]?.label,
    });
  }
}
