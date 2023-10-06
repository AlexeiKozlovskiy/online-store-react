import {
  BalancerCategory,
  BalancerColor,
  BalancerCollection,
  Product,
} from '@/components/types/types';

export function formatPrice(price: number) {
  return price.toFixed(2);
}

export function findCommonProducts<T>(...arrays: T[][]): T[] {
  const nonEmptyArrays = arrays.filter((array) => array.length > 0);
  if (nonEmptyArrays.length === 0) {
    return [];
  }
  const arraysAsArrays = nonEmptyArrays.map((arrayLike) => Array.from(arrayLike));
  const commonObjects = arraysAsArrays.reduce((acc, cur) => {
    return acc.filter((objA) => cur.some((objB) => JSON.stringify(objA) === JSON.stringify(objB)));
  });
  return commonObjects;
}

export function sortColorBalancer(arr: BalancerColor[]): BalancerColor[] {
  return [...arr].sort((a, b) => {
    const colorA = a.color;
    const colorB = b.color;
    if (colorA < colorB) {
      return -1;
    }
    if (colorA > colorB) {
      return 1;
    }
    return 0;
  });
}

export function sortCategoryBalancer(arr: BalancerCategory[]): BalancerCategory[] {
  return [...arr].sort((a, b) => {
    const colorA = a.category.toLowerCase();
    const colorB = b.category.toLowerCase();
    if (colorA < colorB) {
      return -1;
    }
    if (colorA > colorB) {
      return 1;
    }
    return 0;
  });
}

export function sortCollectionBalancer(arr: BalancerCollection[]): BalancerCollection[] {
  return [...arr].sort((a, b) => a.collection - b.collection);
}

export function sortByKey(products: Product[], criteria: (a: Product, b: Product) => number) {
  return [...products].sort((a, b) => criteria(a, b));
}

export function sortByPriceAsc(a: Product, b: Product) {
  return a.price - b.price;
}

export function sortByPriceDesc(a: Product, b: Product) {
  return b.price - a.price;
}

export function sortByStockAsc(a: Product, b: Product) {
  return a.stock - b.stock;
}

export function sortByStockDesc(a: Product, b: Product) {
  return b.stock - a.stock;
}

export function resetSort(a: Product, b: Product) {
  return a.id - b.id;
}

export function sortByFavorite(products: Product[]) {
  return [...products].sort(({ favorite }) => {
    if (favorite === true) {
      return -1;
    }
    if (favorite === false) {
      return 1;
    }
    return 0;
  });
}

export function sortByName(products: Product[]) {
  return [...products].sort((a, b) => {
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
}
