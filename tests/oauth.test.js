import assert from 'node:assert/strict'
import test from 'node:test'
import { buildGoogleOAuthUrl, getOAuthErrorMessage, getSafeOAuthDestination } from '../src/pages/Login/oauth.js'

test('Google login URL appends the OAuth path exactly once', () => {
  assert.equal(buildGoogleOAuthUrl('https://api.example.com/api/v1'), 'https://api.example.com/api/v1/oauth/google')
  assert.equal(buildGoogleOAuthUrl('https://api.example.com/api/v1/'), 'https://api.example.com/api/v1/oauth/google')
})

test('OAuth callback accepts local paths and rejects external redirects', () => {
  assert.equal(getSafeOAuthDestination('/profile/settings'), '/profile/settings')
  assert.equal(getSafeOAuthDestination('//attacker.example'), '/')
  assert.equal(getSafeOAuthDestination('https://attacker.example'), '/')
  assert.equal(getSafeOAuthDestination(null), '/')
})

test('OAuth callback presents backend and timeout errors', () => {
  assert.equal(getOAuthErrorMessage({ data: { message: 'Authentication required' } }), 'Authentication required')
  assert.match(getOAuthErrorMessage(undefined, true), /taking too long/i)
  assert.match(getOAuthErrorMessage(undefined), /could not be restored/i)
})
