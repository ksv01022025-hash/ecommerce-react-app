import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCartItem } from "../../../../redux/features/cartSlice";
import styles from "./RecentOrders.module.css";

const formatPrice = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0,
}).format(Number.isFinite(Number(value)) ? Number(value) : 0);

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toLocaleDateString("en-IN");
};

const getErrorMessage = (error) => {
  if (error?.data?.message) return error.data.message;
  if (error?.status === "FETCH_ERROR") return "Cannot connect to the server. Check that the backend is running.";
  if (error?.status === 401) return "Your session has expired. Please log in again.";
  return "We could not load your recent orders.";
};

function RecentOrders({ error, isError, isLoading, orders, refetch }) {
  const dispatch = useDispatch();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [message, setMessage] = useState("");
  const safeOrders = Array.isArray(orders) ? orders.filter((order) => order?._id) : [];

  const buyAgain = (order) => {
    const validItems = (Array.isArray(order.items) ? order.items : []).filter((item) => item?.product);
    if (validItems.length === 0) return setMessage("This order has no products available to add again.");
    try {
      validItems.forEach((item) => dispatch(setCartItem({ product: item.product, name: item.name || "Product", image: item.image || "", price: Number(item.price) || 0, quantity: Math.max(Number(item.quantity) || 1, 1) })));
      setMessage(`${validItems.length} item${validItems.length === 1 ? "" : "s"} added to your cart.`);
    } catch {
      setMessage("The items could not be added to your cart. Please try again.");
    }
  };

  return (
    <section className={styles.card}>
      <header><h2>Recent Orders</h2><Link to="/order-history">View All</Link></header>
      {isLoading && <p>Loading orders…</p>}
      {isError && <div className={styles.error} role="alert"><b>Unable to load orders</b><span>{getErrorMessage(error)}</span><button onClick={refetch} type="button">Try Again</button></div>}
      {!isLoading && !isError && safeOrders.length === 0 && <p>No recent orders.</p>}
      {!isError && safeOrders.map((order) => {
        const items = Array.isArray(order.items) ? order.items : [];
        const item = items[0];
        const orderId = String(order.orderNumber || order._id).slice(-8).toUpperCase();
        const status = order.status || "Processing";
        return (
          <article className={styles.orderWrap} key={order._id}>
            <button aria-expanded={expandedOrder === order._id} aria-label={`View details for order ${orderId}`} className={styles.order} onClick={() => setExpandedOrder((current) => current === order._id ? null : order._id)} type="button">
              <img onError={(event) => { event.currentTarget.hidden = true; }} src={item?.image || "https://placehold.co/60x60?text=Item"} alt={item?.name || "Order item"} />
              <span className={styles.orderText}><b>{item?.name || "Order"}</b><small>Order #{orderId}<br />{formatDate(order.createdAt)}</small></span>
              <strong>{formatPrice(order.total)}<small className={styles[status.toLowerCase()] || styles.processing}>{status}</small></strong>
            </button>
            {expandedOrder === order._id && <div className={styles.details}>
              <p><b>{items.length} item{items.length === 1 ? "" : "s"}</b><span>{items.length ? items.map((orderItem) => `${orderItem?.name || "Product"} × ${orderItem?.quantity || 1}`).join(", ") : "Item details unavailable"}</span></p>
              <p><b>Delivery progress</b><span>{status === "Delivered" ? `Delivered ${order.deliveredAt ? formatDate(order.deliveredAt) : "successfully"}` : status === "Cancelled" ? "This order was cancelled" : status === "Shipped" ? "Your order is on the way" : "Your order is being prepared"}</span></p>
              <div><button onClick={() => buyAgain(order)} type="button">Buy Again</button>{status === "Delivered" && <Link to="/profile/returns">Return Item</Link>}<Link to="/order-history">Full Details</Link></div>
            </div>}
          </article>
        );
      })}
      {message && <p className={styles.message} role="status">{message} {message.includes("added") && <Link to="/checkout">Checkout</Link>}</p>}
    </section>
  );
}

export default RecentOrders;
