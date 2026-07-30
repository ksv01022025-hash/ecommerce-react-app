import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi.js'

export const addressApi = createApi({
  reducerPath: 'addressApi',
  baseQuery,
  tagTypes: ['Addresses'],
  endpoints: (builder) => ({
    getAddresses: builder.query({ query: () => '/addresses', providesTags: ['Addresses'] }),
    createAddress: builder.mutation({ query: (body) => ({ url: '/addresses', method: 'POST', body }), invalidatesTags: ['Addresses'] }),
    updateAddress: builder.mutation({ query: ({ id, ...body }) => ({ url: `/addresses/${id}`, method: 'PUT', body }), invalidatesTags: ['Addresses'] }),
    deleteAddress: builder.mutation({ query: (id) => ({ url: `/addresses/${id}`, method: 'DELETE' }), invalidatesTags: ['Addresses'] }),
    setDefaultAddress: builder.mutation({ query: (id) => ({ url: `/addresses/${id}/default`, method: 'PUT' }), invalidatesTags: ['Addresses'] }),
  }),
})

export const { useCreateAddressMutation, useDeleteAddressMutation, useGetAddressesQuery, useSetDefaultAddressMutation, useUpdateAddressMutation } = addressApi
