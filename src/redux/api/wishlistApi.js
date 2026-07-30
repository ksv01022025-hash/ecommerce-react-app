import { createApi } from '@reduxjs/toolkit/query/react'
import { setWishlistItems } from '../features/wishlistSlice.js'
import { baseQuery } from './baseApi.js'

const syncWishlist = async (_argument, { dispatch, queryFulfilled }) => {
  try {
    const { data } = await queryFulfilled
    dispatch(setWishlistItems(data.items || []))
  } catch {
    // Keep the local guest wishlist when the session is unavailable.
  }
}

export const wishlistApi = createApi({
  reducerPath: 'wishlistApi',
  baseQuery,
  tagTypes: ['Wishlist'],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => '/wishlist',
      providesTags: ['Wishlist'],
      onQueryStarted: syncWishlist,
    }),
    addWishlistItem: builder.mutation({
      query: (productId) => ({ url: `/wishlist/${productId}`, method: 'PUT' }),
      invalidatesTags: ['Wishlist'],
    }),
    removeWishlistItemFromServer: builder.mutation({
      query: (productId) => ({ url: `/wishlist/${productId}`, method: 'DELETE' }),
      invalidatesTags: ['Wishlist'],
    }),
    clearServerWishlist: builder.mutation({
      query: () => ({ url: '/wishlist', method: 'DELETE' }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
})

export const {
  useAddWishlistItemMutation,
  useClearServerWishlistMutation,
  useGetWishlistQuery,
  useRemoveWishlistItemFromServerMutation,
} = wishlistApi
