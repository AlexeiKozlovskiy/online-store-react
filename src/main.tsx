import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App.tsx';
import '@/index.scss';
import { IdClickProvider } from '@/components/Context/ClickIDContext';
import { FiltersContextProvider } from '@/components/Context/FiltersContext';
import { SortingsContextProvider } from '@/components/Context/SortingsContext';
import { RemoveFiltSortContextProvider } from '@/components/Context/RemoveFiltSortContext';
// import { URLComponent } from '@/components/helpers/URL/URLComponent';
import { Provider } from 'react-redux';
import store from '@/components/reducers/store';
import { URLContextProvider } from '@/components/Context/URLContext';
// import { URLUpdate } from './components/helpers/URL/URLUpdate';
// import { URLset } from './components/helpers/URL/URLset';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <URLContextProvider>
          <FiltersContextProvider>
            <SortingsContextProvider>
              <RemoveFiltSortContextProvider>
                <IdClickProvider>
                  <App />
                </IdClickProvider>
              </RemoveFiltSortContextProvider>
            </SortingsContextProvider>
          </FiltersContextProvider>
        </URLContextProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
