import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart';
import promocodeSlice from './promocode';
import authSlice from './auth';
import chosenProductSlise from './chosenProduct';
import productsQweryParamsSlise from './productsQweryParams';
import balansersFiltersSlise from './balansersFilters';

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
import storage from 'redux-persist/lib/storage';
// import sessionStorage from 'redux-persist/lib/storage/session';

const rootReduser = combineReducers({
  cart: cartSlice,
  promocode: promocodeSlice,
  auth: authSlice,
  chosenProduct: chosenProductSlise,
  productsQweryParams: productsQweryParamsSlise,
  balansersFilters: balansersFiltersSlise,
  [productsApi.reducerPath]: productsApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['productsApi', 'productsQweryParams'],
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
