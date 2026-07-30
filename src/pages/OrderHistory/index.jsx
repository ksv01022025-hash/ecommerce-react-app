import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./OrderHistory.module.css";
import AccountSidebar from "./sections/AccountSidebar/AccountSidebar";
import Benefits from "./sections/Benefits/Benefits";
import OrderHistoryContent from "./sections/OrderHistory/OrderHistory";

export default function OrderHistoryPage() {
  const location = useLocation();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return <main className={styles.message}>Restoring your account…</main>;
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return (
    <main className={styles.wrap}>
      <div className={styles.crumb}>Home › My Account › Order History</div>
      <div className={styles.layout}>
        <AccountSidebar />
        <OrderHistoryContent />
      </div>
      <Benefits />
    </main>
  );
}
