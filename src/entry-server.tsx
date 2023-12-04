import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { App } from './App';
import store from '@/reducers/store';
import { renderToString } from 'react-dom/server';
import { StrictMode } from 'react';

export const render = (url: string) => {
  return renderToString(
    <StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </StrictMode>
  );
};
