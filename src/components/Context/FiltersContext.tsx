import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import {
  PRICE_MIN,
  PRICE_MAX,
  SIZE_MIN,
  SIZE_MAX,
  STOCK_MIN,
  STOCK_MAX,
  CATEGORIES,
} from '@/components/helpers/constant';
import {
  BalancerCategory,
  BalancerCollection,
  BalancerColor,
  Product,
  Balancers,
} from '../types/types';
import products from '@/assets/data/products.json';
import {
  findCommonProducts,
  sortColorBalancer,
  sortCategoryBalancer,
  sortCollectionBalancer,
  sortByFavorite,
} from '@/components/helpers/helpersFunc';
import { useMyURLContext } from '@/components/Context/URLContext';

export const useMyFiltersContext = () => useContext(FiltersContext);

interface IFiltersContext extends Balancers {
  itemsCount: number;
  isEmptyFilters: boolean;
  removeItemFilterClick: (e: React.MouseEvent<HTMLElement>) => void;
  filtersProducts: Product[];
  setFiltersProducts: (value: Product[]) => void;
  balanserPrise: [number | null, number | null];
  balanserSize: [number | null, number | null];
  balanserStock: [number | null, number | null];
}

export const FiltersContext = createContext<IFiltersContext>({
  itemsCount: 0,
  isEmptyFilters: true,
  removeItemFilterClick: () => null,
  balancerCategory: [],
  balancerCollection: [],
  balancerColor: [],
  filtersProducts: [],
  setFiltersProducts: () => null,
  balanserPrise: [null, null],
  balanserSize: [null, null],
  balanserStock: [null, null],
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

  const [filtersProducts, setFiltersProducts] = useState<Product[]>([]);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [sortProductsSearch, setSortProductsSearch] = useState<Product[]>([]);
  const [sortColor, setSortColor] = useState<Product[]>([]);
  const [sortCollections, setSortCollections] = useState<Product[]>([]);
  const [sortPrice, setSortPrice] = useState<Product[]>([]);
  const [sortSize, setSortSize] = useState<Product[]>([]);
  const [sortCategory, setSortCategory] = useState<Product[]>([]);
  const [sortStock, setSortStock] = useState<Product[]>([]);
  const [isEmptyFilters, setIsEmptyFilters] = useState(true);
  const [balancerCategory, setBalancerCategory] = useState<BalancerCategory[]>([]);
  const [balancerCollection, setBalancerCollection] = useState<BalancerCollection[]>([]);
  const [balancerColor, setBalancerColor] = useState<BalancerColor[]>([]);
  const [balanserPrise, setBalanserPrise] = useState<[number | null, number | null]>([null, null]);
  const [balanserSize, setBalanserSize] = useState<[number | null, number | null]>([null, null]);
  const [balanserStock, setBalanserStock] = useState<[number | null, number | null]>([null, null]);

  const [minPrice, maxPrice] = selectedPrice;
  const [minSize, maxSize] = selectedSize;
  const [minStock, maxStock] = selectedStock;

  useEffect(() => {
    checkSelectedFilters();
  }, [
    selectedColors,
    selectedCollections,
    selectedCategory,
    selectedPrice,
    selectedSize,
    selectedStock,
  ]);

  useEffect(() => {
    function filterColors() {
      if (inputSearchValue) {
        const sortColor = sortProductsSearch.filter(({ color }) => selectedColors.includes(color));
        if (!sortColor.length && selectedColors.length) {
          setFiltersProducts([]);
        } else if (selectedColors.length) {
          setSortColor(sortColor);
        } else {
          setSortColor(sortProductsSearch);
        }
      } else {
        const sortColor = products.filter(({ color }) => selectedColors.includes(color));
        selectedColors.length ? setSortColor(sortColor) : setSortColor(products);
      }
    }
    filterColors();
  }, [selectedColors]);

  useEffect(() => {
    function filterCollections() {
      if (inputSearchValue) {
        const sortCollections = sortProductsSearch.filter(({ collection }) =>
          selectedCollections.includes(collection)
        );
        if (!sortCollections.length && selectedCollections.length) {
          setFiltersProducts([]);
        } else if (selectedCollections.length) {
          setSortCollections(sortCollections);
        } else {
          setSortCollections(sortProductsSearch);
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
  }, [selectedCollections]);

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
  }, [minPrice, maxPrice, selectedPrice]);

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
        const sortSize = [...products].filter(({ size }) => minSize! <= size && maxSize! >= size);
        sortSize.length ? setSortSize(sortSize) : setSortSize(products);
      }
    }
    filterSize();
  }, [minSize, maxSize, selectedSize]);

  useEffect(() => {
    function filterCategory() {
      if (inputSearchValue) {
        const sortCategory = sortProductsSearch.filter(({ category }) =>
          selectedCategory.includes(category)
        );
        if (!sortCategory.length && selectedCategory.length) {
          setFiltersProducts([]);
        } else if (sortCategory.length) {
          setSortCategory(sortCategory);
        } else {
          setSortCategory(sortProductsSearch);
        }
      } else {
        const sortCategory = products.filter(({ category }) => selectedCategory.includes(category));
        selectedCategory.length ? setSortCategory(sortCategory) : setSortCategory(products);
      }
    }
    filterCategory();
  }, [selectedCategory]);

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
  }, [minStock, maxStock, selectedStock]);

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
      if (inputSearchValue) {
        const searchItems = filtersProducts.filter(({ name }) =>
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
    findItemsInSearchInput();
    return () => {
      setSortProductsSearch([]);
    };
  }, [inputSearchValue]);

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
        CATEGORIES.forEach((category) => {
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

      if (!selectedColors.length) {
        const colorsValues = sortColorBalancer(colorBalancer(filtersProducts));
        setBalancerColor(colorsValues);
      } else {
        const commonProduct = findCommonProducts(sortCategory, sortCollections, sortProductsSearch);
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
        setBalanserPrise(priceBalancer(filtersProducts));
        setBalanserSize(sizeBalancer(filtersProducts));
        setBalanserStock(stockBalancer(filtersProducts));
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
      setItemsCount(filtersProducts.length);
    }
    countProducts();
  }, [filtersProducts.length]);

  function checkSelectedFilters() {
    if (
      !selectedColors.length &&
      !selectedCollections.length &&
      minPrice === PRICE_MIN &&
      maxPrice === PRICE_MAX &&
      minSize === SIZE_MIN &&
      maxSize === SIZE_MAX &&
      minStock === STOCK_MIN &&
      maxStock === STOCK_MAX &&
      !selectedCategory.length
    ) {
      setIsEmptyFilters(false);
    } else {
      setIsEmptyFilters(true);
    }
  }

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
        isEmptyFilters,
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
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
