import { createSlice } from '@reduxjs/toolkit'

const readWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem('wishlistItems')) || []
  } catch {
    return []
  }
}

const persist = (items) => localStorage.setItem('wishlistItems', JSON.stringify(items))

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: readWishlist() },
  reducers: {
    setWishlistItems: (state, action) => {
      state.items = action.payload
      persist(state.items)
    },
    toggleWishlistItem: (state, action) => {
      const product = action.payload
      const index = state.items.findIndex((item) => item._id === product._id)
      if (index >= 0) state.items.splice(index, 1)
      else state.items.push(product)
      persist(state.items)
    },
    removeWishlistItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload)
      persist(state.items)
    },
    clearWishlist: (state) => {
      state.items = []
      localStorage.removeItem('wishlistItems')
    },
  },
})

export const { clearWishlist, removeWishlistItem, setWishlistItems, toggleWishlistItem } = wishlistSlice.actions
export default wishlistSlice.reducer
