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
} from '@/components/helpers/constant';

export function MainPage() {
  const [itemsCount, setItemsCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [swichedView, setSwichedView] = useState('block');
  const [sortProducts, setSortProducts] = useState<Product[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<[number | null, number | null]>([
    PRICE_MIN,
    PRICE_MAX,
  ]);
  const [selectedSize, setSelectedSize] = useState<[number | null, number | null]>([
    SIZE_MIN,
    SIZE_MAX,
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedStock, setSelectedStock] = useState<[number | null, number | null]>([
    STOCK_MIN,
    STOCK_MAX,
  ]);
  const [sortColor, setSortColor] = useState<Product[]>([]);
  const [sortCollections, setSortCollections] = useState<Product[]>([]);
  const [sortPrice, setSortPrice] = useState<Product[]>([]);
  const [sortSize, setSortSize] = useState<Product[]>([]);
  const [sortCategory, setSortCategory] = useState<Product[]>([]);
  const [sortStock, setSortStock] = useState<Product[]>([]);
  const [balancerCategory, setBalancerCategory] = useState<BalancerCategory[]>([]);
  const [balancerCollection, setBalancerCollection] = useState<BalancerCollection[]>([]);
  const [balancerColor, setBalancerColor] = useState<BalancerColor[]>([]);

  const [minPrice, maxPrice] = selectedPrice;
  const [minSize, maxSize] = selectedSize;
  const [minStock, maxStock] = selectedStock;

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

    const categoryBalancer = sortProducts.reduce((acc: BalancerCategory[], { category }) => {
      const existingCategory = acc.find((item) => item.category === category);
      if (existingCategory) {
        existingCategory.count++;
      } else {
        acc = [...acc, { category: category, count: 1 }];
      }
      return acc;
    }, []);

    if (!selectedColors.length) {
      setBalancerColor(sortColorBalancer(colorBalancer));
    }
    if (!selectedCollections.length) {
      setBalancerCollection(sortCollectionBalancer(collectionBalancer));
    }
    if (!selectedCategory.length) {
      setBalancerCategory(sortCategoryBalancer(categoryBalancer));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div className="main-catalog__filters">
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
          </div>
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
