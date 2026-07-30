import { useState } from "react";
import { useMyOrdersQuery } from "../../../../redux/api/orderApi";
import OrderCard from "../OrderCard/OrderCard";
import Pagination from "../Pagination/Pagination";
import styles from "./OrderHistory.module.css";

function OrderHistory() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const { data, error, isLoading, isFetching, refetch } = useMyOrdersQuery({ page, limit: 4, sort });
  const orders = data?.orders ?? [];
  const paymentIssues = data?.paymentIssues ?? [];

  const changeSort = (event) => {
    setSort(event.target.value);
    setPage(1);
  };

  return (
    <section>
      <div className={styles.orderHead}>
        <div>
          <h1>Order History</h1>
          <p>Track and view all your orders in one place</p>
        </div>
        <label>
          Sort by:
          <select onChange={changeSort} value={sort}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="total-high">Total: High to Low</option>
            <option value="total-low">Total: Low to High</option>
          </select>
        </label>
      </div>

      {isLoading && <p className={styles.status}>Loading your orders…</p>}
      {paymentIssues.map((issue) => (
        <article className={styles.paymentIssue} key={issue._id} role="status">
          <strong>{issue.status === "refunded" ? "Refund submitted" : "Payment received — refund pending"}</strong>
          <p>{issue.status === "refunded" ? "Your refund was submitted to Stripe and will return to your original payment method." : issue.failureMessage}</p>
          <small>Reference: {issue.checkoutReference}</small>
        </article>
      ))}

      {error && (
        <div className={styles.status} role="alert">
          <p>{error.data?.message || "Unable to load your order history."}</p>
          <button onClick={refetch} type="button">Try Again</button>
        </div>
      )}
      {!isLoading && !error && orders.length === 0 && (
        <p className={styles.status}>You have not placed any orders yet.</p>
      )}
      {!error && orders.length > 0 && (
        <div aria-busy={isFetching} className={styles.orderList}>
          {orders.map((order) => <OrderCard order={order} key={order._id} />)}
        </div>
      )}
      {(data?.pages ?? 0) > 1 && (
        <Pagination currentPage={page} onPageChange={setPage} pageCount={data.pages} />
      )}
    </section>
  );
}

export default OrderHistory;
