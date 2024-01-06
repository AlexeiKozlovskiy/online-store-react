import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { CartPage } from '@/pages/CartPage/CartPage';
// import configureStore from 'redux-mock-store';
// import { addProductToCart } from '@/store/controller';
// import { products } from '../../testsData';

// TODO: think about ssr in tests

// vi.mock('@/hooks/CartPaginationHook', async () => {
//   const mod = await vi.importActual('@/hooks/CartPaginationHook');
//   return {
//     ...mod,
//     useCartPaginationHook: vi.fn(() => ({
//       currentItems: [
//         {
//           cartID: 'testID',
//           itemNumber: 1,
//           product: products[1],
//           quantity: 10,
//         },
//       ],
//     })),
//   };
// });

// vi.mock('@/context/URLContext', async () => {
//   const mod = await vi.importActual('@/context/URLContext');
//   return {
//     ...mod,
//     useMyURLContext: vi.fn(() => ({
//       perCartPageOption: {
//         value: '1',
//         label: 'Show items: 1',
//       },
//     })),
//   };
// });

// vi.mock('react-redux', async () => {
//   const mod = await vi.importActual('react-redux');
//   return {
//     ...mod,
//     useSelector: vi.fn(() => [
//       {
//         cartID: 'testID',
//         itemNumber: 1,
//         product: products[1],
//         quantity: 10,
//       },
//     ]),
//   };
// });

describe('Cart page', () => {
  it('should render Cart page', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <CartPage />
        </BrowserRouter>
      </Provider>,
      {
        hydrate: false,
      }
    );
    expect(screen.getByText('SHOPPING CART')).toBeInTheDocument();

    // await waitFor(() => {
    // expect(screen.getByText(/You have no items in your shopping cart./i)).toBeInTheDocument();
    // });
    // const id = '16';
    // addProductToCart(id, products);
    // expect(screen.getByText('Gingerbread House')).toBeInTheDocument();
    // expect(screen.getByText('$4.99')).toBeInTheDocument();
  });

  // it('should call setPerCartPageOption when CustomSelect value changes', () => {
  // const id = '16';
  // addProductToCart(id, products);
  // render(
  //   <Provider store={rootState}>
  //     <BrowserRouter>
  //       <CartPage />
  //     </BrowserRouter>
  //   </Provider>
  // );
  // expect(screen.getByText(/Show items: 1/i)).toBeInTheDocument();
  // const selectElement = getByTestId('custom-select'); // Assuming you have a data-testid attribute
  // fireEvent.change(selectElement, { target: { value: '1', label: 'Show items: 1' } });
  // });
});
