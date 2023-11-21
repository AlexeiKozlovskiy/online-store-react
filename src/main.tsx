import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App.tsx';
import '@/index.scss';
import { FiltersContextProvider } from '@/context/FiltersContext';
import { SortingsContextProvider } from '@/context/SortingsContext';
import { RemoveAllSelectedContextProvider } from '@/context/RemoveAllSelectedContext';
import { Provider } from 'react-redux';
import store, { persistor } from '@/reducers/store';
import { URLContextProvider } from '@/context/URLContext';
import { TotalPriceContextProvider } from '@/context/TotalPriseContext';
import { TotalItemsContextProvider } from '@/context/TotalItemsContext';
import { PersistGate } from 'redux-persist/integration/react';
import { UserContextProvider } from '@/context/UserContext';
import { CloseOpenModalsContextProvider } from '@/context/CloseOpenModalsContext';
import { ProfileUserContextProvider } from '@/context/ProfileUserContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <URLContextProvider>
            <FiltersContextProvider>
              <SortingsContextProvider>
                <RemoveAllSelectedContextProvider>
                  <TotalPriceContextProvider>
                    <TotalItemsContextProvider>
                      <CloseOpenModalsContextProvider>
                        <UserContextProvider>
                          <ProfileUserContextProvider>
                            <App />
                          </ProfileUserContextProvider>
                        </UserContextProvider>
                      </CloseOpenModalsContextProvider>
                    </TotalItemsContextProvider>
                  </TotalPriceContextProvider>
                </RemoveAllSelectedContextProvider>
              </SortingsContextProvider>
            </FiltersContextProvider>
          </URLContextProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
