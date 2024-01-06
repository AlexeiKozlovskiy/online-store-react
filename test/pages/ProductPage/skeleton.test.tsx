import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { ProductPage } from '@/pages/ProductPage/ProductPage';

vi.mock('@/api/ProductsAPI', async () => {
  const mod = await vi.importActual('@/api/ProductsAPI');
  return {
    ...mod,
    useGetProductQuery: vi.fn(() => ({
      data: {},
      isFetching: true,
    })),
    useGetProductsQuery: vi.fn(() => ({
      data: [],
    })),
  };
});

describe('Skeleton components', () => {
  it('should be display skeleton in product page', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <ProductPage />
        </BrowserRouter>
      </Provider>
    );
    const breadCrumbSkeleton = screen.getByTestId('bread-crumb-skeleton');

    expect(breadCrumbSkeleton).toBeInTheDocument();
  });
});
