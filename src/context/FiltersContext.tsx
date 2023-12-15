import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {
  PRICE_MIN,
  PRICE_MAX,
  SIZE_MIN,
  SIZE_MAX,
  STOCK_MIN,
  STOCK_MAX,
  CATEGORIES_STOCK,
  COLOR_STOCK,
  COLLECTION_STOCK,
} from '@/helpers/constant';
import {
  BalancerCategory,
  BalancerCollection,
  BalancerColor,
  Product,
  Balancers,
  SortProducts,
} from '@/types/types';
import {
  sortColorBalancer,
  sortCollectionBalancer,
  commonBalanserProducts,
  commonFiltersProducts,
} from '@/helpers/helpersFunc';
import { useMyURLContext } from '@/context/URLContext';
import { useGetProductsQuery } from '@/api/ProductsAPI';

interface IFiltersContext {
  itemsCount: number;
  removeItemFilterClick: (e: React.MouseEvent<HTMLElement>) => void;
  filtersProducts: Product[];
  setFiltersProducts: (value: Product[]) => void;
  emptyCatalog: boolean;
  balanserFilters: Balancers;
}

export const useMyFiltersContext = () => useContext(FiltersContext);

export const FiltersContext = createContext<IFiltersContext>({
  itemsCount: 0,
  removeItemFilterClick: () => null,
  filtersProducts: [],
  setFiltersProducts: () => null,
  emptyCatalog: false,
  balanserFilters: {
    balancerColor: COLOR_STOCK,
    balancerCollection: COLLECTION_STOCK,
    balancerCategory: CATEGORIES_STOCK,
    balanserPrise: [PRICE_MIN, PRICE_MAX],
    balanserSize: [SIZE_MIN, SIZE_MAX],
    balanserStock: [STOCK_MIN, STOCK_MAX],
  },
});

export const FiltersContextProvider = ({ children }: { children: ReactNode }) => {
  const { inputSearchURL, selectedFilters, setSelectedFilters } = useMyURLContext();
  const { data: products = [], isFetching } = useGetProductsQuery();
  const [filtersProducts, setFiltersProducts] = useState<Product[]>(products);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [emptyCatalog, setEmptyCatalog] = useState<boolean>(false);
  const [commonFilters, setCommonFilters] = useState<SortProducts>({
    filterColor: [],
    filterCollection: [],
    filteSize: [],
    filtePrice: [],
    filteStock: [],
    filteCategory: [],
    filteSearch: [],
  });
  const [balanserFilters, setBalanserFilters] = useState<Balancers>({
    balancerColor: COLOR_STOCK,
    balancerCollection: COLLECTION_STOCK,
    balancerCategory: CATEGORIES_STOCK,
    balanserPrise: [PRICE_MIN, PRICE_MAX],
    balanserSize: [SIZE_MIN, SIZE_MAX],
    balanserStock: [STOCK_MIN, STOCK_MAX],
  });

  const {
    filterColor,
    filterCollection,
    filteSize,
    filtePrice,
    filteStock,
    filteCategory,
    filteSearch,
  } = commonFilters;

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

  useEffect(() => {
    if (filtersProducts.length) {
      setBalanser();
    }
  }, [filtersProducts.length]);

  useEffect(() => {
    countProducts();
  }, [filtersProducts.length]);

  useEffect(() => {
    if (products.length) {
      commonProducts();
    }
  }, [
    filterColor,
    filterCollection,
    filteSize,
    filtePrice,
    filteStock,
    filteCategory,
    filteSearch,
  ]);

  useEffect(() => {
    if (products.length) {
      let filters = { ...commonFilters };
      filters = { ...filters, filterColor: applyColorFilter(products, colorsSelected) };
      filters = { ...filters, filteCategory: applyCategoryFilter(products, categorySelected) };
      filters = { ...filters, filtePrice: applyPriseFilter(products, minPrice!, maxPrice!) };
      filters = { ...filters, filteSize: applySizeFilter(products, minSize!, maxSize!) };
      filters = { ...filters, filteStock: applyStockFilter(products, minStock!, maxStock!) };
      filters = { ...filters, filteSearch: applySearchFilter(products, inputSearchURL!) };
      filters = {
        ...filters,
        filterCollection: applyCollectionsFilter(products, collectionsSelected),
      };
      setCommonFilters(filters);
    }
  }, [
    colorsSelected,
    collectionsSelected,
    priceSelected,
    sizeSelected,
    categorySelected,
    stockSelected,
    inputSearchURL,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    minStock,
    maxStock,
    products.length,
  ]);

  function commonProducts() {
    const commonProduct = commonFiltersProducts(
      filteSearch,
      filterColor,
      filterCollection,
      filteSize,
      filtePrice,
      filteStock,
      filteCategory,
      filteSearch
    );
    setFiltersProducts(commonProduct);
  }
  function applyColorFilter(products: Product[], colorsSelected: string[]) {
    return colorsSelected.length
      ? products.filter(({ color }) => colorsSelected.includes(color))
      : products;
  }

  function applyCollectionsFilter(products: Product[], collectionsSelected: number[]) {
    return collectionsSelected.length
      ? products.filter(({ collection }) => collectionsSelected.includes(collection))
      : products;
  }

  function applyCategoryFilter(products: Product[], categorySelected: string[]) {
    return categorySelected.length
      ? products.filter(({ category }) => categorySelected.includes(category))
      : products;
  }

  function applyPriseFilter(products: Product[], minPrice: number, maxPrice: number) {
    return products.filter(({ price }) => minPrice! <= price && maxPrice! >= price);
  }

  function applySizeFilter(products: Product[], minSize: number, maxSize: number) {
    return products.filter(({ size }) => minSize! <= size && maxSize! >= size);
  }

  function applyStockFilter(products: Product[], minStock: number, maxStock: number) {
    return products.filter(({ stock }) => minStock! <= stock && maxStock! >= stock);
  }

  function applySearchFilter(products: Product[], inputSearchURL: string) {
    return products.filter(({ name }) =>
      name.toLowerCase().includes(inputSearchURL!.toLowerCase())
    );
  }

  function colorBalancer(products: Product[]) {
    return products.reduce((acc: BalancerColor[], { color }) => {
      const existingColor = acc.find((item) => item.color === color);
      if (!existingColor) {
        acc = [...acc, { color: color }];
      }
      return acc;
    }, []);
  }

  function collectionBalancer(products: Product[]) {
    return products.reduce((acc: BalancerCollection[], { collection }) => {
      const existingCollection = acc.find((item) => item.collection === collection);
      if (!existingCollection) {
        acc = [...acc, { collection: collection }];
      }
      return acc;
    }, []);
  }

  function categoryBalancer(products: Product[]) {
    let arrCategory: BalancerCategory[] = [];
    CATEGORIES_STOCK.map(({ category }) => category).forEach((category) => {
      const categoryProducts = products.filter((product) => product.category === category);
      const count = categoryProducts.length;
      arrCategory = [...arrCategory, { category, count }];
      return arrCategory;
    });
    return arrCategory;
  }

  function priceBalancer(products: Product[]): [number, number] {
    const arrPrice = products.map(({ price }) => price);
    return [Math.min(...arrPrice), Math.max(...arrPrice)];
  }

  function sizeBalancer(products: Product[]): [number, number] {
    const arrPrice = products.map(({ size }) => size);
    return [Math.min(...arrPrice), Math.max(...arrPrice)];
  }

  function stockBalancer(products: Product[]): [number, number] {
    const arrPrice = products.map(({ stock }) => stock);
    return [Math.min(...arrPrice), Math.max(...arrPrice)];
  }

  function setBalanser() {
    let balanser = { ...balanserFilters };

    if (filtersProducts.length) {
      if (!colorsSelected.length) {
        const colorsValues = sortColorBalancer(colorBalancer(filtersProducts));
        balanser = { ...balanser, balancerColor: colorsValues };
      } else {
        const commonProduct = commonBalanserProducts(filterCollection, filteCategory, filteSearch);
        const colorsValues = sortColorBalancer(colorBalancer(commonProduct));
        balanser = { ...balanser, balancerColor: colorsValues };
      }

      if (!collectionsSelected.length) {
        const collectionsValues = sortCollectionBalancer(collectionBalancer(filtersProducts));
        balanser = { ...balanser, balancerCollection: collectionsValues };
      } else {
        const commonProduct = commonBalanserProducts(filterColor, filteCategory, filteSearch);
        const collectionsValues = sortCollectionBalancer(collectionBalancer(commonProduct));
        balanser = { ...balanser, balancerCollection: collectionsValues };
      }

      if (!categorySelected.length) {
        const categoryValues = categoryBalancer(filtersProducts);
        balanser = { ...balanser, balancerCategory: categoryValues };
      } else {
        const commonProduct = commonBalanserProducts(filterColor, filterCollection, filteSearch);
        const categoryValues = categoryBalancer(commonProduct);
        balanser = { ...balanser, balancerCategory: categoryValues };
      }
    }

    if (hasSelectedFilters) {
      if (filtersProducts.length) {
        balanser = {
          ...balanser,
          balanserPrise: priceBalancer(filtersProducts),
          balanserSize: sizeBalancer(filtersProducts),
          balanserStock: stockBalancer(filtersProducts),
        };
      }
    } else if (filteSearch.length) {
      balanser = {
        ...balanser,
        balanserPrise: priceBalancer(filteSearch),
        balanserSize: sizeBalancer(filteSearch),
        balanserStock: stockBalancer(filteSearch),
      };
    } else {
      balanser = {
        ...balanser,
        balanserPrise: [PRICE_MIN, PRICE_MAX],
        balanserSize: [SIZE_MIN, SIZE_MAX],
        balanserStock: [STOCK_MIN, STOCK_MAX],
      };
    }
    setBalanserFilters(balanser);
  }

  function countProducts() {
    setItemsCount(filtersProducts.length);
    if (!filtersProducts.length && !isFetching) {
      setEmptyCatalog(true);
    } else {
      setEmptyCatalog(false);
    }
  }

  function removeItemFilterClick(e: React.MouseEvent<HTMLElement>) {
    const { dataset } = e.target as HTMLElement;
    const { value } = dataset;
    switch (dataset.params) {
      case 'colors':
        setSelectedFilters({
          ...selectedFilters,
          colorsSelected: colorsSelected.filter((el) => el !== value),
        });
        break;
      case 'collections':
        setSelectedFilters({
          ...selectedFilters,
          collectionsSelected: collectionsSelected.filter((el) => el !== Number(value)),
        });
        break;
      case 'categories':
        setSelectedFilters({
          ...selectedFilters,
          categorySelected: categorySelected.filter((el) => el !== value),
        });
        break;
      case 'price':
        setSelectedFilters({
          ...selectedFilters,
          priceSelected: [PRICE_MIN, PRICE_MAX],
        });
        break;
      case 'size':
        setSelectedFilters({
          ...selectedFilters,
          sizeSelected: [SIZE_MIN, SIZE_MAX],
        });
        break;
      case 'stock':
        setSelectedFilters({
          ...selectedFilters,
          stockSelected: [STOCK_MIN, STOCK_MAX],
        });
        break;
    }
  }
  const hasSelectedFilters =
    colorsSelected.length ||
    collectionsSelected.length ||
    categorySelected.length ||
    minPrice === PRICE_MIN ||
    maxPrice === PRICE_MAX ||
    minSize === SIZE_MIN ||
    maxSize === SIZE_MAX ||
    minStock === STOCK_MIN ||
    maxStock === STOCK_MAX;

  return (
    <FiltersContext.Provider
      value={{
        removeItemFilterClick,
        filtersProducts,
        setFiltersProducts,
        itemsCount,
        balanserFilters,
        emptyCatalog,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
