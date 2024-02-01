import { describe, expect, it } from 'vitest';
import {
  categoryBalancer,
  collectionBalancer,
  colorBalancer,
  commonError,
  dualRangesBalancer,
  formatNameForURL,
  formatNameFromURL,
  formatPrice,
  getTotalDiscount,
  getTotalItems,
  getTotalPrice,
  getTotalPriseByPromocode,
  sortByFavorite,
  sortByKey,
  sortByName,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByStockAsc,
  sortByStockDesc,
  sortCategoryBalancer,
  sortCollectionBalancer,
  sortColorBalancer,
} from '@/helpers/helpersFunc';
import {
  cart,
  notSortCategory,
  notSortCollection,
  notSortColor,
  notSortingProduct,
  TEST_PRODUCTS,
  promocodes,
  sortCategory,
  sortCollection,
  sortColor,
  sortingProductByFavorite,
  sortingProductByName,
  sortingProductByPriceAsk,
  sortingProductByPriceDesc,
  sortingProductByStockAsc,
  sortingProductByStockDesc,
} from '../testsData';
import { AxiosError, AxiosRequestHeaders } from 'axios';
import { CATEGORIES_STOCK, PRODUCT_DUAL_RANGE_FILTER_FIELDS } from '@/helpers/constant';

describe('helpers function', () => {
  it('should format price', () => {
    const price = 10.53554;
    const formattedPrice = formatPrice(price);

    expect(formattedPrice).toBe('10.54');
  });

  it('should format name for url', () => {
    const name = 'Luxury Christmas';
    const formattedName = formatNameForURL(name);

    expect(formattedName).toBe('Luxury-Christmas');
  });

  it('should format name from url', () => {
    const name = 'Luxury-Christmas';
    const formattedName = formatNameFromURL(name);

    expect(formattedName).toBe('Luxury Christmas');
  });

  it('should sort color balancer', () => {
    const sortedColors = sortColorBalancer(notSortColor);

    expect(sortedColors).toStrictEqual(sortColor);
  });

  it('should sort category balancer', () => {
    const sortedColors = sortCategoryBalancer(notSortCategory);

    expect(sortedColors).toStrictEqual(sortCategory);
  });

  it('should sort collection balancer', () => {
    const sortedCollection = sortCollectionBalancer(notSortCollection);

    expect(sortedCollection).toStrictEqual(sortCollection);
  });

  describe('sort by key', () => {
    it('should sort by price asc', () => {
      const sortedByPriceAsc = sortByKey(notSortingProduct, sortByPriceAsc);

      expect(sortedByPriceAsc).toStrictEqual(sortingProductByPriceAsk);
    });

    it('should sort by price desc', () => {
      const sortedByPriceDesc = sortByKey(notSortingProduct, sortByPriceDesc);

      expect(sortedByPriceDesc).toStrictEqual(sortingProductByPriceDesc);
    });

    it('should sort by stock asc', () => {
      const sortedByStockDesc = sortByKey(notSortingProduct, sortByStockAsc);

      expect(sortedByStockDesc).toStrictEqual(sortingProductByStockAsc);
    });

    it('should sort by stock desc', () => {
      const sortedByStockDesc = sortByKey(notSortingProduct, sortByStockDesc);

      expect(sortedByStockDesc).toStrictEqual(sortingProductByStockDesc);
    });
  });

  it('should sort by favorite', () => {
    const sortedByFavorite = sortByFavorite(notSortingProduct);

    expect(sortedByFavorite).toStrictEqual(sortingProductByFavorite);
  });

  it('should sort by name', () => {
    const sortedByName = sortByName(sortingProductByFavorite);

    expect(sortedByName).toStrictEqual(sortingProductByName);
  });

  it('should return error message and null data', () => {
    const axiosError: AxiosError<Error> = {
      response: {
        data: {
          message: 'Error message',
          name: '',
        },
        status: 404,
        statusText: '',
        headers: { 'Content-Type': 'application/json' } as AxiosRequestHeaders,
        config: {
          headers: {} as AxiosRequestHeaders,
        },
      },
      isAxiosError: false,
      toJSON: function (): object {
        throw new Error('Function not implemented.');
      },
      name: '',
      message: '',
    };

    const result = commonError(axiosError);

    expect(result).toEqual({
      error: 'Error message',
      data: null,
    });
  });

  describe('get total Price, Discount, Items', () => {
    it('should return total price without Promocode', () => {
      const totalPrice = getTotalPrice(cart);
      expect(formatPrice(totalPrice)).toStrictEqual('41.91');
    });

    it('should return total Discount', () => {
      const totalDiscount = getTotalDiscount(promocodes);
      expect(totalDiscount).toStrictEqual(17);
    });

    it('should return total price by Promocode', () => {
      const totalPriceByPromocode = getTotalPriseByPromocode(cart, promocodes);

      expect(formatPrice(totalPriceByPromocode)).toStrictEqual('34.79');
    });

    it('should return total Items', () => {
      const totalItems = getTotalItems(cart);

      expect(totalItems).toStrictEqual(5);
    });
  });

  describe('balanser function', () => {
    const minPrice = 3.39;
    const maxPrice = 12.99;
    const minSize = 8;
    const maxSize = 700;
    const minStock = 2;
    const maxStock = 40;

    it('should return min & max value by key', () => {
      const { PRICE, SIZE, STOCK } = PRODUCT_DUAL_RANGE_FILTER_FIELDS;

      const priceValue = dualRangesBalancer(TEST_PRODUCTS, PRICE);
      expect(priceValue).toStrictEqual([minPrice, maxPrice]);

      const sizeValue = dualRangesBalancer(TEST_PRODUCTS, SIZE);
      expect(sizeValue).toStrictEqual([minSize, maxSize]);

      const stockValue = dualRangesBalancer(TEST_PRODUCTS, STOCK);
      expect(stockValue).toStrictEqual([minStock, maxStock]);
    });

    it('should return colors', () => {
      const colorsValue = colorBalancer(TEST_PRODUCTS);

      expect(colorsValue).toStrictEqual([
        { color: 'blue' },
        { color: 'brown' },
        { color: 'yellow' },
      ]);
    });

    it('should return collections', () => {
      const colorsValue = collectionBalancer(TEST_PRODUCTS);

      expect(colorsValue).toStrictEqual([
        { collection: 2023 },
        { collection: 2022 },
        { collection: 2021 },
      ]);
    });

    it('should return category', () => {
      const colorsValue = categoryBalancer(TEST_PRODUCTS, CATEGORIES_STOCK);

      expect(colorsValue).toStrictEqual([
        { category: 'Christmas decorations', count: 1 },
        { category: 'Garland & Wreath', count: 0 },
        { category: 'Do It Yourself', count: 0 },
        { category: 'Tree decorations', count: 4 },
        { category: 'Christmas lights', count: 3 },
      ]);
    });
  });
});
