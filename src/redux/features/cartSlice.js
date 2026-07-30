import { createSlice } from '@reduxjs/toolkit'

const readStoredValue = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const initialState = {
  cartItems: readStoredValue('cartItems', []),
  shippingInfo: readStoredValue('shippingInfo', {}),
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      const item = action.payload
      const existingIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.product === item.product,
      )

      if (existingIndex >= 0) state.cartItems[existingIndex] = item
      else state.cartItems.push(item)

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload,
      )
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    clearCart: (state) => {
      state.cartItems = []
      localStorage.removeItem('cartItems')
    },
    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload
      localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo))
    },
  },
})

export const { clearCart, removeCartItem, saveShippingInfo, setCartItem } = cartSlice.actions
export default cartSlice.reducer
