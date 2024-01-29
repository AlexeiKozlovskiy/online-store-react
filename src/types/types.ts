import { LiteralUnion, UseFormRegister } from 'react-hook-form';

export interface Product {
  id: string;
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

export type DualRangesBalancer = Pick<Product, 'price' | 'size' | 'stock'>;

export type CardImg = 'cards__img-express' | 'cards__img-visa' | 'cards__img-mastercard';

export type SortingsValue = 'name' | 'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc';

export interface CartItemArg {
  product: Product;
  quantity: number;
}

export interface CartItem extends CartItemArg {
  cartID: string;
  itemNumber: number;
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

export interface ChosenProduct {
  id: string | null;
  name: string | null;
}

export interface ProductsQweryParams {
  qweryParams: string;
}

export interface RootReducerProps {
  balansersFilters: Balancers;
  cart: CartItem[];
  promocode: PromocodeData;
  auth: Authentication;
  chosenProduct: ChosenProduct;
  productsQweryParams: ProductsQweryParams;
}

export interface PaginationData {
  page: number;
  perPage: number;
  pageCount: number;
  offset: number;
  limit: number;
}

export type GetPriceByPromocodes = (promocodes?: Promocode[]) => number;

export type DualRange = [number | null, number | null];

export interface CartData {
  items: CartItem[];
  priceAfterDiscount: number;
  getPriceByPromocodes: GetPriceByPromocodes;
  productCount: number;
  promocodes: PromocodeData;
  pagination: PaginationData;
}

export interface SelectedFilter {
  (values: DualRange): void;
}

export interface SelectedFilters {
  colorsSelected: string[];
  collectionsSelected: number[];
  categorySelected: string[];
  priceSelected: DualRange;
  sizeSelected: DualRange;
  stockSelected: DualRange;
}

export interface BalancerColor {
  color: string;
}

export interface BalancerCollection {
  collection: number;
}

export interface BalancerCategory {
  category: string;
  count: number;
}

export interface Balancers {
  balancerColor: BalancerColor[];
  balancerCollection: BalancerCollection[];
  balancerCategory: BalancerCategory[];
  balanserPrise: DualRange;
  balanserSize: DualRange;
  balanserStock: DualRange;
}

export interface InputSearch {
  inputSearchURL: string | null;
  setInputSearchURL: (value: string | null) => void;
}

export interface ISelect {
  value: string;
  label: string;
}

export interface PageClickEvent {
  selected: number;
}

export enum ROUTE {
  MAIN = '/',
  CART = 'cart',
  PRODUCT = 'product',
  PROFILE = 'profile',
}

export interface User {
  id: string;
  email: string;
  login: string;
  picture?: string;
  isGoogle?: boolean;
}

export interface UserResp {
  data: User;
}

export interface GoogleResp {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

export interface CredentialGoogle {
  email: string;
  name: string;
  picture: string;
}

export interface BackendTokens {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: string | null;
}

export interface AuthData {
  backendTokens: BackendTokens;
  user: User;
}

export interface AuthDataResp {
  data: AuthData;
}

export interface Authentication extends BackendTokens {
  idUser: string | null;
  authenticated: boolean;
}

export type ErrorType = LiteralUnion<'required' | 'validate', string>;

export interface UserProfileResp {
  data: Profile;
}

export interface Profile {
  name: string;
  address: string;
  email?: string;
  phone: string;
  nameCard: string;
  numberCard: string;
  dateCard: string;
  cvvCard: string;
}

export interface FormSignUP {
  login: string;
  email: string;
  password: string;
}

export interface FormSignIN {
  email: string;
  password: string;
}

export interface MyForms {
  formSignIN: FormSignIN;
  formSignUP: FormSignUP;
  formProfile: Profile;
}

export interface InputComponents extends errorsForm, RegisterType {
  id: string;
  name?: string;
  type: string;
  isValid: boolean;
  disabled?: boolean;
  className?: string;
  placeholder: string;
  required?: boolean | null;
  register: UseFormRegister<MyForms>;
  validate?: (value: string | any) => boolean;
  errorDefinitions: Record<ErrorType, JSX.Element>;
}

interface RegisterType {
  registerType:
    | 'formProfile'
    | 'formSignIN'
    | 'formSignUP'
    | 'formProfile.numberCard'
    | 'formProfile.name'
    | 'formProfile.address'
    | 'formProfile.email'
    | 'formProfile.phone'
    | 'formProfile.nameCard'
    | 'formProfile.dateCard'
    | 'formProfile.cvvCard'
    | 'formSignUP.email'
    | 'formSignUP.password'
    | 'formSignUP.login'
    | 'formSignIN.email'
    | 'formSignIN.password';
}

interface errorsForm {
  errors:
    | LiteralUnion<
        | 'required'
        | 'validate'
        | 'pattern'
        | 'min'
        | 'max'
        | 'maxLength'
        | 'minLength'
        | 'value'
        | 'setValueAs'
        | 'shouldUnregister'
        | 'onChange'
        | 'onBlur'
        | 'disabled'
        | 'deps'
        | 'valueAsNumber'
        | 'valueAsDate',
        string
      >
    | undefined;
}

export interface FormErrorMessages {
  msgName?: null | FORM_MESSAGES;
  msgLogin?: null | FORM_MESSAGES;
  msgAdress?: null | FORM_MESSAGES;
  msgEmail?: null | FORM_MESSAGES;
  msgPhone?: null | FORM_MESSAGES;
  msgNameCard?: null | FORM_MESSAGES;
  msgNumberCard?: null | FORM_MESSAGES;
  msgDateCard?: null | FORM_MESSAGES;
  msgCvvCard?: null | FORM_MESSAGES;
  msgPassword?: null | FORM_MESSAGES;
}

export enum FORM_MESSAGES {
  ENTER_NAME = 'Please enter name',
  ENTER_LOGIN = 'Please enter login',
  ENTER_ADDRESS = 'Please enter address',
  ENTER_EMAIL = 'Please enter email',
  ENTER_PHONE = 'Please enter phone',
  ENTER_NAME_CARD = 'Please enter name card',
  ENTER_NUMBER_CARD = 'Please enter number card',
  ENTER_DATE_CARD = 'Please enter date card',
  ENTER_CVV_CARD = 'Please enter cvv card',
  ENTER_PASSWORD = 'Please enter password',
  NAME_CONTAINS_TWO_WORDS = 'Name must contain at least 2 words',
  LOGIN_CONTAINS_INVALID_CHARACTERS = 'Login should be included and (or) letters',
  NAME_CONTAINS_INVALID_CHARACTERS = 'Name contains invalid characters',
  ADDRESS_CONTAINS_THREE_WORDS = 'Adress must contain at least 3 words',
  INVALID_EMAIL = 'Invalid email',
  PHONE_LENGTH = 'Invalid phone length',
  LOGIN_LENGTH = 'Invalid login length',
  CARD_NUMBER_LENGTH = 'Card number invalid length',
  CARD_DATE_LENGTH = 'Card date invalid length',
  INVALID_CARD_DATE = 'Invalid date',
  INVALID_CARD_CVV = 'Invalid CVV',
  INVALID_PASSWORD = 'Password should be included numbers and letters, min length 5 symbol',
  THIS_EMAIL_IS_ALREADY_REGISTERED = 'This email is already registered.',
  INCORRECT_USERNAME_OR_PASSWORD = 'Incorrect username or password.',
  SOMETHING_WRONG_WITH_GOOGLE = 'Something wrong with google.',
  SOMETHING_WRONG = 'Something wrong.',
}

export interface CloseOpenModals {
  payment: boolean;
  signUP: boolean;
  signIN: boolean;
  user: boolean;
}
