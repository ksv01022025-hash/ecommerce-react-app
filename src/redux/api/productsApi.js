import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi.js'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery,
  tagTypes: ['Product', 'Products'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: ['Products'],
    }),
    getProducts: builder.query({
      query: (params = {}) => ({ url: '/products', params }),
      providesTags: ['Products'],
    }),
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    submitReview: builder.mutation({
      query: (body) => ({ url: '/reviews', method: 'PUT', body }),
      invalidatesTags: ['Product'],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetProductDetailsQuery,
  useGetProductsQuery,
  useSubmitReviewMutation,
} = productApi
