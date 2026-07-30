import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseApi.js'

export const notificationApi = createApi({
  reducerPath: 'notificationApi', baseQuery, tagTypes: ['Notifications'],
  endpoints: (builder) => ({
    getNotifications: builder.query({ query: () => '/notifications', providesTags: ['Notifications'] }),
    updateNotificationPreferences: builder.mutation({ query: (body) => ({ url: '/notifications/preferences', method: 'PUT', body }), invalidatesTags: ['Notifications'] }),
    markNotificationRead: builder.mutation({ query: (id) => ({ url: `/notifications/${id}/read`, method: 'PUT' }), invalidatesTags: ['Notifications'] }),
    markAllNotificationsRead: builder.mutation({ query: () => ({ url: '/notifications/read-all', method: 'PUT' }), invalidatesTags: ['Notifications'] }),
  }),
})

export const { useGetNotificationsQuery, useUpdateNotificationPreferencesMutation, useMarkNotificationReadMutation, useMarkAllNotificationsReadMutation } = notificationApi
