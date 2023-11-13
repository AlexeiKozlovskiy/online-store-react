export const PRICE_MIN = 1.99;
export const PRICE_MAX = 34.99;
export const SIZE_MIN = 1;
export const SIZE_MAX = 700;
export const STOCK_MIN = 1;
export const STOCK_MAX = 50;

export const COLOR_STOCK = [
  { color: 'black' },
  { color: 'blue' },
  { color: 'brown' },
  { color: 'green' },
  { color: 'pink' },
  { color: 'purple' },
  { color: 'red' },
  { color: 'silver' },
  { color: 'white' },
  { color: 'yellow' },
];

export const CATEGORIES_STOCK = [
  { category: 'Christmas decorations', count: 0 },
  { category: 'Garland & Wreath', count: 0 },
  { category: 'Do It Yourself', count: 0 },
  { category: 'Tree decorations', count: 0 },
  { category: 'Christmas lights', count: 0 },
];

export const SORT_OPTIONS = [
  { value: '', label: 'Recommended' },
  { value: 'name', label: 'Name' },
  { value: 'price-asc', label: 'Price ascending' },
  { value: 'price-desc', label: 'Price descending' },
  { value: 'stock-asc', label: 'Stock ascending' },
  { value: 'stock-desc', label: 'Stock descending' },
];

export const ITEMS_IN_PAGE = [
  { value: '5', label: 'Show items: 5' },
  { value: '10', label: 'Show items: 10' },
  { value: '20', label: 'Show items: 20' },
  { value: '30', label: 'Show items: 30' },
  { value: 'all', label: 'All' },
];

export const ITEMS_IN_PAGE_CART = [
  { value: '1', label: 'Show items: 1' },
  { value: '3', label: 'Show items: 3' },
  { value: '5', label: 'Show items: 5' },
  { value: '10', label: 'Show items: 10' },
  { value: 'all', label: 'All' },
];

export const COLLECTION_STOCK = [{ collection: 2021 }, { collection: 2022 }, { collection: 2023 }];

export const PROMOCODES = [
  {
    id: 1,
    name: 'NEW-YEAR-2024',
    discount: 7,
  },
  {
    id: 2,
    name: 'JOLLY-XMAS',
    discount: 10,
  },
];

export const BASE_URL = 'https://online-store-api-7fyt.onrender.com';
// export const BASE_URL = 'http://localhost:4000';

export const API_ROUTES = {
  SIGN_UP: `${BASE_URL}/auth/register`,
  SIGN_IN: `${BASE_URL}/auth/login`,
  SIGN_IN_GOOGLE: `${BASE_URL}/auth/login/google`,
  GET_USER: `${BASE_URL}/user/`,
  REFRESH: `${BASE_URL}/auth/refresh/`,
};

export const CARD_IMAGES = {
  3: 'cards__img-express',
  4: 'cards__img-visa',
  5: 'cards__img-mastercard',
};

export const TEST_USER_DATA = {
  name: 'Rubi Rhod',
  address: 'United States, New-York, Times Square',
  email: 'Rubi_Rod@icloud.com',
  phone: '+37533123456789',
  nameCard: 'RUBI RHOD',
  numberCard: '5555 4444 3333 2222',
  dateCard: '05/25',
  cvvCard: '123',
};
