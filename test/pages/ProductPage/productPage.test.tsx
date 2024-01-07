import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import store, { rootState } from '@/store/store';
import { ProductPage } from '@/pages/ProductPage/ProductPage';
import { BrowserRouter } from 'react-router-dom';
import { CartPage } from '@/pages/CartPage/CartPage';

// const chosenProduct = {
//   id: '49a964f1-c6f0-4c41-821d-aa52c8ccf31d',
//   name: 'Nutcracker',
// };

const testingProduct = {
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

const products = [
  {
    id: '15',
    name: 'Nutcracker',
    price: 10,
    stock: 25,
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
    price: 5,
    stock: 8,
    collection: 2023,
    color: 'brown',
    size: 9,
    favorite: true,
    category: 'Tree decorations',
    images: [
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm.jpg',
      '/assets/products/glass-christmas-ornament-gingerbread-house-gold-9-cm(1).jpg',
    ],
  },
  {
    id: '17',
    name: 'LED lights warm',
    price: 9,
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
];

vi.mock('@/hooks/AnimationsHook', async () => {
  const mod = await vi.importActual('@/hooks/AnimationsHook');
  return {
    ...mod,
    useAnimations: vi.fn(() => ({
      isShake: true,
    })),
  };
});

vi.mock('@/api/ProductsAPI', async () => {
  const mod = await vi.importActual('@/api/ProductsAPI');
  return {
    ...mod,
    useGetProductQuery: vi.fn(() => ({
      data: testingProduct,
      isFetching: false,
    })),
    useGetProductsQuery: vi.fn(() => ({
      data: products,
    })),
  };
});

describe('ProductPage', () => {
  it('should render the product page with the selected product', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <ProductPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(testingProduct.name)).toBeInTheDocument();
    expect(screen.getByText(testingProduct.id.slice(-5))).toBeInTheDocument();
    expect(screen.getByText(testingProduct.price)).toBeInTheDocument();

    const stockRow = screen.getByTestId('shake-product');

    expect(stockRow.className).include('shake-product');
  });

  it('should shake product if his quantity greater than stock', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <ProductPage />
        </BrowserRouter>
      </Provider>
    );

    const stockRow = screen.getByTestId('shake-product');

    expect(stockRow.className).include('shake-product');
  });

  it('should changes main images', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <ProductPage />
        </BrowserRouter>
      </Provider>
    );
    const mainImage = screen.getByAltText('product-image-main') as HTMLImageElement;
    const imagesOne = screen.getByAltText('product-image-one') as HTMLImageElement;
    const imagesTwo = screen.getByAltText('product-image-two') as HTMLImageElement;

    expect(mainImage).toBeInTheDocument();
    expect(imagesOne).toBeInTheDocument();
    expect(imagesTwo).toBeInTheDocument();

    fireEvent.click(imagesTwo);

    expect(mainImage.src).include(testingProduct.images[1]);

    fireEvent.click(imagesOne);

    expect(mainImage.src).include(testingProduct.images[0]);
  });

  it('should add to cart', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <ProductPage />
        </BrowserRouter>
      </Provider>
    );
    const buttonAdd = screen.getByTestId('button-add-cart');
    fireEvent.click(buttonAdd);
    const updatedState = store.getState().cart;

    expect(buttonAdd).toBeInTheDocument();
    expect(updatedState.length).toBe(1);
    expect(updatedState[0].product).toHaveProperty('name', testingProduct.name);
  });

  it('should add to cart and go to cart if pressed buy now btn', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <ProductPage />
          <CartPage />
        </BrowserRouter>
      </Provider>
    );
    const buttonBuyNow = screen.getByTestId('button-buy-now');
    fireEvent.click(buttonBuyNow);
    const updatedState = store.getState().cart;

    expect(updatedState.length).toBe(1);
    expect(updatedState[0].product).toHaveProperty('name', testingProduct.name);

    expect(screen.getByText('SHOPPING CART')).toBeInTheDocument();
    expect(screen.getAllByText(testingProduct.name)[0]).toBeInTheDocument();
    expect(screen.getAllByText(testingProduct.color)[0]).toBeInTheDocument();
  });
});
