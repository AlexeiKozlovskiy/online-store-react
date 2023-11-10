import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart';
import promocodeSlice from './promocode';
import authSlice from './auth';

import storage from 'redux-persist/lib/storage';
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

const rootReduser = combineReducers({
  cart: cartSlice,
  promocode: promocodeSlice,
  auth: authSlice,
  [productsApi.reducerPath]: productsApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['productsApi'],
};

const persistedReducer = persistReducer(persistConfig, rootReduser);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productsApi.middleware),
});

export const persistor = persistStore(store);
export default store;
