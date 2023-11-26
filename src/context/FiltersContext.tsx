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
} from '@/types/types';
import {
  findCommonProducts,
  sortColorBalancer,
  sortCollectionBalancer,
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
  const { inputSearchValue, selectedFilters, setSelectedFilters } = useMyURLContext();
  const { data: products = [], isFetching } = useGetProductsQuery();
  const [filtersProducts, setFiltersProducts] = useState<Product[]>(products);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [emptyCatalog, setEmptyCatalog] = useState<boolean>(false);
  const [sortProductsSearch, setSortProductsSearch] = useState<Product[]>([]);
  const [sortColor, setSortColor] = useState<Product[]>([]);
  const [sortCollections, setSortCollections] = useState<Product[]>([]);
  const [sortPrice, setSortPrice] = useState<Product[]>([]);
  const [sortSize, setSortSize] = useState<Product[]>([]);
  const [sortCategory, setSortCategory] = useState<Product[]>([]);
  const [sortStock, setSortStock] = useState<Product[]>([]);
  const [balanserFilters, setBalanserFilters] = useState<Balancers>({
    balancerColor: COLOR_STOCK,
    balancerCollection: COLLECTION_STOCK,
    balancerCategory: CATEGORIES_STOCK,
    balanserPrise: [PRICE_MIN, PRICE_MAX],
    balanserSize: [SIZE_MIN, SIZE_MAX],
    balanserStock: [STOCK_MIN, STOCK_MAX],
  });

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
    filterColors();
  }, [colorsSelected, isFetching, sortProductsSearch]);

  useEffect(() => {
    filterCollections();
  }, [collectionsSelected, isFetching, sortProductsSearch]);

  useEffect(() => {
    filterPrice();
  }, [minPrice, maxPrice, priceSelected, isFetching, sortProductsSearch]);

  useEffect(() => {
    filterSize();
  }, [minSize, maxSize, sizeSelected, isFetching, sortProductsSearch]);

  useEffect(() => {
    filterCategory();
  }, [categorySelected, isFetching, sortProductsSearch]);

  useEffect(() => {
    filterStock();
  }, [minStock, maxStock, stockSelected, isFetching, sortProductsSearch]);

  useEffect(() => {
    commonProducts();
  }, [sortColor, sortCollections, sortSize, sortPrice, sortStock, sortCategory]);

  useEffect(() => {
    findItemsInSearchInput();
  }, [inputSearchValue, isFetching]);

  useEffect(() => {
    setBalanser();
  }, [filtersProducts]);

  useEffect(() => {
    countProducts();
  }, [filtersProducts.length]);

  function filterColors() {
    if (inputSearchValue) {
      const sortColor = sortProductsSearch.filter(({ color }) => colorsSelected.includes(color));
      if (!sortColor.length && colorsSelected.length) {
        setFiltersProducts([]);
      } else if (!colorsSelected.length && sortProductsSearch.length) {
        setSortColor(sortProductsSearch);
      } else if (colorsSelected.length) {
        setSortColor(sortColor);
      }
    } else {
      const sortColor = products.filter(({ color }) => colorsSelected.includes(color));
      colorsSelected.length ? setSortColor(sortColor) : setSortColor(products);
    }
  }

  function filterCollections() {
    if (inputSearchValue) {
      const sortCollections = sortProductsSearch.filter(({ collection }) =>
        collectionsSelected.includes(collection)
      );
      if (!sortCollections.length && collectionsSelected.length) {
        setFiltersProducts([]);
      } else if (!collectionsSelected.length && sortProductsSearch.length) {
        setSortCollections(sortProductsSearch);
      } else if (collectionsSelected.length) {
        setSortCollections(sortCollections);
      }
    } else {
      const sortCollections = products.filter(({ collection }) =>
        collectionsSelected.includes(collection)
      );
      collectionsSelected.length
        ? setSortCollections(sortCollections)
        : setSortCollections(products);
    }
  }

  function filterPrice() {
    if (inputSearchValue) {
      const sortPrice = sortProductsSearch.filter(
        ({ price }) => minPrice! <= price && maxPrice! >= price
      );
      if (!sortPrice.length) {
        setFiltersProducts([]);
      } else if (sortPrice.length) {
        setSortPrice(sortPrice);
      } else {
        setSortPrice(sortProductsSearch);
      }
    } else {
      const sortPrice = products.filter(({ price }) => minPrice! <= price && maxPrice! >= price);
      sortPrice.length ? setSortPrice(sortPrice) : setSortPrice(products);
    }
  }

  function filterSize() {
    if (inputSearchValue) {
      const sortSize = sortProductsSearch.filter(
        ({ size }) => minSize! <= size && maxSize! >= size
      );
      if (!sortSize.length) {
        setFiltersProducts([]);
      } else if (sortSize.length) {
        setSortSize(sortSize);
      } else {
        setSortSize(sortProductsSearch);
      }
    } else {
      const sortSize = products.filter(({ size }) => minSize! <= size && maxSize! >= size);
      sortSize.length ? setSortSize(sortSize) : setSortSize(products);
    }
  }

  function filterCategory() {
    if (inputSearchValue) {
      const sortCategory = sortProductsSearch.filter(({ category }) =>
        categorySelected.includes(category)
      );
      if (!sortCategory.length && categorySelected.length) {
        setFiltersProducts([]);
      } else if (!categorySelected.length && sortProductsSearch.length) {
        setSortCategory(sortProductsSearch);
      } else if (categorySelected.length) {
        setSortCategory(sortCategory);
      }
    } else {
      const sortCategory = products.filter(({ category }) => categorySelected.includes(category));
      categorySelected.length ? setSortCategory(sortCategory) : setSortCategory(products);
    }
  }

  function filterStock() {
    if (inputSearchValue) {
      const sortStock = sortProductsSearch.filter(
        ({ stock }) => minStock! <= stock && maxStock! >= stock
      );
      if (!sortStock.length) {
        setFiltersProducts([]);
      } else if (sortStock.length) {
        setSortStock(sortStock);
      } else {
        setSortStock(sortProductsSearch);
      }
    } else {
      const sortStock = products.filter(({ stock }) => minStock! <= stock && maxStock! >= stock);
      sortStock.length ? setSortStock(sortStock) : setSortStock(products);
    }
  }

  function commonProducts() {
    const commonProduct = findCommonProducts(
      products,
      sortColor,
      sortCollections,
      sortPrice,
      sortSize,
      sortStock,
      sortCategory
    );
    setFiltersProducts(commonProduct);
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
        const commonProduct = findCommonProducts(sortCategory, sortCollections, sortProductsSearch);
        const colorsValues = sortColorBalancer(colorBalancer(commonProduct));
        balanser = { ...balanser, balancerColor: colorsValues };
      }

      if (!collectionsSelected.length) {
        const collectionsValues = sortCollectionBalancer(collectionBalancer(filtersProducts));
        balanser = { ...balanser, balancerCollection: collectionsValues };
      } else {
        const commonProduct = findCommonProducts(sortCategory, sortColor, sortProductsSearch);
        const collectionsValues = sortCollectionBalancer(collectionBalancer(commonProduct));
        balanser = { ...balanser, balancerCollection: collectionsValues };
      }

      if (!categorySelected.length) {
        const categoryValues = categoryBalancer(filtersProducts);
        balanser = { ...balanser, balancerCategory: categoryValues };
      } else {
        const commonProduct = findCommonProducts(sortColor, sortCollections, sortProductsSearch);
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
    } else if (sortProductsSearch.length) {
      balanser = {
        ...balanser,
        balanserPrise: priceBalancer(sortProductsSearch),
        balanserSize: sizeBalancer(sortProductsSearch),
        balanserStock: stockBalancer(sortProductsSearch),
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

  function findItemsInSearchInput() {
    if (inputSearchValue && products.length) {
      const searchItems = products.filter(({ name }) =>
        name.toLowerCase().includes(inputSearchValue.toLowerCase())
      );
      if (searchItems) {
        setFiltersProducts(searchItems);
        setSortProductsSearch(searchItems);
      }
    } else {
      setFiltersProducts(products);
    }
  }

  function countProducts() {
    !isFetching && setItemsCount(filtersProducts.length);
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
