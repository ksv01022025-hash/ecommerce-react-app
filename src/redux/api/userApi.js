import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi.js'
import { clearUser, setIsAuthenticated, setLoading, setUser } from '../features/userSlice.js'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => '/me',
      transformResponse: (response) => response.user,
      async onQueryStarted(_argument, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
          dispatch(setIsAuthenticated(true))
        } catch {
          dispatch(clearUser())
        } finally {
          dispatch(setLoading(false))
        }
      },
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({ url: '/me/update', method: 'PUT', body }),
      invalidatesTags: ['User'],
    }),
    updatePassword: builder.mutation({
      query: (body) => ({ url: '/password/update', method: 'PUT', body }),
    }),
  }),
})

export const { useGetMeQuery, useUpdatePasswordMutation, useUpdateProfileMutation } = userApi
