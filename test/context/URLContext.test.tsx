import { URLContextProvider, useMyURLContext } from '@/context/URLContext';
import { describe, expect, it } from 'vitest';
import { rootState } from '@/store/store';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SelectedFilters } from '@/types/types';

describe('url context', () => {
  it('renders the context provider', () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <URLContextProvider>
            <div>Test component</div>
          </URLContextProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Test component')).toBeInTheDocument();
  });

  it('updates selectedFilters when changes product filters', async () => {
    const testSelectedFilters: SelectedFilters = {
      colorsSelected: ['red, black'],
      collectionsSelected: [2023],
      categorySelected: ['Do It Yourself'],
      priceSelected: [9, 30],
      sizeSelected: [20, 500],
      stockSelected: [3, 40],
    };

    const TestComponent = () => {
      const { isEmptyFilters, selectedFilters, setSelectedFilters } = useMyURLContext();

      return (
        <div>
          <button
            onClick={() => setSelectedFilters(testSelectedFilters)}
            data-testid="updateSelectedFilters"
          ></button>
          <div data-testid="selectedFiltersValue">{JSON.stringify(selectedFilters)}</div>
          <div data-testid="emptyFiltersValue">
            {isEmptyFilters ? 'no filters selected' : 'some filters is selected'}
          </div>
        </div>
      );
    };

    const { getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <URLContextProvider>
            <TestComponent />
          </URLContextProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(getByTestId('emptyFiltersValue').textContent).toBe('no filters selected');

    fireEvent.click(getByTestId('updateSelectedFilters'));

    expect(getByTestId('emptyFiltersValue').textContent).toBe('some filters is selected');
    expect(getByTestId('selectedFiltersValue').textContent).toBe(
      JSON.stringify(testSelectedFilters)
    );
  });

  it('updates sortindViewOption when view option changes', async () => {
    const testSortindViewOption = { value: 'price-desc', label: 'Price descending' };

    const TestComponent = () => {
      const { sortindViewOption, setSortindViewOption } = useMyURLContext();

      return (
        <div>
          <button
            onClick={() => setSortindViewOption(testSortindViewOption)}
            data-testid="updateSortOption"
          ></button>
          <div data-testid="urlSortOptionValue">{JSON.stringify(sortindViewOption)}</div>
        </div>
      );
    };

    const { getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <URLContextProvider>
            <TestComponent />
          </URLContextProvider>
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(getByTestId('updateSortOption'));

    expect(getByTestId('urlSortOptionValue').textContent).toBe(
      JSON.stringify(testSortindViewOption)
    );
  });

  it('updates inputSearchURL when changes search input', async () => {
    const testSearch = 'test value';

    const TestComponent = () => {
      const { inputSearchURL, setInputSearchURL } = useMyURLContext();

      return (
        <div>
          <input
            type="search"
            onClick={() => setInputSearchURL(testSearch)}
            data-testid="searchInput"
          />
          <div data-testid="urlSearchValue">{inputSearchURL}</div>
        </div>
      );
    };

    const { getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <URLContextProvider>
            <TestComponent />
          </URLContextProvider>
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(getByTestId('searchInput'));

    expect(getByTestId('urlSearchValue').textContent).toBe(testSearch);
  });

  it('updates curPageMain when changes pagination main', async () => {
    const testCurPageMain = 5;

    const TestComponent = () => {
      const { curPageMain, setCurPageMain } = useMyURLContext();

      return (
        <div>
          <button
            onClick={() => setCurPageMain(testCurPageMain)}
            data-testid="updateCurPageMain"
          ></button>
          <div data-testid="curPageMainValue">{curPageMain}</div>
        </div>
      );
    };

    const { getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <URLContextProvider>
            <TestComponent />
          </URLContextProvider>
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId('curPageMainValue').textContent).toBe('1');

    fireEvent.click(getByTestId('updateCurPageMain'));

    expect(getByTestId('curPageMainValue').textContent).toBe(testCurPageMain.toString());
  });

  it('updates perMainPageOption when changes page option on main', async () => {
    const testPerMainPageOption = { value: '5', label: 'Show items: 5' };

    const TestComponent = () => {
      const { perMainPageOption, setPerMainPageOption } = useMyURLContext();

      return (
        <div>
          <button
            onClick={() => setPerMainPageOption(testPerMainPageOption)}
            data-testid="updatePerMainPageOption"
          ></button>
          <div data-testid="perMainPageOptionValue">{JSON.stringify(perMainPageOption)}</div>
        </div>
      );
    };

    const { getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <URLContextProvider>
            <TestComponent />
          </URLContextProvider>
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(getByTestId('updatePerMainPageOption'));

    expect(getByTestId('perMainPageOptionValue').textContent).toBe(
      JSON.stringify(testPerMainPageOption)
    );

    const { getAllByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <URLContextProvider>
            <TestComponent />
          </URLContextProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(getAllByTestId('perMainPageOptionValue')[0].textContent).toBe(
      JSON.stringify(testPerMainPageOption)
    );
  });

  it('updates setCurPageCart when changes pagination cart', async () => {
    const testCurPageCart = 4;
    window.history.pushState({}, 'Page Title', '/cart');

    const TestComponent = () => {
      const { cartUrl, curPageCart, setCurPageCart } = useMyURLContext();

      return (
        <div>
          <button
            onClick={() => setCurPageCart(testCurPageCart)}
            data-testid="updateCurPageCart"
          ></button>
          <div data-testid="curPageCartValue">{curPageCart}</div>
          <div data-testid="cartUrlValue">{cartUrl}</div>
        </div>
      );
    };

    const { getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <URLContextProvider>
            <TestComponent />
          </URLContextProvider>
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId('cartUrlValue').textContent).toBe('/cart');
    expect(getByTestId('curPageCartValue').textContent).toBe('1');

    fireEvent.click(getByTestId('updateCurPageCart'));

    expect(getByTestId('curPageCartValue').textContent).toBe(testCurPageCart.toString());
    expect(getByTestId('cartUrlValue').textContent).toBe('/cart?page=4');

    const { getAllByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <URLContextProvider>
            <TestComponent />
          </URLContextProvider>
        </BrowserRouter>
      </Provider>
    );
    expect(getAllByTestId('curPageCartValue')[1].textContent).toBe(testCurPageCart.toString());
  });

  it('updates setPerCartPageOption when changes page option on cart', async () => {
    const testPerCartPageOption = { value: '10', label: 'Show items: 10' };
    window.history.pushState({}, 'Page Title', '/cart');

    const TestComponent = () => {
      const { cartUrl, perCartPageOption, setPerCartPageOption } = useMyURLContext();

      return (
        <div>
          <button
            onClick={() => setPerCartPageOption(testPerCartPageOption)}
            data-testid="updatePerCartPageOption"
          ></button>
          <div data-testid="perCartPageOptionValue">{JSON.stringify(perCartPageOption)}</div>
          <div data-testid="cartUrlValue">{cartUrl}</div>
        </div>
      );
    };

    const { getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <URLContextProvider>
            <TestComponent />
          </URLContextProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(getByTestId('cartUrlValue').textContent).toBe('/cart');

    fireEvent.click(getByTestId('updatePerCartPageOption'));

    expect(getByTestId('perCartPageOptionValue').textContent).toBe(
      JSON.stringify(testPerCartPageOption)
    );
    expect(getByTestId('cartUrlValue').textContent).toBe('/cart?page=1&perPage=10');
  });

  it('updates swichedView when changes row/block view', async () => {
    const testSwichedView = 'row';

    const TestComponent = () => {
      const { swichedView, setSwichedView } = useMyURLContext();

      return (
        <div>
          <button
            onClick={() => setSwichedView(testSwichedView)}
            data-testid="updateSwichedView"
          ></button>
          <div data-testid="swichedViewValue">{swichedView}</div>
        </div>
      );
    };

    const { getByTestId } = render(
      <Provider store={rootState}>
        <BrowserRouter>
          <URLContextProvider>
            <TestComponent />
          </URLContextProvider>
        </BrowserRouter>
      </Provider>
    );
    expect(getByTestId('swichedViewValue').textContent).toBe('block');

    fireEvent.click(getByTestId('updateSwichedView'));

    expect(getByTestId('swichedViewValue').textContent).toBe('row');
  });
});
