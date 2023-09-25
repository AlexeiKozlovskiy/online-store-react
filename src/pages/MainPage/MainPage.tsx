import './MainPage.scss';
import { useEffect, useState } from 'react';
import { SortedFilters } from '@/components/SortedFilter/SortedFilters';
import { ProductsList } from '@/components/Products/ProductsList';
import { SearchPanel } from '@/components/SearchPanel/SearchPanel';
import { SideFilter } from '@/components/SideFilter/SideFilter';
import products from '@/assets/data/products.json';
import {
  Product,
  BalancerCategory,
  BalancerCollection,
  BalancerColor,
} from '@/components/types/types';
import {
  findCommonProducts,
  sortColorBalancer,
  sortCategoryBalancer,
  sortCollectionBalancer,
} from '@/components/helpers/helpers';
import {
  PRICE_MIN,
  PRICE_MAX,
  SIZE_MIN,
  SIZE_MAX,
  STOCK_MIN,
  STOCK_MAX,
  CATEGORIES,
  COLOR_STOCK,
  COLLECTION_STOCK,
} from '@/components/helpers/constant';

export function MainPage() {
  const [itemsCount, setItemsCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [swichedView, setSwichedView] = useState('block');
  const [sortProducts, setSortProducts] = useState<Product[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  //   () => {
  //   return JSON.parse(localStorage.getItem('selectedCategory') || '[]');
  // });
  const [selectedPrice, setSelectedPrice] = useState<[number | null, number | null]>(() => {
    return JSON.parse(localStorage.getItem('selectedPrice') || '[null, null]');
  });
  const [selectedSize, setSelectedSize] = useState<[number | null, number | null]>(() => {
    return JSON.parse(localStorage.getItem('selectedSize') || '[null, null]');
  });
  const [selectedStock, setSelectedStock] = useState<[number | null, number | null]>(() => {
    return JSON.parse(localStorage.getItem('selectedStock') || '[null, null]');
  });
  const [sortColor, setSortColor] = useState<Product[]>([]);
  const [sortCollections, setSortCollections] = useState<Product[]>([]);
  const [sortPrice, setSortPrice] = useState<Product[]>([]);
  const [sortSize, setSortSize] = useState<Product[]>([]);
  const [sortCategory, setSortCategory] = useState<Product[]>([]);
  const [sortStock, setSortStock] = useState<Product[]>([]);
  const [balancerCategory, setBalancerCategory] = useState<BalancerCategory[]>([]);
  //   () => {
  //   return JSON.parse(localStorage.getItem('balancerCategory') || '[]');
  // });
  const [balancerCollection, setBalancerCollection] = useState<BalancerCollection[]>([]);
  const [balancerColor, setBalancerColor] = useState<BalancerColor[]>([]);

  const [minPrice, maxPrice] = selectedPrice;
  const [minSize, maxSize] = selectedSize;
  const [minStock, maxStock] = selectedStock;

  useEffect(() => {
    const savedColors: string[] = JSON.parse(localStorage.getItem('selectedColors') || '[]');
    const savedCollections: number[] = JSON.parse(
      localStorage.getItem('selectedCollections') || '[]'
    );
    const savedCategory: string[] = JSON.parse(localStorage.getItem('selectedCategory') || '[]');
    const savedBalanceCategory = JSON.parse(localStorage.getItem('balancerCategory') || '[]');

    if (savedColors.length) {
      setSelectedColors(savedColors);
    }
    if (savedCollections.length) {
      setSelectedCollections(savedCollections);
    }
    if (savedCategory.length) {
      setSelectedCategory(savedCategory);
    }

    if (savedBalanceCategory.length) {
      // setBalancerCategory(sortCategoryBalancer(savedBalanceCategory));
    }

    if (selectedPrice.every((el) => el === null)) {
      setSelectedPrice([PRICE_MIN, PRICE_MAX]);
    }
    if (selectedSize.every((el) => el === null)) {
      setSelectedSize([SIZE_MIN, SIZE_MAX]);
    }
    if (selectedStock.every((el) => el === null)) {
      setSelectedStock([STOCK_MIN, STOCK_MAX]);
    }
    // console.log(savedCategory);
  }, []);
  console.log(selectedCategory);

  useEffect(() => {
    if (selectedColors) {
      localStorage.setItem('selectedColors', JSON.stringify(selectedColors));
    }
  }, [selectedColors]);

  useEffect(() => {
    if (selectedCollections) {
      localStorage.setItem('selectedCollections', JSON.stringify(selectedCollections));
    }
  }, [selectedCollections]);

  useEffect(() => {
    if (selectedPrice) {
      localStorage.setItem('selectedPrice', JSON.stringify(selectedPrice));
    }
  }, [selectedPrice]);

  useEffect(() => {
    if (selectedSize) {
      localStorage.setItem('selectedSize', JSON.stringify(selectedSize));
    }
  }, [selectedSize]);

  useEffect(() => {
    if (selectedStock) {
      localStorage.setItem('selectedStock', JSON.stringify(selectedStock));
    }
  }, [selectedStock]);

  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem('selectedCategory', JSON.stringify(selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (balancerCategory) {
      localStorage.setItem('balancerCategory', JSON.stringify(balancerCategory));
    }
  }, [balancerCategory]);

  useEffect(() => {
    const sortColor = products.filter(({ color }) => selectedColors.includes(color));
    selectedColors.length ? setSortColor(sortColor) : setSortColor(products);
  }, [selectedColors]);

  useEffect(() => {
    const sortCollections = products.filter(({ collection }) =>
      selectedCollections.includes(collection)
    );
    selectedCollections.length ? setSortCollections(sortCollections) : setSortCollections(products);
  }, [selectedCollections]);

  useEffect(() => {
    const sortPrice = products.filter(({ price }) => minPrice! <= price && maxPrice! >= price);
    sortPrice.length ? setSortPrice(sortPrice) : setSortPrice(products);
  }, [minPrice, maxPrice, selectedPrice]);

  useEffect(() => {
    const sortSize = products.filter(({ size }) => minSize! <= size && maxSize! >= size);
    sortSize.length ? setSortSize(sortSize) : setSortSize(products);
  }, [minSize, maxSize, selectedSize]);

  useEffect(() => {
    const sortCategory = products.filter(({ category }) => selectedCategory.includes(category));
    selectedCategory.length ? setSortCategory(sortCategory) : setSortCategory(products);
  }, [selectedCategory]);

  useEffect(() => {
    const sortStock = products.filter(({ stock }) => minStock! <= stock && maxStock! >= stock);
    sortStock.length ? setSortStock(sortStock) : setSortStock(products);
  }, [minStock, maxStock, selectedStock]);

  useEffect(() => {
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
  }, [sortColor, sortCollections, sortSize, sortPrice, sortStock, sortCategory]);

  useEffect(() => setItemsCount(sortProducts.length), [sortProducts]);

  useEffect(() => {
    const colorBalancer = sortProducts.reduce((acc: BalancerColor[], { color }) => {
      const existingColor = acc.find((item) => item.color === color);
      if (!existingColor) {
        acc = [...acc, { color: color }];
      }
      return acc;
    }, []);

    const collectionBalancer = sortProducts.reduce((acc: BalancerCollection[], { collection }) => {
      const existingCollection = acc.find((item) => item.collection === collection);
      if (!existingCollection) {
        acc = [...acc, { collection: collection }];
      }
      return acc;
    }, []);

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

    if (!selectedColors.length) {
      setBalancerColor(sortColorBalancer(colorBalancer));
    } else {
      setBalancerColor(COLOR_STOCK);
    }

    if (!selectedCollections.length) {
      setBalancerCollection(sortCollectionBalancer(collectionBalancer));
    } else {
      setBalancerCollection(COLLECTION_STOCK);
    }

    if (selectedCategory) {
      setBalancerCategory(sortCategoryBalancer(categoryBalancer(sortProducts)));
    }
  }, [sortProducts]);

  function handleShowFilters() {
    showFilters ? setShowFilters(false) : setShowFilters(true);
  }

  function handleSwichedView(value: string) {
    setSwichedView(value);
  }

  return (
    <main className="MainPage-container wrapper">
      <SearchPanel />
      <div className="store-page">
        <section className="main-catalog">
          <aside className="main-catalog__filters">
            <SideFilter
              showFilters={showFilters}
              onClickHideFilter={handleShowFilters}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedCollections={selectedCollections}
              setSelectedCollections={setSelectedCollections}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedStock={selectedStock}
              setSelectedStock={setSelectedStock}
              balancerCategory={balancerCategory}
              balancerCollection={balancerCollection}
              balancerColor={balancerColor}
            />
          </aside>
          <div className="main-catalog__center-section main-center-section">
            <SortedFilters
              onClickShowFilter={handleShowFilters}
              onClickSwitcher={handleSwichedView}
              swichedView={swichedView}
              itemsCount={itemsCount}
            />
            <ProductsList swichedView={swichedView} products={sortProducts} />
          </div>
        </section>
      </div>
    </main>
  );
}
