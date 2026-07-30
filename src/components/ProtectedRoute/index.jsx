import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import styles from './ProtectedRoute.module.css'
import { getProtectedRouteDecision } from './routeAccess.js'

export default function ProtectedRoute() {
  const location = useLocation()
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  const decision = getProtectedRouteDecision({ loading, isAuthenticated, pathname: location.pathname, search: location.search, hash: location.hash })
  if (decision.type === 'loading') return <main className={styles.loading} role="status">Checking your session…</main>
  if (decision.type === 'redirect') return <Navigate replace state={{ from: decision.from }} to="/login" />

  return <Outlet />
}
