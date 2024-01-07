import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { CartPage } from '@/pages/CartPage/CartPage';
import { products } from '../../testsData';
import { addProductToCart } from '@/store/controller';

// const mockSetPerCartPageOption = vi.fn();

// vi.mock('@/context/URLContext', async () => {
//   const mod = await vi.importActual('@/context/URLContext');
//   return {
//     ...mod,
//     useMyURLContext: vi.fn(() => ({
//       perCartPageOption: { value: '1', label: 'Show items: 1' },
//       setPerCartPageOption: mockSetPerCartPageOption,
//     })),
//   };
// });

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
//           quantity: 1,
//         },
//       ],
//     })),
//   };
// });

describe('Cart page', () => {
  it('should render Cart page', async () => {
    const id = '16';
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <CartPage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('SHOPPING CART')).toBeInTheDocument();
    expect(screen.getByText(/You have no items in your shopping cart./i)).toBeInTheDocument();
    act(() => {
      addProductToCart(id, products);
    });
    expect(screen.getByText('Gingerbread House')).toBeInTheDocument();
    expect(screen.getAllByText('$4.99')[0]).toBeInTheDocument();
  });

  it('should changes show items view', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <CartPage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Show items: 3')).toBeInTheDocument();

    const customSelect = screen.getByRole('combobox');
    fireEvent.change(customSelect, { target: { value: '5', label: 'Show items: 5' } });

    expect(screen.getByText('Show items: 5')).toBeInTheDocument();

    fireEvent.change(customSelect, { target: { value: '1', label: 'Show items: 1' } });

    expect(screen.getByText('Show items: 1')).toBeInTheDocument();
  });

  // it('should changes Show items view', async () => {
  //   const id = '16';
  //   render(
  //     <Provider store={rootState}>
  //       <BrowserRouter>
  //         <CartPage />
  //       </BrowserRouter>
  //     </Provider>
  //   );
  //   act(() => {
  //     addProductToCart(id, products);
  //   });
  //   const customSelect = screen.getByRole('combobox');

  //   fireEvent.change(customSelect, { target: { value: '5', label: 'Show items: 5' } });

  //   expect(screen.getByText('Show items: 5')).toBeInTheDocument();

  //   fireEvent.change(customSelect, { target: { value: '1', label: 'Show items: 1' } });
  //   expect(screen.getByText('Show items: 1')).toBeInTheDocument();
  //   expect(mockSetPerCartPageOption).toHaveBeenCalled();
  // });
});
