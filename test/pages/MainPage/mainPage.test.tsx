import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { rootState } from '@/store/store';
import { App } from '@/App';
import { BrowserRouter } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage/MainPage';
import { URLContextProvider } from '@/context/URLContext';

describe('Main page', () => {
  const windowMock = {
    scrollTo: vi.fn(),
  };
  Object.assign(global, global, windowMock);

  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  global.ResizeObserver = ResizeObserverMock;

  it('should render Main page', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Find Christmas decorations/i)).toBeInTheDocument();
  });

  it('should changes input search', async () => {
    const testSearchValue = 'test value';

    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    const input: HTMLInputElement = screen.getByPlaceholderText('Search...');

    fireEvent.change(input, { target: { value: testSearchValue } });

    expect(input.value).toBe(testSearchValue);
  });

  it('should changes show items view, (left select)', async () => {
    const { getByText, getAllByRole } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );
    expect(getByText('Show items: 20')).toBeInTheDocument();

    const customSelect = getAllByRole('combobox');

    fireEvent.change(customSelect[1], { target: { value: '5', label: 'Show items: 5' } });

    expect(getByText('Show items: 5')).toBeInTheDocument();

    fireEvent.change(customSelect[1], { target: { value: '10', label: 'Show items: 10' } });

    expect(getByText('Show items: 10')).toBeInTheDocument();

    fireEvent.change(customSelect[1], { target: { value: 'all', label: 'All' } });

    expect(getByText('All')).toBeInTheDocument();
  });

  it('should changed sorting view option, (right select)', () => {
    const { getByText, getAllByRole } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    const select = getAllByRole('combobox')[0];

    fireEvent.change(select, {
      target: { value: 'price-asc', label: 'Price ascending' },
    });

    expect(getByText('Price ascending')).toBeInTheDocument();

    fireEvent.change(select, {
      target: { value: 'stock-asc', label: 'Stock ascending' },
    });

    expect(getByText('Stock ascending')).toBeInTheDocument();
  });

  it('should changed row/block view', () => {
    const { getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <URLContextProvider>
            <MainPage />
          </URLContextProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(getByTestId('switch-view__row').className).not.include('switch-active');
    expect(getByTestId('switch-view__block').className).include('switch-active');

    fireEvent.click(getByTestId('switch-view__row'));

    expect(getByTestId('switch-view__row').className).include('switch-active');
    expect(getByTestId('switch-view__block').className).not.include('switch-active');

    fireEvent.click(getByTestId('switch-view__block'));

    expect(getByTestId('switch-view__row').className).not.include('switch-active');
    expect(getByTestId('switch-view__block').className).include('switch-active');
  });

  it('should view filter panel on click showFilters button', async () => {
    window.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: query === '(max-width: 767px)',
        addListener: vi.fn(),
        removeListener: vi.fn(),
      };
    });

    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    const filterPanel = screen.getByTestId('filterPanel');
    const showFilterButton = screen.getByTestId('showFilterButton');

    expect(filterPanel).toHaveAttribute('data-show', 'false');

    fireEvent.click(showFilterButton);

    expect(filterPanel).toHaveAttribute('data-show', 'true');

    const buttonColor = screen.getByTestId('button-color-red');
    fireEvent.click(buttonColor);

    const crossBtn = screen.getByTestId('crossBtn');
    fireEvent.click(crossBtn);

    expect(filterPanel).toHaveAttribute('data-show', 'false');
  });

  it('should renders app', () => {
    class ResizeObserverMock {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    global.ResizeObserver = ResizeObserverMock;

    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Find Christmas decorations/i)).toBeInTheDocument();
  });
});
