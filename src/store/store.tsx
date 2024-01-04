import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart';
import promocodeSlice from './promocode';
import authSlice from './auth';
import chosenProductSlise from './chosenProduct';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { productsApi } from '@/api/ProductsAPI';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const rootReduser = combineReducers({
  cart: cartSlice,
  promocode: promocodeSlice,
  auth: authSlice,
  chosenProduct: chosenProductSlise,
  [productsApi.reducerPath]: productsApi.reducer,
});

export function createPersistStorage() {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem(_key: string, value: string) {
        return Promise.resolve(value);
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage('local');
}

const persistConfig = {
  key: 'root',
  storage: createPersistStorage(),
  blacklist: ['productsApi'],
};

const persistedReducer = persistReducer(persistConfig, rootReduser);

export const rootState = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    ...[productsApi.middleware],
  ],
});

export const persistor = persistStore(rootState);

export default rootState;
