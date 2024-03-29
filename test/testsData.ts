export const sortColor = [
  { color: 'black' },
  { color: 'black' },
  { color: 'blue' },
  { color: 'green' },
  { color: 'pink' },
  { color: 'purple' },
  { color: 'yellow' },
];
export const notSortColor = [
  { color: 'green' },
  { color: 'blue' },
  { color: 'black' },
  { color: 'yellow' },
  { color: 'purple' },
  { color: 'black' },
  { color: 'pink' },
];

export const sortCategory = [
  { category: 'Christmas decorations', count: 0 },
  { category: 'Christmas decorations', count: 0 },
  { category: 'Do It Yourself', count: 0 },
  { category: 'Garland & Wreath', count: 0 },
];
export const notSortCategory = [
  { category: 'Christmas decorations', count: 0 },
  { category: 'Garland & Wreath', count: 0 },
  { category: 'Do It Yourself', count: 0 },
  { category: 'Christmas decorations', count: 0 },
];

export const sortCollection = [{ collection: 2021 }, { collection: 2022 }, { collection: 2023 }];
export const notSortCollection = [{ collection: 2023 }, { collection: 2022 }, { collection: 2021 }];

export const TEST_PRODUCT = {
  id: '15',
  name: 'Nutcracker',
  price: 10,
  stock: 27,
  collection: 2023,
  color: 'blue',
  size: 20,
  favorite: true,
  category: 'Christmas decorations',
  images: [
    '/assets/products/nutcracker-polyresin-20-cm.jpg',
    '/assets/products/nutcracker-polyresin-20-cm(1).jpg',
  ],
};

export const TEST_PRODUCTS = [
  {
    id: '15',
    name: 'Nutcracker',
    price: 9.95,
    stock: 27,
    collection: 2023,
    color: 'blue',
    size: 20,
    favorite: true,
    category: 'Christmas decorations',
    images: [
      '/assets/products/nutcracker-polyresin-20-cm.jpg',
      '/assets/products/nutcracker-polyresin-20-cm(1).jpg',
    ],
  },
  {
    id: '16',
    name: 'Gingerbread House',
    price: 4.99,
    stock: 8,
    collection: 2023,
    color: 'brown',
    size: 9,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm.jpg',
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm (1).jpg',
    ],
  },
  {
    id: '17',
    name: 'LED lights warm',
    price: 8.99,
    stock: 20,
    collection: 2023,
    color: 'yellow',
    size: 700,
    favorite: false,
    category: 'Christmas lights',
    images: [
      '/assets/products/led-lights-warm-7-m.jpg',
      '/assets/products/led-lights-warm-7-m(1).jpg',
    ],
  },
  {
    id: '18',
    name: '50 LED Light Chain',
    price: 12.99,
    stock: 30,
    collection: 2022,
    color: 'yellow',
    size: 500,
    favorite: false,
    category: 'Christmas lights',
    images: [
      '/assets/products/50-led-light-chain-warm-white-battery-operated-indoor-use.jpg',
      '/assets/products/50-led-light-chain-warm-white-battery-operated-indoor-use(1).jpg',
    ],
  },
  {
    id: '19',
    name: '10 LED Light Chain',
    price: 10.99,
    stock: 40,
    collection: 2023,
    color: 'yellow',
    size: 450,
    favorite: false,
    category: 'Christmas lights',
    images: [
      '/assets/products/10-led-light-chain-warm-white-light-timer-indoor-a-outdoor-use-4-5-m.jpg',
      '/assets/products/10-led-light-chain-warm-white-light-timer-indoor-a-outdoor-use-4-5-m(1).jpg',
    ],
  },
  {
    id: '20',
    name: 'Luxury Christmas bauble with ice flowers',
    price: 3.39,
    stock: 31,
    collection: 2021,
    color: 'yellow',
    size: 8,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl.jpg',
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl(1).jpg',
    ],
  },
  {
    id: '21',
    name: 'Onion Glass Bauble',
    price: 3.99,
    stock: 2,
    collection: 2023,
    color: 'yellow',
    size: 8,
    favorite: false,
    category: 'Tree decorations',
    images: [
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm.jpg',
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm(1).jpg',
    ],
  },
  {
    id: '22',
    name: 'Christmas stars 12 pieces',
    price: 6.95,
    stock: 34,
    collection: 2021,
    color: 'yellow',
    size: 10,
    favorite: false,
    category: 'Tree decorations',
    images: [
      '/assets/products/shatterproof-christmas-stars-10cm-champagne-12-pieces(1).jpg',
      '/assets/products/shatterproof-christmas-stars-10cm-champagne-12-pieces.jpg',
    ],
  },
];

export const cart = [
  {
    cartID: '10',
    itemNumber: 1,
    product: TEST_PRODUCTS[0],
    quantity: 1,
  },
  {
    cartID: '11',
    itemNumber: 2,
    product: TEST_PRODUCTS[1],
    quantity: 2,
  },
  {
    cartID: '12',
    itemNumber: 1,
    product: TEST_PRODUCTS[2],
    quantity: 1,
  },
  {
    cartID: '13',
    itemNumber: 1,
    product: TEST_PRODUCTS[3],
    quantity: 1,
  },
];

export const promocodes = {
  applied: [
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
  ],
  available: [
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
  ],
};

export const notSortingProduct = [
  {
    id: '16',
    name: 'Gingerbread House',
    price: 4.99,
    stock: 8,
    collection: 2023,
    color: 'brown',
    size: 9,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm.jpg',
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm (1).jpg',
    ],
  },
  {
    id: '20',
    name: 'Luxury Christmas bauble with ice flowers',
    price: 3.39,
    stock: 31,
    collection: 2021,
    color: 'yellow',
    size: 8,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl.jpg',
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl(1).jpg',
    ],
  },
  {
    id: '21',
    name: 'Onion Glass Bauble',
    price: 3.99,
    stock: 2,
    collection: 2023,
    color: 'yellow',
    size: 8,
    favorite: false,
    category: 'Tree decorations',
    images: [
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm.jpg',
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm(1).jpg',
    ],
  },
];

export const sortingProductByPriceAsk = [
  {
    id: '20',
    name: 'Luxury Christmas bauble with ice flowers',
    price: 3.39,
    stock: 31,
    collection: 2021,
    color: 'yellow',
    size: 8,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl.jpg',
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl(1).jpg',
    ],
  },
  {
    id: '21',
    name: 'Onion Glass Bauble',
    price: 3.99,
    stock: 2,
    collection: 2023,
    color: 'yellow',
    size: 8,
    favorite: false,
    category: 'Tree decorations',
    images: [
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm.jpg',
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm(1).jpg',
    ],
  },
  {
    id: '16',
    name: 'Gingerbread House',
    price: 4.99,
    stock: 8,
    collection: 2023,
    color: 'brown',
    size: 9,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm.jpg',
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm (1).jpg',
    ],
  },
];

export const sortingProductByPriceDesc = [
  {
    id: '16',
    name: 'Gingerbread House',
    price: 4.99,
    stock: 8,
    collection: 2023,
    color: 'brown',
    size: 9,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm.jpg',
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm (1).jpg',
    ],
  },
  {
    id: '21',
    name: 'Onion Glass Bauble',
    price: 3.99,
    stock: 2,
    collection: 2023,
    color: 'yellow',
    size: 8,
    favorite: false,
    category: 'Tree decorations',
    images: [
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm.jpg',
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm(1).jpg',
    ],
  },
  {
    id: '20',
    name: 'Luxury Christmas bauble with ice flowers',
    price: 3.39,
    stock: 31,
    collection: 2021,
    color: 'yellow',
    size: 8,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl.jpg',
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl(1).jpg',
    ],
  },
];

export const sortingProductByStockAsc = [
  {
    id: '21',
    name: 'Onion Glass Bauble',
    price: 3.99,
    stock: 2,
    collection: 2023,
    color: 'yellow',
    size: 8,
    favorite: false,
    category: 'Tree decorations',
    images: [
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm.jpg',
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm(1).jpg',
    ],
  },
  {
    id: '16',
    name: 'Gingerbread House',
    price: 4.99,
    stock: 8,
    collection: 2023,
    color: 'brown',
    size: 9,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm.jpg',
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm (1).jpg',
    ],
  },
  {
    id: '20',
    name: 'Luxury Christmas bauble with ice flowers',
    price: 3.39,
    stock: 31,
    collection: 2021,
    color: 'yellow',
    size: 8,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl.jpg',
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl(1).jpg',
    ],
  },
];

export const sortingProductByStockDesc = [
  {
    id: '20',
    name: 'Luxury Christmas bauble with ice flowers',
    price: 3.39,
    stock: 31,
    collection: 2021,
    color: 'yellow',
    size: 8,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl.jpg',
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl(1).jpg',
    ],
  },
  {
    id: '16',
    name: 'Gingerbread House',
    price: 4.99,
    stock: 8,
    collection: 2023,
    color: 'brown',
    size: 9,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm.jpg',
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm (1).jpg',
    ],
  },
  {
    id: '21',
    name: 'Onion Glass Bauble',
    price: 3.99,
    stock: 2,
    collection: 2023,
    color: 'yellow',
    size: 8,
    favorite: false,
    category: 'Tree decorations',
    images: [
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm.jpg',
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm(1).jpg',
    ],
  },
];

export const sortingProductByFavorite = [
  {
    id: '20',
    name: 'Luxury Christmas bauble with ice flowers',
    price: 3.39,
    stock: 31,
    collection: 2021,
    color: 'yellow',
    size: 8,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl.jpg',
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl(1).jpg',
    ],
  },
  {
    id: '16',
    name: 'Gingerbread House',
    price: 4.99,
    stock: 8,
    collection: 2023,
    color: 'brown',
    size: 9,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm.jpg',
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm (1).jpg',
    ],
  },
  {
    id: '21',
    name: 'Onion Glass Bauble',
    price: 3.99,
    stock: 2,
    collection: 2023,
    color: 'yellow',
    size: 8,
    favorite: false,
    category: 'Tree decorations',
    images: [
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm.jpg',
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm(1).jpg',
    ],
  },
];

export const sortingProductByName = [
  {
    id: '16',
    name: 'Gingerbread House',
    price: 4.99,
    stock: 8,
    collection: 2023,
    color: 'brown',
    size: 9,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm.jpg',
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm (1).jpg',
    ],
  },
  {
    id: '20',
    name: 'Luxury Christmas bauble with ice flowers',
    price: 3.39,
    stock: 31,
    collection: 2021,
    color: 'yellow',
    size: 8,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl.jpg',
      '/assets/products/luxury-glass-christmas-bauble-with-ice-flowers-8-cm-pearl(1).jpg',
    ],
  },
  {
    id: '21',
    name: 'Onion Glass Bauble',
    price: 3.99,
    stock: 2,
    collection: 2023,
    color: 'yellow',
    size: 8,
    favorite: false,
    category: 'Tree decorations',
    images: [
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm.jpg',
      '/assets/products/onion-glass-bauble-lampion-champagne-8-cm(1).jpg',
    ],
  },
];
