import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi.js'

export const dealsApi = createApi({
  reducerPath: 'dealsApi',
  baseQuery,
  tagTypes: ['Deals'],
  endpoints: (builder) => ({
    getDeals: builder.query({
      query: (params = {}) => ({ url: '/deals', params }),
      providesTags: ['Deals'],
    }),
    getDealCategories: builder.query({
      query: () => '/deals/categories',
      providesTags: ['Deals'],
    }),
    getCurrentDealCampaign: builder.query({
      query: () => '/deals/campaign/current',
      providesTags: ['Deals'],
    }),
  }),
})

export const {
  useGetCurrentDealCampaignQuery,
  useGetDealCategoriesQuery,
  useGetDealsQuery,
} = dealsApi
