import { describe, expect, it } from 'vitest';
import {
  commonBalanserProducts,
  commonError,
  commonFiltersProducts,
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

  describe('common object', () => {
    it('should return common filter object', () => {
      const commmon = commonFiltersProducts([1, 3], [1, 2, 3], [1, 3], [1, 2, 3, 5]);

      expect(commmon).toStrictEqual([1, 3]);

      const empty = commonFiltersProducts([], [1, 2, 3], [4, 5], [1, 2, 3, 5]);

      expect(empty).toStrictEqual([]);
    });

    it('should return common object', () => {
      const commmon = commonBalanserProducts([0, 1, 3], [1, 2, 3], [1, 3], [1, 2, 3, 5]);

      expect(commmon).toStrictEqual([1, 3]);

      const commmonTwo = commonBalanserProducts([0, 1, 3], [1, 2, 3], [4, 5], [1, 2, 3, 5]);

      expect(commmonTwo).toStrictEqual([]);

      const empty = commonBalanserProducts([], [], [], []);

      expect(empty).toStrictEqual([]);
    });
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
});
