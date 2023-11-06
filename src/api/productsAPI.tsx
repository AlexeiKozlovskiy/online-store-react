import { baseUrl } from '@/helpers/constant';
import { Product } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IUser {
  idUser: string | null;
  accessToken: string | null;
}

interface UseData {
  id: string;
  email: string;
  name: string;
}

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    mode: 'cors',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `/products`,
    }),

    getProduct: builder.query<Product, string>({
      query: (id: string) => ({ url: `/products/${id}` }),
    }),

    getUser: builder.query<UseData, IUser>({
      query: ({ idUser, accessToken }) => ({
        url: `/user/${idUser}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery, useGetUserQuery } = productsApi;
