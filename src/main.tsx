import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/App.tsx';
import '@/index.scss';
import { FiltersContextProvider } from '@/context/FiltersContext';
import { SortingsContextProvider } from '@/context/SortingsContext';
import { RemoveAllSelectedContextProvider } from '@/context/RemoveAllSelectedContext';
import { Provider } from 'react-redux';
import store from '@/reducers/store';
import { URLContextProvider } from '@/context/URLContext';
import { TotalPriceContextProvider } from '@/context/TotalPriseContext';
import { TotalItemsContextProvider } from '@/context/TotalItemsContext';
// import { PersistGate } from 'redux-persist/integration/react';
import { UserContextProvider } from '@/context/UserContext';
import { CloseOpenModalsContextProvider } from '@/context/CloseOpenModalsContext';
import { ProfileUserContextProvider } from '@/context/ProfileUserContext';
import { HydrationProvider } from 'react-hydration-provider';

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <Provider store={store}>
      <HydrationProvider>
        {/* <PersistGate loading={null} persistor={persistor}> */}
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
        {/* </PersistGate> */}
      </HydrationProvider>
    </Provider>
  </StrictMode>
);
