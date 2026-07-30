import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi.js'
import { clearUser } from '../features/userSlice.js'

export const accountSettingsApi = createApi({
  reducerPath: 'accountSettingsApi', baseQuery, tagTypes: ['AccountSettings'],
  endpoints: (builder) => ({
    getAccountSettings: builder.query({ query: () => '/account-settings', providesTags: ['AccountSettings'] }),
    updateAccountSettings: builder.mutation({ query: (body) => ({ url: '/account-settings', method: 'PUT', body }), invalidatesTags: ['AccountSettings'] }),
    deleteAccount: builder.mutation({
      query: (body) => ({ url: '/account', method: 'DELETE', body }),
      async onQueryStarted(_argument, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(clearUser())
      },
    }),
  }),
})

export const { useGetAccountSettingsQuery, useUpdateAccountSettingsMutation, useDeleteAccountMutation } = accountSettingsApi
