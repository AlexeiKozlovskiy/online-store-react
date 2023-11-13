import { BASE_URL } from '@/helpers/constant';
import { Product } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    mode: 'cors',
  }),
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
