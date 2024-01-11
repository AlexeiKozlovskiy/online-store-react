import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage/MainPage';

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

  it('should display filter panel on click showFilters button', async () => {
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

  it('should changes show items view', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Show items: 20')).toBeInTheDocument();

    const customSelect = screen.getAllByRole('combobox');

    fireEvent.change(customSelect[1], { target: { value: '5', label: 'Show items: 5' } });

    expect(screen.getByText('Show items: 5')).toBeInTheDocument();

    fireEvent.change(customSelect[1], { target: { value: '10', label: 'Show items: 10' } });

    expect(screen.getByText('Show items: 10')).toBeInTheDocument();
  });
});
