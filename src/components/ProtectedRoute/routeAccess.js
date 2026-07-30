export const getProtectedRouteDecision = ({ loading, isAuthenticated, pathname, search = '', hash = '' }) => {
  if (loading) return { type: 'loading' }
  if (!isAuthenticated) return { type: 'redirect', from: `${pathname}${search}${hash}` }
  return { type: 'allow' }
}
