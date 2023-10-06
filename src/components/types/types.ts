export interface Product {
  id: number;
  name: string;
  price: number;
  collection: number;
  stock: number;
  color: string;
  size: number;
  favorite?: boolean;
  category: string;
  images: string[];
}

export interface CartItemArg {
  product: Product;
  quantity: number;
}

export interface Promocode {
  id: number;
  name: string;
  discount: number;
}

export interface PromocodeData {
  applied: Promocode[];
  available: Promocode[];
}

export interface CartItem extends CartItemArg {
  id: number;
}

export interface CartItemReducerProps {
  cart: CartItem;
}

export interface PaginationData {
  page: number;
  perPage: number;
  pageCount: number;
  offset: number;
  limit: number;
}

export interface CartData {
  items: CartItem[];
  priceAfterDiscount: number;
  getPriceByPromocodes: GetPriceByPromocodes;
  productCount: number;
  promocodes: PromocodeData;
  pagination: PaginationData;
}

export type GetPriceByPromocodes = (promocodes?: Promocode[]) => number;

export interface SelectedFilter {
  (values: [number | null, number | null]): void;
}

export interface Filters extends SelectedFilters, SetSelectedFilters {}

export interface SelectedFilters {
  selectedColors: string[];
  selectedCollections: number[];
  selectedPrice: [number | null, number | null];
  selectedSize: [number | null, number | null];
  selectedStock: [number | null, number | null];
  selectedCategory: string[];
}

export interface SetSelectedFilters {
  setSelectedCollections: (value: number[]) => void;
  setSelectedColors: (value: string[]) => void;
  setSelectedPrice: SelectedFilter;
  setSelectedSize: SelectedFilter;
  setSelectedStock: SelectedFilter;
  setSelectedCategory: (value: string[]) => void;
}

export interface Balancers {
  balancerCategory: BalancerCategory[];
  balancerCollection: BalancerCollection[];
  balancerColor: BalancerColor[];
}

export interface BalancerCategory {
  category: string;
  count: number;
}

export interface BalancerCollection {
  collection: number;
}

export interface BalancerColor {
  color: string;
}

export interface InputSearch {
  inputSearchValue: string | null;
  setInputSearchValue: (value: string | null) => void;
}

export interface ISelect {
  value: string;
  label: string;
}

export enum Select {
  NAME = 'name',
  PRICE_ASC = 'price-asc',
  PRICE_DESC = 'price-desc',
  STOCK_ASC = 'stock-asc',
  STOCK_DESC = 'stock-desc',
}
