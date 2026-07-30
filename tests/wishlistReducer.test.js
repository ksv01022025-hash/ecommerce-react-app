import assert from 'node:assert/strict'
import test from 'node:test'
import { createStorage } from './storageMock.js'

globalThis.localStorage = createStorage()
const { default: reducer, clearWishlist, removeWishlistItem, toggleWishlistItem } = await import('../src/redux/features/wishlistSlice.js')

test('wishlist toggles without duplicates and removes products', () => {
  const product = { _id: 'p1', name: 'Product' }
  let state = reducer(undefined, toggleWishlistItem(product))
  assert.equal(state.items.length, 1)
  state = reducer(state, toggleWishlistItem(product))
  assert.equal(state.items.length, 0)
  state = reducer(state, toggleWishlistItem(product))
  state = reducer(state, removeWishlistItem('p1'))
  assert.equal(state.items.length, 0)
})

test('wishlist clear removes persisted account data', () => {
  let state = reducer(undefined, toggleWishlistItem({ _id: 'p2' }))
  state = reducer(state, clearWishlist())
  assert.equal(state.items.length, 0)
  assert.equal(localStorage.getItem('wishlistItems'), null)
})
