import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi.js'

export const returnApi = createApi({
  reducerPath: 'returnApi', baseQuery, tagTypes: ['Returns'],
  endpoints: (builder) => ({
    getReturns: builder.query({ query: () => '/returns', providesTags: ['Returns'] }),
    createReturn: builder.mutation({ query: (body) => ({ url: '/returns', method: 'POST', body }), invalidatesTags: ['Returns'] }),
  }),
})

export const { useGetReturnsQuery, useCreateReturnMutation } = returnApi
