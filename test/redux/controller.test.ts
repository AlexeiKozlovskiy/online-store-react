import { describe, expect, it } from 'vitest';
import store from '@/store/store';
import {
  addProductToCart,
  applyPromocode,
  clearAuthParams,
  clearChosenProduct,
  isPromocodeAvailable,
  removeAllCart,
  removeAllProductsFromCart,
  removeProductFromCart,
  removePromocode,
  setAuthParams,
  setChosenProduct,
  setProductsQuantityInCart,
} from '@/store/controller';

describe('Controller redux functions', () => {
  describe('Cart functions', () => {
    const products = [
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
    ];

    it('should add a product to the cart', async () => {
      const id = '16';
      const fakeId = '333';

      addProductToCart(fakeId, products);
      const updatedState = store.getState().cart;

      expect(updatedState.length).toBe(0);

      addProductToCart(id, products);
      const updatedStateTwo = store.getState().cart;

      expect(updatedStateTwo.length).toBe(1);
      expect(updatedStateTwo[0].product).toHaveProperty('name', 'Gingerbread House');
    });

    it('should remove one item a product from the cart', () => {
      const id = '16';
      const fakeId = '444';

      removeProductFromCart(id, products);
      const removeStateTwo = store.getState().cart;

      expect(removeStateTwo.length).toBe(0);

      removeProductFromCart(fakeId, products);
      const removeState = store.getState().cart;

      expect(removeState.length).toBe(0);
    });

    it('should add a quantity product to the cart', async () => {
      const id = '17';
      const fakeId = '444';
      const quantity = 10;

      setProductsQuantityInCart(id, quantity, products);
      const updatedState = store.getState().cart;

      expect(updatedState.length).toBe(1);
      expect(updatedState[0].quantity).toBe(10);
      expect(updatedState[0].product).toHaveProperty('name', 'LED lights warm');

      setProductsQuantityInCart(fakeId, quantity, products);
      const updatedStateTwo = store.getState().cart;

      expect(updatedStateTwo.length).toBe(1);
    });

    it('should remove all item product from the cart', () => {
      const id = '17';
      const fakeId = '555';

      removeAllProductsFromCart(id, products);
      const removeState = store.getState().cart;

      expect(removeState.length).toBe(0);

      removeAllProductsFromCart(fakeId, products);
      const removeStateTwo = store.getState().cart;

      expect(removeStateTwo.length).toBe(0);
    });

    it('should remove all cart', () => {
      const PRODUCT_ONE = {
        id: '16',
        quantity: 10,
      };
      const PRODUCT_TWO = {
        id: '17',
        quantity: 15,
      };

      setProductsQuantityInCart(PRODUCT_ONE.id, PRODUCT_ONE.quantity, products);
      setProductsQuantityInCart(PRODUCT_TWO.id, PRODUCT_TWO.quantity, products);

      const updatedState = store.getState().cart;

      expect(updatedState.length).toBe(2);
      expect(updatedState[0].quantity).toBe(10);
      expect(updatedState[0].product).toHaveProperty('name', 'Gingerbread House');
      expect(updatedState[1].quantity).toBe(15);
      expect(updatedState[1].product).toHaveProperty('name', 'LED lights warm');

      removeAllCart();
      const removeState = store.getState().cart;

      expect(removeState.length).toBe(0);
    });
  });

  describe('Promocode functions', () => {
    const promocodeName = 'NEW-YEAR-2024';
    const somePromocode = 'SOME-PROMOCODE';
    const PROMOCODE = {
      id: 1,
      name: 'NEW-YEAR-2024',
      discount: 7,
    };
    const { id, name } = PROMOCODE;

    it('should promo code is available', async () => {
      expect(isPromocodeAvailable(promocodeName)).toBeTruthy();
      expect(isPromocodeAvailable(somePromocode)).toBeFalsy();
    });

    it('should apply promocode', async () => {
      expect(isPromocodeAvailable(name)).toBeTruthy();

      applyPromocode(somePromocode);
      const updatedState = store.getState().promocode;
      expect(updatedState.applied.length).toBe(0);

      applyPromocode(name);
      const updatedStateTwo = store.getState().promocode;

      expect(updatedStateTwo.applied.length).toBe(1);
      expect(updatedStateTwo.applied[0]).toHaveProperty('name', 'NEW-YEAR-2024');
    });

    it('should remove promocode', async () => {
      const fakeId = 555;

      removePromocode(fakeId);
      const removeStateTwo = store.getState().promocode;

      expect(removeStateTwo.applied.length).toBe(1);

      removePromocode(id);
      const removeState = store.getState().promocode;

      expect(removeState.applied.length).toBe(0);
    });
  });

  describe('Auth functions', () => {
    const AUTH_PARAMS = {
      accessToken: 'some_access_token',
      refreshToken: 'some_refresh_token',
      expiresIn: 'some_expires_in',
      idUser: 'some_id_user',
      authenticated: true,
    };

    it('should set AuthUser', async () => {
      setAuthParams(AUTH_PARAMS);
      const updatedState = store.getState();

      expect(updatedState.auth).toHaveProperty('accessToken', 'some_access_token');
      expect(updatedState.auth).toHaveProperty('idUser', 'some_id_user');
    });

    it('should remove AuthUser', async () => {
      clearAuthParams();
      const removeState = store.getState();

      expect(removeState.auth.accessToken).toBeNull();
      expect(removeState.auth.idUser).toBeNull();
    });
  });

  describe('Chosen product functions', () => {
    const CHOSEN_PRODUCT = {
      id: 'b1e9703b-420a-4a04-939f-8e46510d619d',
      name: 'Blowfish Glass',
    };

    it('should add to chosen product', async () => {
      setChosenProduct(CHOSEN_PRODUCT);
      const updatedState = store.getState().chosenProduct;

      expect(updatedState).toHaveProperty('name', 'Blowfish Glass');
    });

    it('should remove from chosen product', async () => {
      clearChosenProduct();
      const removeState = store.getState().chosenProduct;

      expect(removeState.id).toBeNull();
      expect(removeState.name).toBeNull();
    });
  });
});
