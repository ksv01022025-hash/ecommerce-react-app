import { accountSettingsApi } from './accountSettingsApi.js'
import { accountSummaryApi } from './accountSummaryApi.js'
import { addressApi } from './addressApi.js'
import { balanceApi } from './balanceApi.js'
import { notificationApi } from './notificationApi.js'
import { orderApi } from './orderApi.js'
import { referralApi } from './referralApi.js'
import { returnApi } from './returnApi.js'
import { rewardApi } from './rewardApi.js'
import { userApi } from './userApi.js'
import { wishlistApi } from './wishlistApi.js'

const accountApis = [
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
]

export const resetAccountApiState = (dispatch) => {
  accountApis.forEach((api) => dispatch(api.util.resetApiState()))
}
