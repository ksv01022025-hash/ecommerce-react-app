import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi.js'

export const referralApi = createApi({ reducerPath: 'referralApi', baseQuery, endpoints: (builder) => ({ getReferral: builder.query({ query: () => '/referral' }) }) })
export const { useLazyGetReferralQuery } = referralApi
