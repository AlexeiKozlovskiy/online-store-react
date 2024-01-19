import {
  BalancerCategory,
  BalancerColor,
  BalancerCollection,
  Product,
  CartItem,
  PromocodeData,
  DualRangesBalancer,
} from '@/types/types';
import { AxiosError } from 'axios';

export function dualRangesBalancer(
  products: Product[],
  key: keyof DualRangesBalancer
): [number, number] {
  const value = products.map((el) => el[key]);
  return [Math.min(...value), Math.max(...value)];
}

export function colorBalancer(products: Product[]) {
  return products.reduce((acc: BalancerColor[], { color }) => {
    const existingColor = acc.find((item) => item.color === color);
    if (!existingColor) {
      acc = [...acc, { color }];
    }
    return acc;
  }, []);
}

export function collectionBalancer(products: Product[]) {
  return products.reduce((acc: BalancerCollection[], { collection }) => {
    const existingCollection = acc.find((item) => item.collection === collection);
    if (!existingCollection) {
      acc = [...acc, { collection }];
    }
    return acc;
  }, []);
}

export function categoryBalancer(products: Product[], categoryStock: BalancerCategory[]) {
  return categoryStock.map(({ category }) => ({
    category,
    count: products.filter((product) => product.category === category).length,
  }));
}

export function formatPrice(price: number) {
  return price?.toFixed(2);
}

export function formatNameForURL(name: string) {
  return name.replace(/\s/g, '-');
}

export function formatNameFromURL(name: string) {
  return name.replace(/\-/g, ' ');
}

export const thisYear = new Date().getFullYear().toString().substring(2, 4);

export const thisMonth = new Date().getMonth().toString();

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

export function sortByFavorite(products: Product[]) {
  return [...products].sort(({ favorite }) => (favorite ? -1 : 1));
}

export function sortByName(products: Product[]) {
  return [...products].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA > nameB) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function commonError(err: unknown) {
  const error = err as AxiosError<Error>;
  const { message } = error.response!.data;
  console.warn(error.response!.data);
  return { error: message, data: null };
}

export function handlerScrollUp() {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, 20);
}

export function getTotalPrice(cartItemsState: CartItem[]) {
  return cartItemsState.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
}

export function getTotalDiscount(promocodeState: PromocodeData) {
  return promocodeState.applied.reduce((acc, { discount }) => acc + discount, 0);
}

export function getTotalPriseByPromocode(cartState: CartItem[], promocodeState: PromocodeData) {
  const totalPrice = getTotalPrice(cartState);
  const totalDiscount = getTotalDiscount(promocodeState);

  if (totalDiscount) {
    return totalPrice - (totalDiscount / 100) * totalPrice;
  } else return totalPrice;
}

export function getTotalItems(cartItemsState: CartItem[]) {
  return cartItemsState.reduce((count, cartItem) => count + cartItem.quantity, 0);
}

export function bodyNotScroll() {
  document.body.classList.toggle('lock');
}
