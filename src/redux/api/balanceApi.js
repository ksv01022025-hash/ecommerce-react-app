import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi.js'

export const balanceApi = createApi({
  reducerPath: 'balanceApi', baseQuery, tagTypes: ['Balance'],
  endpoints: (builder) => ({ getBalance: builder.query({ query: () => '/balance', providesTags: ['Balance'] }) }),
})

export const { useGetBalanceQuery } = balanceApi
