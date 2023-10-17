import { LiteralUnion } from 'react-hook-form';

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

export interface FormData {
  userID: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  nameCard: string;
  numderCard: string;
  dateCard: string;
  cvvCard: string;
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
  cartID: string;
  itemNumber: number;
}

export interface CartItemReducerProps {
  cart: CartItem;
}

export interface PromocodeDataReducerProps {
  promocode: PromocodeData;
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

export interface PageClickEvent {
  selected: number;
}

export enum Select {
  NAME = 'name',
  PRICE_ASC = 'price-asc',
  PRICE_DESC = 'price-desc',
  STOCK_ASC = 'stock-asc',
  STOCK_DESC = 'stock-desc',
}

export enum CARD {
  EXPRESS = '3',
  VISA = '4',
  MASTERCARD = '5',
}

export type ErrorType = LiteralUnion<'required' | 'validate', string>;

export interface FormErrorMessages {
  mesageName?: null | FORM_MESSAGES;
  mesageAdress?: null | FORM_MESSAGES;
  mesageEmail?: null | FORM_MESSAGES;
  mesagePhone?: null | FORM_MESSAGES;
  mesageNameCard?: null | FORM_MESSAGES;
  mesageNumberCard?: null | FORM_MESSAGES;
  mesageDateCard?: null | FORM_MESSAGES;
  mesageCvvCard?: null | FORM_MESSAGES;
}

export interface FormValues {
  name?: string;
  adress?: string;
  email?: string;
  numberPhone?: string;
  nameCard?: string;
  numberCard?: string;
  dateCard?: string;
  cvvCard?: string;
}

export enum FORM_MESSAGES {
  ENTER_NAME = 'Please enter name',
  ENTER_ADDRESS = 'Please enter address',
  ENTER_EMAIL = 'Please enter email',
  ENTER_PHONE = 'Please enter phone',
  ENTER_NAME_CARD = 'Please enter name card',
  ENTER_NUMBER_CARD = 'Please enter number card',
  ENTER_DATE_CARD = 'Please enter date card',
  ENTER_CVV_CARD = 'Please enter cvv card',
  NAME_CONTAINS_TWO_WORDS = 'Name must contain at least 2 words',
  NAME_CONTAINS_INVALID_CHARACTERS = 'Name contains invalid characters',
  ADDRESS_CONTAINS_THREE_WORDS = 'Adress must contain at least 3 words',
  INVALID_EMAIL = 'Invalid email',
  PHONE_LENGTH = 'Invalid phone length',
  CARD_NUMBER_LENGTH = 'Card number invalid length',
  CARD_DATE_LENGTH = 'Card date invalid length',
  INVALID_CARD_DATE = 'Invalid date',
  INVALID_CARD_CVV = 'Invalid CVV',
}
