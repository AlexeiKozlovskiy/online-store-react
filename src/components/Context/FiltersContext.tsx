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
  InputSearch,
  Filters,
  BalancerCategory,
  BalancerCollection,
  BalancerColor,
  Product,
  Balancers,
} from '../types/types';
import { setStorage } from '@/components/helpers/Storage/Storage';
import { updateURLWithFilters } from '@/components/helpers/URL/updateURL';
import { setFromURL } from '@/components/helpers/URL/setFromURL';
import products from '@/assets/data/products.json';
import {
  findCommonProducts,
  sortColorBalancer,
  sortCategoryBalancer,
  sortCollectionBalancer,
} from '@/components/helpers/helpersFunc';

export const useMyFiltersContext = () => useContext(FiltersContext);

interface ISelect {
  value: string;
  label: string;
}

interface IFiltersContext extends Filters, Balancers, InputSearch {
  itemsCount: number;
  isEmptyFilters: boolean;
  removeFiltersAndSearchInput: () => void;
  removeItemFilterClick: (e: React.MouseEvent<HTMLElement>) => void;
  sortProducts: Product[];
  sortindViewOption: ISelect;
  setSortindViewOption: (selectedOption: ISelect) => void;
  sortingView: (selectedOption: ISelect) => void;
}

export const FiltersContext = createContext<IFiltersContext>({
  itemsCount: 0,
  isEmptyFilters: true,
  removeFiltersAndSearchInput: () => null,
  removeItemFilterClick: () => null,
  inputSearchValue: '',
  setInputSearchValue: () => null,
  selectedColors: [],
  selectedCollections: [],
  selectedCategory: [],
  selectedPrice: [PRICE_MIN, PRICE_MAX],
  selectedSize: [SIZE_MIN, SIZE_MAX],
  selectedStock: [STOCK_MIN, STOCK_MAX],
  setSelectedColors: () => null,
  setSelectedCollections: () => null,
  setSelectedCategory: () => null,
  setSelectedPrice: () => null,
  setSelectedSize: () => null,
  setSelectedStock: () => null,
  balancerCategory: [],
  balancerCollection: [],
  balancerColor: [],
  sortProducts: [],
  sortindViewOption: {
    value: '',
    label: 'Recommended',
  },
  setSortindViewOption: () => null,
  sortingView: () => null,
});

export const FiltersContextProvider = ({ children }: { children: ReactNode }) => {
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [sortProductsSearch, setSortProductsSearch] = useState<Product[]>([]);
  const [sortProducts, setSortProducts] = useState<Product[]>([]);
  const [sortColor, setSortColor] = useState<Product[]>([]);
  const [sortCollections, setSortCollections] = useState<Product[]>([]);
  const [sortPrice, setSortPrice] = useState<Product[]>([]);
  const [sortSize, setSortSize] = useState<Product[]>([]);
  const [sortCategory, setSortCategory] = useState<Product[]>([]);
  const [sortStock, setSortStock] = useState<Product[]>([]);
  const [inputSearchValue, setInputSearchValue] = useState<string | null>('');
  const [isEmptyFilters, setIsEmptyFilters] = useState(true);
  const [selectedColors, setSelectedColors] = useState<string[]>(() => {
    return JSON.parse(sessionStorage.getItem('selectedColors') || '[]');
  });
  const [selectedCollections, setSelectedCollections] = useState<number[]>(() => {
    return JSON.parse(sessionStorage.getItem('selectedCollections') || '[]');
  });
  const [selectedCategory, setSelectedCategory] = useState<string[]>(() => {
    return JSON.parse(sessionStorage.getItem('selectedCategory') || '[]');
  });
  const [selectedPrice, setSelectedPrice] = useState<[number | null, number | null]>([
    PRICE_MIN,
    PRICE_MAX,
  ]);
  const [selectedSize, setSelectedSize] = useState<[number | null, number | null]>([
    SIZE_MIN,
    SIZE_MAX,
  ]);
  const [selectedStock, setSelectedStock] = useState<[number | null, number | null]>([
    STOCK_MIN,
    STOCK_MAX,
  ]);
  const [balancerCategory, setBalancerCategory] = useState<BalancerCategory[]>(() => {
    return JSON.parse(sessionStorage.getItem('balancerCategory') || '[]');
  });
  const [balancerCollection, setBalancerCollection] = useState<BalancerCollection[]>(() => {
    return JSON.parse(sessionStorage.getItem('balancerCollection') || '[]');
  });
  const [balancerColor, setBalancerColor] = useState<BalancerColor[]>(() => {
    return JSON.parse(sessionStorage.getItem('balancerColor') || '[]');
  });
  const [sortindViewOption, setSortindViewOption] = useState({
    value: '',
    label: 'Recommended',
  });

  const [minPrice, maxPrice] = selectedPrice;
  const [minSize, maxSize] = selectedSize;
  const [minStock, maxStock] = selectedStock;

  useEffect(() => {
    if (selectedColors) setStorage('selectedColors', selectedColors);
  }, [selectedColors]);

  useEffect(() => {
    if (selectedCollections) setStorage('selectedCollections', selectedCollections);
  }, [selectedCollections]);

  useEffect(() => {
    if (selectedPrice) setStorage('selectedPrice', selectedPrice);
  }, [selectedPrice]);

  useEffect(() => {
    if (selectedCategory) setStorage('selectedCategory', selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (balancerCategory) setStorage('balancerCategory', balancerCategory);
  }, [balancerCategory]);

  useEffect(() => {
    if (balancerColor) setStorage('balancerColor', balancerColor);
  }, [balancerColor]);

  useEffect(() => {
    if (balancerCollection) setStorage('balancerCollection', balancerCollection);
  }, [balancerCollection]);

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
    setFromURL({
      setSelectedColors,
      setSelectedCollections,
      setSelectedCategory,
      setSelectedPrice,
      setSelectedSize,
      setSelectedStock,
      setInputSearchValue,
      setSortindViewOption,
    });
  }, [location.search]);

  useEffect(() => {
    updateURLWithFilters({
      selectedColors,
      selectedCollections,
      selectedCategory,
      selectedPrice,
      selectedSize,
      selectedStock,
      inputSearchValue,
      sortindViewOption,
    });
  }, [
    selectedColors,
    selectedCollections,
    selectedCategory,
    selectedPrice,
    selectedSize,
    selectedStock,
    inputSearchValue,
    sortindViewOption,
  ]);

  useEffect(() => {
    function filterColors() {
      if (inputSearchValue) {
        const sortColor = sortProductsSearch.filter(({ color }) => selectedColors.includes(color));
        if (!sortColor.length && selectedColors.length) {
          setSortProducts([]);
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
          setSortProducts([]);
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
          setSortProducts([]);
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
          setSortProducts([]);
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
  }, [minSize, maxSize, selectedSize]);

  useEffect(() => {
    function filterCategory() {
      if (inputSearchValue) {
        const sortCategory = sortProductsSearch.filter(({ category }) =>
          selectedCategory.includes(category)
        );
        if (!sortCategory.length && selectedCategory.length) {
          setSortProducts([]);
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
          setSortProducts([]);
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
      setSortProducts(commonProduct);
    }
    commonProductsOutFilters();
  }, [sortColor, sortCollections, sortSize, sortPrice, sortStock, sortCategory]);

  useEffect(() => {
    function findItemsInSearchInput() {
      if (inputSearchValue) {
        const searchItems = sortProducts.filter(({ name }) =>
          name.toLowerCase().includes(inputSearchValue.toLowerCase())
        );
        if (searchItems) {
          setSortProducts(searchItems);
          setSortProductsSearch(searchItems);
        }
      } else {
        setSortProducts(products);
      }
    }
    findItemsInSearchInput();
  }, [inputSearchValue]);

  useEffect(() => {
    function filtersBalancer() {
      const colorBalancer = sortProducts.reduce((acc: BalancerColor[], { color }) => {
        const existingColor = acc.find((item) => item.color === color);
        if (!existingColor) {
          acc = [...acc, { color: color }];
        }
        return acc;
      }, []);

      const collectionBalancer = sortProducts.reduce(
        (acc: BalancerCollection[], { collection }) => {
          const existingCollection = acc.find((item) => item.collection === collection);
          if (!existingCollection) {
            acc = [...acc, { collection: collection }];
          }
          return acc;
        },
        []
      );

      const categoryBalancer = (products: Product[]) => {
        let arrCategory: BalancerCategory[] = [];
        CATEGORIES.forEach((category) => {
          const categoryProducts = products.filter((product) => product.category === category);
          const count = categoryProducts.length;
          arrCategory = [...arrCategory, { category, count }];
          return arrCategory;
        });

        return arrCategory;
      };

      // Dual ranges balancers???

      if (!selectedColors.length) {
        setBalancerColor(sortColorBalancer(colorBalancer));
      }

      if (!selectedCollections.length) {
        setBalancerCollection(sortCollectionBalancer(collectionBalancer));
      }

      if (selectedCategory.length) {
        setBalancerCategory(sortCategoryBalancer(balancerCategory));
      } else {
        setBalancerCategory(sortCategoryBalancer(categoryBalancer(sortProducts)));
      }
    }
    filtersBalancer();
  }, [sortProducts]);

  useEffect(() => {
    function countProducts() {
      setItemsCount(sortProducts.length);
    }
    countProducts();
  }, [sortProducts]);

  useEffect(() => {
    function defaultFilter() {
      sortingView(sortindViewOption);
    }
    defaultFilter();
  }, [sortProducts]);

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

  function removeFiltersAndSearchInput() {
    setInputSearchValue('');
    setSelectedColors([]);
    setSelectedCollections([]);
    setSelectedCategory([]);
    setSelectedPrice([PRICE_MIN, PRICE_MAX]);
    setSelectedSize([SIZE_MIN, SIZE_MAX]);
    setSelectedStock([STOCK_MIN, STOCK_MAX]);
    setSortindViewOption({
      value: '',
      label: 'Recommended',
    });
  }

  function removeItemFilterClick(e: React.MouseEvent<HTMLElement>) {
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

  function sortingView(sortindOption: ISelect) {
    if (sortindOption.value === 'name') {
      const sortName = sortProducts.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setSortProducts(sortName);
    } else if (sortindOption.value === 'price-asc') {
      const priceAsc = sortProducts.sort((a, b) => a.price - b.price);
      setSortProducts(priceAsc);
    } else if (sortindOption.value === 'price-desc') {
      const priceDesc = sortProducts.sort((a, b) => b.price - a.price);
      setSortProducts(priceDesc);
    } else if (sortindOption.value === 'stock-asc') {
      const stockAsc = sortProducts.sort((a, b) => a.stock - b.stock);
      setSortProducts(stockAsc);
    } else if (sortindOption.value === 'stock-desc') {
      const stockDesc = sortProducts.sort((a, b) => b.stock - a.stock);
      setSortProducts(stockDesc);
    } else if (!sortindOption.value) {
      const resetFilter = sortProducts.sort((a, b) => a.id - b.id);
      const stockDesc = resetFilter.sort(({ favorite }) => {
        if (favorite === true) {
          return -1;
        }
        if (favorite === false) {
          return 1;
        }
        return 0;
      });
      setSortProducts(stockDesc);
    }
  }

  return (
    <FiltersContext.Provider
      value={{
        isEmptyFilters,
        removeFiltersAndSearchInput,
        removeItemFilterClick,
        inputSearchValue,
        setInputSearchValue,
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
        balancerCategory,
        balancerCollection,
        balancerColor,
        sortProducts,
        itemsCount,
        sortindViewOption,
        setSortindViewOption,
        sortingView,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
