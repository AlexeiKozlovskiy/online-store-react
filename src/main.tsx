import './index.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/App.tsx';
import { FiltersContextProvider } from '@/context/FiltersContext';
import { SortingsContextProvider } from '@/context/SortingsContext';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { URLContextProvider } from '@/context/URLContext';
import { UserAuthContextProvider } from '@/context/UserAuthContext';
import { CloseOpenModalsContextProvider } from '@/context/CloseOpenModalsContext';
import { ProfileUserContextProvider } from '@/context/ProfileUserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { FavoritesContextProvider } from '@/context/FavoritesContext';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <URLContextProvider>
            <FiltersContextProvider>
              <SortingsContextProvider>
                <CloseOpenModalsContextProvider>
                  <UserAuthContextProvider>
                    <ProfileUserContextProvider>
                      <FavoritesContextProvider>
                        <App />
                      </FavoritesContextProvider>
                    </ProfileUserContextProvider>
                  </UserAuthContextProvider>
                </CloseOpenModalsContextProvider>
              </SortingsContextProvider>
            </FiltersContextProvider>
          </URLContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
