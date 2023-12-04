import { NEST_SERVICE_URL } from '@/helpers/constant';
import { Product } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${NEST_SERVICE_URL}`,
    mode: 'cors',
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `products`,
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Products', id })) : ['Products'],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
