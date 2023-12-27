import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { rootState } from '@/store/store';
import { SearchPanel } from '@/components/SearchPanel/SearchPanel';

describe('Search input component', () => {
  it('update the input value', () => {
    render(
      <Provider store={rootState}>
        <SearchPanel />
      </Provider>
    );
    const inputElement = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'search value' } });
    expect(inputElement.value).toEqual('search value');
  });
});
