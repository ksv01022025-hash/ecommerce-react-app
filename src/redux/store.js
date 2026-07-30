import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi.js";
import { addressApi } from "./api/addressApi.js";
import { rewardApi } from "./api/rewardApi.js";
import { returnApi } from "./api/returnApi.js";
import { notificationApi } from "./api/notificationApi.js";
import { accountSettingsApi } from "./api/accountSettingsApi.js";
import { balanceApi } from "./api/balanceApi.js";
import { accountSummaryApi } from "./api/accountSummaryApi.js";
import { referralApi } from "./api/referralApi.js";
import { dealsApi } from "./api/dealsApi.js";
import { orderApi } from "./api/orderApi.js";
import { productApi } from "./api/productsApi.js";
import { userApi } from "./api/userApi.js";
import { wishlistApi } from "./api/wishlistApi.js";
import { contactApi } from "./api/contactApi.js";
import cartReducer from "./features/cartSlice.js";
import userReducer from "./features/userSlice.js";
import wishlistReducer from "./features/wishlistSlice.js";

const apiServices = [
  productApi,
  dealsApi,
  authApi,
  userApi,
  orderApi,
  wishlistApi,
  addressApi,
  rewardApi,
  returnApi,
  notificationApi,
  accountSettingsApi,
  balanceApi,
  accountSummaryApi,
  referralApi,
  contactApi,
];

export const store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    ...Object.fromEntries(
      apiServices.map((api) => [api.reducerPath, api.reducer]),
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiServices.map((api) => api.middleware)),
});
