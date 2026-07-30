import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi.js'

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery,
  endpoints: (builder) => ({
    submitContactMessage: builder.mutation({ query: (body) => ({ url: '/contact', method: 'POST', body }) }),
  }),
})

export const { useSubmitContactMessageMutation } = contactApi
