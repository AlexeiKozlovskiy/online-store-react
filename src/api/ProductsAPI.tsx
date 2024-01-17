import { API_ROUTES, NEST_SERVICE_URL } from '@/helpers/constant';
import { Product } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: NEST_SERVICE_URL,
    mode: 'cors',
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string>({
      query: (qweryParams) => `${API_ROUTES.PODUCTS}?${qweryParams}`,
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Products', id })) : ['Products'],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `${API_ROUTES.PODUCTS}/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productsApi;
