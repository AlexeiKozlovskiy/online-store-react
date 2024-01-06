import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { CartPage } from '@/pages/CartPage/CartPage';

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
  });
});
