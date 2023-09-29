export type Product = {
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
};

export type CartItemArg = {
  product: Product;
  quantity: number;
};

export type Promocode = {
  id: number;
  name: string;
  discount: number;
};

export type PromocodeData = {
  applied: Promocode[];
  available: Promocode[];
};

export type CartItem = CartItemArg & {
  id: number;
};

export interface CartItemReducerProps {
  cart: CartItem;
}

export type PaginationData = {
  page: number;
  perPage: number;
  pageCount: number;
  offset: number;
  limit: number;
};

export type CartData = {
  items: CartItem[];
  priceAfterDiscount: number;
  getPriceByPromocodes: GetPriceByPromocodes;
  productCount: number;
  promocodes: PromocodeData;
  pagination: PaginationData;
};

export type GetPriceByPromocodes = (promocodes?: Promocode[]) => number;

export type BalancerCategory = {
  category: string;
  count: number;
};

export type BalancerCollection = {
  collection: number;
};

export type BalancerColor = {
  color: string;
};

export type SelectedFilter = {
  (values: [number | null, number | null]): void;
};

export interface SelectedFilters {
  selectedColors: string[];
  selectedCollections: number[];
  selectedPrice: [number | null, number | null];
  selectedSize: [number | null, number | null];
  selectedStock: [number | null, number | null];
  selectedCategory: string[];
  setSelectedCollections: (value: number[]) => void;
  setSelectedColors: (value: string[]) => void;
  setSelectedPrice: SelectedFilter;
  setSelectedSize: SelectedFilter;
  setSelectedStock: SelectedFilter;
  setSelectedCategory: (value: string[]) => void;
}
