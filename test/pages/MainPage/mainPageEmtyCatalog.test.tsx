import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage/MainPage';
import {
  CATEGORIES_STOCK,
  COLLECTION_STOCK,
  COLOR_STOCK,
  PRICE_MAX,
  PRICE_MIN,
  SIZE_MAX,
  SIZE_MIN,
  STOCK_MAX,
  STOCK_MIN,
} from '@/helpers/constant';

vi.mock('react-redux', async () => {
  const mod = await vi.importActual('react-redux');
  return {
    ...mod,
    useSelector: vi
      .fn()
      .mockImplementationOnce(() => ({
        qweryParams: '?colors=black',
      }))
      .mockImplementation(() => ({
        balancerColor: COLOR_STOCK,
        balancerCollection: COLLECTION_STOCK,
        balancerCategory: CATEGORIES_STOCK,
        balanserPrise: [PRICE_MIN, PRICE_MAX],
        balanserSize: [SIZE_MIN, SIZE_MAX],
        balanserStock: [STOCK_MIN, STOCK_MAX],
      })),
  };
});

vi.mock('@/context/FiltersContext', async () => {
  const actual = await vi.importActual('@/context/FiltersContext');
  return {
    ...actual,
    useMyFiltersContext: vi.fn(() => ({
      emptyCatalog: true,
    })),
  };
});

describe('Main page, empty catalog', () => {
  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  global.ResizeObserver = ResizeObserverMock;

  it('should render "No items found" when emptyCatalog is true', () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    const noItemsFoundElement = screen.getByTestId('empty-catalog');

    expect(noItemsFoundElement).toBeInTheDocument();
    expect(screen.getByText('No items found')).toBeInTheDocument();
    expect(screen.getByText('Selected filters:')).toBeInTheDocument();
    expect(screen.getByText('Copy link')).toBeInTheDocument();
  });
});
