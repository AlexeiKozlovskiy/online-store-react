export const PRICE_MIN = 1.99;
export const PRICE_MAX = 34.99;

export const SIZE_MIN = 1;
export const SIZE_MAX = 700;

export const STOCK_MIN = 1;
export const STOCK_MAX = 50;

export const CATEGORIES = [
  'Tree decorations',
  'Garland & Wreath',
  'Do It Yourself',
  'Christmas decorations',
  'Christmas lights',
];

export const CATEGORIES_STOCK = [
  { category: 'Christmas decorations', count: 12 },
  { category: 'Garland & Wreath', count: 9 },
  { category: 'Do It Yourself', count: 4 },
  { category: 'Tree decorations', count: 32 },
  { category: 'Christmas lights', count: 3 },
];

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

export const COLLECTION_STOCK = [{ collection: 2021 }, { collection: 2022 }, { collection: 2023 }];

export const ITEMS_IN_PAGE_CART = [1, 3, 5, 10, 0];

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
  { value: '0', label: 'All' },
];
