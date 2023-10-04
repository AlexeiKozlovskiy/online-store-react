import { BalancerCategory, BalancerColor, BalancerCollection } from '@/components/types/types';

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
  return arr.sort((a, b) => {
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
  return arr.sort((a, b) => {
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
  return arr.sort((a, b) => a.collection - b.collection);
}
