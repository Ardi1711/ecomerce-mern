

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

//  Krijohen API slice-in me RTK Query
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    // 🔐 Perfshije token ne secilen kerkese
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        // 🎫 Shto token ne Authorization header
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({
    // 🔐 AUTENTIFIKIMI
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials
      })
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    getProfile: builder.query({
      query: () => '/auth/profile'
    }),

    // 📦 PRODUKTET
    getProducts: builder.query({
      query: ({ category, search } = {}) => {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (search) params.append('search', search);
        return `/products?${params.toString()}`;
      },
      providesTags: ['Product']
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ['Product']
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product
      }),
      invalidatesTags: ['Product']
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: updates
      }),
      invalidatesTags: ['Product']
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Product']
    }),

    // 🛒 POROSITE
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/orders',
        method: 'POST',
        body: order
      }),
      invalidatesTags: ['Order']
    }),
    getOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Order']
    }),
    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: ['Order']
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: 'PUT',
        body: { status }
      }),
      invalidatesTags: ['Order']
    })
  })
});

// 🎣 EKSPORTIM I HOOKS-EVE
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation
} = apiSlice;
