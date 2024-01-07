import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage/MainPage';

describe('Main page', () => {
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
});
