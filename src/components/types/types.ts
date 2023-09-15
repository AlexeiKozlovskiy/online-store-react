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
