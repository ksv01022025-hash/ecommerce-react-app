import { useState } from "react";
import OrderItem from "../OrderItem/OrderItem";
import styles from "./OrderCard.module.css";

const statusIcons = {
  Delivered: "⊙",
  Shipped: "♧",
  Processing: "⌛",
  Cancelled: "⊗",
};

const formatPrice = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format(value);

function OrderCard({ order }) {
  const [showDetails, setShowDetails] = useState(false);
  const statusClass = order.status.toLowerCase();
  const orderNumber = order._id.slice(-8).toUpperCase();
  const placed = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(order.createdAt));

  return (
    <article className={styles.order}>
      <header className={styles.orderHeader}>
        <p><b>Order ID: #{orderNumber}</b><small>Placed on {placed}</small></p>
        <span className={styles[statusClass]}>{statusIcons[order.status]} {order.status}</span>
        <p className={styles.cost}><b>{formatPrice(order.total)}</b><small>Paid via {order.paymentInfo?.method || "Not specified"}</small></p>
        <button onClick={() => setShowDetails((visible) => !visible)} type="button">
          {showDetails ? "Hide Details" : "View Details ›"}
        </button>
      </header>
      <div className={styles.orderItems}>
        {order.items.map((item) => <OrderItem item={item} key={`${order._id}-${item.product}`} />)}
        {order.deliveredAt && (
          <aside className={`${styles.delivery} ${styles.blue}`}>
            Delivered on<br /><b>{new Date(order.deliveredAt).toLocaleDateString("en-IN")}</b>
          </aside>
        )}
      </div>
      {showDetails && (
        <div className={styles.details}>
          <p><b>Shipping address</b><span>{Object.values(order.shippingInfo || {}).filter(Boolean).join(", ") || "Not provided"}</span></p>
          <p><b>Delivery</b><span>{order.deliveryMethod === "express" ? `Express (${formatPrice(order.deliveryFee || 0)})` : "Standard (FREE)"}</span></p>
          {Number.isFinite(order.productTotal) && <p><b>Products</b><span>{formatPrice(order.productTotal)}</span></p>}
          <p><b>Total paid</b><span>{formatPrice(order.total)}</span></p>
        </div>
      )}
    </article>
  );
}

export default OrderCard;
