import assert from 'node:assert/strict'
import test from 'node:test'
import { createStorage } from './storageMock.js'

globalThis.localStorage = createStorage()
const { default: reducer, clearCart, removeCartItem, saveShippingInfo, setCartItem } = await import('../src/redux/features/cartSlice.js')

test('cart adds, replaces, removes and clears products', () => {
  let state = reducer(undefined, { type: 'init' })
  state = reducer(state, setCartItem({ product: 'p1', quantity: 1 }))
  state = reducer(state, setCartItem({ product: 'p1', quantity: 3 }))
  assert.deepEqual(state.cartItems, [{ product: 'p1', quantity: 3 }])
  assert.equal(JSON.parse(localStorage.getItem('cartItems'))[0].quantity, 3)
  state = reducer(state, removeCartItem('p1'))
  assert.equal(state.cartItems.length, 0)
  state = reducer(state, setCartItem({ product: 'p2', quantity: 1 }))
  state = reducer(state, clearCart())
  assert.equal(state.cartItems.length, 0)
  assert.equal(localStorage.getItem('cartItems'), null)
})

test('cart saves shipping information', () => {
  const state = reducer(undefined, saveShippingInfo({ delivery: 'express' }))
  assert.equal(state.shippingInfo.delivery, 'express')
  assert.equal(JSON.parse(localStorage.getItem('shippingInfo')).delivery, 'express')
})
