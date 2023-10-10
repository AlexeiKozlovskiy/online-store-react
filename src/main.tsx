import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App.tsx';
import '@/index.scss';
import { IdClickProvider } from '@/components/Context/ClickIDContext';
import { FiltersContextProvider } from '@/components/Context/FiltersContext';
import { SortingsContextProvider } from '@/components/Context/SortingsContext';
import { RemoveAllSelectedContextProvider } from '@/components/Context/RemoveAllSelectedContext';
import { Provider } from 'react-redux';
import store, { persistor } from '@/components/reducers/store';
import { URLContextProvider } from '@/components/Context/URLContext';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <URLContextProvider>
            <FiltersContextProvider>
              <SortingsContextProvider>
                <RemoveAllSelectedContextProvider>
                  <IdClickProvider>
                    <App />
                  </IdClickProvider>
                </RemoveAllSelectedContextProvider>
              </SortingsContextProvider>
            </FiltersContextProvider>
          </URLContextProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
