import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { rootState } from '@/store/store';
import { BrowserRouter } from 'react-router-dom';
import { Page404 } from '@/pages/Page404/Page404';

describe('Page 404', () => {
  it('should render the Page 404', async () => {
    render(
      <Provider store={rootState}>
        <BrowserRouter>
          <Page404 />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Whoops!')).toBeInTheDocument();
  });
});
