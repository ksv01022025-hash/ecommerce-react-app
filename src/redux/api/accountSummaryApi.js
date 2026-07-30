import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi.js'

export const accountSummaryApi = createApi({
  reducerPath: 'accountSummaryApi', baseQuery, tagTypes: ['AccountSummary'],
  endpoints: (builder) => ({ getAccountSummary: builder.query({ query: () => '/account-summary', providesTags: ['AccountSummary'] }) }),
})

export const { useGetAccountSummaryQuery } = accountSummaryApi
