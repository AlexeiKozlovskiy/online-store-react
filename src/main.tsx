import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App.tsx';
import '@/index.scss';
import { IdClickProvider } from '@/components/Context/ClickIDContext';
import { FiltersContextProvider } from '@/components/Context/FiltersContext';
import { Provider } from 'react-redux';
import store from '@/components/reducers/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <FiltersContextProvider>
          <IdClickProvider>
            <App />
          </IdClickProvider>
        </FiltersContextProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
