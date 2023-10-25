import { Product } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// закинуть в env
export const baseUrl = 'https://online-store-api-7fyt.onrender.com';
// export const baseUrl = 'http://localhost:4000/';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}`, mode: 'cors' }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `/products`,
    }),

    getProduct: builder.query<Product, string>({
      query: (id: string) => ({ url: `/products/${id}` }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
