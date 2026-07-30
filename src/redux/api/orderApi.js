import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi.js'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery,
  tagTypes: ['Order', 'Orders'],
  endpoints: (builder) => ({
    myOrders: builder.query({
      query: (params = {}) => ({ url: '/me/orders', params }),
      providesTags: ['Orders'],
    }),
    orderDetails: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Order', id }],
    }),
    stripeCheckoutSession: builder.mutation({
      query: (body) => ({ url: '/payment/checkout_session', method: 'POST', body }),
    }),
    verifyStripeCheckout: builder.query({ query: (sessionId) => `/payment/checkout_session/${sessionId}` }),
  }),
})

export const {
  useMyOrdersQuery,
  useOrderDetailsQuery,
  useStripeCheckoutSessionMutation,
  useVerifyStripeCheckoutQuery,
} = orderApi
