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
} from '../types/types';
import {
  findCommonProducts,
  sortColorBalancer,
  sortCategoryBalancer,
  sortCollectionBalancer,
  sortByFavorite,
} from '@/helpers/helpersFunc';
import { useMyURLContext } from '@/context/URLContext';
import { useGetProductsQuery } from '@/api/ProductsAPI';

interface IFiltersContext extends Balancers {
  itemsCount: number;
  removeItemFilterClick: (e: React.MouseEvent<HTMLElement>) => void;
  filtersProducts: Product[];
  setFiltersProducts: (value: Product[]) => void;
  balanserPrise: [number | null, number | null];
  balanserSize: [number | null, number | null];
  balanserStock: [number | null, number | null];
  emptyCatalog: boolean;
}

export const useMyFiltersContext = () => useContext(FiltersContext);

export const FiltersContext = createContext<IFiltersContext>({
  itemsCount: 0,
  removeItemFilterClick: () => null,
  balancerColor: COLOR_STOCK,
  balancerCollection: COLLECTION_STOCK,
  balancerCategory: CATEGORIES_STOCK,
  balanserPrise: [PRICE_MIN, PRICE_MAX],
  balanserSize: [SIZE_MIN, SIZE_MAX],
  balanserStock: [STOCK_MIN, STOCK_MAX],
  filtersProducts: [],
  setFiltersProducts: () => null,
  emptyCatalog: false,
});

export const FiltersContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    selectedColors,
    selectedCollections,
    selectedCategory,
    selectedPrice,
    selectedSize,
    selectedStock,
    inputSearchValue,
    setSelectedColors,
    setSelectedCollections,
    setSelectedCategory,
    setSelectedPrice,
    setSelectedSize,
    setSelectedStock,
  } = useMyURLContext();
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
  const [balancerColor, setBalancerColor] = useState<BalancerColor[]>(COLOR_STOCK);
  const [balancerCollection, setBalancerCollection] =
    useState<BalancerCollection[]>(COLLECTION_STOCK);
  const [balancerCategory, setBalancerCategory] = useState<BalancerCategory[]>(
    sortCategoryBalancer(CATEGORIES_STOCK)
  );
  const [balanserPrise, setBalanserPrise] = useState<[number | null, number | null]>([
    PRICE_MIN,
    PRICE_MAX,
  ]);
  const [balanserSize, setBalanserSize] = useState<[number | null, number | null]>([
    SIZE_MIN,
    SIZE_MAX,
  ]);
  const [balanserStock, setBalanserStock] = useState<[number | null, number | null]>([
    STOCK_MIN,
    STOCK_MAX,
  ]);

  const [minPrice, maxPrice] = selectedPrice;
  const [minSize, maxSize] = selectedSize;
  const [minStock, maxStock] = selectedStock;

  useEffect(() => {
    function filterColors() {
      if (inputSearchValue) {
        const sortColor = sortProductsSearch.filter(({ color }) => selectedColors.includes(color));
        if (!sortColor.length && selectedColors.length) {
          setFiltersProducts([]);
        } else if (!selectedColors.length && sortProductsSearch.length) {
          setSortColor(sortProductsSearch);
        } else if (selectedColors.length) {
          setSortColor(sortColor);
        }
      } else {
        const sortColor = products.filter(({ color }) => selectedColors.includes(color));
        selectedColors.length ? setSortColor(sortColor) : setSortColor(products);
      }
    }
    filterColors();
  }, [selectedColors, isFetching, sortProductsSearch]);

  useEffect(() => {
    function filterCollections() {
      if (inputSearchValue) {
        const sortCollections = sortProductsSearch.filter(({ collection }) =>
          selectedCollections.includes(collection)
        );
        if (!sortCollections.length && selectedCollections.length) {
          setFiltersProducts([]);
        } else if (!selectedCollections.length && sortProductsSearch.length) {
          setSortCollections(sortProductsSearch);
        } else if (selectedCollections.length) {
          setSortCollections(sortCollections);
        }
      } else {
        const sortCollections = products.filter(({ collection }) =>
          selectedCollections.includes(collection)
        );
        selectedCollections.length
          ? setSortCollections(sortCollections)
          : setSortCollections(products);
      }
    }
    filterCollections();
  }, [selectedCollections, isFetching, sortProductsSearch]);

  useEffect(() => {
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
    filterPrice();
  }, [minPrice, maxPrice, selectedPrice, isFetching, sortProductsSearch]);

  useEffect(() => {
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
    filterSize();
  }, [minSize, maxSize, selectedSize, isFetching, sortProductsSearch]);

  useEffect(() => {
    function filterCategory() {
      if (inputSearchValue) {
        const sortCategory = sortProductsSearch.filter(({ category }) =>
          selectedCategory.includes(category)
        );
        if (!sortCategory.length && selectedCategory.length) {
          setFiltersProducts([]);
        } else if (!selectedCategory.length && sortProductsSearch.length) {
          setSortCategory(sortProductsSearch);
        } else if (selectedCategory.length) {
          setSortCategory(sortCategory);
        }
      } else {
        const sortCategory = products.filter(({ category }) => selectedCategory.includes(category));
        selectedCategory.length ? setSortCategory(sortCategory) : setSortCategory(products);
      }
    }
    filterCategory();
  }, [selectedCategory, isFetching, sortProductsSearch]);

  useEffect(() => {
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
    filterStock();
  }, [minStock, maxStock, selectedStock, isFetching, sortProductsSearch]);

  useEffect(() => {
    function commonProductsOutFilters() {
      const commonProduct = findCommonProducts(
        products,
        sortColor,
        sortCollections,
        sortPrice,
        sortSize,
        sortStock,
        sortCategory
      );
      const commonProductSort = sortByFavorite(commonProduct);
      setFiltersProducts(commonProductSort);
    }
    commonProductsOutFilters();
  }, [sortColor, sortCollections, sortSize, sortPrice, sortStock, sortCategory]);

  useEffect(() => {
    function findItemsInSearchInput() {
      if (inputSearchValue && products.length) {
        const searchItems = products.filter(({ name }) =>
          name.toLowerCase().includes(inputSearchValue.toLowerCase())
        );
        console.log(searchItems);

        if (searchItems) {
          setFiltersProducts(searchItems);
          setSortProductsSearch(searchItems);
        }
      } else {
        setFiltersProducts(products);
      }
    }
    findItemsInSearchInput();
  }, [inputSearchValue, isFetching]);

  useEffect(() => {
    function filtersBalancer() {
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

      if (filtersProducts.length) {
        if (!selectedColors.length) {
          const colorsValues = sortColorBalancer(colorBalancer(filtersProducts));
          setBalancerColor(colorsValues);
        } else {
          const commonProduct = findCommonProducts(
            sortCategory,
            sortCollections,
            sortProductsSearch
          );
          const colorsValues = sortColorBalancer(colorBalancer(commonProduct));
          setBalancerColor(colorsValues);
        }

        if (!selectedCollections.length) {
          const collectionsValues = sortCollectionBalancer(collectionBalancer(filtersProducts));
          setBalancerCollection(collectionsValues);
        } else {
          const commonProduct = findCommonProducts(sortCategory, sortColor, sortProductsSearch);
          const collectionsValues = sortCollectionBalancer(collectionBalancer(commonProduct));
          setBalancerCollection(collectionsValues);
        }

        if (!selectedCategory.length) {
          const categoryValues = sortCategoryBalancer(categoryBalancer(filtersProducts));
          setBalancerCategory(categoryValues);
        } else {
          const commonProduct = findCommonProducts(sortColor, sortCollections, sortProductsSearch);
          const categoryValues = sortCategoryBalancer(categoryBalancer(commonProduct));
          setBalancerCategory(categoryValues);
        }
      }

      if (
        selectedColors.length ||
        selectedCollections.length ||
        selectedCategory.length ||
        minPrice === PRICE_MIN ||
        maxPrice === PRICE_MAX ||
        minSize === SIZE_MIN ||
        maxSize === SIZE_MAX ||
        minStock === STOCK_MIN ||
        maxStock === STOCK_MAX
      ) {
        if (filtersProducts.length) {
          setBalanserPrise(priceBalancer(filtersProducts));
          setBalanserSize(sizeBalancer(filtersProducts));
          setBalanserStock(stockBalancer(filtersProducts));
        }
      } else if (sortProductsSearch.length) {
        setBalanserPrise(priceBalancer(sortProductsSearch));
        setBalanserSize(sizeBalancer(sortProductsSearch));
        setBalanserStock(stockBalancer(sortProductsSearch))!;
      } else {
        setBalanserPrise([PRICE_MIN, PRICE_MAX]);
        setBalanserSize([SIZE_MIN, SIZE_MAX]);
        setBalanserStock([STOCK_MIN, STOCK_MAX]);
      }
    }
    filtersBalancer();
  }, [filtersProducts]);

  useEffect(() => {
    function countProducts() {
      !isFetching && setItemsCount(filtersProducts.length);
      if (!filtersProducts.length && !isFetching) {
        setEmptyCatalog(true);
      } else {
        setEmptyCatalog(false);
      }
    }
    countProducts();
  }, [filtersProducts.length]);

  function removeItemFilterClick(e: React.MouseEvent<HTMLElement>) {
    const { dataset } = e.target as HTMLElement;
    switch (dataset.params) {
      case 'colors':
        setSelectedColors(selectedColors.filter((color) => color !== dataset.value));
        break;
      case 'collections':
        setSelectedCollections(
          selectedCollections.filter((collection) => collection !== Number(dataset.value))
        );
        break;
      case 'categories':
        setSelectedCategory(selectedCategory.filter((category) => category !== dataset.value));
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

  return (
    <FiltersContext.Provider
      value={{
        removeItemFilterClick,
        balancerCategory,
        balancerCollection,
        balancerColor,
        filtersProducts,
        setFiltersProducts,
        itemsCount,
        balanserPrise,
        balanserSize,
        balanserStock,
        emptyCatalog,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
