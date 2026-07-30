import assert from 'node:assert/strict'
import test from 'node:test'
import { getProtectedRouteDecision } from '../src/components/ProtectedRoute/routeAccess.js'

test('protected route waits for session restoration', () => {
  assert.deepEqual(getProtectedRouteDecision({ loading: true, isAuthenticated: false, pathname: '/profile' }), { type: 'loading' })
})

test('protected route preserves destination for logged-out users', () => {
  assert.deepEqual(getProtectedRouteDecision({ loading: false, isAuthenticated: false, pathname: '/profile/settings', search: '?tab=security', hash: '#delete' }), { type: 'redirect', from: '/profile/settings?tab=security#delete' })
})

test('protected route allows authenticated users', () => {
  assert.deepEqual(getProtectedRouteDecision({ loading: false, isAuthenticated: true, pathname: '/checkout' }), { type: 'allow' })
})
