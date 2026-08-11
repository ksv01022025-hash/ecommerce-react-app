export const buildGoogleOAuthUrl = (apiBaseUrl) => `${String(apiBaseUrl).replace(/\/$/, '')}/oauth/google`

export const getSafeOAuthDestination = (storedDestination) => (
  storedDestination?.startsWith('/') && !storedDestination.startsWith('//') ? storedDestination : '/'
)

export const getOAuthErrorMessage = (error, timedOut = false) => {
  if (timedOut) return 'Session restoration is taking too long. Check your connection and try again.'
  return error?.data?.message || 'The Shopora session could not be restored. Please try signing in again.'
}
