import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi.js'
import { userApi } from './userApi.js'
import { resetAccountApiState } from './resetAccountApiState.js'
import { clearWishlist } from '../features/wishlistSlice.js'
import { clearUser, setIsAuthenticated, setLoading, setUser } from '../features/userSlice.js'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({ url: '/register', method: 'POST', body }),
      async onQueryStarted(_argument, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        resetAccountApiState(dispatch)
        dispatch(clearWishlist())
        dispatch(setUser(data.user))
        dispatch(setIsAuthenticated(true))
        dispatch(setLoading(false))
        dispatch(userApi.util.upsertQueryData('getMe', undefined, data.user))
      },
    }),
    login: builder.mutation({
      query: (body) => ({ url: '/login', method: 'POST', body }),
      async onQueryStarted(_argument, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled
        resetAccountApiState(dispatch)
        dispatch(clearWishlist())
        dispatch(setUser(data.user))
        dispatch(setIsAuthenticated(true))
        dispatch(setLoading(false))
        dispatch(userApi.util.upsertQueryData('getMe', undefined, data.user))
      },
    }),
    logout: builder.mutation({
      query: () => ({ url: '/logout', method: 'GET' }),
      async onQueryStarted(_argument, { dispatch, queryFulfilled }) {
        await queryFulfilled
        dispatch(clearUser())
        resetAccountApiState(dispatch)
        dispatch(clearWishlist())
      },
    }),
    forgotPassword: builder.mutation({ query: (body) => ({ url: '/password/forgot', method: 'POST', body }) }),
    resetPassword: builder.mutation({ query: ({ token, password }) => ({ url: `/password/reset/${token}`, method: 'POST', body: { password } }) }),
  }),
})

export const { useForgotPasswordMutation, useLoginMutation, useLogoutMutation, useRegisterMutation, useResetPasswordMutation } = authApi
