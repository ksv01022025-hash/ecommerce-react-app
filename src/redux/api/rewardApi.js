import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi.js'
import { balanceApi } from './balanceApi.js'

export const rewardApi = createApi({
  reducerPath: 'rewardApi',
  baseQuery,
  tagTypes: ['Rewards'],
  endpoints: (builder) => ({
    getRewards: builder.query({ query: () => '/rewards', providesTags: ['Rewards'] }),
    redeemPoints: builder.mutation({
      query: (points) => ({ url: '/rewards/redeem', method: 'POST', body: { points } }),
      invalidatesTags: ['Rewards'],
      async onQueryStarted(_argument, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(balanceApi.util.invalidateTags(['Balance']))
      },
    }),
  }),
})

export const { useGetRewardsQuery, useRedeemPointsMutation } = rewardApi
